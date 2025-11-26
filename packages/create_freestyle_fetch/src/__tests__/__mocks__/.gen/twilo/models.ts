import { z } from 'zod';

// Helper types for schemas

export type EventWebhookRequestModel = {
  'enabled'?: boolean | undefined;
  'url': string;
  'group_resubscribe'?: boolean | undefined;
  'delivered'?: boolean | undefined;
  'group_unsubscribe'?: boolean | undefined;
  'spam_report'?: boolean | undefined;
  'bounce'?: boolean | undefined;
  'deferred'?: boolean | undefined;
  'unsubscribe'?: boolean | undefined;
  'processed'?: boolean | undefined;
  'open'?: boolean | undefined;
  'click'?: boolean | undefined;
  'dropped'?: boolean | undefined;
  'friendly_name'?: string | undefined;
  'oauth_client_id'?: string | undefined;
  'oauth_client_secret'?: string | undefined;
  'oauth_token_url'?: string | undefined;
};

export type EventWebhookTestRequestModel = {
  'id'?: string | undefined;
  'url': string;
  'oauth_client_id'?: string | undefined;
  'oauth_client_secret'?: string | undefined;
  'oauth_token_url'?: string | undefined;
};

export type EventWebhookBaseResponsePropsModel = {
  'enabled'?: boolean | undefined;
  'url'?: string | undefined;
  'account_status_change'?: boolean | undefined;
  'group_resubscribe'?: boolean | undefined;
  'delivered'?: boolean | undefined;
  'group_unsubscribe'?: boolean | undefined;
  'spam_report'?: boolean | undefined;
  'bounce'?: boolean | undefined;
  'deferred'?: boolean | undefined;
  'unsubscribe'?: boolean | undefined;
  'processed'?: boolean | undefined;
  'open'?: boolean | undefined;
  'click'?: boolean | undefined;
  'dropped'?: boolean | undefined;
  'friendly_name'?: string | undefined;
  'id'?: string | undefined;
};

export type EventWebhookDateResponsePropsModel = {
  'created_date'?: string | undefined;
  'updated_date'?: string | undefined;
};

export type EventWebhookOauthResponsePropsModel = {
  'oauth_client_id'?: string | undefined;
  'oauth_token_url'?: string | undefined;
};

export type EventWebhookSignedResponsePropModel = {
  'public_key'?: string | undefined;
};

export type EventWebhookUnsignedResponseModel = {
  'enabled'?: boolean | undefined;
  'url'?: string | undefined;
  'account_status_change'?: boolean | undefined;
  'group_resubscribe'?: boolean | undefined;
  'delivered'?: boolean | undefined;
  'group_unsubscribe'?: boolean | undefined;
  'spam_report'?: boolean | undefined;
  'bounce'?: boolean | undefined;
  'deferred'?: boolean | undefined;
  'unsubscribe'?: boolean | undefined;
  'processed'?: boolean | undefined;
  'open'?: boolean | undefined;
  'click'?: boolean | undefined;
  'dropped'?: boolean | undefined;
  'friendly_name'?: string | undefined;
  'id'?: string | undefined;
  'created_date'?: string | undefined;
  'updated_date'?: string | undefined;
  'oauth_client_id'?: string | undefined;
  'oauth_token_url'?: string | undefined;
};

export type EventWebhookSignedResponseModel = {
  'enabled'?: boolean | undefined;
  'url'?: string | undefined;
  'account_status_change'?: boolean | undefined;
  'group_resubscribe'?: boolean | undefined;
  'delivered'?: boolean | undefined;
  'group_unsubscribe'?: boolean | undefined;
  'spam_report'?: boolean | undefined;
  'bounce'?: boolean | undefined;
  'deferred'?: boolean | undefined;
  'unsubscribe'?: boolean | undefined;
  'processed'?: boolean | undefined;
  'open'?: boolean | undefined;
  'click'?: boolean | undefined;
  'dropped'?: boolean | undefined;
  'friendly_name'?: string | undefined;
  'id'?: string | undefined;
  'created_date'?: string | undefined;
  'updated_date'?: string | undefined;
  'oauth_client_id'?: string | undefined;
  'oauth_token_url'?: string | undefined;
  'public_key'?: string | undefined;
};

export type EventWebhookNoDatesResponseModel = {
  'enabled'?: boolean | undefined;
  'url'?: string | undefined;
  'account_status_change'?: boolean | undefined;
  'group_resubscribe'?: boolean | undefined;
  'delivered'?: boolean | undefined;
  'group_unsubscribe'?: boolean | undefined;
  'spam_report'?: boolean | undefined;
  'bounce'?: boolean | undefined;
  'deferred'?: boolean | undefined;
  'unsubscribe'?: boolean | undefined;
  'processed'?: boolean | undefined;
  'open'?: boolean | undefined;
  'click'?: boolean | undefined;
  'dropped'?: boolean | undefined;
  'friendly_name'?: string | undefined;
  'id'?: string | undefined;
  'oauth_client_id'?: string | undefined;
  'oauth_token_url'?: string | undefined;
  'public_key'?: string | undefined;
};

export type EventWebhookAllResponseModel = {
  'max_allowed'?: number | undefined;
  'webhooks'?: EventWebhookSignedResponseModel[] | undefined;
};

export type ParseSettingModel = {
  'url'?: string | undefined;
  'hostname'?: string | undefined;
  'spam_check'?: boolean | undefined;
  'send_raw'?: boolean | undefined;
};

export type ErrorResponseModel = {
  'errors'?: Array<{
  'message'?: string | undefined;
  'field'?: string | undefined;
  'help'?: {} | undefined;
}> | undefined;
  'id'?: string | undefined;
};

export type AggregatedByModel = 'day' | 'week' | 'month';



export const EventWebhookRequest: z.ZodType<EventWebhookRequestModel> = z.object({
'enabled': z.boolean().optional(),
'url': z.string(),
'group_resubscribe': z.boolean().optional(),
'delivered': z.boolean().optional(),
'group_unsubscribe': z.boolean().optional(),
'spam_report': z.boolean().optional(),
'bounce': z.boolean().optional(),
'deferred': z.boolean().optional(),
'unsubscribe': z.boolean().optional(),
'processed': z.boolean().optional(),
'open': z.boolean().optional(),
'click': z.boolean().optional(),
'dropped': z.boolean().optional(),
'friendly_name': z.string().optional(),
'oauth_client_id': z.string().optional(),
'oauth_client_secret': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export const EventWebhookTestRequest: z.ZodType<EventWebhookTestRequestModel> = z.object({
'id': z.string().optional(),
'url': z.string(),
'oauth_client_id': z.string().optional(),
'oauth_client_secret': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export const EventWebhookBaseResponseProps: z.ZodType<EventWebhookBaseResponsePropsModel> = z.object({
'enabled': z.boolean().optional(),
'url': z.string().optional(),
'account_status_change': z.boolean().optional(),
'group_resubscribe': z.boolean().optional(),
'delivered': z.boolean().optional(),
'group_unsubscribe': z.boolean().optional(),
'spam_report': z.boolean().optional(),
'bounce': z.boolean().optional(),
'deferred': z.boolean().optional(),
'unsubscribe': z.boolean().optional(),
'processed': z.boolean().optional(),
'open': z.boolean().optional(),
'click': z.boolean().optional(),
'dropped': z.boolean().optional(),
'friendly_name': z.string().optional(),
'id': z.string().optional()
});

export const EventWebhookDateResponseProps: z.ZodType<EventWebhookDateResponsePropsModel> = z.object({
'created_date': z.iso.datetime().optional(),
'updated_date': z.iso.datetime().optional()
});

export const EventWebhookOauthResponseProps: z.ZodType<EventWebhookOauthResponsePropsModel> = z.object({
'oauth_client_id': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export const EventWebhookSignedResponseProp: z.ZodType<EventWebhookSignedResponsePropModel> = z.object({
'public_key': z.string().optional()
});

export const EventWebhookUnsignedResponse: z.ZodType<EventWebhookUnsignedResponseModel> = z.object({
'enabled': z.boolean().optional(),
'url': z.string().optional(),
'account_status_change': z.boolean().optional(),
'group_resubscribe': z.boolean().optional(),
'delivered': z.boolean().optional(),
'group_unsubscribe': z.boolean().optional(),
'spam_report': z.boolean().optional(),
'bounce': z.boolean().optional(),
'deferred': z.boolean().optional(),
'unsubscribe': z.boolean().optional(),
'processed': z.boolean().optional(),
'open': z.boolean().optional(),
'click': z.boolean().optional(),
'dropped': z.boolean().optional(),
'friendly_name': z.string().optional(),
'id': z.string().optional(),
'created_date': z.iso.datetime().optional(),
'updated_date': z.iso.datetime().optional(),
'oauth_client_id': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export const EventWebhookSignedResponse: z.ZodType<EventWebhookSignedResponseModel> = z.object({
'enabled': z.boolean().optional(),
'url': z.string().optional(),
'account_status_change': z.boolean().optional(),
'group_resubscribe': z.boolean().optional(),
'delivered': z.boolean().optional(),
'group_unsubscribe': z.boolean().optional(),
'spam_report': z.boolean().optional(),
'bounce': z.boolean().optional(),
'deferred': z.boolean().optional(),
'unsubscribe': z.boolean().optional(),
'processed': z.boolean().optional(),
'open': z.boolean().optional(),
'click': z.boolean().optional(),
'dropped': z.boolean().optional(),
'friendly_name': z.string().optional(),
'id': z.string().optional(),
'created_date': z.iso.datetime().optional(),
'updated_date': z.iso.datetime().optional(),
'oauth_client_id': z.string().optional(),
'oauth_token_url': z.string().optional(),
'public_key': z.string().optional()
});

export const EventWebhookNoDatesResponse: z.ZodType<EventWebhookNoDatesResponseModel> = z.object({
'enabled': z.boolean().optional(),
'url': z.string().optional(),
'account_status_change': z.boolean().optional(),
'group_resubscribe': z.boolean().optional(),
'delivered': z.boolean().optional(),
'group_unsubscribe': z.boolean().optional(),
'spam_report': z.boolean().optional(),
'bounce': z.boolean().optional(),
'deferred': z.boolean().optional(),
'unsubscribe': z.boolean().optional(),
'processed': z.boolean().optional(),
'open': z.boolean().optional(),
'click': z.boolean().optional(),
'dropped': z.boolean().optional(),
'friendly_name': z.string().optional(),
'id': z.string().optional(),
'oauth_client_id': z.string().optional(),
'oauth_token_url': z.string().optional(),
'public_key': z.string().optional()
});

export const EventWebhookAllResponse: z.ZodType<EventWebhookAllResponseModel> = z.object({
'max_allowed': z.number().optional(),
'webhooks': z.array(EventWebhookSignedResponse).optional()
});

export const ParseSetting: z.ZodType<ParseSettingModel> = z.object({
'url': z.string().optional(),
'hostname': z.string().optional(),
'spam_check': z.boolean().optional(),
'send_raw': z.boolean().optional()
});

export const ErrorResponse: z.ZodType<ErrorResponseModel> = z.object({
'errors': z.array(z.object({
'message': z.string().optional(),
'field': z.string().optional(),
'help': z.object({}).optional()
})).optional(),
'id': z.string().optional()
});

export const AggregatedBy: z.ZodType<AggregatedByModel> = z.enum(['day', 'week', 'month']);