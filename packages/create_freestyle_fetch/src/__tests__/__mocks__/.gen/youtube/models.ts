import { z } from 'zod';

// Helper types for schemas

export type PageInfoModel = {
  'totalResults'?: number | undefined;
  'resultsPerPage'?: number | undefined;
};

export type ThumbnailModel = {
  'url'?: string | undefined;
  'width'?: number | undefined;
  'height'?: number | undefined;
};

export type ThumbnailDetailsModel = {
  'default'?: ThumbnailModel | undefined;
  'medium'?: ThumbnailModel | undefined;
  'high'?: ThumbnailModel | undefined;
  'standard'?: ThumbnailModel | undefined;
  'maxres'?: ThumbnailModel | undefined;
};

export type VideoLocalizationModel = {
  'title'?: string | undefined;
  'description'?: string | undefined;
};

export type VideoSnippetModel = {
  'publishedAt'?: string | undefined;
  'channelId'?: string | undefined;
  'title'?: string | undefined;
  'description'?: string | undefined;
  'thumbnails'?: ThumbnailDetailsModel | undefined;
  'channelTitle'?: string | undefined;
  'tags'?: string[] | undefined;
  'categoryId'?: string | undefined;
  'liveBroadcastContent'?: 'none' | 'upcoming' | 'live' | 'completed' | undefined;
  'localized'?: VideoLocalizationModel | undefined;
};

export type VideoContentDetailsModel = {
  'duration'?: string | undefined;
  'dimension'?: string | undefined;
  'definition'?: 'hd' | 'sd' | undefined;
  'caption'?: 'false' | 'true' | undefined;
  'licensedContent'?: boolean | undefined;
  'regionRestriction'?: {
  'allowed'?: string[] | undefined;
  'blocked'?: string[] | undefined;
} | undefined;
};

export type VideoStatusModel = {
  'uploadStatus'?: 'deleted' | 'failed' | 'processed' | 'rejected' | 'uploaded' | undefined;
  'failureReason'?: 'codec' | 'conversion' | 'emptyFile' | 'invalidFile' | 'tooSmall' | 'uploadAborted' | undefined;
  'rejectionReason'?: 'claim' | 'copyright' | 'duplicate' | 'inappropriate' | 'legal' | 'length' | 'termsOfUse' | 'trademark' | 'uploaderAccountClosed' | 'uploaderAccountSuspended' | undefined;
  'privacyStatus'?: 'private' | 'public' | 'unlisted' | undefined;
  'license'?: 'creativeCommon' | 'youtube' | undefined;
  'embeddable'?: boolean | undefined;
  'publicStatsViewable'?: boolean | undefined;
  'madeForKids'?: boolean | undefined;
};

export type VideoStatisticsModel = {
  'viewCount'?: string | undefined;
  'likeCount'?: string | undefined;
  'dislikeCount'?: string | undefined;
  'favoriteCount'?: string | undefined;
  'commentCount'?: string | undefined;
};

export type VideoPlayerModel = {
  'embedHtml'?: string | undefined;
  'embedHeight'?: number | undefined;
  'embedWidth'?: number | undefined;
};

export type VideoModel = {
  'kind'?: string | undefined;
  'etag'?: string | undefined;
  'id'?: string | undefined;
  'snippet'?: VideoSnippetModel | undefined;
  'contentDetails'?: VideoContentDetailsModel | undefined;
  'status'?: VideoStatusModel | undefined;
  'statistics'?: VideoStatisticsModel | undefined;
  'player'?: VideoPlayerModel | undefined;
};

export type VideoListResponseModel = {
  'kind'?: string | undefined;
  'etag'?: string | undefined;
  'nextPageToken'?: string | undefined;
  'prevPageToken'?: string | undefined;
  'pageInfo'?: PageInfoModel | undefined;
  'items'?: VideoModel[] | undefined;
};

export type ErrorResponseModel = {
  'error'?: {
  'code'?: number | undefined;
  'message'?: string | undefined;
  'errors'?: Array<{
  'domain'?: string | undefined;
  'reason'?: string | undefined;
  'message'?: string | undefined;
}> | undefined;
} | undefined;
};



export const PageInfo: z.ZodType<PageInfoModel> = z.object({
'totalResults': z.number().int().optional(),
'resultsPerPage': z.number().int().optional()
});

export const Thumbnail: z.ZodType<ThumbnailModel> = z.object({
'url': z.string().optional(),
'width': z.number().int().optional(),
'height': z.number().int().optional()
});

export const ThumbnailDetails: z.ZodType<ThumbnailDetailsModel> = z.object({
'default': Thumbnail.optional(),
'medium': Thumbnail.optional(),
'high': Thumbnail.optional(),
'standard': Thumbnail.optional(),
'maxres': Thumbnail.optional()
});

export const VideoLocalization: z.ZodType<VideoLocalizationModel> = z.object({
'title': z.string().optional(),
'description': z.string().optional()
});

export const VideoSnippet: z.ZodType<VideoSnippetModel> = z.object({
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

export const VideoContentDetails: z.ZodType<VideoContentDetailsModel> = z.object({
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

export const VideoStatus: z.ZodType<VideoStatusModel> = z.object({
'uploadStatus': z.enum(['deleted', 'failed', 'processed', 'rejected', 'uploaded']).optional(),
'failureReason': z.enum(['codec', 'conversion', 'emptyFile', 'invalidFile', 'tooSmall', 'uploadAborted']).optional(),
'rejectionReason': z.enum(['claim', 'copyright', 'duplicate', 'inappropriate', 'legal', 'length', 'termsOfUse', 'trademark', 'uploaderAccountClosed', 'uploaderAccountSuspended']).optional(),
'privacyStatus': z.enum(['private', 'public', 'unlisted']).optional(),
'license': z.enum(['creativeCommon', 'youtube']).optional(),
'embeddable': z.boolean().optional(),
'publicStatsViewable': z.boolean().optional(),
'madeForKids': z.boolean().optional()
});

export const VideoStatistics: z.ZodType<VideoStatisticsModel> = z.object({
'viewCount': z.string().optional(),
'likeCount': z.string().optional(),
'dislikeCount': z.string().optional(),
'favoriteCount': z.string().optional(),
'commentCount': z.string().optional()
});

export const VideoPlayer: z.ZodType<VideoPlayerModel> = z.object({
'embedHtml': z.string().optional(),
'embedHeight': z.number().int().optional(),
'embedWidth': z.number().int().optional()
});

export const Video: z.ZodType<VideoModel> = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'id': z.string().optional(),
'snippet': VideoSnippet.optional(),
'contentDetails': VideoContentDetails.optional(),
'status': VideoStatus.optional(),
'statistics': VideoStatistics.optional(),
'player': VideoPlayer.optional()
});

export const VideoListResponse: z.ZodType<VideoListResponseModel> = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'nextPageToken': z.string().optional(),
'prevPageToken': z.string().optional(),
'pageInfo': PageInfo.optional(),
'items': z.array(Video).optional()
});

export const ErrorResponse: z.ZodType<ErrorResponseModel> = z.object({
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