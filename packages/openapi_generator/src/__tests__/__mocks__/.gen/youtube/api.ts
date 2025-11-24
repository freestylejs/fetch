import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';

export const api = f.router('https://youtube.googleapis.com/', {
'youtube': {
'v3': {
'videos': {
'GET': f.builder().def_json().def_searchparams(z.object({ part: z.array(z.enum(['contentDetails', 'fileDetails', 'id', 'liveStreamingDetails', 'localizations', 'player', 'processingDetails', 'recordingDetails', 'snippet', 'statistics', 'status', 'suggestions', 'topicDetails'])), id: z.array(z.string()).optional(), chart: z.enum(['chartUnspecified', 'mostPopular']).optional(), maxResults: z.number().int().min(1).max(50).optional(), pageToken: z.string().optional() }).parse).def_response(async ({ json }) => Model.VideoListResponse.parse(await json())),
'POST': f.builder().def_json().def_searchparams(z.object({ part: z.array(z.enum(['snippet', 'status', 'player'])) }).parse).def_body(Model.Video.parse).def_response(async ({ json }) => Model.Video.parse(await json()))
}
}
}
});