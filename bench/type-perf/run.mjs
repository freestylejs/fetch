import { spawnSync } from 'node:child_process'
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { prepareCorpus } from './prepare.mjs'

const benchDir = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(benchDir, '..', '..')
const traceRoot = path.join(workspaceRoot, '.trace')
const projectRelPath = 'bench/type-perf'
const tscBin = path.join(workspaceRoot, 'node_modules', '.bin', 'tsc')

const parseArgs = (argv) => {
    const args = { label: 'BASELINE', runs: 1 }
    for (let i = 0; i < argv.length; i += 1) {
        if (argv[i] === '--label') args.label = argv[i + 1]
        if (argv[i] === '--runs') args.runs = Number(argv[i + 1])
    }
    return args
}

const nextTrialNumber = () => {
    if (!existsSync(traceRoot)) return 1
    const numbers = readdirSync(traceRoot)
        .map((name) => /^trial_(\d+)\.md$/.exec(name))
        .filter(Boolean)
        .map((match) => Number(match[1]))
    return numbers.length > 0 ? Math.max(...numbers) + 1 : 1
}

const runTsc = (trialNumber) => {
    const traceDir = path.join(traceRoot, `trace_trial_${trialNumber}`)
    rmSync(traceDir, { recursive: true, force: true })
    mkdirSync(traceDir, { recursive: true })

    const command = [
        tscBin,
        '-p',
        projectRelPath,
        '--extendedDiagnostics',
        '--generateTrace',
        traceDir,
    ]
    const startedAt = performance.now()
    const result = spawnSync(process.execPath, [tscBin, ...command.slice(1)], {
        cwd: workspaceRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    })
    const wallClockMs = performance.now() - startedAt

    return {
        command: `node ${path.relative(workspaceRoot, tscBin)} -p ${projectRelPath} --extendedDiagnostics --generateTrace ${path.relative(workspaceRoot, traceDir)}`,
        exitCode: result.status ?? -1,
        output: `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim(),
        traceDir,
        wallClockMs,
    }
}

const parseDiagnostics = (output) => {
    const metrics = []
    for (const line of output.split('\n')) {
        const match =
            /^\s*([A-Za-z][A-Za-z ]+?):\s*([\d,.]+)\s*(ms|s)?\s*$/.exec(line)
        if (!match) continue
        const numericValue = Number(match[2].replace(/,/g, ''))
        const unit = match[3] ?? ''
        let valueMs = null
        if (unit === 's') valueMs = numericValue * 1000
        else if (unit === 'ms') valueMs = numericValue
        else if (match[2].length > 0 && !unit) valueMs = null
        metrics.push({
            metric: match[1].trim(),
            value: `${match[2]}${unit}`,
            valueMs,
        })
    }
    return metrics
}

const formatTrialMd = ({ trialNumber, label, meta, run, metrics }) => {
    const rows = [
        '| metric | value |',
        '| --- | --- |',
        ...metrics.map((entry) => `| ${entry.metric} | ${entry.value} |`),
        `| wallClockMs | ${run.wallClockMs.toFixed(2)} |`,
        `| exitCode | ${run.exitCode} |`,
        `| notes | command: \`${run.command}\` |`,
    ]
    return [
        `# Trial ${trialNumber} — ${label}`,
        `- date: ${meta.dateIso} / node: ${meta.nodeVersion} / tsc: ${meta.tscVersion}`,
        '',
        ...rows,
        '',
    ].join('\n')
}

const collectTrials = () => {
    if (!existsSync(traceRoot)) return []
    return readdirSync(traceRoot)
        .map((name) => /^trial_(\d+)\.md$/.exec(name))
        .filter(Boolean)
        .sort((a, b) => Number(a[1]) - Number(b[1]))
        .map((match) => {
            const filePath = path.join(traceRoot, match[0])
            const content = readFileSync(filePath, 'utf8')
            const label = /# Trial \d+ — (.+)/.exec(content)?.[1] ?? ''
            const dateIso = /- date: ([^/]+)\/ node/.exec(content)?.[1]?.trim()
            const rows = new Map()
            for (const line of content.split('\n')) {
                const row = /^\| ([^|]+) \| ([^|]+) \|$/.exec(line)
                if (!row || row[1].trim() === 'metric') continue
                rows.set(row[1].trim(), row[2].trim())
            }
            return {
                number: Number(match[1]),
                label,
                dateIso,
                wallClockMs: Number(rows.get('wallClockMs') ?? NaN),
                metrics: rows,
            }
        })
}

const MS_PER_SECOND = 1000

const parseMetricNumber = (raw) => {
    const match = /^([\d,.]+)(ms|s)?$/.exec(raw)
    if (!match) return Number.NaN
    const value = Number(match[1].replace(/,/g, ''))
    if (match[2] === 's') return value * MS_PER_SECOND
    if (match[2] === 'ms') return value
    return value
}

const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    return sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle]
}

const writeSummary = () => {
    const trials = collectTrials()
    if (trials.length === 0) return
    const metricNames = [
        ...new Set(trials.flatMap((trial) => [...trial.metrics.keys()])),
    ].filter((name) => name !== 'notes')
    const statRows = []
    for (const name of metricNames) {
        const values = trials
            .map((trial) => parseMetricNumber(trial.metrics.get(name) ?? ''))
            .filter((value) => Number.isFinite(value))
        if (values.length === 0) continue
        statRows.push(
            `| ${name} | ${median(values).toFixed(2)} | ${Math.min(...values).toFixed(2)} | ${Math.max(...values).toFixed(2)} |`
        )
    }
    const lines = [
        '# Type-perf baseline summary',
        `- generated: ${new Date().toISOString()}`,
        `- trials: ${trials.length}`,
        '',
        '## trials',
        '',
        '| trial | label | date | wallClockMs |',
        '| --- | --- | --- | --- |',
        ...trials.map(
            (trial) =>
                `| ${trial.number} | ${trial.label} | ${trial.dateIso ?? ''} | ${Number.isFinite(trial.wallClockMs) ? trial.wallClockMs.toFixed(2) : trial.metrics.get('wallClockMs')} |`
        ),
        '',
        '## metric summary (median / min / max)',
        '',
        '| metric | median | min | max |',
        '| --- | --- | --- | --- |',
        ...statRows,
        '',
    ]
    writeFileSync(path.join(traceRoot, 'baseline_summary.md'), lines.join('\n'))
}

const main = () => {
    const args = parseArgs(process.argv.slice(2))
    if (!Number.isFinite(args.runs) || args.runs < 1) {
        console.error(`Invalid --runs: ${args.runs}`)
        process.exitCode = 1
        return
    }

    prepareCorpus()

    const tscVersion =
        spawnSync(tscBin, ['--version'], { encoding: 'utf8' }).stdout?.trim() ??
        'unknown'
    const meta = {
        dateIso: new Date().toISOString(),
        nodeVersion: process.version,
        tscVersion,
    }

    mkdirSync(traceRoot, { recursive: true })
    let trialNumber = nextTrialNumber()
    let failed = false

    for (let index = 0; index < args.runs; index += 1) {
        const run = runTsc(trialNumber)
        const metrics = parseDiagnostics(run.output)
        if (!existsSync(path.join(run.traceDir, 'trace.json'))) {
            failed = true
        }
        if (run.exitCode !== 0) failed = true
        writeFileSync(
            path.join(traceRoot, `trial_${trialNumber}.md`),
            formatTrialMd({
                trialNumber,
                label: args.label,
                meta,
                run,
                metrics,
            })
        )
        console.log(
            `trial_${trialNumber} [${args.label}] wallClockMs=${run.wallClockMs.toFixed(2)} exit=${run.exitCode}`
        )
        trialNumber += 1
    }

    writeSummary()
    if (failed) process.exitCode = 1
}

main()
