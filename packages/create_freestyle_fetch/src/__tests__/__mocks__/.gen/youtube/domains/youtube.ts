import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'youtube' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const youtubeDomain = {
'youtube': {
'v3': {
'videos': {
/**
 * Retrieves a list of resources, possibly filtered.
 *
 * Returns a list of videos that match the API request parameters.
 */
'GET': f.builder().def_json().def_searchparams(Schemas.parseYoutubeVideosListSearchParams).def_response(async ({ json }) => Schemas.parseVideoListResponse(await json())),
/**
 * Uploads a video to YouTube.
 */
'POST': f.builder().def_json().def_searchparams(Schemas.parseYoutubeVideosInsertSearchParams).def_body(Schemas.parseVideo).def_response(async ({ json }) => Schemas.parseVideo(await json()))
}
}
}
};
