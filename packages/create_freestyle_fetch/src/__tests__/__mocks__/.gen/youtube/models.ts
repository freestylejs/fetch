import { z } from 'zod';

export const PageInfo = z.object({
'totalResults': z.number().int().optional(),
'resultsPerPage': z.number().int().optional()
});

export type PageInfoModel = z.infer<typeof PageInfo>;

export const Thumbnail = z.object({
'url': z.string().optional(),
'width': z.number().int().optional(),
'height': z.number().int().optional()
});

export type ThumbnailModel = z.infer<typeof Thumbnail>;

export const ThumbnailDetails = z.object({
'default': Thumbnail.optional(),
'medium': Thumbnail.optional(),
'high': Thumbnail.optional(),
'standard': Thumbnail.optional(),
'maxres': Thumbnail.optional()
});

export type ThumbnailDetailsModel = z.infer<typeof ThumbnailDetails>;

export const VideoLocalization = z.object({
'title': z.string().optional(),
'description': z.string().optional()
});

export type VideoLocalizationModel = z.infer<typeof VideoLocalization>;

export const VideoSnippet = z.object({
'publishedAt': z.iso.datetime().optional(),
'channelId': z.string().optional(),
'title': z.string().optional(),
'description': z.string().optional(),
'thumbnails': ThumbnailDetails.optional(),
'channelTitle': z.string().optional(),
'tags': z.array(z.string()).optional(),
'categoryId': z.string().optional(),
'liveBroadcastContent': z.enum(['none', 'upcoming', 'live', 'completed']).optional(),
'localized': VideoLocalization.optional()
});

export type VideoSnippetModel = z.infer<typeof VideoSnippet>;

export const VideoContentDetails = z.object({
'duration': z.string().regex(/^PT[0-9]+[M|H|S]$/).optional(),
'dimension': z.string().optional(),
'definition': z.enum(['hd', 'sd']).optional(),
'caption': z.enum(['false', 'true']).optional(),
'licensedContent': z.boolean().optional(),
'regionRestriction': z.object({
'allowed': z.array(z.string()).optional(),
'blocked': z.array(z.string()).optional()
}).optional()
});

export type VideoContentDetailsModel = z.infer<typeof VideoContentDetails>;

export const VideoStatus = z.object({
'uploadStatus': z.enum(['deleted', 'failed', 'processed', 'rejected', 'uploaded']).optional(),
'failureReason': z.enum(['codec', 'conversion', 'emptyFile', 'invalidFile', 'tooSmall', 'uploadAborted']).optional(),
'rejectionReason': z.enum(['claim', 'copyright', 'duplicate', 'inappropriate', 'legal', 'length', 'termsOfUse', 'trademark', 'uploaderAccountClosed', 'uploaderAccountSuspended']).optional(),
'privacyStatus': z.enum(['private', 'public', 'unlisted']).optional(),
'license': z.enum(['creativeCommon', 'youtube']).optional(),
'embeddable': z.boolean().optional(),
'publicStatsViewable': z.boolean().optional(),
'madeForKids': z.boolean().optional()
});

export type VideoStatusModel = z.infer<typeof VideoStatus>;

export const VideoStatistics = z.object({
'viewCount': z.string().optional(),
'likeCount': z.string().optional(),
'dislikeCount': z.string().optional(),
'favoriteCount': z.string().optional(),
'commentCount': z.string().optional()
});

export type VideoStatisticsModel = z.infer<typeof VideoStatistics>;

export const VideoPlayer = z.object({
'embedHtml': z.string().optional(),
'embedHeight': z.number().int().optional(),
'embedWidth': z.number().int().optional()
});

export type VideoPlayerModel = z.infer<typeof VideoPlayer>;

export const Video = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'id': z.string().optional(),
'snippet': VideoSnippet.optional(),
'contentDetails': VideoContentDetails.optional(),
'status': VideoStatus.optional(),
'statistics': VideoStatistics.optional(),
'player': VideoPlayer.optional()
});

export type VideoModel = z.infer<typeof Video>;

export const VideoListResponse = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'nextPageToken': z.string().optional(),
'prevPageToken': z.string().optional(),
'pageInfo': PageInfo.optional(),
'items': z.array(Video).optional()
});

export type VideoListResponseModel = z.infer<typeof VideoListResponse>;

export const ErrorResponse = z.object({
'error': z.object({
'code': z.number().int().optional(),
'message': z.string().optional(),
'errors': z.array(z.object({
'domain': z.string().optional(),
'reason': z.string().optional(),
'message': z.string().optional()
})).optional()
}).optional()
});

export type ErrorResponseModel = z.infer<typeof ErrorResponse>;