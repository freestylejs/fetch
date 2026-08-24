import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'orders' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const ordersDomain = {
'orders': {
'$orderId': {
/**
 * Get order details
 *
 * Retrieve details of a specific order.
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Schemas.parseOrder(await json()))
}
}
};
