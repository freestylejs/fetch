import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.sendgrid.com',
        middleware
    }, {
'v3': {
'user': {
'webhooks': {
'event': {
'settings': {
'POST': f.builder().def_json().def_body(Model.EventWebhookRequest.parse).def_response(async ({ json }) => Model.EventWebhookUnsignedResponse.parse(await json())),
'all': {
'GET': f.builder().def_json().def_response(async ({ json }) => Model.EventWebhookAllResponse.parse(await json()))
},
'signed': {
'$id': {
'GET': f.builder().def_json(),
'PATCH': f.builder().def_json()
}
},
'$id': {
'GET': f.builder().def_json().def_response(async ({ json }) => Model.EventWebhookNoDatesResponse.parse(await json())),
'PATCH': f.builder().def_json().def_body(Model.EventWebhookRequest.parse).def_response(async ({ json }) => Model.EventWebhookUnsignedResponse.parse(await json())),
'DELETE': f.builder().def_json()
}
},
'test': {
'POST': f.builder().def_json().def_body(Model.EventWebhookTestRequest.parse)
}
},
'parse': {
'settings': {
'GET': f.builder().def_json(),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
'$hostname': {
'GET': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
'PATCH': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
'DELETE': f.builder().def_json()
}
},
'stats': {
'GET': f.builder().def_json().def_searchparams(z.object({ limit: z.string().optional(), offset: z.string().optional(), aggregated_by: AggregatedBy.optional(), start_date: z.string(), end_date: z.string().optional() }).parse)
}
},
'security': {
'policies': {
'POST': f.builder().def_json(),
'GET': f.builder().def_json(),
'$id': {
'PATCH': f.builder().def_json(),
'GET': f.builder().def_json(),
'DELETE': f.builder().def_json().def_searchparams(z.object({ force: z.boolean().optional() }).parse)
}
}
}
}
}
}
});
}