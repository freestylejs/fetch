import type { EventWebhookRequestModel, EventWebhookTestRequestModel, EventWebhookBaseResponsePropsModel, EventWebhookDateResponsePropsModel, EventWebhookOauthResponsePropsModel, EventWebhookSignedResponsePropModel, EventWebhookUnsignedResponseModel, EventWebhookSignedResponseModel, EventWebhookNoDatesResponseModel, EventWebhookAllResponseModel, ParseSettingModel, ErrorResponseModel, AggregatedByModel, GetSignedEventWebhookResponseModel, UpdateSignedEventWebhookBodyModel, UpdateSignedEventWebhookResponseModel, ListParseSettingResponseModel, ListParseStaticSearchParamsModel, ListParseStaticResponseModel, CreateSecurityPolicyBodyModel, CreateSecurityPolicyResponseModel, ListAllSecurityPoliciesResponseModel, UpdateSecurityPolicyBodyModel, UpdateSecurityPolicyResponseModel, GetSecurityPolicyResponseModel, DeleteSecurityPolicySearchParamsModel, DeleteSecurityPolicyResponseModel } from './types';

export declare const parseEventWebhookRequest: (value: unknown) => EventWebhookRequestModel;

export declare const parseEventWebhookTestRequest: (value: unknown) => EventWebhookTestRequestModel;

export declare const parseEventWebhookBaseResponseProps: (value: unknown) => EventWebhookBaseResponsePropsModel;

export declare const parseEventWebhookDateResponseProps: (value: unknown) => EventWebhookDateResponsePropsModel;

export declare const parseEventWebhookOauthResponseProps: (value: unknown) => EventWebhookOauthResponsePropsModel;

export declare const parseEventWebhookSignedResponseProp: (value: unknown) => EventWebhookSignedResponsePropModel;

export declare const parseEventWebhookUnsignedResponse: (value: unknown) => EventWebhookUnsignedResponseModel;

export declare const parseEventWebhookSignedResponse: (value: unknown) => EventWebhookSignedResponseModel;

export declare const parseEventWebhookNoDatesResponse: (value: unknown) => EventWebhookNoDatesResponseModel;

export declare const parseEventWebhookAllResponse: (value: unknown) => EventWebhookAllResponseModel;

export declare const parseParseSetting: (value: unknown) => ParseSettingModel;

export declare const parseErrorResponse: (value: unknown) => ErrorResponseModel;

export declare const parseAggregatedBy: (value: unknown) => AggregatedByModel;

export declare const parseGetSignedEventWebhookResponse: (value: unknown) => GetSignedEventWebhookResponseModel;

export declare const parseUpdateSignedEventWebhookBody: (value: unknown) => UpdateSignedEventWebhookBodyModel;

export declare const parseUpdateSignedEventWebhookResponse: (value: unknown) => UpdateSignedEventWebhookResponseModel;

export declare const parseListParseSettingResponse: (value: unknown) => ListParseSettingResponseModel;

export declare const parseListParseStaticSearchParams: (value: unknown) => ListParseStaticSearchParamsModel;

export declare const parseListParseStaticResponse: (value: unknown) => ListParseStaticResponseModel;

export declare const parseCreateSecurityPolicyBody: (value: unknown) => CreateSecurityPolicyBodyModel;

export declare const parseCreateSecurityPolicyResponse: (value: unknown) => CreateSecurityPolicyResponseModel;

export declare const parseListAllSecurityPoliciesResponse: (value: unknown) => ListAllSecurityPoliciesResponseModel;

export declare const parseUpdateSecurityPolicyBody: (value: unknown) => UpdateSecurityPolicyBodyModel;

export declare const parseUpdateSecurityPolicyResponse: (value: unknown) => UpdateSecurityPolicyResponseModel;

export declare const parseGetSecurityPolicyResponse: (value: unknown) => GetSecurityPolicyResponseModel;

export declare const parseDeleteSecurityPolicySearchParams: (value: unknown) => DeleteSecurityPolicySearchParamsModel;

export declare const parseDeleteSecurityPolicyResponse: (value: unknown) => DeleteSecurityPolicyResponseModel;