import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';

export const api = f.router('https://{environment}.example.com/v{version}', {
'products': {
'GET': f.builder().def_json().def_searchparams(z.object({ category: z.enum(['electronics', 'clothing', 'books']).optional(), priceRange: z.array(z.number()).optional(), page: z.number().int().min(1).optional(), limit: z.number().int().min(1).max(100).optional(), sort: z.record(z.enum(['asc', 'desc']), z.any()).optional() }).parse).def_response(async ({ json }) => z.array(Model.Product).parse(await json())),
'POST': f.builder().def_json().def_body(Model.Product.parse).def_response(async ({ json }) => Model.Product.parse(await json()))
},
'orders': {
'$orderId': {
'GET': f.builder().def_json().def_response(async ({ json }) => Model.Order.parse(await json()))
}
}
});