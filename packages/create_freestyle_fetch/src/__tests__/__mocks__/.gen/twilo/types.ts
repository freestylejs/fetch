// Helper types for schemas

export type EventWebhookRequestModel = {
  /**
   * Set this property to `true` to enable the Event Webhook or `false` to disable it.
   */
  'enabled'?: boolean | undefined;
  /**
   * Set this property to the URL where you want the Event Webhook to send event data.
   */
  'url': string;
  /**
   * Set this property to `true` to receive group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_resubscribe'?: boolean | undefined;
  /**
   * Set this property to `true` to receive delivered events. Delivered events occur when a message has been successfully delivered to the receiving server.
   */
  'delivered'?: boolean | undefined;
  /**
   * Set this property to `true` to receive group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_unsubscribe'?: boolean | undefined;
  /**
   * Set this property to `true` to receive spam report events. Spam reports occur when recipients mark a message as spam.
   */
  'spam_report'?: boolean | undefined;
  /**
   * Set this property to `true` to receive bounce events. A bounce occurs when a receiving server could not or would not accept a message.
   */
  'bounce'?: boolean | undefined;
  /**
   * Set this property to `true` to receive deferred events. Deferred events occur when a recipient's email server temporarily rejects a message.
   */
  'deferred'?: boolean | undefined;
  /**
   * Set this property to `true` to receive unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'unsubscribe'?: boolean | undefined;
  /**
   * Set this property to `true` to receive processed events. Processed events occur when a message has been received by Twilio SendGrid and the message is ready to be delivered.
   */
  'processed'?: boolean | undefined;
  /**
   * Set this property to `true` to receive open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event.
   */
  'open'?: boolean | undefined;
  /**
   * Set this property to `true` to receive click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event.
   */
  'click'?: boolean | undefined;
  /**
   * Set this property to `true` to receive dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota.
   */
  'dropped'?: boolean | undefined;
  /**
   * Optionally set this property to a friendly name for the Event Webhook. A friendly name may be assigned to each of your webhooks to help you differentiate them. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.
   */
  'friendly_name'?: string | null | undefined;
  /**
   * Set this property to the OAuth client ID that SendGrid will pass to your OAuth server or service provider to generate an OAuth access token. When passing data in this property, you must also include the `oauth_token_url` property.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * Set this property to the OAuth client secret that SendGrid will pass to your OAuth server or service provider to generate an OAuth access token. This secret is needed only once to create an access token. SendGrid will store the secret, allowing you to update your client ID and Token URL without passing the secret to SendGrid again. When passing data in this field, you must also include the `oauth_client_id` and `oauth_token_url` properties.
   */
  'oauth_client_secret'?: string | null | undefined;
  /**
   * Set this property to the URL where SendGrid will send the OAuth client ID and client secret to generate an OAuth access token. This should be your OAuth server or service provider. When passing data in this field, you must also include the `oauth_client_id` property.
   */
  'oauth_token_url'?: string | null | undefined;
};

export type EventWebhookTestRequestModel = {
  /**
   * The ID of the Event Webhook you want to retrieve.
   */
  'id'?: string | undefined;
  /**
   * The URL where you would like the test notification to be sent.
   */
  'url': string;
  /**
   * The client ID Twilio SendGrid sends to your OAuth server or service provider to generate an OAuth access token. When passing data in this property, you must also include the `oauth_token_url` property.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * The `oauth_client_secret` is needed only once to create an access token. SendGrid will store this secret, allowing you to update your Client ID and Token URL without passing the secret to SendGrid again. When passing data in this field, you must also include the `oauth_client_id` and `oauth_token_url` properties.
   */
  'oauth_client_secret'?: string | null | undefined;
  /**
   * The URL where Twilio SendGrid sends the Client ID and Client Secret to generate an access token. This should be your OAuth server or service provider. When passing data in this field, you must also include the `oauth_client_id` property.
   */
  'oauth_token_url'?: string | null | undefined;
};

export type EventWebhookBaseResponsePropsModel = {
  /**
   * Indicates if the Event Webhook is enabled.
   */
  'enabled'?: boolean | undefined;
  /**
   * The URL where SendGrid will send event data.
   */
  'url'?: string | undefined;
  /**
   * Indicates if the webhook is configured to send account status change events related to compliance action taken by SendGrid.
   */
  'account_status_change'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_resubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send delivered events. Delivered events occur when a message has been successfully delivered to the receiving server.
   */
  'delivered'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send spam report events. Spam reports occur when recipients mark a message as spam.
   */
  'spam_report'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send bounce events. A bounce occurs when a receiving server could not or would not accept a message.
   */
  'bounce'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send deferred events. Deferred events occur when a recipient's email server temporarily rejects a message.
   */
  'deferred'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send processed events. Processed events occur when a message has been received by Twilio SendGrid and is ready to be delivered.
   */
  'processed'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event.
   */
  'open'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event.
   */
  'click'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota.
   */
  'dropped'?: boolean | undefined;
  /**
   * An optional friendly name assigned to the Event Webhook to help you differentiate it. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.
   */
  'friendly_name'?: string | null | undefined;
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
};

export type EventWebhookDateResponsePropsModel = {
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was created. If a Webhook's `created_date` is `null`, it is a [legacy Event Webook](https://www.twilio.com/en-us/changelog/event-webhooks), which means it is your oldest Webhook.
   */
  'created_date'?: string | null | undefined;
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was last modified.
   */
  'updated_date'?: string | undefined;
};

export type EventWebhookOauthResponsePropsModel = {
  /**
   * The OAuth client ID SendGrid sends to your OAuth server or service provider to generate an OAuth access token.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * The URL where SendGrid sends the OAuth client ID and client secret to generate an access token. This should be your OAuth server or service provider.
   */
  'oauth_token_url'?: string | null | undefined;
};

export type EventWebhookSignedResponsePropModel = {
  /**
   * The public key you can use to verify the SendGrid signature.
   */
  'public_key'?: string | undefined;
};

export type EventWebhookUnsignedResponseModel = {
  /**
   * Indicates if the Event Webhook is enabled.
   */
  'enabled'?: boolean | undefined;
  /**
   * The URL where SendGrid will send event data.
   */
  'url'?: string | undefined;
  /**
   * Indicates if the webhook is configured to send account status change events related to compliance action taken by SendGrid.
   */
  'account_status_change'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_resubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send delivered events. Delivered events occur when a message has been successfully delivered to the receiving server.
   */
  'delivered'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send spam report events. Spam reports occur when recipients mark a message as spam.
   */
  'spam_report'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send bounce events. A bounce occurs when a receiving server could not or would not accept a message.
   */
  'bounce'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send deferred events. Deferred events occur when a recipient's email server temporarily rejects a message.
   */
  'deferred'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send processed events. Processed events occur when a message has been received by Twilio SendGrid and is ready to be delivered.
   */
  'processed'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event.
   */
  'open'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event.
   */
  'click'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota.
   */
  'dropped'?: boolean | undefined;
  /**
   * An optional friendly name assigned to the Event Webhook to help you differentiate it. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.
   */
  'friendly_name'?: string | null | undefined;
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was created. If a Webhook's `created_date` is `null`, it is a [legacy Event Webook](https://www.twilio.com/en-us/changelog/event-webhooks), which means it is your oldest Webhook.
   */
  'created_date'?: string | null | undefined;
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was last modified.
   */
  'updated_date'?: string | undefined;
  /**
   * The OAuth client ID SendGrid sends to your OAuth server or service provider to generate an OAuth access token.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * The URL where SendGrid sends the OAuth client ID and client secret to generate an access token. This should be your OAuth server or service provider.
   */
  'oauth_token_url'?: string | null | undefined;
};

export type EventWebhookSignedResponseModel = {
  /**
   * Indicates if the Event Webhook is enabled.
   */
  'enabled'?: boolean | undefined;
  /**
   * The URL where SendGrid will send event data.
   */
  'url'?: string | undefined;
  /**
   * Indicates if the webhook is configured to send account status change events related to compliance action taken by SendGrid.
   */
  'account_status_change'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_resubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send delivered events. Delivered events occur when a message has been successfully delivered to the receiving server.
   */
  'delivered'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send spam report events. Spam reports occur when recipients mark a message as spam.
   */
  'spam_report'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send bounce events. A bounce occurs when a receiving server could not or would not accept a message.
   */
  'bounce'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send deferred events. Deferred events occur when a recipient's email server temporarily rejects a message.
   */
  'deferred'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send processed events. Processed events occur when a message has been received by Twilio SendGrid and is ready to be delivered.
   */
  'processed'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event.
   */
  'open'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event.
   */
  'click'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota.
   */
  'dropped'?: boolean | undefined;
  /**
   * An optional friendly name assigned to the Event Webhook to help you differentiate it. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.
   */
  'friendly_name'?: string | null | undefined;
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was created. If a Webhook's `created_date` is `null`, it is a [legacy Event Webook](https://www.twilio.com/en-us/changelog/event-webhooks), which means it is your oldest Webhook.
   */
  'created_date'?: string | null | undefined;
  /**
   * An ISO 8601 timestamp in UTC timezone when the Event Webhook was last modified.
   */
  'updated_date'?: string | undefined;
  /**
   * The OAuth client ID SendGrid sends to your OAuth server or service provider to generate an OAuth access token.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * The URL where SendGrid sends the OAuth client ID and client secret to generate an access token. This should be your OAuth server or service provider.
   */
  'oauth_token_url'?: string | null | undefined;
  /**
   * The public key you can use to verify the SendGrid signature.
   */
  'public_key'?: string | undefined;
};

export type EventWebhookNoDatesResponseModel = {
  /**
   * Indicates if the Event Webhook is enabled.
   */
  'enabled'?: boolean | undefined;
  /**
   * The URL where SendGrid will send event data.
   */
  'url'?: string | undefined;
  /**
   * Indicates if the webhook is configured to send account status change events related to compliance action taken by SendGrid.
   */
  'account_status_change'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group resubscribe events. Group resubscribes occur when recipients resubscribe to a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_resubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send delivered events. Delivered events occur when a message has been successfully delivered to the receiving server.
   */
  'delivered'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send group unsubscribe events. Group unsubscribes occur when recipients unsubscribe from a specific [unsubscribe group](https://docs.sendgrid.com/ui/sending-email/create-and-manage-unsubscribe-groups) either by direct link or by updating their subscription preferences. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'group_unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send spam report events. Spam reports occur when recipients mark a message as spam.
   */
  'spam_report'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send bounce events. A bounce occurs when a receiving server could not or would not accept a message.
   */
  'bounce'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send deferred events. Deferred events occur when a recipient's email server temporarily rejects a message.
   */
  'deferred'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send unsubscribe events. Unsubscribes occur when recipients click on a message's subscription management link. You must [enable Subscription Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#subscription-tracking) to receive this type of event.
   */
  'unsubscribe'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send processed events. Processed events occur when a message has been received by Twilio SendGrid and is ready to be delivered.
   */
  'processed'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send open events. Open events occur when a recipient has opened the HTML message. You must [enable Open Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#open-tracking) to receive this type of event.
   */
  'open'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send click events. Click events occur when a recipient clicks on a link within the message. You must [enable Click Tracking](https://docs.sendgrid.com/ui/account-and-settings/tracking#click-tracking) to receive this type of event.
   */
  'click'?: boolean | undefined;
  /**
   * Indicates if the webhook is configured to send dropped events. Dropped events occur when your message is not delivered by Twilio SendGrid. Dropped events are accomponied by a `reason` property, which indicates why the message was dropped. Reasons for a dropped message include: Invalid SMTPAPI header, Spam Content (if spam checker app enabled), Unsubscribed Address, Bounced Address, Spam Reporting Address, Invalid, Recipient List over Package Quota.
   */
  'dropped'?: boolean | undefined;
  /**
   * An optional friendly name assigned to the Event Webhook to help you differentiate it. The friendly name is for convenience only. You should use the webhook `id` property for any programmatic tasks.
   */
  'friendly_name'?: string | null | undefined;
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
  /**
   * The OAuth client ID SendGrid sends to your OAuth server or service provider to generate an OAuth access token.
   */
  'oauth_client_id'?: string | null | undefined;
  /**
   * The URL where SendGrid sends the OAuth client ID and client secret to generate an access token. This should be your OAuth server or service provider.
   */
  'oauth_token_url'?: string | null | undefined;
  /**
   * The public key you can use to verify the SendGrid signature.
   */
  'public_key'?: string | undefined;
};

export type EventWebhookAllResponseModel = {
  /**
   * The maximum number of Event Webhooks you can have enabled under your current Twilio SendGrid plan. See the [Twilio SendGrid pricing page](https://sendgrid.com/pricing) for more information about the features available with each plan.
   */
  'max_allowed'?: number | undefined;
  /**
   * An array of Event Webhook objects. Each object represents one of your webhooks and contains its configuration settings, including which events it is set to send in the POST request, the URL where it will send those events, and the webhook's ID.
   */
  'webhooks'?: EventWebhookSignedResponseModel[] | undefined;
};

export type ParseSettingModel = {
  /**
   * The public URL where you would like SendGrid to POST the data parsed from your email. Any emails sent with the given hostname provided (whose MX records have been updated to point to SendGrid) will be parsed and POSTed to this URL.
   */
  'url'?: string | undefined;
  /**
   * A specific and unique domain or subdomain that you have created to use exclusively to parse your incoming email. For example, `parse.yourdomain.com`.
   */
  'hostname'?: string | undefined;
  /**
   * Indicates if you would like SendGrid to check the content parsed from your emails for spam before POSTing them to your domain.
   */
  'spam_check'?: boolean | undefined;
  /**
   * Indicates if you would like SendGrid to post the original MIME-type content of your parsed email. When this parameter is set to `true`, SendGrid will send a JSON payload of the content of your email.
   */
  'send_raw'?: boolean | undefined;
};

export type ErrorResponseModel = {
  'errors'?: Array<{
  /**
   * An error message.
   */
  'message'?: string | undefined;
  /**
   * When applicable, this property value will be the field that generated the error.
   */
  'field'?: string | null | undefined;
  /**
   * When applicable, this property value will be helper text or a link to documentation to help you troubleshoot the error.
   */
  'help'?: {} | undefined;
}> | undefined;
  /**
   * When applicable, this property value will be an error ID.
   */
  'id'?: string | undefined;
};

export type AggregatedByModel = 'day' | 'week' | 'month';

export type GetSignedEventWebhookResponseModel = {
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
  /**
   * The public key you can use to verify the Twilio SendGrid signature.
   */
  'public_key'?: string | undefined;
};

export type UpdateSignedEventWebhookBodyModel = {
  /**
   * Enable or disable the webhook by setting this property to `true` or `false`, respectively.
   */
  'enabled': boolean;
};

export type UpdateSignedEventWebhookResponseModel = {
  /**
   * A unique string used to identify the webhook. A webhook's ID is generated programmatically and cannot be changed after creation. You can assign a natural language identifier to your webhook using the `friendly_name` property.
   */
  'id'?: string | undefined;
  /**
   * The public key you can use to verify the Twilio SendGrid signature.
   */
  'public_key'?: string | undefined;
};

export type ListParseSettingResponseModel = {
  /**
   * The list of your current inbound parse settings.
   */
  'result'?: ParseSettingModel[] | undefined;
};

export type ListParseStaticSearchParamsModel = {
  'limit'?: string | undefined;
  'offset'?: string | undefined;
  'aggregated_by'?: AggregatedByModel | undefined;
  'start_date': string;
  'end_date'?: string | undefined;
};

export type ListParseStaticResponseModel = Array<{
  /**
   * The date that the stats were collected.
   */
  'date': string;
  /**
   * The Parse Webhook usage statistics.
   */
  'stats': Array<{
  'metrics'?: {
  /**
   * The number of emails received and parsed by the Parse Webhook.
   */
  'received': number;
} | undefined;
}>;
}>;

export type CreateSecurityPolicyBodyModel = {
  /**
   * User-defined policy name
   */
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'client_secret'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
  'signature'?: {
  'enabled'?: boolean | undefined;
} | undefined;
};

export type CreateSecurityPolicyResponseModel = {
  'policy'?: {
  'id'?: string | undefined;
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
  'signature'?: {
  'public_key'?: string | undefined;
} | undefined;
} | undefined;
};

export type ListAllSecurityPoliciesResponseModel = {
  'policies'?: Array<{
  'id'?: string | undefined;
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
  'signature'?: {
  'public_key'?: string | undefined;
} | undefined;
}> | undefined;
};

export type UpdateSecurityPolicyBodyModel = {
  /**
   * User-defined policy name
   */
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'client_secret'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
  'signature'?: {
  'enabled'?: boolean | undefined;
} | undefined;
};

export type UpdateSecurityPolicyResponseModel = {
  'policy'?: {
  'id'?: string | undefined;
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
} | undefined;
};

export type GetSecurityPolicyResponseModel = {
  'policy'?: {
  'id'?: string | undefined;
  'name'?: string | undefined;
  'oauth'?: {
  'client_id'?: string | undefined;
  'token_url'?: string | undefined;
  'scopes'?: string[] | undefined;
} | undefined;
  'signature'?: {
  'public_key'?: string | undefined;
} | undefined;
} | undefined;
};

export type DeleteSecurityPolicySearchParamsModel = {
  'force'?: boolean | undefined;
};

export type DeleteSecurityPolicyResponseModel = {
  'policy'?: string | null | undefined;
};