import { z } from 'zod';

const toUrlSearchParams = (value) =>
	Object.fromEntries(
		Object.entries(value).map(([key, entry]) => [
			key,
			typeof entry === 'string' ? entry : JSON.stringify(entry),
		])
	)

const User = z.object({
'id': z.string(),
'name': z.string()
});

export const parseUser = (value) => User.parse(value);

const Invoice = z.object({
'id': z.string(),
'amount_due': z.number(),
'currency': z.string()
});

export const parseInvoice = (value) => Invoice.parse(value);

const InvoiceList = z.object({
'data': z.array(Invoice),
'has_more': z.boolean()
});

export const parseInvoiceList = (value) => InvoiceList.parse(value);

export const parseListUsersSearchParams = (value) => z.object({
'page': z.number().optional()
}).parse(value);

export const parseListUsersResponse = (value) => z.array(User).parse(value);

export const parseVoidInvoiceBody = (value) => new URLSearchParams(z.object({
'reason': z.string()
}).transform(toUrlSearchParams).parse(value));