import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.sendgrid.com',
        middleware
    }, {
'v3': {
'user': {
'webhooks': {
'event': {
'settings': {
/**
 * Create a new Event Webhook
 *
 * **This endpoint allows you to create a new Event Webhook.**
 * 
 * When creating a webhook, you will provide a URL where you want the webhook to send POST requests, and you will select which events you want to receive in those request. See the [**Event Webhook Reference**](https://docs.sendgrid.com/for-developers/tracking-events/event#delivery-events) for details about each event type.
 * 
 * ### Webhook identifiers
 * 
 * When your webhook is succesfully created, you will receive a webhook `id` in the response returned by this endpoint. You can use that ID to [update the webhook's settings](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook), [delete the webhook](https://docs.sendgrid.com/api-reference/webhooks/delete-an-event-webhook), [enable or disable signature verification for the webhook](https://docs.sendgrid.com/api-reference/webhooks/toggle-signature-verification-for-an-event-webhook), and, if signature verification is enabled, [retrieve the webhook's public key](https://docs.sendgrid.com/api-reference/webhooks/get-signed-event-webhooks-public-key).
 * 
 * You may also assign an optional friendly name to each of your webhooks. The friendly name is for convenience only and should not be used to programmatically differentiate your webhooks because it does not need to be unique. Use the webhook ID to reliably differentiate among your webhooks.
 * 
 * ### OAuth
 * 
 * You can optionally configure OAuth verification for your webhook at the time of creation by passing the appropriate values in the `oauth_client_id`, `oauth_client_secret`, and `oauth_token_url` properties. You can enable or disable OAuth for the webhook after creation with the [**Update an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook) operation.
 * 
 * You may share one OAuth configuration across all your webhooks or create unique credentials for each. See our [webhook security documentation](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features#oauth-20) for details about OAuth and the Event Webhook.
 * 
 * ### Signature verification
 * 
 * Enabling signature verification for your webhook is a separate process and cannot be done at the time of creation with this endpoint. You can use the webhook ID to [enable or disable signature verification with the endpoint dedicated for that operation](https://docs.sendgrid.com/api-reference/webhooks/toggle-signature-verification-for-an-event-webhook).
 */
'POST': f.builder().def_json().def_body(Model.EventWebhookRequest.parse).def_response(async ({ json }) => Model.EventWebhookUnsignedResponse.parse(await json())),
'all': {
/**
 * Retrieve all of your Event Webhooks.
 *
 * **This endpoint allows you to retrieve all of your Event Webhooks.**
 * 
 * Each webhook will be returned as an object in the `webhooks` array with the webhook's configuration details and ID. You can use a webhook's ID to [update the webhook's settings](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook), [delete the webhook](https://docs.sendgrid.com/api-reference/webhooks/delete-an-event-webhook), [enable or disable signature verification for the webhook](https://docs.sendgrid.com/api-reference/webhooks/toggle-signature-verification-for-an-event-webhook), and, if signature verification is enabled, [retrieve the webhook's public key](https://docs.sendgrid.com/api-reference/webhooks/get-signed-event-webhooks-public-key) when signature verification is enabled.
 * 
 * ### Event settings
 * 
 * Each webhook's settings determine which events will be included in the POST request by the webhook and the URL where the request will be sent. See the [**Event Webhook Reference**](https://docs.sendgrid.com/for-developers/tracking-events/event#delivery-events) for details about each event type.
 * 
 * ### Signature verification
 * 
 * The `public_key` property will be returned only for webhooks with signature verification enabled.
 * 
 * ### OAuth
 * 
 * You may share one OAuth configuration across all your webhooks or create unique credentials for each. The OAuth properties will be returned only for webhooks with OAuth configured.
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.EventWebhookAllResponse.parse(await json()))
},
'signed': {
'$id': {
/**
 * Get Signed Event Webhook's Public Key
 *
 * **This endpoint allows you to retrieve the public key for a single Event Webhook by ID.**
 * 
 * If you do not pass a webhook ID to this endpoint, it will return the public key for your oldest webhook by `created_date`. This means the default key returned by this endpoint when no ID is provided will be for the first webhook you created. This functionality allows customers who do not have multiple webhooks to use this endpoint to retrieve their only webhook's public key, even if they do not supply an ID. If you have multiple webhooks, you can retrieve their IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.
 * 
 * Once you have enabled signature verification for a webhook, you will need the public key provided to verify the signatures on requests coming from Twilio SendGrid. You can use the webhook ID to [enable or disable signature verification with the endpoint dedicated for that operation](https://docs.sendgrid.com/api-reference/webhooks/toggle-signature-verification-for-an-event-webhook).
 * 
 * For more information about cryptographically signing the Event Webhook, see [**Getting Started with the Event Webhook Security Features**](https://sendgrid.com/docs/for-developers/tracking-events/getting-started-event-webhook-security-features).
 */
'GET': f.builder().def_json(),
/**
 * Toggle signature verification for a single Event Webhook by ID
 *
 * **This endpoint allows you to enable or disable signature verification for a single Event Webhook by ID.**
 * 
 * If you do not pass a webhook ID to this endpoint, it will enable signature verification for your oldest webhook by `created_date`. This means the default webhook operated on by this endpoint when no ID is provided will be the first one you created. This functionality allows customers who do not have multiple webhooks to enable or disable signature verifiction for their only webhook, even if they do not supply an ID. If you have multiple webhooks, you can retrieve their IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.
 * 
 * This endpoint accepts a single boolean request property, `enabled`, that can be set `true` or `false` to enable or disable signature verification. This endpoint will return the public key required to verify Twilio SendGrid signatures if it is enabled or an empty string if signing is disabled. You can also retrieve your public key using the [**Get an Event Webhook's Public Key**](https://docs.sendgrid.com/api-reference/webhooks/get-signed-event-webhooks-public-key) endpoint.
 * 
 * For more information about cryptographically signing the Event Webhook, see [**Getting Started with the Event Webhook Security Features**](https://sendgrid.com/docs/for-developers/tracking-events/getting-started-event-webhook-security-features).
 */
'PATCH': f.builder().def_json()
}
},
'$id': {
/**
 * Get the settings for a single Event Webhook.
 *
 * **This endpoint allows you to retrieve a single Event Webhook by ID.**
 * 
 * If you do not pass a webhook ID to this endpoint, it will return your oldest webhook by `created_date`. This means the default webhook returned by this endpoint when no ID is provided will be the first one you created. This functionality allows customers who do not have multiple webhooks to use this endpoint to retrieve their only webhook, even if they do not supply an ID. If you have multiple webhooks, you can retrieve their IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.
 * 
 * ### Event settings
 * 
 * Your webhook will be returned with all of its settings, which include the events that will be included in the POST request by the webhook and the URL where they will be sent. If an event type is marked as `true`, the event webhook will send information about that event type. See the [**Event Webhook Reference**](https://docs.sendgrid.com/for-developers/tracking-events/event#delivery-events) for details about each event type.
 * 
 * ### Signature verification
 * 
 * The `public_key` property will be returned only for webhooks with signature verification enabled.
 * 
 * ### OAuth
 * 
 * You may share one OAuth configuration across all your webhooks or create unique credentials for each. The OAuth properties will be returned only for webhooks with OAuth configured.
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.EventWebhookNoDatesResponse.parse(await json())),
/**
 * Update a single Event Webhook by ID.
 *
 * **This endpoint allows you to update a single Event Webhook by ID.**
 * 
 * If you do not pass a webhook ID to this endpoint, it will update and return your oldest webhook by `created_date`. This means the default webhook updated by this endpoint when no ID is provided will be the first one you created. This functionality allows customers who do not have multiple webhooks to use this endpoint to update their only webhook, even if they do not supply an ID. If you have multiple webhooks, you can retrieve their IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.
 * 
 * ### Enable or disable the webhook
 * 
 * You can set the `enabled` property to `true` to enable the webhook or `false` to disable it. Disabling a webhook will not delete it from your account, but it will prevent the webhook from sending events to your designated URL.
 * 
 * ### URL
 * 
 * A webhook's URL is the endpoint where you want the webhook to send POST requests containing event data. No more than one webhook may be configured to send to the same URL. SendGrid will return an error if you attempt to set a URL for a webhook that is already in use by the user on another webhook.
 * 
 * ### Event settings
 * 
 * If an event type is marked as `true`, the event webhook will send information about that event type. See the [**Event Webhook Reference**](https://docs.sendgrid.com/for-developers/tracking-events/event#delivery-events) for details about each event type.
 * 
 * ### Webhook identifiers
 * 
 * You may assign an optional friendly name to each of your webhooks. The friendly name is for convenience only and should not be used to programmatically differentiate your webhooks because it does not need to be unique.
 * 
 * ### OAuth
 * 
 * You can configure OAuth for your webhook by passing the required values to this endpoint in the `oauth_client_id`, `oauth_client_secret`, and `oauth_token_url` properties. To disable OAuth, pass an empty string to this endpoint for each of the OAuth properties. You may share one OAuth configuration across all your webhooks or create unique credentials for each. See our [webhook security documentation](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features#oauth-20) for more detailed information about OAuth and the Event Webhook.
 * 
 * ### Signature verification
 * 
 * Enabling signature verification for your webhook is a separate process and cannot be done with this endpoint. You can use the webhook ID to [enable or disable signature verification with the endpoint dedicated for that operation](https://docs.sendgrid.com/api-reference/webhooks/toggle-signature-verification-for-an-event-webhook).
 */
'PATCH': f.builder().def_json().def_body(Model.EventWebhookRequest.parse).def_response(async ({ json }) => Model.EventWebhookUnsignedResponse.parse(await json())),
/**
 * Delete a single Event Webhook by ID.
 *
 * **This endpoint allows you to delete a single Event Webhook by ID.**
 * 
 * Unlike the [**Get an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/get-an-event-webhook) and [**Update an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook) endpoints, which will operate on your oldest webhook by `created_date` when you don't provide an ID, this endpoint will return an error if you do not pass it an ID. This behavior prevents customers from unintentionally deleting a webhook. You can retrieve your webhooks' IDs using the [**Get All Event Webhooks**](https://docs.sendgrid.com/api-reference/webhooks/get-all-event-webhooks) endpoint.
 * 
 * ### Enable or disable the webhook
 * 
 * This endpoint will permanently delete the webhook specified. If you instead want to disable a webhook, you can set the `enabled` property to `false` with the [**Update an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/update-an-event-webhook) endpoint.
 */
'DELETE': f.builder().def_json()
}
},
'test': {
/**
 * Test an Event Webhook's settings
 *
 * **This endpoint allows you to test an Event Webhook.**
 * 
 * Retry logic for this endpoint differs from other endpoints, which use a rolling 24-hour retry.
 * 
 * This endpoint will make a POST request with a fake event notification to a URL you provide. This allows you to verify that you have properly configured the webhook before sending real data to your URL.
 * 
 * ### Test OAuth configuration
 * 
 * To test your OAuth configuration, you must include the necessary OAuth properties: `oauth_client_id`, `oauth_client_secret`, and `oauth_token_url`.
 * 
 * If the webhook you are testing already has OAuth credentials saved, you will provide only the `oauth_client_id` and `oauth_token_url`—we will pull the secret for you. If you are testing a new set of OAuth credentials that have not been saved with SendGrid, you must provide all three property values.
 * 
 * You can retrieve a previously saved `oauth_client_id` and `oauth_token_url` from the [**Get an Event Webhook**](https://docs.sendgrid.com/api-reference/webhooks/get-an-event-webhook) endpoint; however, for security reasons, SendGrid will not provide your `oauth_client_secret`.
 */
'POST': f.builder().def_json().def_body(Model.EventWebhookTestRequest.parse)
}
},
'parse': {
'settings': {
/**
 * Retrieve all parse settings
 *
 * **This endpoint allows you to retrieve all of your current inbound parse settings.**
 */
'GET': f.builder().def_json(),
/**
 * Create a parse setting
 *
 * **This endpoint allows you to create a new inbound parse setting.**
 * 
 * Creating an Inbound Parse setting requires two pieces of information: a `url` and a `hostname`.
 * 
 * The `hostname` must correspond to a domain authenticated by Twilio SendGrid on your account. If you need to complete domain authentication, you can use the [Twilio SendGrid App](https://app.sendgrid.com/settings/sender_auth) or the **Authenticate a Domain** endpoint. See [**How to Set Up Domain Authentication**](https://sendgrid.com/docs/ui/account-and-settings/how-to-set-up-domain-authentication/) for instructions.
 * 
 * Any email received by the `hostname` will be parsed when you complete this setup. You must also add a Twilio SendGrid MX record to this domain's DNS records. See [**Setting up the Inbound Parse Webhook**](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/) for full instructions.
 * 
 * The `url` represents a location where the parsed message data will be delivered. Twilio SendGrid will make an HTTP POST request to this `url` with the message data. The `url` must be publicly reachable, and your application must return a `200` status code to signal that the message data has been received.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
'$hostname': {
/**
 * Retrieve a specific parse setting
 *
 * **This endpoint allows you to retrieve a specific inbound parse setting by hostname.**
 * 
 * You can retrieve all your Inbound Parse settings and their associated host names with the "Retrieve all parse settings" endpoint.
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
/**
 * Update a parse setting
 *
 * **This endpoint allows you to update a specific inbound parse setting by hostname.**
 * 
 * You can retrieve all your Inbound Parse settings and their associated host names with the "Retrieve all parse settings" endpoint.
 */
'PATCH': f.builder().def_json().def_response(async ({ json }) => Model.ParseSetting.parse(await json())),
/**
 * Delete a parse setting
 *
 * **This endpoint allows you to delete a specific inbound parse setting by hostname.**
 * 
 * You can retrieve all your Inbound Parse settings and their associated host names with the "Retrieve all parse settings" endpoint.
 */
'DELETE': f.builder().def_json()
}
},
'stats': {
/**
 * Retrieves Inbound Parse Webhook statistics.
 *
 * **This endpoint allows you to retrieve the statistics for your Parse Webhook usage.**
 * 
 * SendGrid's Inbound Parse Webhook allows you to parse the contents and attachments of incoming emails. The Parse API can then POST the parsed emails to a URL that you specify. The Inbound Parse Webhook cannot parse messages greater than 30MB in size, including all attachments.
 * 
 * There are a number of pre-made integrations for the SendGrid Parse Webhook which make processing events easy. You can find these integrations in the [Library Index](https://docs.sendgrid.com/for-developers/sending-email/libraries#webhook-libraries).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ limit: z.string().optional(), offset: z.string().optional(), aggregated_by: AggregatedBy.optional(), start_date: z.string(), end_date: z.string().optional() }).parse)
}
},
'security': {
'policies': {
/**
 * Create a new webhook security policy
 *
 * Create a new webhook security policy. Note: One of signature or oauth must be given to have a valid security policy.
 */
'POST': f.builder().def_json(),
/**
 * Retrieve all webhook security policies for your account
 *
 * Returns a list of all webhook security policies configured for your account, including their IDs, names, and security configurations.
 */
'GET': f.builder().def_json(),
'$id': {
/**
 * Update an existing webhook security policy
 *
 * Update an existing webhook security policy with new configuration values.
 */
'PATCH': f.builder().def_json(),
/**
 * Retrieve a specific webhook security policy
 *
 * Retrieve the details of a specific webhook security policy by its ID.
 */
'GET': f.builder().def_json(),
/**
 * Delete a specific webhook security policy
 *
 * Permanently delete a webhook security policy by its ID.
 */
'DELETE': f.builder().def_json().def_searchparams(z.object({ force: z.boolean().optional() }).parse)
}
}
}
}
}
}
});
}