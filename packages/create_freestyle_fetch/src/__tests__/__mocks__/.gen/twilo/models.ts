import { z } from 'zod';

export const EventWebhookRequest = z.object({
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

export type EventWebhookRequestModel = z.infer<typeof EventWebhookRequest>;

export const EventWebhookTestRequest = z.object({
'id': z.string().optional(),
'url': z.string(),
'oauth_client_id': z.string().optional(),
'oauth_client_secret': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export type EventWebhookTestRequestModel = z.infer<typeof EventWebhookTestRequest>;

export const EventWebhookBaseResponseProps = z.object({
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

export type EventWebhookBaseResponsePropsModel = z.infer<typeof EventWebhookBaseResponseProps>;

export const EventWebhookDateResponseProps = z.object({
'created_date': z.iso.datetime().optional(),
'updated_date': z.iso.datetime().optional()
});

export type EventWebhookDateResponsePropsModel = z.infer<typeof EventWebhookDateResponseProps>;

export const EventWebhookOauthResponseProps = z.object({
'oauth_client_id': z.string().optional(),
'oauth_token_url': z.string().optional()
});

export type EventWebhookOauthResponsePropsModel = z.infer<typeof EventWebhookOauthResponseProps>;

export const EventWebhookSignedResponseProp = z.object({
'public_key': z.string().optional()
});

export type EventWebhookSignedResponsePropModel = z.infer<typeof EventWebhookSignedResponseProp>;

export const EventWebhookUnsignedResponse = z.object({
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

export type EventWebhookUnsignedResponseModel = z.infer<typeof EventWebhookUnsignedResponse>;

export const EventWebhookSignedResponse = z.object({
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

export type EventWebhookSignedResponseModel = z.infer<typeof EventWebhookSignedResponse>;

export const EventWebhookNoDatesResponse = z.object({
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

export type EventWebhookNoDatesResponseModel = z.infer<typeof EventWebhookNoDatesResponse>;

export const EventWebhookAllResponse = z.object({
'max_allowed': z.number().optional(),
'webhooks': z.array(EventWebhookSignedResponse).optional()
});

export type EventWebhookAllResponseModel = z.infer<typeof EventWebhookAllResponse>;

export const ParseSetting = z.object({
'url': z.string().optional(),
'hostname': z.string().optional(),
'spam_check': z.boolean().optional(),
'send_raw': z.boolean().optional()
});

export type ParseSettingModel = z.infer<typeof ParseSetting>;

export const ErrorResponse = z.object({
'errors': z.array(z.object({
'message': z.string().optional(),
'field': z.string().optional(),
'help': z.object({}).optional()
})).optional(),
'id': z.string().optional()
});

export type ErrorResponseModel = z.infer<typeof ErrorResponse>;

export const AggregatedBy = z.enum(['day', 'week', 'month']);

export type AggregatedByModel = z.infer<typeof AggregatedBy>;