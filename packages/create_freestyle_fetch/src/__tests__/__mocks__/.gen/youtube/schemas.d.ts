import type { VideoListResponseModel, PageInfoModel, VideoModel, VideoSnippetModel, ThumbnailDetailsModel, ThumbnailModel, VideoStatusModel, VideoStatisticsModel, VideoPlayerModel, VideoContentDetailsModel, VideoLocalizationModel, ErrorResponseModel, YoutubeVideosListSearchParamsModel, YoutubeVideosInsertSearchParamsModel } from './types';

export declare const parseVideoListResponse: (value: unknown) => VideoListResponseModel;

export declare const parsePageInfo: (value: unknown) => PageInfoModel;

export declare const parseVideo: (value: unknown) => VideoModel;

export declare const parseVideoSnippet: (value: unknown) => VideoSnippetModel;

export declare const parseThumbnailDetails: (value: unknown) => ThumbnailDetailsModel;

export declare const parseThumbnail: (value: unknown) => ThumbnailModel;

export declare const parseVideoStatus: (value: unknown) => VideoStatusModel;

export declare const parseVideoStatistics: (value: unknown) => VideoStatisticsModel;

export declare const parseVideoPlayer: (value: unknown) => VideoPlayerModel;

export declare const parseVideoContentDetails: (value: unknown) => VideoContentDetailsModel;

export declare const parseVideoLocalization: (value: unknown) => VideoLocalizationModel;

export declare const parseErrorResponse: (value: unknown) => ErrorResponseModel;

export declare const parseYoutubeVideosListSearchParams: (value: unknown) => YoutubeVideosListSearchParamsModel;

export declare const parseYoutubeVideosInsertSearchParams: (value: unknown) => YoutubeVideosInsertSearchParamsModel;