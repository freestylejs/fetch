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
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Account.parse(await json()))
},
'account_links': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AccountLink.parse(await json()))
},
'account_sessions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AccountSession.parse(await json()))
},
'accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json())),
'$account': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedAccount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Account.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json())),
'bank_accounts': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedExternalAccount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'capabilities': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'$capability': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Capability.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Capability.parse(await json()))
}
},
'external_accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), object: z.enum(['bank_account', 'card']).optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedExternalAccount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExternalAccount.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'login_links': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.LoginLink.parse(await json()))
},
'people': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), relationship: z.object({
'authorizer': z.boolean().optional(),
'director': z.boolean().optional(),
'executive': z.boolean().optional(),
'legal_guardian': z.boolean().optional(),
'owner': z.boolean().optional(),
'representative': z.boolean().optional()
}).optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json())),
'$person': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPerson.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Person.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json()))
}
},
'persons': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), relationship: z.object({
'authorizer': z.boolean().optional(),
'director': z.boolean().optional(),
'executive': z.boolean().optional(),
'legal_guardian': z.boolean().optional(),
'owner': z.boolean().optional(),
'representative': z.boolean().optional()
}).optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json())),
'$person': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPerson.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Person.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Person.parse(await json()))
}
},
'reject': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Account.parse(await json()))
}
}
},
'apple_pay': {
'domains': {
'GET': f.builder().def_json().def_searchparams(z.object({ domain_name: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ApplePayDomain.parse(await json())),
'$domain': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedApplePayDomain.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ApplePayDomain.parse(await json()))
}
}
},
'application_fees': {
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$fee': {
'refunds': {
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FeeRefund.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FeeRefund.parse(await json()))
}
}
},
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ApplicationFee.parse(await json())),
'refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ApplicationFee.parse(await json()))
},
'refunds': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FeeRefund.parse(await json()))
}
}
},
'apps': {
'secrets': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), scope: z.object({
'type': z.enum(['account', 'user']),
'user': z.string().optional()
}), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.AppsSecret.parse(await json())),
'DELETE': f.builder().def_json(),
'find': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), name: z.string(), scope: z.object({
'type': z.enum(['account', 'user']),
'user': z.string().optional()
}) }).parse).def_response(async ({ json }) => Model.AppsSecret.parse(await json()))
}
}
},
'balance': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Balance.parse(await json())),
'history': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payout: z.string().optional(), source: z.string().optional(), starting_after: z.string().optional(), type: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceTransaction.parse(await json()))
}
}
},
'balance_settings': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceSettings.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BalanceSettings.parse(await json()))
},
'balance_transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payout: z.string().optional(), source: z.string().optional(), starting_after: z.string().optional(), type: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BalanceTransaction.parse(await json()))
}
},
'billing': {
'alerts': {
'GET': f.builder().def_json().def_searchparams(z.object({ alert_type: z.enum(['usage_threshold']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), meter: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingAlert.parse(await json())),
'activate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
},
'archive': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
},
'deactivate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingAlert.parse(await json()))
}
}
},
'credit_balance_summary': {
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
'GET': f.builder().def_json().def_searchparams(z.object({ credit_grant: z.string().optional(), customer: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingCreditBalanceTransaction.parse(await json()))
}
},
'credit_grants': {
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json())),
'expire': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json()))
},
'void': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingCreditGrant.parse(await json()))
}
}
},
'meter_event_adjustments': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeterEventAdjustment.parse(await json()))
},
'meter_events': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeterEvent.parse(await json()))
},
'meters': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json())),
'deactivate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json()))
},
'event_summaries': {
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string(), end_time: z.number().int(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), start_time: z.number().int(), starting_after: z.string().optional(), value_grouping_window: z.enum(['day', 'hour']).optional() }).parse)
},
'reactivate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingMeter.parse(await json()))
}
}
}
},
'billing_portal': {
'configurations': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), is_default: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json())),
'$configuration': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalConfiguration.parse(await json()))
}
},
'sessions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BillingPortalSession.parse(await json()))
}
},
'charges': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional(), transfer_group: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$charge': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Charge.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json())),
'capture': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json()))
},
'dispute': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Dispute.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json())),
'close': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json()))
}
},
'refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Charge.parse(await json()))
},
'refunds': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'$refund': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Refund.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
}
},
'checkout': {
'sessions': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), customer_details: z.object({
'email': z.string()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), payment_link: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['complete', 'expired', 'open']).optional(), subscription: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
'$session': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json())),
'expire': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CheckoutSession.parse(await json()))
},
'line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
}
},
'climate': {
'orders': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
'$order': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ClimateOrder.parse(await json()))
}
}
},
'products': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$product': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateProduct.parse(await json()))
}
},
'suppliers': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$supplier': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ClimateSupplier.parse(await json()))
}
}
},
'confirmation_tokens': {
'$confirmation_token': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ConfirmationToken.parse(await json()))
}
},
'country_specs': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$country': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CountrySpec.parse(await json()))
}
},
'coupons': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Coupon.parse(await json())),
'$coupon': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedCoupon.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Coupon.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Coupon.parse(await json()))
}
},
'credit_notes': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'preview': {
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
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
},
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json())),
'void': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CreditNote.parse(await json()))
}
}
},
'customer_sessions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerSession.parse(await json()))
},
'customers': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), email: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), test_clock: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Customer.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$customer': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedCustomer.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Customer.parse(await json())),
'balance_transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json())),
'$transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerBalanceTransaction.parse(await json()))
}
},
'bank_accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
'DELETE': f.builder().def_json(),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.BankAccount.parse(await json())),
'POST': f.builder().def_json(),
'verify': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BankAccount.parse(await json()))
}
}
},
'cards': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
'DELETE': f.builder().def_json(),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Card.parse(await json())),
'POST': f.builder().def_json()
}
},
'cash_balance': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CashBalance.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CashBalance.parse(await json()))
},
'cash_balance_transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.CustomerCashBalanceTransaction.parse(await json()))
}
},
'discount': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Discount.parse(await json()))
},
'funding_instructions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FundingInstructions.parse(await json()))
},
'payment_methods': {
'GET': f.builder().def_json().def_searchparams(z.object({ allow_redisplay: z.enum(['always', 'limited', 'unspecified']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']).optional() }).parse),
'$payment_method': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
}
},
'sources': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), object: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'$id': {
'DELETE': f.builder().def_json(),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentSource.parse(await json())),
'POST': f.builder().def_json(),
'verify': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.BankAccount.parse(await json()))
}
}
},
'subscriptions': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'$subscription_exposed_id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Subscription.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'discount': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Discount.parse(await json()))
}
}
},
'tax_ids': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxId.parse(await json())),
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTaxId.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxId.parse(await json()))
}
}
}
},
'disputes': {
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
'$dispute': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Dispute.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json())),
'close': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Dispute.parse(await json()))
}
}
},
'entitlements': {
'active_entitlements': {
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.EntitlementsActiveEntitlement.parse(await json()))
}
},
'features': {
'GET': f.builder().def_json().def_searchparams(z.object({ archived: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), lookup_key: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EntitlementsFeature.parse(await json()))
}
}
},
'ephemeral_keys': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.EphemeralKey.parse(await json())),
'$key': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.EphemeralKey.parse(await json()))
}
},
'events': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), delivery_success: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.string().optional(), types: z.array(z.string()).optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Event.parse(await json()))
}
},
'exchange_rates': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$rate_id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ExchangeRate.parse(await json()))
}
},
'external_accounts': {
'$id': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ExternalAccount.parse(await json()))
}
},
'file_links': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), expired: z.boolean().optional(), file: z.string().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FileLink.parse(await json())),
'$link': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FileLink.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FileLink.parse(await json()))
}
},
'files': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), purpose: z.enum(['account_requirement', 'additional_verification', 'business_icon', 'business_logo', 'customer_signature', 'dispute_evidence', 'document_provider_identity_document', 'finance_report_run', 'financial_account_statement', 'identity_document', 'identity_document_downloadable', 'issuing_regulatory_reporting', 'pci_document', 'platform_terms_of_service', 'selfie', 'sigma_scheduled_query', 'tax_document_user_upload', 'terminal_android_apk', 'terminal_reader_splashscreen']).optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_body(z.instanceof(FormData).parse).def_response(async ({ json }) => Model.File.parse(await json())),
'$file': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.File.parse(await json()))
}
},
'financial_connections': {
'accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ account_holder: z.object({
'account': z.string().optional(),
'customer': z.string().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), session: z.string().optional(), starting_after: z.string().optional() }).parse),
'$account': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json())),
'disconnect': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'owners': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), ownership: z.string(), starting_after: z.string().optional() }).parse)
},
'refresh': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'subscribe': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'unsubscribe': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
}
}
},
'sessions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json())),
'$session': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json()))
}
},
'transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ account: z.string(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), transacted_at: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), transaction_refresh: z.object({
'after': z.string()
}).optional() }).parse),
'$transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsTransaction.parse(await json()))
}
}
},
'forwarding': {
'requests': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ForwardingRequest.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ForwardingRequest.parse(await json()))
}
}
},
'identity': {
'verification_reports': {
'GET': f.builder().def_json().def_searchparams(z.object({ client_reference_id: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['document', 'id_number']).optional(), verification_session: z.string().optional() }).parse),
'$report': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IdentityVerificationReport.parse(await json()))
}
},
'verification_sessions': {
'GET': f.builder().def_json().def_searchparams(z.object({ client_reference_id: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), related_customer: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'processing', 'requires_input', 'verified']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
'$session': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json()))
},
'redact': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IdentityVerificationSession.parse(await json()))
}
}
}
},
'invoice_payments': {
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
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.InvoicePayment.parse(await json()))
}
},
'invoice_rendering_templates': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'archived']).optional() }).parse),
'$template': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), version: z.number().int().optional() }).parse).def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json())),
'archive': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json()))
},
'unarchive': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.InvoiceRenderingTemplate.parse(await json()))
}
}
},
'invoiceitems': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), invoice: z.string().optional(), limit: z.number().int().optional(), pending: z.boolean().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoiceitem.parse(await json())),
'$invoiceitem': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedInvoiceitem.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Invoiceitem.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoiceitem.parse(await json()))
}
},
'invoices': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json())),
'create_preview': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$invoice': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedInvoice.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Invoice.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json())),
'add_lines': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'attach_payment': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'finalize': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'lines': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$line_item_id': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.LineItem.parse(await json()))
}
},
'mark_uncollectible': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'pay': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'remove_lines': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'send': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'update_lines': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
},
'void': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Invoice.parse(await json()))
}
}
},
'issuing': {
'authorizations': {
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string().optional(), cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['closed', 'expired', 'pending', 'reversed']).optional() }).parse),
'$authorization': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
'approve': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'decline': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
}
},
'cardholders': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), email: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), phone_number: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'blocked', 'inactive']).optional(), type: z.enum(['company', 'individual']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCardholder.parse(await json())),
'$cardholder': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingCardholder.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCardholder.parse(await json()))
}
},
'cards': {
'GET': f.builder().def_json().def_searchparams(z.object({ cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), exp_month: z.number().int().optional(), exp_year: z.number().int().optional(), expand: z.array(z.string()).optional(), last4: z.string().optional(), limit: z.number().int().optional(), personalization_design: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'canceled', 'inactive']).optional(), type: z.enum(['physical', 'virtual']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json())),
'$card': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingCard.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
}
},
'disputes': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['expired', 'lost', 'submitted', 'unsubmitted', 'won']).optional(), transaction: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
'$dispute': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json())),
'submit': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingDispute.parse(await json()))
}
}
},
'personalization_designs': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), lookup_keys: z.array(z.string()).optional(), preferences: z.object({
'is_default': z.boolean().optional(),
'is_platform_default': z.boolean().optional()
}).optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive', 'rejected', 'review']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json())),
'$personalization_design': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
}
},
'physical_bundles': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'inactive', 'review']).optional(), type: z.enum(['custom', 'standard']).optional() }).parse),
'$physical_bundle': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingPhysicalBundle.parse(await json()))
}
},
'settlements': {
'$settlement': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingSettlement.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json()))
}
},
'tokens': {
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'deleted', 'requested', 'suspended']).optional() }).parse),
'$token': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingToken.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingToken.parse(await json()))
}
},
'transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ card: z.string().optional(), cardholder: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['capture', 'refund']).optional() }).parse),
'$transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.IssuingTransaction.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
}
}
},
'link_account_sessions': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json())),
'$session': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsSession.parse(await json()))
}
},
'linked_accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ account_holder: z.object({
'account': z.string().optional(),
'customer': z.string().optional()
}).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), session: z.string().optional(), starting_after: z.string().optional() }).parse),
'$account': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json())),
'disconnect': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
},
'owners': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), ownership: z.string(), starting_after: z.string().optional() }).parse)
},
'refresh': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.FinancialConnectionsAccount.parse(await json()))
}
}
},
'mandates': {
'$mandate': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Mandate.parse(await json()))
}
},
'payment_attempt_records': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_record: z.string(), starting_after: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentAttemptRecord.parse(await json()))
}
},
'payment_intents': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$intent': {
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json())),
'amount_details_line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'apply_customer_balance': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'capture': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'confirm': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'increment_authorization': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
},
'verify_microdeposits': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentIntent.parse(await json()))
}
}
},
'payment_links': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
'$payment_link': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentLink.parse(await json())),
'line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
},
'payment_method_configurations': {
'GET': f.builder().def_json().def_searchparams(z.object({ application: z.union([z.string(), z.enum([''])]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json())),
'$configuration': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodConfiguration.parse(await json()))
}
},
'payment_method_domains': {
'GET': f.builder().def_json().def_searchparams(z.object({ domain_name: z.string().optional(), enabled: z.boolean().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
'$payment_method_domain': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json())),
'validate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethodDomain.parse(await json()))
}
}
},
'payment_methods': {
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), type: z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
'$payment_method': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json())),
'attach': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
},
'detach': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentMethod.parse(await json()))
}
}
},
'payment_records': {
'report_payment': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PaymentRecord.parse(await json())),
'report_payment_attempt': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_canceled': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_failed': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_guaranteed': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_payment_attempt_informational': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
},
'report_refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PaymentRecord.parse(await json()))
}
}
},
'payouts': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json())),
'$payout': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Payout.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json()))
},
'reverse': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Payout.parse(await json()))
}
}
},
'plans': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), product: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Plan.parse(await json())),
'$plan': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedPlan.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Plan.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Plan.parse(await json()))
}
},
'prices': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Price.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$price': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Price.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Price.parse(await json()))
}
},
'products': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), ids: z.array(z.string()).optional(), limit: z.number().int().optional(), shippable: z.boolean().optional(), starting_after: z.string().optional(), url: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Product.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedProduct.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Product.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Product.parse(await json()))
},
'$product': {
'features': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ProductFeature.parse(await json())),
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedProductFeature.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ProductFeature.parse(await json()))
}
}
}
},
'promotion_codes': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), code: z.string().optional(), coupon: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PromotionCode.parse(await json())),
'$promotion_code': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.PromotionCode.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.PromotionCode.parse(await json()))
}
},
'quotes': {
'GET': f.builder().def_json().def_searchparams(z.object({ customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['accepted', 'canceled', 'draft', 'open']).optional(), test_clock: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json())),
'$quote': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Quote.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json())),
'accept': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'computed_upfront_line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'finalize': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Quote.parse(await json()))
},
'line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
},
'pdf': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse)
}
}
},
'radar': {
'early_fraud_warnings': {
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
'$early_fraud_warning': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarEarlyFraudWarning.parse(await json()))
}
},
'value_list_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), value: z.string().optional(), value_list: z.string() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueListItem.parse(await json())),
'$item': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedRadarValueListItem.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarValueListItem.parse(await json()))
}
},
'value_lists': {
'GET': f.builder().def_json().def_searchparams(z.object({ alias: z.string().optional(), contains: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueList.parse(await json())),
'$value_list': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedRadarValueList.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.RadarValueList.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.RadarValueList.parse(await json()))
}
}
},
'refunds': {
'GET': f.builder().def_json().def_searchparams(z.object({ charge: z.string().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_intent: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'$refund': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Refund.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
},
'reporting': {
'report_runs': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ReportingReportRun.parse(await json())),
'$report_run': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ReportingReportRun.parse(await json()))
}
},
'report_types': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'$report_type': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ReportingReportType.parse(await json()))
}
}
},
'reviews': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$review': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Review.parse(await json())),
'approve': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Review.parse(await json()))
}
}
},
'setup_attempts': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), setup_intent: z.string(), starting_after: z.string().optional() }).parse)
},
'setup_intents': {
'GET': f.builder().def_json().def_searchparams(z.object({ attach_to_self: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), payment_method: z.string().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
'$intent': {
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
},
'confirm': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
},
'verify_microdeposits': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SetupIntent.parse(await json()))
}
}
},
'shipping_rates': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), currency: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ShippingRate.parse(await json())),
'$shipping_rate_token': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ShippingRate.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ShippingRate.parse(await json()))
}
},
'sigma': {
'saved_queries': {
'$id': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SigmaSigmaApiQuery.parse(await json()))
}
},
'scheduled_query_runs': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$scheduled_query_run': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.ScheduledQueryRun.parse(await json()))
}
}
},
'sources': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json())),
'$source': {
'GET': f.builder().def_json().def_searchparams(z.object({ client_secret: z.string().optional(), expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Source.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json())),
'mandate_notifications': {
'$mandate_notification': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SourceMandateNotification.parse(await json()))
}
},
'source_transactions': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$source_transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SourceTransaction.parse(await json()))
}
},
'verify': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Source.parse(await json()))
}
}
},
'subscription_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), subscription: z.string() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionItem.parse(await json())),
'$item': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedSubscriptionItem.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SubscriptionItem.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionItem.parse(await json()))
}
},
'subscription_schedules': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
'$schedule': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json()))
},
'release': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.SubscriptionSchedule.parse(await json()))
}
}
},
'subscriptions': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'search': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), limit: z.number().int().optional(), page: z.string().optional(), query: z.string() }).parse)
},
'$subscription_exposed_id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Subscription.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json())),
'discount': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedDiscount.parse(await json()))
}
},
'$subscription': {
'migrate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json()))
},
'resume': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Subscription.parse(await json()))
}
}
},
'tax': {
'associations': {
'find': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional(), payment_intent: z.string() }).parse).def_response(async ({ json }) => Model.TaxAssociation.parse(await json()))
}
},
'calculations': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxCalculation.parse(await json())),
'$calculation': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxCalculation.parse(await json())),
'line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
},
'registrations': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['active', 'all', 'expired', 'scheduled']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRegistration.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxRegistration.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRegistration.parse(await json()))
}
},
'settings': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxSettings.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxSettings.parse(await json()))
},
'transactions': {
'create_from_calculation': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxTransaction.parse(await json()))
},
'create_reversal': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxTransaction.parse(await json()))
},
'$transaction': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxTransaction.parse(await json())),
'line_items': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse)
}
}
}
},
'tax_codes': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxCode.parse(await json()))
}
},
'tax_ids': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), owner: z.object({
'account': z.string().optional(),
'customer': z.string().optional(),
'type': z.enum(['account', 'application', 'customer', 'self'])
}).optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxId.parse(await json())),
'$id': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTaxId.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxId.parse(await json()))
}
},
'tax_rates': {
'GET': f.builder().def_json().def_searchparams(z.object({ active: z.boolean().optional(), created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), inclusive: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRate.parse(await json())),
'$tax_rate': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TaxRate.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TaxRate.parse(await json()))
}
},
'terminal': {
'configurations': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), is_account_default: z.boolean().optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalConfiguration.parse(await json())),
'$configuration': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalConfiguration.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'POST': f.builder().def_json()
}
},
'connection_tokens': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalConnectionToken.parse(await json()))
},
'locations': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalLocation.parse(await json())),
'$location': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalLocation.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'POST': f.builder().def_json()
}
},
'onboarding_links': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalOnboardingLink.parse(await json()))
},
'readers': {
'GET': f.builder().def_json().def_searchparams(z.object({ device_type: z.enum(['bbpos_chipper2x', 'bbpos_wisepad3', 'bbpos_wisepos_e', 'mobile_phone_reader', 'simulated_stripe_s700', 'simulated_wisepos_e', 'stripe_m2', 'stripe_s700', 'verifone_P400']).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), location: z.string().optional(), serial_number: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['offline', 'online']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json())),
'$reader': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTerminalReader.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse),
'POST': f.builder().def_json(),
'cancel_action': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'collect_inputs': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'collect_payment_method': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'confirm_payment_intent': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'process_payment_intent': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'process_setup_intent': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'refund_payment': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'set_reader_display': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
}
}
}
},
'test_helpers': {
'confirmation_tokens': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.ConfirmationToken.parse(await json()))
},
'customers': {
'$customer': {
'fund_cash_balance': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.CustomerCashBalanceTransaction.parse(await json()))
}
}
},
'issuing': {
'authorizations': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json())),
'$authorization': {
'capture': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'expire': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'finalize_amount': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'fraud_challenges': {
'respond': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
},
'increment': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
},
'reverse': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingAuthorization.parse(await json()))
}
}
},
'cards': {
'$card': {
'shipping': {
'deliver': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'fail': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'return': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'ship': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
},
'submit': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingCard.parse(await json()))
}
}
}
},
'personalization_designs': {
'$personalization_design': {
'activate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
},
'deactivate': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
},
'reject': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingPersonalizationDesign.parse(await json()))
}
}
},
'settlements': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json())),
'$settlement': {
'complete': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingSettlement.parse(await json()))
}
}
},
'transactions': {
'create_force_capture': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
},
'create_unlinked_refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
},
'$transaction': {
'refund': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.IssuingTransaction.parse(await json()))
}
}
}
},
'refunds': {
'$refund': {
'expire': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Refund.parse(await json()))
}
}
},
'terminal': {
'readers': {
'$reader': {
'present_payment_method': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'succeed_input_collection': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
},
'timeout_input_collection': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TerminalReader.parse(await json()))
}
}
}
},
'test_clocks': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json())),
'$test_clock': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedTestHelpersTestClock.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json())),
'advance': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TestHelpersTestClock.parse(await json()))
}
}
},
'treasury': {
'inbound_transfers': {
'$id': {
'fail': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'return': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'succeed': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
}
}
},
'outbound_payments': {
'$id': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'fail': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
},
'return': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
}
}
},
'outbound_transfers': {
'$outbound_transfer': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'fail': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
},
'return': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
}
}
},
'received_credits': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryReceivedCredit.parse(await json()))
},
'received_debits': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryReceivedDebit.parse(await json()))
}
}
},
'tokens': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Token.parse(await json())),
'$token': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Token.parse(await json()))
}
},
'topups': {
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
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json())),
'$topup': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Topup.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Topup.parse(await json()))
}
}
},
'transfers': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), destination: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), transfer_group: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Transfer.parse(await json())),
'$id': {
'reversals': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TransferReversal.parse(await json()))
}
},
'$transfer': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.Transfer.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.Transfer.parse(await json())),
'reversals': {
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TransferReversal.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TransferReversal.parse(await json()))
}
}
}
},
'treasury': {
'credit_reversals': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), received_credit: z.string().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'posted', 'processing']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryCreditReversal.parse(await json())),
'$credit_reversal': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryCreditReversal.parse(await json()))
}
},
'debit_reversals': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), received_debit: z.string().optional(), resolution: z.enum(['lost', 'won']).optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'completed', 'processing']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryDebitReversal.parse(await json())),
'$debit_reversal': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryDebitReversal.parse(await json()))
}
},
'financial_accounts': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['closed', 'open']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
'$financial_account': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json())),
'close': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccount.parse(await json()))
},
'features': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryFinancialAccountFeatures.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryFinancialAccountFeatures.parse(await json()))
}
}
},
'inbound_transfers': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'processing', 'succeeded']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
},
'$inbound_transfer': {
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryInboundTransfer.parse(await json()))
}
}
},
'outbound_payments': {
'GET': f.builder().def_json().def_searchparams(z.object({ created: z.union([z.object({
'gt': z.number().int().optional(),
'gte': z.number().int().optional(),
'lt': z.number().int().optional(),
'lte': z.number().int().optional()
}), z.number().int()]).optional(), customer: z.string().optional(), ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundPayment.parse(await json()))
}
}
},
'outbound_transfers': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']).optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'$outbound_transfer': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json())),
'cancel': {
'POST': f.builder().def_json().def_response(async ({ json }) => Model.TreasuryOutboundTransfer.parse(await json()))
}
}
},
'received_credits': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), linked_flows: z.object({
'source_flow_type': z.enum(['credit_reversal', 'other', 'outbound_payment', 'outbound_transfer', 'payout'])
}).optional(), starting_after: z.string().optional(), status: z.enum(['failed', 'succeeded']).optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryReceivedCredit.parse(await json()))
}
},
'received_debits': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), financial_account: z.string(), limit: z.number().int().optional(), starting_after: z.string().optional(), status: z.enum(['failed', 'succeeded']).optional() }).parse),
'$id': {
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryReceivedDebit.parse(await json()))
}
},
'transaction_entries': {
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
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryTransactionEntry.parse(await json()))
}
},
'transactions': {
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
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.TreasuryTransaction.parse(await json()))
}
}
},
'webhook_endpoints': {
'GET': f.builder().def_json().def_searchparams(z.object({ ending_before: z.string().optional(), expand: z.array(z.string()).optional(), limit: z.number().int().optional(), starting_after: z.string().optional() }).parse),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json())),
'$webhook_endpoint': {
'DELETE': f.builder().def_json().def_response(async ({ json }) => Model.DeletedWebhookEndpoint.parse(await json())),
'GET': f.builder().def_json().def_searchparams(z.object({ expand: z.array(z.string()).optional() }).parse).def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json())),
'POST': f.builder().def_json().def_response(async ({ json }) => Model.WebhookEndpoint.parse(await json()))
}
}
}
});
}