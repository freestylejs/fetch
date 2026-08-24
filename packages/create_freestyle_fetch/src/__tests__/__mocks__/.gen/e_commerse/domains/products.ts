import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'products' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const productsDomain = {
/**
 * Product catalog operations
 *
 * Endpoints for managing products in the store.
 */
'products': {
/**
 * List products
 *
 * Retrieve a paginated list of products with filtering options.
 */
'GET': f.builder().def_json().def_searchparams(Schemas.parseListProductsSearchParams).def_response(async ({ json }) => Schemas.parseListProductsResponse(await json())),
/**
 * Create a new product
 *
 * Add a new product to the catalog. Supports different product types via polymorphism.
 */
'POST': f.builder().def_json().def_body(Schemas.parseProduct).def_response(async ({ json }) => Schemas.parseProduct(await json()))
}
};
