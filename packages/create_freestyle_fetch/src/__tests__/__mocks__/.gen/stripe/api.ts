import { f } from '@freestylejs/fetch';
import { z } from 'zod';
import * as Model from './models';
import { createAuthMiddleware, AuthConfig } from './auth';

export const createClient = (config: { baseUrl?: string, auth?: AuthConfig } = {}) => {
    const authMw = config.auth ? createAuthMiddleware(config.auth) : undefined
    const middleware = authMw ? authMw : []

    return f.router({
        baseUrl: config.baseUrl || 'https://api.stripe.com/',
        middleware
    }, {
'v1': {
'account': {
/**
 * Retrieve account
 *
 * Retrieves the details of an account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Account.parse(await json()))
},
'account_links': {
/**
 * Create an account link
 *
 * Creates an AccountLink object that includes a single-use Stripe URL that the platform can redirect their user to in order to take them through the Connect Onboarding flow.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AccountLink.parse(await json()))
},
'account_sessions': {
/**
 * Create an Account Session
 *
 * Creates a AccountSession object that includes a single-use token that the platform can use on their front-end to grant client-side API access.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AccountSession.parse(await json()))
},
'accounts': {
/**
 * List all connected accounts
 *
 * Returns a list of accounts connected to your platform via [Connect](/docs/connect). If you’re not a platform, the list is empty.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * With [Connect](/docs/connect), you can create Stripe accounts for your users.
 * To do this, you’ll first need to [register your platform](https://dashboard.stripe.com/account/applications/settings).
 * 
 * If you’ve already collected information for your connected accounts, you [can prefill that information](/docs/connect/best-practices#onboarding) when
 * creating the account. Connect Onboarding won’t ask for the prefilled information during account onboarding.
 * You can prefill any information on the account.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json())),
'$account': {
/**
 * Delete an account
 *
 * With [Connect](/connect), you can delete accounts you manage.
 * 
 * Test-mode accounts can be deleted at any time.
 * 
 * Live-mode accounts that have access to the standard dashboard and Stripe is responsible for negative account balances cannot be deleted, which includes Standard accounts. All other Live-mode accounts, can be deleted when all [balances](/api/balance/balance_object) are zero.
 * 
 * If you want to delete your own account, use the [account information tab in your account settings](https://dashboard.stripe.com/settings/account) instead.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedAccount.parse(await json())),
/**
 * Retrieve account
 *
 * Retrieves the details of an account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Account.parse(await json())),
/**
 * Update an account
 *
 * Updates a [connected account](/connect/accounts) by setting the values of the parameters passed. Any parameters not provided are
 * left unchanged.
 * 
 * For accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
 * is `application`, which includes Custom accounts, you can update any information on the account.
 * 
 * For accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection)
 * is `stripe`, which includes Standard and Express accounts, you can update all information until you create
 * an [Account Link](/api/account_links) or [Account Session](/api/account_sessions) to start Connect onboarding,
 * after which some properties can no longer be updated.
 * 
 * To update your own account, use the [Dashboard](https://dashboard.stripe.com/settings/account). Refer to our
 * [Connect](/docs/connect/updating-accounts) documentation to learn more about updating accounts.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json())),
'bank_accounts': {
/**
 * Create an external account
 *
 * Create an external account for a given account.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'$id': {
/**
 * Delete an external account
 *
 * Delete a specified external account for a given account.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedExternalAccount.parse(await json())),
/**
 * Retrieve an external account
 *
 * Retrieve a specified external account for a given account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
/**
 * Updates the metadata, account holder name, account holder type of a bank account belonging to
 * a connected account and optionally sets it as the default for its currency. Other bank account
 * details are not editable by design.
 * 
 * You can only update bank accounts when [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes [Custom accounts](/connect/custom-accounts).
 * 
 * You can re-enable a disabled bank account by performing an update call without providing any
 * arguments or changes.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'capabilities': {
/**
 * List all account capabilities
 *
 * Returns a list of capabilities associated with the account. The capabilities are returned sorted by creation date, with the most recent capability appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'$capability': {
/**
 * Retrieve an Account Capability
 *
 * Retrieves information about the specified Account Capability.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Capability.parse(await json())),
/**
 * Update an Account Capability
 *
 * Updates an existing Account Capability. Request or remove a capability by updating its `requested` parameter.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Capability.parse(await json()))
}
},
'external_accounts': {
/**
 * List all external accounts
 *
 * List external accounts for an account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), object: z.enum(['bank_account', 'card']).optional(), starting_after: z.string().optional() }).parse),
/**
 * Create an external account
 *
 * Create an external account for a given account.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'$id': {
/**
 * Delete an external account
 *
 * Delete a specified external account for a given account.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedExternalAccount.parse(await json())),
/**
 * Retrieve an external account
 *
 * Retrieve a specified external account for a given account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
/**
 * Updates the metadata, account holder name, account holder type of a bank account belonging to
 * a connected account and optionally sets it as the default for its currency. Other bank account
 * details are not editable by design.
 * 
 * You can only update bank accounts when [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes [Custom accounts](/connect/custom-accounts).
 * 
 * You can re-enable a disabled bank account by performing an update call without providing any
 * arguments or changes.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'login_links': {
/**
 * Create a login link
 *
 * Creates a login link for a connected account to access the Express Dashboard.
 * 
 * **You can only create login links for accounts that use the [Express Dashboard](/connect/express-dashboard) and are connected to your platform**.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.LoginLink.parse(await json()))
},
'people': {
/**
 * List all persons
 *
 * Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), relationship: z.object({
'authorizer': z.boolean().optional(),
'director': z.boolean().optional(),
'executive': z.boolean().optional(),
'legal_guardian': z.boolean().optional(),
'owner': z.boolean().optional(),
'representative': z.boolean().optional()
}).optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a person
 *
 * Creates a new person.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json())),
'$person': {
/**
 * Delete a person
 *
 * Deletes an existing person’s relationship to the account’s legal entity. Any person with a relationship for an account can be deleted through the API, except if the person is the `account_opener`. If your integration is using the `executive` parameter, you cannot delete the only verified `executive` on file.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPerson.parse(await json())),
/**
 * Retrieve a person
 *
 * Retrieves an existing person.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Person.parse(await json())),
/**
 * Update a person
 *
 * Updates an existing person.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json()))
}
},
'persons': {
/**
 * List all persons
 *
 * Returns a list of people associated with the account’s legal entity. The people are returned sorted by creation date, with the most recent people appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), relationship: z.object({
'authorizer': z.boolean().optional(),
'director': z.boolean().optional(),
'executive': z.boolean().optional(),
'legal_guardian': z.boolean().optional(),
'owner': z.boolean().optional(),
'representative': z.boolean().optional()
}).optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a person
 *
 * Creates a new person.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json())),
'$person': {
/**
 * Delete a person
 *
 * Deletes an existing person’s relationship to the account’s legal entity. Any person with a relationship for an account can be deleted through the API, except if the person is the `account_opener`. If your integration is using the `executive` parameter, you cannot delete the only verified `executive` on file.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPerson.parse(await json())),
/**
 * Retrieve a person
 *
 * Retrieves an existing person.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Person.parse(await json())),
/**
 * Update a person
 *
 * Updates an existing person.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json()))
}
},
'reject': {
/**
 * Reject an account
 *
 * With [Connect](/connect), you can reject accounts that you have flagged as suspicious.
 * 
 * Only accounts where your platform is liable for negative account balances, which includes Custom and Express accounts, can be rejected. Test-mode accounts can be rejected at any time. Live-mode accounts can only be rejected after all balances are zero.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json()))
}
}
},
'apple_pay': {
'domains': {
/**
 * List apple pay domains.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ domain_name: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create an apple pay domain.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ApplePayDomain.parse(await json())),
'$domain': {
/**
 * Delete an apple pay domain.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedApplePayDomain.parse(await json())),
/**
 * Retrieve an apple pay domain.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ApplePayDomain.parse(await json()))
}
}
},
'application_fees': {
/**
 * List all application fees
 *
 * Returns a list of application fees you’ve previously collected. The application fees are returned in sorted order, with the most recent fees appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$fee': {
'refunds': {
'$id': {
/**
 * Retrieve an application fee refund
 *
 * By default, you can see the 10 most recent refunds stored directly on the application fee object, but you can also retrieve details about a specific refund stored on the application fee.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FeeRefund.parse(await json())),
/**
 * Update an application fee refund
 *
 * Updates the specified application fee refund by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 * 
 * This request only accepts metadata as an argument.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FeeRefund.parse(await json()))
}
}
},
'$id': {
/**
 * Retrieve an application fee
 *
 * Retrieves the details of an application fee that your account has collected. The same information is returned when refunding the application fee.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ApplicationFee.parse(await json())),
'refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ApplicationFee.parse(await json()))
},
'refunds': {
/**
 * List all application fee refunds
 *
 * You can see a list of the refunds belonging to a specific application fee. Note that the 10 most recent refunds are always available by default on the application fee object. If you need more than those 10, you can use this API method and the `limit` and `starting_after` parameters to page through additional refunds.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create an application fee refund
 *
 * Refunds an application fee that has previously been collected but not yet refunded.
 * Funds will be refunded to the Stripe account from which the fee was originally collected.
 * 
 * You can optionally refund only part of an application fee.
 * You can do so multiple times, until the entire fee has been refunded.
 * 
 * Once entirely refunded, an application fee can’t be refunded again.
 * This method will raise an error when called on an already-refunded application fee,
 * or when trying to refund more money than is left on an application fee.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FeeRefund.parse(await json()))
}
}
},
'apps': {
'secrets': {
/**
 * List secrets
 *
 * List all secrets stored on the given scope.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), scope: z.object({
'type': z.enum(['account', 'user']),
'user': z.string().optional()
}), starting_after: z.string().optional() }).parse),
/**
 * Set a Secret
 *
 * Create or replace a secret in the secret store.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AppsSecret.parse(await json())),
'DELETE': f.builder().def_json(),
'find': {
/**
 * Find a Secret
 *
 * Finds a secret in the secret store by name and scope.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), name: z.string(), scope: z.object({
'type': z.enum(['account', 'user']),
'user': z.string().optional()
}) }).parse).def_response(async ({ json }) => Model.AppsSecret.parse(await json()))
}
}
},
'balance': {
/**
 * Retrieve balance
 *
 * Retrieves the current account balance, based on the authentication that was used to make the request.
 *  For a sample request, see [Accounting for negative balances](/docs/connect/account-balances#accounting-for-negative-balances).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Balance.parse(await json())),
'history': {
/**
 * List all balance transactions
 *
 * Returns a list of transactions that have contributed to the Stripe account balance (e.g., charges, transfers, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first.
 * 
 * Note that this endpoint was previously called “Balance history” and used the path `/v1/balance/history`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payout: z.string().optional(), source: z.string().optional(), starting_after: z.string().optional(), type: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a balance transaction
 *
 * Retrieves the balance transaction with the given ID.
 * 
 * Note that this endpoint previously used the path `/v1/balance/history/:id`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceTransaction.parse(await json()))
}
}
},
'balance_settings': {
/**
 * Retrieve balance settings
 *
 * Retrieves balance settings for a given connected account.
 *  Related guide: [Making API calls for connected accounts](/connect/authentication)
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceSettings.parse(await json())),
/**
 * Update balance settings
 *
 * Updates balance settings for a given connected account.
 *  Related guide: [Making API calls for connected accounts](/connect/authentication)
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BalanceSettings.parse(await json()))
},
'balance_transactions': {
/**
 * List all balance transactions
 *
 * Returns a list of transactions that have contributed to the Stripe account balance (e.g., charges, transfers, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first.
 * 
 * Note that this endpoint was previously called “Balance history” and used the path `/v1/balance/history`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payout: z.string().optional(), source: z.string().optional(), starting_after: z.string().optional(), type: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a balance transaction
 *
 * Retrieves the balance transaction with the given ID.
 * 
 * Note that this endpoint previously used the path `/v1/balance/history/:id`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceTransaction.parse(await json()))
}
},
'billing': {
'alerts': {
/**
 * List billing alerts
 *
 * Lists billing active and inactive alerts
 */
'GET': f.builder().def_json().def_searchparams(z.object({ alert_type: z.enum(['usage_threshold']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), meter: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a billing alert
 *
 * Creates a billing alert
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json())),
'$id': {
/**
 * Retrieve a billing alert
 *
 * Retrieves a billing alert given an ID
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingAlert.parse(await json())),
'activate': {
/**
 * Activate a billing alert
 *
 * Reactivates this alert, allowing it to trigger again.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
},
'archive': {
/**
 * Archive a billing alert
 *
 * Archives this alert, removing it from the list view and APIs. This is non-reversible.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
},
'deactivate': {
/**
 * Deactivate a billing alert
 *
 * Deactivates this alert, preventing it from triggering.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
}
}
},
'credit_balance_summary': {
/**
 * Retrieve the credit balance summary for a customer
 *
 * Retrieves the credit balance summary for a customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string(), expand: z.array(z.string()).optional(), filter: z.object({
'applicability_scope': z.object({
'price_type': z.enum(['metered']).optional(),
'prices': z.array(z.object({
'id': z.string()
})).optional()
}).optional(),
'credit_grant': z.string().optional(),
'type': z.enum(['applicability_scope', 'credit_grant'])
}) }).parse).def_response(async ({ json }) => Model.BillingCreditBalanceSummary.parse(await json()))
},
'credit_balance_transactions': {
/**
 * List credit balance transactions
 *
 * Retrieve a list of credit balance transactions.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ credit_grant: z.string().optional(), customer: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a credit balance transaction
 *
 * Retrieves a credit balance transaction.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingCreditBalanceTransaction.parse(await json()))
}
},
'credit_grants': {
/**
 * List credit grants
 *
 * Retrieve a list of credit grants.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a credit grant
 *
 * Creates a credit grant.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
'$id': {
/**
 * Retrieve a credit grant
 *
 * Retrieves a credit grant.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
/**
 * Update a credit grant
 *
 * Updates a credit grant.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
'expire': {
/**
 * Expire a credit grant
 *
 * Expires a credit grant.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json()))
},
'void': {
/**
 * Void a credit grant
 *
 * Voids a credit grant.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json()))
}
}
},
'meter_event_adjustments': {
/**
 * Create a billing meter event adjustment
 *
 * Creates a billing meter event adjustment.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeterEventAdjustment.parse(await json()))
},
'meter_events': {
/**
 * Create a billing meter event
 *
 * Creates a billing meter event.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeterEvent.parse(await json()))
},
'meters': {
/**
 * List billing meters
 *
 * Retrieve a list of billing meters.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive']).optional() }).parse),
/**
 * Create a billing meter
 *
 * Creates a billing meter.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
'$id': {
/**
 * Retrieve a billing meter
 *
 * Retrieves a billing meter given an ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
/**
 * Update a billing meter
 *
 * Updates a billing meter.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
'deactivate': {
/**
 * Deactivate a billing meter
 *
 * When a meter is deactivated, no more meter events will be accepted for this meter. You can’t attach a deactivated meter to a price.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json()))
},
'event_summaries': {
/**
 * List billing meter event summaries
 *
 * Retrieve a list of billing meter event summaries.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string(), end_time: z.number().int(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), start_time: z.number().int(), starting_after: z.string().optional(), value_grouping_window: z.enum(['day', 'hour']).optional() }).parse)
},
'reactivate': {
/**
 * Reactivate a billing meter
 *
 * When a meter is reactivated, events for this meter can be accepted and you can attach the meter to a price.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json()))
}
}
}
},
'billing_portal': {
'configurations': {
/**
 * List portal configurations
 *
 * Returns a list of configurations that describe the functionality of the customer portal.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), is_default: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a portal configuration
 *
 * Creates a configuration that describes the functionality and behavior of a PortalSession
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json())),
'$configuration': {
/**
 * Retrieve a portal configuration
 *
 * Retrieves a configuration that describes the functionality of the customer portal.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json())),
/**
 * Update a portal configuration
 *
 * Updates a configuration that describes the functionality of the customer portal.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json()))
}
},
'sessions': {
/**
 * Create a portal session
 *
 * Creates a session of the customer portal.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalSession.parse(await json()))
}
},
'charges': {
/**
 * List all charges
 *
 * Returns a list of charges you’ve previously created. The charges are returned in sorted order, with the most recent charges appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional(), transfer_group: z.string().optional() }).parse),
/**
 * This method is no longer recommended—use the [Payment Intents API](/docs/api/payment_intents)
 * to initiate a new payment instead. Confirmation of the PaymentIntent creates the `Charge`
 * object used to request payment.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json())),
'search': {
/**
 * Search charges
 *
 * Search for charges you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$charge': {
/**
 * Retrieve a charge
 *
 * Retrieves the details of a charge that has previously been created. Supply the unique charge ID that was returned from your previous request, and Stripe will return the corresponding charge information. The same information is returned when creating or refunding the charge.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Charge.parse(await json())),
/**
 * Update a charge
 *
 * Updates the specified charge by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json())),
'capture': {
/**
 * Capture a payment
 *
 * Capture the payment of an existing, uncaptured charge that was created with the `capture` option set to false.
 * 
 * Uncaptured payments expire a set number of days after they are created ([7 by default](/docs/charges/placing-a-hold)), after which they are marked as refunded and capture attempts will fail.
 * 
 * Don’t use this method to capture a PaymentIntent-initiated charge. Use [Capture a PaymentIntent](/docs/api/payment_intents/capture).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json()))
},
'dispute': {
/**
 * Retrieve a dispute for a specified charge.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Dispute.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json())),
'close': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json()))
}
},
'refund': {
/**
 * Create a refund
 *
 * When you create a new refund, you must specify either a Charge or a PaymentIntent object.
 * 
 * This action refunds a previously created charge that’s not refunded yet.
 * Funds are refunded to the credit or debit card that’s originally charged.
 * 
 * You can optionally refund only part of a charge.
 * You can repeat this until the entire charge is refunded.
 * 
 * After you entirely refund a charge, you can’t refund it again.
 * This method raises an error when it’s called on an already-refunded charge,
 * or when you attempt to refund more money than is left on a charge.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json()))
},
'refunds': {
/**
 * List all refunds
 *
 * You can see a list of the refunds belonging to a specific charge. Note that the 10 most recent refunds are always available by default on the charge object. If you need more than those 10, you can use this API method and the `limit` and `starting_after` parameters to page through additional refunds.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create customer balance refund
 *
 * When you create a new refund, you must specify a Charge or a PaymentIntent object on which to create it.
 * 
 * Creating a new refund will refund a charge that has previously been created but not yet refunded.
 * Funds will be refunded to the credit or debit card that was originally charged.
 * 
 * You can optionally refund only part of a charge.
 * You can do so multiple times, until the entire charge has been refunded.
 * 
 * Once entirely refunded, a charge can’t be refunded again.
 * This method will raise an error when called on an already-refunded charge,
 * or when trying to refund more money than is left on a charge.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'$refund': {
/**
 * Retrieves the details of an existing refund.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Refund.parse(await json())),
/**
 * Update a specified refund.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
}
},
'checkout': {
'sessions': {
/**
 * List all Checkout Sessions
 *
 * Returns a list of Checkout Sessions.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), customer_details: z.object({
'email': z.string()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), payment_link: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['complete', 'expired', 'open']).optional(), subscription: z.string().optional() }).parse),
/**
 * Create a Checkout Session
 *
 * Creates a Checkout Session object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
'$session': {
/**
 * Retrieve a Checkout Session
 *
 * Retrieves a Checkout Session object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
/**
 * Update a Checkout Session
 *
 * Updates a Checkout Session object.
 * 
 * Related guide: [Dynamically update Checkout](/payments/checkout/dynamic-updates)
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
'expire': {
/**
 * Expire a Checkout Session
 *
 * A Checkout Session can be expired when it is in one of these statuses: `open` 
 * 
 * After it expires, a customer can’t complete a Checkout Session and customers loading the Checkout Session see a message saying the Checkout Session is expired.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json()))
},
'line_items': {
/**
 * Retrieve a Checkout Session's line items
 *
 * When retrieving a Checkout Session, there is an includable **line_items** property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
}
},
'climate': {
'orders': {
/**
 * List orders
 *
 * Lists all Climate order objects. The orders are returned sorted by creation date, with the
 * most recently created orders appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create an order
 *
 * Creates a Climate order object for a given Climate product. The order will be processed immediately
 * after creation and payment will be deducted your Stripe balance.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
'$order': {
/**
 * Retrieve an order
 *
 * Retrieves the details of a Climate order object with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
/**
 * Update an order
 *
 * Updates the specified order by setting the values of the parameters passed.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
'cancel': {
/**
 * Cancel an order
 *
 * Cancels a Climate order. You can cancel an order within 24 hours of creation. Stripe refunds the
 * reservation `amount_subtotal`, but not the `amount_fees` for user-triggered cancellations. Frontier
 * might cancel reservations if suppliers fail to deliver. If Frontier cancels the reservation, Stripe
 * provides 90 days advance notice and refunds the `amount_total`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json()))
}
}
},
'products': {
/**
 * List products
 *
 * Lists all available Climate product objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$product': {
/**
 * Retrieve a product
 *
 * Retrieves the details of a Climate product with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateProduct.parse(await json()))
}
},
'suppliers': {
/**
 * List suppliers
 *
 * Lists all available Climate supplier objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$supplier': {
/**
 * Retrieve a supplier
 *
 * Retrieves a Climate supplier object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateSupplier.parse(await json()))
}
}
},
'confirmation_tokens': {
'$confirmation_token': {
/**
 * Retrieve a ConfirmationToken
 *
 * Retrieves an existing ConfirmationToken object
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ConfirmationToken.parse(await json()))
}
},
'country_specs': {
/**
 * List Country Specs
 *
 * Lists all Country Spec objects available in the API.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$country': {
/**
 * Retrieve a Country Spec
 *
 * Returns a Country Spec for a given Country code.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CountrySpec.parse(await json()))
}
},
'coupons': {
/**
 * List all coupons
 *
 * Returns a list of your coupons.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a coupon
 *
 * You can create coupons easily via the [coupon management](https://dashboard.stripe.com/coupons) page of the Stripe dashboard. Coupon creation is also accessible via the API if you need to create coupons on the fly.
 * 
 * A coupon has either a `percent_off` or an `amount_off` and `currency`. If you set an `amount_off`, that amount will be subtracted from any invoice’s subtotal. For example, an invoice with a subtotal of 100 will have a final total of 0 if a coupon with an `amount_off` of 200 is applied to it and an invoice with a subtotal of 300 will have a final total of 100 if a coupon with an `amount_off` of 200 is applied to it.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Coupon.parse(await json())),
'$coupon': {
/**
 * Delete a coupon
 *
 * You can delete coupons via the [coupon management](https://dashboard.stripe.com/coupons) page of the Stripe dashboard. However, deleting a coupon does not affect any customers who have already applied the coupon; it means that new customers can’t redeem the coupon. You can also delete coupons via the API.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedCoupon.parse(await json())),
/**
 * Retrieve a coupon
 *
 * Retrieves the coupon with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Coupon.parse(await json())),
/**
 * Update a coupon
 *
 * Updates the metadata of a coupon. Other coupon details (currency, duration, amount_off) are, by design, not editable.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Coupon.parse(await json()))
}
},
'credit_notes': {
/**
 * List all credit notes
 *
 * Returns a list of credit notes.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a credit note
 *
 * Issue a credit note to adjust the amount of a finalized invoice. A credit note will first reduce the invoice’s `amount_remaining` (and `amount_due`), but not below zero.
 * This amount is indicated by the credit note’s `pre_payment_amount`. The excess amount is indicated by `post_payment_amount`, and it can result in any combination of the following:
 * 
 * - Refunds: create a new refund (using `refund_amount`) or link existing refunds (using `refunds`).
 * 
 * - Customer balance credit: credit the customer’s balance (using `credit_amount`) which will be automatically applied to their next invoice when it’s finalized.
 * 
 * - Outside of Stripe credit: record the amount that is or will be credited outside of Stripe (using `out_of_band_amount`).
 * 
 * The sum of refunds, customer balance credits, and outside of Stripe credits must equal the `post_payment_amount`.
 * 
 * You may issue multiple credit notes for an invoice. Each credit note may increment the invoice’s `pre_payment_credit_notes_amount`,
 * `post_payment_credit_notes_amount`, or both, depending on the invoice’s `amount_remaining` at the time of credit note creation.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'preview': {
/**
 * Preview a credit note
 *
 * Get a preview of a credit note without creating it.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ amount: z.number().int().optional(), credit_amount: z.number().int().optional(), effective_at: z.number().int().optional(), email_type: z.enum(['credit_note', 'none']).optional(), expand: z.array(z.string()).optional(), invoice: z.string(), lines: z.array(z.object({
'amount': z.number().int().optional(),
'description': z.string().optional(),
'invoice_line_item': z.string().optional(),
'quantity': z.number().int().optional(),
'tax_amounts': z.union([z.array(z.object({
'amount': z.number().int(),
'tax_rate': z.string(),
'taxable_amount': z.number().int()
})), z.enum([''])]).optional(),
'tax_rates': z.union([z.array(z.string()), z.enum([''])]).optional(),
'type': z.enum(['custom_line_item', 'invoice_line_item']),
'unit_amount': z.number().int().optional(),
'unit_amount_decimal': z.string().optional()
})).optional(), memo: z.string().optional(), metadata: z.record(z.string(), z.string()).optional(), out_of_band_amount: z.number().int().optional(), reason: z.enum(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']).optional(), refund_amount: z.number().int().optional(), refunds: z.array(z.object({
'amount_refunded': z.number().int().optional(),
'payment_record_refund': z.object({
'payment_record': z.string(),
'refund_group': z.string()
}).optional(),
'refund': z.string().optional(),
'type': z.enum(['payment_record_refund', 'refund']).optional()
})).optional(), shipping_cost: z.object({
'shipping_rate': z.string().optional()
}).optional() }).parse).def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'lines': {
/**
 * Retrieve a credit note preview's line items
 *
 * When retrieving a credit note preview, you’ll get a **lines** property containing the first handful of those items. This URL you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ amount: z.number().int().optional(), credit_amount: z.number().int().optional(), effective_at: z.number().int().optional(), email_type: z.enum(['credit_note', 'none']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string(), limit: z.number().int().optional(), lines: z.array(z.object({
'amount': z.number().int().optional(),
'description': z.string().optional(),
'invoice_line_item': z.string().optional(),
'quantity': z.number().int().optional(),
'tax_amounts': z.union([z.array(z.object({
'amount': z.number().int(),
'tax_rate': z.string(),
'taxable_amount': z.number().int()
})), z.enum([''])]).optional(),
'tax_rates': z.union([z.array(z.string()), z.enum([''])]).optional(),
'type': z.enum(['custom_line_item', 'invoice_line_item']),
'unit_amount': z.number().int().optional(),
'unit_amount_decimal': z.string().optional()
})).optional(), memo: z.string().optional(), metadata: z.record(z.string(), z.string()).optional(), out_of_band_amount: z.number().int().optional(), reason: z.enum(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']).optional(), refund_amount: z.number().int().optional(), refunds: z.array(z.object({
'amount_refunded': z.number().int().optional(),
'payment_record_refund': z.object({
'payment_record': z.string(),
'refund_group': z.string()
}).optional(),
'refund': z.string().optional(),
'type': z.enum(['payment_record_refund', 'refund']).optional()
})).optional(), shipping_cost: z.object({
'shipping_rate': z.string().optional()
}).optional(), starting_after: z.string().optional() }).parse)
}
},
'$credit_note': {
'lines': {
/**
 * Retrieve a credit note's line items
 *
 * When retrieving a credit note, you’ll get a **lines** property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
},
'$id': {
/**
 * Retrieve a credit note
 *
 * Retrieves the credit note object with the given identifier.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CreditNote.parse(await json())),
/**
 * Update a credit note
 *
 * Updates an existing credit note.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'void': {
/**
 * Void a credit note
 *
 * Marks a credit note as void. Learn more about [voiding credit notes](/docs/billing/invoices/credit-notes#voiding).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json()))
}
}
},
'customer_sessions': {
/**
 * Create a Customer Session
 *
 * Creates a Customer Session object that includes a single-use client secret that you can use on your front-end to grant client-side API access for certain customer resources.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerSession.parse(await json()))
},
'customers': {
/**
 * List all customers
 *
 * Returns a list of your customers. The customers are returned sorted by creation date, with the most recent customers appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), email: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), test_clock: z.string().optional() }).parse),
/**
 * Create a customer
 *
 * Creates a new customer object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Customer.parse(await json())),
'search': {
/**
 * Search customers
 *
 * Search for customers you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$customer': {
/**
 * Delete a customer
 *
 * Permanently deletes a customer. It cannot be undone. Also immediately cancels any active subscriptions on the customer.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedCustomer.parse(await json())),
/**
 * Retrieve a customer
 *
 * Retrieves a Customer object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
/**
 * Update a customer
 *
 * Updates the specified customer by setting the values of the parameters passed. Any parameters not provided will be left unchanged. For example, if you pass the **source** parameter, that becomes the customer’s active source (e.g., a card) to be used for all charges in the future. When you update a customer to a new valid card source by passing the **source** parameter: for each of the customer’s current subscriptions, if the subscription bills automatically and is in the `past_due` state, then the latest open invoice for the subscription with automatic collection enabled will be retried. This retry will not count as an automatic retry, and will not affect the next regularly scheduled payment for the invoice. Changing the **default_source** for a customer will not trigger this behavior.
 * 
 * This request accepts mostly the same arguments as the customer creation call.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Customer.parse(await json())),
'balance_transactions': {
/**
 * List customer balance transactions
 *
 * Returns a list of transactions that updated the customer’s [balances](/docs/billing/customer/balance).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a customer balance transaction
 *
 * Creates an immutable transaction that updates the customer’s credit [balance](/docs/billing/customer/balance).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json())),
'$transaction': {
/**
 * Retrieve a customer balance transaction
 *
 * Retrieves a specific customer balance transaction that updated the customer’s [balances](/docs/billing/customer/balance).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json())),
/**
 * Update a customer credit balance transaction
 *
 * Most credit balance transaction fields are immutable, but you may update its `description` and `metadata`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json()))
}
},
'bank_accounts': {
/**
 * List all bank accounts
 *
 * You can see a list of the bank accounts belonging to a Customer. Note that the 10 most recent sources are always available by default on the Customer. If you need more than those 10, you can use this API method and the `limit` and `starting_after` parameters to page through additional bank accounts.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a card
 *
 * When you create a new credit card, you must specify a customer or recipient on which to create it.
 * 
 * If the card’s owner has no default card, then the new card will become the default.
 * However, if the owner already has a default, then it will not change.
 * To change the default, you should [update the customer](/docs/api#update_customer) to have a new `default_source`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
/**
 * Delete a customer source
 *
 * Delete a specified source for a given customer.
 */
'DELETE': f.builder().def_json(),
/**
 * Retrieve a bank account
 *
 * By default, you can see the 10 most recent sources stored on a Customer directly on the object, but you can also retrieve details about a specific bank account stored on the Stripe account.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BankAccount.parse(await json())),
/**
 * Update a specified source for a given customer.
 */
'POST': f.builder().def_json(),
'verify': {
/**
 * Verify a bank account
 *
 * Verify a specified bank account for a given customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BankAccount.parse(await json()))
}
}
},
'cards': {
/**
 * List all cards
 *
 * You can see a list of the cards belonging to a customer.
 * Note that the 10 most recent sources are always available on the `Customer` object.
 * If you need more than those 10, you can use this API method and the `limit` and `starting_after` parameters to page through additional cards.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a card
 *
 * When you create a new credit card, you must specify a customer or recipient on which to create it.
 * 
 * If the card’s owner has no default card, then the new card will become the default.
 * However, if the owner already has a default, then it will not change.
 * To change the default, you should [update the customer](/docs/api#update_customer) to have a new `default_source`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
/**
 * Delete a customer source
 *
 * Delete a specified source for a given customer.
 */
'DELETE': f.builder().def_json(),
/**
 * Retrieve a card
 *
 * You can always see the 10 most recent cards directly on a customer; this method lets you retrieve details about a specific card stored on the customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Card.parse(await json())),
/**
 * Update a specified source for a given customer.
 */
'POST': f.builder().def_json()
}
},
'cash_balance': {
/**
 * Retrieve a cash balance
 *
 * Retrieves a customer’s cash balance.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CashBalance.parse(await json())),
/**
 * Update a cash balance's settings
 *
 * Changes the settings on a customer’s cash balance.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CashBalance.parse(await json()))
},
'cash_balance_transactions': {
/**
 * List cash balance transactions
 *
 * Returns a list of transactions that modified the customer’s [cash balance](/docs/payments/customer-balance).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$transaction': {
/**
 * Retrieve a cash balance transaction
 *
 * Retrieves a specific cash balance transaction, which updated the customer’s [cash balance](/docs/payments/customer-balance).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CustomerCashBalanceTransaction.parse(await json()))
}
},
'discount': {
/**
 * Delete a customer discount
 *
 * Removes the currently applied discount on a customer.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Discount.parse(await json()))
},
'funding_instructions': {
/**
 * Create or retrieve funding instructions for a customer cash balance
 *
 * Retrieve funding instructions for a customer cash balance. If funding instructions do not yet exist for the customer, new
 * funding instructions will be created. If funding instructions have already been created for a given customer, the same
 * funding instructions will be retrieved. In other words, we will return the same funding instructions each time.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FundingInstructions.parse(await json()))
},
'payment_methods': {
/**
 * List a Customer's PaymentMethods
 *
 * Returns a list of PaymentMethods for a given Customer
 */
'GET': f.builder().def_json().def_searchparams(z.object({ allow_redisplay: z.enum(['always', 'limited', 'unspecified']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']).optional() }).parse),
'$payment_method': {
/**
 * Retrieve a Customer's PaymentMethod
 *
 * Retrieves a PaymentMethod object for a given Customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
}
},
'sources': {
/**
 * List sources for a specified customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), object: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a card
 *
 * When you create a new credit card, you must specify a customer or recipient on which to create it.
 * 
 * If the card’s owner has no default card, then the new card will become the default.
 * However, if the owner already has a default, then it will not change.
 * To change the default, you should [update the customer](/docs/api#update_customer) to have a new `default_source`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
/**
 * Delete a customer source
 *
 * Delete a specified source for a given customer.
 */
'DELETE': f.builder().def_json(),
/**
 * Retrieve a specified source for a given customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
/**
 * Update a specified source for a given customer.
 */
'POST': f.builder().def_json(),
'verify': {
/**
 * Verify a bank account
 *
 * Verify a specified bank account for a given customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BankAccount.parse(await json()))
}
}
},
'subscriptions': {
/**
 * List active subscriptions
 *
 * You can see a list of the customer’s active subscriptions. Note that the 10 most recent active subscriptions are always available by default on the customer object. If you need more than those 10, you can use the limit and starting_after parameters to page through additional subscriptions.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a subscription
 *
 * Creates a new subscription on an existing customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'$subscription_exposed_id': {
/**
 * Cancel a subscription
 *
 * Cancels a customer’s subscription. If you set the `at_period_end` parameter to `true`, the subscription will remain active until the end of the period, at which point it will be canceled and not renewed. Otherwise, with the default `false` value, the subscription is terminated immediately. In either case, the customer will not be charged again for the subscription.
 * 
 * Note, however, that any pending invoice items that you’ve created will still be charged for at the end of the period, unless manually [deleted](#delete_invoiceitem). If you’ve set the subscription to cancel at the end of the period, any pending prorations will also be left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations will be removed.
 * 
 * By default, upon subscription cancellation, Stripe will stop automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
/**
 * Retrieve a subscription
 *
 * Retrieves the subscription with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Subscription.parse(await json())),
/**
 * Update a subscription on a customer
 *
 * Updates an existing subscription on a customer to match the specified parameters. When changing plans or quantities, we will optionally prorate the price we charge next month to make up for any price changes. To preview how the proration will be calculated, use the [upcoming invoice](#upcoming_invoice) endpoint.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'discount': {
/**
 * Delete a customer discount
 *
 * Removes the currently applied discount on a customer.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Discount.parse(await json()))
}
}
},
'tax_ids': {
/**
 * List all Customer tax IDs
 *
 * Returns a list of tax IDs for a customer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a Customer tax ID
 *
 * Creates a new `tax_id` object for a customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxId.parse(await json())),
'$id': {
/**
 * Delete a Customer tax ID
 *
 * Deletes an existing `tax_id` object.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTaxId.parse(await json())),
/**
 * Retrieve a Customer tax ID
 *
 * Retrieves the `tax_id` object with the given identifier.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxId.parse(await json()))
}
}
}
},
'disputes': {
/**
 * List all disputes
 *
 * Returns a list of your disputes.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
'$dispute': {
/**
 * Retrieve a dispute
 *
 * Retrieves the dispute with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Dispute.parse(await json())),
/**
 * Update a dispute
 *
 * When you get a dispute, contacting your customer is always the best first step. If that doesn’t work, you can submit evidence to help us resolve the dispute in your favor. You can do this in your [dashboard](https://dashboard.stripe.com/disputes), but if you prefer, you can use the API to submit evidence programmatically.
 * 
 * Depending on your dispute type, different evidence fields will give you a better chance of winning your dispute. To figure out which evidence fields to provide, see our [guide to dispute types](/docs/disputes/categories).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json())),
'close': {
/**
 * Close a dispute
 *
 * Closing the dispute for a charge indicates that you do not have any evidence to submit and are essentially dismissing the dispute, acknowledging it as lost.
 * 
 * The status of the dispute will change from `needs_response` to `lost`. *Closing a dispute is irreversible*.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json()))
}
}
},
'entitlements': {
'active_entitlements': {
/**
 * List all active entitlements
 *
 * Retrieve a list of active entitlements for a customer
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve an active entitlement
 *
 * Retrieve an active entitlement
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.EntitlementsActiveEntitlement.parse(await json()))
}
},
'features': {
/**
 * List all features
 *
 * Retrieve a list of features
 */
'GET': f.builder().def_json().def_searchparams(z.object({ archived: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), lookup_key: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a feature
 *
 * Creates a feature
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json())),
'$id': {
/**
 * Retrieve a feature
 *
 * Retrieves a feature
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json())),
/**
 * Updates a feature
 *
 * Update a feature’s metadata or permanently deactivate it.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json()))
}
}
},
'ephemeral_keys': {
/**
 * Create an ephemeral key
 *
 * Creates a short-lived API key for a given resource.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EphemeralKey.parse(await json())),
'$key': {
/**
 * Immediately invalidate an ephemeral key
 *
 * Invalidates a short-lived API key for a given resource.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.EphemeralKey.parse(await json()))
}
},
'events': {
/**
 * List all events
 *
 * List events, going back up to 30 days. Each event data is rendered according to Stripe API version at its creation time, specified in [event object](https://docs.stripe.com/api/events/object) `api_version` attribute (not according to your current Stripe API version or `Stripe-Version` header).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), delivery_success: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.string().optional(), types: z.array(z.string()).optional() }).parse),
'$id': {
/**
 * Retrieve an event
 *
 * Retrieves the details of an event if it was created in the last 30 days. Supply the unique identifier of the event, which you might have received in a webhook.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Event.parse(await json()))
}
},
'exchange_rates': {
/**
 * List all exchange rates
 *
 * [Deprecated] The `ExchangeRate` APIs are deprecated. Please use the [FX Quotes API](https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api) instead.
 * 
 * Returns a list of objects that contain the rates at which foreign currencies are converted to one another. Only shows the currencies for which Stripe supports.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$rate_id': {
/**
 * Retrieve an exchange rate
 *
 * [Deprecated] The `ExchangeRate` APIs are deprecated. Please use the [FX Quotes API](https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api) instead.
 * 
 * Retrieves the exchange rates from the given currency to every supported currency.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExchangeRate.parse(await json()))
}
},
'external_accounts': {
'$id': {
/**
 * Updates the metadata, account holder name, account holder type of a bank account belonging to
 * a connected account and optionally sets it as the default for its currency. Other bank account
 * details are not editable by design.
 * 
 * You can only update bank accounts when [account.controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes [Custom accounts](/connect/custom-accounts).
 * 
 * You can re-enable a disabled bank account by performing an update call without providing any
 * arguments or changes.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'file_links': {
/**
 * List all file links
 *
 * Returns a list of file links.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), expired: z.boolean().optional(), file: z.string().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a file link
 *
 * Creates a new file link object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FileLink.parse(await json())),
'$link': {
/**
 * Retrieve a file link
 *
 * Retrieves the file link with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FileLink.parse(await json())),
/**
 * Update a file link
 *
 * Updates an existing file link object. Expired links can no longer be updated.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FileLink.parse(await json()))
}
},
'files': {
/**
 * List all files
 *
 * Returns a list of the files that your account has access to. Stripe sorts and returns the files by their creation dates, placing the most recently created files at the top.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), purpose: z.enum(['account_requirement', 'additional_verification', 'business_icon', 'business_logo', 'customer_signature', 'dispute_evidence', 'document_provider_identity_document', 'finance_report_run', 'financial_account_statement', 'identity_document', 'identity_document_downloadable', 'issuing_regulatory_reporting', 'pci_document', 'platform_terms_of_service', 'selfie', 'sigma_scheduled_query', 'tax_document_user_upload', 'terminal_android_apk', 'terminal_reader_splashscreen']).optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a file
 *
 * To upload a file to Stripe, you need to send a request of type `multipart/form-data`. Include the file you want to upload in the request, and the parameters for creating a file.
 * 
 * All of Stripe’s officially supported Client libraries support sending `multipart/form-data`.
 */
'POST': f.builder().def_json().def_body(z.instanceof(FormData).parse).def_response(async ({ json }) => Model.File.parse(await json())),
'$file': {
/**
 * Retrieve a file
 *
 * Retrieves the details of an existing file object. After you supply a unique file ID, Stripe returns the corresponding file object. Learn how to [access file contents](/docs/file-upload#download-file-contents).
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.File.parse(await json()))
}
},
'financial_connections': {
'accounts': {
/**
 * List Accounts
 *
 * Returns a list of Financial Connections `Account` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ account_holder: z.object({
'account': z.string().optional(),
'customer': z.string().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), session: z.string().optional(), starting_after: z.string().optional() }).parse),
'$account': {
/**
 * Retrieve an Account
 *
 * Retrieves the details of an Financial Connections `Account`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json())),
'disconnect': {
/**
 * Disconnect an Account
 *
 * Disables your access to a Financial Connections `Account`. You will no longer be able to access data associated with the account (e.g. balances, transactions).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'owners': {
/**
 * List Account Owners
 *
 * Lists all owners for a given `Account`
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), ownership: z.string(), starting_after: z.string().optional() }).parse)
},
'refresh': {
/**
 * Refresh Account data
 *
 * Refreshes the data associated with a Financial Connections `Account`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'subscribe': {
/**
 * Subscribe to data refreshes for an Account
 *
 * Subscribes to periodic refreshes of data associated with a Financial Connections `Account`. When the account status is active, data is typically refreshed once a day.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'unsubscribe': {
/**
 * Unsubscribe from data refreshes for an Account
 *
 * Unsubscribes from periodic refreshes of data associated with a Financial Connections `Account`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
}
}
},
'sessions': {
/**
 * Create a Session
 *
 * To launch the Financial Connections authorization flow, create a `Session`. The session’s `client_secret` can be used to launch the flow using Stripe.js.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json())),
'$session': {
/**
 * Retrieve a Session
 *
 * Retrieves the details of a Financial Connections `Session`
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json()))
}
},
'transactions': {
/**
 * List Transactions
 *
 * Returns a list of Financial Connections `Transaction` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ account: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), transacted_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), transaction_refresh: z.object({
'after': z.string()
}).optional() }).parse),
'$transaction': {
/**
 * Retrieve a Transaction
 *
 * Retrieves the details of a Financial Connections `Transaction`
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsTransaction.parse(await json()))
}
}
},
'forwarding': {
'requests': {
/**
 * List all ForwardingRequests
 *
 * Lists all ForwardingRequest objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a ForwardingRequest
 *
 * Creates a ForwardingRequest object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ForwardingRequest.parse(await json())),
'$id': {
/**
 * Retrieve a ForwardingRequest
 *
 * Retrieves a ForwardingRequest object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ForwardingRequest.parse(await json()))
}
}
},
'identity': {
'verification_reports': {
/**
 * List VerificationReports
 *
 * List all verification reports.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ client_reference_id: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['document', 'id_number']).optional(), verification_session: z.string().optional() }).parse),
'$report': {
/**
 * Retrieve a VerificationReport
 *
 * Retrieves an existing VerificationReport
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IdentityVerificationReport.parse(await json()))
}
},
'verification_sessions': {
/**
 * List VerificationSessions
 *
 * Returns a list of VerificationSessions
 */
'GET': f.builder().def_json().def_searchparams(z.object({ client_reference_id: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), related_customer: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'processing', 'requires_input', 'verified']).optional() }).parse),
/**
 * Create a VerificationSession
 *
 * Creates a VerificationSession object.
 * 
 * After the VerificationSession is created, display a verification modal using the session `client_secret` or send your users to the session’s `url`.
 * 
 * If your API key is in test mode, verification checks won’t actually process, though everything else will occur as if in live mode.
 * 
 * Related guide: [Verify your users’ identity documents](/docs/identity/verify-identity-documents)
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
'$session': {
/**
 * Retrieve a VerificationSession
 *
 * Retrieves the details of a VerificationSession that was previously created.
 * 
 * When the session status is `requires_input`, you can use this method to retrieve a valid
 * `client_secret` or `url` to allow re-submission.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
/**
 * Update a VerificationSession
 *
 * Updates a VerificationSession object.
 * 
 * When the session status is `requires_input`, you can use this method to update the
 * verification check and options.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
'cancel': {
/**
 * Cancel a VerificationSession
 *
 * A VerificationSession object can be canceled when it is in `requires_input` [status](/docs/identity/how-sessions-work).
 * 
 * Once canceled, future submission attempts are disabled. This cannot be undone. [Learn more](/docs/identity/verification-sessions#cancel).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json()))
},
'redact': {
/**
 * Redact a VerificationSession
 *
 * Redact a VerificationSession to remove all collected information from Stripe. This will redact
 * the VerificationSession and all objects related to it, including VerificationReports, Events,
 * request logs, etc.
 * 
 * A VerificationSession object can be redacted when it is in `requires_input` or `verified`
 * [status](/docs/identity/how-sessions-work). Redacting a VerificationSession in `requires_action`
 * state will automatically cancel it.
 * 
 * The redaction process may take up to four days. When the redaction process is in progress, the
 * VerificationSession’s `redaction.status` field will be set to `processing`; when the process is
 * finished, it will change to `redacted` and an `identity.verification_session.redacted` event
 * will be emitted.
 * 
 * Redaction is irreversible. Redacted objects are still accessible in the Stripe API, but all the
 * fields that contain personal data will be replaced by the string `[redacted]` or a similar
 * placeholder. The `metadata` field will also be erased. Redacted objects cannot be updated or
 * used for any purpose.
 * 
 * [Learn more](/docs/identity/verification-sessions#redact).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json()))
}
}
}
},
'invoice_payments': {
/**
 * List all payments for an invoice
 *
 * When retrieving an invoice, there is an includable payments property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of payments.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string().optional(), limit: z.number().int().optional(), payment: z.object({
'payment_intent': z.string().optional(),
'payment_record': z.string().optional(),
'type': z.enum(['payment_intent', 'payment_record'])
}).optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'open', 'paid']).optional() }).parse),
'$invoice_payment': {
/**
 * Retrieve an InvoicePayment
 *
 * Retrieves the invoice payment with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.InvoicePayment.parse(await json()))
}
},
'invoice_rendering_templates': {
/**
 * List all invoice rendering templates
 *
 * List all templates, ordered by creation date, with the most recently created template appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'archived']).optional() }).parse),
'$template': {
/**
 * Retrieve an invoice rendering template
 *
 * Retrieves an invoice rendering template with the given ID. It by default returns the latest version of the template. Optionally, specify a version to see previous versions.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), version: z.number().int().optional() }).parse).def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json())),
'archive': {
/**
 * Archive an invoice rendering template
 *
 * Updates the status of an invoice rendering template to ‘archived’ so no new Stripe objects (customers, invoices, etc.) can reference it. The template can also no longer be updated. However, if the template is already set on a Stripe object, it will continue to be applied on invoices generated by it.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json()))
},
'unarchive': {
/**
 * Unarchive an invoice rendering template
 *
 * Unarchive an invoice rendering template so it can be used on new Stripe objects again.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json()))
}
}
},
'invoiceitems': {
/**
 * List all invoice items
 *
 * Returns a list of your invoice items. Invoice items are returned sorted by creation date, with the most recently created invoice items appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string().optional(), limit: z.number().int().optional(), pending: z.boolean().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create an invoice item
 *
 * Creates an item to be added to a draft invoice (up to 250 items per invoice). If no invoice is specified, the item will be on the next invoice created for the customer specified.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoiceitem.parse(await json())),
'$invoiceitem': {
/**
 * Delete an invoice item
 *
 * Deletes an invoice item, removing it from an invoice. Deleting invoice items is only possible when they’re not attached to invoices, or if it’s attached to a draft invoice.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedInvoiceitem.parse(await json())),
/**
 * Retrieve an invoice item
 *
 * Retrieves the invoice item with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Invoiceitem.parse(await json())),
/**
 * Update an invoice item
 *
 * Updates the amount or description of an invoice item on an upcoming invoice. Updating an invoice item is only possible before the invoice it’s attached to is closed.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoiceitem.parse(await json()))
}
},
'invoices': {
/**
 * List all invoices
 *
 * You can list all invoices, or list the invoices for a specific customer. The invoices are returned sorted by creation date, with the most recently created invoices appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ collection_method: z.enum(['charge_automatically', 'send_invoice']).optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), due_date: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['draft', 'open', 'paid', 'uncollectible', 'void']).optional(), subscription: z.string().optional() }).parse),
/**
 * Create an invoice
 *
 * This endpoint creates a draft invoice for a given customer. The invoice remains a draft until you [finalize](#finalize_invoice) the invoice, which allows you to [pay](#pay_invoice) or [send](#send_invoice) the invoice to your customers.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json())),
'create_preview': {
/**
 * Create a preview invoice
 *
 * At any time, you can preview the upcoming invoice for a subscription or subscription schedule. This will show you all the charges that are pending, including subscription renewal charges, invoice item charges, etc. It will also show you any discounts that are applicable to the invoice.
 * 
 * You can also preview the effects of creating or updating a subscription or subscription schedule, including a preview of any prorations that will take place. To ensure that the actual proration is calculated exactly the same as the previewed proration, you should pass the `subscription_details.proration_date` parameter when doing the actual subscription update.
 * 
 * The recommended way to get only the prorations being previewed on the invoice is to consider line items where `parent.subscription_item_details.proration` is `true`.
 * 
 * Note that when you are viewing an upcoming invoice, you are simply viewing a preview – the invoice has not yet been created. As such, the upcoming invoice will not show up in invoice listing calls, and you cannot use the API to pay or edit the invoice. If you want to change the amount that your customer will be billed, you can add, remove, or update pending invoice items, or update the customer’s discount.
 * 
 * Note: Currency conversion calculations use the latest exchange rates. Exchange rates may vary between the time of the preview and the time of the actual invoice creation. [Learn more](https://docs.stripe.com/currencies/conversions)
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'search': {
/**
 * Search invoices
 *
 * Search for invoices you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$invoice': {
/**
 * Delete a draft invoice
 *
 * Permanently deletes a one-off invoice draft. This cannot be undone. Attempts to delete invoices that are no longer in a draft state will fail; once an invoice has been finalized or if an invoice is for a subscription, it must be [voided](#void_invoice).
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedInvoice.parse(await json())),
/**
 * Retrieve an invoice
 *
 * Retrieves the invoice with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Invoice.parse(await json())),
/**
 * Update an invoice
 *
 * Draft invoices are fully editable. Once an invoice is [finalized](/docs/billing/invoices/workflow#finalized),
 * monetary values, as well as `collection_method`, become uneditable.
 * 
 * If you would like to stop the Stripe Billing engine from automatically finalizing, reattempting payments on,
 * sending reminders for, or [automatically reconciling](/docs/billing/invoices/reconciliation) invoices, pass
 * `auto_advance=false`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json())),
'add_lines': {
/**
 * Bulk add invoice line items
 *
 * Adds multiple line items to an invoice. This is only possible when an invoice is still a draft.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'attach_payment': {
/**
 * Attach a payment to an Invoice
 *
 * Attaches a PaymentIntent or an Out of Band Payment to the invoice, adding it to the list of `payments`.
 * 
 * For the PaymentIntent, when the PaymentIntent’s status changes to `succeeded`, the payment is credited
 * to the invoice, increasing its `amount_paid`. When the invoice is fully paid, the
 * invoice’s status becomes `paid`.
 * 
 * If the PaymentIntent’s status is already `succeeded` when it’s attached, it’s
 * credited to the invoice immediately.
 * 
 * See: [Partial payments](/docs/invoicing/partial-payments) to learn more.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'finalize': {
/**
 * Finalize an invoice
 *
 * Stripe automatically finalizes drafts before sending and attempting payment on invoices. However, if you’d like to finalize a draft invoice manually, you can do so using this method.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'lines': {
/**
 * Retrieve an invoice's line items
 *
 * When retrieving an invoice, you’ll get a **lines** property containing the total count of line items and the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$line_item_id': {
/**
 * Update an invoice's line item
 *
 * Updates an invoice’s line item. Some fields, such as `tax_amounts`, only live on the invoice line item,
 * so they can only be updated through this endpoint. Other fields, such as `amount`, live on both the invoice
 * item and the invoice line item, so updates on this endpoint will propagate to the invoice item as well.
 * Updating an invoice’s line item is only possible before the invoice is finalized.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.LineItem.parse(await json()))
}
},
'mark_uncollectible': {
/**
 * Mark an invoice as uncollectible
 *
 * Marking an invoice as uncollectible is useful for keeping track of bad debts that can be written off for accounting purposes.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'pay': {
/**
 * Pay an invoice
 *
 * Stripe automatically creates and then attempts to collect payment on invoices for customers on subscriptions according to your [subscriptions settings](https://dashboard.stripe.com/account/billing/automatic). However, if you’d like to attempt payment on an invoice out of the normal collection schedule or for some other reason, you can do so.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'remove_lines': {
/**
 * Bulk remove invoice line items
 *
 * Removes multiple line items from an invoice. This is only possible when an invoice is still a draft.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'send': {
/**
 * Send an invoice for manual payment
 *
 * Stripe will automatically send invoices to customers according to your [subscriptions settings](https://dashboard.stripe.com/account/billing/automatic). However, if you’d like to manually send an invoice to your customer out of the normal schedule, you can do so. When sending invoices that have already been paid, there will be no reference to the payment in the email.
 * 
 * Requests made in test-mode result in no emails being sent, despite sending an `invoice.sent` event.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'update_lines': {
/**
 * Bulk update invoice line items
 *
 * Updates multiple line items on an invoice. This is only possible when an invoice is still a draft.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'void': {
/**
 * Void an invoice
 *
 * Mark a finalized invoice as void. This cannot be undone. Voiding an invoice is similar to [deletion](#delete_invoice), however it only applies to finalized invoices and maintains a papertrail where the invoice can still be found.
 * 
 * Consult with local regulations to determine whether and how an invoice might be amended, canceled, or voided in the jurisdiction you’re doing business in. You might need to [issue another invoice](#create_invoice) or [credit note](#create_credit_note) instead. Stripe recommends that you consult with your legal counsel for advice specific to your business.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
}
}
},
'issuing': {
'authorizations': {
/**
 * List all authorizations
 *
 * Returns a list of Issuing `Authorization` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string().optional(), cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['closed', 'expired', 'pending', 'reversed']).optional() }).parse),
'$authorization': {
/**
 * Retrieve an authorization
 *
 * Retrieves an Issuing `Authorization` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
/**
 * Update an authorization
 *
 * Updates the specified Issuing `Authorization` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
'approve': {
/**
 * Approve an authorization
 *
 * [Deprecated] Approves a pending Issuing `Authorization` object. This request should be made within the timeout window of the [real-time authorization](/docs/issuing/controls/real-time-authorizations) flow. 
 * This method is deprecated. Instead, [respond directly to the webhook request to approve an authorization](/docs/issuing/controls/real-time-authorizations#authorization-handling).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'decline': {
/**
 * Decline an authorization
 *
 * [Deprecated] Declines a pending Issuing `Authorization` object. This request should be made within the timeout window of the [real time authorization](/docs/issuing/controls/real-time-authorizations) flow.
 * This method is deprecated. Instead, [respond directly to the webhook request to decline an authorization](/docs/issuing/controls/real-time-authorizations#authorization-handling).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
}
},
'cardholders': {
/**
 * List all cardholders
 *
 * Returns a list of Issuing `Cardholder` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), email: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), phone_number: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'blocked', 'inactive']).optional(), type: z.enum(['company', 'individual']).optional() }).parse),
/**
 * Create a cardholder
 *
 * Creates a new Issuing `Cardholder` object that can be issued cards.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCardholder.parse(await json())),
'$cardholder': {
/**
 * Retrieve a cardholder
 *
 * Retrieves an Issuing `Cardholder` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingCardholder.parse(await json())),
/**
 * Update a cardholder
 *
 * Updates the specified Issuing `Cardholder` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCardholder.parse(await json()))
}
},
'cards': {
/**
 * List all cards
 *
 * Returns a list of Issuing `Card` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), exp_month: z.number().int().optional(), exp_year: z.number().int().optional(), expand: z.array(z.string()).optional(), last4: z.string().optional(), limit: z.number().int().optional(), personalization_design: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'canceled', 'inactive']).optional(), type: z.enum(['physical', 'virtual']).optional() }).parse),
/**
 * Create a card
 *
 * Creates an Issuing `Card` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json())),
'$card': {
/**
 * Retrieve a card
 *
 * Retrieves an Issuing `Card` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingCard.parse(await json())),
/**
 * Update a card
 *
 * Updates the specified Issuing `Card` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
}
},
'disputes': {
/**
 * List all disputes
 *
 * Returns a list of Issuing `Dispute` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['expired', 'lost', 'submitted', 'unsubmitted', 'won']).optional(), transaction: z.string().optional() }).parse),
/**
 * Create a dispute
 *
 * Creates an Issuing `Dispute` object. Individual pieces of evidence within the `evidence` object are optional at this point. Stripe only validates that required evidence is present during submission. Refer to [Dispute reasons and evidence](/docs/issuing/purchases/disputes#dispute-reasons-and-evidence) for more details about evidence requirements.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
'$dispute': {
/**
 * Retrieve a dispute
 *
 * Retrieves an Issuing `Dispute` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
/**
 * Update a dispute
 *
 * Updates the specified Issuing `Dispute` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Properties on the `evidence` object can be unset by passing in an empty string.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
'submit': {
/**
 * Submit a dispute
 *
 * Submits an Issuing `Dispute` to the card network. Stripe validates that all evidence fields required for the dispute’s reason are present. For more details, see [Dispute reasons and evidence](/docs/issuing/purchases/disputes#dispute-reasons-and-evidence).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json()))
}
}
},
'personalization_designs': {
/**
 * List all personalization designs
 *
 * Returns a list of personalization design objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), lookup_keys: z.array(z.string()).optional(), preferences: z.object({
'is_default': z.boolean().optional(),
'is_platform_default': z.boolean().optional()
}).optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive', 'rejected', 'review']).optional() }).parse),
/**
 * Create a personalization design
 *
 * Creates a personalization design object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json())),
'$personalization_design': {
/**
 * Retrieve a personalization design
 *
 * Retrieves a personalization design object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json())),
/**
 * Update a personalization design
 *
 * Updates a card personalization object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
}
},
'physical_bundles': {
/**
 * List all physical bundles
 *
 * Returns a list of physical bundle objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive', 'review']).optional(), type: z.enum(['custom', 'standard']).optional() }).parse),
'$physical_bundle': {
/**
 * Retrieve a physical bundle
 *
 * Retrieves a physical bundle object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingPhysicalBundle.parse(await json()))
}
},
'settlements': {
'$settlement': {
/**
 * Retrieve a settlement
 *
 * Retrieves an Issuing `Settlement` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingSettlement.parse(await json())),
/**
 * Update a settlement
 *
 * Updates the specified Issuing `Settlement` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json()))
}
},
'tokens': {
/**
 * List all issuing tokens for card
 *
 * Lists all Issuing `Token` objects for a given card.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'deleted', 'requested', 'suspended']).optional() }).parse),
'$token': {
/**
 * Retrieve an issuing token
 *
 * Retrieves an Issuing `Token` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingToken.parse(await json())),
/**
 * Update a token status
 *
 * Attempts to update the specified Issuing `Token` object to the status specified.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingToken.parse(await json()))
}
},
'transactions': {
/**
 * List all transactions
 *
 * Returns a list of Issuing `Transaction` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string().optional(), cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['capture', 'refund']).optional() }).parse),
'$transaction': {
/**
 * Retrieve a transaction
 *
 * Retrieves an Issuing `Transaction` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingTransaction.parse(await json())),
/**
 * Update a transaction
 *
 * Updates the specified Issuing `Transaction` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
}
}
},
'link_account_sessions': {
/**
 * Create a Session
 *
 * To launch the Financial Connections authorization flow, create a `Session`. The session’s `client_secret` can be used to launch the flow using Stripe.js.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json())),
'$session': {
/**
 * Retrieve a Session
 *
 * Retrieves the details of a Financial Connections `Session`
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json()))
}
},
'linked_accounts': {
/**
 * List Accounts
 *
 * Returns a list of Financial Connections `Account` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ account_holder: z.object({
'account': z.string().optional(),
'customer': z.string().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), session: z.string().optional(), starting_after: z.string().optional() }).parse),
'$account': {
/**
 * Retrieve an Account
 *
 * Retrieves the details of an Financial Connections `Account`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json())),
'disconnect': {
/**
 * Disconnect an Account
 *
 * Disables your access to a Financial Connections `Account`. You will no longer be able to access data associated with the account (e.g. balances, transactions).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'owners': {
/**
 * List Account Owners
 *
 * Lists all owners for a given `Account`
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), ownership: z.string(), starting_after: z.string().optional() }).parse)
},
'refresh': {
/**
 * Refresh Account data
 *
 * Refreshes the data associated with a Financial Connections `Account`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
}
}
},
'mandates': {
'$mandate': {
/**
 * Retrieve a Mandate
 *
 * Retrieves a Mandate object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Mandate.parse(await json()))
}
},
'payment_attempt_records': {
/**
 * List Payment Attempt Records
 *
 * List all the Payment Attempt Records attached to the specified Payment Record.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_record: z.string(), starting_after: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a Payment Attempt Record
 *
 * Retrieves a Payment Attempt Record with the given ID
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentAttemptRecord.parse(await json()))
}
},
'payment_intents': {
/**
 * List all PaymentIntents
 *
 * Returns a list of PaymentIntents.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a PaymentIntent
 *
 * Creates a PaymentIntent object.
 * 
 * After the PaymentIntent is created, attach a payment method and [confirm](/docs/api/payment_intents/confirm)
 * to continue the payment. Learn more about the available payment flows
 * with the Payment Intents API.
 * 
 * When you use `confirm=true` during creation, it’s equivalent to creating
 * and confirming the PaymentIntent in the same call. You can use any parameters
 * available in the [confirm API](/docs/api/payment_intents/confirm) when you supply
 * `confirm=true`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
'search': {
/**
 * Search PaymentIntents
 *
 * Search for PaymentIntents you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$intent': {
/**
 * Retrieve a PaymentIntent
 *
 * Retrieves the details of a PaymentIntent that has previously been created. 
 * 
 * You can retrieve a PaymentIntent client-side using a publishable key when the `client_secret` is in the query string. 
 * 
 * If you retrieve a PaymentIntent with a publishable key, it only returns a subset of properties. Refer to the [payment intent](#payment_intent_object) object reference for more details.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
/**
 * Update a PaymentIntent
 *
 * Updates properties on a PaymentIntent object without confirming.
 * 
 * Depending on which properties you update, you might need to confirm the
 * PaymentIntent again. For example, updating the `payment_method`
 * always requires you to confirm the PaymentIntent again. If you prefer to
 * update and confirm at the same time, we recommend updating properties through
 * the [confirm API](/docs/api/payment_intents/confirm) instead.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
'amount_details_line_items': {
/**
 * List all PaymentIntent LineItems
 *
 * Lists all LineItems of a given PaymentIntent.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'apply_customer_balance': {
/**
 * Reconcile a customer_balance PaymentIntent
 *
 * Manually reconcile the remaining amount for a `customer_balance` PaymentIntent.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'cancel': {
/**
 * Cancel a PaymentIntent
 *
 * You can cancel a PaymentIntent object when it’s in one of these statuses: `requires_payment_method`, `requires_capture`, `requires_confirmation`, `requires_action` or, [in rare cases](/docs/payments/intents), `processing`. 
 * 
 * After it’s canceled, no additional charges are made by the PaymentIntent and any operations on the PaymentIntent fail with an error. For PaymentIntents with a `status` of `requires_capture`, the remaining `amount_capturable` is automatically refunded. 
 * 
 * You can’t cancel the PaymentIntent for a Checkout Session. [Expire the Checkout Session](/docs/api/checkout/sessions/expire) instead.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'capture': {
/**
 * Capture a PaymentIntent
 *
 * Capture the funds of an existing uncaptured PaymentIntent when its status is `requires_capture`.
 * 
 * Uncaptured PaymentIntents are cancelled a set number of days (7 by default) after their creation.
 * 
 * Learn more about [separate authorization and capture](/docs/payments/capture-later).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'confirm': {
/**
 * Confirm a PaymentIntent
 *
 * Confirm that your customer intends to pay with current or provided
 * payment method. Upon confirmation, the PaymentIntent will attempt to initiate
 * a payment.
 * 
 * If the selected payment method requires additional authentication steps, the
 * PaymentIntent will transition to the `requires_action` status and
 * suggest additional actions via `next_action`. If payment fails,
 * the PaymentIntent transitions to the `requires_payment_method` status or the
 * `canceled` status if the confirmation limit is reached. If
 * payment succeeds, the PaymentIntent will transition to the `succeeded`
 * status (or `requires_capture`, if `capture_method` is set to `manual`).
 * 
 * If the `confirmation_method` is `automatic`, payment may be attempted
 * using our [client SDKs](/docs/stripe-js/reference#stripe-handle-card-payment)
 * and the PaymentIntent’s [client_secret](#payment_intent_object-client_secret).
 * After `next_action`s are handled by the client, no additional
 * confirmation is required to complete the payment.
 * 
 * If the `confirmation_method` is `manual`, all payment attempts must be
 * initiated using a secret key.
 * 
 * If any actions are required for the payment, the PaymentIntent will
 * return to the `requires_confirmation` state
 * after those actions are completed. Your server needs to then
 * explicitly re-confirm the PaymentIntent to initiate the next payment
 * attempt.
 * 
 * There is a variable upper limit on how many times a PaymentIntent can be confirmed.
 * After this limit is reached, any further calls to this endpoint will
 * transition the PaymentIntent to the `canceled` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'increment_authorization': {
/**
 * Increment an authorization
 *
 * Perform an incremental authorization on an eligible
 * [PaymentIntent](/docs/api/payment_intents/object). To be eligible, the
 * PaymentIntent’s status must be `requires_capture` and
 * [incremental_authorization_supported](/docs/api/charges/object#charge_object-payment_method_details-card_present-incremental_authorization_supported)
 * must be `true`.
 * 
 * Incremental authorizations attempt to increase the authorized amount on
 * your customer’s card to the new, higher `amount` provided. Similar to the
 * initial authorization, incremental authorizations can be declined. A
 * single PaymentIntent can call this endpoint multiple times to further
 * increase the authorized amount.
 * 
 * If the incremental authorization succeeds, the PaymentIntent object
 * returns with the updated
 * [amount](/docs/api/payment_intents/object#payment_intent_object-amount).
 * If the incremental authorization fails, a
 * [card_declined](/docs/error-codes#card-declined) error returns, and no other
 * fields on the PaymentIntent or Charge update. The PaymentIntent
 * object remains capturable for the previously authorized amount.
 * 
 * Each PaymentIntent can have a maximum of 10 incremental authorization attempts, including declines.
 * After it’s captured, a PaymentIntent can no longer be incremented.
 * 
 * Learn more about [incremental authorizations](/docs/terminal/features/incremental-authorizations).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'verify_microdeposits': {
/**
 * Verify microdeposits on a PaymentIntent
 *
 * Verifies microdeposits on a PaymentIntent object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
}
}
},
'payment_links': {
/**
 * List all payment links
 *
 * Returns a list of your payment links.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a payment link
 *
 * Creates a payment link.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
'$payment_link': {
/**
 * Retrieve payment link
 *
 * Retrieve a payment link.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
/**
 * Update a payment link
 *
 * Updates a payment link.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
'line_items': {
/**
 * Retrieve a payment link's line items
 *
 * When retrieving a payment link, there is an includable **line_items** property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
},
'payment_method_configurations': {
/**
 * List payment method configurations
 *
 * List payment method configurations
 */
'GET': f.builder().def_json().def_searchparams(z.object({ application: z.union([z.string(), z.enum([''])]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a payment method configuration
 *
 * Creates a payment method configuration
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json())),
'$configuration': {
/**
 * Retrieve payment method configuration
 *
 * Retrieve payment method configuration
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json())),
/**
 * Update payment method configuration
 *
 * Update payment method configuration
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json()))
}
},
'payment_method_domains': {
/**
 * List payment method domains
 *
 * Lists the details of existing payment method domains.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ domain_name: z.string().optional(), enabled: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a payment method domain
 *
 * Creates a payment method domain.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
'$payment_method_domain': {
/**
 * Retrieve a payment method domain
 *
 * Retrieves the details of an existing payment method domain.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
/**
 * Update a payment method domain
 *
 * Updates an existing payment method domain.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
'validate': {
/**
 * Validate an existing payment method domain
 *
 * Some payment methods might require additional steps to register a domain. If the requirements weren’t satisfied when the domain was created, the payment method will be inactive on the domain.
 * The payment method doesn’t appear in Elements or Embedded Checkout for this domain until it is active.
 * 
 * To activate a payment method on an existing payment method domain, complete the required registration steps specific to the payment method, and then validate the payment method domain with this endpoint.
 * 
 * Related guides: [Payment method domains](/docs/payments/payment-methods/pmd-registration).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json()))
}
}
},
'payment_methods': {
/**
 * List PaymentMethods
 *
 * Returns a list of PaymentMethods for Treasury flows. If you want to list the PaymentMethods attached to a Customer for payments, you should use the [List a Customer’s PaymentMethods](/docs/api/payment_methods/customer_list) API instead.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']).optional() }).parse),
/**
 * Shares a PaymentMethod
 *
 * Creates a PaymentMethod object. Read the [Stripe.js reference](/docs/stripe-js/reference#stripe-create-payment-method) to learn how to create PaymentMethods via Stripe.js.
 * 
 * Instead of creating a PaymentMethod directly, we recommend using the [PaymentIntents](/docs/payments/accept-a-payment) API to accept a payment immediately or the [SetupIntent](/docs/payments/save-and-reuse) API to collect payment method details ahead of a future payment.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
'$payment_method': {
/**
 * Retrieve a PaymentMethod
 *
 * Retrieves a PaymentMethod object attached to the StripeAccount. To retrieve a payment method attached to a Customer, you should use [Retrieve a Customer’s PaymentMethods](/docs/api/payment_methods/customer)
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
/**
 * Update a PaymentMethod
 *
 * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
'attach': {
/**
 * Attach a PaymentMethod to a Customer
 *
 * Attaches a PaymentMethod object to a Customer.
 * 
 * To attach a new PaymentMethod to a customer for future payments, we recommend you use a [SetupIntent](/docs/api/setup_intents)
 * or a PaymentIntent with [setup_future_usage](/docs/api/payment_intents/create#create_payment_intent-setup_future_usage).
 * These approaches will perform any necessary steps to set up the PaymentMethod for future payments. Using the `/v1/payment_methods/:id/attach`
 * endpoint without first using a SetupIntent or PaymentIntent with `setup_future_usage` does not optimize the PaymentMethod for
 * future use, which makes later declines and payment friction more likely.
 * See [Optimizing cards for future payments](/docs/payments/payment-intents#future-usage) for more information about setting up
 * future payments.
 * 
 * To use this PaymentMethod as the default for invoice or subscription payments,
 * set [`invoice_settings.default_payment_method`](/docs/api/customers/update#update_customer-invoice_settings-default_payment_method),
 * on the Customer to the PaymentMethod’s ID.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
},
'detach': {
/**
 * Detach a PaymentMethod from a Customer
 *
 * Detaches a PaymentMethod object from a Customer. After a PaymentMethod is detached, it can no longer be used for a payment or re-attached to a Customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
}
}
},
'payment_records': {
'report_payment': {
/**
 * Report a payment
 *
 * Report a new Payment Record. You may report a Payment Record as it is
 *  initialized and later report updates through the other report_* methods, or report Payment
 *  Records in a terminal state directly, through this method.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'$id': {
/**
 * Retrieve a Payment Record
 *
 * Retrieves a Payment Record with the given ID
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentRecord.parse(await json())),
'report_payment_attempt': {
/**
 * Report a payment attempt
 *
 * Report a new payment attempt on the specified Payment Record. A new payment
 *  attempt can only be specified if all other payment attempts are canceled or failed.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_canceled': {
/**
 * Report payment attempt canceled
 *
 * Report that the most recent payment attempt on the specified Payment Record
 *  was canceled.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_failed': {
/**
 * Report payment attempt failed
 *
 * Report that the most recent payment attempt on the specified Payment Record
 *  failed or errored.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_guaranteed': {
/**
 * Report payment attempt guaranteed
 *
 * Report that the most recent payment attempt on the specified Payment Record
 *  was guaranteed.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_informational': {
/**
 * Report payment attempt informational
 *
 * Report informational updates on the specified Payment Record.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_refund': {
/**
 * Report a refund
 *
 * Report that the most recent payment attempt on the specified Payment Record
 *  was refunded.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
}
}
},
'payouts': {
/**
 * List all payouts
 *
 * Returns a list of existing payouts sent to third-party bank accounts or payouts that Stripe sent to you. The payouts return in sorted order, with the most recently created payouts appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ arrival_date: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), destination: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.string().optional() }).parse),
/**
 * Create a payout
 *
 * To send funds to your own bank account, create a new payout object. Your [Stripe balance](#balance) must cover the payout amount. If it doesn’t, you receive an “Insufficient Funds” error.
 * 
 * If your API key is in test mode, money won’t actually be sent, though every other action occurs as if you’re in live mode.
 * 
 * If you create a manual payout on a Stripe account that uses multiple payment source types, you need to specify the source type balance that the payout draws from. The [balance object](#balance_object) details available and pending amounts by source type.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json())),
'$payout': {
/**
 * Retrieve a payout
 *
 * Retrieves the details of an existing payout. Supply the unique payout ID from either a payout creation request or the payout list. Stripe returns the corresponding payout information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Payout.parse(await json())),
/**
 * Update a payout
 *
 * Updates the specified payout by setting the values of the parameters you pass. We don’t change parameters that you don’t provide. This request only accepts the metadata as arguments.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json())),
'cancel': {
/**
 * Cancel a payout
 *
 * You can cancel a previously created payout if its status is `pending`. Stripe refunds the funds to your available balance. You can’t cancel automatic Stripe payouts.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json()))
},
'reverse': {
/**
 * Reverse a payout
 *
 * Reverses a payout by debiting the destination bank account. At this time, you can only reverse payouts for connected accounts to US and Canadian bank accounts. If the payout is manual and in the `pending` status, use `/v1/payouts/:id/cancel` instead.
 * 
 * By requesting a reversal through `/v1/payouts/:id/reverse`, you confirm that the authorized signatory of the selected bank account authorizes the debit on the bank account and that no other authorization is required.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json()))
}
}
},
'plans': {
/**
 * List all plans
 *
 * Returns a list of your plans.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), product: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a plan
 *
 * You can now model subscriptions more flexibly using the [Prices API](#prices). It replaces the Plans API and is backwards compatible to simplify your migration.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Plan.parse(await json())),
'$plan': {
/**
 * Delete a plan
 *
 * Deleting plans means new subscribers can’t be added. Existing subscribers aren’t affected.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPlan.parse(await json())),
/**
 * Retrieve a plan
 *
 * Retrieves the plan with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Plan.parse(await json())),
/**
 * Update a plan
 *
 * Updates the specified plan by setting the values of the parameters passed. Any parameters not provided are left unchanged. By design, you cannot change a plan’s ID, amount, currency, or billing cycle.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Plan.parse(await json()))
}
},
'prices': {
/**
 * List all prices
 *
 * Returns a list of your active prices, excluding [inline prices](/docs/products-prices/pricing-models#inline-pricing). For the list of inactive prices, set `active` to false.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), lookup_keys: z.array(z.string()).optional(), product: z.string().optional(), recurring: z.object({
'interval': z.enum(['day', 'month', 'week', 'year']).optional(),
'meter': z.string().optional(),
'usage_type': z.enum(['licensed', 'metered']).optional()
}).optional(), starting_after: z.string().optional(), type: z.enum(['one_time', 'recurring']).optional() }).parse),
/**
 * Create a price
 *
 * Creates a new [Price](https://docs.stripe.com/api/prices) for an existing [Product](https://docs.stripe.com/api/products). The Price can be recurring or one-time.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Price.parse(await json())),
'search': {
/**
 * Search prices
 *
 * Search for prices you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$price': {
/**
 * Retrieve a price
 *
 * Retrieves the price with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Price.parse(await json())),
/**
 * Update a price
 *
 * Updates the specified price by setting the values of the parameters passed. Any parameters not provided are left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Price.parse(await json()))
}
},
'products': {
/**
 * List all products
 *
 * Returns a list of your products. The products are returned sorted by creation date, with the most recently created products appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), ids: z.array(z.string()).optional(), limit: z.number().int().optional(), shippable: z.boolean().optional(), starting_after: z.string().optional(), url: z.string().optional() }).parse),
/**
 * Create a product
 *
 * Creates a new product object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Product.parse(await json())),
'search': {
/**
 * Search products
 *
 * Search for products you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$id': {
/**
 * Delete a product
 *
 * Delete a product. Deleting a product is only possible if it has no prices associated with it. Additionally, deleting a product with `type=good` is only possible if it has no SKUs associated with it.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedProduct.parse(await json())),
/**
 * Retrieve a product
 *
 * Retrieves the details of an existing product. Supply the unique product ID from either a product creation request or the product list, and Stripe will return the corresponding product information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Product.parse(await json())),
/**
 * Update a product
 *
 * Updates the specific product by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Product.parse(await json()))
},
'$product': {
'features': {
/**
 * List all features attached to a product
 *
 * Retrieve a list of features for a product
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Attach a feature to a product
 *
 * Creates a product_feature, which represents a feature attachment to a product
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ProductFeature.parse(await json())),
'$id': {
/**
 * Remove a feature from a product
 *
 * Deletes the feature attachment to a product
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedProductFeature.parse(await json())),
/**
 * Retrieve a product_feature
 *
 * Retrieves a product_feature, which represents a feature attachment to a product
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ProductFeature.parse(await json()))
}
}
}
},
'promotion_codes': {
/**
 * List all promotion codes
 *
 * Returns a list of your promotion codes.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), code: z.string().optional(), coupon: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a promotion code
 *
 * A promotion code points to an underlying promotion. You can optionally restrict the code to a specific customer, redemption limit, and expiration date.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PromotionCode.parse(await json())),
'$promotion_code': {
/**
 * Retrieve a promotion code
 *
 * Retrieves the promotion code with the given ID. In order to retrieve a promotion code by the customer-facing `code` use [list](/docs/api/promotion_codes/list) with the desired `code`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PromotionCode.parse(await json())),
/**
 * Update a promotion code
 *
 * Updates the specified promotion code by setting the values of the parameters passed. Most fields are, by design, not editable.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PromotionCode.parse(await json()))
}
},
'quotes': {
/**
 * List all quotes
 *
 * Returns a list of your quotes.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['accepted', 'canceled', 'draft', 'open']).optional(), test_clock: z.string().optional() }).parse),
/**
 * Create a quote
 *
 * A quote models prices and services for a customer. Default options for `header`, `description`, `footer`, and `expires_at` can be set in the dashboard via the [quote template](https://dashboard.stripe.com/settings/billing/quote).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json())),
'$quote': {
/**
 * Retrieve a quote
 *
 * Retrieves the quote with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Quote.parse(await json())),
/**
 * Update a quote
 *
 * A quote models prices and services for a customer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json())),
'accept': {
/**
 * Accept a quote
 *
 * Accepts the specified quote.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'cancel': {
/**
 * Cancel a quote
 *
 * Cancels the quote.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'computed_upfront_line_items': {
/**
 * Retrieve a quote's upfront line items
 *
 * When retrieving a quote, there is an includable [**computed.upfront.line_items**](https://stripe.com/docs/api/quotes/object#quote_object-computed-upfront-line_items) property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of upfront line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'finalize': {
/**
 * Finalize a quote
 *
 * Finalizes the quote.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'line_items': {
/**
 * Retrieve a quote's line items
 *
 * When retrieving a quote, there is an includable **line_items** property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of line items.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'pdf': {
/**
 * Download quote PDF
 *
 * Download the PDF for a finalized quote. Explanation for special handling can be found [here](https://docs.stripe.com/quotes/overview#quote_pdf)
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse)
}
}
},
'radar': {
'early_fraud_warnings': {
/**
 * List all early fraud warnings
 *
 * Returns a list of early fraud warnings.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
'$early_fraud_warning': {
/**
 * Retrieve an early fraud warning
 *
 * Retrieves the details of an early fraud warning that has previously been created. 
 * 
 * Please refer to the [early fraud warning](#early_fraud_warning_object) object reference for more details.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarEarlyFraudWarning.parse(await json()))
}
},
'value_list_items': {
/**
 * List all value list items
 *
 * Returns a list of `ValueListItem` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), value: z.string().optional(), value_list: z.string() }).parse),
/**
 * Create a value list item
 *
 * Creates a new `ValueListItem` object, which is added to the specified parent value list.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueListItem.parse(await json())),
'$item': {
/**
 * Delete a value list item
 *
 * Deletes a `ValueListItem` object, removing it from its parent value list.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedRadarValueListItem.parse(await json())),
/**
 * Retrieve a value list item
 *
 * Retrieves a `ValueListItem` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarValueListItem.parse(await json()))
}
},
'value_lists': {
/**
 * List all value lists
 *
 * Returns a list of `ValueList` objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ alias: z.string().optional(), contains: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a value list
 *
 * Creates a new `ValueList` object, which can then be referenced in rules.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueList.parse(await json())),
'$value_list': {
/**
 * Delete a value list
 *
 * Deletes a `ValueList` object, also deleting any items contained within the value list. To be deleted, a value list must not be referenced in any rules.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedRadarValueList.parse(await json())),
/**
 * Retrieve a value list
 *
 * Retrieves a `ValueList` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarValueList.parse(await json())),
/**
 * Update a value list
 *
 * Updates a `ValueList` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Note that `item_type` is immutable.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueList.parse(await json()))
}
}
},
'refunds': {
/**
 * List all refunds
 *
 * Returns a list of all refunds you created. We return the refunds in sorted order, with the most recent refunds appearing first. The 10 most recent refunds are always available by default on the Charge object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create customer balance refund
 *
 * When you create a new refund, you must specify a Charge or a PaymentIntent object on which to create it.
 * 
 * Creating a new refund will refund a charge that has previously been created but not yet refunded.
 * Funds will be refunded to the credit or debit card that was originally charged.
 * 
 * You can optionally refund only part of a charge.
 * You can do so multiple times, until the entire charge has been refunded.
 * 
 * Once entirely refunded, a charge can’t be refunded again.
 * This method will raise an error when called on an already-refunded charge,
 * or when trying to refund more money than is left on a charge.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'$refund': {
/**
 * Retrieve a refund
 *
 * Retrieves the details of an existing refund.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Refund.parse(await json())),
/**
 * Update a refund
 *
 * Updates the refund that you specify by setting the values of the passed parameters. Any parameters that you don’t provide remain unchanged.
 * 
 * This request only accepts `metadata` as an argument.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'cancel': {
/**
 * Cancel a refund
 *
 * Cancels a refund with a status of `requires_action`.
 * 
 * You can’t cancel refunds in other states. Only refunds for payment methods that require customer action can enter the `requires_action` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
},
'reporting': {
'report_runs': {
/**
 * List all Report Runs
 *
 * Returns a list of Report Runs, with the most recent appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a Report Run
 *
 * Creates a new object and begin running the report. (Certain report types require a [live-mode API key](https://stripe.com/docs/keys#test-live-modes).)
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ReportingReportRun.parse(await json())),
'$report_run': {
/**
 * Retrieve a Report Run
 *
 * Retrieves the details of an existing Report Run.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ReportingReportRun.parse(await json()))
}
},
'report_types': {
/**
 * List all Report Types
 *
 * Returns a full list of Report Types.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'$report_type': {
/**
 * Retrieve a Report Type
 *
 * Retrieves the details of a Report Type. (Certain report types require a [live-mode API key](https://stripe.com/docs/keys#test-live-modes).)
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ReportingReportType.parse(await json()))
}
}
},
'reviews': {
/**
 * List all open reviews
 *
 * Returns a list of `Review` objects that have `open` set to `true`. The objects are sorted in descending order by creation date, with the most recently created object appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$review': {
/**
 * Retrieve a review
 *
 * Retrieves a `Review` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Review.parse(await json())),
'approve': {
/**
 * Approve a review
 *
 * Approves a `Review` object, closing it and removing it from the list of reviews.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Review.parse(await json()))
}
}
},
'setup_attempts': {
/**
 * List all SetupAttempts
 *
 * Returns a list of SetupAttempts that associate with a provided SetupIntent.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), setup_intent: z.string(), starting_after: z.string().optional() }).parse)
},
'setup_intents': {
/**
 * List all SetupIntents
 *
 * Returns a list of SetupIntents.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ attach_to_self: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_method: z.string().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a SetupIntent
 *
 * Creates a SetupIntent object.
 * 
 * After you create the SetupIntent, attach a payment method and [confirm](/docs/api/setup_intents/confirm)
 * it to collect any required permissions to charge the payment method later.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
'$intent': {
/**
 * Retrieve a SetupIntent
 *
 * Retrieves the details of a SetupIntent that has previously been created. 
 * 
 * Client-side retrieval using a publishable key is allowed when the `client_secret` is provided in the query string. 
 * 
 * When retrieved with a publishable key, only a subset of properties will be returned. Please refer to the [SetupIntent](#setup_intent_object) object reference for more details.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
/**
 * Update a SetupIntent
 *
 * Updates a SetupIntent object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
'cancel': {
/**
 * Cancel a SetupIntent
 *
 * You can cancel a SetupIntent object when it’s in one of these statuses: `requires_payment_method`, `requires_confirmation`, or `requires_action`. 
 * 
 * After you cancel it, setup is abandoned and any operations on the SetupIntent fail with an error. You can’t cancel the SetupIntent for a Checkout Session. [Expire the Checkout Session](/docs/api/checkout/sessions/expire) instead.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
},
'confirm': {
/**
 * Confirm a SetupIntent
 *
 * Confirm that your customer intends to set up the current or
 * provided payment method. For example, you would confirm a SetupIntent
 * when a customer hits the “Save” button on a payment method management
 * page on your website.
 * 
 * If the selected payment method does not require any additional
 * steps from the customer, the SetupIntent will transition to the
 * `succeeded` status.
 * 
 * Otherwise, it will transition to the `requires_action` status and
 * suggest additional actions via `next_action`. If setup fails,
 * the SetupIntent will transition to the
 * `requires_payment_method` status or the `canceled` status if the
 * confirmation limit is reached.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
},
'verify_microdeposits': {
/**
 * Verify microdeposits on a SetupIntent
 *
 * Verifies microdeposits on a SetupIntent object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
}
}
},
'shipping_rates': {
/**
 * List all shipping rates
 *
 * Returns a list of your shipping rates.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a shipping rate
 *
 * Creates a new shipping rate object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ShippingRate.parse(await json())),
'$shipping_rate_token': {
/**
 * Retrieve a shipping rate
 *
 * Returns the shipping rate object with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ShippingRate.parse(await json())),
/**
 * Update a shipping rate
 *
 * Updates an existing shipping rate object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ShippingRate.parse(await json()))
}
},
'sigma': {
'saved_queries': {
'$id': {
/**
 * Update an existing Sigma Query
 *
 * Update an existing Sigma query that previously exists
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SigmaSigmaApiQuery.parse(await json()))
}
},
'scheduled_query_runs': {
/**
 * List all scheduled query runs
 *
 * Returns a list of scheduled query runs.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$scheduled_query_run': {
/**
 * Retrieve a scheduled query run
 *
 * Retrieves the details of an scheduled query run.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ScheduledQueryRun.parse(await json()))
}
}
},
'sources': {
/**
 * Shares a source
 *
 * Creates a new source object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json())),
'$source': {
/**
 * Retrieve a source
 *
 * Retrieves an existing source object. Supply the unique source ID from a source creation request and Stripe will return the corresponding up-to-date source object information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Source.parse(await json())),
/**
 * Update a source
 *
 * Updates the specified source by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 * 
 * This request accepts the `metadata` and `owner` as arguments. It is also possible to update type specific information for selected payment methods. Please refer to our [payment method guides](/docs/sources) for more detail.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json())),
'mandate_notifications': {
'$mandate_notification': {
/**
 * Retrieve a Source MandateNotification
 *
 * Retrieves a new Source MandateNotification.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SourceMandateNotification.parse(await json()))
}
},
'source_transactions': {
/**
 * List source transactions for a given source.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$source_transaction': {
/**
 * Retrieve a source transaction
 *
 * Retrieve an existing source transaction object. Supply the unique source ID from a source creation request and the source transaction ID and Stripe will return the corresponding up-to-date source object information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SourceTransaction.parse(await json()))
}
},
'verify': {
/**
 * Verify a given source.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json()))
}
}
},
'subscription_items': {
/**
 * List all subscription items
 *
 * Returns a list of your subscription items for a given subscription.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), subscription: z.string() }).parse),
/**
 * Create a subscription item
 *
 * Adds a new item to an existing subscription. No existing items will be changed or replaced.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionItem.parse(await json())),
'$item': {
/**
 * Delete a subscription item
 *
 * Deletes an item from the subscription. Removing a subscription item from a subscription will not cancel the subscription.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedSubscriptionItem.parse(await json())),
/**
 * Retrieve a subscription item
 *
 * Retrieves the subscription item with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SubscriptionItem.parse(await json())),
/**
 * Update a subscription item
 *
 * Updates the plan or quantity of an item on a current subscription.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionItem.parse(await json()))
}
},
'subscription_schedules': {
/**
 * List all schedules
 *
 * Retrieves the list of your subscription schedules.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ canceled_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), completed_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), released_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), scheduled: z.boolean().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a schedule
 *
 * Creates a new subscription schedule object. Each customer can have up to 500 active or scheduled subscriptions.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
'$schedule': {
/**
 * Retrieve a schedule
 *
 * Retrieves the details of an existing subscription schedule. You only need to supply the unique subscription schedule identifier that was returned upon subscription schedule creation.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
/**
 * Update a schedule
 *
 * Updates an existing subscription schedule.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
'cancel': {
/**
 * Cancel a schedule
 *
 * Cancels a subscription schedule and its associated subscription immediately (if the subscription schedule has an active subscription). A subscription schedule can only be canceled if its status is `not_started` or `active`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json()))
},
'release': {
/**
 * Release a schedule
 *
 * Releases the subscription schedule immediately, which will stop scheduling of its phases, but leave any existing subscription in place. A schedule can only be released if its status is `not_started` or `active`. If the subscription schedule is currently associated with a subscription, releasing it will remove its `subscription` property and set the subscription’s ID to the `released_subscription` property.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json()))
}
}
},
'subscriptions': {
/**
 * List subscriptions
 *
 * By default, returns a list of subscriptions that have not been canceled. In order to list canceled subscriptions, specify `status=canceled`.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ automatic_tax: z.object({
'enabled': z.boolean()
}).optional(), collection_method: z.enum(['charge_automatically', 'send_invoice']).optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), current_period_end: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), current_period_start: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), price: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'all', 'canceled', 'ended', 'incomplete', 'incomplete_expired', 'past_due', 'paused', 'trialing', 'unpaid']).optional(), test_clock: z.string().optional() }).parse),
/**
 * Create a subscription
 *
 * Creates a new subscription on an existing customer. Each customer can have up to 500 active or scheduled subscriptions.
 * 
 * When you create a subscription with `collection_method=charge_automatically`, the first invoice is finalized as part of the request.
 * The `payment_behavior` parameter determines the exact behavior of the initial payment.
 * 
 * To start subscriptions where the first invoice always begins in a `draft` status, use [subscription schedules](/docs/billing/subscriptions/subscription-schedules#managing) instead.
 * Schedules provide the flexibility to model more complex billing configurations that change over time.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'search': {
/**
 * Search subscriptions
 *
 * Search for subscriptions you’ve previously created using Stripe’s [Search Query Language](/docs/search#search-query-language).
 * Don’t use search in read-after-write flows where strict consistency is necessary. Under normal operating
 * conditions, data is searchable in less than a minute. Occasionally, propagation of new or updated data can be up
 * to an hour behind during outages. Search functionality is not available to merchants in India.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$subscription_exposed_id': {
/**
 * Cancel a subscription
 *
 * Cancels a customer’s subscription immediately. The customer won’t be charged again for the subscription. After it’s canceled, you can no longer update the subscription or its [metadata](/metadata).
 * 
 * Any pending invoice items that you’ve created are still charged at the end of the period, unless manually [deleted](#delete_invoiceitem). If you’ve set the subscription to cancel at the end of the period, any pending prorations are also left in place and collected at the end of the period. But if the subscription is set to cancel immediately, pending prorations are removed if `invoice_now` and `prorate` are both set to true.
 * 
 * By default, upon subscription cancellation, Stripe stops automatic collection of all finalized invoices for the customer. This is intended to prevent unexpected payment attempts after the customer has canceled a subscription. However, you can resume automatic collection of the invoices manually after subscription cancellation to have us proceed. Or, you could check for unpaid invoices before allowing the customer to cancel the subscription at all.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
/**
 * Retrieve a subscription
 *
 * Retrieves the subscription with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Subscription.parse(await json())),
/**
 * Update a subscription
 *
 * Updates an existing subscription to match the specified parameters.
 * When changing prices or quantities, we optionally prorate the price we charge next month to make up for any price changes.
 * To preview how the proration is calculated, use the [create preview](/docs/api/invoices/create_preview) endpoint.
 * 
 * By default, we prorate subscription changes. For example, if a customer signs up on May 1 for a 100 price, they’ll be billed 100 immediately. If on May 15 they switch to a 200 price, then on June 1 they’ll be billed 250 (200 for a renewal of her subscription, plus a 50 prorating adjustment for half of the previous month’s 100 difference). Similarly, a downgrade generates a credit that is applied to the next invoice. We also prorate when you make quantity changes.
 * 
 * Switching prices does not normally change the billing date or generate an immediate charge unless:
 * 
 * - The billing interval is changed (for example, from monthly to yearly).
 * 
 * - The subscription moves from free to paid.
 * 
 * - A trial starts or ends.
 * 
 * In these cases, we apply a credit for the unused time on the previous price, immediately charge the customer using the new price, and reset the billing date. Learn about how [Stripe immediately attempts payment for subscription changes](/docs/billing/subscriptions/upgrade-downgrade#immediate-payment).
 * 
 * If you want to charge for an upgrade immediately, pass `proration_behavior` as `always_invoice` to create prorations, automatically invoice the customer for those proration adjustments, and attempt to collect payment. If you pass `create_prorations`, the prorations are created but not automatically invoiced. If you want to bill the customer for the prorations before the subscription’s renewal date, you need to manually [invoice the customer](/docs/api/invoices/create).
 * 
 * If you don’t want to prorate, set the `proration_behavior` option to `none`. With this option, the customer is billed 100 on May 1 and 200 on June 1. Similarly, if you set `proration_behavior` to `none` when switching between different billing intervals (for example, from monthly to yearly), we don’t generate any credits for the old subscription’s unused time. We still reset the billing date and bill immediately for the new subscription.
 * 
 * Updating the quantity on a subscription many times in an hour may result in [rate limiting](/docs/rate-limits). If you need to bill for a frequently changing quantity, consider integrating [usage-based billing](/docs/billing/subscriptions/usage-based) instead.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'discount': {
/**
 * Delete a subscription discount
 *
 * Removes the currently applied discount on a subscription.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json()))
}
},
'$subscription': {
'migrate': {
/**
 * Migrate a subscription
 *
 * Upgrade the billing_mode of an existing subscription.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json()))
},
'resume': {
/**
 * Resume a subscription
 *
 * Initiates resumption of a paused subscription, optionally resetting the billing cycle anchor and creating prorations. If a resumption invoice is generated, it must be paid or marked uncollectible before the subscription will be unpaused. If payment succeeds the subscription will become `active`, and if payment fails the subscription will be `past_due`. The resumption invoice will void automatically if not paid by the expiration date.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json()))
}
}
},
'tax': {
'associations': {
'find': {
/**
 * Find a Tax Association
 *
 * Finds a tax association object by PaymentIntent id.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), payment_intent: z.string() }).parse).def_response(async ({ json }) => Model.TaxAssociation.parse(await json()))
}
},
'calculations': {
/**
 * Create a Tax Calculation
 *
 * Calculates tax based on the input and returns a Tax `Calculation` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxCalculation.parse(await json())),
'$calculation': {
/**
 * Retrieve a Tax Calculation
 *
 * Retrieves a Tax `Calculation` object, if the calculation hasn’t expired.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxCalculation.parse(await json())),
'line_items': {
/**
 * Retrieve a calculation's line items
 *
 * Retrieves the line items of a tax calculation as a collection, if the calculation hasn’t expired.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
},
'registrations': {
/**
 * List registrations
 *
 * Returns a list of Tax `Registration` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'all', 'expired', 'scheduled']).optional() }).parse),
/**
 * Create a registration
 *
 * Creates a new Tax `Registration` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRegistration.parse(await json())),
'$id': {
/**
 * Retrieve a registration
 *
 * Returns a Tax `Registration` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxRegistration.parse(await json())),
/**
 * Update a registration
 *
 * Updates an existing Tax `Registration` object.
 * 
 * A registration cannot be deleted after it has been created. If you wish to end a registration you may do so by setting `expires_at`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRegistration.parse(await json()))
}
},
'settings': {
/**
 * Retrieve settings
 *
 * Retrieves Tax `Settings` for a merchant.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxSettings.parse(await json())),
/**
 * Update settings
 *
 * Updates Tax `Settings` parameters used in tax calculations. All parameters are editable but none can be removed once set.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxSettings.parse(await json()))
},
'transactions': {
'create_from_calculation': {
/**
 * Create a transaction from a calculation
 *
 * Creates a Tax Transaction from a calculation, if that calculation hasn’t expired. Calculations expire after 90 days.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxTransaction.parse(await json()))
},
'create_reversal': {
/**
 * Create a reversal transaction
 *
 * Partially or fully reverses a previously created `Transaction`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxTransaction.parse(await json()))
},
'$transaction': {
/**
 * Retrieve a transaction
 *
 * Retrieves a Tax `Transaction` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxTransaction.parse(await json())),
'line_items': {
/**
 * Retrieve a transaction's line items
 *
 * Retrieves the line items of a committed standalone transaction as a collection.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
}
},
'tax_codes': {
/**
 * List all tax codes
 *
 * A list of [all tax codes available](https://stripe.com/docs/tax/tax-categories) to add to Products in order to allow specific tax calculations.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a tax code
 *
 * Retrieves the details of an existing tax code. Supply the unique tax code ID and Stripe will return the corresponding tax code information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxCode.parse(await json()))
}
},
'tax_ids': {
/**
 * List all tax IDs
 *
 * Returns a list of tax IDs.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), owner: z.object({
'account': z.string().optional(),
'customer': z.string().optional(),
'type': z.enum(['account', 'application', 'customer', 'self'])
}).optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a tax ID
 *
 * Creates a new account or customer `tax_id` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxId.parse(await json())),
'$id': {
/**
 * Delete a tax ID
 *
 * Deletes an existing account or customer `tax_id` object.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTaxId.parse(await json())),
/**
 * Retrieve a tax ID
 *
 * Retrieves an account or customer `tax_id` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxId.parse(await json()))
}
},
'tax_rates': {
/**
 * List all tax rates
 *
 * Returns a list of your tax rates. Tax rates are returned sorted by creation date, with the most recently created tax rates appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), inclusive: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a tax rate
 *
 * Creates a new tax rate.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRate.parse(await json())),
'$tax_rate': {
/**
 * Retrieve a tax rate
 *
 * Retrieves a tax rate with the given ID
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxRate.parse(await json())),
/**
 * Update a tax rate
 *
 * Updates an existing tax rate.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRate.parse(await json()))
}
},
'terminal': {
'configurations': {
/**
 * List all Configurations
 *
 * Returns a list of `Configuration` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), is_account_default: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a Configuration
 *
 * Creates a new `Configuration` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalConfiguration.parse(await json())),
'$configuration': {
/**
 * Delete a Configuration
 *
 * Deletes a `Configuration` object.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalConfiguration.parse(await json())),
/**
 * Retrieve a Configuration
 *
 * Retrieves a `Configuration` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
/**
 * Update a Configuration
 *
 * Updates a new `Configuration` object.
 */
'POST': f.builder().def_json()
}
},
'connection_tokens': {
/**
 * Create a Connection Token
 *
 * To connect to a reader the Stripe Terminal SDK needs to retrieve a short-lived connection token from Stripe, proxied through your server. On your backend, add an endpoint that creates and returns a connection token.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalConnectionToken.parse(await json()))
},
'locations': {
/**
 * List all Locations
 *
 * Returns a list of `Location` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a Location
 *
 * Creates a new `Location` object.
 * For further details, including which address fields are required in each country, see the [Manage locations](/docs/terminal/fleet/locations) guide.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalLocation.parse(await json())),
'$location': {
/**
 * Delete a Location
 *
 * Deletes a `Location` object.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalLocation.parse(await json())),
/**
 * Retrieve a Location
 *
 * Retrieves a `Location` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
/**
 * Update a Location
 *
 * Updates a `Location` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json()
}
},
'onboarding_links': {
/**
 * Create an Onboarding Link
 *
 * Creates a new `OnboardingLink` object that contains a redirect_url used for onboarding onto Tap to Pay on iPhone.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalOnboardingLink.parse(await json()))
},
'readers': {
/**
 * List all Readers
 *
 * Returns a list of `Reader` objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ device_type: z.enum(['bbpos_chipper2x', 'bbpos_wisepad3', 'bbpos_wisepos_e', 'mobile_phone_reader', 'simulated_stripe_s700', 'simulated_wisepos_e', 'stripe_m2', 'stripe_s700', 'verifone_P400']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), location: z.string().optional(), serial_number: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['offline', 'online']).optional() }).parse),
/**
 * Create a Reader
 *
 * Creates a new `Reader` object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json())),
'$reader': {
/**
 * Delete a Reader
 *
 * Deletes a `Reader` object.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalReader.parse(await json())),
/**
 * Retrieve a Reader
 *
 * Retrieves a `Reader` object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
/**
 * Update a Reader
 *
 * Updates a `Reader` object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 */
'POST': f.builder().def_json(),
'cancel_action': {
/**
 * Cancel the current reader action
 *
 * Cancels the current reader action. See [Programmatic Cancellation](/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven#programmatic-cancellation) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'collect_inputs': {
/**
 * Collect inputs using a Reader
 *
 * Initiates an [input collection flow](/docs/terminal/features/collect-inputs) on a Reader to display input forms and collect information from your customers.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'collect_payment_method': {
/**
 * Hand off a PaymentIntent to a Reader and collect card details
 *
 * Initiates a payment flow on a Reader and updates the PaymentIntent with card details before manual confirmation. See [Collecting a Payment method](/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#collect-a-paymentmethod) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'confirm_payment_intent': {
/**
 * Confirm a PaymentIntent on the Reader
 *
 * Finalizes a payment on a Reader. See [Confirming a Payment](/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#confirm-the-paymentintent) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'process_payment_intent': {
/**
 * Hand-off a PaymentIntent to a Reader
 *
 * Initiates a payment flow on a Reader. See [process the payment](/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=immediately#process-payment) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'process_setup_intent': {
/**
 * Hand-off a SetupIntent to a Reader
 *
 * Initiates a SetupIntent flow on a Reader. See [Save directly without charging](/docs/terminal/features/saving-payment-details/save-directly) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'refund_payment': {
/**
 * Refund a Charge or a PaymentIntent in-person
 *
 * Initiates an in-person refund on a Reader. See [Refund an Interac Payment](/docs/terminal/payments/regional?integration-country=CA#refund-an-interac-payment) for more details.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'set_reader_display': {
/**
 * Set reader display
 *
 * Sets the reader display to show [cart details](/docs/terminal/features/display).
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
}
}
}
},
'test_helpers': {
'confirmation_tokens': {
/**
 * Create a test Confirmation Token
 *
 * Creates a test mode Confirmation Token server side for your integration tests.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ConfirmationToken.parse(await json()))
},
'customers': {
'$customer': {
'fund_cash_balance': {
/**
 * Fund a test mode cash balance
 *
 * Create an incoming testmode bank transfer
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerCashBalanceTransaction.parse(await json()))
}
}
},
'issuing': {
'authorizations': {
/**
 * Create a test-mode authorization
 *
 * Create a test-mode authorization.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
'$authorization': {
'capture': {
/**
 * Capture a test-mode authorization
 *
 * Capture a test-mode authorization.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'expire': {
/**
 * Expire a test-mode authorization
 *
 * Expire a test-mode Authorization.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'finalize_amount': {
/**
 * Finalize a test-mode authorization's amount
 *
 * Finalize the amount on an Authorization prior to capture, when the initial authorization was for an estimated amount.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'fraud_challenges': {
'respond': {
/**
 * Respond to fraud challenge
 *
 * Respond to a fraud challenge on a testmode Issuing authorization, simulating either a confirmation of fraud or a correction of legitimacy.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
},
'increment': {
/**
 * Increment a test-mode authorization
 *
 * Increment a test-mode Authorization.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'reverse': {
/**
 * Reverse a test-mode authorization
 *
 * Reverse a test-mode Authorization.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
}
},
'cards': {
'$card': {
'shipping': {
'deliver': {
/**
 * Deliver a testmode card
 *
 * Updates the shipping status of the specified Issuing `Card` object to `delivered`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'fail': {
/**
 * Fail a testmode card
 *
 * Updates the shipping status of the specified Issuing `Card` object to `failure`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'return': {
/**
 * Return a testmode card
 *
 * Updates the shipping status of the specified Issuing `Card` object to `returned`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'ship': {
/**
 * Ship a testmode card
 *
 * Updates the shipping status of the specified Issuing `Card` object to `shipped`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'submit': {
/**
 * Submit a testmode card
 *
 * Updates the shipping status of the specified Issuing `Card` object to `submitted`. This method requires Stripe Version ‘2024-09-30.acacia’ or later.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
}
}
}
},
'personalization_designs': {
'$personalization_design': {
'activate': {
/**
 * Activate a testmode personalization design
 *
 * Updates the `status` of the specified testmode personalization design object to `active`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
},
'deactivate': {
/**
 * Deactivate a testmode personalization design
 *
 * Updates the `status` of the specified testmode personalization design object to `inactive`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
},
'reject': {
/**
 * Reject a testmode personalization design
 *
 * Updates the `status` of the specified testmode personalization design object to `rejected`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
}
}
},
'settlements': {
/**
 * Create a test-mode settlement
 *
 * Allows the user to create an Issuing settlement.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json())),
'$settlement': {
'complete': {
/**
 * Complete a test-mode settlement
 *
 * Allows the user to mark an Issuing settlement as complete.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json()))
}
}
},
'transactions': {
'create_force_capture': {
/**
 * Create a test-mode force capture
 *
 * Allows the user to capture an arbitrary amount, also known as a forced capture.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
},
'create_unlinked_refund': {
/**
 * Create a test-mode unlinked refund
 *
 * Allows the user to refund an arbitrary amount, also known as a unlinked refund.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
},
'$transaction': {
'refund': {
/**
 * Refund a test-mode transaction
 *
 * Refund a test-mode Transaction.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
}
}
}
},
'refunds': {
'$refund': {
'expire': {
/**
 * Expire a pending refund.
 *
 * Expire a refund with a status of `requires_action`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
},
'terminal': {
'readers': {
'$reader': {
'present_payment_method': {
/**
 * Simulate presenting a payment method
 *
 * Presents a payment method on a simulated reader. Can be used to simulate accepting a payment, saving a card or refunding a transaction.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'succeed_input_collection': {
/**
 * Simulate a successful input collection
 *
 * Use this endpoint to trigger a successful input collection on a simulated reader.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'timeout_input_collection': {
/**
 * Simulate an input collection timeout
 *
 * Use this endpoint to complete an input collection with a timeout error on a simulated reader.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
}
}
}
},
'test_clocks': {
/**
 * List all test clocks
 *
 * Returns a list of your test clocks.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a test clock
 *
 * Creates a new test clock that can be attached to new customers and quotes.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json())),
'$test_clock': {
/**
 * Delete a test clock
 *
 * Deletes a test clock.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTestHelpersTestClock.parse(await json())),
/**
 * Retrieve a test clock
 *
 * Retrieves a test clock.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json())),
'advance': {
/**
 * Advance a test clock
 *
 * Starts advancing a test clock to a specified time in the future. Advancement is done when status changes to `Ready`.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json()))
}
}
},
'treasury': {
'inbound_transfers': {
'$id': {
'fail': {
/**
 * Test mode: Fail an InboundTransfer
 *
 * Transitions a test mode created InboundTransfer to the `failed` status. The InboundTransfer must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'return': {
/**
 * Test mode: Return an InboundTransfer
 *
 * Marks the test mode InboundTransfer object as returned and links the InboundTransfer to a ReceivedDebit. The InboundTransfer must already be in the `succeeded` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'succeed': {
/**
 * Test mode: Succeed an InboundTransfer
 *
 * Transitions a test mode created InboundTransfer to the `succeeded` status. The InboundTransfer must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
}
}
},
'outbound_payments': {
'$id': {
/**
 * Test mode: Update an OutboundPayment
 *
 * Updates a test mode created OutboundPayment with tracking details. The OutboundPayment must not be cancelable, and cannot be in the `canceled` or `failed` states.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'fail': {
/**
 * Test mode: Fail an OutboundPayment
 *
 * Transitions a test mode created OutboundPayment to the `failed` status. The OutboundPayment must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
},
'return': {
/**
 * Test mode: Return an OutboundPayment
 *
 * Transitions a test mode created OutboundPayment to the `returned` status. The OutboundPayment must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
}
}
},
'outbound_transfers': {
'$outbound_transfer': {
/**
 * Test mode: Update an OutboundTransfer
 *
 * Updates a test mode created OutboundTransfer with tracking details. The OutboundTransfer must not be cancelable, and cannot be in the `canceled` or `failed` states.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'fail': {
/**
 * Test mode: Fail an OutboundTransfer
 *
 * Transitions a test mode created OutboundTransfer to the `failed` status. The OutboundTransfer must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
},
'return': {
/**
 * Test mode: Return an OutboundTransfer
 *
 * Transitions a test mode created OutboundTransfer to the `returned` status. The OutboundTransfer must already be in the `processing` state.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
}
}
},
'received_credits': {
/**
 * Test mode: Create a ReceivedCredit
 *
 * Use this endpoint to simulate a test mode ReceivedCredit initiated by a third party. In live mode, you can’t directly create ReceivedCredits initiated by third parties.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryReceivedCredit.parse(await json()))
},
'received_debits': {
/**
 * Test mode: Create a ReceivedDebit
 *
 * Use this endpoint to simulate a test mode ReceivedDebit initiated by a third party. In live mode, you can’t directly create ReceivedDebits initiated by third parties.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryReceivedDebit.parse(await json()))
}
}
},
'tokens': {
/**
 * Create a CVC update token
 *
 * Creates a single-use token that represents a bank account’s details.
 * You can use this token with any v1 API method in place of a bank account dictionary. You can only use this token once. To do so, attach it to a [connected account](#accounts) where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Token.parse(await json())),
'$token': {
/**
 * Retrieve a token
 *
 * Retrieves the token with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Token.parse(await json()))
}
},
'topups': {
/**
 * List all top-ups
 *
 * Returns a list of top-ups.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ amount: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'pending', 'succeeded']).optional() }).parse),
/**
 * Create a top-up
 *
 * Top up the balance of an account
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json())),
'$topup': {
/**
 * Retrieve a top-up
 *
 * Retrieves the details of a top-up that has previously been created. Supply the unique top-up ID that was returned from your previous request, and Stripe will return the corresponding top-up information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Topup.parse(await json())),
/**
 * Update a top-up
 *
 * Updates the metadata of a top-up. Other top-up details are not editable by design.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json())),
'cancel': {
/**
 * Cancel a top-up
 *
 * Cancels a top-up. Only pending top-ups can be canceled.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json()))
}
}
},
'transfers': {
/**
 * List all transfers
 *
 * Returns a list of existing transfers sent to connected accounts. The transfers are returned in sorted order, with the most recently created transfers appearing first.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), destination: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), transfer_group: z.string().optional() }).parse),
/**
 * Create a transfer
 *
 * To send funds from your Stripe account to a connected account, you create a new transfer object. Your [Stripe balance](#balance) must be able to cover the transfer amount, or you’ll receive an “Insufficient Funds” error.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Transfer.parse(await json())),
'$id': {
'reversals': {
/**
 * List all reversals
 *
 * You can see a list of the reversals belonging to a specific transfer. Note that the 10 most recent reversals are always available by default on the transfer object. If you need more than those 10, you can use this API method and the `limit` and `starting_after` parameters to page through additional reversals.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a transfer reversal
 *
 * When you create a new reversal, you must specify a transfer to create it on.
 * 
 * When reversing transfers, you can optionally reverse part of the transfer. You can do so as many times as you wish until the entire transfer has been reversed.
 * 
 * Once entirely reversed, a transfer can’t be reversed again. This method will return an error when called on an already-reversed transfer, or when trying to reverse more money than is left on a transfer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TransferReversal.parse(await json()))
}
},
'$transfer': {
/**
 * Retrieve a transfer
 *
 * Retrieves the details of an existing transfer. Supply the unique transfer ID from either a transfer creation request or the transfer list, and Stripe will return the corresponding transfer information.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Transfer.parse(await json())),
/**
 * Update a transfer
 *
 * Updates the specified transfer by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 * 
 * This request accepts only metadata as an argument.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Transfer.parse(await json())),
'reversals': {
'$id': {
/**
 * Retrieve a reversal
 *
 * By default, you can see the 10 most recent reversals stored directly on the transfer object, but you can also retrieve details about a specific reversal stored on the transfer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TransferReversal.parse(await json())),
/**
 * Update a reversal
 *
 * Updates the specified reversal by setting the values of the parameters passed. Any parameters not provided will be left unchanged.
 * 
 * This request only accepts metadata and description as arguments.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TransferReversal.parse(await json()))
}
}
}
},
'treasury': {
'credit_reversals': {
/**
 * List all CreditReversals
 *
 * Returns a list of CreditReversals.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), received_credit: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'posted', 'processing']).optional() }).parse),
/**
 * Create a CreditReversal
 *
 * Reverses a ReceivedCredit and creates a CreditReversal object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryCreditReversal.parse(await json())),
'$credit_reversal': {
/**
 * Retrieve a CreditReversal
 *
 * Retrieves the details of an existing CreditReversal by passing the unique CreditReversal ID from either the CreditReversal creation request or CreditReversal list
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryCreditReversal.parse(await json()))
}
},
'debit_reversals': {
/**
 * List all DebitReversals
 *
 * Returns a list of DebitReversals.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), received_debit: z.string().optional(), resolution: z.enum(['lost', 'won']).optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'completed', 'processing']).optional() }).parse),
/**
 * Create a DebitReversal
 *
 * Reverses a ReceivedDebit and creates a DebitReversal object.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryDebitReversal.parse(await json())),
'$debit_reversal': {
/**
 * Retrieve a DebitReversal
 *
 * Retrieves a DebitReversal object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryDebitReversal.parse(await json()))
}
},
'financial_accounts': {
/**
 * List all FinancialAccounts
 *
 * Returns a list of FinancialAccounts.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['closed', 'open']).optional() }).parse),
/**
 * Create a FinancialAccount
 *
 * Creates a new FinancialAccount. Each connected account can have up to three FinancialAccounts by default.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
'$financial_account': {
/**
 * Retrieve a FinancialAccount
 *
 * Retrieves the details of a FinancialAccount.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
/**
 * Update a FinancialAccount
 *
 * Updates the details of a FinancialAccount.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
'close': {
/**
 * Close a FinancialAccount
 *
 * Closes a FinancialAccount. A FinancialAccount can only be closed if it has a zero balance, has no pending InboundTransfers, and has canceled all attached Issuing cards.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json()))
},
'features': {
/**
 * Retrieve FinancialAccount Features
 *
 * Retrieves Features information associated with the FinancialAccount.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryFinancialAccountFeatures.parse(await json())),
/**
 * Update FinancialAccount Features
 *
 * Updates the Features associated with a FinancialAccount.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccountFeatures.parse(await json()))
}
}
},
'inbound_transfers': {
/**
 * List all InboundTransfers
 *
 * Returns a list of InboundTransfers sent from the specified FinancialAccount.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'processing', 'succeeded']).optional() }).parse),
/**
 * Create an InboundTransfer
 *
 * Creates an InboundTransfer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json())),
'$id': {
/**
 * Retrieve an InboundTransfer
 *
 * Retrieves the details of an existing InboundTransfer.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'$inbound_transfer': {
'cancel': {
/**
 * Cancel an InboundTransfer
 *
 * Cancels an InboundTransfer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
}
}
},
'outbound_payments': {
/**
 * List all OutboundPayments
 *
 * Returns a list of OutboundPayments sent from the specified FinancialAccount.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).optional() }).parse),
/**
 * Create an OutboundPayment
 *
 * Creates an OutboundPayment.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'$id': {
/**
 * Retrieve an OutboundPayment
 *
 * Retrieves the details of an existing OutboundPayment by passing the unique OutboundPayment ID from either the OutboundPayment creation request or OutboundPayment list.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'cancel': {
/**
 * Cancel an OutboundPayment
 *
 * Cancel an OutboundPayment.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
}
}
},
'outbound_transfers': {
/**
 * List all OutboundTransfers
 *
 * Returns a list of OutboundTransfers sent from the specified FinancialAccount.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).optional() }).parse),
/**
 * Create an OutboundTransfer
 *
 * Creates an OutboundTransfer.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'$outbound_transfer': {
/**
 * Retrieve an OutboundTransfer
 *
 * Retrieves the details of an existing OutboundTransfer by passing the unique OutboundTransfer ID from either the OutboundTransfer creation request or OutboundTransfer list.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'cancel': {
/**
 * Cancel an OutboundTransfer
 *
 * An OutboundTransfer can be canceled if the funds have not yet been paid out.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
}
}
},
'received_credits': {
/**
 * List all ReceivedCredits
 *
 * Returns a list of ReceivedCredits.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), linked_flows: z.object({
'source_flow_type': z.enum(['credit_reversal', 'other', 'outbound_payment', 'outbound_transfer', 'payout'])
}).optional(), starting_after: z.string().optional(), status: z.enum(['failed', 'succeeded']).optional() }).parse),
'$id': {
/**
 * Retrieve a ReceivedCredit
 *
 * Retrieves the details of an existing ReceivedCredit by passing the unique ReceivedCredit ID from the ReceivedCredit list.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryReceivedCredit.parse(await json()))
}
},
'received_debits': {
/**
 * List all ReceivedDebits
 *
 * Returns a list of ReceivedDebits.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['failed', 'succeeded']).optional() }).parse),
'$id': {
/**
 * Retrieve a ReceivedDebit
 *
 * Retrieves the details of an existing ReceivedDebit by passing the unique ReceivedDebit ID from the ReceivedDebit list
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryReceivedDebit.parse(await json()))
}
},
'transaction_entries': {
/**
 * List all TransactionEntries
 *
 * Retrieves a list of TransactionEntry objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), effective_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), order_by: z.enum(['created', 'effective_at']).optional(), starting_after: z.string().optional(), transaction: z.string().optional() }).parse),
'$id': {
/**
 * Retrieve a TransactionEntry
 *
 * Retrieves a TransactionEntry object.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryTransactionEntry.parse(await json()))
}
},
'transactions': {
/**
 * List all Transactions
 *
 * Retrieves a list of Transaction objects.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), order_by: z.enum(['created', 'posted_at']).optional(), starting_after: z.string().optional(), status: z.enum(['open', 'posted', 'void']).optional(), status_transitions: z.object({
'posted_at': z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional()
}).optional() }).parse),
'$id': {
/**
 * Retrieve a Transaction
 *
 * Retrieves the details of an existing Transaction.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryTransaction.parse(await json()))
}
}
},
'webhook_endpoints': {
/**
 * List all webhook endpoints
 *
 * Returns a list of your webhook endpoints.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
/**
 * Create a webhook endpoint
 *
 * A webhook endpoint must have a `url` and a list of `enabled_events`. You may optionally specify the Boolean `connect` parameter. If set to true, then a Connect webhook endpoint that notifies the specified `url` about events from all connected accounts is created; otherwise an account webhook endpoint that notifies the specified `url` only about events from your account is created. You can also create webhook endpoints in the [webhooks settings](https://dashboard.stripe.com/account/webhooks) section of the Dashboard.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json())),
'$webhook_endpoint': {
/**
 * Delete a webhook endpoint
 *
 * You can also delete webhook endpoints via the [webhook endpoint management](https://dashboard.stripe.com/account/webhooks) page of the Stripe dashboard.
 */
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedWebhookEndpoint.parse(await json())),
/**
 * Retrieve a webhook endpoint
 *
 * Retrieves the webhook endpoint with the given ID.
 */
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json())),
/**
 * Update a webhook endpoint
 *
 * Updates the webhook endpoint. You may edit the `url`, the list of `enabled_events`, and the status of your endpoint.
 */
'POST': f.builder().def_json().def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json()))
}
}
}
});
}