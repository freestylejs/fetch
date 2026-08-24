import { z } from 'zod';

const EventWebhookRequest = z.object({
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
'friendly_name': z.string().nullable().optional(),
'oauth_client_id': z.string().nullable().optional(),
'oauth_client_secret': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional()
});

export const parseEventWebhookRequest = (value) => EventWebhookRequest.parse(value);

const EventWebhookTestRequest = z.object({
'id': z.string().optional(),
'url': z.string(),
'oauth_client_id': z.string().nullable().optional(),
'oauth_client_secret': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional()
});

export const parseEventWebhookTestRequest = (value) => EventWebhookTestRequest.parse(value);

const EventWebhookBaseResponseProps = z.object({
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
'friendly_name': z.string().nullable().optional(),
'id': z.string().optional()
});

export const parseEventWebhookBaseResponseProps = (value) => EventWebhookBaseResponseProps.parse(value);

const EventWebhookDateResponseProps = z.object({
'created_date': z.iso.datetime().nullable().optional(),
'updated_date': z.iso.datetime().optional()
});

export const parseEventWebhookDateResponseProps = (value) => EventWebhookDateResponseProps.parse(value);

const EventWebhookOauthResponseProps = z.object({
'oauth_client_id': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional()
});

export const parseEventWebhookOauthResponseProps = (value) => EventWebhookOauthResponseProps.parse(value);

const EventWebhookSignedResponseProp = z.object({
'public_key': z.string().optional()
});

export const parseEventWebhookSignedResponseProp = (value) => EventWebhookSignedResponseProp.parse(value);

const EventWebhookUnsignedResponse = z.object({
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
'friendly_name': z.string().nullable().optional(),
'id': z.string().optional(),
'created_date': z.iso.datetime().nullable().optional(),
'updated_date': z.iso.datetime().optional(),
'oauth_client_id': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional()
});

export const parseEventWebhookUnsignedResponse = (value) => EventWebhookUnsignedResponse.parse(value);

const EventWebhookSignedResponse = z.object({
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
'friendly_name': z.string().nullable().optional(),
'id': z.string().optional(),
'created_date': z.iso.datetime().nullable().optional(),
'updated_date': z.iso.datetime().optional(),
'oauth_client_id': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional(),
'public_key': z.string().optional()
});

export const parseEventWebhookSignedResponse = (value) => EventWebhookSignedResponse.parse(value);

const EventWebhookNoDatesResponse = z.object({
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
'friendly_name': z.string().nullable().optional(),
'id': z.string().optional(),
'oauth_client_id': z.string().nullable().optional(),
'oauth_token_url': z.string().nullable().optional(),
'public_key': z.string().optional()
});

export const parseEventWebhookNoDatesResponse = (value) => EventWebhookNoDatesResponse.parse(value);

const EventWebhookAllResponse = z.object({
'max_allowed': z.number().optional(),
'webhooks': z.array(EventWebhookSignedResponse).optional()
});

export const parseEventWebhookAllResponse = (value) => EventWebhookAllResponse.parse(value);

const ParseSetting = z.object({
'url': z.string().optional(),
'hostname': z.string().optional(),
'spam_check': z.boolean().optional(),
'send_raw': z.boolean().optional()
});

export const parseParseSetting = (value) => ParseSetting.parse(value);

const ErrorResponse = z.object({
'errors': z.array(z.object({
'message': z.string().optional(),
'field': z.string().nullable().optional(),
'help': z.object({}).optional()
})).optional(),
'id': z.string().optional()
});

export const parseErrorResponse = (value) => ErrorResponse.parse(value);

const AggregatedBy = z.enum(['day', 'week', 'month']);

export const parseAggregatedBy = (value) => AggregatedBy.parse(value);

export const parseGetSignedEventWebhookResponse = (value) => z.object({
'id': z.string().optional(),
'public_key': z.string().optional()
}).parse(value);

export const parseUpdateSignedEventWebhookBody = (value) => z.object({
'enabled': z.boolean()
}).parse(value);

export const parseUpdateSignedEventWebhookResponse = (value) => z.object({
'id': z.string().optional(),
'public_key': z.string().optional()
}).parse(value);

export const parseListParseSettingResponse = (value) => z.object({
'result': z.array(ParseSetting).optional()
}).parse(value);

export const parseListParseStaticSearchParams = (value) => z.object({
'limit': z.string().optional(),
'offset': z.string().optional(),
'aggregated_by': AggregatedBy.optional(),
'start_date': z.string(),
'end_date': z.string().optional()
}).parse(value);

export const parseListParseStaticResponse = (value) => z.array(z.object({
'date': z.string(),
'stats': z.array(z.object({
'metrics': z.object({
'received': z.number()
}).optional()
}))
})).parse(value);

export const parseCreateSecurityPolicyBody = (value) => z.object({
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'client_secret': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional(),
'signature': z.object({
'enabled': z.boolean().optional()
}).optional()
}).parse(value);

export const parseCreateSecurityPolicyResponse = (value) => z.object({
'policy': z.object({
'id': z.string().optional(),
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional(),
'signature': z.object({
'public_key': z.string().optional()
}).optional()
}).optional()
}).parse(value);

export const parseListAllSecurityPoliciesResponse = (value) => z.object({
'policies': z.array(z.object({
'id': z.string().optional(),
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional(),
'signature': z.object({
'public_key': z.string().optional()
}).optional()
})).optional()
}).parse(value);

export const parseUpdateSecurityPolicyBody = (value) => z.object({
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'client_secret': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional(),
'signature': z.object({
'enabled': z.boolean().optional()
}).optional()
}).parse(value);

export const parseUpdateSecurityPolicyResponse = (value) => z.object({
'policy': z.object({
'id': z.string().optional(),
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional()
}).optional()
}).parse(value);

export const parseGetSecurityPolicyResponse = (value) => z.object({
'policy': z.object({
'id': z.string().optional(),
'name': z.string().optional(),
'oauth': z.object({
'client_id': z.string().optional(),
'token_url': z.string().optional(),
'scopes': z.array(z.string()).optional()
}).optional(),
'signature': z.object({
'public_key': z.string().optional()
}).optional()
}).optional()
}).parse(value);

export const parseDeleteSecurityPolicySearchParams = (value) => z.object({
'force': z.boolean().optional()
}).parse(value);

export const parseDeleteSecurityPolicyResponse = (value) => z.object({
'policy': z.string().nullable().optional()
}).parse(value);