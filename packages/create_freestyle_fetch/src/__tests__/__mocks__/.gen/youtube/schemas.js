import { z } from 'zod';

const PageInfo = z.object({
'totalResults': z.number().int().optional(),
'resultsPerPage': z.number().int().optional()
});

export const parsePageInfo = (value) => PageInfo.parse(value);

const Thumbnail = z.object({
'url': z.string().optional(),
'width': z.number().int().optional(),
'height': z.number().int().optional()
});

export const parseThumbnail = (value) => Thumbnail.parse(value);

const ThumbnailDetails = z.object({
'default': Thumbnail.optional(),
'medium': Thumbnail.optional(),
'high': Thumbnail.optional(),
'standard': Thumbnail.optional(),
'maxres': Thumbnail.optional()
});

export const parseThumbnailDetails = (value) => ThumbnailDetails.parse(value);

const VideoLocalization = z.object({
'title': z.string().optional(),
'description': z.string().optional()
});

export const parseVideoLocalization = (value) => VideoLocalization.parse(value);

const VideoSnippet = z.object({
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

export const parseVideoSnippet = (value) => VideoSnippet.parse(value);

const VideoContentDetails = z.object({
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

export const parseVideoContentDetails = (value) => VideoContentDetails.parse(value);

const VideoStatus = z.object({
'uploadStatus': z.enum(['deleted', 'failed', 'processed', 'rejected', 'uploaded']).optional(),
'failureReason': z.enum(['codec', 'conversion', 'emptyFile', 'invalidFile', 'tooSmall', 'uploadAborted']).optional(),
'rejectionReason': z.enum(['claim', 'copyright', 'duplicate', 'inappropriate', 'legal', 'length', 'termsOfUse', 'trademark', 'uploaderAccountClosed', 'uploaderAccountSuspended']).optional(),
'privacyStatus': z.enum(['private', 'public', 'unlisted']).optional(),
'license': z.enum(['creativeCommon', 'youtube']).optional(),
'embeddable': z.boolean().optional(),
'publicStatsViewable': z.boolean().optional(),
'madeForKids': z.boolean().optional()
});

export const parseVideoStatus = (value) => VideoStatus.parse(value);

const VideoStatistics = z.object({
'viewCount': z.string().optional(),
'likeCount': z.string().optional(),
'dislikeCount': z.string().optional(),
'favoriteCount': z.string().optional(),
'commentCount': z.string().optional()
});

export const parseVideoStatistics = (value) => VideoStatistics.parse(value);

const VideoPlayer = z.object({
'embedHtml': z.string().optional(),
'embedHeight': z.number().int().optional(),
'embedWidth': z.number().int().optional()
});

export const parseVideoPlayer = (value) => VideoPlayer.parse(value);

/**
 * A video resource represents a YouTube video.
 */
const Video = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'id': z.string().optional(),
'snippet': VideoSnippet.optional(),
'contentDetails': VideoContentDetails.optional(),
'status': VideoStatus.optional(),
'statistics': VideoStatistics.optional(),
'player': VideoPlayer.optional()
});

export const parseVideo = (value) => Video.parse(value);

const VideoListResponse = z.object({
'kind': z.string().optional(),
'etag': z.string().optional(),
'nextPageToken': z.string().optional(),
'prevPageToken': z.string().optional(),
'pageInfo': PageInfo.optional(),
'items': z.array(Video).optional()
});

export const parseVideoListResponse = (value) => VideoListResponse.parse(value);

const ErrorResponse = z.object({
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

export const parseErrorResponse = (value) => ErrorResponse.parse(value);

export const parseYoutubeVideosListSearchParams = (value) => z.object({
'part': z.array(z.enum(['contentDetails', 'fileDetails', 'id', 'liveStreamingDetails', 'localizations', 'player', 'processingDetails', 'recordingDetails', 'snippet', 'statistics', 'status', 'suggestions', 'topicDetails'])),
'id': z.array(z.string()).optional(),
'chart': z.enum(['chartUnspecified', 'mostPopular']).optional(),
'maxResults': z.number().int().min(1).max(50).optional(),
'pageToken': z.string().optional()
}).parse(value);

export const parseYoutubeVideosInsertSearchParams = (value) => z.object({
'part': z.array(z.enum(['snippet', 'status', 'player']))
}).parse(value);