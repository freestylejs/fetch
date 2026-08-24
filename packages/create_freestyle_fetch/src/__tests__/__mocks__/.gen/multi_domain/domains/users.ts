import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'users' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const usersDomain = {
'users': {
/**
 * List users
 */
'GET': f.builder().def_json().def_searchparams(Schemas.parseListUsersSearchParams).def_response(async ({ json }) => Schemas.parseListUsersResponse(await json())),
/**
 * Create user
 */
'POST': f.builder().def_json().def_body(Schemas.parseUser).def_response(async ({ json }) => Schemas.parseUser(await json())),
'$userId': {
/**
 * Get user
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Schemas.parseUser(await json()))
}
}
};
