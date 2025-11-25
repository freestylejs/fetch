import { z } from 'zod';

// Helper types for recursive schemas

export type FileModel = {
  'created': number;
  'expires_at': number;
  'filename': string;
  'id': string;
  'links'?: {
  'data': FileLinkModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'object': 'file';
  'purpose': 'account_requirement' | 'additional_verification' | 'business_icon' | 'business_logo' | 'customer_signature' | 'dispute_evidence' | 'document_provider_identity_document' | 'finance_report_run' | 'financial_account_statement' | 'identity_document' | 'identity_document_downloadable' | 'issuing_regulatory_reporting' | 'pci_document' | 'platform_terms_of_service' | 'selfie' | 'sigma_scheduled_query' | 'tax_document_user_upload' | 'terminal_android_apk' | 'terminal_reader_splashscreen';
  'size': number;
  'title': string;
  'type': string;
  'url': string;
};

export type FileLinkModel = {
  'created': number;
  'expired': boolean;
  'expires_at': number;
  'file': string | FileModel;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'file_link';
  'url': string;
};

export type LegalEntityCompanyVerificationDocumentModel = {
  'back': string | FileModel;
  'details': string;
  'details_code': string;
  'front': string | FileModel;
};

export type LegalEntityCompanyVerificationModel = {
  'document': LegalEntityCompanyVerificationDocumentModel;
};

export type LegalEntityCompanyModel = {
  'address'?: AddressModel;
  'address_kana'?: LegalEntityJapanAddressModel;
  'address_kanji'?: LegalEntityJapanAddressModel;
  'directors_provided'?: boolean;
  'directorship_declaration'?: LegalEntityDirectorshipDeclarationModel;
  'executives_provided'?: boolean;
  'export_license_id'?: string;
  'export_purpose_code'?: string;
  'name'?: string;
  'name_kana'?: string;
  'name_kanji'?: string;
  'owners_provided'?: boolean;
  'ownership_declaration'?: LegalEntityUboDeclarationModel;
  'ownership_exemption_reason'?: 'qualified_entity_exceeds_ownership_threshold' | 'qualifies_as_financial_institution';
  'phone'?: string;
  'registration_date'?: LegalEntityRegistrationDateModel;
  'representative_declaration'?: LegalEntityRepresentativeDeclarationModel;
  'structure'?: 'free_zone_establishment' | 'free_zone_llc' | 'government_instrumentality' | 'governmental_unit' | 'incorporated_non_profit' | 'incorporated_partnership' | 'limited_liability_partnership' | 'llc' | 'multi_member_llc' | 'private_company' | 'private_corporation' | 'private_partnership' | 'public_company' | 'public_corporation' | 'public_partnership' | 'registered_charity' | 'single_member_llc' | 'sole_establishment' | 'sole_proprietorship' | 'tax_exempt_government_instrumentality' | 'unincorporated_association' | 'unincorporated_non_profit' | 'unincorporated_partnership';
  'tax_id_provided'?: boolean;
  'tax_id_registrar'?: string;
  'vat_id_provided'?: boolean;
  'verification'?: LegalEntityCompanyVerificationModel;
};

export type AccountModel = {
  'business_profile'?: AccountBusinessProfileModel;
  'business_type'?: 'company' | 'government_entity' | 'individual' | 'non_profit';
  'capabilities'?: AccountCapabilitiesModel;
  'charges_enabled'?: boolean;
  'company'?: LegalEntityCompanyModel;
  'controller'?: AccountUnificationAccountControllerModel;
  'country'?: string;
  'created'?: number;
  'default_currency'?: string;
  'details_submitted'?: boolean;
  'email'?: string;
  'external_accounts'?: {
  'data': ExternalAccountModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'future_requirements'?: AccountFutureRequirementsModel;
  'groups'?: AccountGroupMembershipModel;
  'id': string;
  'individual'?: PersonModel;
  'metadata'?: {
  [key: string]: string;
};
  'object': 'account';
  'payouts_enabled'?: boolean;
  'requirements'?: AccountRequirementsModel;
  'settings'?: AccountSettingsModel;
  'tos_acceptance'?: AccountTosAcceptanceModel;
  'type'?: 'custom' | 'express' | 'none' | 'standard';
};

export type BankAccountModel = {
  'account'?: string | AccountModel;
  'account_holder_name': string;
  'account_holder_type': string;
  'account_type': string;
  'available_payout_methods'?: Array<'instant' | 'standard'>;
  'bank_name': string;
  'country': string;
  'currency': string;
  'customer'?: string | CustomerModel | DeletedCustomerModel;
  'default_for_currency'?: boolean;
  'fingerprint': string;
  'future_requirements'?: ExternalAccountRequirementsModel;
  'id': string;
  'last4': string;
  'metadata'?: {
  [key: string]: string;
};
  'object': 'bank_account';
  'requirements'?: ExternalAccountRequirementsModel;
  'routing_number': string;
  'status': string;
};

export type PaymentSourceModel = AccountModel | BankAccountModel | CardModel | SourceModel;

export type CardModel = {
  'account'?: string | AccountModel;
  'address_city': string;
  'address_country': string;
  'address_line1': string;
  'address_line1_check': string;
  'address_line2': string;
  'address_state': string;
  'address_zip': string;
  'address_zip_check': string;
  'allow_redisplay'?: 'always' | 'limited' | 'unspecified';
  'available_payout_methods'?: Array<'instant' | 'standard'>;
  'brand': string;
  'country': string;
  'currency'?: string;
  'customer'?: string | CustomerModel | DeletedCustomerModel;
  'cvc_check': string;
  'default_for_currency'?: boolean;
  'description'?: string;
  'dynamic_last4': string;
  'exp_month': number;
  'exp_year': number;
  'fingerprint'?: string;
  'funding': string;
  'id': string;
  'iin'?: string;
  'issuer'?: string;
  'last4': string;
  'metadata': {
  [key: string]: string;
};
  'name': string;
  'networks'?: TokenCardNetworksModel;
  'object': 'card';
  'regulated_status': 'regulated' | 'unregulated';
  'status'?: string;
  'tokenization_method': string;
};

export type CustomerModel = {
  'address'?: AddressModel;
  'balance'?: number;
  'business_name'?: string;
  'cash_balance'?: CashBalanceModel;
  'created': number;
  'currency'?: string;
  'default_source': string | PaymentSourceModel;
  'delinquent'?: boolean;
  'description': string;
  'discount'?: DiscountModel;
  'email': string;
  'id': string;
  'individual_name'?: string;
  'invoice_credit_balance'?: {
  [key: string]: number;
};
  'invoice_prefix'?: string;
  'invoice_settings'?: InvoiceSettingCustomerSettingModel;
  'livemode': boolean;
  'metadata'?: {
  [key: string]: string;
};
  'name'?: string;
  'next_invoice_sequence'?: number;
  'object': 'customer';
  'phone'?: string;
  'preferred_locales'?: string[];
  'shipping': ShippingModel;
  'sources'?: {
  'data': PaymentSourceModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'subscriptions'?: {
  'data': SubscriptionModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'tax'?: CustomerTaxModel;
  'tax_exempt'?: 'exempt' | 'none' | 'reverse';
  'tax_ids'?: {
  'data': TaxIdModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'test_clock'?: string | TestHelpersTestClockModel;
};

export type DiscountModel = {
  'checkout_session': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'end': number;
  'id': string;
  'invoice': string;
  'invoice_item': string;
  'object': 'discount';
  'promotion_code': string | PromotionCodeModel;
  'source': DiscountSourceModel;
  'start': number;
  'subscription': string;
  'subscription_item': string;
};

export type PromotionCodeModel = {
  'active': boolean;
  'code': string;
  'created': number;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'expires_at': number;
  'id': string;
  'livemode': boolean;
  'max_redemptions': number;
  'metadata': {
  [key: string]: string;
};
  'object': 'promotion_code';
  'promotion': PromotionCodesResourcePromotionModel;
  'restrictions': PromotionCodesResourceRestrictionsModel;
  'times_redeemed': number;
};

export type SetupAttemptModel = {
  'application': string | ApplicationModel;
  'attach_to_self'?: boolean;
  'created': number;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'flow_directions': Array<'inbound' | 'outbound'>;
  'id': string;
  'livemode': boolean;
  'object': 'setup_attempt';
  'on_behalf_of': string | AccountModel;
  'payment_method': string | PaymentMethodModel;
  'payment_method_details': SetupAttemptPaymentMethodDetailsModel;
  'setup_error': ApiErrorsModel;
  'setup_intent': string | SetupIntentModel;
  'status': string;
  'usage': string;
};

export type PaymentMethodModel = {
  'acss_debit'?: PaymentMethodAcssDebitModel;
  'affirm'?: PaymentMethodAffirmModel;
  'afterpay_clearpay'?: PaymentMethodAfterpayClearpayModel;
  'alipay'?: PaymentFlowsPrivatePaymentMethodsAlipayModel;
  'allow_redisplay'?: 'always' | 'limited' | 'unspecified';
  'alma'?: PaymentMethodAlmaModel;
  'amazon_pay'?: PaymentMethodAmazonPayModel;
  'au_becs_debit'?: PaymentMethodAuBecsDebitModel;
  'bacs_debit'?: PaymentMethodBacsDebitModel;
  'bancontact'?: PaymentMethodBancontactModel;
  'billie'?: PaymentMethodBillieModel;
  'billing_details': BillingDetailsModel;
  'blik'?: PaymentMethodBlikModel;
  'boleto'?: PaymentMethodBoletoModel;
  'card'?: PaymentMethodCardModel;
  'card_present'?: PaymentMethodCardPresentModel;
  'cashapp'?: PaymentMethodCashappModel;
  'created': number;
  'crypto'?: PaymentMethodCryptoModel;
  'custom'?: PaymentMethodCustomModel;
  'customer': string | CustomerModel;
  'customer_balance'?: PaymentMethodCustomerBalanceModel;
  'eps'?: PaymentMethodEpsModel;
  'fpx'?: PaymentMethodFpxModel;
  'giropay'?: PaymentMethodGiropayModel;
  'grabpay'?: PaymentMethodGrabpayModel;
  'id': string;
  'ideal'?: PaymentMethodIdealModel;
  'interac_present'?: PaymentMethodInteracPresentModel;
  'kakao_pay'?: PaymentMethodKakaoPayModel;
  'klarna'?: PaymentMethodKlarnaModel;
  'konbini'?: PaymentMethodKonbiniModel;
  'kr_card'?: PaymentMethodKrCardModel;
  'link'?: PaymentMethodLinkModel;
  'livemode': boolean;
  'mb_way'?: PaymentMethodMbWayModel;
  'metadata': {
  [key: string]: string;
};
  'mobilepay'?: PaymentMethodMobilepayModel;
  'multibanco'?: PaymentMethodMultibancoModel;
  'naver_pay'?: PaymentMethodNaverPayModel;
  'nz_bank_account'?: PaymentMethodNzBankAccountModel;
  'object': 'payment_method';
  'oxxo'?: PaymentMethodOxxoModel;
  'p24'?: PaymentMethodP24Model;
  'pay_by_bank'?: PaymentMethodPayByBankModel;
  'payco'?: PaymentMethodPaycoModel;
  'paynow'?: PaymentMethodPaynowModel;
  'paypal'?: PaymentMethodPaypalModel;
  'pix'?: PaymentMethodPixModel;
  'promptpay'?: PaymentMethodPromptpayModel;
  'radar_options'?: RadarRadarOptionsModel;
  'revolut_pay'?: PaymentMethodRevolutPayModel;
  'samsung_pay'?: PaymentMethodSamsungPayModel;
  'satispay'?: PaymentMethodSatispayModel;
  'sepa_debit'?: PaymentMethodSepaDebitModel;
  'sofort'?: PaymentMethodSofortModel;
  'swish'?: PaymentMethodSwishModel;
  'twint'?: PaymentMethodTwintModel;
  'type': 'acss_debit' | 'affirm' | 'afterpay_clearpay' | 'alipay' | 'alma' | 'amazon_pay' | 'au_becs_debit' | 'bacs_debit' | 'bancontact' | 'billie' | 'blik' | 'boleto' | 'card' | 'card_present' | 'cashapp' | 'crypto' | 'custom' | 'customer_balance' | 'eps' | 'fpx' | 'giropay' | 'grabpay' | 'ideal' | 'interac_present' | 'kakao_pay' | 'klarna' | 'konbini' | 'kr_card' | 'link' | 'mb_way' | 'mobilepay' | 'multibanco' | 'naver_pay' | 'nz_bank_account' | 'oxxo' | 'p24' | 'pay_by_bank' | 'payco' | 'paynow' | 'paypal' | 'pix' | 'promptpay' | 'revolut_pay' | 'samsung_pay' | 'satispay' | 'sepa_debit' | 'sofort' | 'swish' | 'twint' | 'us_bank_account' | 'wechat_pay' | 'zip';
  'us_bank_account'?: PaymentMethodUsBankAccountModel;
  'wechat_pay'?: PaymentMethodWechatPayModel;
  'zip'?: PaymentMethodZipModel;
};

export type SetupAttemptPaymentMethodDetailsBancontactModel = {
  'bank_code': string;
  'bank_name': string;
  'bic': string;
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'preferred_language': 'de' | 'en' | 'fr' | 'nl';
  'verified_name': string;
};

export type MandateModel = {
  'customer_acceptance': CustomerAcceptanceModel;
  'id': string;
  'livemode': boolean;
  'multi_use'?: MandateMultiUseModel;
  'object': 'mandate';
  'on_behalf_of'?: string;
  'payment_method': string | PaymentMethodModel;
  'payment_method_details': MandatePaymentMethodDetailsModel;
  'single_use'?: MandateSingleUseModel;
  'status': 'active' | 'inactive' | 'pending';
  'type': 'multi_use' | 'single_use';
};

export type SetupAttemptPaymentMethodDetailsModel = {
  'acss_debit'?: SetupAttemptPaymentMethodDetailsAcssDebitModel;
  'amazon_pay'?: SetupAttemptPaymentMethodDetailsAmazonPayModel;
  'au_becs_debit'?: SetupAttemptPaymentMethodDetailsAuBecsDebitModel;
  'bacs_debit'?: SetupAttemptPaymentMethodDetailsBacsDebitModel;
  'bancontact'?: SetupAttemptPaymentMethodDetailsBancontactModel;
  'boleto'?: SetupAttemptPaymentMethodDetailsBoletoModel;
  'card'?: SetupAttemptPaymentMethodDetailsCardModel;
  'card_present'?: SetupAttemptPaymentMethodDetailsCardPresentModel;
  'cashapp'?: SetupAttemptPaymentMethodDetailsCashappModel;
  'ideal'?: SetupAttemptPaymentMethodDetailsIdealModel;
  'kakao_pay'?: SetupAttemptPaymentMethodDetailsKakaoPayModel;
  'klarna'?: SetupAttemptPaymentMethodDetailsKlarnaModel;
  'kr_card'?: SetupAttemptPaymentMethodDetailsKrCardModel;
  'link'?: SetupAttemptPaymentMethodDetailsLinkModel;
  'naver_pay'?: SetupAttemptPaymentMethodDetailsNaverPayModel;
  'nz_bank_account'?: SetupAttemptPaymentMethodDetailsNzBankAccountModel;
  'paypal'?: SetupAttemptPaymentMethodDetailsPaypalModel;
  'revolut_pay'?: SetupAttemptPaymentMethodDetailsRevolutPayModel;
  'sepa_debit'?: SetupAttemptPaymentMethodDetailsSepaDebitModel;
  'sofort'?: SetupAttemptPaymentMethodDetailsSofortModel;
  'type': string;
  'us_bank_account'?: SetupAttemptPaymentMethodDetailsUsBankAccountModel;
};

export type SetupAttemptPaymentMethodDetailsCardPresentModel = {
  'generated_card': string | PaymentMethodModel;
  'offline': PaymentMethodDetailsCardPresentOfflineModel;
};

export type SetupAttemptPaymentMethodDetailsIdealModel = {
  'bank': 'abn_amro' | 'asn_bank' | 'bunq' | 'buut' | 'finom' | 'handelsbanken' | 'ing' | 'knab' | 'moneyou' | 'n26' | 'nn' | 'rabobank' | 'regiobank' | 'revolut' | 'sns_bank' | 'triodos_bank' | 'van_lanschot' | 'yoursafe';
  'bic': 'ABNANL2A' | 'ASNBNL21' | 'BITSNL2A' | 'BUNQNL2A' | 'BUUTNL2A' | 'FNOMNL22' | 'FVLBNL22' | 'HANDNL2A' | 'INGBNL2A' | 'KNABNL2H' | 'MOYONL21' | 'NNBANL2G' | 'NTSBDEB1' | 'RABONL2U' | 'RBRBNL21' | 'REVOIE23' | 'REVOLT21' | 'SNSBNL2A' | 'TRIONL2U';
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'verified_name': string;
};

export type SetupAttemptPaymentMethodDetailsSofortModel = {
  'bank_code': string;
  'bank_name': string;
  'bic': string;
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'preferred_language': 'de' | 'en' | 'fr' | 'nl';
  'verified_name': string;
};

export type PaymentIntentModel = {
  'amount': number;
  'amount_capturable': number;
  'amount_details'?: PaymentFlowsAmountDetailsModel;
  'amount_received': number;
  'application': string | ApplicationModel;
  'application_fee_amount': number;
  'automatic_payment_methods': PaymentFlowsAutomaticPaymentMethodsPaymentIntentModel;
  'canceled_at': number;
  'cancellation_reason': 'abandoned' | 'automatic' | 'duplicate' | 'expired' | 'failed_invoice' | 'fraudulent' | 'requested_by_customer' | 'void_invoice';
  'capture_method': 'automatic' | 'automatic_async' | 'manual';
  'client_secret': string;
  'confirmation_method': 'automatic' | 'manual';
  'created': number;
  'currency': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'description': string;
  'excluded_payment_method_types': Array<'acss_debit' | 'affirm' | 'afterpay_clearpay' | 'alipay' | 'alma' | 'amazon_pay' | 'au_becs_debit' | 'bacs_debit' | 'bancontact' | 'billie' | 'blik' | 'boleto' | 'card' | 'cashapp' | 'crypto' | 'customer_balance' | 'eps' | 'fpx' | 'giropay' | 'grabpay' | 'ideal' | 'kakao_pay' | 'klarna' | 'konbini' | 'kr_card' | 'mb_way' | 'mobilepay' | 'multibanco' | 'naver_pay' | 'nz_bank_account' | 'oxxo' | 'p24' | 'pay_by_bank' | 'payco' | 'paynow' | 'paypal' | 'pix' | 'promptpay' | 'revolut_pay' | 'samsung_pay' | 'satispay' | 'sepa_debit' | 'sofort' | 'swish' | 'twint' | 'us_bank_account' | 'wechat_pay' | 'zip'>;
  'hooks'?: PaymentFlowsPaymentIntentAsyncWorkflowsModel;
  'id': string;
  'last_payment_error': ApiErrorsModel;
  'latest_charge': string | ChargeModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'next_action': PaymentIntentNextActionModel;
  'object': 'payment_intent';
  'on_behalf_of': string | AccountModel;
  'payment_details'?: PaymentFlowsPaymentDetailsModel;
  'payment_method': string | PaymentMethodModel;
  'payment_method_configuration_details': PaymentMethodConfigBizPaymentMethodConfigurationDetailsModel;
  'payment_method_options': PaymentIntentPaymentMethodOptionsModel;
  'payment_method_types': string[];
  'presentment_details'?: PaymentFlowsPaymentIntentPresentmentDetailsModel;
  'processing': PaymentIntentProcessing_1Model;
  'receipt_email': string;
  'review': string | ReviewModel;
  'setup_future_usage': 'off_session' | 'on_session';
  'shipping': ShippingModel;
  'source': string | PaymentSourceModel | DeletedPaymentSourceModel;
  'statement_descriptor': string;
  'statement_descriptor_suffix': string;
  'status': 'canceled' | 'processing' | 'requires_action' | 'requires_capture' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded';
  'transfer_data': TransferDataModel;
  'transfer_group': string;
};

export type ApiErrorsModel = {
  'advice_code'?: string;
  'charge'?: string;
  'code'?: 'account_closed' | 'account_country_invalid_address' | 'account_error_country_change_requires_additional_steps' | 'account_information_mismatch' | 'account_invalid' | 'account_number_invalid' | 'acss_debit_session_incomplete' | 'alipay_upgrade_required' | 'amount_too_large' | 'amount_too_small' | 'api_key_expired' | 'application_fees_not_allowed' | 'authentication_required' | 'balance_insufficient' | 'balance_invalid_parameter' | 'bank_account_bad_routing_numbers' | 'bank_account_declined' | 'bank_account_exists' | 'bank_account_restricted' | 'bank_account_unusable' | 'bank_account_unverified' | 'bank_account_verification_failed' | 'billing_invalid_mandate' | 'bitcoin_upgrade_required' | 'capture_charge_authorization_expired' | 'capture_unauthorized_payment' | 'card_decline_rate_limit_exceeded' | 'card_declined' | 'cardholder_phone_number_required' | 'charge_already_captured' | 'charge_already_refunded' | 'charge_disputed' | 'charge_exceeds_source_limit' | 'charge_exceeds_transaction_limit' | 'charge_expired_for_capture' | 'charge_invalid_parameter' | 'charge_not_refundable' | 'clearing_code_unsupported' | 'country_code_invalid' | 'country_unsupported' | 'coupon_expired' | 'customer_max_payment_methods' | 'customer_max_subscriptions' | 'customer_session_expired' | 'customer_tax_location_invalid' | 'debit_not_authorized' | 'email_invalid' | 'expired_card' | 'financial_connections_account_inactive' | 'financial_connections_account_pending_account_numbers' | 'financial_connections_account_unavailable_account_numbers' | 'financial_connections_no_successful_transaction_refresh' | 'forwarding_api_inactive' | 'forwarding_api_invalid_parameter' | 'forwarding_api_retryable_upstream_error' | 'forwarding_api_upstream_connection_error' | 'forwarding_api_upstream_connection_timeout' | 'forwarding_api_upstream_error' | 'idempotency_key_in_use' | 'incorrect_address' | 'incorrect_cvc' | 'incorrect_number' | 'incorrect_zip' | 'india_recurring_payment_mandate_canceled' | 'instant_payouts_config_disabled' | 'instant_payouts_currency_disabled' | 'instant_payouts_limit_exceeded' | 'instant_payouts_unsupported' | 'insufficient_funds' | 'intent_invalid_state' | 'intent_verification_method_missing' | 'invalid_card_type' | 'invalid_characters' | 'invalid_charge_amount' | 'invalid_cvc' | 'invalid_expiry_month' | 'invalid_expiry_year' | 'invalid_mandate_reference_prefix_format' | 'invalid_number' | 'invalid_source_usage' | 'invalid_tax_location' | 'invoice_no_customer_line_items' | 'invoice_no_payment_method_types' | 'invoice_no_subscription_line_items' | 'invoice_not_editable' | 'invoice_on_behalf_of_not_editable' | 'invoice_payment_intent_requires_action' | 'invoice_upcoming_none' | 'livemode_mismatch' | 'lock_timeout' | 'missing' | 'no_account' | 'not_allowed_on_standard_account' | 'out_of_inventory' | 'ownership_declaration_not_allowed' | 'parameter_invalid_empty' | 'parameter_invalid_integer' | 'parameter_invalid_string_blank' | 'parameter_invalid_string_empty' | 'parameter_missing' | 'parameter_unknown' | 'parameters_exclusive' | 'payment_intent_action_required' | 'payment_intent_authentication_failure' | 'payment_intent_incompatible_payment_method' | 'payment_intent_invalid_parameter' | 'payment_intent_konbini_rejected_confirmation_number' | 'payment_intent_mandate_invalid' | 'payment_intent_payment_attempt_expired' | 'payment_intent_payment_attempt_failed' | 'payment_intent_rate_limit_exceeded' | 'payment_intent_unexpected_state' | 'payment_method_bank_account_already_verified' | 'payment_method_bank_account_blocked' | 'payment_method_billing_details_address_missing' | 'payment_method_configuration_failures' | 'payment_method_currency_mismatch' | 'payment_method_customer_decline' | 'payment_method_invalid_parameter' | 'payment_method_invalid_parameter_testmode' | 'payment_method_microdeposit_failed' | 'payment_method_microdeposit_verification_amounts_invalid' | 'payment_method_microdeposit_verification_amounts_mismatch' | 'payment_method_microdeposit_verification_attempts_exceeded' | 'payment_method_microdeposit_verification_descriptor_code_mismatch' | 'payment_method_microdeposit_verification_timeout' | 'payment_method_not_available' | 'payment_method_provider_decline' | 'payment_method_provider_timeout' | 'payment_method_unactivated' | 'payment_method_unexpected_state' | 'payment_method_unsupported_type' | 'payout_reconciliation_not_ready' | 'payouts_limit_exceeded' | 'payouts_not_allowed' | 'platform_account_required' | 'platform_api_key_expired' | 'postal_code_invalid' | 'processing_error' | 'product_inactive' | 'progressive_onboarding_limit_exceeded' | 'rate_limit' | 'refer_to_customer' | 'refund_disputed_payment' | 'resource_already_exists' | 'resource_missing' | 'return_intent_already_processed' | 'routing_number_invalid' | 'secret_key_required' | 'sepa_unsupported_account' | 'setup_attempt_failed' | 'setup_intent_authentication_failure' | 'setup_intent_invalid_parameter' | 'setup_intent_mandate_invalid' | 'setup_intent_mobile_wallet_unsupported' | 'setup_intent_setup_attempt_expired' | 'setup_intent_unexpected_state' | 'shipping_address_invalid' | 'shipping_calculation_failed' | 'sku_inactive' | 'state_unsupported' | 'status_transition_invalid' | 'stripe_tax_inactive' | 'tax_id_invalid' | 'tax_id_prohibited' | 'taxes_calculation_failed' | 'terminal_location_country_unsupported' | 'terminal_reader_busy' | 'terminal_reader_hardware_fault' | 'terminal_reader_invalid_location_for_activation' | 'terminal_reader_invalid_location_for_payment' | 'terminal_reader_offline' | 'terminal_reader_timeout' | 'testmode_charges_only' | 'tls_version_unsupported' | 'token_already_used' | 'token_card_network_invalid' | 'token_in_use' | 'transfer_source_balance_parameters_mismatch' | 'transfers_not_allowed' | 'url_invalid';
  'decline_code'?: string;
  'doc_url'?: string;
  'message'?: string;
  'network_advice_code'?: string;
  'network_decline_code'?: string;
  'param'?: string;
  'payment_intent'?: PaymentIntentModel;
  'payment_method'?: PaymentMethodModel;
  'payment_method_type'?: string;
  'request_log_url'?: string;
  'setup_intent'?: SetupIntentModel;
  'source'?: PaymentSourceModel;
  'type': 'api_error' | 'card_error' | 'idempotency_error' | 'invalid_request_error';
};

export type ApplicationFeeModel = {
  'account': string | AccountModel;
  'amount': number;
  'amount_refunded': number;
  'application': string | ApplicationModel;
  'balance_transaction': string | BalanceTransactionModel;
  'charge': string | ChargeModel;
  'created': number;
  'currency': string;
  'fee_source': PlatformEarningFeeSourceModel;
  'id': string;
  'livemode': boolean;
  'object': 'application_fee';
  'originating_transaction': string | ChargeModel;
  'refunded': boolean;
  'refunds': {
  'data': FeeRefundModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
};

export type BalanceTransactionSourceModel = ApplicationFeeModel | ChargeModel | ConnectCollectionTransferModel | CustomerCashBalanceTransactionModel | DisputeModel | FeeRefundModel | IssuingAuthorizationModel | IssuingDisputeModel | IssuingTransactionModel | PayoutModel | RefundModel | ReserveTransactionModel | TaxDeductedAtSourceModel | TopupModel | TransferModel | TransferReversalModel;

export type ChargeModel = {
  'amount': number;
  'amount_captured': number;
  'amount_refunded': number;
  'application': string | ApplicationModel;
  'application_fee': string | ApplicationFeeModel;
  'application_fee_amount': number;
  'authorization_code'?: string;
  'balance_transaction': string | BalanceTransactionModel;
  'billing_details': BillingDetailsModel;
  'calculated_statement_descriptor': string;
  'captured': boolean;
  'created': number;
  'currency': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'description': string;
  'disputed': boolean;
  'failure_balance_transaction': string | BalanceTransactionModel;
  'failure_code': string;
  'failure_message': string;
  'fraud_details': ChargeFraudDetailsModel;
  'id': string;
  'level3'?: Level3Model;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'charge';
  'on_behalf_of': string | AccountModel;
  'outcome': ChargeOutcomeModel;
  'paid': boolean;
  'payment_intent': string | PaymentIntentModel;
  'payment_method': string;
  'payment_method_details': PaymentMethodDetailsModel;
  'presentment_details'?: PaymentFlowsPaymentIntentPresentmentDetailsModel;
  'radar_options'?: RadarRadarOptionsModel;
  'receipt_email': string;
  'receipt_number': string;
  'receipt_url': string;
  'refunded': boolean;
  'refunds'?: {
  'data': RefundModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'review': string | ReviewModel;
  'shipping': ShippingModel;
  'source': PaymentSourceModel;
  'source_transfer': string | TransferModel;
  'statement_descriptor': string;
  'statement_descriptor_suffix': string;
  'status': 'failed' | 'pending' | 'succeeded';
  'transfer'?: string | TransferModel;
  'transfer_data': ChargeTransferDataModel;
  'transfer_group': string;
};

export type ConnectCollectionTransferModel = {
  'amount': number;
  'currency': string;
  'destination': string | AccountModel;
  'id': string;
  'livemode': boolean;
  'object': 'connect_collection_transfer';
};

export type BalanceTransactionModel = {
  'amount': number;
  'available_on': number;
  'balance_type'?: 'issuing' | 'payments' | 'refund_and_dispute_prefunding';
  'created': number;
  'currency': string;
  'description': string;
  'exchange_rate': number;
  'fee': number;
  'fee_details': FeeModel[];
  'id': string;
  'net': number;
  'object': 'balance_transaction';
  'reporting_category': string;
  'source': string | BalanceTransactionSourceModel;
  'status': string;
  'type': 'adjustment' | 'advance' | 'advance_funding' | 'anticipation_repayment' | 'application_fee' | 'application_fee_refund' | 'charge' | 'climate_order_purchase' | 'climate_order_refund' | 'connect_collection_transfer' | 'contribution' | 'issuing_authorization_hold' | 'issuing_authorization_release' | 'issuing_dispute' | 'issuing_transaction' | 'obligation_outbound' | 'obligation_reversal_inbound' | 'payment' | 'payment_failure_refund' | 'payment_network_reserve_hold' | 'payment_network_reserve_release' | 'payment_refund' | 'payment_reversal' | 'payment_unreconciled' | 'payout' | 'payout_cancel' | 'payout_failure' | 'payout_minimum_balance_hold' | 'payout_minimum_balance_release' | 'refund' | 'refund_failure' | 'reserve_transaction' | 'reserved_funds' | 'stripe_balance_payment_debit' | 'stripe_balance_payment_debit_reversal' | 'stripe_fee' | 'stripe_fx_fee' | 'tax_fee' | 'topup' | 'topup_reversal' | 'transfer' | 'transfer_cancel' | 'transfer_failure' | 'transfer_refund';
};

export type CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraftModel = {
  'balance_transaction': string | BalanceTransactionModel;
  'linked_transaction': string | CustomerCashBalanceTransactionModel;
};

export type CustomerCashBalanceTransactionModel = {
  'adjusted_for_overdraft'?: CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraftModel;
  'applied_to_payment'?: CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransactionModel;
  'created': number;
  'currency': string;
  'customer': string | CustomerModel;
  'ending_balance': number;
  'funded'?: CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionModel;
  'id': string;
  'livemode': boolean;
  'net_amount': number;
  'object': 'customer_cash_balance_transaction';
  'refunded_from_payment'?: CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransactionModel;
  'transferred_to_balance'?: CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalanceModel;
  'type': 'adjusted_for_overdraft' | 'applied_to_payment' | 'funded' | 'funding_reversed' | 'refunded_from_payment' | 'return_canceled' | 'return_initiated' | 'transferred_to_balance' | 'unapplied_from_payment';
  'unapplied_from_payment'?: CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransactionModel;
};

export type CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransactionModel = {
  'payment_intent': string | PaymentIntentModel;
};

export type RefundModel = {
  'amount': number;
  'balance_transaction': string | BalanceTransactionModel;
  'charge': string | ChargeModel;
  'created': number;
  'currency': string;
  'description'?: string;
  'destination_details'?: RefundDestinationDetailsModel;
  'failure_balance_transaction'?: string | BalanceTransactionModel;
  'failure_reason'?: string;
  'id': string;
  'instructions_email'?: string;
  'metadata': {
  [key: string]: string;
};
  'next_action'?: RefundNextActionModel;
  'object': 'refund';
  'payment_intent': string | PaymentIntentModel;
  'pending_reason'?: 'charge_pending' | 'insufficient_funds' | 'processing';
  'presentment_details'?: PaymentFlowsPaymentIntentPresentmentDetailsModel;
  'reason': 'duplicate' | 'expired_uncaptured_charge' | 'fraudulent' | 'requested_by_customer';
  'receipt_number': string;
  'source_transfer_reversal': string | TransferReversalModel;
  'status': string;
  'transfer_reversal': string | TransferReversalModel;
};

export type TransferReversalModel = {
  'amount': number;
  'balance_transaction': string | BalanceTransactionModel;
  'created': number;
  'currency': string;
  'destination_payment_refund': string | RefundModel;
  'id': string;
  'metadata': {
  [key: string]: string;
};
  'object': 'transfer_reversal';
  'source_refund': string | RefundModel;
  'transfer': string | TransferModel;
};

export type TransferModel = {
  'amount': number;
  'amount_reversed': number;
  'balance_transaction': string | BalanceTransactionModel;
  'created': number;
  'currency': string;
  'description': string;
  'destination': string | AccountModel;
  'destination_payment'?: string | ChargeModel;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'transfer';
  'reversals': {
  'data': TransferReversalModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'reversed': boolean;
  'source_transaction': string | ChargeModel;
  'source_type'?: string;
  'transfer_group': string;
};

export type CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransactionModel = {
  'refund': string | RefundModel;
};

export type CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalanceModel = {
  'balance_transaction': string | BalanceTransactionModel;
};

export type CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransactionModel = {
  'payment_intent': string | PaymentIntentModel;
};

export type DisputeModel = {
  'amount': number;
  'balance_transactions': BalanceTransactionModel[];
  'charge': string | ChargeModel;
  'created': number;
  'currency': string;
  'enhanced_eligibility_types': Array<'visa_compelling_evidence_3' | 'visa_compliance'>;
  'evidence': DisputeEvidenceModel;
  'evidence_details': DisputeEvidenceDetailsModel;
  'id': string;
  'is_charge_refundable': boolean;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'network_reason_code'?: string;
  'object': 'dispute';
  'payment_intent': string | PaymentIntentModel;
  'payment_method_details'?: DisputePaymentMethodDetailsModel;
  'reason': string;
  'status': 'lost' | 'needs_response' | 'prevented' | 'under_review' | 'warning_closed' | 'warning_needs_response' | 'warning_under_review' | 'won';
};

export type FeeRefundModel = {
  'amount': number;
  'balance_transaction': string | BalanceTransactionModel;
  'created': number;
  'currency': string;
  'fee': string | ApplicationFeeModel;
  'id': string;
  'metadata': {
  [key: string]: string;
};
  'object': 'fee_refund';
};

export type IssuingAuthorizationModel = {
  'amount': number;
  'amount_details': IssuingAuthorizationAmountDetailsModel;
  'approved': boolean;
  'authorization_method': 'chip' | 'contactless' | 'keyed_in' | 'online' | 'swipe';
  'balance_transactions': BalanceTransactionModel[];
  'card': IssuingCardModel;
  'cardholder': string | IssuingCardholderModel;
  'created': number;
  'currency': string;
  'fleet': IssuingAuthorizationFleetDataModel;
  'fraud_challenges'?: IssuingAuthorizationFraudChallengeModel[];
  'fuel': IssuingAuthorizationFuelDataModel;
  'id': string;
  'livemode': boolean;
  'merchant_amount': number;
  'merchant_currency': string;
  'merchant_data': IssuingAuthorizationMerchantDataModel;
  'metadata': {
  [key: string]: string;
};
  'network_data': IssuingAuthorizationNetworkDataModel;
  'object': 'issuing.authorization';
  'pending_request': IssuingAuthorizationPendingRequestModel;
  'request_history': IssuingAuthorizationRequest_1Model[];
  'status': 'closed' | 'expired' | 'pending' | 'reversed';
  'token'?: string | IssuingTokenModel;
  'transactions': IssuingTransactionModel[];
  'treasury'?: IssuingAuthorizationTreasuryModel;
  'verification_data': IssuingAuthorizationVerificationDataModel;
  'verified_by_fraud_challenge': boolean;
  'wallet': string;
};

export type IssuingCardModel = {
  'brand': string;
  'cancellation_reason': 'design_rejected' | 'lost' | 'stolen';
  'cardholder': IssuingCardholderModel;
  'created': number;
  'currency': string;
  'cvc'?: string;
  'exp_month': number;
  'exp_year': number;
  'financial_account'?: string;
  'id': string;
  'last4': string;
  'latest_fraud_warning': IssuingCardFraudWarningModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'number'?: string;
  'object': 'issuing.card';
  'personalization_design': string | IssuingPersonalizationDesignModel;
  'replaced_by': string | IssuingCardModel;
  'replacement_for': string | IssuingCardModel;
  'replacement_reason': 'damaged' | 'expired' | 'lost' | 'stolen';
  'second_line': string;
  'shipping': IssuingCardShippingModel;
  'spending_controls': IssuingCardAuthorizationControlsModel;
  'status': 'active' | 'canceled' | 'inactive';
  'type': 'physical' | 'virtual';
  'wallets': IssuingCardWalletsModel;
};

export type IssuingTransactionModel = {
  'amount': number;
  'amount_details': IssuingTransactionAmountDetailsModel;
  'authorization': string | IssuingAuthorizationModel;
  'balance_transaction': string | BalanceTransactionModel;
  'card': string | IssuingCardModel;
  'cardholder': string | IssuingCardholderModel;
  'created': number;
  'currency': string;
  'dispute': string | IssuingDisputeModel;
  'id': string;
  'livemode': boolean;
  'merchant_amount': number;
  'merchant_currency': string;
  'merchant_data': IssuingAuthorizationMerchantDataModel;
  'metadata': {
  [key: string]: string;
};
  'network_data': IssuingTransactionNetworkDataModel;
  'object': 'issuing.transaction';
  'purchase_details'?: IssuingTransactionPurchaseDetailsModel;
  'token'?: string | IssuingTokenModel;
  'treasury'?: IssuingTransactionTreasuryModel;
  'type': 'capture' | 'refund';
  'wallet': 'apple_pay' | 'google_pay' | 'samsung_pay';
};

export type IssuingDisputeModel = {
  'amount': number;
  'balance_transactions'?: BalanceTransactionModel[];
  'created': number;
  'currency': string;
  'evidence': IssuingDisputeEvidenceModel;
  'id': string;
  'livemode': boolean;
  'loss_reason'?: 'cardholder_authentication_issuer_liability' | 'eci5_token_transaction_with_tavv' | 'excess_disputes_in_timeframe' | 'has_not_met_the_minimum_dispute_amount_requirements' | 'invalid_duplicate_dispute' | 'invalid_incorrect_amount_dispute' | 'invalid_no_authorization' | 'invalid_use_of_disputes' | 'merchandise_delivered_or_shipped' | 'merchandise_or_service_as_described' | 'not_cancelled' | 'other' | 'refund_issued' | 'submitted_beyond_allowable_time_limit' | 'transaction_3ds_required' | 'transaction_approved_after_prior_fraud_dispute' | 'transaction_authorized' | 'transaction_electronically_read' | 'transaction_qualifies_for_visa_easy_payment_service' | 'transaction_unattended';
  'metadata': {
  [key: string]: string;
};
  'object': 'issuing.dispute';
  'status': 'expired' | 'lost' | 'submitted' | 'unsubmitted' | 'won';
  'transaction': string | IssuingTransactionModel;
  'treasury'?: IssuingDisputeTreasuryModel;
};

export type PayoutModel = {
  'amount': number;
  'application_fee': string | ApplicationFeeModel;
  'application_fee_amount': number;
  'arrival_date': number;
  'automatic': boolean;
  'balance_transaction': string | BalanceTransactionModel;
  'created': number;
  'currency': string;
  'description': string;
  'destination': string | ExternalAccountModel | DeletedExternalAccountModel;
  'failure_balance_transaction': string | BalanceTransactionModel;
  'failure_code': string;
  'failure_message': string;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'method': string;
  'object': 'payout';
  'original_payout': string | PayoutModel;
  'payout_method': string;
  'reconciliation_status': 'completed' | 'in_progress' | 'not_applicable';
  'reversed_by': string | PayoutModel;
  'source_type': string;
  'statement_descriptor': string;
  'status': string;
  'trace_id': PayoutsTraceIdModel;
  'type': 'bank_account' | 'card';
};

export type ExternalAccountModel = BankAccountModel | CardModel;

export type TopupModel = {
  'amount': number;
  'balance_transaction': string | BalanceTransactionModel;
  'created': number;
  'currency': string;
  'description': string;
  'expected_availability_date': number;
  'failure_code': string;
  'failure_message': string;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'topup';
  'source': SourceModel;
  'statement_descriptor': string;
  'status': 'canceled' | 'failed' | 'pending' | 'reversed' | 'succeeded';
  'transfer_group': string;
};

export type PaymentMethodDetailsBancontactModel = {
  'bank_code': string;
  'bank_name': string;
  'bic': string;
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'preferred_language': 'de' | 'en' | 'fr' | 'nl';
  'verified_name': string;
};

export type PaymentMethodDetailsModel = {
  'ach_credit_transfer'?: PaymentMethodDetailsAchCreditTransferModel;
  'ach_debit'?: PaymentMethodDetailsAchDebitModel;
  'acss_debit'?: PaymentMethodDetailsAcssDebitModel;
  'affirm'?: PaymentMethodDetailsAffirmModel;
  'afterpay_clearpay'?: PaymentMethodDetailsAfterpayClearpayModel;
  'alipay'?: PaymentFlowsPrivatePaymentMethodsAlipayDetailsModel;
  'alma'?: PaymentMethodDetailsAlmaModel;
  'amazon_pay'?: PaymentMethodDetailsAmazonPayModel;
  'au_becs_debit'?: PaymentMethodDetailsAuBecsDebitModel;
  'bacs_debit'?: PaymentMethodDetailsBacsDebitModel;
  'bancontact'?: PaymentMethodDetailsBancontactModel;
  'billie'?: PaymentMethodDetailsBillieModel;
  'blik'?: PaymentMethodDetailsBlikModel;
  'boleto'?: PaymentMethodDetailsBoletoModel;
  'card'?: PaymentMethodDetailsCardModel;
  'card_present'?: PaymentMethodDetailsCardPresentModel;
  'cashapp'?: PaymentMethodDetailsCashappModel;
  'crypto'?: PaymentMethodDetailsCryptoModel;
  'customer_balance'?: PaymentMethodDetailsCustomerBalanceModel;
  'eps'?: PaymentMethodDetailsEpsModel;
  'fpx'?: PaymentMethodDetailsFpxModel;
  'giropay'?: PaymentMethodDetailsGiropayModel;
  'grabpay'?: PaymentMethodDetailsGrabpayModel;
  'ideal'?: PaymentMethodDetailsIdealModel;
  'interac_present'?: PaymentMethodDetailsInteracPresentModel;
  'kakao_pay'?: PaymentMethodDetailsKakaoPayModel;
  'klarna'?: PaymentMethodDetailsKlarnaModel;
  'konbini'?: PaymentMethodDetailsKonbiniModel;
  'kr_card'?: PaymentMethodDetailsKrCardModel;
  'link'?: PaymentMethodDetailsLinkModel;
  'mb_way'?: PaymentMethodDetailsMbWayModel;
  'mobilepay'?: PaymentMethodDetailsMobilepayModel;
  'multibanco'?: PaymentMethodDetailsMultibancoModel;
  'naver_pay'?: PaymentMethodDetailsNaverPayModel;
  'nz_bank_account'?: PaymentMethodDetailsNzBankAccountModel;
  'oxxo'?: PaymentMethodDetailsOxxoModel;
  'p24'?: PaymentMethodDetailsP24Model;
  'pay_by_bank'?: PaymentMethodDetailsPayByBankModel;
  'payco'?: PaymentMethodDetailsPaycoModel;
  'paynow'?: PaymentMethodDetailsPaynowModel;
  'paypal'?: PaymentMethodDetailsPaypalModel;
  'pix'?: PaymentMethodDetailsPixModel;
  'promptpay'?: PaymentMethodDetailsPromptpayModel;
  'revolut_pay'?: PaymentMethodDetailsRevolutPayModel;
  'samsung_pay'?: PaymentMethodDetailsSamsungPayModel;
  'satispay'?: PaymentMethodDetailsSatispayModel;
  'sepa_credit_transfer'?: PaymentMethodDetailsSepaCreditTransferModel;
  'sepa_debit'?: PaymentMethodDetailsSepaDebitModel;
  'sofort'?: PaymentMethodDetailsSofortModel;
  'stripe_account'?: PaymentMethodDetailsStripeAccountModel;
  'swish'?: PaymentMethodDetailsSwishModel;
  'twint'?: PaymentMethodDetailsTwintModel;
  'type': string;
  'us_bank_account'?: PaymentMethodDetailsUsBankAccountModel;
  'wechat'?: PaymentMethodDetailsWechatModel;
  'wechat_pay'?: PaymentMethodDetailsWechatPayModel;
  'zip'?: PaymentMethodDetailsZipModel;
};

export type PaymentMethodDetailsIdealModel = {
  'bank': 'abn_amro' | 'asn_bank' | 'bunq' | 'buut' | 'finom' | 'handelsbanken' | 'ing' | 'knab' | 'moneyou' | 'n26' | 'nn' | 'rabobank' | 'regiobank' | 'revolut' | 'sns_bank' | 'triodos_bank' | 'van_lanschot' | 'yoursafe';
  'bic': 'ABNANL2A' | 'ASNBNL21' | 'BITSNL2A' | 'BUNQNL2A' | 'BUUTNL2A' | 'FNOMNL22' | 'FVLBNL22' | 'HANDNL2A' | 'INGBNL2A' | 'KNABNL2H' | 'MOYONL21' | 'NNBANL2G' | 'NTSBDEB1' | 'RABONL2U' | 'RBRBNL21' | 'REVOIE23' | 'REVOLT21' | 'SNSBNL2A' | 'TRIONL2U';
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'transaction_id': string;
  'verified_name': string;
};

export type PaymentMethodDetailsSofortModel = {
  'bank_code': string;
  'bank_name': string;
  'bic': string;
  'country': string;
  'generated_sepa_debit': string | PaymentMethodModel;
  'generated_sepa_debit_mandate': string | MandateModel;
  'iban_last4': string;
  'preferred_language': 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl';
  'verified_name': string;
};

export type ReviewModel = {
  'billing_zip': string;
  'charge': string | ChargeModel;
  'closed_reason': 'acknowledged' | 'approved' | 'canceled' | 'disputed' | 'payment_never_settled' | 'redacted' | 'refunded' | 'refunded_as_fraud';
  'created': number;
  'id': string;
  'ip_address': string;
  'ip_address_location': RadarReviewResourceLocationModel;
  'livemode': boolean;
  'object': 'review';
  'open': boolean;
  'opened_reason': 'manual' | 'rule';
  'payment_intent'?: string | PaymentIntentModel;
  'reason': string;
  'session': RadarReviewResourceSessionModel;
};

export type ChargeTransferDataModel = {
  'amount': number;
  'destination': string | AccountModel;
};

export type TransferDataModel = {
  'amount'?: number;
  'destination': string | AccountModel;
};

export type SetupIntentModel = {
  'application': string | ApplicationModel;
  'attach_to_self'?: boolean;
  'automatic_payment_methods': PaymentFlowsAutomaticPaymentMethodsSetupIntentModel;
  'cancellation_reason': 'abandoned' | 'duplicate' | 'requested_by_customer';
  'client_secret': string;
  'created': number;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'description': string;
  'excluded_payment_method_types': Array<'acss_debit' | 'affirm' | 'afterpay_clearpay' | 'alipay' | 'alma' | 'amazon_pay' | 'au_becs_debit' | 'bacs_debit' | 'bancontact' | 'billie' | 'blik' | 'boleto' | 'card' | 'cashapp' | 'crypto' | 'customer_balance' | 'eps' | 'fpx' | 'giropay' | 'grabpay' | 'ideal' | 'kakao_pay' | 'klarna' | 'konbini' | 'kr_card' | 'mb_way' | 'mobilepay' | 'multibanco' | 'naver_pay' | 'nz_bank_account' | 'oxxo' | 'p24' | 'pay_by_bank' | 'payco' | 'paynow' | 'paypal' | 'pix' | 'promptpay' | 'revolut_pay' | 'samsung_pay' | 'satispay' | 'sepa_debit' | 'sofort' | 'swish' | 'twint' | 'us_bank_account' | 'wechat_pay' | 'zip'>;
  'flow_directions'?: Array<'inbound' | 'outbound'>;
  'id': string;
  'last_setup_error': ApiErrorsModel;
  'latest_attempt': string | SetupAttemptModel;
  'livemode': boolean;
  'mandate': string | MandateModel;
  'metadata': {
  [key: string]: string;
};
  'next_action': SetupIntentNextActionModel;
  'object': 'setup_intent';
  'on_behalf_of': string | AccountModel;
  'payment_method': string | PaymentMethodModel;
  'payment_method_configuration_details': PaymentMethodConfigBizPaymentMethodConfigurationDetailsModel;
  'payment_method_options': SetupIntentPaymentMethodOptionsModel;
  'payment_method_types': string[];
  'single_use_mandate': string | MandateModel;
  'status': 'canceled' | 'processing' | 'requires_action' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded';
  'usage': string;
};

export type PaymentMethodCardGeneratedCardModel = {
  'charge': string;
  'payment_method_details': CardGeneratedFromPaymentMethodDetailsModel;
  'setup_attempt': string | SetupAttemptModel;
};

export type PaymentMethodCardModel = {
  'brand': string;
  'checks': PaymentMethodCardChecksModel;
  'country': string;
  'description'?: string;
  'display_brand': string;
  'exp_month': number;
  'exp_year': number;
  'fingerprint'?: string;
  'funding': string;
  'generated_from': PaymentMethodCardGeneratedCardModel;
  'iin'?: string;
  'issuer'?: string;
  'last4': string;
  'networks': NetworksModel;
  'regulated_status': 'regulated' | 'unregulated';
  'three_d_secure_usage': ThreeDSecureUsageModel;
  'wallet': PaymentMethodCardWalletModel;
};

export type InvoiceSettingCustomerSettingModel = {
  'custom_fields': InvoiceSettingCustomFieldModel[];
  'default_payment_method': string | PaymentMethodModel;
  'footer': string;
  'rendering_options': InvoiceSettingCustomerRenderingOptionsModel;
};

export type ConnectAccountReferenceModel = {
  'account'?: string | AccountModel;
  'type': 'account' | 'self';
};

export type SubscriptionAutomaticTaxModel = {
  'disabled_reason': 'requires_location_inputs';
  'enabled': boolean;
  'liability': ConnectAccountReferenceModel;
};

export type SubscriptionModel = {
  'application': string | ApplicationModel | DeletedApplicationModel;
  'application_fee_percent': number;
  'automatic_tax': SubscriptionAutomaticTaxModel;
  'billing_cycle_anchor': number;
  'billing_cycle_anchor_config': SubscriptionsResourceBillingCycleAnchorConfigModel;
  'billing_mode': SubscriptionsResourceBillingModeModel;
  'billing_thresholds': SubscriptionBillingThresholdsModel;
  'cancel_at': number;
  'cancel_at_period_end': boolean;
  'canceled_at': number;
  'cancellation_details': CancellationDetailsModel;
  'collection_method': 'charge_automatically' | 'send_invoice';
  'created': number;
  'currency': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'days_until_due': number;
  'default_payment_method': string | PaymentMethodModel;
  'default_source': string | PaymentSourceModel;
  'default_tax_rates'?: TaxRateModel[];
  'description': string;
  'discounts': Array<string | DiscountModel>;
  'ended_at': number;
  'id': string;
  'invoice_settings': SubscriptionsResourceSubscriptionInvoiceSettingsModel;
  'items': {
  'data': SubscriptionItemModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'latest_invoice': string | InvoiceModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'next_pending_invoice_item_invoice': number;
  'object': 'subscription';
  'on_behalf_of': string | AccountModel;
  'pause_collection': SubscriptionsResourcePauseCollectionModel;
  'payment_settings': SubscriptionsResourcePaymentSettingsModel;
  'pending_invoice_item_interval': SubscriptionPendingInvoiceItemIntervalModel;
  'pending_setup_intent': string | SetupIntentModel;
  'pending_update': SubscriptionsResourcePendingUpdateModel;
  'schedule': string | SubscriptionScheduleModel;
  'start_date': number;
  'status': 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'paused' | 'trialing' | 'unpaid';
  'test_clock': string | TestHelpersTestClockModel;
  'transfer_data': SubscriptionTransferDataModel;
  'trial_end': number;
  'trial_settings': SubscriptionsTrialsResourceTrialSettingsModel;
  'trial_start': number;
};

export type TaxIdModel = {
  'country': string;
  'created': number;
  'customer': string | CustomerModel;
  'id': string;
  'livemode': boolean;
  'object': 'tax_id';
  'owner': TaxIDsOwnerModel;
  'type': 'ad_nrt' | 'ae_trn' | 'al_tin' | 'am_tin' | 'ao_tin' | 'ar_cuit' | 'au_abn' | 'au_arn' | 'aw_tin' | 'az_tin' | 'ba_tin' | 'bb_tin' | 'bd_bin' | 'bf_ifu' | 'bg_uic' | 'bh_vat' | 'bj_ifu' | 'bo_tin' | 'br_cnpj' | 'br_cpf' | 'bs_tin' | 'by_tin' | 'ca_bn' | 'ca_gst_hst' | 'ca_pst_bc' | 'ca_pst_mb' | 'ca_pst_sk' | 'ca_qst' | 'cd_nif' | 'ch_uid' | 'ch_vat' | 'cl_tin' | 'cm_niu' | 'cn_tin' | 'co_nit' | 'cr_tin' | 'cv_nif' | 'de_stn' | 'do_rcn' | 'ec_ruc' | 'eg_tin' | 'es_cif' | 'et_tin' | 'eu_oss_vat' | 'eu_vat' | 'gb_vat' | 'ge_vat' | 'gn_nif' | 'hk_br' | 'hr_oib' | 'hu_tin' | 'id_npwp' | 'il_vat' | 'in_gst' | 'is_vat' | 'jp_cn' | 'jp_rn' | 'jp_trn' | 'ke_pin' | 'kg_tin' | 'kh_tin' | 'kr_brn' | 'kz_bin' | 'la_tin' | 'li_uid' | 'li_vat' | 'ma_vat' | 'md_vat' | 'me_pib' | 'mk_vat' | 'mr_nif' | 'mx_rfc' | 'my_frp' | 'my_itn' | 'my_sst' | 'ng_tin' | 'no_vat' | 'no_voec' | 'np_pan' | 'nz_gst' | 'om_vat' | 'pe_ruc' | 'ph_tin' | 'ro_tin' | 'rs_pib' | 'ru_inn' | 'ru_kpp' | 'sa_vat' | 'sg_gst' | 'sg_uen' | 'si_tin' | 'sn_ninea' | 'sr_fin' | 'sv_nit' | 'th_vat' | 'tj_tin' | 'tr_tin' | 'tw_vat' | 'tz_vat' | 'ua_vat' | 'ug_tin' | 'unknown' | 'us_ein' | 'uy_ruc' | 'uz_tin' | 'uz_vat' | 've_rif' | 'vn_tin' | 'za_vat' | 'zm_tin' | 'zw_tin';
  'value': string;
  'verification': TaxIdVerificationModel;
};

export type TaxIDsOwnerModel = {
  'account'?: string | AccountModel;
  'application'?: string | ApplicationModel;
  'customer'?: string | CustomerModel;
  'type': 'account' | 'application' | 'customer' | 'self';
};

export type SubscriptionsResourceSubscriptionInvoiceSettingsModel = {
  'account_tax_ids': Array<string | TaxIdModel | DeletedTaxIdModel>;
  'issuer': ConnectAccountReferenceModel;
};

export type ProductModel = {
  'active': boolean;
  'created': number;
  'default_price'?: string | PriceModel;
  'description': string;
  'id': string;
  'images': string[];
  'livemode': boolean;
  'marketing_features': ProductMarketingFeatureModel[];
  'metadata': {
  [key: string]: string;
};
  'name': string;
  'object': 'product';
  'package_dimensions': PackageDimensionsModel;
  'shippable': boolean;
  'statement_descriptor'?: string;
  'tax_code': string | TaxCodeModel;
  'type': 'good' | 'service';
  'unit_label'?: string;
  'updated': number;
  'url': string;
};

export type PriceModel = {
  'active': boolean;
  'billing_scheme': 'per_unit' | 'tiered';
  'created': number;
  'currency': string;
  'currency_options'?: {
  [key: string]: CurrencyOptionModel;
};
  'custom_unit_amount': CustomUnitAmountModel;
  'id': string;
  'livemode': boolean;
  'lookup_key': string;
  'metadata': {
  [key: string]: string;
};
  'nickname': string;
  'object': 'price';
  'product': string | ProductModel | DeletedProductModel;
  'recurring': RecurringModel;
  'tax_behavior': 'exclusive' | 'inclusive' | 'unspecified';
  'tiers'?: PriceTierModel[];
  'tiers_mode': 'graduated' | 'volume';
  'transform_quantity': TransformQuantityModel;
  'type': 'one_time' | 'recurring';
  'unit_amount': number;
  'unit_amount_decimal': string;
};

export type PlanModel = {
  'active': boolean;
  'amount': number;
  'amount_decimal': string;
  'billing_scheme': 'per_unit' | 'tiered';
  'created': number;
  'currency': string;
  'id': string;
  'interval': 'day' | 'month' | 'week' | 'year';
  'interval_count': number;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'meter': string;
  'nickname': string;
  'object': 'plan';
  'product': string | ProductModel | DeletedProductModel;
  'tiers'?: PlanTierModel[];
  'tiers_mode': 'graduated' | 'volume';
  'transform_usage': TransformUsageModel;
  'trial_period_days': number;
  'usage_type': 'licensed' | 'metered';
};

export type SubscriptionItemModel = {
  'billing_thresholds': SubscriptionItemBillingThresholdsModel;
  'created': number;
  'current_period_end': number;
  'current_period_start': number;
  'discounts': Array<string | DiscountModel>;
  'id': string;
  'metadata': {
  [key: string]: string;
};
  'object': 'subscription_item';
  'plan': PlanModel;
  'price': PriceModel;
  'quantity'?: number;
  'subscription': string;
  'tax_rates': TaxRateModel[];
};

export type InvoiceModel = {
  'account_country': string;
  'account_name': string;
  'account_tax_ids': Array<string | TaxIdModel | DeletedTaxIdModel>;
  'amount_due': number;
  'amount_overpaid': number;
  'amount_paid': number;
  'amount_remaining': number;
  'amount_shipping': number;
  'application': string | ApplicationModel | DeletedApplicationModel;
  'attempt_count': number;
  'attempted': boolean;
  'auto_advance'?: boolean;
  'automatic_tax': AutomaticTaxModel;
  'automatically_finalizes_at': number;
  'billing_reason': 'automatic_pending_invoice_item_invoice' | 'manual' | 'quote_accept' | 'subscription' | 'subscription_create' | 'subscription_cycle' | 'subscription_threshold' | 'subscription_update' | 'upcoming';
  'collection_method': 'charge_automatically' | 'send_invoice';
  'confirmation_secret'?: InvoicesResourceConfirmationSecretModel;
  'created': number;
  'currency': string;
  'custom_fields': InvoiceSettingCustomFieldModel[];
  'customer': string | CustomerModel | DeletedCustomerModel;
  'customer_address': AddressModel;
  'customer_email': string;
  'customer_name': string;
  'customer_phone': string;
  'customer_shipping': ShippingModel;
  'customer_tax_exempt': 'exempt' | 'none' | 'reverse';
  'customer_tax_ids'?: InvoicesResourceInvoiceTaxIdModel[];
  'default_payment_method': string | PaymentMethodModel;
  'default_source': string | PaymentSourceModel;
  'default_tax_rates': TaxRateModel[];
  'description': string;
  'discounts': Array<string | DiscountModel | DeletedDiscountModel>;
  'due_date': number;
  'effective_at': number;
  'ending_balance': number;
  'footer': string;
  'from_invoice': InvoicesResourceFromInvoiceModel;
  'hosted_invoice_url'?: string;
  'id'?: string;
  'invoice_pdf'?: string;
  'issuer': ConnectAccountReferenceModel;
  'last_finalization_error': ApiErrorsModel;
  'latest_revision': string | InvoiceModel;
  'lines': {
  'data': LineItemModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'next_payment_attempt': number;
  'number': string;
  'object': 'invoice';
  'on_behalf_of': string | AccountModel;
  'parent': BillingBillResourceInvoicingParentsInvoiceParentModel;
  'payment_settings': InvoicesPaymentSettingsModel;
  'payments'?: {
  'data': InvoicePaymentModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'period_end': number;
  'period_start': number;
  'post_payment_credit_notes_amount': number;
  'pre_payment_credit_notes_amount': number;
  'receipt_number': string;
  'rendering': InvoicesResourceInvoiceRenderingModel;
  'shipping_cost': InvoicesResourceShippingCostModel;
  'shipping_details': ShippingModel;
  'starting_balance': number;
  'statement_descriptor': string;
  'status': 'draft' | 'open' | 'paid' | 'uncollectible' | 'void';
  'status_transitions': InvoicesResourceStatusTransitionsModel;
  'subscription'?: string | SubscriptionModel;
  'subtotal': number;
  'subtotal_excluding_tax': number;
  'test_clock': string | TestHelpersTestClockModel;
  'threshold_reason'?: InvoiceThresholdReasonModel;
  'total': number;
  'total_discount_amounts': DiscountsResourceDiscountAmountModel[];
  'total_excluding_tax': number;
  'total_pretax_credit_amounts': InvoicesResourcePretaxCreditAmountModel[];
  'total_taxes': BillingBillResourceInvoicingTaxesTaxModel[];
  'webhooks_delivered_at': number;
};

export type DeletedDiscountModel = {
  'checkout_session': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'deleted': boolean;
  'id': string;
  'invoice': string;
  'invoice_item': string;
  'object': 'discount';
  'promotion_code': string | PromotionCodeModel;
  'source': DiscountSourceModel;
  'start': number;
  'subscription': string;
  'subscription_item': string;
};

export type InvoicesResourceFromInvoiceModel = {
  'action': string;
  'invoice': string | InvoiceModel;
};

export type BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoidedModel = {
  'invoice': string | InvoiceModel;
  'invoice_line_item': string;
};

export type BillingCreditGrantsResourceBalanceCreditModel = {
  'amount': BillingCreditGrantsResourceAmountModel;
  'credits_application_invoice_voided': BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoidedModel;
  'type': 'credits_application_invoice_voided' | 'credits_granted';
};

export type BillingCreditBalanceTransactionModel = {
  'created': number;
  'credit': BillingCreditGrantsResourceBalanceCreditModel;
  'credit_grant': string | BillingCreditGrantModel;
  'debit': BillingCreditGrantsResourceBalanceDebitModel;
  'effective_at': number;
  'id': string;
  'livemode': boolean;
  'object': 'billing.credit_balance_transaction';
  'test_clock': string | TestHelpersTestClockModel;
  'type': 'credit' | 'debit';
};

export type BillingCreditGrantModel = {
  'amount': BillingCreditGrantsResourceAmountModel;
  'applicability_config': BillingCreditGrantsResourceApplicabilityConfigModel;
  'category': 'paid' | 'promotional';
  'created': number;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'effective_at': number;
  'expires_at': number;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'name': string;
  'object': 'billing.credit_grant';
  'priority'?: number;
  'test_clock': string | TestHelpersTestClockModel;
  'updated': number;
  'voided_at': number;
};

export type BillingCreditGrantsResourceBalanceCreditsAppliedModel = {
  'invoice': string | InvoiceModel;
  'invoice_line_item': string;
};

export type BillingCreditGrantsResourceBalanceDebitModel = {
  'amount': BillingCreditGrantsResourceAmountModel;
  'credits_applied': BillingCreditGrantsResourceBalanceCreditsAppliedModel;
  'type': 'credits_applied' | 'credits_expired' | 'credits_voided';
};

export type InvoicesResourcePretaxCreditAmountModel = {
  'amount': number;
  'credit_balance_transaction'?: string | BillingCreditBalanceTransactionModel;
  'discount'?: string | DiscountModel | DeletedDiscountModel;
  'type': 'credit_balance_transaction' | 'discount';
};

export type LineItemModel = {
  'amount': number;
  'currency': string;
  'description': string;
  'discount_amounts': DiscountsResourceDiscountAmountModel[];
  'discountable': boolean;
  'discounts': Array<string | DiscountModel>;
  'id': string;
  'invoice': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'line_item';
  'parent': BillingBillResourceInvoicingLinesParentsInvoiceLineItemParentModel;
  'period': InvoiceLineItemPeriodModel;
  'pretax_credit_amounts': InvoicesResourcePretaxCreditAmountModel[];
  'pricing': BillingBillResourceInvoicingPricingPricingModel;
  'quantity': number;
  'subscription': string | SubscriptionModel;
  'taxes': BillingBillResourceInvoicingTaxesTaxModel[];
};

export type BillingBillResourceInvoicingParentsInvoiceSubscriptionParentModel = {
  'metadata': {
  [key: string]: string;
};
  'subscription': string | SubscriptionModel;
  'subscription_proration_date'?: number;
};

export type BillingBillResourceInvoicingParentsInvoiceParentModel = {
  'quote_details': BillingBillResourceInvoicingParentsInvoiceQuoteParentModel;
  'subscription_details': BillingBillResourceInvoicingParentsInvoiceSubscriptionParentModel;
  'type': 'quote_details' | 'subscription_details';
};

export type InvoicePaymentModel = {
  'amount_paid': number;
  'amount_requested': number;
  'created': number;
  'currency': string;
  'id': string;
  'invoice': string | InvoiceModel | DeletedInvoiceModel;
  'is_default': boolean;
  'livemode': boolean;
  'object': 'invoice_payment';
  'payment': InvoicesPaymentsInvoicePaymentAssociatedPaymentModel;
  'status': string;
  'status_transitions': InvoicesPaymentsInvoicePaymentStatusTransitionsModel;
};

export type SubscriptionScheduleModel = {
  'application': string | ApplicationModel | DeletedApplicationModel;
  'billing_mode': SubscriptionsResourceBillingModeModel;
  'canceled_at': number;
  'completed_at': number;
  'created': number;
  'current_phase': SubscriptionScheduleCurrentPhaseModel;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'default_settings': SubscriptionSchedulesResourceDefaultSettingsModel;
  'end_behavior': 'cancel' | 'none' | 'release' | 'renew';
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'subscription_schedule';
  'phases': SubscriptionSchedulePhaseConfigurationModel[];
  'released_at': number;
  'released_subscription': string;
  'status': 'active' | 'canceled' | 'completed' | 'not_started' | 'released';
  'subscription': string | SubscriptionModel;
  'test_clock': string | TestHelpersTestClockModel;
};

export type SubscriptionSchedulesResourceDefaultSettingsModel = {
  'application_fee_percent': number;
  'automatic_tax'?: SubscriptionSchedulesResourceDefaultSettingsAutomaticTaxModel;
  'billing_cycle_anchor': 'automatic' | 'phase_start';
  'billing_thresholds': SubscriptionBillingThresholdsModel;
  'collection_method': 'charge_automatically' | 'send_invoice';
  'default_payment_method': string | PaymentMethodModel;
  'description': string;
  'invoice_settings': InvoiceSettingSubscriptionScheduleSettingModel;
  'on_behalf_of': string | AccountModel;
  'transfer_data': SubscriptionTransferDataModel;
};

export type SubscriptionTransferDataModel = {
  'amount_percent': number;
  'destination': string | AccountModel;
};

export type SubscriptionSchedulePhaseConfigurationModel = {
  'add_invoice_items': SubscriptionScheduleAddInvoiceItemModel[];
  'application_fee_percent': number;
  'automatic_tax'?: SchedulesPhaseAutomaticTaxModel;
  'billing_cycle_anchor': 'automatic' | 'phase_start';
  'billing_thresholds': SubscriptionBillingThresholdsModel;
  'collection_method': 'charge_automatically' | 'send_invoice';
  'currency': string;
  'default_payment_method': string | PaymentMethodModel;
  'default_tax_rates'?: TaxRateModel[];
  'description': string;
  'discounts': DiscountsResourceStackableDiscountModel[];
  'end_date': number;
  'invoice_settings': InvoiceSettingSubscriptionSchedulePhaseSettingModel;
  'items': SubscriptionScheduleConfigurationItemModel[];
  'metadata': {
  [key: string]: string;
};
  'on_behalf_of': string | AccountModel;
  'proration_behavior': 'always_invoice' | 'create_prorations' | 'none';
  'start_date': number;
  'transfer_data': SubscriptionTransferDataModel;
  'trial_end': number;
};

export type CreditNoteModel = {
  'amount': number;
  'amount_shipping': number;
  'created': number;
  'currency': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'customer_balance_transaction': string | CustomerBalanceTransactionModel;
  'discount_amount': number;
  'discount_amounts': DiscountsResourceDiscountAmountModel[];
  'effective_at': number;
  'id': string;
  'invoice': string | InvoiceModel;
  'lines': {
  'data': CreditNoteLineItemModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'livemode': boolean;
  'memo': string;
  'metadata': {
  [key: string]: string;
};
  'number': string;
  'object': 'credit_note';
  'out_of_band_amount': number;
  'pdf': string;
  'post_payment_amount': number;
  'pre_payment_amount': number;
  'pretax_credit_amounts': CreditNotesPretaxCreditAmountModel[];
  'reason': 'duplicate' | 'fraudulent' | 'order_change' | 'product_unsatisfactory';
  'refunds': CreditNoteRefundModel[];
  'shipping_cost': InvoicesResourceShippingCostModel;
  'status': 'issued' | 'void';
  'subtotal': number;
  'subtotal_excluding_tax': number;
  'total': number;
  'total_excluding_tax': number;
  'total_taxes': BillingBillResourceInvoicingTaxesTaxModel[];
  'type': 'mixed' | 'post_payment' | 'pre_payment';
  'voided_at': number;
};

export type CustomerBalanceTransactionModel = {
  'amount': number;
  'checkout_session': string | CheckoutSessionModel;
  'created': number;
  'credit_note': string | CreditNoteModel;
  'currency': string;
  'customer': string | CustomerModel;
  'description': string;
  'ending_balance': number;
  'id': string;
  'invoice': string | InvoiceModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'customer_balance_transaction';
  'type': 'adjustment' | 'applied_to_invoice' | 'checkout_session_subscription_payment' | 'checkout_session_subscription_payment_canceled' | 'credit_note' | 'initial' | 'invoice_overpaid' | 'invoice_too_large' | 'invoice_too_small' | 'migration' | 'unapplied_from_invoice' | 'unspent_receiver_credit';
};

export type QuoteModel = {
  'amount_subtotal': number;
  'amount_total': number;
  'application': string | ApplicationModel | DeletedApplicationModel;
  'application_fee_amount': number;
  'application_fee_percent': number;
  'automatic_tax': QuotesResourceAutomaticTaxModel;
  'collection_method': 'charge_automatically' | 'send_invoice';
  'computed': QuotesResourceComputedModel;
  'created': number;
  'currency': string;
  'customer': string | CustomerModel | DeletedCustomerModel;
  'default_tax_rates'?: Array<string | TaxRateModel>;
  'description': string;
  'discounts': Array<string | DiscountModel>;
  'expires_at': number;
  'footer': string;
  'from_quote': QuotesResourceFromQuoteModel;
  'header': string;
  'id': string;
  'invoice': string | InvoiceModel | DeletedInvoiceModel;
  'invoice_settings': InvoiceSettingQuoteSettingModel;
  'line_items'?: {
  'data': ItemModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'number': string;
  'object': 'quote';
  'on_behalf_of': string | AccountModel;
  'status': 'accepted' | 'canceled' | 'draft' | 'open';
  'status_transitions': QuotesResourceStatusTransitionsModel;
  'subscription': string | SubscriptionModel;
  'subscription_data': QuotesResourceSubscriptionDataSubscriptionDataModel;
  'subscription_schedule': string | SubscriptionScheduleModel;
  'test_clock': string | TestHelpersTestClockModel;
  'total_details': QuotesResourceTotalDetailsModel;
  'transfer_data': QuotesResourceTransferDataModel;
};

export type QuotesResourceFromQuoteModel = {
  'is_revision': boolean;
  'quote': string | QuoteModel;
};

export type TreasuryCreditReversalModel = {
  'amount': number;
  'created': number;
  'currency': string;
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'network': 'ach' | 'stripe';
  'object': 'treasury.credit_reversal';
  'received_credit': string;
  'status': 'canceled' | 'posted' | 'processing';
  'status_transitions': TreasuryReceivedCreditsResourceStatusTransitionsModel;
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryTransactionsResourceFlowDetailsModel = {
  'credit_reversal'?: TreasuryCreditReversalModel;
  'debit_reversal'?: TreasuryDebitReversalModel;
  'inbound_transfer'?: TreasuryInboundTransferModel;
  'issuing_authorization'?: IssuingAuthorizationModel;
  'outbound_payment'?: TreasuryOutboundPaymentModel;
  'outbound_transfer'?: TreasuryOutboundTransferModel;
  'received_credit'?: TreasuryReceivedCreditModel;
  'received_debit'?: TreasuryReceivedDebitModel;
  'type': 'credit_reversal' | 'debit_reversal' | 'inbound_transfer' | 'issuing_authorization' | 'other' | 'outbound_payment' | 'outbound_transfer' | 'received_credit' | 'received_debit';
};

export type TreasuryTransactionModel = {
  'amount': number;
  'balance_impact': TreasuryTransactionsResourceBalanceImpactModel;
  'created': number;
  'currency': string;
  'description': string;
  'entries'?: {
  'data': TreasuryTransactionEntryModel[];
  'has_more': boolean;
  'object': 'list';
  'url': string;
};
  'financial_account': string;
  'flow': string;
  'flow_details'?: TreasuryTransactionsResourceFlowDetailsModel;
  'flow_type': 'credit_reversal' | 'debit_reversal' | 'inbound_transfer' | 'issuing_authorization' | 'other' | 'outbound_payment' | 'outbound_transfer' | 'received_credit' | 'received_debit';
  'id': string;
  'livemode': boolean;
  'object': 'treasury.transaction';
  'status': 'open' | 'posted' | 'void';
  'status_transitions': TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitionsModel;
};

export type TreasuryDebitReversalModel = {
  'amount': number;
  'created': number;
  'currency': string;
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'linked_flows': TreasuryReceivedDebitsResourceDebitReversalLinkedFlowsModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'network': 'ach' | 'card';
  'object': 'treasury.debit_reversal';
  'received_debit': string;
  'status': 'failed' | 'processing' | 'succeeded';
  'status_transitions': TreasuryReceivedDebitsResourceStatusTransitionsModel;
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryInboundTransferModel = {
  'amount': number;
  'cancelable': boolean;
  'created': number;
  'currency': string;
  'description': string;
  'failure_details': TreasuryInboundTransfersResourceFailureDetailsModel;
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'linked_flows': TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlowsModel;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'treasury.inbound_transfer';
  'origin_payment_method': string;
  'origin_payment_method_details': InboundTransfersModel;
  'returned': boolean;
  'statement_descriptor': string;
  'status': 'canceled' | 'failed' | 'processing' | 'succeeded';
  'status_transitions': TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitionsModel;
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryOutboundPaymentsResourceReturnedStatusModel = {
  'code': 'account_closed' | 'account_frozen' | 'bank_account_restricted' | 'bank_ownership_changed' | 'declined' | 'incorrect_account_holder_name' | 'invalid_account_number' | 'invalid_currency' | 'no_account' | 'other';
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryOutboundPaymentModel = {
  'amount': number;
  'cancelable': boolean;
  'created': number;
  'currency': string;
  'customer': string;
  'description': string;
  'destination_payment_method': string;
  'destination_payment_method_details': OutboundPaymentsPaymentMethodDetailsModel;
  'end_user_details': TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetailsModel;
  'expected_arrival_date': number;
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'treasury.outbound_payment';
  'returned_details': TreasuryOutboundPaymentsResourceReturnedStatusModel;
  'statement_descriptor': string;
  'status': 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  'status_transitions': TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitionsModel;
  'tracking_details': TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetailsModel;
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryOutboundTransfersResourceReturnedDetailsModel = {
  'code': 'account_closed' | 'account_frozen' | 'bank_account_restricted' | 'bank_ownership_changed' | 'declined' | 'incorrect_account_holder_name' | 'invalid_account_number' | 'invalid_currency' | 'no_account' | 'other';
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryOutboundTransferModel = {
  'amount': number;
  'cancelable': boolean;
  'created': number;
  'currency': string;
  'description': string;
  'destination_payment_method': string;
  'destination_payment_method_details': OutboundTransfersPaymentMethodDetailsModel;
  'expected_arrival_date': number;
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'livemode': boolean;
  'metadata': {
  [key: string]: string;
};
  'object': 'treasury.outbound_transfer';
  'returned_details': TreasuryOutboundTransfersResourceReturnedDetailsModel;
  'statement_descriptor': string;
  'status': 'canceled' | 'failed' | 'posted' | 'processing' | 'returned';
  'status_transitions': TreasuryOutboundTransfersResourceStatusTransitionsModel;
  'tracking_details': TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetailsModel;
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryReceivedCreditsResourceSourceFlowsDetailsModel = {
  'credit_reversal'?: TreasuryCreditReversalModel;
  'outbound_payment'?: TreasuryOutboundPaymentModel;
  'outbound_transfer'?: TreasuryOutboundTransferModel;
  'payout'?: PayoutModel;
  'type': 'credit_reversal' | 'other' | 'outbound_payment' | 'outbound_transfer' | 'payout';
};

export type TreasuryReceivedCreditsResourceLinkedFlowsModel = {
  'credit_reversal': string;
  'issuing_authorization': string;
  'issuing_transaction': string;
  'source_flow': string;
  'source_flow_details'?: TreasuryReceivedCreditsResourceSourceFlowsDetailsModel;
  'source_flow_type': string;
};

export type TreasuryReceivedCreditModel = {
  'amount': number;
  'created': number;
  'currency': string;
  'description': string;
  'failure_code': 'account_closed' | 'account_frozen' | 'international_transaction' | 'other';
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'initiating_payment_method_details': TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetailsModel;
  'linked_flows': TreasuryReceivedCreditsResourceLinkedFlowsModel;
  'livemode': boolean;
  'network': 'ach' | 'card' | 'stripe' | 'us_domestic_wire';
  'object': 'treasury.received_credit';
  'reversal_details': TreasuryReceivedCreditsResourceReversalDetailsModel;
  'status': 'failed' | 'succeeded';
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryReceivedDebitModel = {
  'amount': number;
  'created': number;
  'currency': string;
  'description': string;
  'failure_code': 'account_closed' | 'account_frozen' | 'insufficient_funds' | 'international_transaction' | 'other';
  'financial_account': string;
  'hosted_regulatory_receipt_url': string;
  'id': string;
  'initiating_payment_method_details'?: TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetailsModel;
  'linked_flows': TreasuryReceivedDebitsResourceLinkedFlowsModel;
  'livemode': boolean;
  'network': 'ach' | 'card' | 'stripe';
  'object': 'treasury.received_debit';
  'reversal_details': TreasuryReceivedDebitsResourceReversalDetailsModel;
  'status': 'failed' | 'succeeded';
  'transaction': string | TreasuryTransactionModel;
};

export type TreasuryTransactionEntryModel = {
  'balance_impact': TreasuryTransactionsResourceBalanceImpactModel;
  'created': number;
  'currency': string;
  'effective_at': number;
  'financial_account': string;
  'flow': string;
  'flow_details'?: TreasuryTransactionsResourceFlowDetailsModel;
  'flow_type': 'credit_reversal' | 'debit_reversal' | 'inbound_transfer' | 'issuing_authorization' | 'other' | 'outbound_payment' | 'outbound_transfer' | 'received_credit' | 'received_debit';
  'id': string;
  'livemode': boolean;
  'object': 'treasury.transaction_entry';
  'transaction': string | TreasuryTransactionModel;
  'type': 'credit_reversal' | 'credit_reversal_posting' | 'debit_reversal' | 'inbound_transfer' | 'inbound_transfer_return' | 'issuing_authorization_hold' | 'issuing_authorization_release' | 'other' | 'outbound_payment' | 'outbound_payment_cancellation' | 'outbound_payment_failure' | 'outbound_payment_posting' | 'outbound_payment_return' | 'outbound_transfer' | 'outbound_transfer_cancellation' | 'outbound_transfer_failure' | 'outbound_transfer_posting' | 'outbound_transfer_return' | 'received_credit' | 'received_debit';
};



export const AccountAnnualRevenue = z.object({
'amount': z.number().int(),
'currency': z.string(),
'fiscal_year_end': z.string()
});

export type AccountAnnualRevenueModel = z.infer<typeof AccountAnnualRevenue>;

export const AccountMonthlyEstimatedRevenue = z.object({
'amount': z.number().int(),
'currency': z.string()
});

export type AccountMonthlyEstimatedRevenueModel = z.infer<typeof AccountMonthlyEstimatedRevenue>;

export const Address = z.object({
'city': z.string(),
'country': z.string(),
'line1': z.string(),
'line2': z.string(),
'postal_code': z.string(),
'state': z.string()
});

export type AddressModel = z.infer<typeof Address>;

export const AccountBusinessProfile = z.object({
'annual_revenue': z.union([AccountAnnualRevenue]).optional(),
'estimated_worker_count': z.number().int().optional(),
'mcc': z.string(),
'minority_owned_business_designation': z.array(z.enum(['lgbtqi_owned_business', 'minority_owned_business', 'none_of_these_apply', 'prefer_not_to_answer', 'women_owned_business'])),
'monthly_estimated_revenue': AccountMonthlyEstimatedRevenue.optional(),
'name': z.string(),
'product_description': z.string().optional(),
'support_address': z.union([Address]),
'support_email': z.string(),
'support_phone': z.string(),
'support_url': z.string(),
'url': z.string()
});

export type AccountBusinessProfileModel = z.infer<typeof AccountBusinessProfile>;

export const AccountCapabilities = z.object({
'acss_debit_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'affirm_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'afterpay_clearpay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'alma_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'amazon_pay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'au_becs_debit_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'bacs_debit_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'bancontact_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'billie_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'blik_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'boleto_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'card_issuing': z.enum(['active', 'inactive', 'pending']).optional(),
'card_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'cartes_bancaires_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'cashapp_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'crypto_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'eps_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'fpx_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'gb_bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'giropay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'grabpay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'ideal_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'india_international_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'jcb_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'jp_bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'kakao_pay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'klarna_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'konbini_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'kr_card_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'legacy_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'link_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'mb_way_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'mobilepay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'multibanco_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'mx_bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'naver_pay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'nz_bank_account_becs_debit_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'oxxo_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'p24_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'pay_by_bank_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'payco_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'paynow_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'pix_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'promptpay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'revolut_pay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'samsung_pay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'satispay_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'sepa_bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'sepa_debit_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'sofort_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'swish_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'tax_reporting_us_1099_k': z.enum(['active', 'inactive', 'pending']).optional(),
'tax_reporting_us_1099_misc': z.enum(['active', 'inactive', 'pending']).optional(),
'transfers': z.enum(['active', 'inactive', 'pending']).optional(),
'treasury': z.enum(['active', 'inactive', 'pending']).optional(),
'twint_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'us_bank_account_ach_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'us_bank_transfer_payments': z.enum(['active', 'inactive', 'pending']).optional(),
'zip_payments': z.enum(['active', 'inactive', 'pending']).optional()
});

export type AccountCapabilitiesModel = z.infer<typeof AccountCapabilities>;

export const LegalEntityJapanAddress = z.object({
'city': z.string(),
'country': z.string(),
'line1': z.string(),
'line2': z.string(),
'postal_code': z.string(),
'state': z.string(),
'town': z.string()
});

export type LegalEntityJapanAddressModel = z.infer<typeof LegalEntityJapanAddress>;

export const LegalEntityDirectorshipDeclaration = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string()
});

export type LegalEntityDirectorshipDeclarationModel = z.infer<typeof LegalEntityDirectorshipDeclaration>;

export const LegalEntityUboDeclaration = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string()
});

export type LegalEntityUboDeclarationModel = z.infer<typeof LegalEntityUboDeclaration>;

export const LegalEntityRegistrationDate = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type LegalEntityRegistrationDateModel = z.infer<typeof LegalEntityRegistrationDate>;

export const LegalEntityRepresentativeDeclaration = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string()
});

export type LegalEntityRepresentativeDeclarationModel = z.infer<typeof LegalEntityRepresentativeDeclaration>;

export const FileLink: z.ZodType<FileLinkModel> = z.object({
'created': z.number().int(),
'expired': z.boolean(),
'expires_at': z.number().int(),
'file': z.union([z.string(), z.lazy(() => File)]),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['file_link']),
'url': z.string()
});

export const File: z.ZodType<FileModel> = z.object({
'created': z.number().int(),
'expires_at': z.number().int(),
'filename': z.string(),
'id': z.string(),
'links': z.object({
'data': z.array(z.lazy(() => FileLink)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string().regex(/^\/v1\/file_links/)
}).optional(),
'object': z.enum(['file']),
'purpose': z.enum(['account_requirement', 'additional_verification', 'business_icon', 'business_logo', 'customer_signature', 'dispute_evidence', 'document_provider_identity_document', 'finance_report_run', 'financial_account_statement', 'identity_document', 'identity_document_downloadable', 'issuing_regulatory_reporting', 'pci_document', 'platform_terms_of_service', 'selfie', 'sigma_scheduled_query', 'tax_document_user_upload', 'terminal_android_apk', 'terminal_reader_splashscreen']),
'size': z.number().int(),
'title': z.string(),
'type': z.string(),
'url': z.string()
});

export const LegalEntityCompanyVerificationDocument: z.ZodType<LegalEntityCompanyVerificationDocumentModel> = z.object({
'back': z.union([z.string(), z.lazy(() => File)]),
'details': z.string(),
'details_code': z.string(),
'front': z.union([z.string(), z.lazy(() => File)])
});

export const LegalEntityCompanyVerification: z.ZodType<LegalEntityCompanyVerificationModel> = z.object({
'document': z.lazy(() => LegalEntityCompanyVerificationDocument)
});

export const LegalEntityCompany: z.ZodType<LegalEntityCompanyModel> = z.object({
'address': Address.optional(),
'address_kana': z.union([LegalEntityJapanAddress]).optional(),
'address_kanji': z.union([LegalEntityJapanAddress]).optional(),
'directors_provided': z.boolean().optional(),
'directorship_declaration': z.union([LegalEntityDirectorshipDeclaration]).optional(),
'executives_provided': z.boolean().optional(),
'export_license_id': z.string().optional(),
'export_purpose_code': z.string().optional(),
'name': z.string().optional(),
'name_kana': z.string().optional(),
'name_kanji': z.string().optional(),
'owners_provided': z.boolean().optional(),
'ownership_declaration': z.union([LegalEntityUboDeclaration]).optional(),
'ownership_exemption_reason': z.enum(['qualified_entity_exceeds_ownership_threshold', 'qualifies_as_financial_institution']).optional(),
'phone': z.string().optional(),
'registration_date': LegalEntityRegistrationDate.optional(),
'representative_declaration': z.union([LegalEntityRepresentativeDeclaration]).optional(),
'structure': z.enum(['free_zone_establishment', 'free_zone_llc', 'government_instrumentality', 'governmental_unit', 'incorporated_non_profit', 'incorporated_partnership', 'limited_liability_partnership', 'llc', 'multi_member_llc', 'private_company', 'private_corporation', 'private_partnership', 'public_company', 'public_corporation', 'public_partnership', 'registered_charity', 'single_member_llc', 'sole_establishment', 'sole_proprietorship', 'tax_exempt_government_instrumentality', 'unincorporated_association', 'unincorporated_non_profit', 'unincorporated_partnership']).optional(),
'tax_id_provided': z.boolean().optional(),
'tax_id_registrar': z.string().optional(),
'vat_id_provided': z.boolean().optional(),
'verification': z.union([z.lazy(() => LegalEntityCompanyVerification)]).optional()
});

export const AccountUnificationAccountControllerFees = z.object({
'payer': z.enum(['account', 'application', 'application_custom', 'application_express'])
});

export type AccountUnificationAccountControllerFeesModel = z.infer<typeof AccountUnificationAccountControllerFees>;

export const AccountUnificationAccountControllerLosses = z.object({
'payments': z.enum(['application', 'stripe'])
});

export type AccountUnificationAccountControllerLossesModel = z.infer<typeof AccountUnificationAccountControllerLosses>;

export const AccountUnificationAccountControllerStripeDashboard = z.object({
'type': z.enum(['express', 'full', 'none'])
});

export type AccountUnificationAccountControllerStripeDashboardModel = z.infer<typeof AccountUnificationAccountControllerStripeDashboard>;

export const AccountUnificationAccountController = z.object({
'fees': AccountUnificationAccountControllerFees.optional(),
'is_controller': z.boolean().optional(),
'losses': AccountUnificationAccountControllerLosses.optional(),
'requirement_collection': z.enum(['application', 'stripe']).optional(),
'stripe_dashboard': AccountUnificationAccountControllerStripeDashboard.optional(),
'type': z.enum(['account', 'application'])
});

export type AccountUnificationAccountControllerModel = z.infer<typeof AccountUnificationAccountController>;

export const CustomerBalanceCustomerBalanceSettings = z.object({
'reconciliation_mode': z.enum(['automatic', 'manual']),
'using_merchant_default': z.boolean()
});

export type CustomerBalanceCustomerBalanceSettingsModel = z.infer<typeof CustomerBalanceCustomerBalanceSettings>;

export const CashBalance = z.object({
'available': z.record(z.string(), z.number().int()),
'customer': z.string(),
'livemode': z.boolean(),
'object': z.enum(['cash_balance']),
'settings': CustomerBalanceCustomerBalanceSettings
});

export type CashBalanceModel = z.infer<typeof CashBalance>;

export const DeletedCustomer = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['customer'])
});

export type DeletedCustomerModel = z.infer<typeof DeletedCustomer>;

export const TokenCardNetworks = z.object({
'preferred': z.string()
});

export type TokenCardNetworksModel = z.infer<typeof TokenCardNetworks>;

export const Card: z.ZodType<CardModel> = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]).optional(),
'address_city': z.string(),
'address_country': z.string(),
'address_line1': z.string(),
'address_line1_check': z.string(),
'address_line2': z.string(),
'address_state': z.string(),
'address_zip': z.string(),
'address_zip_check': z.string(),
'allow_redisplay': z.enum(['always', 'limited', 'unspecified']).optional(),
'available_payout_methods': z.array(z.enum(['instant', 'standard'])).optional(),
'brand': z.string(),
'country': z.string(),
'currency': z.string().optional(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]).optional(),
'cvc_check': z.string(),
'default_for_currency': z.boolean().optional(),
'description': z.string().optional(),
'dynamic_last4': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string().optional(),
'funding': z.string(),
'id': z.string(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'networks': TokenCardNetworks.optional(),
'object': z.enum(['card']),
'regulated_status': z.enum(['regulated', 'unregulated']),
'status': z.string().optional(),
'tokenization_method': z.string()
});

export const SourceTypeAchCreditTransfer = z.object({
'account_number': z.string().optional(),
'bank_name': z.string().optional(),
'fingerprint': z.string().optional(),
'refund_account_holder_name': z.string().optional(),
'refund_account_holder_type': z.string().optional(),
'refund_routing_number': z.string().optional(),
'routing_number': z.string().optional(),
'swift_code': z.string().optional()
});

export type SourceTypeAchCreditTransferModel = z.infer<typeof SourceTypeAchCreditTransfer>;

export const SourceTypeAchDebit = z.object({
'bank_name': z.string().optional(),
'country': z.string().optional(),
'fingerprint': z.string().optional(),
'last4': z.string().optional(),
'routing_number': z.string().optional(),
'type': z.string().optional()
});

export type SourceTypeAchDebitModel = z.infer<typeof SourceTypeAchDebit>;

export const SourceTypeAcssDebit = z.object({
'bank_address_city': z.string().optional(),
'bank_address_line_1': z.string().optional(),
'bank_address_line_2': z.string().optional(),
'bank_address_postal_code': z.string().optional(),
'bank_name': z.string().optional(),
'category': z.string().optional(),
'country': z.string().optional(),
'fingerprint': z.string().optional(),
'last4': z.string().optional(),
'routing_number': z.string().optional()
});

export type SourceTypeAcssDebitModel = z.infer<typeof SourceTypeAcssDebit>;

export const SourceTypeAlipay = z.object({
'data_string': z.string().optional(),
'native_url': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeAlipayModel = z.infer<typeof SourceTypeAlipay>;

export const SourceTypeAuBecsDebit = z.object({
'bsb_number': z.string().optional(),
'fingerprint': z.string().optional(),
'last4': z.string().optional()
});

export type SourceTypeAuBecsDebitModel = z.infer<typeof SourceTypeAuBecsDebit>;

export const SourceTypeBancontact = z.object({
'bank_code': z.string().optional(),
'bank_name': z.string().optional(),
'bic': z.string().optional(),
'iban_last4': z.string().optional(),
'preferred_language': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeBancontactModel = z.infer<typeof SourceTypeBancontact>;

export const SourceTypeCard = z.object({
'address_line1_check': z.string().optional(),
'address_zip_check': z.string().optional(),
'brand': z.string().optional(),
'country': z.string().optional(),
'cvc_check': z.string().optional(),
'description': z.string().optional(),
'dynamic_last4': z.string().optional(),
'exp_month': z.number().int().optional(),
'exp_year': z.number().int().optional(),
'fingerprint': z.string().optional(),
'funding': z.string().optional(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string().optional(),
'name': z.string().optional(),
'three_d_secure': z.string().optional(),
'tokenization_method': z.string().optional()
});

export type SourceTypeCardModel = z.infer<typeof SourceTypeCard>;

export const SourceTypeCardPresent = z.object({
'application_cryptogram': z.string().optional(),
'application_preferred_name': z.string().optional(),
'authorization_code': z.string().optional(),
'authorization_response_code': z.string().optional(),
'brand': z.string().optional(),
'country': z.string().optional(),
'cvm_type': z.string().optional(),
'data_type': z.string().optional(),
'dedicated_file_name': z.string().optional(),
'description': z.string().optional(),
'emv_auth_data': z.string().optional(),
'evidence_customer_signature': z.string().optional(),
'evidence_transaction_certificate': z.string().optional(),
'exp_month': z.number().int().optional(),
'exp_year': z.number().int().optional(),
'fingerprint': z.string().optional(),
'funding': z.string().optional(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string().optional(),
'pos_device_id': z.string().optional(),
'pos_entry_mode': z.string().optional(),
'read_method': z.string().optional(),
'reader': z.string().optional(),
'terminal_verification_results': z.string().optional(),
'transaction_status_information': z.string().optional()
});

export type SourceTypeCardPresentModel = z.infer<typeof SourceTypeCardPresent>;

export const SourceCodeVerificationFlow = z.object({
'attempts_remaining': z.number().int(),
'status': z.string()
});

export type SourceCodeVerificationFlowModel = z.infer<typeof SourceCodeVerificationFlow>;

export const SourceTypeEps = z.object({
'reference': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeEpsModel = z.infer<typeof SourceTypeEps>;

export const SourceTypeGiropay = z.object({
'bank_code': z.string().optional(),
'bank_name': z.string().optional(),
'bic': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeGiropayModel = z.infer<typeof SourceTypeGiropay>;

export const SourceTypeIdeal = z.object({
'bank': z.string().optional(),
'bic': z.string().optional(),
'iban_last4': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeIdealModel = z.infer<typeof SourceTypeIdeal>;

export const SourceTypeKlarna = z.object({
'background_image_url': z.string().optional(),
'client_token': z.string().optional(),
'first_name': z.string().optional(),
'last_name': z.string().optional(),
'locale': z.string().optional(),
'logo_url': z.string().optional(),
'page_title': z.string().optional(),
'pay_later_asset_urls_descriptive': z.string().optional(),
'pay_later_asset_urls_standard': z.string().optional(),
'pay_later_name': z.string().optional(),
'pay_later_redirect_url': z.string().optional(),
'pay_now_asset_urls_descriptive': z.string().optional(),
'pay_now_asset_urls_standard': z.string().optional(),
'pay_now_name': z.string().optional(),
'pay_now_redirect_url': z.string().optional(),
'pay_over_time_asset_urls_descriptive': z.string().optional(),
'pay_over_time_asset_urls_standard': z.string().optional(),
'pay_over_time_name': z.string().optional(),
'pay_over_time_redirect_url': z.string().optional(),
'payment_method_categories': z.string().optional(),
'purchase_country': z.string().optional(),
'purchase_type': z.string().optional(),
'redirect_url': z.string().optional(),
'shipping_delay': z.number().int().optional(),
'shipping_first_name': z.string().optional(),
'shipping_last_name': z.string().optional()
});

export type SourceTypeKlarnaModel = z.infer<typeof SourceTypeKlarna>;

export const SourceTypeMultibanco = z.object({
'entity': z.string().optional(),
'reference': z.string().optional(),
'refund_account_holder_address_city': z.string().optional(),
'refund_account_holder_address_country': z.string().optional(),
'refund_account_holder_address_line1': z.string().optional(),
'refund_account_holder_address_line2': z.string().optional(),
'refund_account_holder_address_postal_code': z.string().optional(),
'refund_account_holder_address_state': z.string().optional(),
'refund_account_holder_name': z.string().optional(),
'refund_iban': z.string().optional()
});

export type SourceTypeMultibancoModel = z.infer<typeof SourceTypeMultibanco>;

export const SourceOwner = z.object({
'address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'phone': z.string(),
'verified_address': z.union([Address]),
'verified_email': z.string(),
'verified_name': z.string(),
'verified_phone': z.string()
});

export type SourceOwnerModel = z.infer<typeof SourceOwner>;

export const SourceTypeP24 = z.object({
'reference': z.string().optional()
});

export type SourceTypeP24Model = z.infer<typeof SourceTypeP24>;

export const SourceReceiverFlow = z.object({
'address': z.string(),
'amount_charged': z.number().int(),
'amount_received': z.number().int(),
'amount_returned': z.number().int(),
'refund_attributes_method': z.string(),
'refund_attributes_status': z.string()
});

export type SourceReceiverFlowModel = z.infer<typeof SourceReceiverFlow>;

export const SourceRedirectFlow = z.object({
'failure_reason': z.string(),
'return_url': z.string(),
'status': z.string(),
'url': z.string()
});

export type SourceRedirectFlowModel = z.infer<typeof SourceRedirectFlow>;

export const SourceTypeSepaCreditTransfer = z.object({
'bank_name': z.string().optional(),
'bic': z.string().optional(),
'iban': z.string().optional(),
'refund_account_holder_address_city': z.string().optional(),
'refund_account_holder_address_country': z.string().optional(),
'refund_account_holder_address_line1': z.string().optional(),
'refund_account_holder_address_line2': z.string().optional(),
'refund_account_holder_address_postal_code': z.string().optional(),
'refund_account_holder_address_state': z.string().optional(),
'refund_account_holder_name': z.string().optional(),
'refund_iban': z.string().optional()
});

export type SourceTypeSepaCreditTransferModel = z.infer<typeof SourceTypeSepaCreditTransfer>;

export const SourceTypeSepaDebit = z.object({
'bank_code': z.string().optional(),
'branch_code': z.string().optional(),
'country': z.string().optional(),
'fingerprint': z.string().optional(),
'last4': z.string().optional(),
'mandate_reference': z.string().optional(),
'mandate_url': z.string().optional()
});

export type SourceTypeSepaDebitModel = z.infer<typeof SourceTypeSepaDebit>;

export const SourceTypeSofort = z.object({
'bank_code': z.string().optional(),
'bank_name': z.string().optional(),
'bic': z.string().optional(),
'country': z.string().optional(),
'iban_last4': z.string().optional(),
'preferred_language': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeSofortModel = z.infer<typeof SourceTypeSofort>;

export const SourceOrderItem = z.object({
'amount': z.number().int(),
'currency': z.string(),
'description': z.string(),
'parent': z.string(),
'quantity': z.number().int().optional(),
'type': z.string()
});

export type SourceOrderItemModel = z.infer<typeof SourceOrderItem>;

export const Shipping = z.object({
'address': Address.optional(),
'carrier': z.string().optional(),
'name': z.string().optional(),
'phone': z.string().optional(),
'tracking_number': z.string().optional()
});

export type ShippingModel = z.infer<typeof Shipping>;

export const SourceOrder = z.object({
'amount': z.number().int(),
'currency': z.string(),
'email': z.string().optional(),
'items': z.array(SourceOrderItem),
'shipping': Shipping.optional()
});

export type SourceOrderModel = z.infer<typeof SourceOrder>;

export const SourceTypeThreeDSecure = z.object({
'address_line1_check': z.string().optional(),
'address_zip_check': z.string().optional(),
'authenticated': z.boolean().optional(),
'brand': z.string().optional(),
'card': z.string().optional(),
'country': z.string().optional(),
'customer': z.string().optional(),
'cvc_check': z.string().optional(),
'description': z.string().optional(),
'dynamic_last4': z.string().optional(),
'exp_month': z.number().int().optional(),
'exp_year': z.number().int().optional(),
'fingerprint': z.string().optional(),
'funding': z.string().optional(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string().optional(),
'name': z.string().optional(),
'three_d_secure': z.string().optional(),
'tokenization_method': z.string().optional()
});

export type SourceTypeThreeDSecureModel = z.infer<typeof SourceTypeThreeDSecure>;

export const SourceTypeWechat = z.object({
'prepay_id': z.string().optional(),
'qr_code_url': z.string().optional(),
'statement_descriptor': z.string().optional()
});

export type SourceTypeWechatModel = z.infer<typeof SourceTypeWechat>;

export const Source = z.object({
'ach_credit_transfer': SourceTypeAchCreditTransfer.optional(),
'ach_debit': SourceTypeAchDebit.optional(),
'acss_debit': SourceTypeAcssDebit.optional(),
'alipay': SourceTypeAlipay.optional(),
'allow_redisplay': z.enum(['always', 'limited', 'unspecified']),
'amount': z.number().int(),
'au_becs_debit': SourceTypeAuBecsDebit.optional(),
'bancontact': SourceTypeBancontact.optional(),
'card': SourceTypeCard.optional(),
'card_present': SourceTypeCardPresent.optional(),
'client_secret': z.string(),
'code_verification': SourceCodeVerificationFlow.optional(),
'created': z.number().int(),
'currency': z.string(),
'customer': z.string().optional(),
'eps': SourceTypeEps.optional(),
'flow': z.string(),
'giropay': SourceTypeGiropay.optional(),
'id': z.string(),
'ideal': SourceTypeIdeal.optional(),
'klarna': SourceTypeKlarna.optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'multibanco': SourceTypeMultibanco.optional(),
'object': z.enum(['source']),
'owner': z.union([SourceOwner]),
'p24': SourceTypeP24.optional(),
'receiver': SourceReceiverFlow.optional(),
'redirect': SourceRedirectFlow.optional(),
'sepa_credit_transfer': SourceTypeSepaCreditTransfer.optional(),
'sepa_debit': SourceTypeSepaDebit.optional(),
'sofort': SourceTypeSofort.optional(),
'source_order': SourceOrder.optional(),
'statement_descriptor': z.string(),
'status': z.string(),
'three_d_secure': SourceTypeThreeDSecure.optional(),
'type': z.enum(['ach_credit_transfer', 'ach_debit', 'acss_debit', 'alipay', 'au_becs_debit', 'bancontact', 'card', 'card_present', 'eps', 'giropay', 'ideal', 'klarna', 'multibanco', 'p24', 'sepa_credit_transfer', 'sepa_debit', 'sofort', 'three_d_secure', 'wechat']),
'usage': z.string(),
'wechat': SourceTypeWechat.optional()
});

export type SourceModel = z.infer<typeof Source>;

export const PaymentSource: z.ZodType<PaymentSourceModel> = z.union([z.lazy(() => Account), z.lazy(() => BankAccount), z.lazy(() => Card), Source]);

export const CouponAppliesTo = z.object({
'products': z.array(z.string())
});

export type CouponAppliesToModel = z.infer<typeof CouponAppliesTo>;

export const CouponCurrencyOption = z.object({
'amount_off': z.number().int()
});

export type CouponCurrencyOptionModel = z.infer<typeof CouponCurrencyOption>;

export const Coupon = z.object({
'amount_off': z.number().int(),
'applies_to': CouponAppliesTo.optional(),
'created': z.number().int(),
'currency': z.string(),
'currency_options': z.record(z.string(), CouponCurrencyOption).optional(),
'duration': z.enum(['forever', 'once', 'repeating']),
'duration_in_months': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'max_redemptions': z.number().int(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['coupon']),
'percent_off': z.number(),
'redeem_by': z.number().int(),
'times_redeemed': z.number().int(),
'valid': z.boolean()
});

export type CouponModel = z.infer<typeof Coupon>;

export const PromotionCodesResourcePromotion = z.object({
'coupon': z.union([z.string(), Coupon]),
'type': z.enum(['coupon'])
});

export type PromotionCodesResourcePromotionModel = z.infer<typeof PromotionCodesResourcePromotion>;

export const PromotionCodeCurrencyOption = z.object({
'minimum_amount': z.number().int()
});

export type PromotionCodeCurrencyOptionModel = z.infer<typeof PromotionCodeCurrencyOption>;

export const PromotionCodesResourceRestrictions = z.object({
'currency_options': z.record(z.string(), PromotionCodeCurrencyOption).optional(),
'first_time_transaction': z.boolean(),
'minimum_amount': z.number().int(),
'minimum_amount_currency': z.string()
});

export type PromotionCodesResourceRestrictionsModel = z.infer<typeof PromotionCodesResourceRestrictions>;

export const PromotionCode: z.ZodType<PromotionCodeModel> = z.object({
'active': z.boolean(),
'code': z.string(),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'expires_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'max_redemptions': z.number().int(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['promotion_code']),
'promotion': PromotionCodesResourcePromotion,
'restrictions': PromotionCodesResourceRestrictions,
'times_redeemed': z.number().int()
});

export const DiscountSource = z.object({
'coupon': z.union([z.string(), Coupon]),
'type': z.enum(['coupon'])
});

export type DiscountSourceModel = z.infer<typeof DiscountSource>;

export const Discount: z.ZodType<DiscountModel> = z.object({
'checkout_session': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'end': z.number().int(),
'id': z.string(),
'invoice': z.string(),
'invoice_item': z.string(),
'object': z.enum(['discount']),
'promotion_code': z.union([z.string(), z.lazy(() => PromotionCode)]),
'source': DiscountSource,
'start': z.number().int(),
'subscription': z.string(),
'subscription_item': z.string()
});

export const InvoiceSettingCustomField = z.object({
'name': z.string(),
'value': z.string()
});

export type InvoiceSettingCustomFieldModel = z.infer<typeof InvoiceSettingCustomField>;

export const PaymentMethodAcssDebit = z.object({
'bank_name': z.string(),
'fingerprint': z.string(),
'institution_number': z.string(),
'last4': z.string(),
'transit_number': z.string()
});

export type PaymentMethodAcssDebitModel = z.infer<typeof PaymentMethodAcssDebit>;

export const PaymentMethodAffirm = z.object({

});

export type PaymentMethodAffirmModel = z.infer<typeof PaymentMethodAffirm>;

export const PaymentMethodAfterpayClearpay = z.object({

});

export type PaymentMethodAfterpayClearpayModel = z.infer<typeof PaymentMethodAfterpayClearpay>;

export const PaymentFlowsPrivatePaymentMethodsAlipay = z.object({

});

export type PaymentFlowsPrivatePaymentMethodsAlipayModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsAlipay>;

export const PaymentMethodAlma = z.object({

});

export type PaymentMethodAlmaModel = z.infer<typeof PaymentMethodAlma>;

export const PaymentMethodAmazonPay = z.object({

});

export type PaymentMethodAmazonPayModel = z.infer<typeof PaymentMethodAmazonPay>;

export const PaymentMethodAuBecsDebit = z.object({
'bsb_number': z.string(),
'fingerprint': z.string(),
'last4': z.string()
});

export type PaymentMethodAuBecsDebitModel = z.infer<typeof PaymentMethodAuBecsDebit>;

export const PaymentMethodBacsDebit = z.object({
'fingerprint': z.string(),
'last4': z.string(),
'sort_code': z.string()
});

export type PaymentMethodBacsDebitModel = z.infer<typeof PaymentMethodBacsDebit>;

export const PaymentMethodBancontact = z.object({

});

export type PaymentMethodBancontactModel = z.infer<typeof PaymentMethodBancontact>;

export const PaymentMethodBillie = z.object({

});

export type PaymentMethodBillieModel = z.infer<typeof PaymentMethodBillie>;

export const BillingDetails = z.object({
'address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'phone': z.string(),
'tax_id': z.string()
});

export type BillingDetailsModel = z.infer<typeof BillingDetails>;

export const PaymentMethodBlik = z.object({

});

export type PaymentMethodBlikModel = z.infer<typeof PaymentMethodBlik>;

export const PaymentMethodBoleto = z.object({
'tax_id': z.string()
});

export type PaymentMethodBoletoModel = z.infer<typeof PaymentMethodBoleto>;

export const PaymentMethodCardChecks = z.object({
'address_line1_check': z.string(),
'address_postal_code_check': z.string(),
'cvc_check': z.string()
});

export type PaymentMethodCardChecksModel = z.infer<typeof PaymentMethodCardChecks>;

export const PaymentMethodDetailsCardPresentOffline = z.object({
'stored_at': z.number().int(),
'type': z.enum(['deferred'])
});

export type PaymentMethodDetailsCardPresentOfflineModel = z.infer<typeof PaymentMethodDetailsCardPresentOffline>;

export const PaymentMethodDetailsCardPresentReceipt = z.object({
'account_type': z.enum(['checking', 'credit', 'prepaid', 'unknown']).optional(),
'application_cryptogram': z.string(),
'application_preferred_name': z.string(),
'authorization_code': z.string(),
'authorization_response_code': z.string(),
'cardholder_verification_method': z.string(),
'dedicated_file_name': z.string(),
'terminal_verification_results': z.string(),
'transaction_status_information': z.string()
});

export type PaymentMethodDetailsCardPresentReceiptModel = z.infer<typeof PaymentMethodDetailsCardPresentReceipt>;

export const PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet = z.object({
'type': z.enum(['apple_pay', 'google_pay', 'samsung_pay', 'unknown'])
});

export type PaymentFlowsPrivatePaymentMethodsCardPresentCommonWalletModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet>;

export const PaymentMethodDetailsCardPresent = z.object({
'amount_authorized': z.number().int(),
'brand': z.string(),
'brand_product': z.string(),
'capture_before': z.number().int().optional(),
'cardholder_name': z.string(),
'country': z.string(),
'description': z.string().optional(),
'emv_auth_data': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string(),
'funding': z.string(),
'generated_card': z.string(),
'iin': z.string().optional(),
'incremental_authorization_supported': z.boolean(),
'issuer': z.string().optional(),
'last4': z.string(),
'network': z.string(),
'network_transaction_id': z.string(),
'offline': z.union([PaymentMethodDetailsCardPresentOffline]),
'overcapture_supported': z.boolean(),
'preferred_locales': z.array(z.string()),
'read_method': z.enum(['contact_emv', 'contactless_emv', 'contactless_magstripe_mode', 'magnetic_stripe_fallback', 'magnetic_stripe_track2']),
'receipt': z.union([PaymentMethodDetailsCardPresentReceipt]),
'wallet': PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet.optional()
});

export type PaymentMethodDetailsCardPresentModel = z.infer<typeof PaymentMethodDetailsCardPresent>;

export const CardGeneratedFromPaymentMethodDetails = z.object({
'card_present': PaymentMethodDetailsCardPresent.optional(),
'type': z.string()
});

export type CardGeneratedFromPaymentMethodDetailsModel = z.infer<typeof CardGeneratedFromPaymentMethodDetails>;

export const Application = z.object({
'id': z.string(),
'name': z.string(),
'object': z.enum(['application'])
});

export type ApplicationModel = z.infer<typeof Application>;

export const SetupAttemptPaymentMethodDetailsAcssDebit = z.object({

});

export type SetupAttemptPaymentMethodDetailsAcssDebitModel = z.infer<typeof SetupAttemptPaymentMethodDetailsAcssDebit>;

export const SetupAttemptPaymentMethodDetailsAmazonPay = z.object({

});

export type SetupAttemptPaymentMethodDetailsAmazonPayModel = z.infer<typeof SetupAttemptPaymentMethodDetailsAmazonPay>;

export const SetupAttemptPaymentMethodDetailsAuBecsDebit = z.object({

});

export type SetupAttemptPaymentMethodDetailsAuBecsDebitModel = z.infer<typeof SetupAttemptPaymentMethodDetailsAuBecsDebit>;

export const SetupAttemptPaymentMethodDetailsBacsDebit = z.object({

});

export type SetupAttemptPaymentMethodDetailsBacsDebitModel = z.infer<typeof SetupAttemptPaymentMethodDetailsBacsDebit>;

export const OfflineAcceptance = z.object({

});

export type OfflineAcceptanceModel = z.infer<typeof OfflineAcceptance>;

export const OnlineAcceptance = z.object({
'ip_address': z.string(),
'user_agent': z.string()
});

export type OnlineAcceptanceModel = z.infer<typeof OnlineAcceptance>;

export const CustomerAcceptance = z.object({
'accepted_at': z.number().int(),
'offline': OfflineAcceptance.optional(),
'online': OnlineAcceptance.optional(),
'type': z.enum(['offline', 'online'])
});

export type CustomerAcceptanceModel = z.infer<typeof CustomerAcceptance>;

export const MandateMultiUse = z.object({

});

export type MandateMultiUseModel = z.infer<typeof MandateMultiUse>;

export const MandateAcssDebit = z.object({
'default_for': z.array(z.enum(['invoice', 'subscription'])).optional(),
'interval_description': z.string(),
'payment_schedule': z.enum(['combined', 'interval', 'sporadic']),
'transaction_type': z.enum(['business', 'personal'])
});

export type MandateAcssDebitModel = z.infer<typeof MandateAcssDebit>;

export const MandateAmazonPay = z.object({

});

export type MandateAmazonPayModel = z.infer<typeof MandateAmazonPay>;

export const MandateAuBecsDebit = z.object({
'url': z.string()
});

export type MandateAuBecsDebitModel = z.infer<typeof MandateAuBecsDebit>;

export const MandateBacsDebit = z.object({
'network_status': z.enum(['accepted', 'pending', 'refused', 'revoked']),
'reference': z.string(),
'revocation_reason': z.enum(['account_closed', 'bank_account_restricted', 'bank_ownership_changed', 'could_not_process', 'debit_not_authorized']),
'url': z.string()
});

export type MandateBacsDebitModel = z.infer<typeof MandateBacsDebit>;

export const CardMandatePaymentMethodDetails = z.object({

});

export type CardMandatePaymentMethodDetailsModel = z.infer<typeof CardMandatePaymentMethodDetails>;

export const MandateCashapp = z.object({

});

export type MandateCashappModel = z.infer<typeof MandateCashapp>;

export const MandateKakaoPay = z.object({

});

export type MandateKakaoPayModel = z.infer<typeof MandateKakaoPay>;

export const MandateKlarna = z.object({

});

export type MandateKlarnaModel = z.infer<typeof MandateKlarna>;

export const MandateKrCard = z.object({

});

export type MandateKrCardModel = z.infer<typeof MandateKrCard>;

export const MandateLink = z.object({

});

export type MandateLinkModel = z.infer<typeof MandateLink>;

export const MandateNaverPay = z.object({

});

export type MandateNaverPayModel = z.infer<typeof MandateNaverPay>;

export const MandateNzBankAccount = z.object({

});

export type MandateNzBankAccountModel = z.infer<typeof MandateNzBankAccount>;

export const MandatePaypal = z.object({
'billing_agreement_id': z.string(),
'payer_id': z.string()
});

export type MandatePaypalModel = z.infer<typeof MandatePaypal>;

export const MandateRevolutPay = z.object({

});

export type MandateRevolutPayModel = z.infer<typeof MandateRevolutPay>;

export const MandateSepaDebit = z.object({
'reference': z.string(),
'url': z.string()
});

export type MandateSepaDebitModel = z.infer<typeof MandateSepaDebit>;

export const MandateUsBankAccount = z.object({
'collection_method': z.enum(['paper']).optional()
});

export type MandateUsBankAccountModel = z.infer<typeof MandateUsBankAccount>;

export const MandatePaymentMethodDetails = z.object({
'acss_debit': MandateAcssDebit.optional(),
'amazon_pay': MandateAmazonPay.optional(),
'au_becs_debit': MandateAuBecsDebit.optional(),
'bacs_debit': MandateBacsDebit.optional(),
'card': CardMandatePaymentMethodDetails.optional(),
'cashapp': MandateCashapp.optional(),
'kakao_pay': MandateKakaoPay.optional(),
'klarna': MandateKlarna.optional(),
'kr_card': MandateKrCard.optional(),
'link': MandateLink.optional(),
'naver_pay': MandateNaverPay.optional(),
'nz_bank_account': MandateNzBankAccount.optional(),
'paypal': MandatePaypal.optional(),
'revolut_pay': MandateRevolutPay.optional(),
'sepa_debit': MandateSepaDebit.optional(),
'type': z.string(),
'us_bank_account': MandateUsBankAccount.optional()
});

export type MandatePaymentMethodDetailsModel = z.infer<typeof MandatePaymentMethodDetails>;

export const MandateSingleUse = z.object({
'amount': z.number().int(),
'currency': z.string()
});

export type MandateSingleUseModel = z.infer<typeof MandateSingleUse>;

export const Mandate: z.ZodType<MandateModel> = z.object({
'customer_acceptance': CustomerAcceptance,
'id': z.string(),
'livemode': z.boolean(),
'multi_use': MandateMultiUse.optional(),
'object': z.enum(['mandate']),
'on_behalf_of': z.string().optional(),
'payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'payment_method_details': MandatePaymentMethodDetails,
'single_use': MandateSingleUse.optional(),
'status': z.enum(['active', 'inactive', 'pending']),
'type': z.enum(['multi_use', 'single_use'])
});

export const SetupAttemptPaymentMethodDetailsBancontact: z.ZodType<SetupAttemptPaymentMethodDetailsBancontactModel> = z.object({
'bank_code': z.string(),
'bank_name': z.string(),
'bic': z.string(),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'preferred_language': z.enum(['de', 'en', 'fr', 'nl']),
'verified_name': z.string()
});

export const SetupAttemptPaymentMethodDetailsBoleto = z.object({

});

export type SetupAttemptPaymentMethodDetailsBoletoModel = z.infer<typeof SetupAttemptPaymentMethodDetailsBoleto>;

export const SetupAttemptPaymentMethodDetailsCardChecks = z.object({
'address_line1_check': z.string(),
'address_postal_code_check': z.string(),
'cvc_check': z.string()
});

export type SetupAttemptPaymentMethodDetailsCardChecksModel = z.infer<typeof SetupAttemptPaymentMethodDetailsCardChecks>;

export const ThreeDSecureDetails = z.object({
'authentication_flow': z.enum(['challenge', 'frictionless']),
'electronic_commerce_indicator': z.enum(['01', '02', '05', '06', '07']),
'result': z.enum(['attempt_acknowledged', 'authenticated', 'exempted', 'failed', 'not_supported', 'processing_error']),
'result_reason': z.enum(['abandoned', 'bypassed', 'canceled', 'card_not_enrolled', 'network_not_supported', 'protocol_error', 'rejected']),
'transaction_id': z.string(),
'version': z.enum(['1.0.2', '2.1.0', '2.2.0'])
});

export type ThreeDSecureDetailsModel = z.infer<typeof ThreeDSecureDetails>;

export const PaymentMethodDetailsCardWalletApplePay = z.object({

});

export type PaymentMethodDetailsCardWalletApplePayModel = z.infer<typeof PaymentMethodDetailsCardWalletApplePay>;

export const PaymentMethodDetailsCardWalletGooglePay = z.object({

});

export type PaymentMethodDetailsCardWalletGooglePayModel = z.infer<typeof PaymentMethodDetailsCardWalletGooglePay>;

export const SetupAttemptPaymentMethodDetailsCardWallet = z.object({
'apple_pay': PaymentMethodDetailsCardWalletApplePay.optional(),
'google_pay': PaymentMethodDetailsCardWalletGooglePay.optional(),
'type': z.enum(['apple_pay', 'google_pay', 'link'])
});

export type SetupAttemptPaymentMethodDetailsCardWalletModel = z.infer<typeof SetupAttemptPaymentMethodDetailsCardWallet>;

export const SetupAttemptPaymentMethodDetailsCard = z.object({
'brand': z.string(),
'checks': z.union([SetupAttemptPaymentMethodDetailsCardChecks]),
'country': z.string(),
'description': z.string().optional(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string().optional(),
'funding': z.string(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'network': z.string(),
'three_d_secure': z.union([ThreeDSecureDetails]),
'wallet': z.union([SetupAttemptPaymentMethodDetailsCardWallet])
});

export type SetupAttemptPaymentMethodDetailsCardModel = z.infer<typeof SetupAttemptPaymentMethodDetailsCard>;

export const SetupAttemptPaymentMethodDetailsCardPresent: z.ZodType<SetupAttemptPaymentMethodDetailsCardPresentModel> = z.object({
'generated_card': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'offline': z.union([PaymentMethodDetailsCardPresentOffline])
});

export const SetupAttemptPaymentMethodDetailsCashapp = z.object({

});

export type SetupAttemptPaymentMethodDetailsCashappModel = z.infer<typeof SetupAttemptPaymentMethodDetailsCashapp>;

export const SetupAttemptPaymentMethodDetailsIdeal: z.ZodType<SetupAttemptPaymentMethodDetailsIdealModel> = z.object({
'bank': z.enum(['abn_amro', 'asn_bank', 'bunq', 'buut', 'finom', 'handelsbanken', 'ing', 'knab', 'moneyou', 'n26', 'nn', 'rabobank', 'regiobank', 'revolut', 'sns_bank', 'triodos_bank', 'van_lanschot', 'yoursafe']),
'bic': z.enum(['ABNANL2A', 'ASNBNL21', 'BITSNL2A', 'BUNQNL2A', 'BUUTNL2A', 'FNOMNL22', 'FVLBNL22', 'HANDNL2A', 'INGBNL2A', 'KNABNL2H', 'MOYONL21', 'NNBANL2G', 'NTSBDEB1', 'RABONL2U', 'RBRBNL21', 'REVOIE23', 'REVOLT21', 'SNSBNL2A', 'TRIONL2U']),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'verified_name': z.string()
});

export const SetupAttemptPaymentMethodDetailsKakaoPay = z.object({

});

export type SetupAttemptPaymentMethodDetailsKakaoPayModel = z.infer<typeof SetupAttemptPaymentMethodDetailsKakaoPay>;

export const SetupAttemptPaymentMethodDetailsKlarna = z.object({

});

export type SetupAttemptPaymentMethodDetailsKlarnaModel = z.infer<typeof SetupAttemptPaymentMethodDetailsKlarna>;

export const SetupAttemptPaymentMethodDetailsKrCard = z.object({

});

export type SetupAttemptPaymentMethodDetailsKrCardModel = z.infer<typeof SetupAttemptPaymentMethodDetailsKrCard>;

export const SetupAttemptPaymentMethodDetailsLink = z.object({

});

export type SetupAttemptPaymentMethodDetailsLinkModel = z.infer<typeof SetupAttemptPaymentMethodDetailsLink>;

export const SetupAttemptPaymentMethodDetailsNaverPay = z.object({
'buyer_id': z.string().optional()
});

export type SetupAttemptPaymentMethodDetailsNaverPayModel = z.infer<typeof SetupAttemptPaymentMethodDetailsNaverPay>;

export const SetupAttemptPaymentMethodDetailsNzBankAccount = z.object({

});

export type SetupAttemptPaymentMethodDetailsNzBankAccountModel = z.infer<typeof SetupAttemptPaymentMethodDetailsNzBankAccount>;

export const SetupAttemptPaymentMethodDetailsPaypal = z.object({

});

export type SetupAttemptPaymentMethodDetailsPaypalModel = z.infer<typeof SetupAttemptPaymentMethodDetailsPaypal>;

export const SetupAttemptPaymentMethodDetailsRevolutPay = z.object({

});

export type SetupAttemptPaymentMethodDetailsRevolutPayModel = z.infer<typeof SetupAttemptPaymentMethodDetailsRevolutPay>;

export const SetupAttemptPaymentMethodDetailsSepaDebit = z.object({

});

export type SetupAttemptPaymentMethodDetailsSepaDebitModel = z.infer<typeof SetupAttemptPaymentMethodDetailsSepaDebit>;

export const SetupAttemptPaymentMethodDetailsSofort: z.ZodType<SetupAttemptPaymentMethodDetailsSofortModel> = z.object({
'bank_code': z.string(),
'bank_name': z.string(),
'bic': z.string(),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'preferred_language': z.enum(['de', 'en', 'fr', 'nl']),
'verified_name': z.string()
});

export const SetupAttemptPaymentMethodDetailsUsBankAccount = z.object({

});

export type SetupAttemptPaymentMethodDetailsUsBankAccountModel = z.infer<typeof SetupAttemptPaymentMethodDetailsUsBankAccount>;

export const SetupAttemptPaymentMethodDetails: z.ZodType<SetupAttemptPaymentMethodDetailsModel> = z.object({
'acss_debit': SetupAttemptPaymentMethodDetailsAcssDebit.optional(),
'amazon_pay': SetupAttemptPaymentMethodDetailsAmazonPay.optional(),
'au_becs_debit': SetupAttemptPaymentMethodDetailsAuBecsDebit.optional(),
'bacs_debit': SetupAttemptPaymentMethodDetailsBacsDebit.optional(),
'bancontact': z.lazy(() => SetupAttemptPaymentMethodDetailsBancontact).optional(),
'boleto': SetupAttemptPaymentMethodDetailsBoleto.optional(),
'card': SetupAttemptPaymentMethodDetailsCard.optional(),
'card_present': z.lazy(() => SetupAttemptPaymentMethodDetailsCardPresent).optional(),
'cashapp': SetupAttemptPaymentMethodDetailsCashapp.optional(),
'ideal': z.lazy(() => SetupAttemptPaymentMethodDetailsIdeal).optional(),
'kakao_pay': SetupAttemptPaymentMethodDetailsKakaoPay.optional(),
'klarna': SetupAttemptPaymentMethodDetailsKlarna.optional(),
'kr_card': SetupAttemptPaymentMethodDetailsKrCard.optional(),
'link': SetupAttemptPaymentMethodDetailsLink.optional(),
'naver_pay': SetupAttemptPaymentMethodDetailsNaverPay.optional(),
'nz_bank_account': SetupAttemptPaymentMethodDetailsNzBankAccount.optional(),
'paypal': SetupAttemptPaymentMethodDetailsPaypal.optional(),
'revolut_pay': SetupAttemptPaymentMethodDetailsRevolutPay.optional(),
'sepa_debit': SetupAttemptPaymentMethodDetailsSepaDebit.optional(),
'sofort': z.lazy(() => SetupAttemptPaymentMethodDetailsSofort).optional(),
'type': z.string(),
'us_bank_account': SetupAttemptPaymentMethodDetailsUsBankAccount.optional()
});

export const PaymentFlowsPrivatePaymentMethodsCardPaymentIntentAmountDetailsLineItemPaymentMethodOptions = z.object({
'commodity_code': z.string()
});

export type PaymentFlowsPrivatePaymentMethodsCardPaymentIntentAmountDetailsLineItemPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardPaymentIntentAmountDetailsLineItemPaymentMethodOptions>;

export const PaymentFlowsPrivatePaymentMethodsCardPresentAmountDetailsLineItemPaymentMethodOptions = z.object({
'commodity_code': z.string()
});

export type PaymentFlowsPrivatePaymentMethodsCardPresentAmountDetailsLineItemPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardPresentAmountDetailsLineItemPaymentMethodOptions>;

export const PaymentFlowsPrivatePaymentMethodsKlarnaPaymentIntentAmountDetailsLineItemPaymentMethodOptions = z.object({
'image_url': z.string(),
'product_url': z.string(),
'reference': z.string(),
'subscription_reference': z.string()
});

export type PaymentFlowsPrivatePaymentMethodsKlarnaPaymentIntentAmountDetailsLineItemPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsKlarnaPaymentIntentAmountDetailsLineItemPaymentMethodOptions>;

export const PaymentFlowsPrivatePaymentMethodsPaypalAmountDetailsLineItemPaymentMethodOptions = z.object({
'category': z.enum(['digital_goods', 'donation', 'physical_goods']).optional(),
'description': z.string().optional(),
'sold_by': z.string().optional()
});

export type PaymentFlowsPrivatePaymentMethodsPaypalAmountDetailsLineItemPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsPaypalAmountDetailsLineItemPaymentMethodOptions>;

export const PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourcePaymentMethodOptions = z.object({
'card': PaymentFlowsPrivatePaymentMethodsCardPaymentIntentAmountDetailsLineItemPaymentMethodOptions.optional(),
'card_present': PaymentFlowsPrivatePaymentMethodsCardPresentAmountDetailsLineItemPaymentMethodOptions.optional(),
'klarna': PaymentFlowsPrivatePaymentMethodsKlarnaPaymentIntentAmountDetailsLineItemPaymentMethodOptions.optional(),
'paypal': PaymentFlowsPrivatePaymentMethodsPaypalAmountDetailsLineItemPaymentMethodOptions.optional()
});

export type PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourcePaymentMethodOptionsModel = z.infer<typeof PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourcePaymentMethodOptions>;

export const PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourceTax = z.object({
'total_tax_amount': z.number().int()
});

export type PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourceTaxModel = z.infer<typeof PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourceTax>;

export const PaymentIntentAmountDetailsLineItem = z.object({
'discount_amount': z.number().int(),
'id': z.string(),
'object': z.enum(['payment_intent_amount_details_line_item']),
'payment_method_options': z.union([PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourcePaymentMethodOptions]),
'product_code': z.string(),
'product_name': z.string(),
'quantity': z.number().int(),
'tax': z.union([PaymentFlowsAmountDetailsResourceLineItemsListResourceLineItemResourceTax]),
'unit_cost': z.number().int(),
'unit_of_measure': z.string()
});

export type PaymentIntentAmountDetailsLineItemModel = z.infer<typeof PaymentIntentAmountDetailsLineItem>;

export const PaymentFlowsAmountDetailsResourceShipping = z.object({
'amount': z.number().int(),
'from_postal_code': z.string(),
'to_postal_code': z.string()
});

export type PaymentFlowsAmountDetailsResourceShippingModel = z.infer<typeof PaymentFlowsAmountDetailsResourceShipping>;

export const PaymentFlowsAmountDetailsResourceTax = z.object({
'total_tax_amount': z.number().int()
});

export type PaymentFlowsAmountDetailsResourceTaxModel = z.infer<typeof PaymentFlowsAmountDetailsResourceTax>;

export const PaymentFlowsAmountDetailsClientResourceTip = z.object({
'amount': z.number().int().optional()
});

export type PaymentFlowsAmountDetailsClientResourceTipModel = z.infer<typeof PaymentFlowsAmountDetailsClientResourceTip>;

export const PaymentFlowsAmountDetails = z.object({
'discount_amount': z.number().int().optional(),
'line_items': z.object({
'data': z.array(PaymentIntentAmountDetailsLineItem),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'shipping': PaymentFlowsAmountDetailsResourceShipping.optional(),
'tax': PaymentFlowsAmountDetailsResourceTax.optional(),
'tip': PaymentFlowsAmountDetailsClientResourceTip.optional()
});

export type PaymentFlowsAmountDetailsModel = z.infer<typeof PaymentFlowsAmountDetails>;

export const PaymentFlowsAutomaticPaymentMethodsPaymentIntent = z.object({
'allow_redirects': z.enum(['always', 'never']).optional(),
'enabled': z.boolean()
});

export type PaymentFlowsAutomaticPaymentMethodsPaymentIntentModel = z.infer<typeof PaymentFlowsAutomaticPaymentMethodsPaymentIntent>;

export const PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsResourceTax = z.object({
'calculation': z.string()
});

export type PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsResourceTaxModel = z.infer<typeof PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsResourceTax>;

export const PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputs = z.object({
'tax': PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsResourceTax.optional()
});

export type PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputsModel = z.infer<typeof PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputs>;

export const PaymentFlowsPaymentIntentAsyncWorkflows = z.object({
'inputs': PaymentFlowsPaymentIntentAsyncWorkflowsResourceInputs.optional()
});

export type PaymentFlowsPaymentIntentAsyncWorkflowsModel = z.infer<typeof PaymentFlowsPaymentIntentAsyncWorkflows>;

export const Fee = z.object({
'amount': z.number().int(),
'application': z.string(),
'currency': z.string(),
'description': z.string(),
'type': z.string()
});

export type FeeModel = z.infer<typeof Fee>;

export const ConnectCollectionTransfer: z.ZodType<ConnectCollectionTransferModel> = z.object({
'amount': z.number().int(),
'currency': z.string(),
'destination': z.union([z.string(), z.lazy(() => Account)]),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['connect_collection_transfer'])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraft: z.ZodType<CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraftModel> = z.object({
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'linked_transaction': z.union([z.string(), z.lazy(() => CustomerCashBalanceTransaction)])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransaction: z.ZodType<CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransactionModel> = z.object({
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceEuBankTransfer = z.object({
'bic': z.string(),
'iban_last4': z.string(),
'sender_name': z.string()
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceEuBankTransferModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceEuBankTransfer>;

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceGbBankTransfer = z.object({
'account_number_last4': z.string(),
'sender_name': z.string(),
'sort_code': z.string()
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceGbBankTransferModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceGbBankTransfer>;

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceJpBankTransfer = z.object({
'sender_bank': z.string(),
'sender_branch': z.string(),
'sender_name': z.string()
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceJpBankTransferModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceJpBankTransfer>;

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceUsBankTransfer = z.object({
'network': z.enum(['ach', 'domestic_wire_us', 'swift']).optional(),
'sender_name': z.string()
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceUsBankTransferModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceUsBankTransfer>;

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransfer = z.object({
'eu_bank_transfer': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceEuBankTransfer.optional(),
'gb_bank_transfer': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceGbBankTransfer.optional(),
'jp_bank_transfer': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceJpBankTransfer.optional(),
'reference': z.string(),
'type': z.enum(['eu_bank_transfer', 'gb_bank_transfer', 'jp_bank_transfer', 'mx_bank_transfer', 'us_bank_transfer']),
'us_bank_transfer': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceUsBankTransfer.optional()
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransfer>;

export const CustomerBalanceResourceCashBalanceTransactionResourceFundedTransaction = z.object({
'bank_transfer': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransfer
});

export type CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionModel = z.infer<typeof CustomerBalanceResourceCashBalanceTransactionResourceFundedTransaction>;

export const DestinationDetailsUnimplemented = z.object({

});

export type DestinationDetailsUnimplementedModel = z.infer<typeof DestinationDetailsUnimplemented>;

export const RefundDestinationDetailsBlik = z.object({
'network_decline_code': z.string(),
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsBlikModel = z.infer<typeof RefundDestinationDetailsBlik>;

export const RefundDestinationDetailsBrBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsBrBankTransferModel = z.infer<typeof RefundDestinationDetailsBrBankTransfer>;

export const RefundDestinationDetailsCard = z.object({
'reference': z.string().optional(),
'reference_status': z.string().optional(),
'reference_type': z.string().optional(),
'type': z.enum(['pending', 'refund', 'reversal'])
});

export type RefundDestinationDetailsCardModel = z.infer<typeof RefundDestinationDetailsCard>;

export const RefundDestinationDetailsCrypto = z.object({
'reference': z.string()
});

export type RefundDestinationDetailsCryptoModel = z.infer<typeof RefundDestinationDetailsCrypto>;

export const RefundDestinationDetailsEuBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsEuBankTransferModel = z.infer<typeof RefundDestinationDetailsEuBankTransfer>;

export const RefundDestinationDetailsGbBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsGbBankTransferModel = z.infer<typeof RefundDestinationDetailsGbBankTransfer>;

export const RefundDestinationDetailsJpBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsJpBankTransferModel = z.infer<typeof RefundDestinationDetailsJpBankTransfer>;

export const RefundDestinationDetailsMbWay = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsMbWayModel = z.infer<typeof RefundDestinationDetailsMbWay>;

export const RefundDestinationDetailsMultibanco = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsMultibancoModel = z.infer<typeof RefundDestinationDetailsMultibanco>;

export const RefundDestinationDetailsMxBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsMxBankTransferModel = z.infer<typeof RefundDestinationDetailsMxBankTransfer>;

export const RefundDestinationDetailsP24 = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsP24Model = z.infer<typeof RefundDestinationDetailsP24>;

export const RefundDestinationDetailsPaypal = z.object({
'network_decline_code': z.string()
});

export type RefundDestinationDetailsPaypalModel = z.infer<typeof RefundDestinationDetailsPaypal>;

export const RefundDestinationDetailsSwish = z.object({
'network_decline_code': z.string(),
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsSwishModel = z.infer<typeof RefundDestinationDetailsSwish>;

export const RefundDestinationDetailsThBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsThBankTransferModel = z.infer<typeof RefundDestinationDetailsThBankTransfer>;

export const RefundDestinationDetailsUsBankTransfer = z.object({
'reference': z.string(),
'reference_status': z.string()
});

export type RefundDestinationDetailsUsBankTransferModel = z.infer<typeof RefundDestinationDetailsUsBankTransfer>;

export const RefundDestinationDetails = z.object({
'affirm': DestinationDetailsUnimplemented.optional(),
'afterpay_clearpay': DestinationDetailsUnimplemented.optional(),
'alipay': DestinationDetailsUnimplemented.optional(),
'alma': DestinationDetailsUnimplemented.optional(),
'amazon_pay': DestinationDetailsUnimplemented.optional(),
'au_bank_transfer': DestinationDetailsUnimplemented.optional(),
'blik': RefundDestinationDetailsBlik.optional(),
'br_bank_transfer': RefundDestinationDetailsBrBankTransfer.optional(),
'card': RefundDestinationDetailsCard.optional(),
'cashapp': DestinationDetailsUnimplemented.optional(),
'crypto': RefundDestinationDetailsCrypto.optional(),
'customer_cash_balance': DestinationDetailsUnimplemented.optional(),
'eps': DestinationDetailsUnimplemented.optional(),
'eu_bank_transfer': RefundDestinationDetailsEuBankTransfer.optional(),
'gb_bank_transfer': RefundDestinationDetailsGbBankTransfer.optional(),
'giropay': DestinationDetailsUnimplemented.optional(),
'grabpay': DestinationDetailsUnimplemented.optional(),
'jp_bank_transfer': RefundDestinationDetailsJpBankTransfer.optional(),
'klarna': DestinationDetailsUnimplemented.optional(),
'mb_way': RefundDestinationDetailsMbWay.optional(),
'multibanco': RefundDestinationDetailsMultibanco.optional(),
'mx_bank_transfer': RefundDestinationDetailsMxBankTransfer.optional(),
'nz_bank_transfer': DestinationDetailsUnimplemented.optional(),
'p24': RefundDestinationDetailsP24.optional(),
'paynow': DestinationDetailsUnimplemented.optional(),
'paypal': RefundDestinationDetailsPaypal.optional(),
'pix': DestinationDetailsUnimplemented.optional(),
'revolut': DestinationDetailsUnimplemented.optional(),
'sofort': DestinationDetailsUnimplemented.optional(),
'swish': RefundDestinationDetailsSwish.optional(),
'th_bank_transfer': RefundDestinationDetailsThBankTransfer.optional(),
'twint': DestinationDetailsUnimplemented.optional(),
'type': z.string(),
'us_bank_transfer': RefundDestinationDetailsUsBankTransfer.optional(),
'wechat_pay': DestinationDetailsUnimplemented.optional(),
'zip': DestinationDetailsUnimplemented.optional()
});

export type RefundDestinationDetailsModel = z.infer<typeof RefundDestinationDetails>;

export const EmailSent = z.object({
'email_sent_at': z.number().int(),
'email_sent_to': z.string()
});

export type EmailSentModel = z.infer<typeof EmailSent>;

export const RefundNextActionDisplayDetails = z.object({
'email_sent': EmailSent,
'expires_at': z.number().int()
});

export type RefundNextActionDisplayDetailsModel = z.infer<typeof RefundNextActionDisplayDetails>;

export const RefundNextAction = z.object({
'display_details': RefundNextActionDisplayDetails.optional(),
'type': z.string()
});

export type RefundNextActionModel = z.infer<typeof RefundNextAction>;

export const PaymentFlowsPaymentIntentPresentmentDetails = z.object({
'presentment_amount': z.number().int(),
'presentment_currency': z.string()
});

export type PaymentFlowsPaymentIntentPresentmentDetailsModel = z.infer<typeof PaymentFlowsPaymentIntentPresentmentDetails>;

export const Transfer: z.ZodType<TransferModel> = z.object({
'amount': z.number().int(),
'amount_reversed': z.number().int(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'destination': z.union([z.string(), z.lazy(() => Account)]),
'destination_payment': z.union([z.string(), z.lazy(() => Charge)]).optional(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['transfer']),
'reversals': z.object({
'data': z.array(z.lazy(() => TransferReversal)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'reversed': z.boolean(),
'source_transaction': z.union([z.string(), z.lazy(() => Charge)]),
'source_type': z.string().optional(),
'transfer_group': z.string()
});

export const TransferReversal: z.ZodType<TransferReversalModel> = z.object({
'amount': z.number().int(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'created': z.number().int(),
'currency': z.string(),
'destination_payment_refund': z.union([z.string(), z.lazy(() => Refund)]),
'id': z.string(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['transfer_reversal']),
'source_refund': z.union([z.string(), z.lazy(() => Refund)]),
'transfer': z.union([z.string(), z.lazy(() => Transfer)])
});

export const Refund: z.ZodType<RefundModel> = z.object({
'amount': z.number().int(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'created': z.number().int(),
'currency': z.string(),
'description': z.string().optional(),
'destination_details': RefundDestinationDetails.optional(),
'failure_balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]).optional(),
'failure_reason': z.string().optional(),
'id': z.string(),
'instructions_email': z.string().optional(),
'metadata': z.record(z.string(), z.string()),
'next_action': RefundNextAction.optional(),
'object': z.enum(['refund']),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'pending_reason': z.enum(['charge_pending', 'insufficient_funds', 'processing']).optional(),
'presentment_details': PaymentFlowsPaymentIntentPresentmentDetails.optional(),
'reason': z.enum(['duplicate', 'expired_uncaptured_charge', 'fraudulent', 'requested_by_customer']),
'receipt_number': z.string(),
'source_transfer_reversal': z.union([z.string(), z.lazy(() => TransferReversal)]),
'status': z.string(),
'transfer_reversal': z.union([z.string(), z.lazy(() => TransferReversal)])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransaction: z.ZodType<CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransactionModel> = z.object({
'refund': z.union([z.string(), z.lazy(() => Refund)])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalance: z.ZodType<CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalanceModel> = z.object({
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)])
});

export const CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransaction: z.ZodType<CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransactionModel> = z.object({
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)])
});

export const CustomerCashBalanceTransaction: z.ZodType<CustomerCashBalanceTransactionModel> = z.object({
'adjusted_for_overdraft': z.lazy(() => CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraft).optional(),
'applied_to_payment': z.lazy(() => CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransaction).optional(),
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'ending_balance': z.number().int(),
'funded': CustomerBalanceResourceCashBalanceTransactionResourceFundedTransaction.optional(),
'id': z.string(),
'livemode': z.boolean(),
'net_amount': z.number().int(),
'object': z.enum(['customer_cash_balance_transaction']),
'refunded_from_payment': z.lazy(() => CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransaction).optional(),
'transferred_to_balance': z.lazy(() => CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalance).optional(),
'type': z.enum(['adjusted_for_overdraft', 'applied_to_payment', 'funded', 'funding_reversed', 'refunded_from_payment', 'return_canceled', 'return_initiated', 'transferred_to_balance', 'unapplied_from_payment']),
'unapplied_from_payment': z.lazy(() => CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransaction).optional()
});

export const DisputeTransactionShippingAddress = z.object({
'city': z.string(),
'country': z.string(),
'line1': z.string(),
'line2': z.string(),
'postal_code': z.string(),
'state': z.string()
});

export type DisputeTransactionShippingAddressModel = z.infer<typeof DisputeTransactionShippingAddress>;

export const DisputeVisaCompellingEvidence3DisputedTransaction = z.object({
'customer_account_id': z.string(),
'customer_device_fingerprint': z.string(),
'customer_device_id': z.string(),
'customer_email_address': z.string(),
'customer_purchase_ip': z.string(),
'merchandise_or_services': z.enum(['merchandise', 'services']),
'product_description': z.string(),
'shipping_address': z.union([DisputeTransactionShippingAddress])
});

export type DisputeVisaCompellingEvidence3DisputedTransactionModel = z.infer<typeof DisputeVisaCompellingEvidence3DisputedTransaction>;

export const DisputeVisaCompellingEvidence3PriorUndisputedTransaction = z.object({
'charge': z.string(),
'customer_account_id': z.string(),
'customer_device_fingerprint': z.string(),
'customer_device_id': z.string(),
'customer_email_address': z.string(),
'customer_purchase_ip': z.string(),
'product_description': z.string(),
'shipping_address': z.union([DisputeTransactionShippingAddress])
});

export type DisputeVisaCompellingEvidence3PriorUndisputedTransactionModel = z.infer<typeof DisputeVisaCompellingEvidence3PriorUndisputedTransaction>;

export const DisputeEnhancedEvidenceVisaCompellingEvidence3 = z.object({
'disputed_transaction': z.union([DisputeVisaCompellingEvidence3DisputedTransaction]),
'prior_undisputed_transactions': z.array(DisputeVisaCompellingEvidence3PriorUndisputedTransaction)
});

export type DisputeEnhancedEvidenceVisaCompellingEvidence3Model = z.infer<typeof DisputeEnhancedEvidenceVisaCompellingEvidence3>;

export const DisputeEnhancedEvidenceVisaCompliance = z.object({
'fee_acknowledged': z.boolean()
});

export type DisputeEnhancedEvidenceVisaComplianceModel = z.infer<typeof DisputeEnhancedEvidenceVisaCompliance>;

export const DisputeEnhancedEvidence = z.object({
'visa_compelling_evidence_3': DisputeEnhancedEvidenceVisaCompellingEvidence3.optional(),
'visa_compliance': DisputeEnhancedEvidenceVisaCompliance.optional()
});

export type DisputeEnhancedEvidenceModel = z.infer<typeof DisputeEnhancedEvidence>;

export const DisputeEvidence = z.object({
'access_activity_log': z.string(),
'billing_address': z.string(),
'cancellation_policy': z.union([z.string(), z.lazy(() => File)]),
'cancellation_policy_disclosure': z.string(),
'cancellation_rebuttal': z.string(),
'customer_communication': z.union([z.string(), z.lazy(() => File)]),
'customer_email_address': z.string(),
'customer_name': z.string(),
'customer_purchase_ip': z.string(),
'customer_signature': z.union([z.string(), z.lazy(() => File)]),
'duplicate_charge_documentation': z.union([z.string(), z.lazy(() => File)]),
'duplicate_charge_explanation': z.string(),
'duplicate_charge_id': z.string(),
'enhanced_evidence': DisputeEnhancedEvidence,
'product_description': z.string(),
'receipt': z.union([z.string(), z.lazy(() => File)]),
'refund_policy': z.union([z.string(), z.lazy(() => File)]),
'refund_policy_disclosure': z.string(),
'refund_refusal_explanation': z.string(),
'service_date': z.string(),
'service_documentation': z.union([z.string(), z.lazy(() => File)]),
'shipping_address': z.string(),
'shipping_carrier': z.string(),
'shipping_date': z.string(),
'shipping_documentation': z.union([z.string(), z.lazy(() => File)]),
'shipping_tracking_number': z.string(),
'uncategorized_file': z.union([z.string(), z.lazy(() => File)]),
'uncategorized_text': z.string()
});

export type DisputeEvidenceModel = z.infer<typeof DisputeEvidence>;

export const DisputeEnhancedEligibilityVisaCompellingEvidence3 = z.object({
'required_actions': z.array(z.enum(['missing_customer_identifiers', 'missing_disputed_transaction_description', 'missing_merchandise_or_services', 'missing_prior_undisputed_transaction_description', 'missing_prior_undisputed_transactions'])),
'status': z.enum(['not_qualified', 'qualified', 'requires_action'])
});

export type DisputeEnhancedEligibilityVisaCompellingEvidence3Model = z.infer<typeof DisputeEnhancedEligibilityVisaCompellingEvidence3>;

export const DisputeEnhancedEligibilityVisaCompliance = z.object({
'status': z.enum(['fee_acknowledged', 'requires_fee_acknowledgement'])
});

export type DisputeEnhancedEligibilityVisaComplianceModel = z.infer<typeof DisputeEnhancedEligibilityVisaCompliance>;

export const DisputeEnhancedEligibility = z.object({
'visa_compelling_evidence_3': DisputeEnhancedEligibilityVisaCompellingEvidence3.optional(),
'visa_compliance': DisputeEnhancedEligibilityVisaCompliance.optional()
});

export type DisputeEnhancedEligibilityModel = z.infer<typeof DisputeEnhancedEligibility>;

export const DisputeEvidenceDetails = z.object({
'due_by': z.number().int(),
'enhanced_eligibility': DisputeEnhancedEligibility,
'has_evidence': z.boolean(),
'past_due': z.boolean(),
'submission_count': z.number().int()
});

export type DisputeEvidenceDetailsModel = z.infer<typeof DisputeEvidenceDetails>;

export const DisputePaymentMethodDetailsAmazonPay = z.object({
'dispute_type': z.enum(['chargeback', 'claim'])
});

export type DisputePaymentMethodDetailsAmazonPayModel = z.infer<typeof DisputePaymentMethodDetailsAmazonPay>;

export const DisputePaymentMethodDetailsCard = z.object({
'brand': z.string(),
'case_type': z.enum(['block', 'chargeback', 'compliance', 'inquiry', 'resolution']),
'network_reason_code': z.string()
});

export type DisputePaymentMethodDetailsCardModel = z.infer<typeof DisputePaymentMethodDetailsCard>;

export const DisputePaymentMethodDetailsKlarna = z.object({
'chargeback_loss_reason_code': z.string().optional(),
'reason_code': z.string()
});

export type DisputePaymentMethodDetailsKlarnaModel = z.infer<typeof DisputePaymentMethodDetailsKlarna>;

export const DisputePaymentMethodDetailsPaypal = z.object({
'case_id': z.string(),
'reason_code': z.string()
});

export type DisputePaymentMethodDetailsPaypalModel = z.infer<typeof DisputePaymentMethodDetailsPaypal>;

export const DisputePaymentMethodDetails = z.object({
'amazon_pay': DisputePaymentMethodDetailsAmazonPay.optional(),
'card': DisputePaymentMethodDetailsCard.optional(),
'klarna': DisputePaymentMethodDetailsKlarna.optional(),
'paypal': DisputePaymentMethodDetailsPaypal.optional(),
'type': z.enum(['amazon_pay', 'card', 'klarna', 'paypal'])
});

export type DisputePaymentMethodDetailsModel = z.infer<typeof DisputePaymentMethodDetails>;

export const Dispute: z.ZodType<DisputeModel> = z.object({
'amount': z.number().int(),
'balance_transactions': z.array(z.lazy(() => BalanceTransaction)),
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'created': z.number().int(),
'currency': z.string(),
'enhanced_eligibility_types': z.array(z.enum(['visa_compelling_evidence_3', 'visa_compliance'])),
'evidence': DisputeEvidence,
'evidence_details': DisputeEvidenceDetails,
'id': z.string(),
'is_charge_refundable': z.boolean(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'network_reason_code': z.string().optional(),
'object': z.enum(['dispute']),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'payment_method_details': DisputePaymentMethodDetails.optional(),
'reason': z.string(),
'status': z.enum(['lost', 'needs_response', 'prevented', 'under_review', 'warning_closed', 'warning_needs_response', 'warning_under_review', 'won'])
});

export const FeeRefund: z.ZodType<FeeRefundModel> = z.object({
'amount': z.number().int(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'created': z.number().int(),
'currency': z.string(),
'fee': z.union([z.string(), z.lazy(() => ApplicationFee)]),
'id': z.string(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['fee_refund'])
});

export const IssuingAuthorizationAmountDetails = z.object({
'atm_fee': z.number().int(),
'cashback_amount': z.number().int()
});

export type IssuingAuthorizationAmountDetailsModel = z.infer<typeof IssuingAuthorizationAmountDetails>;

export const IssuingCardholderAddress = z.object({
'address': Address
});

export type IssuingCardholderAddressModel = z.infer<typeof IssuingCardholderAddress>;

export const IssuingCardholderCompany = z.object({
'tax_id_provided': z.boolean()
});

export type IssuingCardholderCompanyModel = z.infer<typeof IssuingCardholderCompany>;

export const IssuingCardholderUserTermsAcceptance = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string()
});

export type IssuingCardholderUserTermsAcceptanceModel = z.infer<typeof IssuingCardholderUserTermsAcceptance>;

export const IssuingCardholderCardIssuing = z.object({
'user_terms_acceptance': z.union([IssuingCardholderUserTermsAcceptance])
});

export type IssuingCardholderCardIssuingModel = z.infer<typeof IssuingCardholderCardIssuing>;

export const IssuingCardholderIndividualDob = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type IssuingCardholderIndividualDobModel = z.infer<typeof IssuingCardholderIndividualDob>;

export const IssuingCardholderIdDocument = z.object({
'back': z.union([z.string(), z.lazy(() => File)]),
'front': z.union([z.string(), z.lazy(() => File)])
});

export type IssuingCardholderIdDocumentModel = z.infer<typeof IssuingCardholderIdDocument>;

export const IssuingCardholderVerification = z.object({
'document': z.union([IssuingCardholderIdDocument])
});

export type IssuingCardholderVerificationModel = z.infer<typeof IssuingCardholderVerification>;

export const IssuingCardholderIndividual = z.object({
'card_issuing': z.union([IssuingCardholderCardIssuing]).optional(),
'dob': z.union([IssuingCardholderIndividualDob]),
'first_name': z.string(),
'last_name': z.string(),
'verification': z.union([IssuingCardholderVerification])
});

export type IssuingCardholderIndividualModel = z.infer<typeof IssuingCardholderIndividual>;

export const IssuingCardholderRequirements = z.object({
'disabled_reason': z.enum(['listed', 'rejected.listed', 'requirements.past_due', 'under_review']),
'past_due': z.array(z.enum(['company.tax_id', 'individual.card_issuing.user_terms_acceptance.date', 'individual.card_issuing.user_terms_acceptance.ip', 'individual.dob.day', 'individual.dob.month', 'individual.dob.year', 'individual.first_name', 'individual.last_name', 'individual.verification.document']))
});

export type IssuingCardholderRequirementsModel = z.infer<typeof IssuingCardholderRequirements>;

export const IssuingCardholderSpendingLimit = z.object({
'amount': z.number().int(),
'categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'interval': z.enum(['all_time', 'daily', 'monthly', 'per_authorization', 'weekly', 'yearly'])
});

export type IssuingCardholderSpendingLimitModel = z.infer<typeof IssuingCardholderSpendingLimit>;

export const IssuingCardholderAuthorizationControls = z.object({
'allowed_categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'allowed_merchant_countries': z.array(z.string()),
'blocked_categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'blocked_merchant_countries': z.array(z.string()),
'spending_limits': z.array(IssuingCardholderSpendingLimit),
'spending_limits_currency': z.string()
});

export type IssuingCardholderAuthorizationControlsModel = z.infer<typeof IssuingCardholderAuthorizationControls>;

export const IssuingCardholder = z.object({
'billing': IssuingCardholderAddress,
'company': z.union([IssuingCardholderCompany]),
'created': z.number().int(),
'email': z.string(),
'id': z.string(),
'individual': z.union([IssuingCardholderIndividual]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['issuing.cardholder']),
'phone_number': z.string(),
'preferred_locales': z.array(z.enum(['de', 'en', 'es', 'fr', 'it'])),
'requirements': IssuingCardholderRequirements,
'spending_controls': z.union([IssuingCardholderAuthorizationControls]),
'status': z.enum(['active', 'blocked', 'inactive']),
'type': z.enum(['company', 'individual'])
});

export type IssuingCardholderModel = z.infer<typeof IssuingCardholder>;

export const IssuingCardFraudWarning = z.object({
'started_at': z.number().int(),
'type': z.enum(['card_testing_exposure', 'fraud_dispute_filed', 'third_party_reported', 'user_indicated_fraud'])
});

export type IssuingCardFraudWarningModel = z.infer<typeof IssuingCardFraudWarning>;

export const IssuingPersonalizationDesignCarrierText = z.object({
'footer_body': z.string(),
'footer_title': z.string(),
'header_body': z.string(),
'header_title': z.string()
});

export type IssuingPersonalizationDesignCarrierTextModel = z.infer<typeof IssuingPersonalizationDesignCarrierText>;

export const IssuingPhysicalBundleFeatures = z.object({
'card_logo': z.enum(['optional', 'required', 'unsupported']),
'carrier_text': z.enum(['optional', 'required', 'unsupported']),
'second_line': z.enum(['optional', 'required', 'unsupported'])
});

export type IssuingPhysicalBundleFeaturesModel = z.infer<typeof IssuingPhysicalBundleFeatures>;

export const IssuingPhysicalBundle = z.object({
'features': IssuingPhysicalBundleFeatures,
'id': z.string(),
'livemode': z.boolean(),
'name': z.string(),
'object': z.enum(['issuing.physical_bundle']),
'status': z.enum(['active', 'inactive', 'review']),
'type': z.enum(['custom', 'standard'])
});

export type IssuingPhysicalBundleModel = z.infer<typeof IssuingPhysicalBundle>;

export const IssuingPersonalizationDesignPreferences = z.object({
'is_default': z.boolean(),
'is_platform_default': z.boolean()
});

export type IssuingPersonalizationDesignPreferencesModel = z.infer<typeof IssuingPersonalizationDesignPreferences>;

export const IssuingPersonalizationDesignRejectionReasons = z.object({
'card_logo': z.array(z.enum(['geographic_location', 'inappropriate', 'network_name', 'non_binary_image', 'non_fiat_currency', 'other', 'other_entity', 'promotional_material'])),
'carrier_text': z.array(z.enum(['geographic_location', 'inappropriate', 'network_name', 'non_fiat_currency', 'other', 'other_entity', 'promotional_material']))
});

export type IssuingPersonalizationDesignRejectionReasonsModel = z.infer<typeof IssuingPersonalizationDesignRejectionReasons>;

export const IssuingPersonalizationDesign = z.object({
'card_logo': z.union([z.string(), z.lazy(() => File)]),
'carrier_text': z.union([IssuingPersonalizationDesignCarrierText]),
'created': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'lookup_key': z.string(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['issuing.personalization_design']),
'physical_bundle': z.union([z.string(), IssuingPhysicalBundle]),
'preferences': IssuingPersonalizationDesignPreferences,
'rejection_reasons': IssuingPersonalizationDesignRejectionReasons,
'status': z.enum(['active', 'inactive', 'rejected', 'review'])
});

export type IssuingPersonalizationDesignModel = z.infer<typeof IssuingPersonalizationDesign>;

export const IssuingCardShippingAddressValidation = z.object({
'mode': z.enum(['disabled', 'normalization_only', 'validation_and_normalization']),
'normalized_address': z.union([Address]),
'result': z.enum(['indeterminate', 'likely_deliverable', 'likely_undeliverable'])
});

export type IssuingCardShippingAddressValidationModel = z.infer<typeof IssuingCardShippingAddressValidation>;

export const IssuingCardShippingCustoms = z.object({
'eori_number': z.string()
});

export type IssuingCardShippingCustomsModel = z.infer<typeof IssuingCardShippingCustoms>;

export const IssuingCardShipping = z.object({
'address': Address,
'address_validation': z.union([IssuingCardShippingAddressValidation]),
'carrier': z.enum(['dhl', 'fedex', 'royal_mail', 'usps']),
'customs': z.union([IssuingCardShippingCustoms]),
'eta': z.number().int(),
'name': z.string(),
'phone_number': z.string(),
'require_signature': z.boolean(),
'service': z.enum(['express', 'priority', 'standard']),
'status': z.enum(['canceled', 'delivered', 'failure', 'pending', 'returned', 'shipped', 'submitted']),
'tracking_number': z.string(),
'tracking_url': z.string(),
'type': z.enum(['bulk', 'individual'])
});

export type IssuingCardShippingModel = z.infer<typeof IssuingCardShipping>;

export const IssuingCardSpendingLimit = z.object({
'amount': z.number().int(),
'categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'interval': z.enum(['all_time', 'daily', 'monthly', 'per_authorization', 'weekly', 'yearly'])
});

export type IssuingCardSpendingLimitModel = z.infer<typeof IssuingCardSpendingLimit>;

export const IssuingCardAuthorizationControls = z.object({
'allowed_categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'allowed_merchant_countries': z.array(z.string()),
'blocked_categories': z.array(z.enum(['ac_refrigeration_repair', 'accounting_bookkeeping_services', 'advertising_services', 'agricultural_cooperative', 'airlines_air_carriers', 'airports_flying_fields', 'ambulance_services', 'amusement_parks_carnivals', 'antique_reproductions', 'antique_shops', 'aquariums', 'architectural_surveying_services', 'art_dealers_and_galleries', 'artists_supply_and_craft_shops', 'auto_and_home_supply_stores', 'auto_body_repair_shops', 'auto_paint_shops', 'auto_service_shops', 'automated_cash_disburse', 'automated_fuel_dispensers', 'automobile_associations', 'automotive_parts_and_accessories_stores', 'automotive_tire_stores', 'bail_and_bond_payments', 'bakeries', 'bands_orchestras', 'barber_and_beauty_shops', 'betting_casino_gambling', 'bicycle_shops', 'billiard_pool_establishments', 'boat_dealers', 'boat_rentals_and_leases', 'book_stores', 'books_periodicals_and_newspapers', 'bowling_alleys', 'bus_lines', 'business_secretarial_schools', 'buying_shopping_services', 'cable_satellite_and_other_pay_television_and_radio', 'camera_and_photographic_supply_stores', 'candy_nut_and_confectionery_stores', 'car_and_truck_dealers_new_used', 'car_and_truck_dealers_used_only', 'car_rental_agencies', 'car_washes', 'carpentry_services', 'carpet_upholstery_cleaning', 'caterers', 'charitable_and_social_service_organizations_fundraising', 'chemicals_and_allied_products', 'child_care_services', 'childrens_and_infants_wear_stores', 'chiropodists_podiatrists', 'chiropractors', 'cigar_stores_and_stands', 'civic_social_fraternal_associations', 'cleaning_and_maintenance', 'clothing_rental', 'colleges_universities', 'commercial_equipment', 'commercial_footwear', 'commercial_photography_art_and_graphics', 'commuter_transport_and_ferries', 'computer_network_services', 'computer_programming', 'computer_repair', 'computer_software_stores', 'computers_peripherals_and_software', 'concrete_work_services', 'construction_materials', 'consulting_public_relations', 'correspondence_schools', 'cosmetic_stores', 'counseling_services', 'country_clubs', 'courier_services', 'court_costs', 'credit_reporting_agencies', 'cruise_lines', 'dairy_products_stores', 'dance_hall_studios_schools', 'dating_escort_services', 'dentists_orthodontists', 'department_stores', 'detective_agencies', 'digital_goods_applications', 'digital_goods_games', 'digital_goods_large_volume', 'digital_goods_media', 'direct_marketing_catalog_merchant', 'direct_marketing_combination_catalog_and_retail_merchant', 'direct_marketing_inbound_telemarketing', 'direct_marketing_insurance_services', 'direct_marketing_other', 'direct_marketing_outbound_telemarketing', 'direct_marketing_subscription', 'direct_marketing_travel', 'discount_stores', 'doctors', 'door_to_door_sales', 'drapery_window_covering_and_upholstery_stores', 'drinking_places', 'drug_stores_and_pharmacies', 'drugs_drug_proprietaries_and_druggist_sundries', 'dry_cleaners', 'durable_goods', 'duty_free_stores', 'eating_places_restaurants', 'educational_services', 'electric_razor_stores', 'electric_vehicle_charging', 'electrical_parts_and_equipment', 'electrical_services', 'electronics_repair_shops', 'electronics_stores', 'elementary_secondary_schools', 'emergency_services_gcas_visa_use_only', 'employment_temp_agencies', 'equipment_rental', 'exterminating_services', 'family_clothing_stores', 'fast_food_restaurants', 'financial_institutions', 'fines_government_administrative_entities', 'fireplace_fireplace_screens_and_accessories_stores', 'floor_covering_stores', 'florists', 'florists_supplies_nursery_stock_and_flowers', 'freezer_and_locker_meat_provisioners', 'fuel_dealers_non_automotive', 'funeral_services_crematories', 'furniture_home_furnishings_and_equipment_stores_except_appliances', 'furniture_repair_refinishing', 'furriers_and_fur_shops', 'general_services', 'gift_card_novelty_and_souvenir_shops', 'glass_paint_and_wallpaper_stores', 'glassware_crystal_stores', 'golf_courses_public', 'government_licensed_horse_dog_racing_us_region_only', 'government_licensed_online_casions_online_gambling_us_region_only', 'government_owned_lotteries_non_us_region', 'government_owned_lotteries_us_region_only', 'government_services', 'grocery_stores_supermarkets', 'hardware_equipment_and_supplies', 'hardware_stores', 'health_and_beauty_spas', 'hearing_aids_sales_and_supplies', 'heating_plumbing_a_c', 'hobby_toy_and_game_shops', 'home_supply_warehouse_stores', 'hospitals', 'hotels_motels_and_resorts', 'household_appliance_stores', 'industrial_supplies', 'information_retrieval_services', 'insurance_default', 'insurance_underwriting_premiums', 'intra_company_purchases', 'jewelry_stores_watches_clocks_and_silverware_stores', 'landscaping_services', 'laundries', 'laundry_cleaning_services', 'legal_services_attorneys', 'luggage_and_leather_goods_stores', 'lumber_building_materials_stores', 'manual_cash_disburse', 'marinas_service_and_supplies', 'marketplaces', 'masonry_stonework_and_plaster', 'massage_parlors', 'medical_and_dental_labs', 'medical_dental_ophthalmic_and_hospital_equipment_and_supplies', 'medical_services', 'membership_organizations', 'mens_and_boys_clothing_and_accessories_stores', 'mens_womens_clothing_stores', 'metal_service_centers', 'miscellaneous', 'miscellaneous_apparel_and_accessory_shops', 'miscellaneous_auto_dealers', 'miscellaneous_business_services', 'miscellaneous_food_stores', 'miscellaneous_general_merchandise', 'miscellaneous_general_services', 'miscellaneous_home_furnishing_specialty_stores', 'miscellaneous_publishing_and_printing', 'miscellaneous_recreation_services', 'miscellaneous_repair_shops', 'miscellaneous_specialty_retail', 'mobile_home_dealers', 'motion_picture_theaters', 'motor_freight_carriers_and_trucking', 'motor_homes_dealers', 'motor_vehicle_supplies_and_new_parts', 'motorcycle_shops_and_dealers', 'motorcycle_shops_dealers', 'music_stores_musical_instruments_pianos_and_sheet_music', 'news_dealers_and_newsstands', 'non_fi_money_orders', 'non_fi_stored_value_card_purchase_load', 'nondurable_goods', 'nurseries_lawn_and_garden_supply_stores', 'nursing_personal_care', 'office_and_commercial_furniture', 'opticians_eyeglasses', 'optometrists_ophthalmologist', 'orthopedic_goods_prosthetic_devices', 'osteopaths', 'package_stores_beer_wine_and_liquor', 'paints_varnishes_and_supplies', 'parking_lots_garages', 'passenger_railways', 'pawn_shops', 'pet_shops_pet_food_and_supplies', 'petroleum_and_petroleum_products', 'photo_developing', 'photographic_photocopy_microfilm_equipment_and_supplies', 'photographic_studios', 'picture_video_production', 'piece_goods_notions_and_other_dry_goods', 'plumbing_heating_equipment_and_supplies', 'political_organizations', 'postal_services_government_only', 'precious_stones_and_metals_watches_and_jewelry', 'professional_services', 'public_warehousing_and_storage', 'quick_copy_repro_and_blueprint', 'railroads', 'real_estate_agents_and_managers_rentals', 'record_stores', 'recreational_vehicle_rentals', 'religious_goods_stores', 'religious_organizations', 'roofing_siding_sheet_metal', 'secretarial_support_services', 'security_brokers_dealers', 'service_stations', 'sewing_needlework_fabric_and_piece_goods_stores', 'shoe_repair_hat_cleaning', 'shoe_stores', 'small_appliance_repair', 'snowmobile_dealers', 'special_trade_services', 'specialty_cleaning', 'sporting_goods_stores', 'sporting_recreation_camps', 'sports_and_riding_apparel_stores', 'sports_clubs_fields', 'stamp_and_coin_stores', 'stationary_office_supplies_printing_and_writing_paper', 'stationery_stores_office_and_school_supply_stores', 'swimming_pools_sales', 't_ui_travel_germany', 'tailors_alterations', 'tax_payments_government_agencies', 'tax_preparation_services', 'taxicabs_limousines', 'telecommunication_equipment_and_telephone_sales', 'telecommunication_services', 'telegraph_services', 'tent_and_awning_shops', 'testing_laboratories', 'theatrical_ticket_agencies', 'timeshares', 'tire_retreading_and_repair', 'tolls_bridge_fees', 'tourist_attractions_and_exhibits', 'towing_services', 'trailer_parks_campgrounds', 'transportation_services', 'travel_agencies_tour_operators', 'truck_stop_iteration', 'truck_utility_trailer_rentals', 'typesetting_plate_making_and_related_services', 'typewriter_stores', 'u_s_federal_government_agencies_or_departments', 'uniforms_commercial_clothing', 'used_merchandise_and_secondhand_stores', 'utilities', 'variety_stores', 'veterinary_services', 'video_amusement_game_supplies', 'video_game_arcades', 'video_tape_rental_stores', 'vocational_trade_schools', 'watch_jewelry_repair', 'welding_repair', 'wholesale_clubs', 'wig_and_toupee_stores', 'wires_money_orders', 'womens_accessory_and_specialty_shops', 'womens_ready_to_wear_stores', 'wrecking_and_salvage_yards'])),
'blocked_merchant_countries': z.array(z.string()),
'spending_limits': z.array(IssuingCardSpendingLimit),
'spending_limits_currency': z.string()
});

export type IssuingCardAuthorizationControlsModel = z.infer<typeof IssuingCardAuthorizationControls>;

export const IssuingCardApplePay = z.object({
'eligible': z.boolean(),
'ineligible_reason': z.enum(['missing_agreement', 'missing_cardholder_contact', 'unsupported_region'])
});

export type IssuingCardApplePayModel = z.infer<typeof IssuingCardApplePay>;

export const IssuingCardGooglePay = z.object({
'eligible': z.boolean(),
'ineligible_reason': z.enum(['missing_agreement', 'missing_cardholder_contact', 'unsupported_region'])
});

export type IssuingCardGooglePayModel = z.infer<typeof IssuingCardGooglePay>;

export const IssuingCardWallets = z.object({
'apple_pay': IssuingCardApplePay,
'google_pay': IssuingCardGooglePay,
'primary_account_identifier': z.string()
});

export type IssuingCardWalletsModel = z.infer<typeof IssuingCardWallets>;

export const IssuingCard: z.ZodType<IssuingCardModel> = z.object({
'brand': z.string(),
'cancellation_reason': z.enum(['design_rejected', 'lost', 'stolen']),
'cardholder': IssuingCardholder,
'created': z.number().int(),
'currency': z.string(),
'cvc': z.string().optional(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'financial_account': z.string().optional(),
'id': z.string(),
'last4': z.string(),
'latest_fraud_warning': z.union([IssuingCardFraudWarning]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'number': z.string().optional(),
'object': z.enum(['issuing.card']),
'personalization_design': z.union([z.string(), IssuingPersonalizationDesign]),
'replaced_by': z.union([z.string(), z.lazy(() => IssuingCard)]),
'replacement_for': z.union([z.string(), z.lazy(() => IssuingCard)]),
'replacement_reason': z.enum(['damaged', 'expired', 'lost', 'stolen']),
'second_line': z.string(),
'shipping': z.union([IssuingCardShipping]),
'spending_controls': IssuingCardAuthorizationControls,
'status': z.enum(['active', 'canceled', 'inactive']),
'type': z.enum(['physical', 'virtual']),
'wallets': z.union([IssuingCardWallets])
});

export const IssuingAuthorizationFleetCardholderPromptData = z.object({
'alphanumeric_id': z.string(),
'driver_id': z.string(),
'odometer': z.number().int(),
'unspecified_id': z.string(),
'user_id': z.string(),
'vehicle_number': z.string()
});

export type IssuingAuthorizationFleetCardholderPromptDataModel = z.infer<typeof IssuingAuthorizationFleetCardholderPromptData>;

export const IssuingAuthorizationFleetFuelPriceData = z.object({
'gross_amount_decimal': z.string()
});

export type IssuingAuthorizationFleetFuelPriceDataModel = z.infer<typeof IssuingAuthorizationFleetFuelPriceData>;

export const IssuingAuthorizationFleetNonFuelPriceData = z.object({
'gross_amount_decimal': z.string()
});

export type IssuingAuthorizationFleetNonFuelPriceDataModel = z.infer<typeof IssuingAuthorizationFleetNonFuelPriceData>;

export const IssuingAuthorizationFleetTaxData = z.object({
'local_amount_decimal': z.string(),
'national_amount_decimal': z.string()
});

export type IssuingAuthorizationFleetTaxDataModel = z.infer<typeof IssuingAuthorizationFleetTaxData>;

export const IssuingAuthorizationFleetReportedBreakdown = z.object({
'fuel': z.union([IssuingAuthorizationFleetFuelPriceData]),
'non_fuel': z.union([IssuingAuthorizationFleetNonFuelPriceData]),
'tax': z.union([IssuingAuthorizationFleetTaxData])
});

export type IssuingAuthorizationFleetReportedBreakdownModel = z.infer<typeof IssuingAuthorizationFleetReportedBreakdown>;

export const IssuingAuthorizationFleetData = z.object({
'cardholder_prompt_data': z.union([IssuingAuthorizationFleetCardholderPromptData]),
'purchase_type': z.enum(['fuel_and_non_fuel_purchase', 'fuel_purchase', 'non_fuel_purchase']),
'reported_breakdown': z.union([IssuingAuthorizationFleetReportedBreakdown]),
'service_type': z.enum(['full_service', 'non_fuel_transaction', 'self_service'])
});

export type IssuingAuthorizationFleetDataModel = z.infer<typeof IssuingAuthorizationFleetData>;

export const IssuingAuthorizationFraudChallenge = z.object({
'channel': z.enum(['sms']),
'status': z.enum(['expired', 'pending', 'rejected', 'undeliverable', 'verified']),
'undeliverable_reason': z.enum(['no_phone_number', 'unsupported_phone_number'])
});

export type IssuingAuthorizationFraudChallengeModel = z.infer<typeof IssuingAuthorizationFraudChallenge>;

export const IssuingAuthorizationFuelData = z.object({
'industry_product_code': z.string(),
'quantity_decimal': z.string(),
'type': z.enum(['diesel', 'other', 'unleaded_plus', 'unleaded_regular', 'unleaded_super']),
'unit': z.enum(['charging_minute', 'imperial_gallon', 'kilogram', 'kilowatt_hour', 'liter', 'other', 'pound', 'us_gallon']),
'unit_cost_decimal': z.string()
});

export type IssuingAuthorizationFuelDataModel = z.infer<typeof IssuingAuthorizationFuelData>;

export const IssuingAuthorizationMerchantData = z.object({
'category': z.string(),
'category_code': z.string(),
'city': z.string(),
'country': z.string(),
'name': z.string(),
'network_id': z.string(),
'postal_code': z.string(),
'state': z.string(),
'tax_id': z.string(),
'terminal_id': z.string(),
'url': z.string()
});

export type IssuingAuthorizationMerchantDataModel = z.infer<typeof IssuingAuthorizationMerchantData>;

export const IssuingAuthorizationNetworkData = z.object({
'acquiring_institution_id': z.string(),
'system_trace_audit_number': z.string(),
'transaction_id': z.string()
});

export type IssuingAuthorizationNetworkDataModel = z.infer<typeof IssuingAuthorizationNetworkData>;

export const IssuingAuthorizationPendingRequest = z.object({
'amount': z.number().int(),
'amount_details': z.union([IssuingAuthorizationAmountDetails]),
'currency': z.string(),
'is_amount_controllable': z.boolean(),
'merchant_amount': z.number().int(),
'merchant_currency': z.string(),
'network_risk_score': z.number().int()
});

export type IssuingAuthorizationPendingRequestModel = z.infer<typeof IssuingAuthorizationPendingRequest>;

export const IssuingAuthorizationRequest_1 = z.object({
'amount': z.number().int(),
'amount_details': z.union([IssuingAuthorizationAmountDetails]),
'approved': z.boolean(),
'authorization_code': z.string(),
'created': z.number().int(),
'currency': z.string(),
'merchant_amount': z.number().int(),
'merchant_currency': z.string(),
'network_risk_score': z.number().int(),
'reason': z.enum(['account_disabled', 'card_active', 'card_canceled', 'card_expired', 'card_inactive', 'cardholder_blocked', 'cardholder_inactive', 'cardholder_verification_required', 'insecure_authorization_method', 'insufficient_funds', 'network_fallback', 'not_allowed', 'pin_blocked', 'spending_controls', 'suspected_fraud', 'verification_failed', 'webhook_approved', 'webhook_declined', 'webhook_error', 'webhook_timeout']),
'reason_message': z.string(),
'requested_at': z.number().int()
});

export type IssuingAuthorizationRequest_1Model = z.infer<typeof IssuingAuthorizationRequest_1>;

export const IssuingNetworkTokenDevice = z.object({
'device_fingerprint': z.string().optional(),
'ip_address': z.string().optional(),
'location': z.string().optional(),
'name': z.string().optional(),
'phone_number': z.string().optional(),
'type': z.enum(['other', 'phone', 'watch']).optional()
});

export type IssuingNetworkTokenDeviceModel = z.infer<typeof IssuingNetworkTokenDevice>;

export const IssuingNetworkTokenMastercard = z.object({
'card_reference_id': z.string().optional(),
'token_reference_id': z.string(),
'token_requestor_id': z.string(),
'token_requestor_name': z.string().optional()
});

export type IssuingNetworkTokenMastercardModel = z.infer<typeof IssuingNetworkTokenMastercard>;

export const IssuingNetworkTokenVisa = z.object({
'card_reference_id': z.string(),
'token_reference_id': z.string(),
'token_requestor_id': z.string(),
'token_risk_score': z.string().optional()
});

export type IssuingNetworkTokenVisaModel = z.infer<typeof IssuingNetworkTokenVisa>;

export const IssuingNetworkTokenAddress = z.object({
'line1': z.string(),
'postal_code': z.string()
});

export type IssuingNetworkTokenAddressModel = z.infer<typeof IssuingNetworkTokenAddress>;

export const IssuingNetworkTokenWalletProvider = z.object({
'account_id': z.string().optional(),
'account_trust_score': z.number().int().optional(),
'card_number_source': z.enum(['app', 'manual', 'on_file', 'other']).optional(),
'cardholder_address': IssuingNetworkTokenAddress.optional(),
'cardholder_name': z.string().optional(),
'device_trust_score': z.number().int().optional(),
'hashed_account_email_address': z.string().optional(),
'reason_codes': z.array(z.enum(['account_card_too_new', 'account_recently_changed', 'account_too_new', 'account_too_new_since_launch', 'additional_device', 'data_expired', 'defer_id_v_decision', 'device_recently_lost', 'good_activity_history', 'has_suspended_tokens', 'high_risk', 'inactive_account', 'long_account_tenure', 'low_account_score', 'low_device_score', 'low_phone_number_score', 'network_service_error', 'outside_home_territory', 'provisioning_cardholder_mismatch', 'provisioning_device_and_cardholder_mismatch', 'provisioning_device_mismatch', 'same_device_no_prior_authentication', 'same_device_successful_prior_authentication', 'software_update', 'suspicious_activity', 'too_many_different_cardholders', 'too_many_recent_attempts', 'too_many_recent_tokens'])).optional(),
'suggested_decision': z.enum(['approve', 'decline', 'require_auth']).optional(),
'suggested_decision_version': z.string().optional()
});

export type IssuingNetworkTokenWalletProviderModel = z.infer<typeof IssuingNetworkTokenWalletProvider>;

export const IssuingNetworkTokenNetworkData = z.object({
'device': IssuingNetworkTokenDevice.optional(),
'mastercard': IssuingNetworkTokenMastercard.optional(),
'type': z.enum(['mastercard', 'visa']),
'visa': IssuingNetworkTokenVisa.optional(),
'wallet_provider': IssuingNetworkTokenWalletProvider.optional()
});

export type IssuingNetworkTokenNetworkDataModel = z.infer<typeof IssuingNetworkTokenNetworkData>;

export const IssuingToken = z.object({
'card': z.union([z.string(), z.lazy(() => IssuingCard)]),
'created': z.number().int(),
'device_fingerprint': z.string(),
'id': z.string(),
'last4': z.string().optional(),
'livemode': z.boolean(),
'network': z.enum(['mastercard', 'visa']),
'network_data': IssuingNetworkTokenNetworkData.optional(),
'network_updated_at': z.number().int(),
'object': z.enum(['issuing.token']),
'status': z.enum(['active', 'deleted', 'requested', 'suspended']),
'wallet_provider': z.enum(['apple_pay', 'google_pay', 'samsung_pay']).optional()
});

export type IssuingTokenModel = z.infer<typeof IssuingToken>;

export const IssuingTransactionAmountDetails = z.object({
'atm_fee': z.number().int(),
'cashback_amount': z.number().int()
});

export type IssuingTransactionAmountDetailsModel = z.infer<typeof IssuingTransactionAmountDetails>;

export const IssuingDisputeCanceledEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'canceled_at': z.number().int(),
'cancellation_policy_provided': z.boolean(),
'cancellation_reason': z.string(),
'expected_at': z.number().int(),
'explanation': z.string(),
'product_description': z.string(),
'product_type': z.enum(['merchandise', 'service']),
'return_status': z.enum(['merchant_rejected', 'successful']),
'returned_at': z.number().int()
});

export type IssuingDisputeCanceledEvidenceModel = z.infer<typeof IssuingDisputeCanceledEvidence>;

export const IssuingDisputeDuplicateEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'card_statement': z.union([z.string(), z.lazy(() => File)]),
'cash_receipt': z.union([z.string(), z.lazy(() => File)]),
'check_image': z.union([z.string(), z.lazy(() => File)]),
'explanation': z.string(),
'original_transaction': z.string()
});

export type IssuingDisputeDuplicateEvidenceModel = z.infer<typeof IssuingDisputeDuplicateEvidence>;

export const IssuingDisputeFraudulentEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'explanation': z.string()
});

export type IssuingDisputeFraudulentEvidenceModel = z.infer<typeof IssuingDisputeFraudulentEvidence>;

export const IssuingDisputeMerchandiseNotAsDescribedEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'explanation': z.string(),
'received_at': z.number().int(),
'return_description': z.string(),
'return_status': z.enum(['merchant_rejected', 'successful']),
'returned_at': z.number().int()
});

export type IssuingDisputeMerchandiseNotAsDescribedEvidenceModel = z.infer<typeof IssuingDisputeMerchandiseNotAsDescribedEvidence>;

export const IssuingDisputeNoValidAuthorizationEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'explanation': z.string()
});

export type IssuingDisputeNoValidAuthorizationEvidenceModel = z.infer<typeof IssuingDisputeNoValidAuthorizationEvidence>;

export const IssuingDisputeNotReceivedEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'expected_at': z.number().int(),
'explanation': z.string(),
'product_description': z.string(),
'product_type': z.enum(['merchandise', 'service'])
});

export type IssuingDisputeNotReceivedEvidenceModel = z.infer<typeof IssuingDisputeNotReceivedEvidence>;

export const IssuingDisputeOtherEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'explanation': z.string(),
'product_description': z.string(),
'product_type': z.enum(['merchandise', 'service'])
});

export type IssuingDisputeOtherEvidenceModel = z.infer<typeof IssuingDisputeOtherEvidence>;

export const IssuingDisputeServiceNotAsDescribedEvidence = z.object({
'additional_documentation': z.union([z.string(), z.lazy(() => File)]),
'canceled_at': z.number().int(),
'cancellation_reason': z.string(),
'explanation': z.string(),
'received_at': z.number().int()
});

export type IssuingDisputeServiceNotAsDescribedEvidenceModel = z.infer<typeof IssuingDisputeServiceNotAsDescribedEvidence>;

export const IssuingDisputeEvidence = z.object({
'canceled': IssuingDisputeCanceledEvidence.optional(),
'duplicate': IssuingDisputeDuplicateEvidence.optional(),
'fraudulent': IssuingDisputeFraudulentEvidence.optional(),
'merchandise_not_as_described': IssuingDisputeMerchandiseNotAsDescribedEvidence.optional(),
'no_valid_authorization': IssuingDisputeNoValidAuthorizationEvidence.optional(),
'not_received': IssuingDisputeNotReceivedEvidence.optional(),
'other': IssuingDisputeOtherEvidence.optional(),
'reason': z.enum(['canceled', 'duplicate', 'fraudulent', 'merchandise_not_as_described', 'no_valid_authorization', 'not_received', 'other', 'service_not_as_described']),
'service_not_as_described': IssuingDisputeServiceNotAsDescribedEvidence.optional()
});

export type IssuingDisputeEvidenceModel = z.infer<typeof IssuingDisputeEvidence>;

export const IssuingDisputeTreasury = z.object({
'debit_reversal': z.string(),
'received_debit': z.string()
});

export type IssuingDisputeTreasuryModel = z.infer<typeof IssuingDisputeTreasury>;

export const IssuingDispute: z.ZodType<IssuingDisputeModel> = z.object({
'amount': z.number().int(),
'balance_transactions': z.array(z.lazy(() => BalanceTransaction)).optional(),
'created': z.number().int(),
'currency': z.string(),
'evidence': IssuingDisputeEvidence,
'id': z.string(),
'livemode': z.boolean(),
'loss_reason': z.enum(['cardholder_authentication_issuer_liability', 'eci5_token_transaction_with_tavv', 'excess_disputes_in_timeframe', 'has_not_met_the_minimum_dispute_amount_requirements', 'invalid_duplicate_dispute', 'invalid_incorrect_amount_dispute', 'invalid_no_authorization', 'invalid_use_of_disputes', 'merchandise_delivered_or_shipped', 'merchandise_or_service_as_described', 'not_cancelled', 'other', 'refund_issued', 'submitted_beyond_allowable_time_limit', 'transaction_3ds_required', 'transaction_approved_after_prior_fraud_dispute', 'transaction_authorized', 'transaction_electronically_read', 'transaction_qualifies_for_visa_easy_payment_service', 'transaction_unattended']).optional(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['issuing.dispute']),
'status': z.enum(['expired', 'lost', 'submitted', 'unsubmitted', 'won']),
'transaction': z.union([z.string(), z.lazy(() => IssuingTransaction)]),
'treasury': z.union([IssuingDisputeTreasury]).optional()
});

export const IssuingTransactionNetworkData = z.object({
'authorization_code': z.string(),
'processing_date': z.string(),
'transaction_id': z.string()
});

export type IssuingTransactionNetworkDataModel = z.infer<typeof IssuingTransactionNetworkData>;

export const IssuingTransactionFleetCardholderPromptData = z.object({
'driver_id': z.string(),
'odometer': z.number().int(),
'unspecified_id': z.string(),
'user_id': z.string(),
'vehicle_number': z.string()
});

export type IssuingTransactionFleetCardholderPromptDataModel = z.infer<typeof IssuingTransactionFleetCardholderPromptData>;

export const IssuingTransactionFleetFuelPriceData = z.object({
'gross_amount_decimal': z.string()
});

export type IssuingTransactionFleetFuelPriceDataModel = z.infer<typeof IssuingTransactionFleetFuelPriceData>;

export const IssuingTransactionFleetNonFuelPriceData = z.object({
'gross_amount_decimal': z.string()
});

export type IssuingTransactionFleetNonFuelPriceDataModel = z.infer<typeof IssuingTransactionFleetNonFuelPriceData>;

export const IssuingTransactionFleetTaxData = z.object({
'local_amount_decimal': z.string(),
'national_amount_decimal': z.string()
});

export type IssuingTransactionFleetTaxDataModel = z.infer<typeof IssuingTransactionFleetTaxData>;

export const IssuingTransactionFleetReportedBreakdown = z.object({
'fuel': z.union([IssuingTransactionFleetFuelPriceData]),
'non_fuel': z.union([IssuingTransactionFleetNonFuelPriceData]),
'tax': z.union([IssuingTransactionFleetTaxData])
});

export type IssuingTransactionFleetReportedBreakdownModel = z.infer<typeof IssuingTransactionFleetReportedBreakdown>;

export const IssuingTransactionFleetData = z.object({
'cardholder_prompt_data': z.union([IssuingTransactionFleetCardholderPromptData]),
'purchase_type': z.string(),
'reported_breakdown': z.union([IssuingTransactionFleetReportedBreakdown]),
'service_type': z.string()
});

export type IssuingTransactionFleetDataModel = z.infer<typeof IssuingTransactionFleetData>;

export const IssuingTransactionFlightDataLeg = z.object({
'arrival_airport_code': z.string(),
'carrier': z.string(),
'departure_airport_code': z.string(),
'flight_number': z.string(),
'service_class': z.string(),
'stopover_allowed': z.boolean()
});

export type IssuingTransactionFlightDataLegModel = z.infer<typeof IssuingTransactionFlightDataLeg>;

export const IssuingTransactionFlightData = z.object({
'departure_at': z.number().int(),
'passenger_name': z.string(),
'refundable': z.boolean(),
'segments': z.array(IssuingTransactionFlightDataLeg),
'travel_agency': z.string()
});

export type IssuingTransactionFlightDataModel = z.infer<typeof IssuingTransactionFlightData>;

export const IssuingTransactionFuelData = z.object({
'industry_product_code': z.string(),
'quantity_decimal': z.string(),
'type': z.string(),
'unit': z.string(),
'unit_cost_decimal': z.string()
});

export type IssuingTransactionFuelDataModel = z.infer<typeof IssuingTransactionFuelData>;

export const IssuingTransactionLodgingData = z.object({
'check_in_at': z.number().int(),
'nights': z.number().int()
});

export type IssuingTransactionLodgingDataModel = z.infer<typeof IssuingTransactionLodgingData>;

export const IssuingTransactionReceiptData = z.object({
'description': z.string(),
'quantity': z.number(),
'total': z.number().int(),
'unit_cost': z.number().int()
});

export type IssuingTransactionReceiptDataModel = z.infer<typeof IssuingTransactionReceiptData>;

export const IssuingTransactionPurchaseDetails = z.object({
'fleet': z.union([IssuingTransactionFleetData]),
'flight': z.union([IssuingTransactionFlightData]),
'fuel': z.union([IssuingTransactionFuelData]),
'lodging': z.union([IssuingTransactionLodgingData]),
'receipt': z.array(IssuingTransactionReceiptData),
'reference': z.string()
});

export type IssuingTransactionPurchaseDetailsModel = z.infer<typeof IssuingTransactionPurchaseDetails>;

export const IssuingTransactionTreasury = z.object({
'received_credit': z.string(),
'received_debit': z.string()
});

export type IssuingTransactionTreasuryModel = z.infer<typeof IssuingTransactionTreasury>;

export const IssuingTransaction: z.ZodType<IssuingTransactionModel> = z.object({
'amount': z.number().int(),
'amount_details': z.union([IssuingTransactionAmountDetails]),
'authorization': z.union([z.string(), z.lazy(() => IssuingAuthorization)]),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'card': z.union([z.string(), z.lazy(() => IssuingCard)]),
'cardholder': z.union([z.string(), IssuingCardholder]),
'created': z.number().int(),
'currency': z.string(),
'dispute': z.union([z.string(), z.lazy(() => IssuingDispute)]),
'id': z.string(),
'livemode': z.boolean(),
'merchant_amount': z.number().int(),
'merchant_currency': z.string(),
'merchant_data': IssuingAuthorizationMerchantData,
'metadata': z.record(z.string(), z.string()),
'network_data': z.union([IssuingTransactionNetworkData]),
'object': z.enum(['issuing.transaction']),
'purchase_details': z.union([IssuingTransactionPurchaseDetails]).optional(),
'token': z.union([z.string(), IssuingToken]).optional(),
'treasury': z.union([IssuingTransactionTreasury]).optional(),
'type': z.enum(['capture', 'refund']),
'wallet': z.enum(['apple_pay', 'google_pay', 'samsung_pay'])
});

export const IssuingAuthorizationTreasury = z.object({
'received_credits': z.array(z.string()),
'received_debits': z.array(z.string()),
'transaction': z.string()
});

export type IssuingAuthorizationTreasuryModel = z.infer<typeof IssuingAuthorizationTreasury>;

export const IssuingAuthorizationAuthenticationExemption = z.object({
'claimed_by': z.enum(['acquirer', 'issuer']),
'type': z.enum(['low_value_transaction', 'transaction_risk_analysis', 'unknown'])
});

export type IssuingAuthorizationAuthenticationExemptionModel = z.infer<typeof IssuingAuthorizationAuthenticationExemption>;

export const IssuingAuthorizationThreeDSecure = z.object({
'result': z.enum(['attempt_acknowledged', 'authenticated', 'failed', 'required'])
});

export type IssuingAuthorizationThreeDSecureModel = z.infer<typeof IssuingAuthorizationThreeDSecure>;

export const IssuingAuthorizationVerificationData = z.object({
'address_line1_check': z.enum(['match', 'mismatch', 'not_provided']),
'address_postal_code_check': z.enum(['match', 'mismatch', 'not_provided']),
'authentication_exemption': z.union([IssuingAuthorizationAuthenticationExemption]),
'cvc_check': z.enum(['match', 'mismatch', 'not_provided']),
'expiry_check': z.enum(['match', 'mismatch', 'not_provided']),
'postal_code': z.string(),
'three_d_secure': z.union([IssuingAuthorizationThreeDSecure])
});

export type IssuingAuthorizationVerificationDataModel = z.infer<typeof IssuingAuthorizationVerificationData>;

export const IssuingAuthorization: z.ZodType<IssuingAuthorizationModel> = z.object({
'amount': z.number().int(),
'amount_details': z.union([IssuingAuthorizationAmountDetails]),
'approved': z.boolean(),
'authorization_method': z.enum(['chip', 'contactless', 'keyed_in', 'online', 'swipe']),
'balance_transactions': z.array(z.lazy(() => BalanceTransaction)),
'card': z.lazy(() => IssuingCard),
'cardholder': z.union([z.string(), IssuingCardholder]),
'created': z.number().int(),
'currency': z.string(),
'fleet': z.union([IssuingAuthorizationFleetData]),
'fraud_challenges': z.array(IssuingAuthorizationFraudChallenge).optional(),
'fuel': z.union([IssuingAuthorizationFuelData]),
'id': z.string(),
'livemode': z.boolean(),
'merchant_amount': z.number().int(),
'merchant_currency': z.string(),
'merchant_data': IssuingAuthorizationMerchantData,
'metadata': z.record(z.string(), z.string()),
'network_data': z.union([IssuingAuthorizationNetworkData]),
'object': z.enum(['issuing.authorization']),
'pending_request': z.union([IssuingAuthorizationPendingRequest]),
'request_history': z.array(IssuingAuthorizationRequest_1),
'status': z.enum(['closed', 'expired', 'pending', 'reversed']),
'token': z.union([z.string(), IssuingToken]).optional(),
'transactions': z.array(z.lazy(() => IssuingTransaction)),
'treasury': z.union([IssuingAuthorizationTreasury]).optional(),
'verification_data': IssuingAuthorizationVerificationData,
'verified_by_fraud_challenge': z.boolean(),
'wallet': z.string()
});

export const DeletedBankAccount = z.object({
'currency': z.string().optional(),
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['bank_account'])
});

export type DeletedBankAccountModel = z.infer<typeof DeletedBankAccount>;

export const DeletedCard = z.object({
'currency': z.string().optional(),
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['card'])
});

export type DeletedCardModel = z.infer<typeof DeletedCard>;

export const DeletedExternalAccount = z.union([DeletedBankAccount, DeletedCard]);

export type DeletedExternalAccountModel = z.infer<typeof DeletedExternalAccount>;

export const PayoutsTraceId = z.object({
'status': z.string(),
'value': z.string()
});

export type PayoutsTraceIdModel = z.infer<typeof PayoutsTraceId>;

export const Payout: z.ZodType<PayoutModel> = z.object({
'amount': z.number().int(),
'application_fee': z.union([z.string(), z.lazy(() => ApplicationFee)]),
'application_fee_amount': z.number().int(),
'arrival_date': z.number().int(),
'automatic': z.boolean(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'destination': z.union([z.string(), z.lazy(() => ExternalAccount), DeletedExternalAccount]),
'failure_balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'failure_code': z.string(),
'failure_message': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'method': z.string(),
'object': z.enum(['payout']),
'original_payout': z.union([z.string(), z.lazy(() => Payout)]),
'payout_method': z.string(),
'reconciliation_status': z.enum(['completed', 'in_progress', 'not_applicable']),
'reversed_by': z.union([z.string(), z.lazy(() => Payout)]),
'source_type': z.string(),
'statement_descriptor': z.string(),
'status': z.string(),
'trace_id': z.union([PayoutsTraceId]),
'type': z.enum(['bank_account', 'card'])
});

export const ReserveTransaction = z.object({
'amount': z.number().int(),
'currency': z.string(),
'description': z.string(),
'id': z.string(),
'object': z.enum(['reserve_transaction'])
});

export type ReserveTransactionModel = z.infer<typeof ReserveTransaction>;

export const TaxDeductedAtSource = z.object({
'id': z.string(),
'object': z.enum(['tax_deducted_at_source']),
'period_end': z.number().int(),
'period_start': z.number().int(),
'tax_deduction_account_number': z.string()
});

export type TaxDeductedAtSourceModel = z.infer<typeof TaxDeductedAtSource>;

export const Topup: z.ZodType<TopupModel> = z.object({
'amount': z.number().int(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'expected_availability_date': z.number().int(),
'failure_code': z.string(),
'failure_message': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['topup']),
'source': z.union([Source]),
'statement_descriptor': z.string(),
'status': z.enum(['canceled', 'failed', 'pending', 'reversed', 'succeeded']),
'transfer_group': z.string()
});

export const BalanceTransactionSource: z.ZodType<BalanceTransactionSourceModel> = z.union([z.lazy(() => ApplicationFee), z.lazy(() => Charge), z.lazy(() => ConnectCollectionTransfer), z.lazy(() => CustomerCashBalanceTransaction), z.lazy(() => Dispute), z.lazy(() => FeeRefund), z.lazy(() => IssuingAuthorization), z.lazy(() => IssuingDispute), z.lazy(() => IssuingTransaction), z.lazy(() => Payout), z.lazy(() => Refund), ReserveTransaction, TaxDeductedAtSource, z.lazy(() => Topup), z.lazy(() => Transfer), z.lazy(() => TransferReversal)]);

export const BalanceTransaction: z.ZodType<BalanceTransactionModel> = z.object({
'amount': z.number().int(),
'available_on': z.number().int(),
'balance_type': z.enum(['issuing', 'payments', 'refund_and_dispute_prefunding']).optional(),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'exchange_rate': z.number(),
'fee': z.number().int(),
'fee_details': z.array(Fee),
'id': z.string(),
'net': z.number().int(),
'object': z.enum(['balance_transaction']),
'reporting_category': z.string(),
'source': z.union([z.string(), z.lazy(() => BalanceTransactionSource)]),
'status': z.string(),
'type': z.enum(['adjustment', 'advance', 'advance_funding', 'anticipation_repayment', 'application_fee', 'application_fee_refund', 'charge', 'climate_order_purchase', 'climate_order_refund', 'connect_collection_transfer', 'contribution', 'issuing_authorization_hold', 'issuing_authorization_release', 'issuing_dispute', 'issuing_transaction', 'obligation_outbound', 'obligation_reversal_inbound', 'payment', 'payment_failure_refund', 'payment_network_reserve_hold', 'payment_network_reserve_release', 'payment_refund', 'payment_reversal', 'payment_unreconciled', 'payout', 'payout_cancel', 'payout_failure', 'payout_minimum_balance_hold', 'payout_minimum_balance_release', 'refund', 'refund_failure', 'reserve_transaction', 'reserved_funds', 'stripe_balance_payment_debit', 'stripe_balance_payment_debit_reversal', 'stripe_fee', 'stripe_fx_fee', 'tax_fee', 'topup', 'topup_reversal', 'transfer', 'transfer_cancel', 'transfer_failure', 'transfer_refund'])
});

export const PlatformEarningFeeSource = z.object({
'charge': z.string().optional(),
'payout': z.string().optional(),
'type': z.enum(['charge', 'payout'])
});

export type PlatformEarningFeeSourceModel = z.infer<typeof PlatformEarningFeeSource>;

export const ApplicationFee: z.ZodType<ApplicationFeeModel> = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]),
'amount': z.number().int(),
'amount_refunded': z.number().int(),
'application': z.union([z.string(), Application]),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'created': z.number().int(),
'currency': z.string(),
'fee_source': z.union([PlatformEarningFeeSource]),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['application_fee']),
'originating_transaction': z.union([z.string(), z.lazy(() => Charge)]),
'refunded': z.boolean(),
'refunds': z.object({
'data': z.array(z.lazy(() => FeeRefund)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
})
});

export const ChargeFraudDetails = z.object({
'stripe_report': z.string().optional(),
'user_report': z.string().optional()
});

export type ChargeFraudDetailsModel = z.infer<typeof ChargeFraudDetails>;

export const Level3LineItems = z.object({
'discount_amount': z.number().int(),
'product_code': z.string(),
'product_description': z.string(),
'quantity': z.number().int(),
'tax_amount': z.number().int(),
'unit_cost': z.number().int()
});

export type Level3LineItemsModel = z.infer<typeof Level3LineItems>;

export const Level3 = z.object({
'customer_reference': z.string().optional(),
'line_items': z.array(Level3LineItems),
'merchant_reference': z.string(),
'shipping_address_zip': z.string().optional(),
'shipping_amount': z.number().int().optional(),
'shipping_from_zip': z.string().optional()
});

export type Level3Model = z.infer<typeof Level3>;

export const Rule = z.object({
'action': z.string(),
'id': z.string(),
'predicate': z.string()
});

export type RuleModel = z.infer<typeof Rule>;

export const ChargeOutcome = z.object({
'advice_code': z.enum(['confirm_card_data', 'do_not_try_again', 'try_again_later']),
'network_advice_code': z.string(),
'network_decline_code': z.string(),
'network_status': z.string(),
'reason': z.string(),
'risk_level': z.string().optional(),
'risk_score': z.number().int().optional(),
'rule': z.union([z.string(), Rule]).optional(),
'seller_message': z.string(),
'type': z.string()
});

export type ChargeOutcomeModel = z.infer<typeof ChargeOutcome>;

export const PaymentMethodDetailsAchCreditTransfer = z.object({
'account_number': z.string(),
'bank_name': z.string(),
'routing_number': z.string(),
'swift_code': z.string()
});

export type PaymentMethodDetailsAchCreditTransferModel = z.infer<typeof PaymentMethodDetailsAchCreditTransfer>;

export const PaymentMethodDetailsAchDebit = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'bank_name': z.string(),
'country': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'routing_number': z.string()
});

export type PaymentMethodDetailsAchDebitModel = z.infer<typeof PaymentMethodDetailsAchDebit>;

export const PaymentMethodDetailsAcssDebit = z.object({
'bank_name': z.string(),
'fingerprint': z.string(),
'institution_number': z.string(),
'last4': z.string(),
'mandate': z.string().optional(),
'transit_number': z.string()
});

export type PaymentMethodDetailsAcssDebitModel = z.infer<typeof PaymentMethodDetailsAcssDebit>;

export const PaymentMethodDetailsAffirm = z.object({
'location': z.string().optional(),
'reader': z.string().optional(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsAffirmModel = z.infer<typeof PaymentMethodDetailsAffirm>;

export const PaymentMethodDetailsAfterpayClearpay = z.object({
'order_id': z.string(),
'reference': z.string()
});

export type PaymentMethodDetailsAfterpayClearpayModel = z.infer<typeof PaymentMethodDetailsAfterpayClearpay>;

export const PaymentFlowsPrivatePaymentMethodsAlipayDetails = z.object({
'buyer_id': z.string().optional(),
'fingerprint': z.string(),
'transaction_id': z.string()
});

export type PaymentFlowsPrivatePaymentMethodsAlipayDetailsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsAlipayDetails>;

export const AlmaInstallments = z.object({
'count': z.number().int()
});

export type AlmaInstallmentsModel = z.infer<typeof AlmaInstallments>;

export const PaymentMethodDetailsAlma = z.object({
'installments': AlmaInstallments.optional(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsAlmaModel = z.infer<typeof PaymentMethodDetailsAlma>;

export const PaymentMethodDetailsPassthroughCard = z.object({
'brand': z.string(),
'country': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'funding': z.string(),
'last4': z.string()
});

export type PaymentMethodDetailsPassthroughCardModel = z.infer<typeof PaymentMethodDetailsPassthroughCard>;

export const AmazonPayUnderlyingPaymentMethodFundingDetails = z.object({
'card': PaymentMethodDetailsPassthroughCard.optional(),
'type': z.enum(['card'])
});

export type AmazonPayUnderlyingPaymentMethodFundingDetailsModel = z.infer<typeof AmazonPayUnderlyingPaymentMethodFundingDetails>;

export const PaymentMethodDetailsAmazonPay = z.object({
'funding': AmazonPayUnderlyingPaymentMethodFundingDetails.optional(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsAmazonPayModel = z.infer<typeof PaymentMethodDetailsAmazonPay>;

export const PaymentMethodDetailsAuBecsDebit = z.object({
'bsb_number': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.string().optional()
});

export type PaymentMethodDetailsAuBecsDebitModel = z.infer<typeof PaymentMethodDetailsAuBecsDebit>;

export const PaymentMethodDetailsBacsDebit = z.object({
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.string(),
'sort_code': z.string()
});

export type PaymentMethodDetailsBacsDebitModel = z.infer<typeof PaymentMethodDetailsBacsDebit>;

export const PaymentMethodDetailsBancontact: z.ZodType<PaymentMethodDetailsBancontactModel> = z.object({
'bank_code': z.string(),
'bank_name': z.string(),
'bic': z.string(),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'preferred_language': z.enum(['de', 'en', 'fr', 'nl']),
'verified_name': z.string()
});

export const PaymentMethodDetailsBillie = z.object({
'transaction_id': z.string()
});

export type PaymentMethodDetailsBillieModel = z.infer<typeof PaymentMethodDetailsBillie>;

export const PaymentMethodDetailsBlik = z.object({
'buyer_id': z.string()
});

export type PaymentMethodDetailsBlikModel = z.infer<typeof PaymentMethodDetailsBlik>;

export const PaymentMethodDetailsBoleto = z.object({
'tax_id': z.string()
});

export type PaymentMethodDetailsBoletoModel = z.infer<typeof PaymentMethodDetailsBoleto>;

export const PaymentMethodDetailsCardChecks = z.object({
'address_line1_check': z.string(),
'address_postal_code_check': z.string(),
'cvc_check': z.string()
});

export type PaymentMethodDetailsCardChecksModel = z.infer<typeof PaymentMethodDetailsCardChecks>;

export const PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesExtendedAuthorizationExtendedAuthorization = z.object({
'status': z.enum(['disabled', 'enabled'])
});

export type PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesExtendedAuthorizationExtendedAuthorizationModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesExtendedAuthorizationExtendedAuthorization>;

export const PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesIncrementalAuthorizationIncrementalAuthorization = z.object({
'status': z.enum(['available', 'unavailable'])
});

export type PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesIncrementalAuthorizationIncrementalAuthorizationModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesIncrementalAuthorizationIncrementalAuthorization>;

export const PaymentMethodDetailsCardInstallmentsPlan = z.object({
'count': z.number().int(),
'interval': z.enum(['month']),
'type': z.enum(['bonus', 'fixed_count', 'revolving'])
});

export type PaymentMethodDetailsCardInstallmentsPlanModel = z.infer<typeof PaymentMethodDetailsCardInstallmentsPlan>;

export const PaymentMethodDetailsCardInstallments = z.object({
'plan': z.union([PaymentMethodDetailsCardInstallmentsPlan])
});

export type PaymentMethodDetailsCardInstallmentsModel = z.infer<typeof PaymentMethodDetailsCardInstallments>;

export const PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceMulticapture = z.object({
'status': z.enum(['available', 'unavailable'])
});

export type PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceMulticaptureModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceMulticapture>;

export const PaymentMethodDetailsCardNetworkToken = z.object({
'used': z.boolean()
});

export type PaymentMethodDetailsCardNetworkTokenModel = z.infer<typeof PaymentMethodDetailsCardNetworkToken>;

export const PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesOvercaptureOvercapture = z.object({
'maximum_amount_capturable': z.number().int(),
'status': z.enum(['available', 'unavailable'])
});

export type PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesOvercaptureOvercaptureModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesOvercaptureOvercapture>;

export const ThreeDSecureDetailsCharge = z.object({
'authentication_flow': z.enum(['challenge', 'frictionless']),
'electronic_commerce_indicator': z.enum(['01', '02', '05', '06', '07']),
'exemption_indicator': z.enum(['low_risk', 'none']),
'exemption_indicator_applied': z.boolean().optional(),
'result': z.enum(['attempt_acknowledged', 'authenticated', 'exempted', 'failed', 'not_supported', 'processing_error']),
'result_reason': z.enum(['abandoned', 'bypassed', 'canceled', 'card_not_enrolled', 'network_not_supported', 'protocol_error', 'rejected']),
'transaction_id': z.string(),
'version': z.enum(['1.0.2', '2.1.0', '2.2.0'])
});

export type ThreeDSecureDetailsChargeModel = z.infer<typeof ThreeDSecureDetailsCharge>;

export const PaymentMethodDetailsCardWalletAmexExpressCheckout = z.object({

});

export type PaymentMethodDetailsCardWalletAmexExpressCheckoutModel = z.infer<typeof PaymentMethodDetailsCardWalletAmexExpressCheckout>;

export const PaymentMethodDetailsCardWalletLink = z.object({

});

export type PaymentMethodDetailsCardWalletLinkModel = z.infer<typeof PaymentMethodDetailsCardWalletLink>;

export const PaymentMethodDetailsCardWalletMasterpass = z.object({
'billing_address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'shipping_address': z.union([Address])
});

export type PaymentMethodDetailsCardWalletMasterpassModel = z.infer<typeof PaymentMethodDetailsCardWalletMasterpass>;

export const PaymentMethodDetailsCardWalletSamsungPay = z.object({

});

export type PaymentMethodDetailsCardWalletSamsungPayModel = z.infer<typeof PaymentMethodDetailsCardWalletSamsungPay>;

export const PaymentMethodDetailsCardWalletVisaCheckout = z.object({
'billing_address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'shipping_address': z.union([Address])
});

export type PaymentMethodDetailsCardWalletVisaCheckoutModel = z.infer<typeof PaymentMethodDetailsCardWalletVisaCheckout>;

export const PaymentMethodDetailsCardWallet = z.object({
'amex_express_checkout': PaymentMethodDetailsCardWalletAmexExpressCheckout.optional(),
'apple_pay': PaymentMethodDetailsCardWalletApplePay.optional(),
'dynamic_last4': z.string(),
'google_pay': PaymentMethodDetailsCardWalletGooglePay.optional(),
'link': PaymentMethodDetailsCardWalletLink.optional(),
'masterpass': PaymentMethodDetailsCardWalletMasterpass.optional(),
'samsung_pay': PaymentMethodDetailsCardWalletSamsungPay.optional(),
'type': z.enum(['amex_express_checkout', 'apple_pay', 'google_pay', 'link', 'masterpass', 'samsung_pay', 'visa_checkout']),
'visa_checkout': PaymentMethodDetailsCardWalletVisaCheckout.optional()
});

export type PaymentMethodDetailsCardWalletModel = z.infer<typeof PaymentMethodDetailsCardWallet>;

export const PaymentMethodDetailsCard = z.object({
'amount_authorized': z.number().int(),
'authorization_code': z.string(),
'brand': z.string(),
'capture_before': z.number().int().optional(),
'checks': z.union([PaymentMethodDetailsCardChecks]),
'country': z.string(),
'description': z.string().optional(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'extended_authorization': PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesExtendedAuthorizationExtendedAuthorization.optional(),
'fingerprint': z.string().optional(),
'funding': z.string(),
'iin': z.string().optional(),
'incremental_authorization': PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesIncrementalAuthorizationIncrementalAuthorization.optional(),
'installments': z.union([PaymentMethodDetailsCardInstallments]),
'issuer': z.string().optional(),
'last4': z.string(),
'mandate': z.string(),
'moto': z.boolean().optional(),
'multicapture': PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceMulticapture.optional(),
'network': z.string(),
'network_token': z.union([PaymentMethodDetailsCardNetworkToken]).optional(),
'network_transaction_id': z.string(),
'overcapture': PaymentFlowsPrivatePaymentMethodsCardDetailsApiResourceEnterpriseFeaturesOvercaptureOvercapture.optional(),
'regulated_status': z.enum(['regulated', 'unregulated']),
'three_d_secure': z.union([ThreeDSecureDetailsCharge]),
'wallet': z.union([PaymentMethodDetailsCardWallet])
});

export type PaymentMethodDetailsCardModel = z.infer<typeof PaymentMethodDetailsCard>;

export const PaymentMethodDetailsCashapp = z.object({
'buyer_id': z.string(),
'cashtag': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsCashappModel = z.infer<typeof PaymentMethodDetailsCashapp>;

export const PaymentMethodDetailsCrypto = z.object({
'buyer_address': z.string().optional(),
'network': z.enum(['base', 'ethereum', 'polygon', 'solana']).optional(),
'token_currency': z.enum(['usdc', 'usdg', 'usdp']).optional(),
'transaction_hash': z.string().optional()
});

export type PaymentMethodDetailsCryptoModel = z.infer<typeof PaymentMethodDetailsCrypto>;

export const PaymentMethodDetailsCustomerBalance = z.object({

});

export type PaymentMethodDetailsCustomerBalanceModel = z.infer<typeof PaymentMethodDetailsCustomerBalance>;

export const PaymentMethodDetailsEps = z.object({
'bank': z.enum(['arzte_und_apotheker_bank', 'austrian_anadi_bank_ag', 'bank_austria', 'bankhaus_carl_spangler', 'bankhaus_schelhammer_und_schattera_ag', 'bawag_psk_ag', 'bks_bank_ag', 'brull_kallmus_bank_ag', 'btv_vier_lander_bank', 'capital_bank_grawe_gruppe_ag', 'deutsche_bank_ag', 'dolomitenbank', 'easybank_ag', 'erste_bank_und_sparkassen', 'hypo_alpeadriabank_international_ag', 'hypo_bank_burgenland_aktiengesellschaft', 'hypo_noe_lb_fur_niederosterreich_u_wien', 'hypo_oberosterreich_salzburg_steiermark', 'hypo_tirol_bank_ag', 'hypo_vorarlberg_bank_ag', 'marchfelder_bank', 'oberbank_ag', 'raiffeisen_bankengruppe_osterreich', 'schoellerbank_ag', 'sparda_bank_wien', 'volksbank_gruppe', 'volkskreditbank_ag', 'vr_bank_braunau']),
'verified_name': z.string()
});

export type PaymentMethodDetailsEpsModel = z.infer<typeof PaymentMethodDetailsEps>;

export const PaymentMethodDetailsFpx = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'bank': z.enum(['affin_bank', 'agrobank', 'alliance_bank', 'ambank', 'bank_islam', 'bank_muamalat', 'bank_of_china', 'bank_rakyat', 'bsn', 'cimb', 'deutsche_bank', 'hong_leong_bank', 'hsbc', 'kfh', 'maybank2e', 'maybank2u', 'ocbc', 'pb_enterprise', 'public_bank', 'rhb', 'standard_chartered', 'uob']),
'transaction_id': z.string()
});

export type PaymentMethodDetailsFpxModel = z.infer<typeof PaymentMethodDetailsFpx>;

export const PaymentMethodDetailsGiropay = z.object({
'bank_code': z.string(),
'bank_name': z.string(),
'bic': z.string(),
'verified_name': z.string()
});

export type PaymentMethodDetailsGiropayModel = z.infer<typeof PaymentMethodDetailsGiropay>;

export const PaymentMethodDetailsGrabpay = z.object({
'transaction_id': z.string()
});

export type PaymentMethodDetailsGrabpayModel = z.infer<typeof PaymentMethodDetailsGrabpay>;

export const PaymentMethodDetailsIdeal: z.ZodType<PaymentMethodDetailsIdealModel> = z.object({
'bank': z.enum(['abn_amro', 'asn_bank', 'bunq', 'buut', 'finom', 'handelsbanken', 'ing', 'knab', 'moneyou', 'n26', 'nn', 'rabobank', 'regiobank', 'revolut', 'sns_bank', 'triodos_bank', 'van_lanschot', 'yoursafe']),
'bic': z.enum(['ABNANL2A', 'ASNBNL21', 'BITSNL2A', 'BUNQNL2A', 'BUUTNL2A', 'FNOMNL22', 'FVLBNL22', 'HANDNL2A', 'INGBNL2A', 'KNABNL2H', 'MOYONL21', 'NNBANL2G', 'NTSBDEB1', 'RABONL2U', 'RBRBNL21', 'REVOIE23', 'REVOLT21', 'SNSBNL2A', 'TRIONL2U']),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'transaction_id': z.string(),
'verified_name': z.string()
});

export const PaymentMethodDetailsInteracPresentReceipt = z.object({
'account_type': z.enum(['checking', 'savings', 'unknown']).optional(),
'application_cryptogram': z.string(),
'application_preferred_name': z.string(),
'authorization_code': z.string(),
'authorization_response_code': z.string(),
'cardholder_verification_method': z.string(),
'dedicated_file_name': z.string(),
'terminal_verification_results': z.string(),
'transaction_status_information': z.string()
});

export type PaymentMethodDetailsInteracPresentReceiptModel = z.infer<typeof PaymentMethodDetailsInteracPresentReceipt>;

export const PaymentMethodDetailsInteracPresent = z.object({
'brand': z.string(),
'cardholder_name': z.string(),
'country': z.string(),
'description': z.string().optional(),
'emv_auth_data': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string(),
'funding': z.string(),
'generated_card': z.string(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'network': z.string(),
'network_transaction_id': z.string(),
'preferred_locales': z.array(z.string()),
'read_method': z.enum(['contact_emv', 'contactless_emv', 'contactless_magstripe_mode', 'magnetic_stripe_fallback', 'magnetic_stripe_track2']),
'receipt': z.union([PaymentMethodDetailsInteracPresentReceipt])
});

export type PaymentMethodDetailsInteracPresentModel = z.infer<typeof PaymentMethodDetailsInteracPresent>;

export const PaymentMethodDetailsKakaoPay = z.object({
'buyer_id': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsKakaoPayModel = z.infer<typeof PaymentMethodDetailsKakaoPay>;

export const KlarnaAddress = z.object({
'country': z.string()
});

export type KlarnaAddressModel = z.infer<typeof KlarnaAddress>;

export const KlarnaPayerDetails = z.object({
'address': z.union([KlarnaAddress])
});

export type KlarnaPayerDetailsModel = z.infer<typeof KlarnaPayerDetails>;

export const PaymentMethodDetailsKlarna = z.object({
'payer_details': z.union([KlarnaPayerDetails]),
'payment_method_category': z.string(),
'preferred_locale': z.string()
});

export type PaymentMethodDetailsKlarnaModel = z.infer<typeof PaymentMethodDetailsKlarna>;

export const PaymentMethodDetailsKonbiniStore = z.object({
'chain': z.enum(['familymart', 'lawson', 'ministop', 'seicomart'])
});

export type PaymentMethodDetailsKonbiniStoreModel = z.infer<typeof PaymentMethodDetailsKonbiniStore>;

export const PaymentMethodDetailsKonbini = z.object({
'store': z.union([PaymentMethodDetailsKonbiniStore])
});

export type PaymentMethodDetailsKonbiniModel = z.infer<typeof PaymentMethodDetailsKonbini>;

export const PaymentMethodDetailsKrCard = z.object({
'brand': z.enum(['bc', 'citi', 'hana', 'hyundai', 'jeju', 'jeonbuk', 'kakaobank', 'kbank', 'kdbbank', 'kookmin', 'kwangju', 'lotte', 'mg', 'nh', 'post', 'samsung', 'savingsbank', 'shinhan', 'shinhyup', 'suhyup', 'tossbank', 'woori']),
'buyer_id': z.string(),
'last4': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsKrCardModel = z.infer<typeof PaymentMethodDetailsKrCard>;

export const PaymentMethodDetailsLink = z.object({
'country': z.string()
});

export type PaymentMethodDetailsLinkModel = z.infer<typeof PaymentMethodDetailsLink>;

export const PaymentMethodDetailsMbWay = z.object({

});

export type PaymentMethodDetailsMbWayModel = z.infer<typeof PaymentMethodDetailsMbWay>;

export const InternalCard = z.object({
'brand': z.string(),
'country': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'last4': z.string()
});

export type InternalCardModel = z.infer<typeof InternalCard>;

export const PaymentMethodDetailsMobilepay = z.object({
'card': z.union([InternalCard])
});

export type PaymentMethodDetailsMobilepayModel = z.infer<typeof PaymentMethodDetailsMobilepay>;

export const PaymentMethodDetailsMultibanco = z.object({
'entity': z.string(),
'reference': z.string()
});

export type PaymentMethodDetailsMultibancoModel = z.infer<typeof PaymentMethodDetailsMultibanco>;

export const PaymentMethodDetailsNaverPay = z.object({
'buyer_id': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsNaverPayModel = z.infer<typeof PaymentMethodDetailsNaverPay>;

export const PaymentMethodDetailsNzBankAccount = z.object({
'account_holder_name': z.string(),
'bank_code': z.string(),
'bank_name': z.string(),
'branch_code': z.string(),
'last4': z.string(),
'suffix': z.string()
});

export type PaymentMethodDetailsNzBankAccountModel = z.infer<typeof PaymentMethodDetailsNzBankAccount>;

export const PaymentMethodDetailsOxxo = z.object({
'number': z.string()
});

export type PaymentMethodDetailsOxxoModel = z.infer<typeof PaymentMethodDetailsOxxo>;

export const PaymentMethodDetailsP24 = z.object({
'bank': z.enum(['alior_bank', 'bank_millennium', 'bank_nowy_bfg_sa', 'bank_pekao_sa', 'banki_spbdzielcze', 'blik', 'bnp_paribas', 'boz', 'citi_handlowy', 'credit_agricole', 'envelobank', 'etransfer_pocztowy24', 'getin_bank', 'ideabank', 'ing', 'inteligo', 'mbank_mtransfer', 'nest_przelew', 'noble_pay', 'pbac_z_ipko', 'plus_bank', 'santander_przelew24', 'tmobile_usbugi_bankowe', 'toyota_bank', 'velobank', 'volkswagen_bank']),
'reference': z.string(),
'verified_name': z.string()
});

export type PaymentMethodDetailsP24Model = z.infer<typeof PaymentMethodDetailsP24>;

export const PaymentMethodDetailsPayByBank = z.object({

});

export type PaymentMethodDetailsPayByBankModel = z.infer<typeof PaymentMethodDetailsPayByBank>;

export const PaymentMethodDetailsPayco = z.object({
'buyer_id': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsPaycoModel = z.infer<typeof PaymentMethodDetailsPayco>;

export const PaymentMethodDetailsPaynow = z.object({
'location': z.string().optional(),
'reader': z.string().optional(),
'reference': z.string()
});

export type PaymentMethodDetailsPaynowModel = z.infer<typeof PaymentMethodDetailsPaynow>;

export const PaypalSellerProtection = z.object({
'dispute_categories': z.array(z.enum(['fraudulent', 'product_not_received'])),
'status': z.enum(['eligible', 'not_eligible', 'partially_eligible'])
});

export type PaypalSellerProtectionModel = z.infer<typeof PaypalSellerProtection>;

export const PaymentMethodDetailsPaypal = z.object({
'country': z.string(),
'payer_email': z.string(),
'payer_id': z.string(),
'payer_name': z.string(),
'seller_protection': z.union([PaypalSellerProtection]),
'transaction_id': z.string()
});

export type PaymentMethodDetailsPaypalModel = z.infer<typeof PaymentMethodDetailsPaypal>;

export const PaymentMethodDetailsPix = z.object({
'bank_transaction_id': z.string().optional()
});

export type PaymentMethodDetailsPixModel = z.infer<typeof PaymentMethodDetailsPix>;

export const PaymentMethodDetailsPromptpay = z.object({
'reference': z.string()
});

export type PaymentMethodDetailsPromptpayModel = z.infer<typeof PaymentMethodDetailsPromptpay>;

export const RevolutPayUnderlyingPaymentMethodFundingDetails = z.object({
'card': PaymentMethodDetailsPassthroughCard.optional(),
'type': z.enum(['card'])
});

export type RevolutPayUnderlyingPaymentMethodFundingDetailsModel = z.infer<typeof RevolutPayUnderlyingPaymentMethodFundingDetails>;

export const PaymentMethodDetailsRevolutPay = z.object({
'funding': RevolutPayUnderlyingPaymentMethodFundingDetails.optional(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsRevolutPayModel = z.infer<typeof PaymentMethodDetailsRevolutPay>;

export const PaymentMethodDetailsSamsungPay = z.object({
'buyer_id': z.string(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsSamsungPayModel = z.infer<typeof PaymentMethodDetailsSamsungPay>;

export const PaymentMethodDetailsSatispay = z.object({
'transaction_id': z.string()
});

export type PaymentMethodDetailsSatispayModel = z.infer<typeof PaymentMethodDetailsSatispay>;

export const PaymentMethodDetailsSepaCreditTransfer = z.object({
'bank_name': z.string(),
'bic': z.string(),
'iban': z.string()
});

export type PaymentMethodDetailsSepaCreditTransferModel = z.infer<typeof PaymentMethodDetailsSepaCreditTransfer>;

export const PaymentMethodDetailsSepaDebit = z.object({
'bank_code': z.string(),
'branch_code': z.string(),
'country': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.string()
});

export type PaymentMethodDetailsSepaDebitModel = z.infer<typeof PaymentMethodDetailsSepaDebit>;

export const PaymentMethodDetailsSofort: z.ZodType<PaymentMethodDetailsSofortModel> = z.object({
'bank_code': z.string(),
'bank_name': z.string(),
'bic': z.string(),
'country': z.string(),
'generated_sepa_debit': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'generated_sepa_debit_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'iban_last4': z.string(),
'preferred_language': z.enum(['de', 'en', 'es', 'fr', 'it', 'nl', 'pl']),
'verified_name': z.string()
});

export const PaymentMethodDetailsStripeAccount = z.object({

});

export type PaymentMethodDetailsStripeAccountModel = z.infer<typeof PaymentMethodDetailsStripeAccount>;

export const PaymentMethodDetailsSwish = z.object({
'fingerprint': z.string(),
'payment_reference': z.string(),
'verified_phone_last4': z.string()
});

export type PaymentMethodDetailsSwishModel = z.infer<typeof PaymentMethodDetailsSwish>;

export const PaymentMethodDetailsTwint = z.object({

});

export type PaymentMethodDetailsTwintModel = z.infer<typeof PaymentMethodDetailsTwint>;

export const PaymentMethodDetailsUsBankAccount = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]).optional(),
'payment_reference': z.string(),
'routing_number': z.string()
});

export type PaymentMethodDetailsUsBankAccountModel = z.infer<typeof PaymentMethodDetailsUsBankAccount>;

export const PaymentMethodDetailsWechat = z.object({

});

export type PaymentMethodDetailsWechatModel = z.infer<typeof PaymentMethodDetailsWechat>;

export const PaymentMethodDetailsWechatPay = z.object({
'fingerprint': z.string(),
'location': z.string().optional(),
'reader': z.string().optional(),
'transaction_id': z.string()
});

export type PaymentMethodDetailsWechatPayModel = z.infer<typeof PaymentMethodDetailsWechatPay>;

export const PaymentMethodDetailsZip = z.object({

});

export type PaymentMethodDetailsZipModel = z.infer<typeof PaymentMethodDetailsZip>;

export const PaymentMethodDetails: z.ZodType<PaymentMethodDetailsModel> = z.object({
'ach_credit_transfer': PaymentMethodDetailsAchCreditTransfer.optional(),
'ach_debit': PaymentMethodDetailsAchDebit.optional(),
'acss_debit': PaymentMethodDetailsAcssDebit.optional(),
'affirm': PaymentMethodDetailsAffirm.optional(),
'afterpay_clearpay': PaymentMethodDetailsAfterpayClearpay.optional(),
'alipay': PaymentFlowsPrivatePaymentMethodsAlipayDetails.optional(),
'alma': PaymentMethodDetailsAlma.optional(),
'amazon_pay': PaymentMethodDetailsAmazonPay.optional(),
'au_becs_debit': PaymentMethodDetailsAuBecsDebit.optional(),
'bacs_debit': PaymentMethodDetailsBacsDebit.optional(),
'bancontact': z.lazy(() => PaymentMethodDetailsBancontact).optional(),
'billie': PaymentMethodDetailsBillie.optional(),
'blik': PaymentMethodDetailsBlik.optional(),
'boleto': PaymentMethodDetailsBoleto.optional(),
'card': PaymentMethodDetailsCard.optional(),
'card_present': PaymentMethodDetailsCardPresent.optional(),
'cashapp': PaymentMethodDetailsCashapp.optional(),
'crypto': PaymentMethodDetailsCrypto.optional(),
'customer_balance': PaymentMethodDetailsCustomerBalance.optional(),
'eps': PaymentMethodDetailsEps.optional(),
'fpx': PaymentMethodDetailsFpx.optional(),
'giropay': PaymentMethodDetailsGiropay.optional(),
'grabpay': PaymentMethodDetailsGrabpay.optional(),
'ideal': z.lazy(() => PaymentMethodDetailsIdeal).optional(),
'interac_present': PaymentMethodDetailsInteracPresent.optional(),
'kakao_pay': PaymentMethodDetailsKakaoPay.optional(),
'klarna': PaymentMethodDetailsKlarna.optional(),
'konbini': PaymentMethodDetailsKonbini.optional(),
'kr_card': PaymentMethodDetailsKrCard.optional(),
'link': PaymentMethodDetailsLink.optional(),
'mb_way': PaymentMethodDetailsMbWay.optional(),
'mobilepay': PaymentMethodDetailsMobilepay.optional(),
'multibanco': PaymentMethodDetailsMultibanco.optional(),
'naver_pay': PaymentMethodDetailsNaverPay.optional(),
'nz_bank_account': PaymentMethodDetailsNzBankAccount.optional(),
'oxxo': PaymentMethodDetailsOxxo.optional(),
'p24': PaymentMethodDetailsP24.optional(),
'pay_by_bank': PaymentMethodDetailsPayByBank.optional(),
'payco': PaymentMethodDetailsPayco.optional(),
'paynow': PaymentMethodDetailsPaynow.optional(),
'paypal': PaymentMethodDetailsPaypal.optional(),
'pix': PaymentMethodDetailsPix.optional(),
'promptpay': PaymentMethodDetailsPromptpay.optional(),
'revolut_pay': PaymentMethodDetailsRevolutPay.optional(),
'samsung_pay': PaymentMethodDetailsSamsungPay.optional(),
'satispay': PaymentMethodDetailsSatispay.optional(),
'sepa_credit_transfer': PaymentMethodDetailsSepaCreditTransfer.optional(),
'sepa_debit': PaymentMethodDetailsSepaDebit.optional(),
'sofort': z.lazy(() => PaymentMethodDetailsSofort).optional(),
'stripe_account': PaymentMethodDetailsStripeAccount.optional(),
'swish': PaymentMethodDetailsSwish.optional(),
'twint': PaymentMethodDetailsTwint.optional(),
'type': z.string(),
'us_bank_account': PaymentMethodDetailsUsBankAccount.optional(),
'wechat': PaymentMethodDetailsWechat.optional(),
'wechat_pay': PaymentMethodDetailsWechatPay.optional(),
'zip': PaymentMethodDetailsZip.optional()
});

export const RadarRadarOptions = z.object({
'session': z.string().optional()
});

export type RadarRadarOptionsModel = z.infer<typeof RadarRadarOptions>;

export const RadarReviewResourceLocation = z.object({
'city': z.string(),
'country': z.string(),
'latitude': z.number(),
'longitude': z.number(),
'region': z.string()
});

export type RadarReviewResourceLocationModel = z.infer<typeof RadarReviewResourceLocation>;

export const RadarReviewResourceSession = z.object({
'browser': z.string(),
'device': z.string(),
'platform': z.string(),
'version': z.string()
});

export type RadarReviewResourceSessionModel = z.infer<typeof RadarReviewResourceSession>;

export const Review: z.ZodType<ReviewModel> = z.object({
'billing_zip': z.string(),
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'closed_reason': z.enum(['acknowledged', 'approved', 'canceled', 'disputed', 'payment_never_settled', 'redacted', 'refunded', 'refunded_as_fraud']),
'created': z.number().int(),
'id': z.string(),
'ip_address': z.string(),
'ip_address_location': z.union([RadarReviewResourceLocation]),
'livemode': z.boolean(),
'object': z.enum(['review']),
'open': z.boolean(),
'opened_reason': z.enum(['manual', 'rule']),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]).optional(),
'reason': z.string(),
'session': z.union([RadarReviewResourceSession])
});

export const ChargeTransferData: z.ZodType<ChargeTransferDataModel> = z.object({
'amount': z.number().int(),
'destination': z.union([z.string(), z.lazy(() => Account)])
});

export const Charge: z.ZodType<ChargeModel> = z.object({
'amount': z.number().int(),
'amount_captured': z.number().int(),
'amount_refunded': z.number().int(),
'application': z.union([z.string(), Application]),
'application_fee': z.union([z.string(), z.lazy(() => ApplicationFee)]),
'application_fee_amount': z.number().int(),
'authorization_code': z.string().optional(),
'balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'billing_details': BillingDetails,
'calculated_statement_descriptor': z.string(),
'captured': z.boolean(),
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'description': z.string(),
'disputed': z.boolean(),
'failure_balance_transaction': z.union([z.string(), z.lazy(() => BalanceTransaction)]),
'failure_code': z.string(),
'failure_message': z.string(),
'fraud_details': z.union([ChargeFraudDetails]),
'id': z.string(),
'level3': Level3.optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['charge']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'outcome': z.union([ChargeOutcome]),
'paid': z.boolean(),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'payment_method': z.string(),
'payment_method_details': z.union([z.lazy(() => PaymentMethodDetails)]),
'presentment_details': PaymentFlowsPaymentIntentPresentmentDetails.optional(),
'radar_options': RadarRadarOptions.optional(),
'receipt_email': z.string(),
'receipt_number': z.string(),
'receipt_url': z.string(),
'refunded': z.boolean(),
'refunds': z.object({
'data': z.array(z.lazy(() => Refund)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'review': z.union([z.string(), z.lazy(() => Review)]),
'shipping': z.union([Shipping]),
'source': z.union([z.lazy(() => PaymentSource)]),
'source_transfer': z.union([z.string(), z.lazy(() => Transfer)]),
'statement_descriptor': z.string(),
'statement_descriptor_suffix': z.string(),
'status': z.enum(['failed', 'pending', 'succeeded']),
'transfer': z.union([z.string(), z.lazy(() => Transfer)]).optional(),
'transfer_data': z.union([z.lazy(() => ChargeTransferData)]),
'transfer_group': z.string()
});

export const PaymentIntentNextActionAlipayHandleRedirect = z.object({
'native_data': z.string(),
'native_url': z.string(),
'return_url': z.string(),
'url': z.string()
});

export type PaymentIntentNextActionAlipayHandleRedirectModel = z.infer<typeof PaymentIntentNextActionAlipayHandleRedirect>;

export const PaymentIntentNextActionBoleto = z.object({
'expires_at': z.number().int(),
'hosted_voucher_url': z.string(),
'number': z.string(),
'pdf': z.string()
});

export type PaymentIntentNextActionBoletoModel = z.infer<typeof PaymentIntentNextActionBoleto>;

export const PaymentIntentNextActionCardAwaitNotification = z.object({
'charge_attempt_at': z.number().int(),
'customer_approval_required': z.boolean()
});

export type PaymentIntentNextActionCardAwaitNotificationModel = z.infer<typeof PaymentIntentNextActionCardAwaitNotification>;

export const PaymentIntentNextActionCashappQrCode = z.object({
'expires_at': z.number().int(),
'image_url_png': z.string(),
'image_url_svg': z.string()
});

export type PaymentIntentNextActionCashappQrCodeModel = z.infer<typeof PaymentIntentNextActionCashappQrCode>;

export const PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCode = z.object({
'hosted_instructions_url': z.string(),
'mobile_auth_url': z.string(),
'qr_code': PaymentIntentNextActionCashappQrCode
});

export type PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCode>;

export const FundingInstructionsBankTransferAbaRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'account_number': z.string(),
'account_type': z.string(),
'bank_address': Address,
'bank_name': z.string(),
'routing_number': z.string()
});

export type FundingInstructionsBankTransferAbaRecordModel = z.infer<typeof FundingInstructionsBankTransferAbaRecord>;

export const FundingInstructionsBankTransferIbanRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'bank_address': Address,
'bic': z.string(),
'country': z.string(),
'iban': z.string()
});

export type FundingInstructionsBankTransferIbanRecordModel = z.infer<typeof FundingInstructionsBankTransferIbanRecord>;

export const FundingInstructionsBankTransferSortCodeRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'account_number': z.string(),
'bank_address': Address,
'sort_code': z.string()
});

export type FundingInstructionsBankTransferSortCodeRecordModel = z.infer<typeof FundingInstructionsBankTransferSortCodeRecord>;

export const FundingInstructionsBankTransferSpeiRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'bank_address': Address,
'bank_code': z.string(),
'bank_name': z.string(),
'clabe': z.string()
});

export type FundingInstructionsBankTransferSpeiRecordModel = z.infer<typeof FundingInstructionsBankTransferSpeiRecord>;

export const FundingInstructionsBankTransferSwiftRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'account_number': z.string(),
'account_type': z.string(),
'bank_address': Address,
'bank_name': z.string(),
'swift_code': z.string()
});

export type FundingInstructionsBankTransferSwiftRecordModel = z.infer<typeof FundingInstructionsBankTransferSwiftRecord>;

export const FundingInstructionsBankTransferZenginRecord = z.object({
'account_holder_address': Address,
'account_holder_name': z.string(),
'account_number': z.string(),
'account_type': z.string(),
'bank_address': Address,
'bank_code': z.string(),
'bank_name': z.string(),
'branch_code': z.string(),
'branch_name': z.string()
});

export type FundingInstructionsBankTransferZenginRecordModel = z.infer<typeof FundingInstructionsBankTransferZenginRecord>;

export const FundingInstructionsBankTransferFinancialAddress = z.object({
'aba': FundingInstructionsBankTransferAbaRecord.optional(),
'iban': FundingInstructionsBankTransferIbanRecord.optional(),
'sort_code': FundingInstructionsBankTransferSortCodeRecord.optional(),
'spei': FundingInstructionsBankTransferSpeiRecord.optional(),
'supported_networks': z.array(z.enum(['ach', 'bacs', 'domestic_wire_us', 'fps', 'sepa', 'spei', 'swift', 'zengin'])).optional(),
'swift': FundingInstructionsBankTransferSwiftRecord.optional(),
'type': z.enum(['aba', 'iban', 'sort_code', 'spei', 'swift', 'zengin']),
'zengin': FundingInstructionsBankTransferZenginRecord.optional()
});

export type FundingInstructionsBankTransferFinancialAddressModel = z.infer<typeof FundingInstructionsBankTransferFinancialAddress>;

export const PaymentIntentNextActionDisplayBankTransferInstructions = z.object({
'amount_remaining': z.number().int(),
'currency': z.string(),
'financial_addresses': z.array(FundingInstructionsBankTransferFinancialAddress).optional(),
'hosted_instructions_url': z.string(),
'reference': z.string(),
'type': z.enum(['eu_bank_transfer', 'gb_bank_transfer', 'jp_bank_transfer', 'mx_bank_transfer', 'us_bank_transfer'])
});

export type PaymentIntentNextActionDisplayBankTransferInstructionsModel = z.infer<typeof PaymentIntentNextActionDisplayBankTransferInstructions>;

export const PaymentIntentNextActionKonbiniFamilymart = z.object({
'confirmation_number': z.string().optional(),
'payment_code': z.string()
});

export type PaymentIntentNextActionKonbiniFamilymartModel = z.infer<typeof PaymentIntentNextActionKonbiniFamilymart>;

export const PaymentIntentNextActionKonbiniLawson = z.object({
'confirmation_number': z.string().optional(),
'payment_code': z.string()
});

export type PaymentIntentNextActionKonbiniLawsonModel = z.infer<typeof PaymentIntentNextActionKonbiniLawson>;

export const PaymentIntentNextActionKonbiniMinistop = z.object({
'confirmation_number': z.string().optional(),
'payment_code': z.string()
});

export type PaymentIntentNextActionKonbiniMinistopModel = z.infer<typeof PaymentIntentNextActionKonbiniMinistop>;

export const PaymentIntentNextActionKonbiniSeicomart = z.object({
'confirmation_number': z.string().optional(),
'payment_code': z.string()
});

export type PaymentIntentNextActionKonbiniSeicomartModel = z.infer<typeof PaymentIntentNextActionKonbiniSeicomart>;

export const PaymentIntentNextActionKonbiniStores = z.object({
'familymart': z.union([PaymentIntentNextActionKonbiniFamilymart]),
'lawson': z.union([PaymentIntentNextActionKonbiniLawson]),
'ministop': z.union([PaymentIntentNextActionKonbiniMinistop]),
'seicomart': z.union([PaymentIntentNextActionKonbiniSeicomart])
});

export type PaymentIntentNextActionKonbiniStoresModel = z.infer<typeof PaymentIntentNextActionKonbiniStores>;

export const PaymentIntentNextActionKonbini = z.object({
'expires_at': z.number().int(),
'hosted_voucher_url': z.string(),
'stores': PaymentIntentNextActionKonbiniStores
});

export type PaymentIntentNextActionKonbiniModel = z.infer<typeof PaymentIntentNextActionKonbini>;

export const PaymentIntentNextActionDisplayMultibancoDetails = z.object({
'entity': z.string(),
'expires_at': z.number().int(),
'hosted_voucher_url': z.string(),
'reference': z.string()
});

export type PaymentIntentNextActionDisplayMultibancoDetailsModel = z.infer<typeof PaymentIntentNextActionDisplayMultibancoDetails>;

export const PaymentIntentNextActionDisplayOxxoDetails = z.object({
'expires_after': z.number().int(),
'hosted_voucher_url': z.string(),
'number': z.string()
});

export type PaymentIntentNextActionDisplayOxxoDetailsModel = z.infer<typeof PaymentIntentNextActionDisplayOxxoDetails>;

export const PaymentIntentNextActionPaynowDisplayQrCode = z.object({
'data': z.string(),
'hosted_instructions_url': z.string(),
'image_url_png': z.string(),
'image_url_svg': z.string()
});

export type PaymentIntentNextActionPaynowDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionPaynowDisplayQrCode>;

export const PaymentIntentNextActionPixDisplayQrCode = z.object({
'data': z.string().optional(),
'expires_at': z.number().int().optional(),
'hosted_instructions_url': z.string().optional(),
'image_url_png': z.string().optional(),
'image_url_svg': z.string().optional()
});

export type PaymentIntentNextActionPixDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionPixDisplayQrCode>;

export const PaymentIntentNextActionPromptpayDisplayQrCode = z.object({
'data': z.string(),
'hosted_instructions_url': z.string(),
'image_url_png': z.string(),
'image_url_svg': z.string()
});

export type PaymentIntentNextActionPromptpayDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionPromptpayDisplayQrCode>;

export const PaymentIntentNextActionRedirectToUrl = z.object({
'return_url': z.string(),
'url': z.string()
});

export type PaymentIntentNextActionRedirectToUrlModel = z.infer<typeof PaymentIntentNextActionRedirectToUrl>;

export const PaymentIntentNextActionSwishQrCode = z.object({
'data': z.string(),
'image_url_png': z.string(),
'image_url_svg': z.string()
});

export type PaymentIntentNextActionSwishQrCodeModel = z.infer<typeof PaymentIntentNextActionSwishQrCode>;

export const PaymentIntentNextActionSwishHandleRedirectOrDisplayQrCode = z.object({
'hosted_instructions_url': z.string(),
'mobile_auth_url': z.string(),
'qr_code': PaymentIntentNextActionSwishQrCode
});

export type PaymentIntentNextActionSwishHandleRedirectOrDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionSwishHandleRedirectOrDisplayQrCode>;

export const PaymentIntentNextActionVerifyWithMicrodeposits = z.object({
'arrival_date': z.number().int(),
'hosted_verification_url': z.string(),
'microdeposit_type': z.enum(['amounts', 'descriptor_code'])
});

export type PaymentIntentNextActionVerifyWithMicrodepositsModel = z.infer<typeof PaymentIntentNextActionVerifyWithMicrodeposits>;

export const PaymentIntentNextActionWechatPayDisplayQrCode = z.object({
'data': z.string(),
'hosted_instructions_url': z.string(),
'image_data_url': z.string(),
'image_url_png': z.string(),
'image_url_svg': z.string()
});

export type PaymentIntentNextActionWechatPayDisplayQrCodeModel = z.infer<typeof PaymentIntentNextActionWechatPayDisplayQrCode>;

export const PaymentIntentNextActionWechatPayRedirectToAndroidApp = z.object({
'app_id': z.string(),
'nonce_str': z.string(),
'package': z.string(),
'partner_id': z.string(),
'prepay_id': z.string(),
'sign': z.string(),
'timestamp': z.string()
});

export type PaymentIntentNextActionWechatPayRedirectToAndroidAppModel = z.infer<typeof PaymentIntentNextActionWechatPayRedirectToAndroidApp>;

export const PaymentIntentNextActionWechatPayRedirectToIosApp = z.object({
'native_url': z.string()
});

export type PaymentIntentNextActionWechatPayRedirectToIosAppModel = z.infer<typeof PaymentIntentNextActionWechatPayRedirectToIosApp>;

export const PaymentIntentNextAction = z.object({
'alipay_handle_redirect': PaymentIntentNextActionAlipayHandleRedirect.optional(),
'boleto_display_details': PaymentIntentNextActionBoleto.optional(),
'card_await_notification': PaymentIntentNextActionCardAwaitNotification.optional(),
'cashapp_handle_redirect_or_display_qr_code': PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCode.optional(),
'display_bank_transfer_instructions': PaymentIntentNextActionDisplayBankTransferInstructions.optional(),
'konbini_display_details': PaymentIntentNextActionKonbini.optional(),
'multibanco_display_details': PaymentIntentNextActionDisplayMultibancoDetails.optional(),
'oxxo_display_details': PaymentIntentNextActionDisplayOxxoDetails.optional(),
'paynow_display_qr_code': PaymentIntentNextActionPaynowDisplayQrCode.optional(),
'pix_display_qr_code': PaymentIntentNextActionPixDisplayQrCode.optional(),
'promptpay_display_qr_code': PaymentIntentNextActionPromptpayDisplayQrCode.optional(),
'redirect_to_url': PaymentIntentNextActionRedirectToUrl.optional(),
'swish_handle_redirect_or_display_qr_code': PaymentIntentNextActionSwishHandleRedirectOrDisplayQrCode.optional(),
'type': z.string(),
'use_stripe_sdk': z.object({}).optional(),
'verify_with_microdeposits': PaymentIntentNextActionVerifyWithMicrodeposits.optional(),
'wechat_pay_display_qr_code': PaymentIntentNextActionWechatPayDisplayQrCode.optional(),
'wechat_pay_redirect_to_android_app': PaymentIntentNextActionWechatPayRedirectToAndroidApp.optional(),
'wechat_pay_redirect_to_ios_app': PaymentIntentNextActionWechatPayRedirectToIosApp.optional()
});

export type PaymentIntentNextActionModel = z.infer<typeof PaymentIntentNextAction>;

export const PaymentFlowsPaymentDetails = z.object({
'customer_reference': z.string(),
'order_reference': z.string()
});

export type PaymentFlowsPaymentDetailsModel = z.infer<typeof PaymentFlowsPaymentDetails>;

export const PaymentMethodConfigBizPaymentMethodConfigurationDetails = z.object({
'id': z.string(),
'parent': z.string()
});

export type PaymentMethodConfigBizPaymentMethodConfigurationDetailsModel = z.infer<typeof PaymentMethodConfigBizPaymentMethodConfigurationDetails>;

export const PaymentIntentPaymentMethodOptionsMandateOptionsAcssDebit = z.object({
'custom_mandate_url': z.string().optional(),
'interval_description': z.string(),
'payment_schedule': z.enum(['combined', 'interval', 'sporadic']),
'transaction_type': z.enum(['business', 'personal'])
});

export type PaymentIntentPaymentMethodOptionsMandateOptionsAcssDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsMandateOptionsAcssDebit>;

export const PaymentIntentPaymentMethodOptionsAcssDebit = z.object({
'mandate_options': PaymentIntentPaymentMethodOptionsMandateOptionsAcssDebit.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type PaymentIntentPaymentMethodOptionsAcssDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsAcssDebit>;

export const PaymentMethodOptionsAffirm = z.object({
'capture_method': z.enum(['manual']).optional(),
'preferred_locale': z.string().optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsAffirmModel = z.infer<typeof PaymentMethodOptionsAffirm>;

export const PaymentMethodOptionsAfterpayClearpay = z.object({
'capture_method': z.enum(['manual']).optional(),
'reference': z.string(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsAfterpayClearpayModel = z.infer<typeof PaymentMethodOptionsAfterpayClearpay>;

export const PaymentMethodOptionsAlipay = z.object({
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsAlipayModel = z.infer<typeof PaymentMethodOptionsAlipay>;

export const PaymentMethodOptionsAlma = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type PaymentMethodOptionsAlmaModel = z.infer<typeof PaymentMethodOptionsAlma>;

export const PaymentMethodOptionsAmazonPay = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsAmazonPayModel = z.infer<typeof PaymentMethodOptionsAmazonPay>;

export const PaymentIntentPaymentMethodOptionsAuBecsDebit = z.object({
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsAuBecsDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsAuBecsDebit>;

export const PaymentIntentPaymentMethodOptionsMandateOptionsBacsDebit = z.object({
'reference_prefix': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsMandateOptionsBacsDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsMandateOptionsBacsDebit>;

export const PaymentIntentPaymentMethodOptionsBacsDebit = z.object({
'mandate_options': PaymentIntentPaymentMethodOptionsMandateOptionsBacsDebit.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsBacsDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsBacsDebit>;

export const PaymentMethodOptionsBancontact = z.object({
'preferred_language': z.enum(['de', 'en', 'fr', 'nl']),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsBancontactModel = z.infer<typeof PaymentMethodOptionsBancontact>;

export const PaymentMethodOptionsBillie = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type PaymentMethodOptionsBillieModel = z.infer<typeof PaymentMethodOptionsBillie>;

export const PaymentIntentPaymentMethodOptionsBlik = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentIntentPaymentMethodOptionsBlikModel = z.infer<typeof PaymentIntentPaymentMethodOptionsBlik>;

export const PaymentMethodOptionsBoleto = z.object({
'expires_after_days': z.number().int(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional()
});

export type PaymentMethodOptionsBoletoModel = z.infer<typeof PaymentMethodOptionsBoleto>;

export const PaymentMethodOptionsCardInstallments = z.object({
'available_plans': z.array(PaymentMethodDetailsCardInstallmentsPlan),
'enabled': z.boolean(),
'plan': z.union([PaymentMethodDetailsCardInstallmentsPlan])
});

export type PaymentMethodOptionsCardInstallmentsModel = z.infer<typeof PaymentMethodOptionsCardInstallments>;

export const PaymentMethodOptionsCardMandateOptions = z.object({
'amount': z.number().int(),
'amount_type': z.enum(['fixed', 'maximum']),
'description': z.string(),
'end_date': z.number().int(),
'interval': z.enum(['day', 'month', 'sporadic', 'week', 'year']),
'interval_count': z.number().int(),
'reference': z.string(),
'start_date': z.number().int(),
'supported_types': z.array(z.enum(['india']))
});

export type PaymentMethodOptionsCardMandateOptionsModel = z.infer<typeof PaymentMethodOptionsCardMandateOptions>;

export const PaymentIntentPaymentMethodOptionsCard = z.object({
'capture_method': z.enum(['manual']).optional(),
'installments': z.union([PaymentMethodOptionsCardInstallments]),
'mandate_options': z.union([PaymentMethodOptionsCardMandateOptions]),
'network': z.enum(['amex', 'cartes_bancaires', 'diners', 'discover', 'eftpos_au', 'girocard', 'interac', 'jcb', 'link', 'mastercard', 'unionpay', 'unknown', 'visa']),
'request_extended_authorization': z.enum(['if_available', 'never']).optional(),
'request_incremental_authorization': z.enum(['if_available', 'never']).optional(),
'request_multicapture': z.enum(['if_available', 'never']).optional(),
'request_overcapture': z.enum(['if_available', 'never']).optional(),
'request_three_d_secure': z.enum(['any', 'automatic', 'challenge']),
'require_cvc_recollection': z.boolean().optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'statement_descriptor_suffix_kana': z.string().optional(),
'statement_descriptor_suffix_kanji': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsCardModel = z.infer<typeof PaymentIntentPaymentMethodOptionsCard>;

export const PaymentMethodOptionsCardPresentRouting = z.object({
'requested_priority': z.enum(['domestic', 'international'])
});

export type PaymentMethodOptionsCardPresentRoutingModel = z.infer<typeof PaymentMethodOptionsCardPresentRouting>;

export const PaymentMethodOptionsCardPresent = z.object({
'capture_method': z.enum(['manual', 'manual_preferred']).optional(),
'request_extended_authorization': z.boolean(),
'request_incremental_authorization_support': z.boolean(),
'routing': PaymentMethodOptionsCardPresentRouting.optional()
});

export type PaymentMethodOptionsCardPresentModel = z.infer<typeof PaymentMethodOptionsCardPresent>;

export const PaymentMethodOptionsCashapp = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional()
});

export type PaymentMethodOptionsCashappModel = z.infer<typeof PaymentMethodOptionsCashapp>;

export const PaymentMethodOptionsCrypto = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsCryptoModel = z.infer<typeof PaymentMethodOptionsCrypto>;

export const PaymentMethodOptionsCustomerBalanceEuBankAccount = z.object({
'country': z.enum(['BE', 'DE', 'ES', 'FR', 'IE', 'NL'])
});

export type PaymentMethodOptionsCustomerBalanceEuBankAccountModel = z.infer<typeof PaymentMethodOptionsCustomerBalanceEuBankAccount>;

export const PaymentMethodOptionsCustomerBalanceBankTransfer = z.object({
'eu_bank_transfer': PaymentMethodOptionsCustomerBalanceEuBankAccount.optional(),
'requested_address_types': z.array(z.enum(['aba', 'iban', 'sepa', 'sort_code', 'spei', 'swift', 'zengin'])).optional(),
'type': z.enum(['eu_bank_transfer', 'gb_bank_transfer', 'jp_bank_transfer', 'mx_bank_transfer', 'us_bank_transfer'])
});

export type PaymentMethodOptionsCustomerBalanceBankTransferModel = z.infer<typeof PaymentMethodOptionsCustomerBalanceBankTransfer>;

export const PaymentMethodOptionsCustomerBalance = z.object({
'bank_transfer': PaymentMethodOptionsCustomerBalanceBankTransfer.optional(),
'funding_type': z.enum(['bank_transfer']),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsCustomerBalanceModel = z.infer<typeof PaymentMethodOptionsCustomerBalance>;

export const PaymentIntentPaymentMethodOptionsEps = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentIntentPaymentMethodOptionsEpsModel = z.infer<typeof PaymentIntentPaymentMethodOptionsEps>;

export const PaymentMethodOptionsFpx = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsFpxModel = z.infer<typeof PaymentMethodOptionsFpx>;

export const PaymentMethodOptionsGiropay = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsGiropayModel = z.infer<typeof PaymentMethodOptionsGiropay>;

export const PaymentMethodOptionsGrabpay = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsGrabpayModel = z.infer<typeof PaymentMethodOptionsGrabpay>;

export const PaymentMethodOptionsIdeal = z.object({
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsIdealModel = z.infer<typeof PaymentMethodOptionsIdeal>;

export const PaymentMethodOptionsInteracPresent = z.object({

});

export type PaymentMethodOptionsInteracPresentModel = z.infer<typeof PaymentMethodOptionsInteracPresent>;

export const PaymentFlowsPrivatePaymentMethodsKakaoPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentFlowsPrivatePaymentMethodsKakaoPayPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsKakaoPayPaymentMethodOptions>;

export const PaymentMethodOptionsKlarna = z.object({
'capture_method': z.enum(['manual']).optional(),
'preferred_locale': z.string(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional()
});

export type PaymentMethodOptionsKlarnaModel = z.infer<typeof PaymentMethodOptionsKlarna>;

export const PaymentMethodOptionsKonbini = z.object({
'confirmation_number': z.string(),
'expires_after_days': z.number().int(),
'expires_at': z.number().int(),
'product_description': z.string(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsKonbiniModel = z.infer<typeof PaymentMethodOptionsKonbini>;

export const PaymentMethodOptionsKrCard = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsKrCardModel = z.infer<typeof PaymentMethodOptionsKrCard>;

export const PaymentIntentPaymentMethodOptionsLink = z.object({
'capture_method': z.enum(['manual']).optional(),
'persistent_token': z.string(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentIntentPaymentMethodOptionsLinkModel = z.infer<typeof PaymentIntentPaymentMethodOptionsLink>;

export const PaymentMethodOptionsMbWay = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsMbWayModel = z.infer<typeof PaymentMethodOptionsMbWay>;

export const PaymentIntentPaymentMethodOptionsMobilepay = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentIntentPaymentMethodOptionsMobilepayModel = z.infer<typeof PaymentIntentPaymentMethodOptionsMobilepay>;

export const PaymentMethodOptionsMultibanco = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsMultibancoModel = z.infer<typeof PaymentMethodOptionsMultibanco>;

export const PaymentFlowsPrivatePaymentMethodsNaverPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentFlowsPrivatePaymentMethodsNaverPayPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsNaverPayPaymentMethodOptions>;

export const PaymentIntentPaymentMethodOptionsNzBankAccount = z.object({
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsNzBankAccountModel = z.infer<typeof PaymentIntentPaymentMethodOptionsNzBankAccount>;

export const PaymentMethodOptionsOxxo = z.object({
'expires_after_days': z.number().int(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsOxxoModel = z.infer<typeof PaymentMethodOptionsOxxo>;

export const PaymentMethodOptionsP24 = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsP24Model = z.infer<typeof PaymentMethodOptionsP24>;

export const PaymentMethodOptionsPayByBank = z.object({

});

export type PaymentMethodOptionsPayByBankModel = z.infer<typeof PaymentMethodOptionsPayByBank>;

export const PaymentFlowsPrivatePaymentMethodsPaycoPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type PaymentFlowsPrivatePaymentMethodsPaycoPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsPaycoPaymentMethodOptions>;

export const PaymentMethodOptionsPaynow = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsPaynowModel = z.infer<typeof PaymentMethodOptionsPaynow>;

export const PaymentMethodOptionsPaypal = z.object({
'capture_method': z.enum(['manual']).optional(),
'preferred_locale': z.string(),
'reference': z.string(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsPaypalModel = z.infer<typeof PaymentMethodOptionsPaypal>;

export const PaymentMethodOptionsPix = z.object({
'amount_includes_iof': z.enum(['always', 'never']).optional(),
'expires_after_seconds': z.number().int(),
'expires_at': z.number().int(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsPixModel = z.infer<typeof PaymentMethodOptionsPix>;

export const PaymentMethodOptionsPromptpay = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsPromptpayModel = z.infer<typeof PaymentMethodOptionsPromptpay>;

export const PaymentMethodOptionsRevolutPay = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsRevolutPayModel = z.infer<typeof PaymentMethodOptionsRevolutPay>;

export const PaymentFlowsPrivatePaymentMethodsSamsungPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type PaymentFlowsPrivatePaymentMethodsSamsungPayPaymentMethodOptionsModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsSamsungPayPaymentMethodOptions>;

export const PaymentMethodOptionsSatispay = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type PaymentMethodOptionsSatispayModel = z.infer<typeof PaymentMethodOptionsSatispay>;

export const PaymentIntentPaymentMethodOptionsMandateOptionsSepaDebit = z.object({
'reference_prefix': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsMandateOptionsSepaDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsMandateOptionsSepaDebit>;

export const PaymentIntentPaymentMethodOptionsSepaDebit = z.object({
'mandate_options': PaymentIntentPaymentMethodOptionsMandateOptionsSepaDebit.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type PaymentIntentPaymentMethodOptionsSepaDebitModel = z.infer<typeof PaymentIntentPaymentMethodOptionsSepaDebit>;

export const PaymentMethodOptionsSofort = z.object({
'preferred_language': z.enum(['de', 'en', 'es', 'fr', 'it', 'nl', 'pl']),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type PaymentMethodOptionsSofortModel = z.infer<typeof PaymentMethodOptionsSofort>;

export const PaymentIntentPaymentMethodOptionsSwish = z.object({
'reference': z.string(),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentIntentPaymentMethodOptionsSwishModel = z.infer<typeof PaymentIntentPaymentMethodOptionsSwish>;

export const PaymentMethodOptionsTwint = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsTwintModel = z.infer<typeof PaymentMethodOptionsTwint>;

export const PaymentFlowsPrivatePaymentMethodsFinancialConnectionsCommonLinkedAccountOptionsFilters = z.object({
'account_subcategories': z.array(z.enum(['checking', 'savings'])).optional()
});

export type PaymentFlowsPrivatePaymentMethodsFinancialConnectionsCommonLinkedAccountOptionsFiltersModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsFinancialConnectionsCommonLinkedAccountOptionsFilters>;

export const LinkedAccountOptionsCommon = z.object({
'filters': PaymentFlowsPrivatePaymentMethodsFinancialConnectionsCommonLinkedAccountOptionsFilters.optional(),
'permissions': z.array(z.enum(['balances', 'ownership', 'payment_method', 'transactions'])).optional(),
'prefetch': z.array(z.enum(['balances', 'ownership', 'transactions'])),
'return_url': z.string().optional()
});

export type LinkedAccountOptionsCommonModel = z.infer<typeof LinkedAccountOptionsCommon>;

export const PaymentMethodOptionsUsBankAccountMandateOptions = z.object({
'collection_method': z.enum(['paper']).optional()
});

export type PaymentMethodOptionsUsBankAccountMandateOptionsModel = z.infer<typeof PaymentMethodOptionsUsBankAccountMandateOptions>;

export const PaymentIntentPaymentMethodOptionsUsBankAccount = z.object({
'financial_connections': LinkedAccountOptionsCommon.optional(),
'mandate_options': PaymentMethodOptionsUsBankAccountMandateOptions.optional(),
'preferred_settlement_speed': z.enum(['fastest', 'standard']).optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type PaymentIntentPaymentMethodOptionsUsBankAccountModel = z.infer<typeof PaymentIntentPaymentMethodOptionsUsBankAccount>;

export const PaymentMethodOptionsWechatPay = z.object({
'app_id': z.string(),
'client': z.enum(['android', 'ios', 'web']),
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsWechatPayModel = z.infer<typeof PaymentMethodOptionsWechatPay>;

export const PaymentMethodOptionsZip = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type PaymentMethodOptionsZipModel = z.infer<typeof PaymentMethodOptionsZip>;

export const PaymentIntentPaymentMethodOptions = z.object({
'acss_debit': PaymentIntentPaymentMethodOptionsAcssDebit.optional(),
'affirm': PaymentMethodOptionsAffirm.optional(),
'afterpay_clearpay': PaymentMethodOptionsAfterpayClearpay.optional(),
'alipay': PaymentMethodOptionsAlipay.optional(),
'alma': PaymentMethodOptionsAlma.optional(),
'amazon_pay': PaymentMethodOptionsAmazonPay.optional(),
'au_becs_debit': PaymentIntentPaymentMethodOptionsAuBecsDebit.optional(),
'bacs_debit': PaymentIntentPaymentMethodOptionsBacsDebit.optional(),
'bancontact': PaymentMethodOptionsBancontact.optional(),
'billie': PaymentMethodOptionsBillie.optional(),
'blik': PaymentIntentPaymentMethodOptionsBlik.optional(),
'boleto': PaymentMethodOptionsBoleto.optional(),
'card': PaymentIntentPaymentMethodOptionsCard.optional(),
'card_present': PaymentMethodOptionsCardPresent.optional(),
'cashapp': PaymentMethodOptionsCashapp.optional(),
'crypto': PaymentMethodOptionsCrypto.optional(),
'customer_balance': PaymentMethodOptionsCustomerBalance.optional(),
'eps': PaymentIntentPaymentMethodOptionsEps.optional(),
'fpx': PaymentMethodOptionsFpx.optional(),
'giropay': PaymentMethodOptionsGiropay.optional(),
'grabpay': PaymentMethodOptionsGrabpay.optional(),
'ideal': PaymentMethodOptionsIdeal.optional(),
'interac_present': PaymentMethodOptionsInteracPresent.optional(),
'kakao_pay': PaymentFlowsPrivatePaymentMethodsKakaoPayPaymentMethodOptions.optional(),
'klarna': PaymentMethodOptionsKlarna.optional(),
'konbini': PaymentMethodOptionsKonbini.optional(),
'kr_card': PaymentMethodOptionsKrCard.optional(),
'link': PaymentIntentPaymentMethodOptionsLink.optional(),
'mb_way': PaymentMethodOptionsMbWay.optional(),
'mobilepay': PaymentIntentPaymentMethodOptionsMobilepay.optional(),
'multibanco': PaymentMethodOptionsMultibanco.optional(),
'naver_pay': PaymentFlowsPrivatePaymentMethodsNaverPayPaymentMethodOptions.optional(),
'nz_bank_account': PaymentIntentPaymentMethodOptionsNzBankAccount.optional(),
'oxxo': PaymentMethodOptionsOxxo.optional(),
'p24': PaymentMethodOptionsP24.optional(),
'pay_by_bank': PaymentMethodOptionsPayByBank.optional(),
'payco': PaymentFlowsPrivatePaymentMethodsPaycoPaymentMethodOptions.optional(),
'paynow': PaymentMethodOptionsPaynow.optional(),
'paypal': PaymentMethodOptionsPaypal.optional(),
'pix': PaymentMethodOptionsPix.optional(),
'promptpay': PaymentMethodOptionsPromptpay.optional(),
'revolut_pay': PaymentMethodOptionsRevolutPay.optional(),
'samsung_pay': PaymentFlowsPrivatePaymentMethodsSamsungPayPaymentMethodOptions.optional(),
'satispay': PaymentMethodOptionsSatispay.optional(),
'sepa_debit': PaymentIntentPaymentMethodOptionsSepaDebit.optional(),
'sofort': PaymentMethodOptionsSofort.optional(),
'swish': PaymentIntentPaymentMethodOptionsSwish.optional(),
'twint': PaymentMethodOptionsTwint.optional(),
'us_bank_account': PaymentIntentPaymentMethodOptionsUsBankAccount.optional(),
'wechat_pay': PaymentMethodOptionsWechatPay.optional(),
'zip': PaymentMethodOptionsZip.optional()
});

export type PaymentIntentPaymentMethodOptionsModel = z.infer<typeof PaymentIntentPaymentMethodOptions>;

export const PaymentIntentProcessingCustomerNotification = z.object({
'approval_requested': z.boolean(),
'completes_at': z.number().int()
});

export type PaymentIntentProcessingCustomerNotificationModel = z.infer<typeof PaymentIntentProcessingCustomerNotification>;

export const PaymentIntentCardProcessing = z.object({
'customer_notification': PaymentIntentProcessingCustomerNotification.optional()
});

export type PaymentIntentCardProcessingModel = z.infer<typeof PaymentIntentCardProcessing>;

export const PaymentIntentProcessing_1 = z.object({
'card': PaymentIntentCardProcessing.optional(),
'type': z.enum(['card'])
});

export type PaymentIntentProcessing_1Model = z.infer<typeof PaymentIntentProcessing_1>;

export const DeletedPaymentSource = z.union([DeletedBankAccount, DeletedCard]);

export type DeletedPaymentSourceModel = z.infer<typeof DeletedPaymentSource>;

export const TransferData: z.ZodType<TransferDataModel> = z.object({
'amount': z.number().int().optional(),
'destination': z.union([z.string(), z.lazy(() => Account)])
});

export const PaymentIntent: z.ZodType<PaymentIntentModel> = z.object({
'amount': z.number().int(),
'amount_capturable': z.number().int(),
'amount_details': PaymentFlowsAmountDetails.optional(),
'amount_received': z.number().int(),
'application': z.union([z.string(), Application]),
'application_fee_amount': z.number().int(),
'automatic_payment_methods': z.union([PaymentFlowsAutomaticPaymentMethodsPaymentIntent]),
'canceled_at': z.number().int(),
'cancellation_reason': z.enum(['abandoned', 'automatic', 'duplicate', 'expired', 'failed_invoice', 'fraudulent', 'requested_by_customer', 'void_invoice']),
'capture_method': z.enum(['automatic', 'automatic_async', 'manual']),
'client_secret': z.string(),
'confirmation_method': z.enum(['automatic', 'manual']),
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'description': z.string(),
'excluded_payment_method_types': z.array(z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip'])),
'hooks': PaymentFlowsPaymentIntentAsyncWorkflows.optional(),
'id': z.string(),
'last_payment_error': z.union([z.lazy(() => ApiErrors)]),
'latest_charge': z.union([z.string(), z.lazy(() => Charge)]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'next_action': z.union([PaymentIntentNextAction]),
'object': z.enum(['payment_intent']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'payment_details': PaymentFlowsPaymentDetails.optional(),
'payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'payment_method_configuration_details': z.union([PaymentMethodConfigBizPaymentMethodConfigurationDetails]),
'payment_method_options': z.union([PaymentIntentPaymentMethodOptions]),
'payment_method_types': z.array(z.string()),
'presentment_details': PaymentFlowsPaymentIntentPresentmentDetails.optional(),
'processing': z.union([PaymentIntentProcessing_1]),
'receipt_email': z.string(),
'review': z.union([z.string(), z.lazy(() => Review)]),
'setup_future_usage': z.enum(['off_session', 'on_session']),
'shipping': z.union([Shipping]),
'source': z.union([z.string(), z.lazy(() => PaymentSource), DeletedPaymentSource]),
'statement_descriptor': z.string(),
'statement_descriptor_suffix': z.string(),
'status': z.enum(['canceled', 'processing', 'requires_action', 'requires_capture', 'requires_confirmation', 'requires_payment_method', 'succeeded']),
'transfer_data': z.union([z.lazy(() => TransferData)]),
'transfer_group': z.string()
});

export const PaymentFlowsAutomaticPaymentMethodsSetupIntent = z.object({
'allow_redirects': z.enum(['always', 'never']).optional(),
'enabled': z.boolean()
});

export type PaymentFlowsAutomaticPaymentMethodsSetupIntentModel = z.infer<typeof PaymentFlowsAutomaticPaymentMethodsSetupIntent>;

export const SetupIntentNextActionRedirectToUrl = z.object({
'return_url': z.string(),
'url': z.string()
});

export type SetupIntentNextActionRedirectToUrlModel = z.infer<typeof SetupIntentNextActionRedirectToUrl>;

export const SetupIntentNextActionVerifyWithMicrodeposits = z.object({
'arrival_date': z.number().int(),
'hosted_verification_url': z.string(),
'microdeposit_type': z.enum(['amounts', 'descriptor_code'])
});

export type SetupIntentNextActionVerifyWithMicrodepositsModel = z.infer<typeof SetupIntentNextActionVerifyWithMicrodeposits>;

export const SetupIntentNextAction = z.object({
'cashapp_handle_redirect_or_display_qr_code': PaymentIntentNextActionCashappHandleRedirectOrDisplayQrCode.optional(),
'redirect_to_url': SetupIntentNextActionRedirectToUrl.optional(),
'type': z.string(),
'use_stripe_sdk': z.object({}).optional(),
'verify_with_microdeposits': SetupIntentNextActionVerifyWithMicrodeposits.optional()
});

export type SetupIntentNextActionModel = z.infer<typeof SetupIntentNextAction>;

export const SetupIntentPaymentMethodOptionsMandateOptionsAcssDebit = z.object({
'custom_mandate_url': z.string().optional(),
'default_for': z.array(z.enum(['invoice', 'subscription'])).optional(),
'interval_description': z.string(),
'payment_schedule': z.enum(['combined', 'interval', 'sporadic']),
'transaction_type': z.enum(['business', 'personal'])
});

export type SetupIntentPaymentMethodOptionsMandateOptionsAcssDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsMandateOptionsAcssDebit>;

export const SetupIntentPaymentMethodOptionsAcssDebit = z.object({
'currency': z.enum(['cad', 'usd']),
'mandate_options': SetupIntentPaymentMethodOptionsMandateOptionsAcssDebit.optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type SetupIntentPaymentMethodOptionsAcssDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsAcssDebit>;

export const SetupIntentPaymentMethodOptionsAmazonPay = z.object({

});

export type SetupIntentPaymentMethodOptionsAmazonPayModel = z.infer<typeof SetupIntentPaymentMethodOptionsAmazonPay>;

export const SetupIntentPaymentMethodOptionsMandateOptionsBacsDebit = z.object({
'reference_prefix': z.string().optional()
});

export type SetupIntentPaymentMethodOptionsMandateOptionsBacsDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsMandateOptionsBacsDebit>;

export const SetupIntentPaymentMethodOptionsBacsDebit = z.object({
'mandate_options': SetupIntentPaymentMethodOptionsMandateOptionsBacsDebit.optional()
});

export type SetupIntentPaymentMethodOptionsBacsDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsBacsDebit>;

export const SetupIntentPaymentMethodOptionsCardMandateOptions = z.object({
'amount': z.number().int(),
'amount_type': z.enum(['fixed', 'maximum']),
'currency': z.string(),
'description': z.string(),
'end_date': z.number().int(),
'interval': z.enum(['day', 'month', 'sporadic', 'week', 'year']),
'interval_count': z.number().int(),
'reference': z.string(),
'start_date': z.number().int(),
'supported_types': z.array(z.enum(['india']))
});

export type SetupIntentPaymentMethodOptionsCardMandateOptionsModel = z.infer<typeof SetupIntentPaymentMethodOptionsCardMandateOptions>;

export const SetupIntentPaymentMethodOptionsCard = z.object({
'mandate_options': z.union([SetupIntentPaymentMethodOptionsCardMandateOptions]),
'network': z.enum(['amex', 'cartes_bancaires', 'diners', 'discover', 'eftpos_au', 'girocard', 'interac', 'jcb', 'link', 'mastercard', 'unionpay', 'unknown', 'visa']),
'request_three_d_secure': z.enum(['any', 'automatic', 'challenge'])
});

export type SetupIntentPaymentMethodOptionsCardModel = z.infer<typeof SetupIntentPaymentMethodOptionsCard>;

export const SetupIntentPaymentMethodOptionsCardPresent = z.object({

});

export type SetupIntentPaymentMethodOptionsCardPresentModel = z.infer<typeof SetupIntentPaymentMethodOptionsCardPresent>;

export const SetupIntentPaymentMethodOptionsKlarna = z.object({
'currency': z.string(),
'preferred_locale': z.string()
});

export type SetupIntentPaymentMethodOptionsKlarnaModel = z.infer<typeof SetupIntentPaymentMethodOptionsKlarna>;

export const SetupIntentPaymentMethodOptionsLink = z.object({
'persistent_token': z.string()
});

export type SetupIntentPaymentMethodOptionsLinkModel = z.infer<typeof SetupIntentPaymentMethodOptionsLink>;

export const SetupIntentPaymentMethodOptionsPaypal = z.object({
'billing_agreement_id': z.string()
});

export type SetupIntentPaymentMethodOptionsPaypalModel = z.infer<typeof SetupIntentPaymentMethodOptionsPaypal>;

export const SetupIntentPaymentMethodOptionsMandateOptionsSepaDebit = z.object({
'reference_prefix': z.string().optional()
});

export type SetupIntentPaymentMethodOptionsMandateOptionsSepaDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsMandateOptionsSepaDebit>;

export const SetupIntentPaymentMethodOptionsSepaDebit = z.object({
'mandate_options': SetupIntentPaymentMethodOptionsMandateOptionsSepaDebit.optional()
});

export type SetupIntentPaymentMethodOptionsSepaDebitModel = z.infer<typeof SetupIntentPaymentMethodOptionsSepaDebit>;

export const SetupIntentPaymentMethodOptionsUsBankAccount = z.object({
'financial_connections': LinkedAccountOptionsCommon.optional(),
'mandate_options': PaymentMethodOptionsUsBankAccountMandateOptions.optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type SetupIntentPaymentMethodOptionsUsBankAccountModel = z.infer<typeof SetupIntentPaymentMethodOptionsUsBankAccount>;

export const SetupIntentPaymentMethodOptions = z.object({
'acss_debit': SetupIntentPaymentMethodOptionsAcssDebit.optional(),
'amazon_pay': SetupIntentPaymentMethodOptionsAmazonPay.optional(),
'bacs_debit': SetupIntentPaymentMethodOptionsBacsDebit.optional(),
'card': SetupIntentPaymentMethodOptionsCard.optional(),
'card_present': SetupIntentPaymentMethodOptionsCardPresent.optional(),
'klarna': SetupIntentPaymentMethodOptionsKlarna.optional(),
'link': SetupIntentPaymentMethodOptionsLink.optional(),
'paypal': SetupIntentPaymentMethodOptionsPaypal.optional(),
'sepa_debit': SetupIntentPaymentMethodOptionsSepaDebit.optional(),
'us_bank_account': SetupIntentPaymentMethodOptionsUsBankAccount.optional()
});

export type SetupIntentPaymentMethodOptionsModel = z.infer<typeof SetupIntentPaymentMethodOptions>;

export const SetupIntent: z.ZodType<SetupIntentModel> = z.object({
'application': z.union([z.string(), Application]),
'attach_to_self': z.boolean().optional(),
'automatic_payment_methods': z.union([PaymentFlowsAutomaticPaymentMethodsSetupIntent]),
'cancellation_reason': z.enum(['abandoned', 'duplicate', 'requested_by_customer']),
'client_secret': z.string(),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'description': z.string(),
'excluded_payment_method_types': z.array(z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'crypto', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip'])),
'flow_directions': z.array(z.enum(['inbound', 'outbound'])).optional(),
'id': z.string(),
'last_setup_error': z.union([z.lazy(() => ApiErrors)]),
'latest_attempt': z.union([z.string(), z.lazy(() => SetupAttempt)]),
'livemode': z.boolean(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'metadata': z.record(z.string(), z.string()),
'next_action': z.union([SetupIntentNextAction]),
'object': z.enum(['setup_intent']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'payment_method_configuration_details': z.union([PaymentMethodConfigBizPaymentMethodConfigurationDetails]),
'payment_method_options': z.union([SetupIntentPaymentMethodOptions]),
'payment_method_types': z.array(z.string()),
'single_use_mandate': z.union([z.string(), z.lazy(() => Mandate)]),
'status': z.enum(['canceled', 'processing', 'requires_action', 'requires_confirmation', 'requires_payment_method', 'succeeded']),
'usage': z.string()
});

export const ApiErrors: z.ZodType<ApiErrorsModel> = z.object({
'advice_code': z.string().optional(),
'charge': z.string().optional(),
'code': z.enum(['account_closed', 'account_country_invalid_address', 'account_error_country_change_requires_additional_steps', 'account_information_mismatch', 'account_invalid', 'account_number_invalid', 'acss_debit_session_incomplete', 'alipay_upgrade_required', 'amount_too_large', 'amount_too_small', 'api_key_expired', 'application_fees_not_allowed', 'authentication_required', 'balance_insufficient', 'balance_invalid_parameter', 'bank_account_bad_routing_numbers', 'bank_account_declined', 'bank_account_exists', 'bank_account_restricted', 'bank_account_unusable', 'bank_account_unverified', 'bank_account_verification_failed', 'billing_invalid_mandate', 'bitcoin_upgrade_required', 'capture_charge_authorization_expired', 'capture_unauthorized_payment', 'card_decline_rate_limit_exceeded', 'card_declined', 'cardholder_phone_number_required', 'charge_already_captured', 'charge_already_refunded', 'charge_disputed', 'charge_exceeds_source_limit', 'charge_exceeds_transaction_limit', 'charge_expired_for_capture', 'charge_invalid_parameter', 'charge_not_refundable', 'clearing_code_unsupported', 'country_code_invalid', 'country_unsupported', 'coupon_expired', 'customer_max_payment_methods', 'customer_max_subscriptions', 'customer_session_expired', 'customer_tax_location_invalid', 'debit_not_authorized', 'email_invalid', 'expired_card', 'financial_connections_account_inactive', 'financial_connections_account_pending_account_numbers', 'financial_connections_account_unavailable_account_numbers', 'financial_connections_no_successful_transaction_refresh', 'forwarding_api_inactive', 'forwarding_api_invalid_parameter', 'forwarding_api_retryable_upstream_error', 'forwarding_api_upstream_connection_error', 'forwarding_api_upstream_connection_timeout', 'forwarding_api_upstream_error', 'idempotency_key_in_use', 'incorrect_address', 'incorrect_cvc', 'incorrect_number', 'incorrect_zip', 'india_recurring_payment_mandate_canceled', 'instant_payouts_config_disabled', 'instant_payouts_currency_disabled', 'instant_payouts_limit_exceeded', 'instant_payouts_unsupported', 'insufficient_funds', 'intent_invalid_state', 'intent_verification_method_missing', 'invalid_card_type', 'invalid_characters', 'invalid_charge_amount', 'invalid_cvc', 'invalid_expiry_month', 'invalid_expiry_year', 'invalid_mandate_reference_prefix_format', 'invalid_number', 'invalid_source_usage', 'invalid_tax_location', 'invoice_no_customer_line_items', 'invoice_no_payment_method_types', 'invoice_no_subscription_line_items', 'invoice_not_editable', 'invoice_on_behalf_of_not_editable', 'invoice_payment_intent_requires_action', 'invoice_upcoming_none', 'livemode_mismatch', 'lock_timeout', 'missing', 'no_account', 'not_allowed_on_standard_account', 'out_of_inventory', 'ownership_declaration_not_allowed', 'parameter_invalid_empty', 'parameter_invalid_integer', 'parameter_invalid_string_blank', 'parameter_invalid_string_empty', 'parameter_missing', 'parameter_unknown', 'parameters_exclusive', 'payment_intent_action_required', 'payment_intent_authentication_failure', 'payment_intent_incompatible_payment_method', 'payment_intent_invalid_parameter', 'payment_intent_konbini_rejected_confirmation_number', 'payment_intent_mandate_invalid', 'payment_intent_payment_attempt_expired', 'payment_intent_payment_attempt_failed', 'payment_intent_rate_limit_exceeded', 'payment_intent_unexpected_state', 'payment_method_bank_account_already_verified', 'payment_method_bank_account_blocked', 'payment_method_billing_details_address_missing', 'payment_method_configuration_failures', 'payment_method_currency_mismatch', 'payment_method_customer_decline', 'payment_method_invalid_parameter', 'payment_method_invalid_parameter_testmode', 'payment_method_microdeposit_failed', 'payment_method_microdeposit_verification_amounts_invalid', 'payment_method_microdeposit_verification_amounts_mismatch', 'payment_method_microdeposit_verification_attempts_exceeded', 'payment_method_microdeposit_verification_descriptor_code_mismatch', 'payment_method_microdeposit_verification_timeout', 'payment_method_not_available', 'payment_method_provider_decline', 'payment_method_provider_timeout', 'payment_method_unactivated', 'payment_method_unexpected_state', 'payment_method_unsupported_type', 'payout_reconciliation_not_ready', 'payouts_limit_exceeded', 'payouts_not_allowed', 'platform_account_required', 'platform_api_key_expired', 'postal_code_invalid', 'processing_error', 'product_inactive', 'progressive_onboarding_limit_exceeded', 'rate_limit', 'refer_to_customer', 'refund_disputed_payment', 'resource_already_exists', 'resource_missing', 'return_intent_already_processed', 'routing_number_invalid', 'secret_key_required', 'sepa_unsupported_account', 'setup_attempt_failed', 'setup_intent_authentication_failure', 'setup_intent_invalid_parameter', 'setup_intent_mandate_invalid', 'setup_intent_mobile_wallet_unsupported', 'setup_intent_setup_attempt_expired', 'setup_intent_unexpected_state', 'shipping_address_invalid', 'shipping_calculation_failed', 'sku_inactive', 'state_unsupported', 'status_transition_invalid', 'stripe_tax_inactive', 'tax_id_invalid', 'tax_id_prohibited', 'taxes_calculation_failed', 'terminal_location_country_unsupported', 'terminal_reader_busy', 'terminal_reader_hardware_fault', 'terminal_reader_invalid_location_for_activation', 'terminal_reader_invalid_location_for_payment', 'terminal_reader_offline', 'terminal_reader_timeout', 'testmode_charges_only', 'tls_version_unsupported', 'token_already_used', 'token_card_network_invalid', 'token_in_use', 'transfer_source_balance_parameters_mismatch', 'transfers_not_allowed', 'url_invalid']).optional(),
'decline_code': z.string().optional(),
'doc_url': z.string().optional(),
'message': z.string().optional(),
'network_advice_code': z.string().optional(),
'network_decline_code': z.string().optional(),
'param': z.string().optional(),
'payment_intent': z.lazy(() => PaymentIntent).optional(),
'payment_method': z.lazy(() => PaymentMethod).optional(),
'payment_method_type': z.string().optional(),
'request_log_url': z.string().optional(),
'setup_intent': z.lazy(() => SetupIntent).optional(),
'source': z.lazy(() => PaymentSource).optional(),
'type': z.enum(['api_error', 'card_error', 'idempotency_error', 'invalid_request_error'])
});

export const SetupAttempt: z.ZodType<SetupAttemptModel> = z.object({
'application': z.union([z.string(), Application]),
'attach_to_self': z.boolean().optional(),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'flow_directions': z.array(z.enum(['inbound', 'outbound'])),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['setup_attempt']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'payment_method_details': z.lazy(() => SetupAttemptPaymentMethodDetails),
'setup_error': z.union([z.lazy(() => ApiErrors)]),
'setup_intent': z.union([z.string(), z.lazy(() => SetupIntent)]),
'status': z.string(),
'usage': z.string()
});

export const PaymentMethodCardGeneratedCard: z.ZodType<PaymentMethodCardGeneratedCardModel> = z.object({
'charge': z.string(),
'payment_method_details': z.union([CardGeneratedFromPaymentMethodDetails]),
'setup_attempt': z.union([z.string(), z.lazy(() => SetupAttempt)])
});

export const Networks = z.object({
'available': z.array(z.string()),
'preferred': z.string()
});

export type NetworksModel = z.infer<typeof Networks>;

export const ThreeDSecureUsage = z.object({
'supported': z.boolean()
});

export type ThreeDSecureUsageModel = z.infer<typeof ThreeDSecureUsage>;

export const PaymentMethodCardWalletAmexExpressCheckout = z.object({

});

export type PaymentMethodCardWalletAmexExpressCheckoutModel = z.infer<typeof PaymentMethodCardWalletAmexExpressCheckout>;

export const PaymentMethodCardWalletApplePay = z.object({

});

export type PaymentMethodCardWalletApplePayModel = z.infer<typeof PaymentMethodCardWalletApplePay>;

export const PaymentMethodCardWalletGooglePay = z.object({

});

export type PaymentMethodCardWalletGooglePayModel = z.infer<typeof PaymentMethodCardWalletGooglePay>;

export const PaymentMethodCardWalletLink = z.object({

});

export type PaymentMethodCardWalletLinkModel = z.infer<typeof PaymentMethodCardWalletLink>;

export const PaymentMethodCardWalletMasterpass = z.object({
'billing_address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'shipping_address': z.union([Address])
});

export type PaymentMethodCardWalletMasterpassModel = z.infer<typeof PaymentMethodCardWalletMasterpass>;

export const PaymentMethodCardWalletSamsungPay = z.object({

});

export type PaymentMethodCardWalletSamsungPayModel = z.infer<typeof PaymentMethodCardWalletSamsungPay>;

export const PaymentMethodCardWalletVisaCheckout = z.object({
'billing_address': z.union([Address]),
'email': z.string(),
'name': z.string(),
'shipping_address': z.union([Address])
});

export type PaymentMethodCardWalletVisaCheckoutModel = z.infer<typeof PaymentMethodCardWalletVisaCheckout>;

export const PaymentMethodCardWallet = z.object({
'amex_express_checkout': PaymentMethodCardWalletAmexExpressCheckout.optional(),
'apple_pay': PaymentMethodCardWalletApplePay.optional(),
'dynamic_last4': z.string(),
'google_pay': PaymentMethodCardWalletGooglePay.optional(),
'link': PaymentMethodCardWalletLink.optional(),
'masterpass': PaymentMethodCardWalletMasterpass.optional(),
'samsung_pay': PaymentMethodCardWalletSamsungPay.optional(),
'type': z.enum(['amex_express_checkout', 'apple_pay', 'google_pay', 'link', 'masterpass', 'samsung_pay', 'visa_checkout']),
'visa_checkout': PaymentMethodCardWalletVisaCheckout.optional()
});

export type PaymentMethodCardWalletModel = z.infer<typeof PaymentMethodCardWallet>;

export const PaymentMethodCard: z.ZodType<PaymentMethodCardModel> = z.object({
'brand': z.string(),
'checks': z.union([PaymentMethodCardChecks]),
'country': z.string(),
'description': z.string().optional(),
'display_brand': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string().optional(),
'funding': z.string(),
'generated_from': z.union([z.lazy(() => PaymentMethodCardGeneratedCard)]),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'networks': z.union([Networks]),
'regulated_status': z.enum(['regulated', 'unregulated']),
'three_d_secure_usage': z.union([ThreeDSecureUsage]),
'wallet': z.union([PaymentMethodCardWallet])
});

export const PaymentMethodCardPresentNetworks = z.object({
'available': z.array(z.string()),
'preferred': z.string()
});

export type PaymentMethodCardPresentNetworksModel = z.infer<typeof PaymentMethodCardPresentNetworks>;

export const PaymentMethodCardPresent = z.object({
'brand': z.string(),
'brand_product': z.string(),
'cardholder_name': z.string(),
'country': z.string(),
'description': z.string().optional(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string(),
'funding': z.string(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'networks': z.union([PaymentMethodCardPresentNetworks]),
'offline': z.union([PaymentMethodDetailsCardPresentOffline]),
'preferred_locales': z.array(z.string()),
'read_method': z.enum(['contact_emv', 'contactless_emv', 'contactless_magstripe_mode', 'magnetic_stripe_fallback', 'magnetic_stripe_track2']),
'wallet': PaymentFlowsPrivatePaymentMethodsCardPresentCommonWallet.optional()
});

export type PaymentMethodCardPresentModel = z.infer<typeof PaymentMethodCardPresent>;

export const PaymentMethodCashapp = z.object({
'buyer_id': z.string(),
'cashtag': z.string()
});

export type PaymentMethodCashappModel = z.infer<typeof PaymentMethodCashapp>;

export const PaymentMethodCrypto = z.object({

});

export type PaymentMethodCryptoModel = z.infer<typeof PaymentMethodCrypto>;

export const CustomLogo = z.object({
'content_type': z.string(),
'url': z.string()
});

export type CustomLogoModel = z.infer<typeof CustomLogo>;

export const PaymentMethodCustom = z.object({
'display_name': z.string(),
'logo': z.union([CustomLogo]),
'type': z.string()
});

export type PaymentMethodCustomModel = z.infer<typeof PaymentMethodCustom>;

export const PaymentMethodCustomerBalance = z.object({

});

export type PaymentMethodCustomerBalanceModel = z.infer<typeof PaymentMethodCustomerBalance>;

export const PaymentMethodEps = z.object({
'bank': z.enum(['arzte_und_apotheker_bank', 'austrian_anadi_bank_ag', 'bank_austria', 'bankhaus_carl_spangler', 'bankhaus_schelhammer_und_schattera_ag', 'bawag_psk_ag', 'bks_bank_ag', 'brull_kallmus_bank_ag', 'btv_vier_lander_bank', 'capital_bank_grawe_gruppe_ag', 'deutsche_bank_ag', 'dolomitenbank', 'easybank_ag', 'erste_bank_und_sparkassen', 'hypo_alpeadriabank_international_ag', 'hypo_bank_burgenland_aktiengesellschaft', 'hypo_noe_lb_fur_niederosterreich_u_wien', 'hypo_oberosterreich_salzburg_steiermark', 'hypo_tirol_bank_ag', 'hypo_vorarlberg_bank_ag', 'marchfelder_bank', 'oberbank_ag', 'raiffeisen_bankengruppe_osterreich', 'schoellerbank_ag', 'sparda_bank_wien', 'volksbank_gruppe', 'volkskreditbank_ag', 'vr_bank_braunau'])
});

export type PaymentMethodEpsModel = z.infer<typeof PaymentMethodEps>;

export const PaymentMethodFpx = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'bank': z.enum(['affin_bank', 'agrobank', 'alliance_bank', 'ambank', 'bank_islam', 'bank_muamalat', 'bank_of_china', 'bank_rakyat', 'bsn', 'cimb', 'deutsche_bank', 'hong_leong_bank', 'hsbc', 'kfh', 'maybank2e', 'maybank2u', 'ocbc', 'pb_enterprise', 'public_bank', 'rhb', 'standard_chartered', 'uob'])
});

export type PaymentMethodFpxModel = z.infer<typeof PaymentMethodFpx>;

export const PaymentMethodGiropay = z.object({

});

export type PaymentMethodGiropayModel = z.infer<typeof PaymentMethodGiropay>;

export const PaymentMethodGrabpay = z.object({

});

export type PaymentMethodGrabpayModel = z.infer<typeof PaymentMethodGrabpay>;

export const PaymentMethodIdeal = z.object({
'bank': z.enum(['abn_amro', 'asn_bank', 'bunq', 'buut', 'finom', 'handelsbanken', 'ing', 'knab', 'moneyou', 'n26', 'nn', 'rabobank', 'regiobank', 'revolut', 'sns_bank', 'triodos_bank', 'van_lanschot', 'yoursafe']),
'bic': z.enum(['ABNANL2A', 'ASNBNL21', 'BITSNL2A', 'BUNQNL2A', 'BUUTNL2A', 'FNOMNL22', 'FVLBNL22', 'HANDNL2A', 'INGBNL2A', 'KNABNL2H', 'MOYONL21', 'NNBANL2G', 'NTSBDEB1', 'RABONL2U', 'RBRBNL21', 'REVOIE23', 'REVOLT21', 'SNSBNL2A', 'TRIONL2U'])
});

export type PaymentMethodIdealModel = z.infer<typeof PaymentMethodIdeal>;

export const PaymentMethodInteracPresent = z.object({
'brand': z.string(),
'cardholder_name': z.string(),
'country': z.string(),
'description': z.string().optional(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string(),
'funding': z.string(),
'iin': z.string().optional(),
'issuer': z.string().optional(),
'last4': z.string(),
'networks': z.union([PaymentMethodCardPresentNetworks]),
'preferred_locales': z.array(z.string()),
'read_method': z.enum(['contact_emv', 'contactless_emv', 'contactless_magstripe_mode', 'magnetic_stripe_fallback', 'magnetic_stripe_track2'])
});

export type PaymentMethodInteracPresentModel = z.infer<typeof PaymentMethodInteracPresent>;

export const PaymentMethodKakaoPay = z.object({

});

export type PaymentMethodKakaoPayModel = z.infer<typeof PaymentMethodKakaoPay>;

export const PaymentFlowsPrivatePaymentMethodsKlarnaDob = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type PaymentFlowsPrivatePaymentMethodsKlarnaDobModel = z.infer<typeof PaymentFlowsPrivatePaymentMethodsKlarnaDob>;

export const PaymentMethodKlarna = z.object({
'dob': z.union([PaymentFlowsPrivatePaymentMethodsKlarnaDob]).optional()
});

export type PaymentMethodKlarnaModel = z.infer<typeof PaymentMethodKlarna>;

export const PaymentMethodKonbini = z.object({

});

export type PaymentMethodKonbiniModel = z.infer<typeof PaymentMethodKonbini>;

export const PaymentMethodKrCard = z.object({
'brand': z.enum(['bc', 'citi', 'hana', 'hyundai', 'jeju', 'jeonbuk', 'kakaobank', 'kbank', 'kdbbank', 'kookmin', 'kwangju', 'lotte', 'mg', 'nh', 'post', 'samsung', 'savingsbank', 'shinhan', 'shinhyup', 'suhyup', 'tossbank', 'woori']),
'last4': z.string()
});

export type PaymentMethodKrCardModel = z.infer<typeof PaymentMethodKrCard>;

export const PaymentMethodLink = z.object({
'email': z.string(),
'persistent_token': z.string().optional()
});

export type PaymentMethodLinkModel = z.infer<typeof PaymentMethodLink>;

export const PaymentMethodMbWay = z.object({

});

export type PaymentMethodMbWayModel = z.infer<typeof PaymentMethodMbWay>;

export const PaymentMethodMobilepay = z.object({

});

export type PaymentMethodMobilepayModel = z.infer<typeof PaymentMethodMobilepay>;

export const PaymentMethodMultibanco = z.object({

});

export type PaymentMethodMultibancoModel = z.infer<typeof PaymentMethodMultibanco>;

export const PaymentMethodNaverPay = z.object({
'buyer_id': z.string(),
'funding': z.enum(['card', 'points'])
});

export type PaymentMethodNaverPayModel = z.infer<typeof PaymentMethodNaverPay>;

export const PaymentMethodNzBankAccount = z.object({
'account_holder_name': z.string(),
'bank_code': z.string(),
'bank_name': z.string(),
'branch_code': z.string(),
'last4': z.string(),
'suffix': z.string()
});

export type PaymentMethodNzBankAccountModel = z.infer<typeof PaymentMethodNzBankAccount>;

export const PaymentMethodOxxo = z.object({

});

export type PaymentMethodOxxoModel = z.infer<typeof PaymentMethodOxxo>;

export const PaymentMethodP24 = z.object({
'bank': z.enum(['alior_bank', 'bank_millennium', 'bank_nowy_bfg_sa', 'bank_pekao_sa', 'banki_spbdzielcze', 'blik', 'bnp_paribas', 'boz', 'citi_handlowy', 'credit_agricole', 'envelobank', 'etransfer_pocztowy24', 'getin_bank', 'ideabank', 'ing', 'inteligo', 'mbank_mtransfer', 'nest_przelew', 'noble_pay', 'pbac_z_ipko', 'plus_bank', 'santander_przelew24', 'tmobile_usbugi_bankowe', 'toyota_bank', 'velobank', 'volkswagen_bank'])
});

export type PaymentMethodP24Model = z.infer<typeof PaymentMethodP24>;

export const PaymentMethodPayByBank = z.object({

});

export type PaymentMethodPayByBankModel = z.infer<typeof PaymentMethodPayByBank>;

export const PaymentMethodPayco = z.object({

});

export type PaymentMethodPaycoModel = z.infer<typeof PaymentMethodPayco>;

export const PaymentMethodPaynow = z.object({

});

export type PaymentMethodPaynowModel = z.infer<typeof PaymentMethodPaynow>;

export const PaymentMethodPaypal = z.object({
'country': z.string(),
'payer_email': z.string(),
'payer_id': z.string()
});

export type PaymentMethodPaypalModel = z.infer<typeof PaymentMethodPaypal>;

export const PaymentMethodPix = z.object({

});

export type PaymentMethodPixModel = z.infer<typeof PaymentMethodPix>;

export const PaymentMethodPromptpay = z.object({

});

export type PaymentMethodPromptpayModel = z.infer<typeof PaymentMethodPromptpay>;

export const PaymentMethodRevolutPay = z.object({

});

export type PaymentMethodRevolutPayModel = z.infer<typeof PaymentMethodRevolutPay>;

export const PaymentMethodSamsungPay = z.object({

});

export type PaymentMethodSamsungPayModel = z.infer<typeof PaymentMethodSamsungPay>;

export const PaymentMethodSatispay = z.object({

});

export type PaymentMethodSatispayModel = z.infer<typeof PaymentMethodSatispay>;

export const SepaDebitGeneratedFrom = z.object({
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'setup_attempt': z.union([z.string(), z.lazy(() => SetupAttempt)])
});

export type SepaDebitGeneratedFromModel = z.infer<typeof SepaDebitGeneratedFrom>;

export const PaymentMethodSepaDebit = z.object({
'bank_code': z.string(),
'branch_code': z.string(),
'country': z.string(),
'fingerprint': z.string(),
'generated_from': z.union([SepaDebitGeneratedFrom]),
'last4': z.string()
});

export type PaymentMethodSepaDebitModel = z.infer<typeof PaymentMethodSepaDebit>;

export const PaymentMethodSofort = z.object({
'country': z.string()
});

export type PaymentMethodSofortModel = z.infer<typeof PaymentMethodSofort>;

export const PaymentMethodSwish = z.object({

});

export type PaymentMethodSwishModel = z.infer<typeof PaymentMethodSwish>;

export const PaymentMethodTwint = z.object({

});

export type PaymentMethodTwintModel = z.infer<typeof PaymentMethodTwint>;

export const UsBankAccountNetworks = z.object({
'preferred': z.string(),
'supported': z.array(z.enum(['ach', 'us_domestic_wire']))
});

export type UsBankAccountNetworksModel = z.infer<typeof UsBankAccountNetworks>;

export const PaymentMethodUsBankAccountBlocked = z.object({
'network_code': z.enum(['R02', 'R03', 'R04', 'R05', 'R07', 'R08', 'R10', 'R11', 'R16', 'R20', 'R29', 'R31']),
'reason': z.enum(['bank_account_closed', 'bank_account_frozen', 'bank_account_invalid_details', 'bank_account_restricted', 'bank_account_unusable', 'debit_not_authorized', 'tokenized_account_number_deactivated'])
});

export type PaymentMethodUsBankAccountBlockedModel = z.infer<typeof PaymentMethodUsBankAccountBlocked>;

export const PaymentMethodUsBankAccountStatusDetails = z.object({
'blocked': PaymentMethodUsBankAccountBlocked.optional()
});

export type PaymentMethodUsBankAccountStatusDetailsModel = z.infer<typeof PaymentMethodUsBankAccountStatusDetails>;

export const PaymentMethodUsBankAccount = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'financial_connections_account': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'networks': z.union([UsBankAccountNetworks]),
'routing_number': z.string(),
'status_details': z.union([PaymentMethodUsBankAccountStatusDetails])
});

export type PaymentMethodUsBankAccountModel = z.infer<typeof PaymentMethodUsBankAccount>;

export const PaymentMethodWechatPay = z.object({

});

export type PaymentMethodWechatPayModel = z.infer<typeof PaymentMethodWechatPay>;

export const PaymentMethodZip = z.object({

});

export type PaymentMethodZipModel = z.infer<typeof PaymentMethodZip>;

export const PaymentMethod: z.ZodType<PaymentMethodModel> = z.object({
'acss_debit': PaymentMethodAcssDebit.optional(),
'affirm': PaymentMethodAffirm.optional(),
'afterpay_clearpay': PaymentMethodAfterpayClearpay.optional(),
'alipay': PaymentFlowsPrivatePaymentMethodsAlipay.optional(),
'allow_redisplay': z.enum(['always', 'limited', 'unspecified']).optional(),
'alma': PaymentMethodAlma.optional(),
'amazon_pay': PaymentMethodAmazonPay.optional(),
'au_becs_debit': PaymentMethodAuBecsDebit.optional(),
'bacs_debit': PaymentMethodBacsDebit.optional(),
'bancontact': PaymentMethodBancontact.optional(),
'billie': PaymentMethodBillie.optional(),
'billing_details': BillingDetails,
'blik': PaymentMethodBlik.optional(),
'boleto': PaymentMethodBoleto.optional(),
'card': z.lazy(() => PaymentMethodCard).optional(),
'card_present': PaymentMethodCardPresent.optional(),
'cashapp': PaymentMethodCashapp.optional(),
'created': z.number().int(),
'crypto': PaymentMethodCrypto.optional(),
'custom': PaymentMethodCustom.optional(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'customer_balance': PaymentMethodCustomerBalance.optional(),
'eps': PaymentMethodEps.optional(),
'fpx': PaymentMethodFpx.optional(),
'giropay': PaymentMethodGiropay.optional(),
'grabpay': PaymentMethodGrabpay.optional(),
'id': z.string(),
'ideal': PaymentMethodIdeal.optional(),
'interac_present': PaymentMethodInteracPresent.optional(),
'kakao_pay': PaymentMethodKakaoPay.optional(),
'klarna': PaymentMethodKlarna.optional(),
'konbini': PaymentMethodKonbini.optional(),
'kr_card': PaymentMethodKrCard.optional(),
'link': PaymentMethodLink.optional(),
'livemode': z.boolean(),
'mb_way': PaymentMethodMbWay.optional(),
'metadata': z.record(z.string(), z.string()),
'mobilepay': PaymentMethodMobilepay.optional(),
'multibanco': PaymentMethodMultibanco.optional(),
'naver_pay': PaymentMethodNaverPay.optional(),
'nz_bank_account': PaymentMethodNzBankAccount.optional(),
'object': z.enum(['payment_method']),
'oxxo': PaymentMethodOxxo.optional(),
'p24': PaymentMethodP24.optional(),
'pay_by_bank': PaymentMethodPayByBank.optional(),
'payco': PaymentMethodPayco.optional(),
'paynow': PaymentMethodPaynow.optional(),
'paypal': PaymentMethodPaypal.optional(),
'pix': PaymentMethodPix.optional(),
'promptpay': PaymentMethodPromptpay.optional(),
'radar_options': RadarRadarOptions.optional(),
'revolut_pay': PaymentMethodRevolutPay.optional(),
'samsung_pay': PaymentMethodSamsungPay.optional(),
'satispay': PaymentMethodSatispay.optional(),
'sepa_debit': PaymentMethodSepaDebit.optional(),
'sofort': PaymentMethodSofort.optional(),
'swish': PaymentMethodSwish.optional(),
'twint': PaymentMethodTwint.optional(),
'type': z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'card_present', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'interac_present', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']),
'us_bank_account': PaymentMethodUsBankAccount.optional(),
'wechat_pay': PaymentMethodWechatPay.optional(),
'zip': PaymentMethodZip.optional()
});

export const InvoiceSettingCustomerRenderingOptions = z.object({
'amount_tax_display': z.string(),
'template': z.string()
});

export type InvoiceSettingCustomerRenderingOptionsModel = z.infer<typeof InvoiceSettingCustomerRenderingOptions>;

export const InvoiceSettingCustomerSetting: z.ZodType<InvoiceSettingCustomerSettingModel> = z.object({
'custom_fields': z.array(InvoiceSettingCustomField),
'default_payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'footer': z.string(),
'rendering_options': z.union([InvoiceSettingCustomerRenderingOptions])
});

export const DeletedApplication = z.object({
'deleted': z.boolean(),
'id': z.string(),
'name': z.string(),
'object': z.enum(['application'])
});

export type DeletedApplicationModel = z.infer<typeof DeletedApplication>;

export const ConnectAccountReference: z.ZodType<ConnectAccountReferenceModel> = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]).optional(),
'type': z.enum(['account', 'self'])
});

export const SubscriptionAutomaticTax: z.ZodType<SubscriptionAutomaticTaxModel> = z.object({
'disabled_reason': z.enum(['requires_location_inputs']),
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)])
});

export const SubscriptionsResourceBillingCycleAnchorConfig = z.object({
'day_of_month': z.number().int(),
'hour': z.number().int(),
'minute': z.number().int(),
'month': z.number().int(),
'second': z.number().int()
});

export type SubscriptionsResourceBillingCycleAnchorConfigModel = z.infer<typeof SubscriptionsResourceBillingCycleAnchorConfig>;

export const SubscriptionsResourceBillingModeFlexible = z.object({
'proration_discounts': z.enum(['included', 'itemized']).optional()
});

export type SubscriptionsResourceBillingModeFlexibleModel = z.infer<typeof SubscriptionsResourceBillingModeFlexible>;

export const SubscriptionsResourceBillingMode = z.object({
'flexible': z.union([SubscriptionsResourceBillingModeFlexible]),
'type': z.enum(['classic', 'flexible']),
'updated_at': z.number().int().optional()
});

export type SubscriptionsResourceBillingModeModel = z.infer<typeof SubscriptionsResourceBillingMode>;

export const SubscriptionBillingThresholds = z.object({
'amount_gte': z.number().int(),
'reset_billing_cycle_anchor': z.boolean()
});

export type SubscriptionBillingThresholdsModel = z.infer<typeof SubscriptionBillingThresholds>;

export const CancellationDetails = z.object({
'comment': z.string(),
'feedback': z.enum(['customer_service', 'low_quality', 'missing_features', 'other', 'switched_service', 'too_complex', 'too_expensive', 'unused']),
'reason': z.enum(['cancellation_requested', 'payment_disputed', 'payment_failed'])
});

export type CancellationDetailsModel = z.infer<typeof CancellationDetails>;

export const TaxRateFlatAmount = z.object({
'amount': z.number().int(),
'currency': z.string()
});

export type TaxRateFlatAmountModel = z.infer<typeof TaxRateFlatAmount>;

export const TaxRate = z.object({
'active': z.boolean(),
'country': z.string(),
'created': z.number().int(),
'description': z.string(),
'display_name': z.string(),
'effective_percentage': z.number(),
'flat_amount': z.union([TaxRateFlatAmount]),
'id': z.string(),
'inclusive': z.boolean(),
'jurisdiction': z.string(),
'jurisdiction_level': z.enum(['city', 'country', 'county', 'district', 'multiple', 'state']),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['tax_rate']),
'percentage': z.number(),
'rate_type': z.enum(['flat_amount', 'percentage']),
'state': z.string(),
'tax_type': z.enum(['amusement_tax', 'communications_tax', 'gst', 'hst', 'igst', 'jct', 'lease_tax', 'pst', 'qst', 'retail_delivery_fee', 'rst', 'sales_tax', 'service_tax', 'vat'])
});

export type TaxRateModel = z.infer<typeof TaxRate>;

export const TaxIDsOwner: z.ZodType<TaxIDsOwnerModel> = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]).optional(),
'application': z.union([z.string(), Application]).optional(),
'customer': z.union([z.string(), z.lazy(() => Customer)]).optional(),
'type': z.enum(['account', 'application', 'customer', 'self'])
});

export const TaxIdVerification = z.object({
'status': z.enum(['pending', 'unavailable', 'unverified', 'verified']),
'verified_address': z.string(),
'verified_name': z.string()
});

export type TaxIdVerificationModel = z.infer<typeof TaxIdVerification>;

export const TaxId: z.ZodType<TaxIdModel> = z.object({
'country': z.string(),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['tax_id']),
'owner': z.union([z.lazy(() => TaxIDsOwner)]),
'type': z.enum(['ad_nrt', 'ae_trn', 'al_tin', 'am_tin', 'ao_tin', 'ar_cuit', 'au_abn', 'au_arn', 'aw_tin', 'az_tin', 'ba_tin', 'bb_tin', 'bd_bin', 'bf_ifu', 'bg_uic', 'bh_vat', 'bj_ifu', 'bo_tin', 'br_cnpj', 'br_cpf', 'bs_tin', 'by_tin', 'ca_bn', 'ca_gst_hst', 'ca_pst_bc', 'ca_pst_mb', 'ca_pst_sk', 'ca_qst', 'cd_nif', 'ch_uid', 'ch_vat', 'cl_tin', 'cm_niu', 'cn_tin', 'co_nit', 'cr_tin', 'cv_nif', 'de_stn', 'do_rcn', 'ec_ruc', 'eg_tin', 'es_cif', 'et_tin', 'eu_oss_vat', 'eu_vat', 'gb_vat', 'ge_vat', 'gn_nif', 'hk_br', 'hr_oib', 'hu_tin', 'id_npwp', 'il_vat', 'in_gst', 'is_vat', 'jp_cn', 'jp_rn', 'jp_trn', 'ke_pin', 'kg_tin', 'kh_tin', 'kr_brn', 'kz_bin', 'la_tin', 'li_uid', 'li_vat', 'ma_vat', 'md_vat', 'me_pib', 'mk_vat', 'mr_nif', 'mx_rfc', 'my_frp', 'my_itn', 'my_sst', 'ng_tin', 'no_vat', 'no_voec', 'np_pan', 'nz_gst', 'om_vat', 'pe_ruc', 'ph_tin', 'ro_tin', 'rs_pib', 'ru_inn', 'ru_kpp', 'sa_vat', 'sg_gst', 'sg_uen', 'si_tin', 'sn_ninea', 'sr_fin', 'sv_nit', 'th_vat', 'tj_tin', 'tr_tin', 'tw_vat', 'tz_vat', 'ua_vat', 'ug_tin', 'unknown', 'us_ein', 'uy_ruc', 'uz_tin', 'uz_vat', 've_rif', 'vn_tin', 'za_vat', 'zm_tin', 'zw_tin']),
'value': z.string(),
'verification': z.union([TaxIdVerification])
});

export const DeletedTaxId = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['tax_id'])
});

export type DeletedTaxIdModel = z.infer<typeof DeletedTaxId>;

export const SubscriptionsResourceSubscriptionInvoiceSettings: z.ZodType<SubscriptionsResourceSubscriptionInvoiceSettingsModel> = z.object({
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'issuer': z.lazy(() => ConnectAccountReference)
});

export const SubscriptionItemBillingThresholds = z.object({
'usage_gte': z.number().int()
});

export type SubscriptionItemBillingThresholdsModel = z.infer<typeof SubscriptionItemBillingThresholds>;

export const CustomUnitAmount = z.object({
'maximum': z.number().int(),
'minimum': z.number().int(),
'preset': z.number().int()
});

export type CustomUnitAmountModel = z.infer<typeof CustomUnitAmount>;

export const PriceTier = z.object({
'flat_amount': z.number().int(),
'flat_amount_decimal': z.string(),
'unit_amount': z.number().int(),
'unit_amount_decimal': z.string(),
'up_to': z.number().int()
});

export type PriceTierModel = z.infer<typeof PriceTier>;

export const CurrencyOption = z.object({
'custom_unit_amount': z.union([CustomUnitAmount]),
'tax_behavior': z.enum(['exclusive', 'inclusive', 'unspecified']),
'tiers': z.array(PriceTier).optional(),
'unit_amount': z.number().int(),
'unit_amount_decimal': z.string()
});

export type CurrencyOptionModel = z.infer<typeof CurrencyOption>;

export const DeletedProduct = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['product'])
});

export type DeletedProductModel = z.infer<typeof DeletedProduct>;

export const Recurring = z.object({
'interval': z.enum(['day', 'month', 'week', 'year']),
'interval_count': z.number().int(),
'meter': z.string(),
'trial_period_days': z.number().int(),
'usage_type': z.enum(['licensed', 'metered'])
});

export type RecurringModel = z.infer<typeof Recurring>;

export const TransformQuantity = z.object({
'divide_by': z.number().int(),
'round': z.enum(['down', 'up'])
});

export type TransformQuantityModel = z.infer<typeof TransformQuantity>;

export const Price: z.ZodType<PriceModel> = z.object({
'active': z.boolean(),
'billing_scheme': z.enum(['per_unit', 'tiered']),
'created': z.number().int(),
'currency': z.string(),
'currency_options': z.record(z.string(), CurrencyOption).optional(),
'custom_unit_amount': z.union([CustomUnitAmount]),
'id': z.string(),
'livemode': z.boolean(),
'lookup_key': z.string(),
'metadata': z.record(z.string(), z.string()),
'nickname': z.string(),
'object': z.enum(['price']),
'product': z.union([z.string(), z.lazy(() => Product), DeletedProduct]),
'recurring': z.union([Recurring]),
'tax_behavior': z.enum(['exclusive', 'inclusive', 'unspecified']),
'tiers': z.array(PriceTier).optional(),
'tiers_mode': z.enum(['graduated', 'volume']),
'transform_quantity': z.union([TransformQuantity]),
'type': z.enum(['one_time', 'recurring']),
'unit_amount': z.number().int(),
'unit_amount_decimal': z.string()
});

export const ProductMarketingFeature = z.object({
'name': z.string().optional()
});

export type ProductMarketingFeatureModel = z.infer<typeof ProductMarketingFeature>;

export const PackageDimensions = z.object({
'height': z.number(),
'length': z.number(),
'weight': z.number(),
'width': z.number()
});

export type PackageDimensionsModel = z.infer<typeof PackageDimensions>;

export const TaxCode = z.object({
'description': z.string(),
'id': z.string(),
'name': z.string(),
'object': z.enum(['tax_code'])
});

export type TaxCodeModel = z.infer<typeof TaxCode>;

export const Product: z.ZodType<ProductModel> = z.object({
'active': z.boolean(),
'created': z.number().int(),
'default_price': z.union([z.string(), z.lazy(() => Price)]).optional(),
'description': z.string(),
'id': z.string(),
'images': z.array(z.string()),
'livemode': z.boolean(),
'marketing_features': z.array(ProductMarketingFeature),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['product']),
'package_dimensions': z.union([PackageDimensions]),
'shippable': z.boolean(),
'statement_descriptor': z.string().optional(),
'tax_code': z.union([z.string(), TaxCode]),
'type': z.enum(['good', 'service']),
'unit_label': z.string().optional(),
'updated': z.number().int(),
'url': z.string()
});

export const PlanTier = z.object({
'flat_amount': z.number().int(),
'flat_amount_decimal': z.string(),
'unit_amount': z.number().int(),
'unit_amount_decimal': z.string(),
'up_to': z.number().int()
});

export type PlanTierModel = z.infer<typeof PlanTier>;

export const TransformUsage = z.object({
'divide_by': z.number().int(),
'round': z.enum(['down', 'up'])
});

export type TransformUsageModel = z.infer<typeof TransformUsage>;

export const Plan: z.ZodType<PlanModel> = z.object({
'active': z.boolean(),
'amount': z.number().int(),
'amount_decimal': z.string(),
'billing_scheme': z.enum(['per_unit', 'tiered']),
'created': z.number().int(),
'currency': z.string(),
'id': z.string(),
'interval': z.enum(['day', 'month', 'week', 'year']),
'interval_count': z.number().int(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'meter': z.string(),
'nickname': z.string(),
'object': z.enum(['plan']),
'product': z.union([z.string(), z.lazy(() => Product), DeletedProduct]),
'tiers': z.array(PlanTier).optional(),
'tiers_mode': z.enum(['graduated', 'volume']),
'transform_usage': z.union([TransformUsage]),
'trial_period_days': z.number().int(),
'usage_type': z.enum(['licensed', 'metered'])
});

export const SubscriptionItem: z.ZodType<SubscriptionItemModel> = z.object({
'billing_thresholds': z.union([SubscriptionItemBillingThresholds]),
'created': z.number().int(),
'current_period_end': z.number().int(),
'current_period_start': z.number().int(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount)])),
'id': z.string(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['subscription_item']),
'plan': z.lazy(() => Plan),
'price': z.lazy(() => Price),
'quantity': z.number().int().optional(),
'subscription': z.string(),
'tax_rates': z.array(TaxRate)
});

export const AutomaticTax = z.object({
'disabled_reason': z.enum(['finalization_requires_location_inputs', 'finalization_system_error']),
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)]),
'provider': z.string(),
'status': z.enum(['complete', 'failed', 'requires_location_inputs'])
});

export type AutomaticTaxModel = z.infer<typeof AutomaticTax>;

export const InvoicesResourceConfirmationSecret = z.object({
'client_secret': z.string(),
'type': z.string()
});

export type InvoicesResourceConfirmationSecretModel = z.infer<typeof InvoicesResourceConfirmationSecret>;

export const InvoicesResourceInvoiceTaxId = z.object({
'type': z.enum(['ad_nrt', 'ae_trn', 'al_tin', 'am_tin', 'ao_tin', 'ar_cuit', 'au_abn', 'au_arn', 'aw_tin', 'az_tin', 'ba_tin', 'bb_tin', 'bd_bin', 'bf_ifu', 'bg_uic', 'bh_vat', 'bj_ifu', 'bo_tin', 'br_cnpj', 'br_cpf', 'bs_tin', 'by_tin', 'ca_bn', 'ca_gst_hst', 'ca_pst_bc', 'ca_pst_mb', 'ca_pst_sk', 'ca_qst', 'cd_nif', 'ch_uid', 'ch_vat', 'cl_tin', 'cm_niu', 'cn_tin', 'co_nit', 'cr_tin', 'cv_nif', 'de_stn', 'do_rcn', 'ec_ruc', 'eg_tin', 'es_cif', 'et_tin', 'eu_oss_vat', 'eu_vat', 'gb_vat', 'ge_vat', 'gn_nif', 'hk_br', 'hr_oib', 'hu_tin', 'id_npwp', 'il_vat', 'in_gst', 'is_vat', 'jp_cn', 'jp_rn', 'jp_trn', 'ke_pin', 'kg_tin', 'kh_tin', 'kr_brn', 'kz_bin', 'la_tin', 'li_uid', 'li_vat', 'ma_vat', 'md_vat', 'me_pib', 'mk_vat', 'mr_nif', 'mx_rfc', 'my_frp', 'my_itn', 'my_sst', 'ng_tin', 'no_vat', 'no_voec', 'np_pan', 'nz_gst', 'om_vat', 'pe_ruc', 'ph_tin', 'ro_tin', 'rs_pib', 'ru_inn', 'ru_kpp', 'sa_vat', 'sg_gst', 'sg_uen', 'si_tin', 'sn_ninea', 'sr_fin', 'sv_nit', 'th_vat', 'tj_tin', 'tr_tin', 'tw_vat', 'tz_vat', 'ua_vat', 'ug_tin', 'unknown', 'us_ein', 'uy_ruc', 'uz_tin', 'uz_vat', 've_rif', 'vn_tin', 'za_vat', 'zm_tin', 'zw_tin']),
'value': z.string()
});

export type InvoicesResourceInvoiceTaxIdModel = z.infer<typeof InvoicesResourceInvoiceTaxId>;

export const DeletedDiscount: z.ZodType<DeletedDiscountModel> = z.object({
'checkout_session': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'deleted': z.boolean(),
'id': z.string(),
'invoice': z.string(),
'invoice_item': z.string(),
'object': z.enum(['discount']),
'promotion_code': z.union([z.string(), z.lazy(() => PromotionCode)]),
'source': DiscountSource,
'start': z.number().int(),
'subscription': z.string(),
'subscription_item': z.string()
});

export const InvoicesResourceFromInvoice: z.ZodType<InvoicesResourceFromInvoiceModel> = z.object({
'action': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice)])
});

export const DiscountsResourceDiscountAmount = z.object({
'amount': z.number().int(),
'discount': z.union([z.string(), z.lazy(() => Discount), z.lazy(() => DeletedDiscount)])
});

export type DiscountsResourceDiscountAmountModel = z.infer<typeof DiscountsResourceDiscountAmount>;

export const BillingBillResourceInvoicingLinesCommonCreditedItems = z.object({
'invoice': z.string(),
'invoice_line_items': z.array(z.string())
});

export type BillingBillResourceInvoicingLinesCommonCreditedItemsModel = z.infer<typeof BillingBillResourceInvoicingLinesCommonCreditedItems>;

export const BillingBillResourceInvoicingLinesCommonProrationDetails = z.object({
'credited_items': z.union([BillingBillResourceInvoicingLinesCommonCreditedItems])
});

export type BillingBillResourceInvoicingLinesCommonProrationDetailsModel = z.infer<typeof BillingBillResourceInvoicingLinesCommonProrationDetails>;

export const BillingBillResourceInvoicingLinesParentsInvoiceLineItemInvoiceItemParent = z.object({
'invoice_item': z.string(),
'proration': z.boolean(),
'proration_details': z.union([BillingBillResourceInvoicingLinesCommonProrationDetails]),
'subscription': z.string()
});

export type BillingBillResourceInvoicingLinesParentsInvoiceLineItemInvoiceItemParentModel = z.infer<typeof BillingBillResourceInvoicingLinesParentsInvoiceLineItemInvoiceItemParent>;

export const BillingBillResourceInvoicingLinesParentsInvoiceLineItemSubscriptionItemParent = z.object({
'invoice_item': z.string(),
'proration': z.boolean(),
'proration_details': z.union([BillingBillResourceInvoicingLinesCommonProrationDetails]),
'subscription': z.string(),
'subscription_item': z.string()
});

export type BillingBillResourceInvoicingLinesParentsInvoiceLineItemSubscriptionItemParentModel = z.infer<typeof BillingBillResourceInvoicingLinesParentsInvoiceLineItemSubscriptionItemParent>;

export const BillingBillResourceInvoicingLinesParentsInvoiceLineItemParent = z.object({
'invoice_item_details': z.union([BillingBillResourceInvoicingLinesParentsInvoiceLineItemInvoiceItemParent]),
'subscription_item_details': z.union([BillingBillResourceInvoicingLinesParentsInvoiceLineItemSubscriptionItemParent]),
'type': z.enum(['invoice_item_details', 'subscription_item_details'])
});

export type BillingBillResourceInvoicingLinesParentsInvoiceLineItemParentModel = z.infer<typeof BillingBillResourceInvoicingLinesParentsInvoiceLineItemParent>;

export const InvoiceLineItemPeriod = z.object({
'end': z.number().int(),
'start': z.number().int()
});

export type InvoiceLineItemPeriodModel = z.infer<typeof InvoiceLineItemPeriod>;

export const BillingCreditGrantsResourceMonetaryAmount = z.object({
'currency': z.string(),
'value': z.number().int()
});

export type BillingCreditGrantsResourceMonetaryAmountModel = z.infer<typeof BillingCreditGrantsResourceMonetaryAmount>;

export const BillingCreditGrantsResourceAmount = z.object({
'monetary': z.union([BillingCreditGrantsResourceMonetaryAmount]),
'type': z.enum(['monetary'])
});

export type BillingCreditGrantsResourceAmountModel = z.infer<typeof BillingCreditGrantsResourceAmount>;

export const BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided: z.ZodType<BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoidedModel> = z.object({
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'invoice_line_item': z.string()
});

export const BillingCreditGrantsResourceBalanceCredit: z.ZodType<BillingCreditGrantsResourceBalanceCreditModel> = z.object({
'amount': BillingCreditGrantsResourceAmount,
'credits_application_invoice_voided': z.union([z.lazy(() => BillingCreditGrantsResourceBalanceCreditsApplicationInvoiceVoided)]),
'type': z.enum(['credits_application_invoice_voided', 'credits_granted'])
});

export const BillingCreditGrantsResourceApplicablePrice = z.object({
'id': z.string()
});

export type BillingCreditGrantsResourceApplicablePriceModel = z.infer<typeof BillingCreditGrantsResourceApplicablePrice>;

export const BillingCreditGrantsResourceScope = z.object({
'price_type': z.enum(['metered']).optional(),
'prices': z.array(BillingCreditGrantsResourceApplicablePrice).optional()
});

export type BillingCreditGrantsResourceScopeModel = z.infer<typeof BillingCreditGrantsResourceScope>;

export const BillingCreditGrantsResourceApplicabilityConfig = z.object({
'scope': BillingCreditGrantsResourceScope
});

export type BillingCreditGrantsResourceApplicabilityConfigModel = z.infer<typeof BillingCreditGrantsResourceApplicabilityConfig>;

export const BillingClocksResourceStatusDetailsAdvancingStatusDetails = z.object({
'target_frozen_time': z.number().int()
});

export type BillingClocksResourceStatusDetailsAdvancingStatusDetailsModel = z.infer<typeof BillingClocksResourceStatusDetailsAdvancingStatusDetails>;

export const BillingClocksResourceStatusDetailsStatusDetails = z.object({
'advancing': BillingClocksResourceStatusDetailsAdvancingStatusDetails.optional()
});

export type BillingClocksResourceStatusDetailsStatusDetailsModel = z.infer<typeof BillingClocksResourceStatusDetailsStatusDetails>;

export const TestHelpersTestClock = z.object({
'created': z.number().int(),
'deletes_after': z.number().int(),
'frozen_time': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'name': z.string(),
'object': z.enum(['test_helpers.test_clock']),
'status': z.enum(['advancing', 'internal_failure', 'ready']),
'status_details': BillingClocksResourceStatusDetailsStatusDetails
});

export type TestHelpersTestClockModel = z.infer<typeof TestHelpersTestClock>;

export const BillingCreditGrant: z.ZodType<BillingCreditGrantModel> = z.object({
'amount': BillingCreditGrantsResourceAmount,
'applicability_config': BillingCreditGrantsResourceApplicabilityConfig,
'category': z.enum(['paid', 'promotional']),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'effective_at': z.number().int(),
'expires_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['billing.credit_grant']),
'priority': z.number().int().optional(),
'test_clock': z.union([z.string(), TestHelpersTestClock]),
'updated': z.number().int(),
'voided_at': z.number().int()
});

export const BillingCreditGrantsResourceBalanceCreditsApplied: z.ZodType<BillingCreditGrantsResourceBalanceCreditsAppliedModel> = z.object({
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'invoice_line_item': z.string()
});

export const BillingCreditGrantsResourceBalanceDebit: z.ZodType<BillingCreditGrantsResourceBalanceDebitModel> = z.object({
'amount': BillingCreditGrantsResourceAmount,
'credits_applied': z.union([z.lazy(() => BillingCreditGrantsResourceBalanceCreditsApplied)]),
'type': z.enum(['credits_applied', 'credits_expired', 'credits_voided'])
});

export const BillingCreditBalanceTransaction: z.ZodType<BillingCreditBalanceTransactionModel> = z.object({
'created': z.number().int(),
'credit': z.union([z.lazy(() => BillingCreditGrantsResourceBalanceCredit)]),
'credit_grant': z.union([z.string(), z.lazy(() => BillingCreditGrant)]),
'debit': z.union([z.lazy(() => BillingCreditGrantsResourceBalanceDebit)]),
'effective_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.credit_balance_transaction']),
'test_clock': z.union([z.string(), TestHelpersTestClock]),
'type': z.enum(['credit', 'debit'])
});

export const InvoicesResourcePretaxCreditAmount: z.ZodType<InvoicesResourcePretaxCreditAmountModel> = z.object({
'amount': z.number().int(),
'credit_balance_transaction': z.union([z.string(), z.lazy(() => BillingCreditBalanceTransaction)]).optional(),
'discount': z.union([z.string(), z.lazy(() => Discount), z.lazy(() => DeletedDiscount)]).optional(),
'type': z.enum(['credit_balance_transaction', 'discount'])
});

export const BillingBillResourceInvoicingPricingPricingPriceDetails = z.object({
'price': z.string(),
'product': z.string()
});

export type BillingBillResourceInvoicingPricingPricingPriceDetailsModel = z.infer<typeof BillingBillResourceInvoicingPricingPricingPriceDetails>;

export const BillingBillResourceInvoicingPricingPricing = z.object({
'price_details': BillingBillResourceInvoicingPricingPricingPriceDetails.optional(),
'type': z.enum(['price_details']),
'unit_amount_decimal': z.string()
});

export type BillingBillResourceInvoicingPricingPricingModel = z.infer<typeof BillingBillResourceInvoicingPricingPricing>;

export const BillingBillResourceInvoicingTaxesTaxRateDetails = z.object({
'tax_rate': z.string()
});

export type BillingBillResourceInvoicingTaxesTaxRateDetailsModel = z.infer<typeof BillingBillResourceInvoicingTaxesTaxRateDetails>;

export const BillingBillResourceInvoicingTaxesTax = z.object({
'amount': z.number().int(),
'tax_behavior': z.enum(['exclusive', 'inclusive']),
'tax_rate_details': z.union([BillingBillResourceInvoicingTaxesTaxRateDetails]),
'taxability_reason': z.enum(['customer_exempt', 'not_available', 'not_collecting', 'not_subject_to_tax', 'not_supported', 'portion_product_exempt', 'portion_reduced_rated', 'portion_standard_rated', 'product_exempt', 'product_exempt_holiday', 'proportionally_rated', 'reduced_rated', 'reverse_charge', 'standard_rated', 'taxable_basis_reduced', 'zero_rated']),
'taxable_amount': z.number().int(),
'type': z.enum(['tax_rate_details'])
});

export type BillingBillResourceInvoicingTaxesTaxModel = z.infer<typeof BillingBillResourceInvoicingTaxesTax>;

export const LineItem: z.ZodType<LineItemModel> = z.object({
'amount': z.number().int(),
'currency': z.string(),
'description': z.string(),
'discount_amounts': z.array(DiscountsResourceDiscountAmount),
'discountable': z.boolean(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount)])),
'id': z.string(),
'invoice': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['line_item']),
'parent': z.union([BillingBillResourceInvoicingLinesParentsInvoiceLineItemParent]),
'period': InvoiceLineItemPeriod,
'pretax_credit_amounts': z.array(z.lazy(() => InvoicesResourcePretaxCreditAmount)),
'pricing': z.union([BillingBillResourceInvoicingPricingPricing]),
'quantity': z.number().int(),
'subscription': z.union([z.string(), z.lazy(() => Subscription)]),
'taxes': z.array(BillingBillResourceInvoicingTaxesTax)
});

export const BillingBillResourceInvoicingParentsInvoiceQuoteParent = z.object({
'quote': z.string()
});

export type BillingBillResourceInvoicingParentsInvoiceQuoteParentModel = z.infer<typeof BillingBillResourceInvoicingParentsInvoiceQuoteParent>;

export const BillingBillResourceInvoicingParentsInvoiceSubscriptionParent: z.ZodType<BillingBillResourceInvoicingParentsInvoiceSubscriptionParentModel> = z.object({
'metadata': z.record(z.string(), z.string()),
'subscription': z.union([z.string(), z.lazy(() => Subscription)]),
'subscription_proration_date': z.number().int().optional()
});

export const BillingBillResourceInvoicingParentsInvoiceParent: z.ZodType<BillingBillResourceInvoicingParentsInvoiceParentModel> = z.object({
'quote_details': z.union([BillingBillResourceInvoicingParentsInvoiceQuoteParent]),
'subscription_details': z.union([z.lazy(() => BillingBillResourceInvoicingParentsInvoiceSubscriptionParent)]),
'type': z.enum(['quote_details', 'subscription_details'])
});

export const InvoicePaymentMethodOptionsAcssDebitMandateOptions = z.object({
'transaction_type': z.enum(['business', 'personal'])
});

export type InvoicePaymentMethodOptionsAcssDebitMandateOptionsModel = z.infer<typeof InvoicePaymentMethodOptionsAcssDebitMandateOptions>;

export const InvoicePaymentMethodOptionsAcssDebit = z.object({
'mandate_options': InvoicePaymentMethodOptionsAcssDebitMandateOptions.optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type InvoicePaymentMethodOptionsAcssDebitModel = z.infer<typeof InvoicePaymentMethodOptionsAcssDebit>;

export const InvoicePaymentMethodOptionsBancontact = z.object({
'preferred_language': z.enum(['de', 'en', 'fr', 'nl'])
});

export type InvoicePaymentMethodOptionsBancontactModel = z.infer<typeof InvoicePaymentMethodOptionsBancontact>;

export const InvoiceInstallmentsCard = z.object({
'enabled': z.boolean()
});

export type InvoiceInstallmentsCardModel = z.infer<typeof InvoiceInstallmentsCard>;

export const InvoicePaymentMethodOptionsCard = z.object({
'installments': InvoiceInstallmentsCard.optional(),
'request_three_d_secure': z.enum(['any', 'automatic', 'challenge'])
});

export type InvoicePaymentMethodOptionsCardModel = z.infer<typeof InvoicePaymentMethodOptionsCard>;

export const InvoicePaymentMethodOptionsCustomerBalanceBankTransferEuBankTransfer = z.object({
'country': z.enum(['BE', 'DE', 'ES', 'FR', 'IE', 'NL'])
});

export type InvoicePaymentMethodOptionsCustomerBalanceBankTransferEuBankTransferModel = z.infer<typeof InvoicePaymentMethodOptionsCustomerBalanceBankTransferEuBankTransfer>;

export const InvoicePaymentMethodOptionsCustomerBalanceBankTransfer = z.object({
'eu_bank_transfer': InvoicePaymentMethodOptionsCustomerBalanceBankTransferEuBankTransfer.optional(),
'type': z.string()
});

export type InvoicePaymentMethodOptionsCustomerBalanceBankTransferModel = z.infer<typeof InvoicePaymentMethodOptionsCustomerBalanceBankTransfer>;

export const InvoicePaymentMethodOptionsCustomerBalance = z.object({
'bank_transfer': InvoicePaymentMethodOptionsCustomerBalanceBankTransfer.optional(),
'funding_type': z.enum(['bank_transfer'])
});

export type InvoicePaymentMethodOptionsCustomerBalanceModel = z.infer<typeof InvoicePaymentMethodOptionsCustomerBalance>;

export const InvoicePaymentMethodOptionsKonbini = z.object({

});

export type InvoicePaymentMethodOptionsKonbiniModel = z.infer<typeof InvoicePaymentMethodOptionsKonbini>;

export const InvoicePaymentMethodOptionsSepaDebit = z.object({

});

export type InvoicePaymentMethodOptionsSepaDebitModel = z.infer<typeof InvoicePaymentMethodOptionsSepaDebit>;

export const InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptionsFilters = z.object({
'account_subcategories': z.array(z.enum(['checking', 'savings'])).optional()
});

export type InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptionsFiltersModel = z.infer<typeof InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptionsFilters>;

export const InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptions = z.object({
'filters': InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptionsFilters.optional(),
'permissions': z.array(z.enum(['balances', 'ownership', 'payment_method', 'transactions'])).optional(),
'prefetch': z.array(z.enum(['balances', 'ownership', 'transactions']))
});

export type InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptionsModel = z.infer<typeof InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptions>;

export const InvoicePaymentMethodOptionsUsBankAccount = z.object({
'financial_connections': InvoicePaymentMethodOptionsUsBankAccountLinkedAccountOptions.optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type InvoicePaymentMethodOptionsUsBankAccountModel = z.infer<typeof InvoicePaymentMethodOptionsUsBankAccount>;

export const InvoicesPaymentMethodOptions = z.object({
'acss_debit': z.union([InvoicePaymentMethodOptionsAcssDebit]),
'bancontact': z.union([InvoicePaymentMethodOptionsBancontact]),
'card': z.union([InvoicePaymentMethodOptionsCard]),
'customer_balance': z.union([InvoicePaymentMethodOptionsCustomerBalance]),
'konbini': z.union([InvoicePaymentMethodOptionsKonbini]),
'sepa_debit': z.union([InvoicePaymentMethodOptionsSepaDebit]),
'us_bank_account': z.union([InvoicePaymentMethodOptionsUsBankAccount])
});

export type InvoicesPaymentMethodOptionsModel = z.infer<typeof InvoicesPaymentMethodOptions>;

export const InvoicesPaymentSettings = z.object({
'default_mandate': z.string(),
'payment_method_options': z.union([InvoicesPaymentMethodOptions]),
'payment_method_types': z.array(z.enum(['ach_credit_transfer', 'ach_debit', 'acss_debit', 'affirm', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'jp_credit_transfer', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'multibanco', 'naver_pay', 'nz_bank_account', 'p24', 'payco', 'paynow', 'paypal', 'promptpay', 'revolut_pay', 'sepa_credit_transfer', 'sepa_debit', 'sofort', 'swish', 'us_bank_account', 'wechat_pay']))
});

export type InvoicesPaymentSettingsModel = z.infer<typeof InvoicesPaymentSettings>;

export const DeletedInvoice = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['invoice'])
});

export type DeletedInvoiceModel = z.infer<typeof DeletedInvoice>;

export const PaymentsPrimitivesPaymentRecordsResourceAmount = z.object({
'currency': z.string(),
'value': z.number().int()
});

export type PaymentsPrimitivesPaymentRecordsResourceAmountModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceAmount>;

export const PaymentsPrimitivesPaymentRecordsResourceCustomerDetails = z.object({
'customer': z.string(),
'email': z.string(),
'name': z.string(),
'phone': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourceCustomerDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceCustomerDetails>;

export const PaymentsPrimitivesPaymentRecordsResourceAddress = z.object({
'city': z.string(),
'country': z.string(),
'line1': z.string(),
'line2': z.string(),
'postal_code': z.string(),
'state': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourceAddressModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceAddress>;

export const PaymentsPrimitivesPaymentRecordsResourceBillingDetails = z.object({
'address': PaymentsPrimitivesPaymentRecordsResourceAddress,
'email': z.string(),
'name': z.string(),
'phone': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourceBillingDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceBillingDetails>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceChecks = z.object({
'address_line1_check': z.enum(['fail', 'pass', 'unavailable', 'unchecked']),
'address_postal_code_check': z.enum(['fail', 'pass', 'unavailable', 'unchecked']),
'cvc_check': z.enum(['fail', 'pass', 'unavailable', 'unchecked'])
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceChecksModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceChecks>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceNetworkToken = z.object({
'used': z.boolean()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceNetworkTokenModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceNetworkToken>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceThreeDSecure = z.object({
'authentication_flow': z.enum(['challenge', 'frictionless']),
'result': z.enum(['attempt_acknowledged', 'authenticated', 'exempted', 'failed', 'not_supported', 'processing_error']),
'result_reason': z.enum(['abandoned', 'bypassed', 'canceled', 'card_not_enrolled', 'network_not_supported', 'protocol_error', 'rejected']),
'version': z.enum(['1.0.2', '2.1.0', '2.2.0'])
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceThreeDSecureModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceThreeDSecure>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceApplePay = z.object({
'type': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceApplePayModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceApplePay>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceGooglePay = z.object({

});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceGooglePayModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceGooglePay>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWallet = z.object({
'apple_pay': PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceApplePay.optional(),
'dynamic_last4': z.string().optional(),
'google_pay': PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletResourceGooglePay.optional(),
'type': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWalletModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWallet>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetails = z.object({
'brand': z.enum(['amex', 'cartes_bancaires', 'diners', 'discover', 'eftpos_au', 'interac', 'jcb', 'link', 'mastercard', 'unionpay', 'unknown', 'visa']),
'capture_before': z.number().int().optional(),
'checks': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceChecks]),
'country': z.string(),
'exp_month': z.number().int(),
'exp_year': z.number().int(),
'fingerprint': z.string().optional(),
'funding': z.enum(['credit', 'debit', 'prepaid', 'unknown']),
'last4': z.string(),
'moto': z.boolean().optional(),
'network': z.enum(['amex', 'cartes_bancaires', 'diners', 'discover', 'eftpos_au', 'interac', 'jcb', 'link', 'mastercard', 'unionpay', 'unknown', 'visa']),
'network_token': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceNetworkToken]).optional(),
'network_transaction_id': z.string(),
'three_d_secure': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceThreeDSecure]),
'wallet': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsResourceWallet])
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetails>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCustomDetails = z.object({
'display_name': z.string(),
'type': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCustomDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCustomDetails>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodUsBankAccountDetails = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]).optional(),
'payment_reference': z.string(),
'routing_number': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodUsBankAccountDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodUsBankAccountDetails>;

export const PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails = z.object({
'ach_credit_transfer': PaymentMethodDetailsAchCreditTransfer.optional(),
'ach_debit': PaymentMethodDetailsAchDebit.optional(),
'acss_debit': PaymentMethodDetailsAcssDebit.optional(),
'affirm': PaymentMethodDetailsAffirm.optional(),
'afterpay_clearpay': PaymentMethodDetailsAfterpayClearpay.optional(),
'alipay': PaymentFlowsPrivatePaymentMethodsAlipayDetails.optional(),
'alma': PaymentMethodDetailsAlma.optional(),
'amazon_pay': PaymentMethodDetailsAmazonPay.optional(),
'au_becs_debit': PaymentMethodDetailsAuBecsDebit.optional(),
'bacs_debit': PaymentMethodDetailsBacsDebit.optional(),
'bancontact': z.lazy(() => PaymentMethodDetailsBancontact).optional(),
'billie': PaymentMethodDetailsBillie.optional(),
'billing_details': z.union([PaymentsPrimitivesPaymentRecordsResourceBillingDetails]),
'blik': PaymentMethodDetailsBlik.optional(),
'boleto': PaymentMethodDetailsBoleto.optional(),
'card': PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCardDetails.optional(),
'card_present': PaymentMethodDetailsCardPresent.optional(),
'cashapp': PaymentMethodDetailsCashapp.optional(),
'crypto': PaymentMethodDetailsCrypto.optional(),
'custom': PaymentsPrimitivesPaymentRecordsResourcePaymentMethodCustomDetails.optional(),
'customer_balance': PaymentMethodDetailsCustomerBalance.optional(),
'eps': PaymentMethodDetailsEps.optional(),
'fpx': PaymentMethodDetailsFpx.optional(),
'giropay': PaymentMethodDetailsGiropay.optional(),
'grabpay': PaymentMethodDetailsGrabpay.optional(),
'ideal': z.lazy(() => PaymentMethodDetailsIdeal).optional(),
'interac_present': PaymentMethodDetailsInteracPresent.optional(),
'kakao_pay': PaymentMethodDetailsKakaoPay.optional(),
'klarna': PaymentMethodDetailsKlarna.optional(),
'konbini': PaymentMethodDetailsKonbini.optional(),
'kr_card': PaymentMethodDetailsKrCard.optional(),
'link': PaymentMethodDetailsLink.optional(),
'mb_way': PaymentMethodDetailsMbWay.optional(),
'mobilepay': PaymentMethodDetailsMobilepay.optional(),
'multibanco': PaymentMethodDetailsMultibanco.optional(),
'naver_pay': PaymentMethodDetailsNaverPay.optional(),
'nz_bank_account': PaymentMethodDetailsNzBankAccount.optional(),
'oxxo': PaymentMethodDetailsOxxo.optional(),
'p24': PaymentMethodDetailsP24.optional(),
'pay_by_bank': PaymentMethodDetailsPayByBank.optional(),
'payco': PaymentMethodDetailsPayco.optional(),
'payment_method': z.string(),
'paynow': PaymentMethodDetailsPaynow.optional(),
'paypal': PaymentMethodDetailsPaypal.optional(),
'pix': PaymentMethodDetailsPix.optional(),
'promptpay': PaymentMethodDetailsPromptpay.optional(),
'revolut_pay': PaymentMethodDetailsRevolutPay.optional(),
'samsung_pay': PaymentMethodDetailsSamsungPay.optional(),
'satispay': PaymentMethodDetailsSatispay.optional(),
'sepa_credit_transfer': PaymentMethodDetailsSepaCreditTransfer.optional(),
'sepa_debit': PaymentMethodDetailsSepaDebit.optional(),
'sofort': z.lazy(() => PaymentMethodDetailsSofort).optional(),
'stripe_account': PaymentMethodDetailsStripeAccount.optional(),
'swish': PaymentMethodDetailsSwish.optional(),
'twint': PaymentMethodDetailsTwint.optional(),
'type': z.string(),
'us_bank_account': PaymentsPrimitivesPaymentRecordsResourcePaymentMethodUsBankAccountDetails.optional(),
'wechat': PaymentMethodDetailsWechat.optional(),
'wechat_pay': PaymentMethodDetailsWechatPay.optional(),
'zip': PaymentMethodDetailsZip.optional()
});

export type PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails>;

export const PaymentsPrimitivesPaymentRecordsResourceProcessorDetailsResourceCustomDetails = z.object({
'payment_reference': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourceProcessorDetailsResourceCustomDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceProcessorDetailsResourceCustomDetails>;

export const PaymentsPrimitivesPaymentRecordsResourceProcessorDetails = z.object({
'custom': PaymentsPrimitivesPaymentRecordsResourceProcessorDetailsResourceCustomDetails.optional(),
'type': z.enum(['custom'])
});

export type PaymentsPrimitivesPaymentRecordsResourceProcessorDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceProcessorDetails>;

export const PaymentsPrimitivesPaymentRecordsResourceShippingDetails = z.object({
'address': PaymentsPrimitivesPaymentRecordsResourceAddress,
'name': z.string(),
'phone': z.string()
});

export type PaymentsPrimitivesPaymentRecordsResourceShippingDetailsModel = z.infer<typeof PaymentsPrimitivesPaymentRecordsResourceShippingDetails>;

export const PaymentRecord = z.object({
'amount': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_authorized': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_canceled': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_failed': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_guaranteed': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_refunded': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_requested': PaymentsPrimitivesPaymentRecordsResourceAmount,
'application': z.string(),
'created': z.number().int(),
'customer_details': z.union([PaymentsPrimitivesPaymentRecordsResourceCustomerDetails]),
'customer_presence': z.enum(['off_session', 'on_session']),
'description': z.string(),
'id': z.string(),
'latest_payment_attempt_record': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['payment_record']),
'payment_method_details': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails]),
'processor_details': PaymentsPrimitivesPaymentRecordsResourceProcessorDetails,
'shipping_details': z.union([PaymentsPrimitivesPaymentRecordsResourceShippingDetails])
});

export type PaymentRecordModel = z.infer<typeof PaymentRecord>;

export const InvoicesPaymentsInvoicePaymentAssociatedPayment = z.object({
'charge': z.union([z.string(), z.lazy(() => Charge)]).optional(),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]).optional(),
'payment_record': z.union([z.string(), PaymentRecord]).optional(),
'type': z.enum(['charge', 'payment_intent', 'payment_record'])
});

export type InvoicesPaymentsInvoicePaymentAssociatedPaymentModel = z.infer<typeof InvoicesPaymentsInvoicePaymentAssociatedPayment>;

export const InvoicesPaymentsInvoicePaymentStatusTransitions = z.object({
'canceled_at': z.number().int(),
'paid_at': z.number().int()
});

export type InvoicesPaymentsInvoicePaymentStatusTransitionsModel = z.infer<typeof InvoicesPaymentsInvoicePaymentStatusTransitions>;

export const InvoicePayment: z.ZodType<InvoicePaymentModel> = z.object({
'amount_paid': z.number().int(),
'amount_requested': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice), DeletedInvoice]),
'is_default': z.boolean(),
'livemode': z.boolean(),
'object': z.enum(['invoice_payment']),
'payment': InvoicesPaymentsInvoicePaymentAssociatedPayment,
'status': z.string(),
'status_transitions': InvoicesPaymentsInvoicePaymentStatusTransitions
});

export const InvoiceRenderingPdf = z.object({
'page_size': z.enum(['a4', 'auto', 'letter'])
});

export type InvoiceRenderingPdfModel = z.infer<typeof InvoiceRenderingPdf>;

export const InvoicesResourceInvoiceRendering = z.object({
'amount_tax_display': z.string(),
'pdf': z.union([InvoiceRenderingPdf]),
'template': z.string(),
'template_version': z.number().int()
});

export type InvoicesResourceInvoiceRenderingModel = z.infer<typeof InvoicesResourceInvoiceRendering>;

export const ShippingRateDeliveryEstimateBound = z.object({
'unit': z.enum(['business_day', 'day', 'hour', 'month', 'week']),
'value': z.number().int()
});

export type ShippingRateDeliveryEstimateBoundModel = z.infer<typeof ShippingRateDeliveryEstimateBound>;

export const ShippingRateDeliveryEstimate = z.object({
'maximum': z.union([ShippingRateDeliveryEstimateBound]),
'minimum': z.union([ShippingRateDeliveryEstimateBound])
});

export type ShippingRateDeliveryEstimateModel = z.infer<typeof ShippingRateDeliveryEstimate>;

export const ShippingRateCurrencyOption = z.object({
'amount': z.number().int(),
'tax_behavior': z.enum(['exclusive', 'inclusive', 'unspecified'])
});

export type ShippingRateCurrencyOptionModel = z.infer<typeof ShippingRateCurrencyOption>;

export const ShippingRateFixedAmount = z.object({
'amount': z.number().int(),
'currency': z.string(),
'currency_options': z.record(z.string(), ShippingRateCurrencyOption).optional()
});

export type ShippingRateFixedAmountModel = z.infer<typeof ShippingRateFixedAmount>;

export const ShippingRate = z.object({
'active': z.boolean(),
'created': z.number().int(),
'delivery_estimate': z.union([ShippingRateDeliveryEstimate]),
'display_name': z.string(),
'fixed_amount': ShippingRateFixedAmount.optional(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['shipping_rate']),
'tax_behavior': z.enum(['exclusive', 'inclusive', 'unspecified']),
'tax_code': z.union([z.string(), TaxCode]),
'type': z.enum(['fixed_amount'])
});

export type ShippingRateModel = z.infer<typeof ShippingRate>;

export const LineItemsTaxAmount = z.object({
'amount': z.number().int(),
'rate': TaxRate,
'taxability_reason': z.enum(['customer_exempt', 'not_collecting', 'not_subject_to_tax', 'not_supported', 'portion_product_exempt', 'portion_reduced_rated', 'portion_standard_rated', 'product_exempt', 'product_exempt_holiday', 'proportionally_rated', 'reduced_rated', 'reverse_charge', 'standard_rated', 'taxable_basis_reduced', 'zero_rated']),
'taxable_amount': z.number().int()
});

export type LineItemsTaxAmountModel = z.infer<typeof LineItemsTaxAmount>;

export const InvoicesResourceShippingCost = z.object({
'amount_subtotal': z.number().int(),
'amount_tax': z.number().int(),
'amount_total': z.number().int(),
'shipping_rate': z.union([z.string(), ShippingRate]),
'taxes': z.array(LineItemsTaxAmount).optional()
});

export type InvoicesResourceShippingCostModel = z.infer<typeof InvoicesResourceShippingCost>;

export const InvoicesResourceStatusTransitions = z.object({
'finalized_at': z.number().int(),
'marked_uncollectible_at': z.number().int(),
'paid_at': z.number().int(),
'voided_at': z.number().int()
});

export type InvoicesResourceStatusTransitionsModel = z.infer<typeof InvoicesResourceStatusTransitions>;

export const InvoiceItemThresholdReason = z.object({
'line_item_ids': z.array(z.string()),
'usage_gte': z.number().int()
});

export type InvoiceItemThresholdReasonModel = z.infer<typeof InvoiceItemThresholdReason>;

export const InvoiceThresholdReason = z.object({
'amount_gte': z.number().int(),
'item_reasons': z.array(InvoiceItemThresholdReason)
});

export type InvoiceThresholdReasonModel = z.infer<typeof InvoiceThresholdReason>;

export const Invoice: z.ZodType<InvoiceModel> = z.object({
'account_country': z.string(),
'account_name': z.string(),
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'amount_due': z.number().int(),
'amount_overpaid': z.number().int(),
'amount_paid': z.number().int(),
'amount_remaining': z.number().int(),
'amount_shipping': z.number().int(),
'application': z.union([z.string(), Application, DeletedApplication]),
'attempt_count': z.number().int(),
'attempted': z.boolean(),
'auto_advance': z.boolean().optional(),
'automatic_tax': AutomaticTax,
'automatically_finalizes_at': z.number().int(),
'billing_reason': z.enum(['automatic_pending_invoice_item_invoice', 'manual', 'quote_accept', 'subscription', 'subscription_create', 'subscription_cycle', 'subscription_threshold', 'subscription_update', 'upcoming']),
'collection_method': z.enum(['charge_automatically', 'send_invoice']),
'confirmation_secret': z.union([InvoicesResourceConfirmationSecret]).optional(),
'created': z.number().int(),
'currency': z.string(),
'custom_fields': z.array(InvoiceSettingCustomField),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'customer_address': z.union([Address]),
'customer_email': z.string(),
'customer_name': z.string(),
'customer_phone': z.string(),
'customer_shipping': z.union([Shipping]),
'customer_tax_exempt': z.enum(['exempt', 'none', 'reverse']),
'customer_tax_ids': z.array(InvoicesResourceInvoiceTaxId).optional(),
'default_payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'default_source': z.union([z.string(), z.lazy(() => PaymentSource)]),
'default_tax_rates': z.array(TaxRate),
'description': z.string(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount), z.lazy(() => DeletedDiscount)])),
'due_date': z.number().int(),
'effective_at': z.number().int(),
'ending_balance': z.number().int(),
'footer': z.string(),
'from_invoice': z.union([z.lazy(() => InvoicesResourceFromInvoice)]),
'hosted_invoice_url': z.string().optional(),
'id': z.string().optional(),
'invoice_pdf': z.string().optional(),
'issuer': z.lazy(() => ConnectAccountReference),
'last_finalization_error': z.union([z.lazy(() => ApiErrors)]),
'latest_revision': z.union([z.string(), z.lazy(() => Invoice)]),
'lines': z.object({
'data': z.array(z.lazy(() => LineItem)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'next_payment_attempt': z.number().int(),
'number': z.string(),
'object': z.enum(['invoice']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'parent': z.union([z.lazy(() => BillingBillResourceInvoicingParentsInvoiceParent)]),
'payment_settings': InvoicesPaymentSettings,
'payments': z.object({
'data': z.array(z.lazy(() => InvoicePayment)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'period_end': z.number().int(),
'period_start': z.number().int(),
'post_payment_credit_notes_amount': z.number().int(),
'pre_payment_credit_notes_amount': z.number().int(),
'receipt_number': z.string(),
'rendering': z.union([InvoicesResourceInvoiceRendering]),
'shipping_cost': z.union([InvoicesResourceShippingCost]),
'shipping_details': z.union([Shipping]),
'starting_balance': z.number().int(),
'statement_descriptor': z.string(),
'status': z.enum(['draft', 'open', 'paid', 'uncollectible', 'void']),
'status_transitions': InvoicesResourceStatusTransitions,
'subscription': z.union([z.string(), z.lazy(() => Subscription)]).optional(),
'subtotal': z.number().int(),
'subtotal_excluding_tax': z.number().int(),
'test_clock': z.union([z.string(), TestHelpersTestClock]),
'threshold_reason': InvoiceThresholdReason.optional(),
'total': z.number().int(),
'total_discount_amounts': z.array(DiscountsResourceDiscountAmount),
'total_excluding_tax': z.number().int(),
'total_pretax_credit_amounts': z.array(z.lazy(() => InvoicesResourcePretaxCreditAmount)),
'total_taxes': z.array(BillingBillResourceInvoicingTaxesTax),
'webhooks_delivered_at': z.number().int()
});

export const SubscriptionsResourcePauseCollection = z.object({
'behavior': z.enum(['keep_as_draft', 'mark_uncollectible', 'void']),
'resumes_at': z.number().int()
});

export type SubscriptionsResourcePauseCollectionModel = z.infer<typeof SubscriptionsResourcePauseCollection>;

export const InvoiceMandateOptionsCard = z.object({
'amount': z.number().int(),
'amount_type': z.enum(['fixed', 'maximum']),
'description': z.string()
});

export type InvoiceMandateOptionsCardModel = z.infer<typeof InvoiceMandateOptionsCard>;

export const SubscriptionPaymentMethodOptionsCard = z.object({
'mandate_options': InvoiceMandateOptionsCard.optional(),
'network': z.enum(['amex', 'cartes_bancaires', 'diners', 'discover', 'eftpos_au', 'girocard', 'interac', 'jcb', 'link', 'mastercard', 'unionpay', 'unknown', 'visa']),
'request_three_d_secure': z.enum(['any', 'automatic', 'challenge'])
});

export type SubscriptionPaymentMethodOptionsCardModel = z.infer<typeof SubscriptionPaymentMethodOptionsCard>;

export const SubscriptionsResourcePaymentMethodOptions = z.object({
'acss_debit': z.union([InvoicePaymentMethodOptionsAcssDebit]),
'bancontact': z.union([InvoicePaymentMethodOptionsBancontact]),
'card': z.union([SubscriptionPaymentMethodOptionsCard]),
'customer_balance': z.union([InvoicePaymentMethodOptionsCustomerBalance]),
'konbini': z.union([InvoicePaymentMethodOptionsKonbini]),
'sepa_debit': z.union([InvoicePaymentMethodOptionsSepaDebit]),
'us_bank_account': z.union([InvoicePaymentMethodOptionsUsBankAccount])
});

export type SubscriptionsResourcePaymentMethodOptionsModel = z.infer<typeof SubscriptionsResourcePaymentMethodOptions>;

export const SubscriptionsResourcePaymentSettings = z.object({
'payment_method_options': z.union([SubscriptionsResourcePaymentMethodOptions]),
'payment_method_types': z.array(z.enum(['ach_credit_transfer', 'ach_debit', 'acss_debit', 'affirm', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'boleto', 'card', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'jp_credit_transfer', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'multibanco', 'naver_pay', 'nz_bank_account', 'p24', 'payco', 'paynow', 'paypal', 'promptpay', 'revolut_pay', 'sepa_credit_transfer', 'sepa_debit', 'sofort', 'swish', 'us_bank_account', 'wechat_pay'])),
'save_default_payment_method': z.enum(['off', 'on_subscription'])
});

export type SubscriptionsResourcePaymentSettingsModel = z.infer<typeof SubscriptionsResourcePaymentSettings>;

export const SubscriptionPendingInvoiceItemInterval = z.object({
'interval': z.enum(['day', 'month', 'week', 'year']),
'interval_count': z.number().int()
});

export type SubscriptionPendingInvoiceItemIntervalModel = z.infer<typeof SubscriptionPendingInvoiceItemInterval>;

export const SubscriptionsResourcePendingUpdate = z.object({
'billing_cycle_anchor': z.number().int(),
'expires_at': z.number().int(),
'subscription_items': z.array(z.lazy(() => SubscriptionItem)),
'trial_end': z.number().int(),
'trial_from_plan': z.boolean()
});

export type SubscriptionsResourcePendingUpdateModel = z.infer<typeof SubscriptionsResourcePendingUpdate>;

export const SubscriptionScheduleCurrentPhase = z.object({
'end_date': z.number().int(),
'start_date': z.number().int()
});

export type SubscriptionScheduleCurrentPhaseModel = z.infer<typeof SubscriptionScheduleCurrentPhase>;

export const SubscriptionSchedulesResourceDefaultSettingsAutomaticTax = z.object({
'disabled_reason': z.enum(['requires_location_inputs']),
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)])
});

export type SubscriptionSchedulesResourceDefaultSettingsAutomaticTaxModel = z.infer<typeof SubscriptionSchedulesResourceDefaultSettingsAutomaticTax>;

export const InvoiceSettingSubscriptionScheduleSetting = z.object({
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'days_until_due': z.number().int(),
'issuer': z.lazy(() => ConnectAccountReference)
});

export type InvoiceSettingSubscriptionScheduleSettingModel = z.infer<typeof InvoiceSettingSubscriptionScheduleSetting>;

export const SubscriptionTransferData: z.ZodType<SubscriptionTransferDataModel> = z.object({
'amount_percent': z.number(),
'destination': z.union([z.string(), z.lazy(() => Account)])
});

export const SubscriptionSchedulesResourceDefaultSettings: z.ZodType<SubscriptionSchedulesResourceDefaultSettingsModel> = z.object({
'application_fee_percent': z.number(),
'automatic_tax': SubscriptionSchedulesResourceDefaultSettingsAutomaticTax.optional(),
'billing_cycle_anchor': z.enum(['automatic', 'phase_start']),
'billing_thresholds': z.union([SubscriptionBillingThresholds]),
'collection_method': z.enum(['charge_automatically', 'send_invoice']),
'default_payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'description': z.string(),
'invoice_settings': InvoiceSettingSubscriptionScheduleSetting,
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'transfer_data': z.union([z.lazy(() => SubscriptionTransferData)])
});

export const DiscountsResourceStackableDiscount = z.object({
'coupon': z.union([z.string(), Coupon]),
'discount': z.union([z.string(), z.lazy(() => Discount)]),
'promotion_code': z.union([z.string(), z.lazy(() => PromotionCode)])
});

export type DiscountsResourceStackableDiscountModel = z.infer<typeof DiscountsResourceStackableDiscount>;

export const SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodEnd = z.object({
'timestamp': z.number().int().optional(),
'type': z.enum(['min_item_period_end', 'phase_end', 'timestamp'])
});

export type SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodEndModel = z.infer<typeof SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodEnd>;

export const SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodStart = z.object({
'timestamp': z.number().int().optional(),
'type': z.enum(['max_item_period_start', 'phase_start', 'timestamp'])
});

export type SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodStartModel = z.infer<typeof SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodStart>;

export const SubscriptionScheduleAddInvoiceItemPeriod = z.object({
'end': SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodEnd,
'start': SubscriptionSchedulesResourceInvoiceItemPeriodResourcePeriodStart
});

export type SubscriptionScheduleAddInvoiceItemPeriodModel = z.infer<typeof SubscriptionScheduleAddInvoiceItemPeriod>;

export const DeletedPrice = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['price'])
});

export type DeletedPriceModel = z.infer<typeof DeletedPrice>;

export const SubscriptionScheduleAddInvoiceItem = z.object({
'discounts': z.array(DiscountsResourceStackableDiscount),
'metadata': z.record(z.string(), z.string()),
'period': SubscriptionScheduleAddInvoiceItemPeriod,
'price': z.union([z.string(), z.lazy(() => Price), DeletedPrice]),
'quantity': z.number().int(),
'tax_rates': z.array(TaxRate).optional()
});

export type SubscriptionScheduleAddInvoiceItemModel = z.infer<typeof SubscriptionScheduleAddInvoiceItem>;

export const SchedulesPhaseAutomaticTax = z.object({
'disabled_reason': z.enum(['requires_location_inputs']),
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)])
});

export type SchedulesPhaseAutomaticTaxModel = z.infer<typeof SchedulesPhaseAutomaticTax>;

export const InvoiceSettingSubscriptionSchedulePhaseSetting = z.object({
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'days_until_due': z.number().int(),
'issuer': z.union([z.lazy(() => ConnectAccountReference)])
});

export type InvoiceSettingSubscriptionSchedulePhaseSettingModel = z.infer<typeof InvoiceSettingSubscriptionSchedulePhaseSetting>;

export const DeletedPlan = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['plan'])
});

export type DeletedPlanModel = z.infer<typeof DeletedPlan>;

export const SubscriptionScheduleConfigurationItem = z.object({
'billing_thresholds': z.union([SubscriptionItemBillingThresholds]),
'discounts': z.array(DiscountsResourceStackableDiscount),
'metadata': z.record(z.string(), z.string()),
'plan': z.union([z.string(), z.lazy(() => Plan), DeletedPlan]),
'price': z.union([z.string(), z.lazy(() => Price), DeletedPrice]),
'quantity': z.number().int().optional(),
'tax_rates': z.array(TaxRate).optional()
});

export type SubscriptionScheduleConfigurationItemModel = z.infer<typeof SubscriptionScheduleConfigurationItem>;

export const SubscriptionSchedulePhaseConfiguration: z.ZodType<SubscriptionSchedulePhaseConfigurationModel> = z.object({
'add_invoice_items': z.array(SubscriptionScheduleAddInvoiceItem),
'application_fee_percent': z.number(),
'automatic_tax': SchedulesPhaseAutomaticTax.optional(),
'billing_cycle_anchor': z.enum(['automatic', 'phase_start']),
'billing_thresholds': z.union([SubscriptionBillingThresholds]),
'collection_method': z.enum(['charge_automatically', 'send_invoice']),
'currency': z.string(),
'default_payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'default_tax_rates': z.array(TaxRate).optional(),
'description': z.string(),
'discounts': z.array(DiscountsResourceStackableDiscount),
'end_date': z.number().int(),
'invoice_settings': z.union([InvoiceSettingSubscriptionSchedulePhaseSetting]),
'items': z.array(SubscriptionScheduleConfigurationItem),
'metadata': z.record(z.string(), z.string()),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'proration_behavior': z.enum(['always_invoice', 'create_prorations', 'none']),
'start_date': z.number().int(),
'transfer_data': z.union([z.lazy(() => SubscriptionTransferData)]),
'trial_end': z.number().int()
});

export const SubscriptionSchedule: z.ZodType<SubscriptionScheduleModel> = z.object({
'application': z.union([z.string(), Application, DeletedApplication]),
'billing_mode': SubscriptionsResourceBillingMode,
'canceled_at': z.number().int(),
'completed_at': z.number().int(),
'created': z.number().int(),
'current_phase': z.union([SubscriptionScheduleCurrentPhase]),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'default_settings': z.lazy(() => SubscriptionSchedulesResourceDefaultSettings),
'end_behavior': z.enum(['cancel', 'none', 'release', 'renew']),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['subscription_schedule']),
'phases': z.array(z.lazy(() => SubscriptionSchedulePhaseConfiguration)),
'released_at': z.number().int(),
'released_subscription': z.string(),
'status': z.enum(['active', 'canceled', 'completed', 'not_started', 'released']),
'subscription': z.union([z.string(), z.lazy(() => Subscription)]),
'test_clock': z.union([z.string(), TestHelpersTestClock])
});

export const SubscriptionsTrialsResourceEndBehavior = z.object({
'missing_payment_method': z.enum(['cancel', 'create_invoice', 'pause'])
});

export type SubscriptionsTrialsResourceEndBehaviorModel = z.infer<typeof SubscriptionsTrialsResourceEndBehavior>;

export const SubscriptionsTrialsResourceTrialSettings = z.object({
'end_behavior': SubscriptionsTrialsResourceEndBehavior
});

export type SubscriptionsTrialsResourceTrialSettingsModel = z.infer<typeof SubscriptionsTrialsResourceTrialSettings>;

export const Subscription: z.ZodType<SubscriptionModel> = z.object({
'application': z.union([z.string(), Application, DeletedApplication]),
'application_fee_percent': z.number(),
'automatic_tax': z.lazy(() => SubscriptionAutomaticTax),
'billing_cycle_anchor': z.number().int(),
'billing_cycle_anchor_config': z.union([SubscriptionsResourceBillingCycleAnchorConfig]),
'billing_mode': SubscriptionsResourceBillingMode,
'billing_thresholds': z.union([SubscriptionBillingThresholds]),
'cancel_at': z.number().int(),
'cancel_at_period_end': z.boolean(),
'canceled_at': z.number().int(),
'cancellation_details': z.union([CancellationDetails]),
'collection_method': z.enum(['charge_automatically', 'send_invoice']),
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'days_until_due': z.number().int(),
'default_payment_method': z.union([z.string(), z.lazy(() => PaymentMethod)]),
'default_source': z.union([z.string(), z.lazy(() => PaymentSource)]),
'default_tax_rates': z.array(TaxRate).optional(),
'description': z.string(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount)])),
'ended_at': z.number().int(),
'id': z.string(),
'invoice_settings': z.lazy(() => SubscriptionsResourceSubscriptionInvoiceSettings),
'items': z.object({
'data': z.array(z.lazy(() => SubscriptionItem)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'latest_invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'next_pending_invoice_item_invoice': z.number().int(),
'object': z.enum(['subscription']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'pause_collection': z.union([SubscriptionsResourcePauseCollection]),
'payment_settings': z.union([SubscriptionsResourcePaymentSettings]),
'pending_invoice_item_interval': z.union([SubscriptionPendingInvoiceItemInterval]),
'pending_setup_intent': z.union([z.string(), z.lazy(() => SetupIntent)]),
'pending_update': z.union([SubscriptionsResourcePendingUpdate]),
'schedule': z.union([z.string(), z.lazy(() => SubscriptionSchedule)]),
'start_date': z.number().int(),
'status': z.enum(['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'paused', 'trialing', 'unpaid']),
'test_clock': z.union([z.string(), TestHelpersTestClock]),
'transfer_data': z.union([z.lazy(() => SubscriptionTransferData)]),
'trial_end': z.number().int(),
'trial_settings': z.union([SubscriptionsTrialsResourceTrialSettings]),
'trial_start': z.number().int()
});

export const CustomerTaxLocation = z.object({
'country': z.string(),
'source': z.enum(['billing_address', 'ip_address', 'payment_method', 'shipping_destination']),
'state': z.string()
});

export type CustomerTaxLocationModel = z.infer<typeof CustomerTaxLocation>;

export const CustomerTax = z.object({
'automatic_tax': z.enum(['failed', 'not_collecting', 'supported', 'unrecognized_location']),
'ip_address': z.string(),
'location': z.union([CustomerTaxLocation]),
'provider': z.enum(['anrok', 'avalara', 'sphere', 'stripe'])
});

export type CustomerTaxModel = z.infer<typeof CustomerTax>;

export const Customer: z.ZodType<CustomerModel> = z.object({
'address': z.union([Address]).optional(),
'balance': z.number().int().optional(),
'business_name': z.string().optional(),
'cash_balance': z.union([CashBalance]).optional(),
'created': z.number().int(),
'currency': z.string().optional(),
'default_source': z.union([z.string(), z.lazy(() => PaymentSource)]),
'delinquent': z.boolean().optional(),
'description': z.string(),
'discount': z.union([z.lazy(() => Discount)]).optional(),
'email': z.string(),
'id': z.string(),
'individual_name': z.string().optional(),
'invoice_credit_balance': z.record(z.string(), z.number().int()).optional(),
'invoice_prefix': z.string().optional(),
'invoice_settings': z.lazy(() => InvoiceSettingCustomerSetting).optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()).optional(),
'name': z.string().optional(),
'next_invoice_sequence': z.number().int().optional(),
'object': z.enum(['customer']),
'phone': z.string().optional(),
'preferred_locales': z.array(z.string()).optional(),
'shipping': z.union([Shipping]),
'sources': z.object({
'data': z.array(z.lazy(() => PaymentSource)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'subscriptions': z.object({
'data': z.array(z.lazy(() => Subscription)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'tax': CustomerTax.optional(),
'tax_exempt': z.enum(['exempt', 'none', 'reverse']).optional(),
'tax_ids': z.object({
'data': z.array(z.lazy(() => TaxId)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'test_clock': z.union([z.string(), TestHelpersTestClock]).optional()
});

export const AccountRequirementsError = z.object({
'code': z.enum(['external_request', 'information_missing', 'invalid_address_city_state_postal_code', 'invalid_address_highway_contract_box', 'invalid_address_private_mailbox', 'invalid_business_profile_name', 'invalid_business_profile_name_denylisted', 'invalid_company_name_denylisted', 'invalid_dob_age_over_maximum', 'invalid_dob_age_under_18', 'invalid_dob_age_under_minimum', 'invalid_product_description_length', 'invalid_product_description_url_match', 'invalid_representative_country', 'invalid_signator', 'invalid_statement_descriptor_business_mismatch', 'invalid_statement_descriptor_denylisted', 'invalid_statement_descriptor_length', 'invalid_statement_descriptor_prefix_denylisted', 'invalid_statement_descriptor_prefix_mismatch', 'invalid_street_address', 'invalid_tax_id', 'invalid_tax_id_format', 'invalid_tos_acceptance', 'invalid_url_denylisted', 'invalid_url_format', 'invalid_url_length', 'invalid_url_web_presence_detected', 'invalid_url_website_business_information_mismatch', 'invalid_url_website_empty', 'invalid_url_website_inaccessible', 'invalid_url_website_inaccessible_geoblocked', 'invalid_url_website_inaccessible_password_protected', 'invalid_url_website_incomplete', 'invalid_url_website_incomplete_cancellation_policy', 'invalid_url_website_incomplete_customer_service_details', 'invalid_url_website_incomplete_legal_restrictions', 'invalid_url_website_incomplete_refund_policy', 'invalid_url_website_incomplete_return_policy', 'invalid_url_website_incomplete_terms_and_conditions', 'invalid_url_website_incomplete_under_construction', 'invalid_url_website_other', 'invalid_value_other', 'unsupported_business_type', 'verification_directors_mismatch', 'verification_document_address_mismatch', 'verification_document_address_missing', 'verification_document_corrupt', 'verification_document_country_not_supported', 'verification_document_directors_mismatch', 'verification_document_dob_mismatch', 'verification_document_duplicate_type', 'verification_document_expired', 'verification_document_failed_copy', 'verification_document_failed_greyscale', 'verification_document_failed_other', 'verification_document_failed_test_mode', 'verification_document_fraudulent', 'verification_document_id_number_mismatch', 'verification_document_id_number_missing', 'verification_document_incomplete', 'verification_document_invalid', 'verification_document_issue_or_expiry_date_missing', 'verification_document_manipulated', 'verification_document_missing_back', 'verification_document_missing_front', 'verification_document_name_mismatch', 'verification_document_name_missing', 'verification_document_nationality_mismatch', 'verification_document_not_readable', 'verification_document_not_signed', 'verification_document_not_uploaded', 'verification_document_photo_mismatch', 'verification_document_too_large', 'verification_document_type_not_supported', 'verification_extraneous_directors', 'verification_failed_address_match', 'verification_failed_authorizer_authority', 'verification_failed_business_iec_number', 'verification_failed_document_match', 'verification_failed_id_number_match', 'verification_failed_keyed_identity', 'verification_failed_keyed_match', 'verification_failed_name_match', 'verification_failed_other', 'verification_failed_representative_authority', 'verification_failed_residential_address', 'verification_failed_tax_id_match', 'verification_failed_tax_id_not_issued', 'verification_legal_entity_structure_mismatch', 'verification_missing_directors', 'verification_missing_executives', 'verification_missing_owners', 'verification_rejected_ownership_exemption_reason', 'verification_requires_additional_memorandum_of_associations', 'verification_requires_additional_proof_of_registration', 'verification_supportability']),
'reason': z.string(),
'requirement': z.string()
});

export type AccountRequirementsErrorModel = z.infer<typeof AccountRequirementsError>;

export const ExternalAccountRequirements = z.object({
'currently_due': z.array(z.string()),
'errors': z.array(AccountRequirementsError),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type ExternalAccountRequirementsModel = z.infer<typeof ExternalAccountRequirements>;

export const BankAccount: z.ZodType<BankAccountModel> = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]).optional(),
'account_holder_name': z.string(),
'account_holder_type': z.string(),
'account_type': z.string(),
'available_payout_methods': z.array(z.enum(['instant', 'standard'])).optional(),
'bank_name': z.string(),
'country': z.string(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]).optional(),
'default_for_currency': z.boolean().optional(),
'fingerprint': z.string(),
'future_requirements': z.union([ExternalAccountRequirements]).optional(),
'id': z.string(),
'last4': z.string(),
'metadata': z.record(z.string(), z.string()).optional(),
'object': z.enum(['bank_account']),
'requirements': z.union([ExternalAccountRequirements]).optional(),
'routing_number': z.string(),
'status': z.string()
});

export const ExternalAccount: z.ZodType<ExternalAccountModel> = z.union([z.lazy(() => BankAccount), z.lazy(() => Card)]);

export const AccountRequirementsAlternative = z.object({
'alternative_fields_due': z.array(z.string()),
'original_fields_due': z.array(z.string())
});

export type AccountRequirementsAlternativeModel = z.infer<typeof AccountRequirementsAlternative>;

export const AccountFutureRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'current_deadline': z.number().int(),
'currently_due': z.array(z.string()),
'disabled_reason': z.enum(['action_required.requested_capabilities', 'listed', 'other', 'platform_paused', 'rejected.fraud', 'rejected.incomplete_verification', 'rejected.listed', 'rejected.other', 'rejected.platform_fraud', 'rejected.platform_other', 'rejected.platform_terms_of_service', 'rejected.terms_of_service', 'requirements.past_due', 'requirements.pending_verification', 'under_review']),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type AccountFutureRequirementsModel = z.infer<typeof AccountFutureRequirements>;

export const AccountGroupMembership = z.object({
'payments_pricing': z.string()
});

export type AccountGroupMembershipModel = z.infer<typeof AccountGroupMembership>;

export const PersonAdditionalTosAcceptance = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string()
});

export type PersonAdditionalTosAcceptanceModel = z.infer<typeof PersonAdditionalTosAcceptance>;

export const PersonAdditionalTosAcceptances = z.object({
'account': z.union([PersonAdditionalTosAcceptance])
});

export type PersonAdditionalTosAcceptancesModel = z.infer<typeof PersonAdditionalTosAcceptances>;

export const LegalEntityDob = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type LegalEntityDobModel = z.infer<typeof LegalEntityDob>;

export const PersonFutureRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'currently_due': z.array(z.string()),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type PersonFutureRequirementsModel = z.infer<typeof PersonFutureRequirements>;

export const PersonRelationship = z.object({
'authorizer': z.boolean(),
'director': z.boolean(),
'executive': z.boolean(),
'legal_guardian': z.boolean(),
'owner': z.boolean(),
'percent_ownership': z.number(),
'representative': z.boolean(),
'title': z.string()
});

export type PersonRelationshipModel = z.infer<typeof PersonRelationship>;

export const PersonRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'currently_due': z.array(z.string()),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type PersonRequirementsModel = z.infer<typeof PersonRequirements>;

export const PersonEthnicityDetails = z.object({
'ethnicity': z.array(z.enum(['cuban', 'hispanic_or_latino', 'mexican', 'not_hispanic_or_latino', 'other_hispanic_or_latino', 'prefer_not_to_answer', 'puerto_rican'])),
'ethnicity_other': z.string()
});

export type PersonEthnicityDetailsModel = z.infer<typeof PersonEthnicityDetails>;

export const PersonRaceDetails = z.object({
'race': z.array(z.enum(['african_american', 'american_indian_or_alaska_native', 'asian', 'asian_indian', 'black_or_african_american', 'chinese', 'ethiopian', 'filipino', 'guamanian_or_chamorro', 'haitian', 'jamaican', 'japanese', 'korean', 'native_hawaiian', 'native_hawaiian_or_other_pacific_islander', 'nigerian', 'other_asian', 'other_black_or_african_american', 'other_pacific_islander', 'prefer_not_to_answer', 'samoan', 'somali', 'vietnamese', 'white'])),
'race_other': z.string()
});

export type PersonRaceDetailsModel = z.infer<typeof PersonRaceDetails>;

export const PersonUsCfpbData = z.object({
'ethnicity_details': z.union([PersonEthnicityDetails]),
'race_details': z.union([PersonRaceDetails]),
'self_identified_gender': z.string()
});

export type PersonUsCfpbDataModel = z.infer<typeof PersonUsCfpbData>;

export const LegalEntityPersonVerificationDocument = z.object({
'back': z.union([z.string(), z.lazy(() => File)]),
'details': z.string(),
'details_code': z.string(),
'front': z.union([z.string(), z.lazy(() => File)])
});

export type LegalEntityPersonVerificationDocumentModel = z.infer<typeof LegalEntityPersonVerificationDocument>;

export const LegalEntityPersonVerification = z.object({
'additional_document': z.union([LegalEntityPersonVerificationDocument]).optional(),
'details': z.string().optional(),
'details_code': z.string().optional(),
'document': LegalEntityPersonVerificationDocument.optional(),
'status': z.string()
});

export type LegalEntityPersonVerificationModel = z.infer<typeof LegalEntityPersonVerification>;

export const Person = z.object({
'account': z.string().optional(),
'additional_tos_acceptances': PersonAdditionalTosAcceptances.optional(),
'address': Address.optional(),
'address_kana': z.union([LegalEntityJapanAddress]).optional(),
'address_kanji': z.union([LegalEntityJapanAddress]).optional(),
'created': z.number().int(),
'dob': LegalEntityDob.optional(),
'email': z.string().optional(),
'first_name': z.string().optional(),
'first_name_kana': z.string().optional(),
'first_name_kanji': z.string().optional(),
'full_name_aliases': z.array(z.string()).optional(),
'future_requirements': z.union([PersonFutureRequirements]).optional(),
'gender': z.string().optional(),
'id': z.string(),
'id_number_provided': z.boolean().optional(),
'id_number_secondary_provided': z.boolean().optional(),
'last_name': z.string().optional(),
'last_name_kana': z.string().optional(),
'last_name_kanji': z.string().optional(),
'maiden_name': z.string().optional(),
'metadata': z.record(z.string(), z.string()).optional(),
'nationality': z.string().optional(),
'object': z.enum(['person']),
'phone': z.string().optional(),
'political_exposure': z.enum(['existing', 'none']).optional(),
'registered_address': Address.optional(),
'relationship': PersonRelationship.optional(),
'requirements': z.union([PersonRequirements]).optional(),
'ssn_last_4_provided': z.boolean().optional(),
'us_cfpb_data': z.union([PersonUsCfpbData]).optional(),
'verification': LegalEntityPersonVerification.optional()
});

export type PersonModel = z.infer<typeof Person>;

export const AccountRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'current_deadline': z.number().int(),
'currently_due': z.array(z.string()),
'disabled_reason': z.enum(['action_required.requested_capabilities', 'listed', 'other', 'platform_paused', 'rejected.fraud', 'rejected.incomplete_verification', 'rejected.listed', 'rejected.other', 'rejected.platform_fraud', 'rejected.platform_other', 'rejected.platform_terms_of_service', 'rejected.terms_of_service', 'requirements.past_due', 'requirements.pending_verification', 'under_review']),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type AccountRequirementsModel = z.infer<typeof AccountRequirements>;

export const AccountBacsDebitPaymentsSettings = z.object({
'display_name': z.string(),
'service_user_number': z.string()
});

export type AccountBacsDebitPaymentsSettingsModel = z.infer<typeof AccountBacsDebitPaymentsSettings>;

export const AccountBrandingSettings = z.object({
'icon': z.union([z.string(), z.lazy(() => File)]),
'logo': z.union([z.string(), z.lazy(() => File)]),
'primary_color': z.string(),
'secondary_color': z.string()
});

export type AccountBrandingSettingsModel = z.infer<typeof AccountBrandingSettings>;

export const CardIssuingAccountTermsOfService = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string().optional()
});

export type CardIssuingAccountTermsOfServiceModel = z.infer<typeof CardIssuingAccountTermsOfService>;

export const AccountCardIssuingSettings = z.object({
'tos_acceptance': CardIssuingAccountTermsOfService.optional()
});

export type AccountCardIssuingSettingsModel = z.infer<typeof AccountCardIssuingSettings>;

export const AccountDeclineChargeOn = z.object({
'avs_failure': z.boolean(),
'cvc_failure': z.boolean()
});

export type AccountDeclineChargeOnModel = z.infer<typeof AccountDeclineChargeOn>;

export const AccountCardPaymentsSettings = z.object({
'decline_on': AccountDeclineChargeOn.optional(),
'statement_descriptor_prefix': z.string(),
'statement_descriptor_prefix_kana': z.string(),
'statement_descriptor_prefix_kanji': z.string()
});

export type AccountCardPaymentsSettingsModel = z.infer<typeof AccountCardPaymentsSettings>;

export const AccountDashboardSettings = z.object({
'display_name': z.string(),
'timezone': z.string()
});

export type AccountDashboardSettingsModel = z.infer<typeof AccountDashboardSettings>;

export const AccountInvoicesSettings = z.object({
'default_account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId)])),
'hosted_payment_method_save': z.enum(['always', 'never', 'offer'])
});

export type AccountInvoicesSettingsModel = z.infer<typeof AccountInvoicesSettings>;

export const AccountPaymentsSettings = z.object({
'statement_descriptor': z.string(),
'statement_descriptor_kana': z.string(),
'statement_descriptor_kanji': z.string(),
'statement_descriptor_prefix_kana': z.string(),
'statement_descriptor_prefix_kanji': z.string()
});

export type AccountPaymentsSettingsModel = z.infer<typeof AccountPaymentsSettings>;

export const TransferSchedule = z.object({
'delay_days': z.number().int(),
'interval': z.string(),
'monthly_anchor': z.number().int().optional(),
'monthly_payout_days': z.array(z.number().int()).optional(),
'weekly_anchor': z.string().optional(),
'weekly_payout_days': z.array(z.enum(['friday', 'monday', 'thursday', 'tuesday', 'wednesday'])).optional()
});

export type TransferScheduleModel = z.infer<typeof TransferSchedule>;

export const AccountPayoutSettings = z.object({
'debit_negative_balances': z.boolean(),
'schedule': TransferSchedule,
'statement_descriptor': z.string()
});

export type AccountPayoutSettingsModel = z.infer<typeof AccountPayoutSettings>;

export const AccountSepaDebitPaymentsSettings = z.object({
'creditor_id': z.string().optional()
});

export type AccountSepaDebitPaymentsSettingsModel = z.infer<typeof AccountSepaDebitPaymentsSettings>;

export const AccountTermsOfService = z.object({
'date': z.number().int(),
'ip': z.string(),
'user_agent': z.string().optional()
});

export type AccountTermsOfServiceModel = z.infer<typeof AccountTermsOfService>;

export const AccountTreasurySettings = z.object({
'tos_acceptance': AccountTermsOfService.optional()
});

export type AccountTreasurySettingsModel = z.infer<typeof AccountTreasurySettings>;

export const AccountSettings = z.object({
'bacs_debit_payments': AccountBacsDebitPaymentsSettings.optional(),
'branding': AccountBrandingSettings,
'card_issuing': AccountCardIssuingSettings.optional(),
'card_payments': AccountCardPaymentsSettings,
'dashboard': AccountDashboardSettings,
'invoices': AccountInvoicesSettings.optional(),
'payments': AccountPaymentsSettings,
'payouts': AccountPayoutSettings.optional(),
'sepa_debit_payments': AccountSepaDebitPaymentsSettings.optional(),
'treasury': AccountTreasurySettings.optional()
});

export type AccountSettingsModel = z.infer<typeof AccountSettings>;

export const AccountTosAcceptance = z.object({
'date': z.number().int().optional(),
'ip': z.string().optional(),
'service_agreement': z.string().optional(),
'user_agent': z.string().optional()
});

export type AccountTosAcceptanceModel = z.infer<typeof AccountTosAcceptance>;

export const Account: z.ZodType<AccountModel> = z.object({
'business_profile': z.union([AccountBusinessProfile]).optional(),
'business_type': z.enum(['company', 'government_entity', 'individual', 'non_profit']).optional(),
'capabilities': AccountCapabilities.optional(),
'charges_enabled': z.boolean().optional(),
'company': z.lazy(() => LegalEntityCompany).optional(),
'controller': AccountUnificationAccountController.optional(),
'country': z.string().optional(),
'created': z.number().int().optional(),
'default_currency': z.string().optional(),
'details_submitted': z.boolean().optional(),
'email': z.string().optional(),
'external_accounts': z.object({
'data': z.array(z.lazy(() => ExternalAccount)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'future_requirements': AccountFutureRequirements.optional(),
'groups': z.union([AccountGroupMembership]).optional(),
'id': z.string(),
'individual': Person.optional(),
'metadata': z.record(z.string(), z.string()).optional(),
'object': z.enum(['account']),
'payouts_enabled': z.boolean().optional(),
'requirements': AccountRequirements.optional(),
'settings': z.union([AccountSettings]).optional(),
'tos_acceptance': AccountTosAcceptance.optional(),
'type': z.enum(['custom', 'express', 'none', 'standard']).optional()
});

export const AccountApplicationAuthorized = z.object({
'object': Application
});

export type AccountApplicationAuthorizedModel = z.infer<typeof AccountApplicationAuthorized>;

export const AccountApplicationDeauthorized = z.object({
'object': Application
});

export type AccountApplicationDeauthorizedModel = z.infer<typeof AccountApplicationDeauthorized>;

export const AccountExternalAccountCreated = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type AccountExternalAccountCreatedModel = z.infer<typeof AccountExternalAccountCreated>;

export const AccountExternalAccountDeleted = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type AccountExternalAccountDeletedModel = z.infer<typeof AccountExternalAccountDeleted>;

export const AccountExternalAccountUpdated = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type AccountExternalAccountUpdatedModel = z.infer<typeof AccountExternalAccountUpdated>;

export const AccountUpdated = z.object({
'object': z.lazy(() => Account)
});

export type AccountUpdatedModel = z.infer<typeof AccountUpdated>;

export const AccountCapabilityFutureRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'current_deadline': z.number().int(),
'currently_due': z.array(z.string()),
'disabled_reason': z.enum(['other', 'paused.inactivity', 'pending.onboarding', 'pending.review', 'platform_disabled', 'platform_paused', 'rejected.inactivity', 'rejected.other', 'rejected.unsupported_business', 'requirements.fields_needed']),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type AccountCapabilityFutureRequirementsModel = z.infer<typeof AccountCapabilityFutureRequirements>;

export const AccountCapabilityRequirements = z.object({
'alternatives': z.array(AccountRequirementsAlternative),
'current_deadline': z.number().int(),
'currently_due': z.array(z.string()),
'disabled_reason': z.enum(['other', 'paused.inactivity', 'pending.onboarding', 'pending.review', 'platform_disabled', 'platform_paused', 'rejected.inactivity', 'rejected.other', 'rejected.unsupported_business', 'requirements.fields_needed']),
'errors': z.array(AccountRequirementsError),
'eventually_due': z.array(z.string()),
'past_due': z.array(z.string()),
'pending_verification': z.array(z.string())
});

export type AccountCapabilityRequirementsModel = z.infer<typeof AccountCapabilityRequirements>;

export const AccountLink = z.object({
'created': z.number().int(),
'expires_at': z.number().int(),
'object': z.enum(['account_link']),
'url': z.string()
});

export type AccountLinkModel = z.infer<typeof AccountLink>;

export const ConnectEmbeddedAccountFeaturesClaim = z.object({
'disable_stripe_user_authentication': z.boolean(),
'external_account_collection': z.boolean()
});

export type ConnectEmbeddedAccountFeaturesClaimModel = z.infer<typeof ConnectEmbeddedAccountFeaturesClaim>;

export const ConnectEmbeddedAccountConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedAccountFeaturesClaim
});

export type ConnectEmbeddedAccountConfigClaimModel = z.infer<typeof ConnectEmbeddedAccountConfigClaim>;

export const ConnectEmbeddedPayoutsFeatures = z.object({
'disable_stripe_user_authentication': z.boolean(),
'edit_payout_schedule': z.boolean(),
'external_account_collection': z.boolean(),
'instant_payouts': z.boolean(),
'standard_payouts': z.boolean()
});

export type ConnectEmbeddedPayoutsFeaturesModel = z.infer<typeof ConnectEmbeddedPayoutsFeatures>;

export const ConnectEmbeddedPayoutsConfig = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedPayoutsFeatures
});

export type ConnectEmbeddedPayoutsConfigModel = z.infer<typeof ConnectEmbeddedPayoutsConfig>;

export const ConnectEmbeddedDisputesListFeatures = z.object({
'capture_payments': z.boolean(),
'destination_on_behalf_of_charge_management': z.boolean(),
'dispute_management': z.boolean(),
'refund_management': z.boolean()
});

export type ConnectEmbeddedDisputesListFeaturesModel = z.infer<typeof ConnectEmbeddedDisputesListFeatures>;

export const ConnectEmbeddedDisputesListConfig = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedDisputesListFeatures
});

export type ConnectEmbeddedDisputesListConfigModel = z.infer<typeof ConnectEmbeddedDisputesListConfig>;

export const ConnectEmbeddedBaseFeatures = z.object({

});

export type ConnectEmbeddedBaseFeaturesModel = z.infer<typeof ConnectEmbeddedBaseFeatures>;

export const ConnectEmbeddedBaseConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedBaseFeatures
});

export type ConnectEmbeddedBaseConfigClaimModel = z.infer<typeof ConnectEmbeddedBaseConfigClaim>;

export const ConnectEmbeddedFinancialAccountFeatures = z.object({
'disable_stripe_user_authentication': z.boolean(),
'external_account_collection': z.boolean(),
'send_money': z.boolean(),
'transfer_balance': z.boolean()
});

export type ConnectEmbeddedFinancialAccountFeaturesModel = z.infer<typeof ConnectEmbeddedFinancialAccountFeatures>;

export const ConnectEmbeddedFinancialAccountConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedFinancialAccountFeatures
});

export type ConnectEmbeddedFinancialAccountConfigClaimModel = z.infer<typeof ConnectEmbeddedFinancialAccountConfigClaim>;

export const ConnectEmbeddedFinancialAccountTransactionsFeatures = z.object({
'card_spend_dispute_management': z.boolean()
});

export type ConnectEmbeddedFinancialAccountTransactionsFeaturesModel = z.infer<typeof ConnectEmbeddedFinancialAccountTransactionsFeatures>;

export const ConnectEmbeddedFinancialAccountTransactionsConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedFinancialAccountTransactionsFeatures
});

export type ConnectEmbeddedFinancialAccountTransactionsConfigClaimModel = z.infer<typeof ConnectEmbeddedFinancialAccountTransactionsConfigClaim>;

export const ConnectEmbeddedInstantPayoutsPromotionFeatures = z.object({
'disable_stripe_user_authentication': z.boolean(),
'external_account_collection': z.boolean(),
'instant_payouts': z.boolean()
});

export type ConnectEmbeddedInstantPayoutsPromotionFeaturesModel = z.infer<typeof ConnectEmbeddedInstantPayoutsPromotionFeatures>;

export const ConnectEmbeddedInstantPayoutsPromotionConfig = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedInstantPayoutsPromotionFeatures
});

export type ConnectEmbeddedInstantPayoutsPromotionConfigModel = z.infer<typeof ConnectEmbeddedInstantPayoutsPromotionConfig>;

export const ConnectEmbeddedIssuingCardFeatures = z.object({
'card_management': z.boolean(),
'card_spend_dispute_management': z.boolean(),
'cardholder_management': z.boolean(),
'spend_control_management': z.boolean()
});

export type ConnectEmbeddedIssuingCardFeaturesModel = z.infer<typeof ConnectEmbeddedIssuingCardFeatures>;

export const ConnectEmbeddedIssuingCardConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedIssuingCardFeatures
});

export type ConnectEmbeddedIssuingCardConfigClaimModel = z.infer<typeof ConnectEmbeddedIssuingCardConfigClaim>;

export const ConnectEmbeddedIssuingCardsListFeatures = z.object({
'card_management': z.boolean(),
'card_spend_dispute_management': z.boolean(),
'cardholder_management': z.boolean(),
'disable_stripe_user_authentication': z.boolean(),
'spend_control_management': z.boolean()
});

export type ConnectEmbeddedIssuingCardsListFeaturesModel = z.infer<typeof ConnectEmbeddedIssuingCardsListFeatures>;

export const ConnectEmbeddedIssuingCardsListConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedIssuingCardsListFeatures
});

export type ConnectEmbeddedIssuingCardsListConfigClaimModel = z.infer<typeof ConnectEmbeddedIssuingCardsListConfigClaim>;

export const ConnectEmbeddedPaymentsFeatures = z.object({
'capture_payments': z.boolean(),
'destination_on_behalf_of_charge_management': z.boolean(),
'dispute_management': z.boolean(),
'refund_management': z.boolean()
});

export type ConnectEmbeddedPaymentsFeaturesModel = z.infer<typeof ConnectEmbeddedPaymentsFeatures>;

export const ConnectEmbeddedPaymentsConfigClaim = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedPaymentsFeatures
});

export type ConnectEmbeddedPaymentsConfigClaimModel = z.infer<typeof ConnectEmbeddedPaymentsConfigClaim>;

export const ConnectEmbeddedPaymentDisputesFeatures = z.object({
'destination_on_behalf_of_charge_management': z.boolean(),
'dispute_management': z.boolean(),
'refund_management': z.boolean()
});

export type ConnectEmbeddedPaymentDisputesFeaturesModel = z.infer<typeof ConnectEmbeddedPaymentDisputesFeatures>;

export const ConnectEmbeddedPaymentDisputesConfig = z.object({
'enabled': z.boolean(),
'features': ConnectEmbeddedPaymentDisputesFeatures
});

export type ConnectEmbeddedPaymentDisputesConfigModel = z.infer<typeof ConnectEmbeddedPaymentDisputesConfig>;

export const ConnectEmbeddedAccountSessionCreateComponents = z.object({
'account_management': ConnectEmbeddedAccountConfigClaim,
'account_onboarding': ConnectEmbeddedAccountConfigClaim,
'balances': ConnectEmbeddedPayoutsConfig,
'disputes_list': ConnectEmbeddedDisputesListConfig,
'documents': ConnectEmbeddedBaseConfigClaim,
'financial_account': ConnectEmbeddedFinancialAccountConfigClaim,
'financial_account_transactions': ConnectEmbeddedFinancialAccountTransactionsConfigClaim,
'instant_payouts_promotion': ConnectEmbeddedInstantPayoutsPromotionConfig,
'issuing_card': ConnectEmbeddedIssuingCardConfigClaim,
'issuing_cards_list': ConnectEmbeddedIssuingCardsListConfigClaim,
'notification_banner': ConnectEmbeddedAccountConfigClaim,
'payment_details': ConnectEmbeddedPaymentsConfigClaim,
'payment_disputes': ConnectEmbeddedPaymentDisputesConfig,
'payments': ConnectEmbeddedPaymentsConfigClaim,
'payout_details': ConnectEmbeddedBaseConfigClaim,
'payouts': ConnectEmbeddedPayoutsConfig,
'payouts_list': ConnectEmbeddedBaseConfigClaim,
'tax_registrations': ConnectEmbeddedBaseConfigClaim,
'tax_settings': ConnectEmbeddedBaseConfigClaim
});

export type ConnectEmbeddedAccountSessionCreateComponentsModel = z.infer<typeof ConnectEmbeddedAccountSessionCreateComponents>;

export const AccountSession = z.object({
'account': z.string(),
'client_secret': z.string(),
'components': ConnectEmbeddedAccountSessionCreateComponents,
'expires_at': z.number().int(),
'livemode': z.boolean(),
'object': z.enum(['account_session'])
});

export type AccountSessionModel = z.infer<typeof AccountSession>;

export const ApplePayDomain = z.object({
'created': z.number().int(),
'domain_name': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['apple_pay_domain'])
});

export type ApplePayDomainModel = z.infer<typeof ApplePayDomain>;

export const ApplicationFeeCreated = z.object({
'object': z.lazy(() => ApplicationFee)
});

export type ApplicationFeeCreatedModel = z.infer<typeof ApplicationFeeCreated>;

export const ApplicationFeeRefundUpdated = z.object({
'object': z.lazy(() => FeeRefund)
});

export type ApplicationFeeRefundUpdatedModel = z.infer<typeof ApplicationFeeRefundUpdated>;

export const ApplicationFeeRefunded = z.object({
'object': z.lazy(() => ApplicationFee)
});

export type ApplicationFeeRefundedModel = z.infer<typeof ApplicationFeeRefunded>;

export const SecretServiceResourceScope = z.object({
'type': z.enum(['account', 'user']),
'user': z.string().optional()
});

export type SecretServiceResourceScopeModel = z.infer<typeof SecretServiceResourceScope>;

export const AppsSecret = z.object({
'created': z.number().int(),
'deleted': z.boolean().optional(),
'expires_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'name': z.string(),
'object': z.enum(['apps.secret']),
'payload': z.string().optional(),
'scope': SecretServiceResourceScope
});

export type AppsSecretModel = z.infer<typeof AppsSecret>;

export const BalanceAmountBySourceType = z.object({
'bank_account': z.number().int().optional(),
'card': z.number().int().optional(),
'fpx': z.number().int().optional()
});

export type BalanceAmountBySourceTypeModel = z.infer<typeof BalanceAmountBySourceType>;

export const BalanceAmount = z.object({
'amount': z.number().int(),
'currency': z.string(),
'source_types': BalanceAmountBySourceType.optional()
});

export type BalanceAmountModel = z.infer<typeof BalanceAmount>;

export const BalanceNetAvailable = z.object({
'amount': z.number().int(),
'destination': z.string(),
'source_types': BalanceAmountBySourceType.optional()
});

export type BalanceNetAvailableModel = z.infer<typeof BalanceNetAvailable>;

export const BalanceAmountNet = z.object({
'amount': z.number().int(),
'currency': z.string(),
'net_available': z.array(BalanceNetAvailable).optional(),
'source_types': BalanceAmountBySourceType.optional()
});

export type BalanceAmountNetModel = z.infer<typeof BalanceAmountNet>;

export const BalanceDetail = z.object({
'available': z.array(BalanceAmount)
});

export type BalanceDetailModel = z.infer<typeof BalanceDetail>;

export const BalanceDetailUngated = z.object({
'available': z.array(BalanceAmount),
'pending': z.array(BalanceAmount)
});

export type BalanceDetailUngatedModel = z.infer<typeof BalanceDetailUngated>;

export const Balance = z.object({
'available': z.array(BalanceAmount),
'connect_reserved': z.array(BalanceAmount).optional(),
'instant_available': z.array(BalanceAmountNet).optional(),
'issuing': BalanceDetail.optional(),
'livemode': z.boolean(),
'object': z.enum(['balance']),
'pending': z.array(BalanceAmount),
'refund_and_dispute_prefunding': BalanceDetailUngated.optional()
});

export type BalanceModel = z.infer<typeof Balance>;

export const BalanceAvailable = z.object({
'object': Balance
});

export type BalanceAvailableModel = z.infer<typeof BalanceAvailable>;

export const BalanceSettingsResourcePayoutSchedule = z.object({
'interval': z.enum(['daily', 'manual', 'monthly', 'weekly']),
'monthly_payout_days': z.array(z.number().int()).optional(),
'weekly_payout_days': z.array(z.enum(['friday', 'monday', 'thursday', 'tuesday', 'wednesday'])).optional()
});

export type BalanceSettingsResourcePayoutScheduleModel = z.infer<typeof BalanceSettingsResourcePayoutSchedule>;

export const BalanceSettingsResourcePayouts = z.object({
'minimum_balance_by_currency': z.record(z.string(), z.number().int()),
'schedule': z.union([BalanceSettingsResourcePayoutSchedule]),
'statement_descriptor': z.string(),
'status': z.enum(['disabled', 'enabled'])
});

export type BalanceSettingsResourcePayoutsModel = z.infer<typeof BalanceSettingsResourcePayouts>;

export const BalanceSettingsResourceSettlementTiming = z.object({
'delay_days': z.number().int(),
'delay_days_override': z.number().int().optional()
});

export type BalanceSettingsResourceSettlementTimingModel = z.infer<typeof BalanceSettingsResourceSettlementTiming>;

export const BalanceSettingsResourcePayments = z.object({
'debit_negative_balances': z.boolean(),
'payouts': z.union([BalanceSettingsResourcePayouts]),
'settlement_timing': BalanceSettingsResourceSettlementTiming
});

export type BalanceSettingsResourcePaymentsModel = z.infer<typeof BalanceSettingsResourcePayments>;

export const BalanceSettings = z.object({
'object': z.enum(['balance_settings']),
'payments': BalanceSettingsResourcePayments
});

export type BalanceSettingsModel = z.infer<typeof BalanceSettings>;

export const BalanceSettingsUpdated = z.object({
'object': BalanceSettings
});

export type BalanceSettingsUpdatedModel = z.infer<typeof BalanceSettingsUpdated>;

export const BankConnectionsResourceAccountNumberDetails = z.object({
'expected_expiry_date': z.number().int(),
'identifier_type': z.enum(['account_number', 'tokenized_account_number']),
'status': z.enum(['deactivated', 'transactable']),
'supported_networks': z.array(z.enum(['ach']))
});

export type BankConnectionsResourceAccountNumberDetailsModel = z.infer<typeof BankConnectionsResourceAccountNumberDetails>;

export const BankConnectionsResourceAccountholder = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]).optional(),
'customer': z.union([z.string(), z.lazy(() => Customer)]).optional(),
'type': z.enum(['account', 'customer'])
});

export type BankConnectionsResourceAccountholderModel = z.infer<typeof BankConnectionsResourceAccountholder>;

export const BankConnectionsResourceBalanceApiResourceCashBalance = z.object({
'available': z.record(z.string(), z.number().int())
});

export type BankConnectionsResourceBalanceApiResourceCashBalanceModel = z.infer<typeof BankConnectionsResourceBalanceApiResourceCashBalance>;

export const BankConnectionsResourceBalanceApiResourceCreditBalance = z.object({
'used': z.record(z.string(), z.number().int())
});

export type BankConnectionsResourceBalanceApiResourceCreditBalanceModel = z.infer<typeof BankConnectionsResourceBalanceApiResourceCreditBalance>;

export const BankConnectionsResourceBalance = z.object({
'as_of': z.number().int(),
'cash': BankConnectionsResourceBalanceApiResourceCashBalance.optional(),
'credit': BankConnectionsResourceBalanceApiResourceCreditBalance.optional(),
'current': z.record(z.string(), z.number().int()),
'type': z.enum(['cash', 'credit'])
});

export type BankConnectionsResourceBalanceModel = z.infer<typeof BankConnectionsResourceBalance>;

export const BankConnectionsResourceBalanceRefresh = z.object({
'last_attempted_at': z.number().int(),
'next_refresh_available_at': z.number().int(),
'status': z.enum(['failed', 'pending', 'succeeded'])
});

export type BankConnectionsResourceBalanceRefreshModel = z.infer<typeof BankConnectionsResourceBalanceRefresh>;

export const BankConnectionsResourceLinkAccountSessionFilters = z.object({
'account_subcategories': z.array(z.enum(['checking', 'credit_card', 'line_of_credit', 'mortgage', 'savings'])),
'countries': z.array(z.string())
});

export type BankConnectionsResourceLinkAccountSessionFiltersModel = z.infer<typeof BankConnectionsResourceLinkAccountSessionFilters>;

export const BankConnectionsResourceOwnershipRefresh = z.object({
'last_attempted_at': z.number().int(),
'next_refresh_available_at': z.number().int(),
'status': z.enum(['failed', 'pending', 'succeeded'])
});

export type BankConnectionsResourceOwnershipRefreshModel = z.infer<typeof BankConnectionsResourceOwnershipRefresh>;

export const BankConnectionsResourceTransactionRefresh = z.object({
'id': z.string(),
'last_attempted_at': z.number().int(),
'next_refresh_available_at': z.number().int(),
'status': z.enum(['failed', 'pending', 'succeeded'])
});

export type BankConnectionsResourceTransactionRefreshModel = z.infer<typeof BankConnectionsResourceTransactionRefresh>;

export const BankConnectionsResourceTransactionResourceStatusTransitions = z.object({
'posted_at': z.number().int(),
'void_at': z.number().int()
});

export type BankConnectionsResourceTransactionResourceStatusTransitionsModel = z.infer<typeof BankConnectionsResourceTransactionResourceStatusTransitions>;

export const ThresholdsResourceUsageAlertFilter = z.object({
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'type': z.enum(['customer'])
});

export type ThresholdsResourceUsageAlertFilterModel = z.infer<typeof ThresholdsResourceUsageAlertFilter>;

export const BillingMeterResourceCustomerMappingSettings = z.object({
'event_payload_key': z.string(),
'type': z.enum(['by_id'])
});

export type BillingMeterResourceCustomerMappingSettingsModel = z.infer<typeof BillingMeterResourceCustomerMappingSettings>;

export const BillingMeterResourceAggregationSettings = z.object({
'formula': z.enum(['count', 'last', 'sum'])
});

export type BillingMeterResourceAggregationSettingsModel = z.infer<typeof BillingMeterResourceAggregationSettings>;

export const BillingMeterResourceBillingMeterStatusTransitions = z.object({
'deactivated_at': z.number().int()
});

export type BillingMeterResourceBillingMeterStatusTransitionsModel = z.infer<typeof BillingMeterResourceBillingMeterStatusTransitions>;

export const BillingMeterResourceBillingMeterValue = z.object({
'event_payload_key': z.string()
});

export type BillingMeterResourceBillingMeterValueModel = z.infer<typeof BillingMeterResourceBillingMeterValue>;

export const BillingMeter = z.object({
'created': z.number().int(),
'customer_mapping': BillingMeterResourceCustomerMappingSettings,
'default_aggregation': BillingMeterResourceAggregationSettings,
'display_name': z.string(),
'event_name': z.string(),
'event_time_window': z.enum(['day', 'hour']),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.meter']),
'status': z.enum(['active', 'inactive']),
'status_transitions': BillingMeterResourceBillingMeterStatusTransitions,
'updated': z.number().int(),
'value_settings': BillingMeterResourceBillingMeterValue
});

export type BillingMeterModel = z.infer<typeof BillingMeter>;

export const ThresholdsResourceUsageThresholdConfig = z.object({
'filters': z.array(ThresholdsResourceUsageAlertFilter),
'gte': z.number().int(),
'meter': z.union([z.string(), BillingMeter]),
'recurrence': z.enum(['one_time'])
});

export type ThresholdsResourceUsageThresholdConfigModel = z.infer<typeof ThresholdsResourceUsageThresholdConfig>;

export const BillingAlert = z.object({
'alert_type': z.enum(['usage_threshold']),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.alert']),
'status': z.enum(['active', 'archived', 'inactive']),
'title': z.string(),
'usage_threshold': z.union([ThresholdsResourceUsageThresholdConfig])
});

export type BillingAlertModel = z.infer<typeof BillingAlert>;

export const BillingAlertTriggered_1 = z.object({
'alert': BillingAlert,
'created': z.number().int(),
'customer': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.alert_triggered']),
'value': z.number().int()
});

export type BillingAlertTriggered_1Model = z.infer<typeof BillingAlertTriggered_1>;

export const BillingAlertTriggered = z.object({
'object': BillingAlertTriggered_1
});

export type BillingAlertTriggeredModel = z.infer<typeof BillingAlertTriggered>;

export const CreditBalance = z.object({
'available_balance': BillingCreditGrantsResourceAmount,
'ledger_balance': BillingCreditGrantsResourceAmount
});

export type CreditBalanceModel = z.infer<typeof CreditBalance>;

export const BillingCreditBalanceSummary = z.object({
'balances': z.array(CreditBalance),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'livemode': z.boolean(),
'object': z.enum(['billing.credit_balance_summary'])
});

export type BillingCreditBalanceSummaryModel = z.infer<typeof BillingCreditBalanceSummary>;

export const BillingCreditBalanceTransactionCreated = z.object({
'object': z.lazy(() => BillingCreditBalanceTransaction)
});

export type BillingCreditBalanceTransactionCreatedModel = z.infer<typeof BillingCreditBalanceTransactionCreated>;

export const BillingCreditGrantCreated = z.object({
'object': z.lazy(() => BillingCreditGrant)
});

export type BillingCreditGrantCreatedModel = z.infer<typeof BillingCreditGrantCreated>;

export const BillingCreditGrantUpdated = z.object({
'object': z.lazy(() => BillingCreditGrant)
});

export type BillingCreditGrantUpdatedModel = z.infer<typeof BillingCreditGrantUpdated>;

export const BillingMeterCreated = z.object({
'object': BillingMeter
});

export type BillingMeterCreatedModel = z.infer<typeof BillingMeterCreated>;

export const BillingMeterDeactivated = z.object({
'object': BillingMeter
});

export type BillingMeterDeactivatedModel = z.infer<typeof BillingMeterDeactivated>;

export const BillingMeterReactivated = z.object({
'object': BillingMeter
});

export type BillingMeterReactivatedModel = z.infer<typeof BillingMeterReactivated>;

export const BillingMeterUpdated = z.object({
'object': BillingMeter
});

export type BillingMeterUpdatedModel = z.infer<typeof BillingMeterUpdated>;

export const BillingMeterEvent = z.object({
'created': z.number().int(),
'event_name': z.string(),
'identifier': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.meter_event']),
'payload': z.record(z.string(), z.string()),
'timestamp': z.number().int()
});

export type BillingMeterEventModel = z.infer<typeof BillingMeterEvent>;

export const BillingMeterResourceBillingMeterEventAdjustmentCancel = z.object({
'identifier': z.string()
});

export type BillingMeterResourceBillingMeterEventAdjustmentCancelModel = z.infer<typeof BillingMeterResourceBillingMeterEventAdjustmentCancel>;

export const BillingMeterEventAdjustment = z.object({
'cancel': z.union([BillingMeterResourceBillingMeterEventAdjustmentCancel]),
'event_name': z.string(),
'livemode': z.boolean(),
'object': z.enum(['billing.meter_event_adjustment']),
'status': z.enum(['complete', 'pending']),
'type': z.enum(['cancel'])
});

export type BillingMeterEventAdjustmentModel = z.infer<typeof BillingMeterEventAdjustment>;

export const BillingMeterEventSummary = z.object({
'aggregated_value': z.number(),
'end_time': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'meter': z.string(),
'object': z.enum(['billing.meter_event_summary']),
'start_time': z.number().int()
});

export type BillingMeterEventSummaryModel = z.infer<typeof BillingMeterEventSummary>;

export const BillingBillResourceInvoiceItemParentsInvoiceItemSubscriptionParent = z.object({
'subscription': z.string(),
'subscription_item': z.string().optional()
});

export type BillingBillResourceInvoiceItemParentsInvoiceItemSubscriptionParentModel = z.infer<typeof BillingBillResourceInvoiceItemParentsInvoiceItemSubscriptionParent>;

export const BillingBillResourceInvoiceItemParentsInvoiceItemParent = z.object({
'subscription_details': z.union([BillingBillResourceInvoiceItemParentsInvoiceItemSubscriptionParent]),
'type': z.enum(['subscription_details'])
});

export type BillingBillResourceInvoiceItemParentsInvoiceItemParentModel = z.infer<typeof BillingBillResourceInvoiceItemParentsInvoiceItemParent>;

export const PortalBusinessProfile = z.object({
'headline': z.string(),
'privacy_policy_url': z.string(),
'terms_of_service_url': z.string()
});

export type PortalBusinessProfileModel = z.infer<typeof PortalBusinessProfile>;

export const PortalCustomerUpdate = z.object({
'allowed_updates': z.array(z.enum(['address', 'email', 'name', 'phone', 'shipping', 'tax_id'])),
'enabled': z.boolean()
});

export type PortalCustomerUpdateModel = z.infer<typeof PortalCustomerUpdate>;

export const PortalInvoiceList = z.object({
'enabled': z.boolean()
});

export type PortalInvoiceListModel = z.infer<typeof PortalInvoiceList>;

export const PortalPaymentMethodUpdate = z.object({
'enabled': z.boolean(),
'payment_method_configuration': z.string()
});

export type PortalPaymentMethodUpdateModel = z.infer<typeof PortalPaymentMethodUpdate>;

export const PortalSubscriptionCancellationReason = z.object({
'enabled': z.boolean(),
'options': z.array(z.enum(['customer_service', 'low_quality', 'missing_features', 'other', 'switched_service', 'too_complex', 'too_expensive', 'unused']))
});

export type PortalSubscriptionCancellationReasonModel = z.infer<typeof PortalSubscriptionCancellationReason>;

export const PortalSubscriptionCancel = z.object({
'cancellation_reason': PortalSubscriptionCancellationReason,
'enabled': z.boolean(),
'mode': z.enum(['at_period_end', 'immediately']),
'proration_behavior': z.enum(['always_invoice', 'create_prorations', 'none'])
});

export type PortalSubscriptionCancelModel = z.infer<typeof PortalSubscriptionCancel>;

export const PortalSubscriptionUpdateProductAdjustableQuantity = z.object({
'enabled': z.boolean(),
'maximum': z.number().int(),
'minimum': z.number().int()
});

export type PortalSubscriptionUpdateProductAdjustableQuantityModel = z.infer<typeof PortalSubscriptionUpdateProductAdjustableQuantity>;

export const PortalSubscriptionUpdateProduct = z.object({
'adjustable_quantity': PortalSubscriptionUpdateProductAdjustableQuantity,
'prices': z.array(z.string()),
'product': z.string()
});

export type PortalSubscriptionUpdateProductModel = z.infer<typeof PortalSubscriptionUpdateProduct>;

export const PortalResourceScheduleUpdateAtPeriodEndCondition = z.object({
'type': z.enum(['decreasing_item_amount', 'shortening_interval'])
});

export type PortalResourceScheduleUpdateAtPeriodEndConditionModel = z.infer<typeof PortalResourceScheduleUpdateAtPeriodEndCondition>;

export const PortalResourceScheduleUpdateAtPeriodEnd = z.object({
'conditions': z.array(PortalResourceScheduleUpdateAtPeriodEndCondition)
});

export type PortalResourceScheduleUpdateAtPeriodEndModel = z.infer<typeof PortalResourceScheduleUpdateAtPeriodEnd>;

export const PortalSubscriptionUpdate = z.object({
'default_allowed_updates': z.array(z.enum(['price', 'promotion_code', 'quantity'])),
'enabled': z.boolean(),
'products': z.array(PortalSubscriptionUpdateProduct).optional(),
'proration_behavior': z.enum(['always_invoice', 'create_prorations', 'none']),
'schedule_at_period_end': PortalResourceScheduleUpdateAtPeriodEnd,
'trial_update_behavior': z.enum(['continue_trial', 'end_trial'])
});

export type PortalSubscriptionUpdateModel = z.infer<typeof PortalSubscriptionUpdate>;

export const PortalFeatures = z.object({
'customer_update': PortalCustomerUpdate,
'invoice_history': PortalInvoiceList,
'payment_method_update': PortalPaymentMethodUpdate,
'subscription_cancel': PortalSubscriptionCancel,
'subscription_update': PortalSubscriptionUpdate
});

export type PortalFeaturesModel = z.infer<typeof PortalFeatures>;

export const PortalLoginPage = z.object({
'enabled': z.boolean(),
'url': z.string()
});

export type PortalLoginPageModel = z.infer<typeof PortalLoginPage>;

export const BillingPortalConfiguration = z.object({
'active': z.boolean(),
'application': z.union([z.string(), Application, DeletedApplication]),
'business_profile': PortalBusinessProfile,
'created': z.number().int(),
'default_return_url': z.string(),
'features': PortalFeatures,
'id': z.string(),
'is_default': z.boolean(),
'livemode': z.boolean(),
'login_page': PortalLoginPage,
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['billing_portal.configuration']),
'updated': z.number().int()
});

export type BillingPortalConfigurationModel = z.infer<typeof BillingPortalConfiguration>;

export const BillingPortalConfigurationCreated = z.object({
'object': BillingPortalConfiguration
});

export type BillingPortalConfigurationCreatedModel = z.infer<typeof BillingPortalConfigurationCreated>;

export const BillingPortalConfigurationUpdated = z.object({
'object': BillingPortalConfiguration
});

export type BillingPortalConfigurationUpdatedModel = z.infer<typeof BillingPortalConfigurationUpdated>;

export const PortalFlowsAfterCompletionHostedConfirmation = z.object({
'custom_message': z.string()
});

export type PortalFlowsAfterCompletionHostedConfirmationModel = z.infer<typeof PortalFlowsAfterCompletionHostedConfirmation>;

export const PortalFlowsAfterCompletionRedirect = z.object({
'return_url': z.string()
});

export type PortalFlowsAfterCompletionRedirectModel = z.infer<typeof PortalFlowsAfterCompletionRedirect>;

export const PortalFlowsFlowAfterCompletion = z.object({
'hosted_confirmation': z.union([PortalFlowsAfterCompletionHostedConfirmation]),
'redirect': z.union([PortalFlowsAfterCompletionRedirect]),
'type': z.enum(['hosted_confirmation', 'portal_homepage', 'redirect'])
});

export type PortalFlowsFlowAfterCompletionModel = z.infer<typeof PortalFlowsFlowAfterCompletion>;

export const PortalFlowsCouponOffer = z.object({
'coupon': z.string()
});

export type PortalFlowsCouponOfferModel = z.infer<typeof PortalFlowsCouponOffer>;

export const PortalFlowsRetention = z.object({
'coupon_offer': z.union([PortalFlowsCouponOffer]),
'type': z.enum(['coupon_offer'])
});

export type PortalFlowsRetentionModel = z.infer<typeof PortalFlowsRetention>;

export const PortalFlowsFlowSubscriptionCancel = z.object({
'retention': z.union([PortalFlowsRetention]),
'subscription': z.string()
});

export type PortalFlowsFlowSubscriptionCancelModel = z.infer<typeof PortalFlowsFlowSubscriptionCancel>;

export const PortalFlowsFlowSubscriptionUpdate = z.object({
'subscription': z.string()
});

export type PortalFlowsFlowSubscriptionUpdateModel = z.infer<typeof PortalFlowsFlowSubscriptionUpdate>;

export const PortalFlowsSubscriptionUpdateConfirmDiscount = z.object({
'coupon': z.string(),
'promotion_code': z.string()
});

export type PortalFlowsSubscriptionUpdateConfirmDiscountModel = z.infer<typeof PortalFlowsSubscriptionUpdateConfirmDiscount>;

export const PortalFlowsSubscriptionUpdateConfirmItem = z.object({
'id': z.string(),
'price': z.string(),
'quantity': z.number().int().optional()
});

export type PortalFlowsSubscriptionUpdateConfirmItemModel = z.infer<typeof PortalFlowsSubscriptionUpdateConfirmItem>;

export const PortalFlowsFlowSubscriptionUpdateConfirm = z.object({
'discounts': z.array(PortalFlowsSubscriptionUpdateConfirmDiscount),
'items': z.array(PortalFlowsSubscriptionUpdateConfirmItem),
'subscription': z.string()
});

export type PortalFlowsFlowSubscriptionUpdateConfirmModel = z.infer<typeof PortalFlowsFlowSubscriptionUpdateConfirm>;

export const PortalFlowsFlow = z.object({
'after_completion': PortalFlowsFlowAfterCompletion,
'subscription_cancel': z.union([PortalFlowsFlowSubscriptionCancel]),
'subscription_update': z.union([PortalFlowsFlowSubscriptionUpdate]),
'subscription_update_confirm': z.union([PortalFlowsFlowSubscriptionUpdateConfirm]),
'type': z.enum(['payment_method_update', 'subscription_cancel', 'subscription_update', 'subscription_update_confirm'])
});

export type PortalFlowsFlowModel = z.infer<typeof PortalFlowsFlow>;

export const BillingPortalSession = z.object({
'configuration': z.union([z.string(), BillingPortalConfiguration]),
'created': z.number().int(),
'customer': z.string(),
'flow': z.union([PortalFlowsFlow]),
'id': z.string(),
'livemode': z.boolean(),
'locale': z.enum(['auto', 'bg', 'cs', 'da', 'de', 'el', 'en', 'en-AU', 'en-CA', 'en-GB', 'en-IE', 'en-IN', 'en-NZ', 'en-SG', 'es', 'es-419', 'et', 'fi', 'fil', 'fr', 'fr-CA', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'ms', 'mt', 'nb', 'nl', 'pl', 'pt', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'sv', 'th', 'tr', 'vi', 'zh', 'zh-HK', 'zh-TW']),
'object': z.enum(['billing_portal.session']),
'on_behalf_of': z.string(),
'return_url': z.string(),
'url': z.string()
});

export type BillingPortalSessionModel = z.infer<typeof BillingPortalSession>;

export const BillingPortalSessionCreated = z.object({
'object': BillingPortalSession
});

export type BillingPortalSessionCreatedModel = z.infer<typeof BillingPortalSessionCreated>;

export const Capability = z.object({
'account': z.union([z.string(), z.lazy(() => Account)]),
'future_requirements': AccountCapabilityFutureRequirements.optional(),
'id': z.string(),
'object': z.enum(['capability']),
'requested': z.boolean(),
'requested_at': z.number().int(),
'requirements': AccountCapabilityRequirements.optional(),
'status': z.enum(['active', 'inactive', 'pending', 'unrequested'])
});

export type CapabilityModel = z.infer<typeof Capability>;

export const CapabilityUpdated = z.object({
'object': Capability
});

export type CapabilityUpdatedModel = z.infer<typeof CapabilityUpdated>;

export const CashBalanceFundsAvailable = z.object({
'object': CashBalance
});

export type CashBalanceFundsAvailableModel = z.infer<typeof CashBalanceFundsAvailable>;

export const ChargeCaptured = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeCapturedModel = z.infer<typeof ChargeCaptured>;

export const ChargeDisputeClosed = z.object({
'object': z.lazy(() => Dispute)
});

export type ChargeDisputeClosedModel = z.infer<typeof ChargeDisputeClosed>;

export const ChargeDisputeCreated = z.object({
'object': z.lazy(() => Dispute)
});

export type ChargeDisputeCreatedModel = z.infer<typeof ChargeDisputeCreated>;

export const ChargeDisputeFundsReinstated = z.object({
'object': z.lazy(() => Dispute)
});

export type ChargeDisputeFundsReinstatedModel = z.infer<typeof ChargeDisputeFundsReinstated>;

export const ChargeDisputeFundsWithdrawn = z.object({
'object': z.lazy(() => Dispute)
});

export type ChargeDisputeFundsWithdrawnModel = z.infer<typeof ChargeDisputeFundsWithdrawn>;

export const ChargeDisputeUpdated = z.object({
'object': z.lazy(() => Dispute)
});

export type ChargeDisputeUpdatedModel = z.infer<typeof ChargeDisputeUpdated>;

export const ChargeExpired = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeExpiredModel = z.infer<typeof ChargeExpired>;

export const ChargeFailed = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeFailedModel = z.infer<typeof ChargeFailed>;

export const ChargePending = z.object({
'object': z.lazy(() => Charge)
});

export type ChargePendingModel = z.infer<typeof ChargePending>;

export const ChargeRefundUpdated = z.object({
'object': z.lazy(() => Refund)
});

export type ChargeRefundUpdatedModel = z.infer<typeof ChargeRefundUpdated>;

export const ChargeRefunded = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeRefundedModel = z.infer<typeof ChargeRefunded>;

export const ChargeSucceeded = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeSucceededModel = z.infer<typeof ChargeSucceeded>;

export const ChargeUpdated = z.object({
'object': z.lazy(() => Charge)
});

export type ChargeUpdatedModel = z.infer<typeof ChargeUpdated>;

export const PaymentPagesCheckoutSessionAdaptivePricing = z.object({
'enabled': z.boolean()
});

export type PaymentPagesCheckoutSessionAdaptivePricingModel = z.infer<typeof PaymentPagesCheckoutSessionAdaptivePricing>;

export const PaymentPagesCheckoutSessionAfterExpirationRecovery = z.object({
'allow_promotion_codes': z.boolean(),
'enabled': z.boolean(),
'expires_at': z.number().int(),
'url': z.string()
});

export type PaymentPagesCheckoutSessionAfterExpirationRecoveryModel = z.infer<typeof PaymentPagesCheckoutSessionAfterExpirationRecovery>;

export const PaymentPagesCheckoutSessionAfterExpiration = z.object({
'recovery': z.union([PaymentPagesCheckoutSessionAfterExpirationRecovery])
});

export type PaymentPagesCheckoutSessionAfterExpirationModel = z.infer<typeof PaymentPagesCheckoutSessionAfterExpiration>;

export const PaymentPagesCheckoutSessionAutomaticTax = z.object({
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)]),
'provider': z.string(),
'status': z.enum(['complete', 'failed', 'requires_location_inputs'])
});

export type PaymentPagesCheckoutSessionAutomaticTaxModel = z.infer<typeof PaymentPagesCheckoutSessionAutomaticTax>;

export const PaymentPagesCheckoutSessionBrandingSettingsIcon = z.object({
'file': z.string().optional(),
'type': z.enum(['file', 'url']),
'url': z.string().optional()
});

export type PaymentPagesCheckoutSessionBrandingSettingsIconModel = z.infer<typeof PaymentPagesCheckoutSessionBrandingSettingsIcon>;

export const PaymentPagesCheckoutSessionBrandingSettingsLogo = z.object({
'file': z.string().optional(),
'type': z.enum(['file', 'url']),
'url': z.string().optional()
});

export type PaymentPagesCheckoutSessionBrandingSettingsLogoModel = z.infer<typeof PaymentPagesCheckoutSessionBrandingSettingsLogo>;

export const PaymentPagesCheckoutSessionBrandingSettings = z.object({
'background_color': z.string(),
'border_style': z.enum(['pill', 'rectangular', 'rounded']),
'button_color': z.string(),
'display_name': z.string(),
'font_family': z.string(),
'icon': z.union([PaymentPagesCheckoutSessionBrandingSettingsIcon]),
'logo': z.union([PaymentPagesCheckoutSessionBrandingSettingsLogo])
});

export type PaymentPagesCheckoutSessionBrandingSettingsModel = z.infer<typeof PaymentPagesCheckoutSessionBrandingSettings>;

export const PaymentPagesCheckoutSessionCheckoutAddressDetails = z.object({
'address': Address,
'name': z.string()
});

export type PaymentPagesCheckoutSessionCheckoutAddressDetailsModel = z.infer<typeof PaymentPagesCheckoutSessionCheckoutAddressDetails>;

export const PaymentPagesCheckoutSessionCollectedInformation = z.object({
'business_name': z.string(),
'individual_name': z.string(),
'shipping_details': z.union([PaymentPagesCheckoutSessionCheckoutAddressDetails])
});

export type PaymentPagesCheckoutSessionCollectedInformationModel = z.infer<typeof PaymentPagesCheckoutSessionCollectedInformation>;

export const PaymentPagesCheckoutSessionConsent = z.object({
'promotions': z.enum(['opt_in', 'opt_out']),
'terms_of_service': z.enum(['accepted'])
});

export type PaymentPagesCheckoutSessionConsentModel = z.infer<typeof PaymentPagesCheckoutSessionConsent>;

export const PaymentPagesCheckoutSessionPaymentMethodReuseAgreement = z.object({
'position': z.enum(['auto', 'hidden'])
});

export type PaymentPagesCheckoutSessionPaymentMethodReuseAgreementModel = z.infer<typeof PaymentPagesCheckoutSessionPaymentMethodReuseAgreement>;

export const PaymentPagesCheckoutSessionConsentCollection = z.object({
'payment_method_reuse_agreement': z.union([PaymentPagesCheckoutSessionPaymentMethodReuseAgreement]),
'promotions': z.enum(['auto', 'none']),
'terms_of_service': z.enum(['none', 'required'])
});

export type PaymentPagesCheckoutSessionConsentCollectionModel = z.infer<typeof PaymentPagesCheckoutSessionConsentCollection>;

export const PaymentPagesCheckoutSessionCurrencyConversion = z.object({
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'fx_rate': z.string(),
'source_currency': z.string()
});

export type PaymentPagesCheckoutSessionCurrencyConversionModel = z.infer<typeof PaymentPagesCheckoutSessionCurrencyConversion>;

export const PaymentPagesCheckoutSessionCustomFieldsOption = z.object({
'label': z.string(),
'value': z.string()
});

export type PaymentPagesCheckoutSessionCustomFieldsOptionModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFieldsOption>;

export const PaymentPagesCheckoutSessionCustomFieldsDropdown = z.object({
'default_value': z.string(),
'options': z.array(PaymentPagesCheckoutSessionCustomFieldsOption),
'value': z.string()
});

export type PaymentPagesCheckoutSessionCustomFieldsDropdownModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFieldsDropdown>;

export const PaymentPagesCheckoutSessionCustomFieldsLabel = z.object({
'custom': z.string(),
'type': z.enum(['custom'])
});

export type PaymentPagesCheckoutSessionCustomFieldsLabelModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFieldsLabel>;

export const PaymentPagesCheckoutSessionCustomFieldsNumeric = z.object({
'default_value': z.string(),
'maximum_length': z.number().int(),
'minimum_length': z.number().int(),
'value': z.string()
});

export type PaymentPagesCheckoutSessionCustomFieldsNumericModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFieldsNumeric>;

export const PaymentPagesCheckoutSessionCustomFieldsText = z.object({
'default_value': z.string(),
'maximum_length': z.number().int(),
'minimum_length': z.number().int(),
'value': z.string()
});

export type PaymentPagesCheckoutSessionCustomFieldsTextModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFieldsText>;

export const PaymentPagesCheckoutSessionCustomFields = z.object({
'dropdown': PaymentPagesCheckoutSessionCustomFieldsDropdown.optional(),
'key': z.string(),
'label': PaymentPagesCheckoutSessionCustomFieldsLabel,
'numeric': PaymentPagesCheckoutSessionCustomFieldsNumeric.optional(),
'optional': z.boolean(),
'text': PaymentPagesCheckoutSessionCustomFieldsText.optional(),
'type': z.enum(['dropdown', 'numeric', 'text'])
});

export type PaymentPagesCheckoutSessionCustomFieldsModel = z.infer<typeof PaymentPagesCheckoutSessionCustomFields>;

export const PaymentPagesCheckoutSessionCustomTextPosition = z.object({
'message': z.string()
});

export type PaymentPagesCheckoutSessionCustomTextPositionModel = z.infer<typeof PaymentPagesCheckoutSessionCustomTextPosition>;

export const PaymentPagesCheckoutSessionCustomText = z.object({
'after_submit': z.union([PaymentPagesCheckoutSessionCustomTextPosition]),
'shipping_address': z.union([PaymentPagesCheckoutSessionCustomTextPosition]),
'submit': z.union([PaymentPagesCheckoutSessionCustomTextPosition]),
'terms_of_service_acceptance': z.union([PaymentPagesCheckoutSessionCustomTextPosition])
});

export type PaymentPagesCheckoutSessionCustomTextModel = z.infer<typeof PaymentPagesCheckoutSessionCustomText>;

export const PaymentPagesCheckoutSessionTaxId = z.object({
'type': z.enum(['ad_nrt', 'ae_trn', 'al_tin', 'am_tin', 'ao_tin', 'ar_cuit', 'au_abn', 'au_arn', 'aw_tin', 'az_tin', 'ba_tin', 'bb_tin', 'bd_bin', 'bf_ifu', 'bg_uic', 'bh_vat', 'bj_ifu', 'bo_tin', 'br_cnpj', 'br_cpf', 'bs_tin', 'by_tin', 'ca_bn', 'ca_gst_hst', 'ca_pst_bc', 'ca_pst_mb', 'ca_pst_sk', 'ca_qst', 'cd_nif', 'ch_uid', 'ch_vat', 'cl_tin', 'cm_niu', 'cn_tin', 'co_nit', 'cr_tin', 'cv_nif', 'de_stn', 'do_rcn', 'ec_ruc', 'eg_tin', 'es_cif', 'et_tin', 'eu_oss_vat', 'eu_vat', 'gb_vat', 'ge_vat', 'gn_nif', 'hk_br', 'hr_oib', 'hu_tin', 'id_npwp', 'il_vat', 'in_gst', 'is_vat', 'jp_cn', 'jp_rn', 'jp_trn', 'ke_pin', 'kg_tin', 'kh_tin', 'kr_brn', 'kz_bin', 'la_tin', 'li_uid', 'li_vat', 'ma_vat', 'md_vat', 'me_pib', 'mk_vat', 'mr_nif', 'mx_rfc', 'my_frp', 'my_itn', 'my_sst', 'ng_tin', 'no_vat', 'no_voec', 'np_pan', 'nz_gst', 'om_vat', 'pe_ruc', 'ph_tin', 'ro_tin', 'rs_pib', 'ru_inn', 'ru_kpp', 'sa_vat', 'sg_gst', 'sg_uen', 'si_tin', 'sn_ninea', 'sr_fin', 'sv_nit', 'th_vat', 'tj_tin', 'tr_tin', 'tw_vat', 'tz_vat', 'ua_vat', 'ug_tin', 'unknown', 'us_ein', 'uy_ruc', 'uz_tin', 'uz_vat', 've_rif', 'vn_tin', 'za_vat', 'zm_tin', 'zw_tin']),
'value': z.string()
});

export type PaymentPagesCheckoutSessionTaxIdModel = z.infer<typeof PaymentPagesCheckoutSessionTaxId>;

export const PaymentPagesCheckoutSessionCustomerDetails = z.object({
'address': z.union([Address]),
'business_name': z.string(),
'email': z.string(),
'individual_name': z.string(),
'name': z.string(),
'phone': z.string(),
'tax_exempt': z.enum(['exempt', 'none', 'reverse']),
'tax_ids': z.array(PaymentPagesCheckoutSessionTaxId)
});

export type PaymentPagesCheckoutSessionCustomerDetailsModel = z.infer<typeof PaymentPagesCheckoutSessionCustomerDetails>;

export const PaymentPagesCheckoutSessionDiscount = z.object({
'coupon': z.union([z.string(), Coupon]),
'promotion_code': z.union([z.string(), z.lazy(() => PromotionCode)])
});

export type PaymentPagesCheckoutSessionDiscountModel = z.infer<typeof PaymentPagesCheckoutSessionDiscount>;

export const InvoiceSettingCheckoutRenderingOptions = z.object({
'amount_tax_display': z.string(),
'template': z.string()
});

export type InvoiceSettingCheckoutRenderingOptionsModel = z.infer<typeof InvoiceSettingCheckoutRenderingOptions>;

export const PaymentPagesCheckoutSessionInvoiceSettings = z.object({
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'custom_fields': z.array(InvoiceSettingCustomField),
'description': z.string(),
'footer': z.string(),
'issuer': z.union([z.lazy(() => ConnectAccountReference)]),
'metadata': z.record(z.string(), z.string()),
'rendering_options': z.union([InvoiceSettingCheckoutRenderingOptions])
});

export type PaymentPagesCheckoutSessionInvoiceSettingsModel = z.infer<typeof PaymentPagesCheckoutSessionInvoiceSettings>;

export const PaymentPagesCheckoutSessionInvoiceCreation = z.object({
'enabled': z.boolean(),
'invoice_data': PaymentPagesCheckoutSessionInvoiceSettings
});

export type PaymentPagesCheckoutSessionInvoiceCreationModel = z.infer<typeof PaymentPagesCheckoutSessionInvoiceCreation>;

export const LineItemsDiscountAmount = z.object({
'amount': z.number().int(),
'discount': z.lazy(() => Discount)
});

export type LineItemsDiscountAmountModel = z.infer<typeof LineItemsDiscountAmount>;

export const Item = z.object({
'amount_discount': z.number().int(),
'amount_subtotal': z.number().int(),
'amount_tax': z.number().int(),
'amount_total': z.number().int(),
'currency': z.string(),
'description': z.string(),
'discounts': z.array(LineItemsDiscountAmount).optional(),
'id': z.string(),
'object': z.enum(['item']),
'price': z.union([z.lazy(() => Price)]),
'quantity': z.number().int(),
'taxes': z.array(LineItemsTaxAmount).optional()
});

export type ItemModel = z.infer<typeof Item>;

export const PaymentPagesCheckoutSessionBusinessName = z.object({
'enabled': z.boolean(),
'optional': z.boolean()
});

export type PaymentPagesCheckoutSessionBusinessNameModel = z.infer<typeof PaymentPagesCheckoutSessionBusinessName>;

export const PaymentPagesCheckoutSessionIndividualName = z.object({
'enabled': z.boolean(),
'optional': z.boolean()
});

export type PaymentPagesCheckoutSessionIndividualNameModel = z.infer<typeof PaymentPagesCheckoutSessionIndividualName>;

export const PaymentPagesCheckoutSessionNameCollection = z.object({
'business': PaymentPagesCheckoutSessionBusinessName.optional(),
'individual': PaymentPagesCheckoutSessionIndividualName.optional()
});

export type PaymentPagesCheckoutSessionNameCollectionModel = z.infer<typeof PaymentPagesCheckoutSessionNameCollection>;

export const PaymentPagesCheckoutSessionOptionalItemAdjustableQuantity = z.object({
'enabled': z.boolean(),
'maximum': z.number().int(),
'minimum': z.number().int()
});

export type PaymentPagesCheckoutSessionOptionalItemAdjustableQuantityModel = z.infer<typeof PaymentPagesCheckoutSessionOptionalItemAdjustableQuantity>;

export const PaymentPagesCheckoutSessionOptionalItem = z.object({
'adjustable_quantity': z.union([PaymentPagesCheckoutSessionOptionalItemAdjustableQuantity]),
'price': z.string(),
'quantity': z.number().int()
});

export type PaymentPagesCheckoutSessionOptionalItemModel = z.infer<typeof PaymentPagesCheckoutSessionOptionalItem>;

export const PaymentLinksResourceCompletionBehaviorConfirmationPage = z.object({
'custom_message': z.string()
});

export type PaymentLinksResourceCompletionBehaviorConfirmationPageModel = z.infer<typeof PaymentLinksResourceCompletionBehaviorConfirmationPage>;

export const PaymentLinksResourceCompletionBehaviorRedirect = z.object({
'url': z.string()
});

export type PaymentLinksResourceCompletionBehaviorRedirectModel = z.infer<typeof PaymentLinksResourceCompletionBehaviorRedirect>;

export const PaymentLinksResourceAfterCompletion = z.object({
'hosted_confirmation': PaymentLinksResourceCompletionBehaviorConfirmationPage.optional(),
'redirect': PaymentLinksResourceCompletionBehaviorRedirect.optional(),
'type': z.enum(['hosted_confirmation', 'redirect'])
});

export type PaymentLinksResourceAfterCompletionModel = z.infer<typeof PaymentLinksResourceAfterCompletion>;

export const PaymentLinksResourceAutomaticTax = z.object({
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)])
});

export type PaymentLinksResourceAutomaticTaxModel = z.infer<typeof PaymentLinksResourceAutomaticTax>;

export const PaymentLinksResourcePaymentMethodReuseAgreement = z.object({
'position': z.enum(['auto', 'hidden'])
});

export type PaymentLinksResourcePaymentMethodReuseAgreementModel = z.infer<typeof PaymentLinksResourcePaymentMethodReuseAgreement>;

export const PaymentLinksResourceConsentCollection = z.object({
'payment_method_reuse_agreement': z.union([PaymentLinksResourcePaymentMethodReuseAgreement]),
'promotions': z.enum(['auto', 'none']),
'terms_of_service': z.enum(['none', 'required'])
});

export type PaymentLinksResourceConsentCollectionModel = z.infer<typeof PaymentLinksResourceConsentCollection>;

export const PaymentLinksResourceCustomFieldsDropdownOption = z.object({
'label': z.string(),
'value': z.string()
});

export type PaymentLinksResourceCustomFieldsDropdownOptionModel = z.infer<typeof PaymentLinksResourceCustomFieldsDropdownOption>;

export const PaymentLinksResourceCustomFieldsDropdown = z.object({
'default_value': z.string(),
'options': z.array(PaymentLinksResourceCustomFieldsDropdownOption)
});

export type PaymentLinksResourceCustomFieldsDropdownModel = z.infer<typeof PaymentLinksResourceCustomFieldsDropdown>;

export const PaymentLinksResourceCustomFieldsLabel = z.object({
'custom': z.string(),
'type': z.enum(['custom'])
});

export type PaymentLinksResourceCustomFieldsLabelModel = z.infer<typeof PaymentLinksResourceCustomFieldsLabel>;

export const PaymentLinksResourceCustomFieldsNumeric = z.object({
'default_value': z.string(),
'maximum_length': z.number().int(),
'minimum_length': z.number().int()
});

export type PaymentLinksResourceCustomFieldsNumericModel = z.infer<typeof PaymentLinksResourceCustomFieldsNumeric>;

export const PaymentLinksResourceCustomFieldsText = z.object({
'default_value': z.string(),
'maximum_length': z.number().int(),
'minimum_length': z.number().int()
});

export type PaymentLinksResourceCustomFieldsTextModel = z.infer<typeof PaymentLinksResourceCustomFieldsText>;

export const PaymentLinksResourceCustomFields = z.object({
'dropdown': PaymentLinksResourceCustomFieldsDropdown.optional(),
'key': z.string(),
'label': PaymentLinksResourceCustomFieldsLabel,
'numeric': PaymentLinksResourceCustomFieldsNumeric.optional(),
'optional': z.boolean(),
'text': PaymentLinksResourceCustomFieldsText.optional(),
'type': z.enum(['dropdown', 'numeric', 'text'])
});

export type PaymentLinksResourceCustomFieldsModel = z.infer<typeof PaymentLinksResourceCustomFields>;

export const PaymentLinksResourceCustomTextPosition = z.object({
'message': z.string()
});

export type PaymentLinksResourceCustomTextPositionModel = z.infer<typeof PaymentLinksResourceCustomTextPosition>;

export const PaymentLinksResourceCustomText = z.object({
'after_submit': z.union([PaymentLinksResourceCustomTextPosition]),
'shipping_address': z.union([PaymentLinksResourceCustomTextPosition]),
'submit': z.union([PaymentLinksResourceCustomTextPosition]),
'terms_of_service_acceptance': z.union([PaymentLinksResourceCustomTextPosition])
});

export type PaymentLinksResourceCustomTextModel = z.infer<typeof PaymentLinksResourceCustomText>;

export const PaymentLinksResourceInvoiceSettings = z.object({
'account_tax_ids': z.array(z.union([z.string(), z.lazy(() => TaxId), DeletedTaxId])),
'custom_fields': z.array(InvoiceSettingCustomField),
'description': z.string(),
'footer': z.string(),
'issuer': z.union([z.lazy(() => ConnectAccountReference)]),
'metadata': z.record(z.string(), z.string()),
'rendering_options': z.union([InvoiceSettingCheckoutRenderingOptions])
});

export type PaymentLinksResourceInvoiceSettingsModel = z.infer<typeof PaymentLinksResourceInvoiceSettings>;

export const PaymentLinksResourceInvoiceCreation = z.object({
'enabled': z.boolean(),
'invoice_data': z.union([PaymentLinksResourceInvoiceSettings])
});

export type PaymentLinksResourceInvoiceCreationModel = z.infer<typeof PaymentLinksResourceInvoiceCreation>;

export const PaymentLinksResourceBusinessName = z.object({
'enabled': z.boolean(),
'optional': z.boolean()
});

export type PaymentLinksResourceBusinessNameModel = z.infer<typeof PaymentLinksResourceBusinessName>;

export const PaymentLinksResourceIndividualName = z.object({
'enabled': z.boolean(),
'optional': z.boolean()
});

export type PaymentLinksResourceIndividualNameModel = z.infer<typeof PaymentLinksResourceIndividualName>;

export const PaymentLinksResourceNameCollection = z.object({
'business': PaymentLinksResourceBusinessName.optional(),
'individual': PaymentLinksResourceIndividualName.optional()
});

export type PaymentLinksResourceNameCollectionModel = z.infer<typeof PaymentLinksResourceNameCollection>;

export const PaymentLinksResourceOptionalItemAdjustableQuantity = z.object({
'enabled': z.boolean(),
'maximum': z.number().int(),
'minimum': z.number().int()
});

export type PaymentLinksResourceOptionalItemAdjustableQuantityModel = z.infer<typeof PaymentLinksResourceOptionalItemAdjustableQuantity>;

export const PaymentLinksResourceOptionalItem = z.object({
'adjustable_quantity': z.union([PaymentLinksResourceOptionalItemAdjustableQuantity]),
'price': z.string(),
'quantity': z.number().int()
});

export type PaymentLinksResourceOptionalItemModel = z.infer<typeof PaymentLinksResourceOptionalItem>;

export const PaymentLinksResourcePaymentIntentData = z.object({
'capture_method': z.enum(['automatic', 'automatic_async', 'manual']),
'description': z.string(),
'metadata': z.record(z.string(), z.string()),
'setup_future_usage': z.enum(['off_session', 'on_session']),
'statement_descriptor': z.string(),
'statement_descriptor_suffix': z.string(),
'transfer_group': z.string()
});

export type PaymentLinksResourcePaymentIntentDataModel = z.infer<typeof PaymentLinksResourcePaymentIntentData>;

export const PaymentLinksResourcePhoneNumberCollection = z.object({
'enabled': z.boolean()
});

export type PaymentLinksResourcePhoneNumberCollectionModel = z.infer<typeof PaymentLinksResourcePhoneNumberCollection>;

export const PaymentLinksResourceCompletedSessions = z.object({
'count': z.number().int(),
'limit': z.number().int()
});

export type PaymentLinksResourceCompletedSessionsModel = z.infer<typeof PaymentLinksResourceCompletedSessions>;

export const PaymentLinksResourceRestrictions = z.object({
'completed_sessions': PaymentLinksResourceCompletedSessions
});

export type PaymentLinksResourceRestrictionsModel = z.infer<typeof PaymentLinksResourceRestrictions>;

export const PaymentLinksResourceShippingAddressCollection = z.object({
'allowed_countries': z.array(z.enum(['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']))
});

export type PaymentLinksResourceShippingAddressCollectionModel = z.infer<typeof PaymentLinksResourceShippingAddressCollection>;

export const PaymentLinksResourceShippingOption = z.object({
'shipping_amount': z.number().int(),
'shipping_rate': z.union([z.string(), ShippingRate])
});

export type PaymentLinksResourceShippingOptionModel = z.infer<typeof PaymentLinksResourceShippingOption>;

export const PaymentLinksResourceSubscriptionDataInvoiceSettings = z.object({
'issuer': z.lazy(() => ConnectAccountReference)
});

export type PaymentLinksResourceSubscriptionDataInvoiceSettingsModel = z.infer<typeof PaymentLinksResourceSubscriptionDataInvoiceSettings>;

export const PaymentLinksResourceSubscriptionData = z.object({
'description': z.string(),
'invoice_settings': PaymentLinksResourceSubscriptionDataInvoiceSettings,
'metadata': z.record(z.string(), z.string()),
'trial_period_days': z.number().int(),
'trial_settings': z.union([SubscriptionsTrialsResourceTrialSettings])
});

export type PaymentLinksResourceSubscriptionDataModel = z.infer<typeof PaymentLinksResourceSubscriptionData>;

export const PaymentLinksResourceTaxIdCollection = z.object({
'enabled': z.boolean(),
'required': z.enum(['if_supported', 'never'])
});

export type PaymentLinksResourceTaxIdCollectionModel = z.infer<typeof PaymentLinksResourceTaxIdCollection>;

export const PaymentLinksResourceTransferData = z.object({
'amount': z.number().int(),
'destination': z.union([z.string(), z.lazy(() => Account)])
});

export type PaymentLinksResourceTransferDataModel = z.infer<typeof PaymentLinksResourceTransferData>;

export const PaymentLink = z.object({
'active': z.boolean(),
'after_completion': PaymentLinksResourceAfterCompletion,
'allow_promotion_codes': z.boolean(),
'application': z.union([z.string(), Application, DeletedApplication]),
'application_fee_amount': z.number().int(),
'application_fee_percent': z.number(),
'automatic_tax': PaymentLinksResourceAutomaticTax,
'billing_address_collection': z.enum(['auto', 'required']),
'consent_collection': z.union([PaymentLinksResourceConsentCollection]),
'currency': z.string(),
'custom_fields': z.array(PaymentLinksResourceCustomFields),
'custom_text': PaymentLinksResourceCustomText,
'customer_creation': z.enum(['always', 'if_required']),
'id': z.string(),
'inactive_message': z.string(),
'invoice_creation': z.union([PaymentLinksResourceInvoiceCreation]),
'line_items': z.object({
'data': z.array(Item),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'name_collection': PaymentLinksResourceNameCollection.optional(),
'object': z.enum(['payment_link']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'optional_items': z.array(PaymentLinksResourceOptionalItem).optional(),
'payment_intent_data': z.union([PaymentLinksResourcePaymentIntentData]),
'payment_method_collection': z.enum(['always', 'if_required']),
'payment_method_types': z.array(z.enum(['affirm', 'afterpay_clearpay', 'alipay', 'alma', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'cashapp', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'klarna', 'konbini', 'link', 'mb_way', 'mobilepay', 'multibanco', 'oxxo', 'p24', 'pay_by_bank', 'paynow', 'paypal', 'pix', 'promptpay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip'])),
'phone_number_collection': PaymentLinksResourcePhoneNumberCollection,
'restrictions': z.union([PaymentLinksResourceRestrictions]),
'shipping_address_collection': z.union([PaymentLinksResourceShippingAddressCollection]),
'shipping_options': z.array(PaymentLinksResourceShippingOption),
'submit_type': z.enum(['auto', 'book', 'donate', 'pay', 'subscribe']),
'subscription_data': z.union([PaymentLinksResourceSubscriptionData]),
'tax_id_collection': PaymentLinksResourceTaxIdCollection,
'transfer_data': z.union([PaymentLinksResourceTransferData]),
'url': z.string()
});

export type PaymentLinkModel = z.infer<typeof PaymentLink>;

export const CheckoutAcssDebitMandateOptions = z.object({
'custom_mandate_url': z.string().optional(),
'default_for': z.array(z.enum(['invoice', 'subscription'])).optional(),
'interval_description': z.string(),
'payment_schedule': z.enum(['combined', 'interval', 'sporadic']),
'transaction_type': z.enum(['business', 'personal'])
});

export type CheckoutAcssDebitMandateOptionsModel = z.infer<typeof CheckoutAcssDebitMandateOptions>;

export const CheckoutAcssDebitPaymentMethodOptions = z.object({
'currency': z.enum(['cad', 'usd']).optional(),
'mandate_options': CheckoutAcssDebitMandateOptions.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type CheckoutAcssDebitPaymentMethodOptionsModel = z.infer<typeof CheckoutAcssDebitPaymentMethodOptions>;

export const CheckoutAffirmPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutAffirmPaymentMethodOptionsModel = z.infer<typeof CheckoutAffirmPaymentMethodOptions>;

export const CheckoutAfterpayClearpayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutAfterpayClearpayPaymentMethodOptionsModel = z.infer<typeof CheckoutAfterpayClearpayPaymentMethodOptions>;

export const CheckoutAlipayPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutAlipayPaymentMethodOptionsModel = z.infer<typeof CheckoutAlipayPaymentMethodOptions>;

export const CheckoutAlmaPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type CheckoutAlmaPaymentMethodOptionsModel = z.infer<typeof CheckoutAlmaPaymentMethodOptions>;

export const CheckoutAmazonPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutAmazonPayPaymentMethodOptionsModel = z.infer<typeof CheckoutAmazonPayPaymentMethodOptions>;

export const CheckoutAuBecsDebitPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional(),
'target_date': z.string().optional()
});

export type CheckoutAuBecsDebitPaymentMethodOptionsModel = z.infer<typeof CheckoutAuBecsDebitPaymentMethodOptions>;

export const CheckoutPaymentMethodOptionsMandateOptionsBacsDebit = z.object({
'reference_prefix': z.string().optional()
});

export type CheckoutPaymentMethodOptionsMandateOptionsBacsDebitModel = z.infer<typeof CheckoutPaymentMethodOptionsMandateOptionsBacsDebit>;

export const CheckoutBacsDebitPaymentMethodOptions = z.object({
'mandate_options': CheckoutPaymentMethodOptionsMandateOptionsBacsDebit.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type CheckoutBacsDebitPaymentMethodOptionsModel = z.infer<typeof CheckoutBacsDebitPaymentMethodOptions>;

export const CheckoutBancontactPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutBancontactPaymentMethodOptionsModel = z.infer<typeof CheckoutBancontactPaymentMethodOptions>;

export const CheckoutBilliePaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type CheckoutBilliePaymentMethodOptionsModel = z.infer<typeof CheckoutBilliePaymentMethodOptions>;

export const CheckoutBoletoPaymentMethodOptions = z.object({
'expires_after_days': z.number().int(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional()
});

export type CheckoutBoletoPaymentMethodOptionsModel = z.infer<typeof CheckoutBoletoPaymentMethodOptions>;

export const CheckoutCardInstallmentsOptions = z.object({
'enabled': z.boolean().optional()
});

export type CheckoutCardInstallmentsOptionsModel = z.infer<typeof CheckoutCardInstallmentsOptions>;

export const PaymentPagesPrivateCardPaymentMethodOptionsResourceRestrictions = z.object({
'brands_blocked': z.array(z.enum(['american_express', 'discover_global_network', 'mastercard', 'visa'])).optional()
});

export type PaymentPagesPrivateCardPaymentMethodOptionsResourceRestrictionsModel = z.infer<typeof PaymentPagesPrivateCardPaymentMethodOptionsResourceRestrictions>;

export const CheckoutCardPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'installments': CheckoutCardInstallmentsOptions.optional(),
'request_extended_authorization': z.enum(['if_available', 'never']).optional(),
'request_incremental_authorization': z.enum(['if_available', 'never']).optional(),
'request_multicapture': z.enum(['if_available', 'never']).optional(),
'request_overcapture': z.enum(['if_available', 'never']).optional(),
'request_three_d_secure': z.enum(['any', 'automatic', 'challenge']),
'restrictions': PaymentPagesPrivateCardPaymentMethodOptionsResourceRestrictions.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'statement_descriptor_suffix_kana': z.string().optional(),
'statement_descriptor_suffix_kanji': z.string().optional()
});

export type CheckoutCardPaymentMethodOptionsModel = z.infer<typeof CheckoutCardPaymentMethodOptions>;

export const CheckoutCashappPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutCashappPaymentMethodOptionsModel = z.infer<typeof CheckoutCashappPaymentMethodOptions>;

export const CheckoutCustomerBalanceBankTransferPaymentMethodOptions = z.object({
'eu_bank_transfer': PaymentMethodOptionsCustomerBalanceEuBankAccount.optional(),
'requested_address_types': z.array(z.enum(['aba', 'iban', 'sepa', 'sort_code', 'spei', 'swift', 'zengin'])).optional(),
'type': z.enum(['eu_bank_transfer', 'gb_bank_transfer', 'jp_bank_transfer', 'mx_bank_transfer', 'us_bank_transfer'])
});

export type CheckoutCustomerBalanceBankTransferPaymentMethodOptionsModel = z.infer<typeof CheckoutCustomerBalanceBankTransferPaymentMethodOptions>;

export const CheckoutCustomerBalancePaymentMethodOptions = z.object({
'bank_transfer': CheckoutCustomerBalanceBankTransferPaymentMethodOptions.optional(),
'funding_type': z.enum(['bank_transfer']),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutCustomerBalancePaymentMethodOptionsModel = z.infer<typeof CheckoutCustomerBalancePaymentMethodOptions>;

export const CheckoutEpsPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutEpsPaymentMethodOptionsModel = z.infer<typeof CheckoutEpsPaymentMethodOptions>;

export const CheckoutFpxPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutFpxPaymentMethodOptionsModel = z.infer<typeof CheckoutFpxPaymentMethodOptions>;

export const CheckoutGiropayPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutGiropayPaymentMethodOptionsModel = z.infer<typeof CheckoutGiropayPaymentMethodOptions>;

export const CheckoutGrabPayPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutGrabPayPaymentMethodOptionsModel = z.infer<typeof CheckoutGrabPayPaymentMethodOptions>;

export const CheckoutIdealPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutIdealPaymentMethodOptionsModel = z.infer<typeof CheckoutIdealPaymentMethodOptions>;

export const CheckoutKakaoPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutKakaoPayPaymentMethodOptionsModel = z.infer<typeof CheckoutKakaoPayPaymentMethodOptions>;

export const CheckoutKlarnaPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional()
});

export type CheckoutKlarnaPaymentMethodOptionsModel = z.infer<typeof CheckoutKlarnaPaymentMethodOptions>;

export const CheckoutKonbiniPaymentMethodOptions = z.object({
'expires_after_days': z.number().int(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutKonbiniPaymentMethodOptionsModel = z.infer<typeof CheckoutKonbiniPaymentMethodOptions>;

export const CheckoutKrCardPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutKrCardPaymentMethodOptionsModel = z.infer<typeof CheckoutKrCardPaymentMethodOptions>;

export const CheckoutLinkPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutLinkPaymentMethodOptionsModel = z.infer<typeof CheckoutLinkPaymentMethodOptions>;

export const CheckoutMobilepayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutMobilepayPaymentMethodOptionsModel = z.infer<typeof CheckoutMobilepayPaymentMethodOptions>;

export const CheckoutMultibancoPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutMultibancoPaymentMethodOptionsModel = z.infer<typeof CheckoutMultibancoPaymentMethodOptions>;

export const CheckoutNaverPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutNaverPayPaymentMethodOptionsModel = z.infer<typeof CheckoutNaverPayPaymentMethodOptions>;

export const CheckoutOxxoPaymentMethodOptions = z.object({
'expires_after_days': z.number().int(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutOxxoPaymentMethodOptionsModel = z.infer<typeof CheckoutOxxoPaymentMethodOptions>;

export const CheckoutP24PaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutP24PaymentMethodOptionsModel = z.infer<typeof CheckoutP24PaymentMethodOptions>;

export const CheckoutPaycoPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type CheckoutPaycoPaymentMethodOptionsModel = z.infer<typeof CheckoutPaycoPaymentMethodOptions>;

export const CheckoutPaynowPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutPaynowPaymentMethodOptionsModel = z.infer<typeof CheckoutPaynowPaymentMethodOptions>;

export const CheckoutPaypalPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'preferred_locale': z.string(),
'reference': z.string(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutPaypalPaymentMethodOptionsModel = z.infer<typeof CheckoutPaypalPaymentMethodOptions>;

export const CheckoutPixPaymentMethodOptions = z.object({
'amount_includes_iof': z.enum(['always', 'never']).optional(),
'expires_after_seconds': z.number().int(),
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutPixPaymentMethodOptionsModel = z.infer<typeof CheckoutPixPaymentMethodOptions>;

export const CheckoutRevolutPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional(),
'setup_future_usage': z.enum(['none', 'off_session']).optional()
});

export type CheckoutRevolutPayPaymentMethodOptionsModel = z.infer<typeof CheckoutRevolutPayPaymentMethodOptions>;

export const CheckoutSamsungPayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type CheckoutSamsungPayPaymentMethodOptionsModel = z.infer<typeof CheckoutSamsungPayPaymentMethodOptions>;

export const CheckoutSatispayPaymentMethodOptions = z.object({
'capture_method': z.enum(['manual']).optional()
});

export type CheckoutSatispayPaymentMethodOptionsModel = z.infer<typeof CheckoutSatispayPaymentMethodOptions>;

export const CheckoutPaymentMethodOptionsMandateOptionsSepaDebit = z.object({
'reference_prefix': z.string().optional()
});

export type CheckoutPaymentMethodOptionsMandateOptionsSepaDebitModel = z.infer<typeof CheckoutPaymentMethodOptionsMandateOptionsSepaDebit>;

export const CheckoutSepaDebitPaymentMethodOptions = z.object({
'mandate_options': CheckoutPaymentMethodOptionsMandateOptionsSepaDebit.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional()
});

export type CheckoutSepaDebitPaymentMethodOptionsModel = z.infer<typeof CheckoutSepaDebitPaymentMethodOptions>;

export const CheckoutSofortPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutSofortPaymentMethodOptionsModel = z.infer<typeof CheckoutSofortPaymentMethodOptions>;

export const CheckoutSwishPaymentMethodOptions = z.object({
'reference': z.string()
});

export type CheckoutSwishPaymentMethodOptionsModel = z.infer<typeof CheckoutSwishPaymentMethodOptions>;

export const CheckoutTwintPaymentMethodOptions = z.object({
'setup_future_usage': z.enum(['none']).optional()
});

export type CheckoutTwintPaymentMethodOptionsModel = z.infer<typeof CheckoutTwintPaymentMethodOptions>;

export const CheckoutUsBankAccountPaymentMethodOptions = z.object({
'financial_connections': LinkedAccountOptionsCommon.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'target_date': z.string().optional(),
'verification_method': z.enum(['automatic', 'instant']).optional()
});

export type CheckoutUsBankAccountPaymentMethodOptionsModel = z.infer<typeof CheckoutUsBankAccountPaymentMethodOptions>;

export const CheckoutSessionPaymentMethodOptions = z.object({
'acss_debit': CheckoutAcssDebitPaymentMethodOptions.optional(),
'affirm': CheckoutAffirmPaymentMethodOptions.optional(),
'afterpay_clearpay': CheckoutAfterpayClearpayPaymentMethodOptions.optional(),
'alipay': CheckoutAlipayPaymentMethodOptions.optional(),
'alma': CheckoutAlmaPaymentMethodOptions.optional(),
'amazon_pay': CheckoutAmazonPayPaymentMethodOptions.optional(),
'au_becs_debit': CheckoutAuBecsDebitPaymentMethodOptions.optional(),
'bacs_debit': CheckoutBacsDebitPaymentMethodOptions.optional(),
'bancontact': CheckoutBancontactPaymentMethodOptions.optional(),
'billie': CheckoutBilliePaymentMethodOptions.optional(),
'boleto': CheckoutBoletoPaymentMethodOptions.optional(),
'card': CheckoutCardPaymentMethodOptions.optional(),
'cashapp': CheckoutCashappPaymentMethodOptions.optional(),
'customer_balance': CheckoutCustomerBalancePaymentMethodOptions.optional(),
'eps': CheckoutEpsPaymentMethodOptions.optional(),
'fpx': CheckoutFpxPaymentMethodOptions.optional(),
'giropay': CheckoutGiropayPaymentMethodOptions.optional(),
'grabpay': CheckoutGrabPayPaymentMethodOptions.optional(),
'ideal': CheckoutIdealPaymentMethodOptions.optional(),
'kakao_pay': CheckoutKakaoPayPaymentMethodOptions.optional(),
'klarna': CheckoutKlarnaPaymentMethodOptions.optional(),
'konbini': CheckoutKonbiniPaymentMethodOptions.optional(),
'kr_card': CheckoutKrCardPaymentMethodOptions.optional(),
'link': CheckoutLinkPaymentMethodOptions.optional(),
'mobilepay': CheckoutMobilepayPaymentMethodOptions.optional(),
'multibanco': CheckoutMultibancoPaymentMethodOptions.optional(),
'naver_pay': CheckoutNaverPayPaymentMethodOptions.optional(),
'oxxo': CheckoutOxxoPaymentMethodOptions.optional(),
'p24': CheckoutP24PaymentMethodOptions.optional(),
'payco': CheckoutPaycoPaymentMethodOptions.optional(),
'paynow': CheckoutPaynowPaymentMethodOptions.optional(),
'paypal': CheckoutPaypalPaymentMethodOptions.optional(),
'pix': CheckoutPixPaymentMethodOptions.optional(),
'revolut_pay': CheckoutRevolutPayPaymentMethodOptions.optional(),
'samsung_pay': CheckoutSamsungPayPaymentMethodOptions.optional(),
'satispay': CheckoutSatispayPaymentMethodOptions.optional(),
'sepa_debit': CheckoutSepaDebitPaymentMethodOptions.optional(),
'sofort': CheckoutSofortPaymentMethodOptions.optional(),
'swish': CheckoutSwishPaymentMethodOptions.optional(),
'twint': CheckoutTwintPaymentMethodOptions.optional(),
'us_bank_account': CheckoutUsBankAccountPaymentMethodOptions.optional()
});

export type CheckoutSessionPaymentMethodOptionsModel = z.infer<typeof CheckoutSessionPaymentMethodOptions>;

export const PaymentPagesCheckoutSessionPermissions = z.object({
'update_shipping_details': z.enum(['client_only', 'server_only'])
});

export type PaymentPagesCheckoutSessionPermissionsModel = z.infer<typeof PaymentPagesCheckoutSessionPermissions>;

export const PaymentPagesCheckoutSessionPhoneNumberCollection = z.object({
'enabled': z.boolean()
});

export type PaymentPagesCheckoutSessionPhoneNumberCollectionModel = z.infer<typeof PaymentPagesCheckoutSessionPhoneNumberCollection>;

export const PaymentPagesCheckoutSessionSavedPaymentMethodOptions = z.object({
'allow_redisplay_filters': z.array(z.enum(['always', 'limited', 'unspecified'])),
'payment_method_remove': z.enum(['disabled', 'enabled']),
'payment_method_save': z.enum(['disabled', 'enabled'])
});

export type PaymentPagesCheckoutSessionSavedPaymentMethodOptionsModel = z.infer<typeof PaymentPagesCheckoutSessionSavedPaymentMethodOptions>;

export const PaymentPagesCheckoutSessionShippingAddressCollection = z.object({
'allowed_countries': z.array(z.enum(['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']))
});

export type PaymentPagesCheckoutSessionShippingAddressCollectionModel = z.infer<typeof PaymentPagesCheckoutSessionShippingAddressCollection>;

export const PaymentPagesCheckoutSessionShippingCost = z.object({
'amount_subtotal': z.number().int(),
'amount_tax': z.number().int(),
'amount_total': z.number().int(),
'shipping_rate': z.union([z.string(), ShippingRate]),
'taxes': z.array(LineItemsTaxAmount).optional()
});

export type PaymentPagesCheckoutSessionShippingCostModel = z.infer<typeof PaymentPagesCheckoutSessionShippingCost>;

export const PaymentPagesCheckoutSessionShippingOption = z.object({
'shipping_amount': z.number().int(),
'shipping_rate': z.union([z.string(), ShippingRate])
});

export type PaymentPagesCheckoutSessionShippingOptionModel = z.infer<typeof PaymentPagesCheckoutSessionShippingOption>;

export const PaymentPagesCheckoutSessionTaxIdCollection = z.object({
'enabled': z.boolean(),
'required': z.enum(['if_supported', 'never'])
});

export type PaymentPagesCheckoutSessionTaxIdCollectionModel = z.infer<typeof PaymentPagesCheckoutSessionTaxIdCollection>;

export const PaymentPagesCheckoutSessionTotalDetailsResourceBreakdown = z.object({
'discounts': z.array(LineItemsDiscountAmount),
'taxes': z.array(LineItemsTaxAmount)
});

export type PaymentPagesCheckoutSessionTotalDetailsResourceBreakdownModel = z.infer<typeof PaymentPagesCheckoutSessionTotalDetailsResourceBreakdown>;

export const PaymentPagesCheckoutSessionTotalDetails = z.object({
'amount_discount': z.number().int(),
'amount_shipping': z.number().int(),
'amount_tax': z.number().int(),
'breakdown': PaymentPagesCheckoutSessionTotalDetailsResourceBreakdown.optional()
});

export type PaymentPagesCheckoutSessionTotalDetailsModel = z.infer<typeof PaymentPagesCheckoutSessionTotalDetails>;

export const CheckoutLinkWalletOptions = z.object({
'display': z.enum(['auto', 'never']).optional()
});

export type CheckoutLinkWalletOptionsModel = z.infer<typeof CheckoutLinkWalletOptions>;

export const CheckoutSessionWalletOptions = z.object({
'link': CheckoutLinkWalletOptions.optional()
});

export type CheckoutSessionWalletOptionsModel = z.infer<typeof CheckoutSessionWalletOptions>;

export const CheckoutSession = z.object({
'adaptive_pricing': z.union([PaymentPagesCheckoutSessionAdaptivePricing]),
'after_expiration': z.union([PaymentPagesCheckoutSessionAfterExpiration]),
'allow_promotion_codes': z.boolean(),
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'automatic_tax': PaymentPagesCheckoutSessionAutomaticTax,
'billing_address_collection': z.enum(['auto', 'required']),
'branding_settings': PaymentPagesCheckoutSessionBrandingSettings.optional(),
'cancel_url': z.string(),
'client_reference_id': z.string(),
'client_secret': z.string(),
'collected_information': z.union([PaymentPagesCheckoutSessionCollectedInformation]),
'consent': z.union([PaymentPagesCheckoutSessionConsent]),
'consent_collection': z.union([PaymentPagesCheckoutSessionConsentCollection]),
'created': z.number().int(),
'currency': z.string(),
'currency_conversion': z.union([PaymentPagesCheckoutSessionCurrencyConversion]),
'custom_fields': z.array(PaymentPagesCheckoutSessionCustomFields),
'custom_text': PaymentPagesCheckoutSessionCustomText,
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'customer_creation': z.enum(['always', 'if_required']),
'customer_details': z.union([PaymentPagesCheckoutSessionCustomerDetails]),
'customer_email': z.string(),
'discounts': z.array(PaymentPagesCheckoutSessionDiscount),
'excluded_payment_method_types': z.array(z.string()).optional(),
'expires_at': z.number().int(),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'invoice_creation': z.union([PaymentPagesCheckoutSessionInvoiceCreation]),
'line_items': z.object({
'data': z.array(Item),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'livemode': z.boolean(),
'locale': z.enum(['auto', 'bg', 'cs', 'da', 'de', 'el', 'en', 'en-GB', 'es', 'es-419', 'et', 'fi', 'fil', 'fr', 'fr-CA', 'hr', 'hu', 'id', 'it', 'ja', 'ko', 'lt', 'lv', 'ms', 'mt', 'nb', 'nl', 'pl', 'pt', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'sv', 'th', 'tr', 'vi', 'zh', 'zh-HK', 'zh-TW']),
'metadata': z.record(z.string(), z.string()),
'mode': z.enum(['payment', 'setup', 'subscription']),
'name_collection': PaymentPagesCheckoutSessionNameCollection.optional(),
'object': z.enum(['checkout.session']),
'optional_items': z.array(PaymentPagesCheckoutSessionOptionalItem).optional(),
'origin_context': z.enum(['mobile_app', 'web']),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'payment_link': z.union([z.string(), PaymentLink]),
'payment_method_collection': z.enum(['always', 'if_required']),
'payment_method_configuration_details': z.union([PaymentMethodConfigBizPaymentMethodConfigurationDetails]),
'payment_method_options': z.union([CheckoutSessionPaymentMethodOptions]),
'payment_method_types': z.array(z.string()),
'payment_status': z.enum(['no_payment_required', 'paid', 'unpaid']),
'permissions': z.union([PaymentPagesCheckoutSessionPermissions]),
'phone_number_collection': PaymentPagesCheckoutSessionPhoneNumberCollection.optional(),
'presentment_details': PaymentFlowsPaymentIntentPresentmentDetails.optional(),
'recovered_from': z.string(),
'redirect_on_completion': z.enum(['always', 'if_required', 'never']).optional(),
'return_url': z.string().optional(),
'saved_payment_method_options': z.union([PaymentPagesCheckoutSessionSavedPaymentMethodOptions]),
'setup_intent': z.union([z.string(), z.lazy(() => SetupIntent)]),
'shipping_address_collection': z.union([PaymentPagesCheckoutSessionShippingAddressCollection]),
'shipping_cost': z.union([PaymentPagesCheckoutSessionShippingCost]),
'shipping_options': z.array(PaymentPagesCheckoutSessionShippingOption),
'status': z.enum(['complete', 'expired', 'open']),
'submit_type': z.enum(['auto', 'book', 'donate', 'pay', 'subscribe']),
'subscription': z.union([z.string(), z.lazy(() => Subscription)]),
'success_url': z.string(),
'tax_id_collection': PaymentPagesCheckoutSessionTaxIdCollection.optional(),
'total_details': z.union([PaymentPagesCheckoutSessionTotalDetails]),
'ui_mode': z.enum(['custom', 'embedded', 'hosted']),
'url': z.string(),
'wallet_options': z.union([CheckoutSessionWalletOptions])
});

export type CheckoutSessionModel = z.infer<typeof CheckoutSession>;

export const CheckoutSessionAsyncPaymentFailed = z.object({
'object': CheckoutSession
});

export type CheckoutSessionAsyncPaymentFailedModel = z.infer<typeof CheckoutSessionAsyncPaymentFailed>;

export const CheckoutSessionAsyncPaymentSucceeded = z.object({
'object': CheckoutSession
});

export type CheckoutSessionAsyncPaymentSucceededModel = z.infer<typeof CheckoutSessionAsyncPaymentSucceeded>;

export const CheckoutSessionCompleted = z.object({
'object': CheckoutSession
});

export type CheckoutSessionCompletedModel = z.infer<typeof CheckoutSessionCompleted>;

export const CheckoutSessionExpired = z.object({
'object': CheckoutSession
});

export type CheckoutSessionExpiredModel = z.infer<typeof CheckoutSessionExpired>;

export const ClimateRemovalsBeneficiary = z.object({
'public_name': z.string()
});

export type ClimateRemovalsBeneficiaryModel = z.infer<typeof ClimateRemovalsBeneficiary>;

export const ClimateRemovalsLocation = z.object({
'city': z.string(),
'country': z.string(),
'latitude': z.number(),
'longitude': z.number(),
'region': z.string()
});

export type ClimateRemovalsLocationModel = z.infer<typeof ClimateRemovalsLocation>;

export const ClimateSupplier = z.object({
'id': z.string(),
'info_url': z.string(),
'livemode': z.boolean(),
'locations': z.array(ClimateRemovalsLocation),
'name': z.string(),
'object': z.enum(['climate.supplier']),
'removal_pathway': z.enum(['biomass_carbon_removal_and_storage', 'direct_air_capture', 'enhanced_weathering'])
});

export type ClimateSupplierModel = z.infer<typeof ClimateSupplier>;

export const ClimateRemovalsOrderDeliveries = z.object({
'delivered_at': z.number().int(),
'location': z.union([ClimateRemovalsLocation]),
'metric_tons': z.string(),
'registry_url': z.string(),
'supplier': ClimateSupplier
});

export type ClimateRemovalsOrderDeliveriesModel = z.infer<typeof ClimateRemovalsOrderDeliveries>;

export const ClimateRemovalsProductsPrice = z.object({
'amount_fees': z.number().int(),
'amount_subtotal': z.number().int(),
'amount_total': z.number().int()
});

export type ClimateRemovalsProductsPriceModel = z.infer<typeof ClimateRemovalsProductsPrice>;

export const ClimateProduct = z.object({
'created': z.number().int(),
'current_prices_per_metric_ton': z.record(z.string(), ClimateRemovalsProductsPrice),
'delivery_year': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metric_tons_available': z.string(),
'name': z.string(),
'object': z.enum(['climate.product']),
'suppliers': z.array(ClimateSupplier)
});

export type ClimateProductModel = z.infer<typeof ClimateProduct>;

export const ClimateOrder = z.object({
'amount_fees': z.number().int(),
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'beneficiary': ClimateRemovalsBeneficiary.optional(),
'canceled_at': z.number().int(),
'cancellation_reason': z.enum(['expired', 'product_unavailable', 'requested']),
'certificate': z.string(),
'confirmed_at': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'delayed_at': z.number().int(),
'delivered_at': z.number().int(),
'delivery_details': z.array(ClimateRemovalsOrderDeliveries),
'expected_delivery_year': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'metric_tons': z.string(),
'object': z.enum(['climate.order']),
'product': z.union([z.string(), ClimateProduct]),
'product_substituted_at': z.number().int(),
'status': z.enum(['awaiting_funds', 'canceled', 'confirmed', 'delivered', 'open'])
});

export type ClimateOrderModel = z.infer<typeof ClimateOrder>;

export const ClimateOrderCanceled = z.object({
'object': ClimateOrder
});

export type ClimateOrderCanceledModel = z.infer<typeof ClimateOrderCanceled>;

export const ClimateOrderCreated = z.object({
'object': ClimateOrder
});

export type ClimateOrderCreatedModel = z.infer<typeof ClimateOrderCreated>;

export const ClimateOrderDelayed = z.object({
'object': ClimateOrder
});

export type ClimateOrderDelayedModel = z.infer<typeof ClimateOrderDelayed>;

export const ClimateOrderDelivered = z.object({
'object': ClimateOrder
});

export type ClimateOrderDeliveredModel = z.infer<typeof ClimateOrderDelivered>;

export const ClimateOrderProductSubstituted = z.object({
'object': ClimateOrder
});

export type ClimateOrderProductSubstitutedModel = z.infer<typeof ClimateOrderProductSubstituted>;

export const ClimateProductCreated = z.object({
'object': ClimateProduct
});

export type ClimateProductCreatedModel = z.infer<typeof ClimateProductCreated>;

export const ClimateProductPricingUpdated = z.object({
'object': ClimateProduct
});

export type ClimateProductPricingUpdatedModel = z.infer<typeof ClimateProductPricingUpdated>;

export const ConfirmationTokensResourceMandateDataResourceCustomerAcceptanceResourceOnline = z.object({
'ip_address': z.string(),
'user_agent': z.string()
});

export type ConfirmationTokensResourceMandateDataResourceCustomerAcceptanceResourceOnlineModel = z.infer<typeof ConfirmationTokensResourceMandateDataResourceCustomerAcceptanceResourceOnline>;

export const ConfirmationTokensResourceMandateDataResourceCustomerAcceptance = z.object({
'online': z.union([ConfirmationTokensResourceMandateDataResourceCustomerAcceptanceResourceOnline]),
'type': z.string()
});

export type ConfirmationTokensResourceMandateDataResourceCustomerAcceptanceModel = z.infer<typeof ConfirmationTokensResourceMandateDataResourceCustomerAcceptance>;

export const ConfirmationTokensResourceMandateData = z.object({
'customer_acceptance': ConfirmationTokensResourceMandateDataResourceCustomerAcceptance
});

export type ConfirmationTokensResourceMandateDataModel = z.infer<typeof ConfirmationTokensResourceMandateData>;

export const ConfirmationTokensResourcePaymentMethodOptionsResourceCardResourceInstallment = z.object({
'plan': PaymentMethodDetailsCardInstallmentsPlan.optional()
});

export type ConfirmationTokensResourcePaymentMethodOptionsResourceCardResourceInstallmentModel = z.infer<typeof ConfirmationTokensResourcePaymentMethodOptionsResourceCardResourceInstallment>;

export const ConfirmationTokensResourcePaymentMethodOptionsResourceCard = z.object({
'cvc_token': z.string(),
'installments': ConfirmationTokensResourcePaymentMethodOptionsResourceCardResourceInstallment.optional()
});

export type ConfirmationTokensResourcePaymentMethodOptionsResourceCardModel = z.infer<typeof ConfirmationTokensResourcePaymentMethodOptionsResourceCard>;

export const ConfirmationTokensResourcePaymentMethodOptions = z.object({
'card': z.union([ConfirmationTokensResourcePaymentMethodOptionsResourceCard])
});

export type ConfirmationTokensResourcePaymentMethodOptionsModel = z.infer<typeof ConfirmationTokensResourcePaymentMethodOptions>;

export const ConfirmationTokensResourcePaymentMethodPreview = z.object({
'acss_debit': PaymentMethodAcssDebit.optional(),
'affirm': PaymentMethodAffirm.optional(),
'afterpay_clearpay': PaymentMethodAfterpayClearpay.optional(),
'alipay': PaymentFlowsPrivatePaymentMethodsAlipay.optional(),
'allow_redisplay': z.enum(['always', 'limited', 'unspecified']).optional(),
'alma': PaymentMethodAlma.optional(),
'amazon_pay': PaymentMethodAmazonPay.optional(),
'au_becs_debit': PaymentMethodAuBecsDebit.optional(),
'bacs_debit': PaymentMethodBacsDebit.optional(),
'bancontact': PaymentMethodBancontact.optional(),
'billie': PaymentMethodBillie.optional(),
'billing_details': BillingDetails,
'blik': PaymentMethodBlik.optional(),
'boleto': PaymentMethodBoleto.optional(),
'card': z.lazy(() => PaymentMethodCard).optional(),
'card_present': PaymentMethodCardPresent.optional(),
'cashapp': PaymentMethodCashapp.optional(),
'crypto': PaymentMethodCrypto.optional(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'customer_balance': PaymentMethodCustomerBalance.optional(),
'eps': PaymentMethodEps.optional(),
'fpx': PaymentMethodFpx.optional(),
'giropay': PaymentMethodGiropay.optional(),
'grabpay': PaymentMethodGrabpay.optional(),
'ideal': PaymentMethodIdeal.optional(),
'interac_present': PaymentMethodInteracPresent.optional(),
'kakao_pay': PaymentMethodKakaoPay.optional(),
'klarna': PaymentMethodKlarna.optional(),
'konbini': PaymentMethodKonbini.optional(),
'kr_card': PaymentMethodKrCard.optional(),
'link': PaymentMethodLink.optional(),
'mb_way': PaymentMethodMbWay.optional(),
'mobilepay': PaymentMethodMobilepay.optional(),
'multibanco': PaymentMethodMultibanco.optional(),
'naver_pay': PaymentMethodNaverPay.optional(),
'nz_bank_account': PaymentMethodNzBankAccount.optional(),
'oxxo': PaymentMethodOxxo.optional(),
'p24': PaymentMethodP24.optional(),
'pay_by_bank': PaymentMethodPayByBank.optional(),
'payco': PaymentMethodPayco.optional(),
'paynow': PaymentMethodPaynow.optional(),
'paypal': PaymentMethodPaypal.optional(),
'pix': PaymentMethodPix.optional(),
'promptpay': PaymentMethodPromptpay.optional(),
'revolut_pay': PaymentMethodRevolutPay.optional(),
'samsung_pay': PaymentMethodSamsungPay.optional(),
'satispay': PaymentMethodSatispay.optional(),
'sepa_debit': PaymentMethodSepaDebit.optional(),
'sofort': PaymentMethodSofort.optional(),
'swish': PaymentMethodSwish.optional(),
'twint': PaymentMethodTwint.optional(),
'type': z.enum(['acss_debit', 'affirm', 'afterpay_clearpay', 'alipay', 'alma', 'amazon_pay', 'au_becs_debit', 'bacs_debit', 'bancontact', 'billie', 'blik', 'boleto', 'card', 'card_present', 'cashapp', 'crypto', 'custom', 'customer_balance', 'eps', 'fpx', 'giropay', 'grabpay', 'ideal', 'interac_present', 'kakao_pay', 'klarna', 'konbini', 'kr_card', 'link', 'mb_way', 'mobilepay', 'multibanco', 'naver_pay', 'nz_bank_account', 'oxxo', 'p24', 'pay_by_bank', 'payco', 'paynow', 'paypal', 'pix', 'promptpay', 'revolut_pay', 'samsung_pay', 'satispay', 'sepa_debit', 'sofort', 'swish', 'twint', 'us_bank_account', 'wechat_pay', 'zip']),
'us_bank_account': PaymentMethodUsBankAccount.optional(),
'wechat_pay': PaymentMethodWechatPay.optional(),
'zip': PaymentMethodZip.optional()
});

export type ConfirmationTokensResourcePaymentMethodPreviewModel = z.infer<typeof ConfirmationTokensResourcePaymentMethodPreview>;

export const ConfirmationTokensResourceShipping = z.object({
'address': Address,
'name': z.string(),
'phone': z.string()
});

export type ConfirmationTokensResourceShippingModel = z.infer<typeof ConfirmationTokensResourceShipping>;

export const ConfirmationToken = z.object({
'created': z.number().int(),
'expires_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'mandate_data': z.union([ConfirmationTokensResourceMandateData]).optional(),
'object': z.enum(['confirmation_token']),
'payment_intent': z.string(),
'payment_method_options': z.union([ConfirmationTokensResourcePaymentMethodOptions]),
'payment_method_preview': z.union([ConfirmationTokensResourcePaymentMethodPreview]),
'return_url': z.string(),
'setup_future_usage': z.enum(['off_session', 'on_session']),
'setup_intent': z.string(),
'shipping': z.union([ConfirmationTokensResourceShipping]),
'use_stripe_sdk': z.boolean()
});

export type ConfirmationTokenModel = z.infer<typeof ConfirmationToken>;

export const CountrySpecVerificationFieldDetails = z.object({
'additional': z.array(z.string()),
'minimum': z.array(z.string())
});

export type CountrySpecVerificationFieldDetailsModel = z.infer<typeof CountrySpecVerificationFieldDetails>;

export const CountrySpecVerificationFields = z.object({
'company': CountrySpecVerificationFieldDetails,
'individual': CountrySpecVerificationFieldDetails
});

export type CountrySpecVerificationFieldsModel = z.infer<typeof CountrySpecVerificationFields>;

export const CountrySpec = z.object({
'default_currency': z.string(),
'id': z.string(),
'object': z.enum(['country_spec']),
'supported_bank_account_currencies': z.record(z.string(), z.array(z.string())),
'supported_payment_currencies': z.array(z.string()),
'supported_payment_methods': z.array(z.string()),
'supported_transfer_countries': z.array(z.string()),
'verification_fields': CountrySpecVerificationFields
});

export type CountrySpecModel = z.infer<typeof CountrySpec>;

export const CouponCreated = z.object({
'object': Coupon
});

export type CouponCreatedModel = z.infer<typeof CouponCreated>;

export const CouponDeleted = z.object({
'object': Coupon
});

export type CouponDeletedModel = z.infer<typeof CouponDeleted>;

export const CouponUpdated = z.object({
'object': Coupon
});

export type CouponUpdatedModel = z.infer<typeof CouponUpdated>;

export const CustomerBalanceTransaction: z.ZodType<CustomerBalanceTransactionModel> = z.object({
'amount': z.number().int(),
'checkout_session': z.union([z.string(), CheckoutSession]),
'created': z.number().int(),
'credit_note': z.union([z.string(), z.lazy(() => CreditNote)]),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'description': z.string(),
'ending_balance': z.number().int(),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['customer_balance_transaction']),
'type': z.enum(['adjustment', 'applied_to_invoice', 'checkout_session_subscription_payment', 'checkout_session_subscription_payment_canceled', 'credit_note', 'initial', 'invoice_overpaid', 'invoice_too_large', 'invoice_too_small', 'migration', 'unapplied_from_invoice', 'unspent_receiver_credit'])
});

export const CreditNotesPretaxCreditAmount = z.object({
'amount': z.number().int(),
'credit_balance_transaction': z.union([z.string(), z.lazy(() => BillingCreditBalanceTransaction)]).optional(),
'discount': z.union([z.string(), z.lazy(() => Discount), z.lazy(() => DeletedDiscount)]).optional(),
'type': z.enum(['credit_balance_transaction', 'discount'])
});

export type CreditNotesPretaxCreditAmountModel = z.infer<typeof CreditNotesPretaxCreditAmount>;

export const CreditNoteLineItem = z.object({
'amount': z.number().int(),
'description': z.string(),
'discount_amount': z.number().int(),
'discount_amounts': z.array(DiscountsResourceDiscountAmount),
'id': z.string(),
'invoice_line_item': z.string().optional(),
'livemode': z.boolean(),
'object': z.enum(['credit_note_line_item']),
'pretax_credit_amounts': z.array(CreditNotesPretaxCreditAmount),
'quantity': z.number().int(),
'tax_rates': z.array(TaxRate),
'taxes': z.array(BillingBillResourceInvoicingTaxesTax),
'type': z.enum(['custom_line_item', 'invoice_line_item']),
'unit_amount': z.number().int(),
'unit_amount_decimal': z.string()
});

export type CreditNoteLineItemModel = z.infer<typeof CreditNoteLineItem>;

export const CreditNotesPaymentRecordRefund = z.object({
'payment_record': z.string(),
'refund_group': z.string()
});

export type CreditNotesPaymentRecordRefundModel = z.infer<typeof CreditNotesPaymentRecordRefund>;

export const CreditNoteRefund = z.object({
'amount_refunded': z.number().int(),
'payment_record_refund': z.union([CreditNotesPaymentRecordRefund]),
'refund': z.union([z.string(), z.lazy(() => Refund)]),
'type': z.enum(['payment_record_refund', 'refund'])
});

export type CreditNoteRefundModel = z.infer<typeof CreditNoteRefund>;

export const CreditNote: z.ZodType<CreditNoteModel> = z.object({
'amount': z.number().int(),
'amount_shipping': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'customer_balance_transaction': z.union([z.string(), z.lazy(() => CustomerBalanceTransaction)]),
'discount_amount': z.number().int(),
'discount_amounts': z.array(DiscountsResourceDiscountAmount),
'effective_at': z.number().int(),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'lines': z.object({
'data': z.array(CreditNoteLineItem),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'livemode': z.boolean(),
'memo': z.string(),
'metadata': z.record(z.string(), z.string()),
'number': z.string(),
'object': z.enum(['credit_note']),
'out_of_band_amount': z.number().int(),
'pdf': z.string(),
'post_payment_amount': z.number().int(),
'pre_payment_amount': z.number().int(),
'pretax_credit_amounts': z.array(CreditNotesPretaxCreditAmount),
'reason': z.enum(['duplicate', 'fraudulent', 'order_change', 'product_unsatisfactory']),
'refunds': z.array(CreditNoteRefund),
'shipping_cost': z.union([InvoicesResourceShippingCost]),
'status': z.enum(['issued', 'void']),
'subtotal': z.number().int(),
'subtotal_excluding_tax': z.number().int(),
'total': z.number().int(),
'total_excluding_tax': z.number().int(),
'total_taxes': z.array(BillingBillResourceInvoicingTaxesTax),
'type': z.enum(['mixed', 'post_payment', 'pre_payment']),
'voided_at': z.number().int()
});

export const CreditNoteCreated = z.object({
'object': z.lazy(() => CreditNote)
});

export type CreditNoteCreatedModel = z.infer<typeof CreditNoteCreated>;

export const CreditNoteUpdated = z.object({
'object': z.lazy(() => CreditNote)
});

export type CreditNoteUpdatedModel = z.infer<typeof CreditNoteUpdated>;

export const CreditNoteVoided = z.object({
'object': z.lazy(() => CreditNote)
});

export type CreditNoteVoidedModel = z.infer<typeof CreditNoteVoided>;

export const CustomerCreated = z.object({
'object': z.lazy(() => Customer)
});

export type CustomerCreatedModel = z.infer<typeof CustomerCreated>;

export const CustomerDeleted = z.object({
'object': z.lazy(() => Customer)
});

export type CustomerDeletedModel = z.infer<typeof CustomerDeleted>;

export const CustomerDiscountCreated = z.object({
'object': z.lazy(() => Discount)
});

export type CustomerDiscountCreatedModel = z.infer<typeof CustomerDiscountCreated>;

export const CustomerDiscountDeleted = z.object({
'object': z.lazy(() => Discount)
});

export type CustomerDiscountDeletedModel = z.infer<typeof CustomerDiscountDeleted>;

export const CustomerDiscountUpdated = z.object({
'object': z.lazy(() => Discount)
});

export type CustomerDiscountUpdatedModel = z.infer<typeof CustomerDiscountUpdated>;

export const CustomerSourceCreated = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type CustomerSourceCreatedModel = z.infer<typeof CustomerSourceCreated>;

export const CustomerSourceDeleted = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type CustomerSourceDeletedModel = z.infer<typeof CustomerSourceDeleted>;

export const CustomerSourceExpiring = z.object({
'object': z.union([z.lazy(() => Card), Source])
});

export type CustomerSourceExpiringModel = z.infer<typeof CustomerSourceExpiring>;

export const CustomerSourceUpdated = z.object({
'object': z.union([z.lazy(() => BankAccount), z.lazy(() => Card), Source])
});

export type CustomerSourceUpdatedModel = z.infer<typeof CustomerSourceUpdated>;

export const CustomerSubscriptionCreated = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionCreatedModel = z.infer<typeof CustomerSubscriptionCreated>;

export const CustomerSubscriptionDeleted = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionDeletedModel = z.infer<typeof CustomerSubscriptionDeleted>;

export const CustomerSubscriptionPaused = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionPausedModel = z.infer<typeof CustomerSubscriptionPaused>;

export const CustomerSubscriptionPendingUpdateApplied = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionPendingUpdateAppliedModel = z.infer<typeof CustomerSubscriptionPendingUpdateApplied>;

export const CustomerSubscriptionPendingUpdateExpired = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionPendingUpdateExpiredModel = z.infer<typeof CustomerSubscriptionPendingUpdateExpired>;

export const CustomerSubscriptionResumed = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionResumedModel = z.infer<typeof CustomerSubscriptionResumed>;

export const CustomerSubscriptionTrialWillEnd = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionTrialWillEndModel = z.infer<typeof CustomerSubscriptionTrialWillEnd>;

export const CustomerSubscriptionUpdated = z.object({
'object': z.lazy(() => Subscription)
});

export type CustomerSubscriptionUpdatedModel = z.infer<typeof CustomerSubscriptionUpdated>;

export const CustomerTaxIdCreated = z.object({
'object': z.lazy(() => TaxId)
});

export type CustomerTaxIdCreatedModel = z.infer<typeof CustomerTaxIdCreated>;

export const CustomerTaxIdDeleted = z.object({
'object': z.lazy(() => TaxId)
});

export type CustomerTaxIdDeletedModel = z.infer<typeof CustomerTaxIdDeleted>;

export const CustomerTaxIdUpdated = z.object({
'object': z.lazy(() => TaxId)
});

export type CustomerTaxIdUpdatedModel = z.infer<typeof CustomerTaxIdUpdated>;

export const CustomerUpdated = z.object({
'object': z.lazy(() => Customer)
});

export type CustomerUpdatedModel = z.infer<typeof CustomerUpdated>;

export const CustomerCashBalanceTransactionCreated = z.object({
'object': z.lazy(() => CustomerCashBalanceTransaction)
});

export type CustomerCashBalanceTransactionCreatedModel = z.infer<typeof CustomerCashBalanceTransactionCreated>;

export const CustomerSessionResourceComponentsResourceBuyButton = z.object({
'enabled': z.boolean()
});

export type CustomerSessionResourceComponentsResourceBuyButtonModel = z.infer<typeof CustomerSessionResourceComponentsResourceBuyButton>;

export const CustomerSessionResourceComponentsResourceCustomerSheetResourceFeatures = z.object({
'payment_method_allow_redisplay_filters': z.array(z.enum(['always', 'limited', 'unspecified'])),
'payment_method_remove': z.enum(['disabled', 'enabled'])
});

export type CustomerSessionResourceComponentsResourceCustomerSheetResourceFeaturesModel = z.infer<typeof CustomerSessionResourceComponentsResourceCustomerSheetResourceFeatures>;

export const CustomerSessionResourceComponentsResourceCustomerSheet = z.object({
'enabled': z.boolean(),
'features': z.union([CustomerSessionResourceComponentsResourceCustomerSheetResourceFeatures])
});

export type CustomerSessionResourceComponentsResourceCustomerSheetModel = z.infer<typeof CustomerSessionResourceComponentsResourceCustomerSheet>;

export const CustomerSessionResourceComponentsResourceMobilePaymentElementResourceFeatures = z.object({
'payment_method_allow_redisplay_filters': z.array(z.enum(['always', 'limited', 'unspecified'])),
'payment_method_redisplay': z.enum(['disabled', 'enabled']),
'payment_method_remove': z.enum(['disabled', 'enabled']),
'payment_method_save': z.enum(['disabled', 'enabled']),
'payment_method_save_allow_redisplay_override': z.enum(['always', 'limited', 'unspecified'])
});

export type CustomerSessionResourceComponentsResourceMobilePaymentElementResourceFeaturesModel = z.infer<typeof CustomerSessionResourceComponentsResourceMobilePaymentElementResourceFeatures>;

export const CustomerSessionResourceComponentsResourceMobilePaymentElement = z.object({
'enabled': z.boolean(),
'features': z.union([CustomerSessionResourceComponentsResourceMobilePaymentElementResourceFeatures])
});

export type CustomerSessionResourceComponentsResourceMobilePaymentElementModel = z.infer<typeof CustomerSessionResourceComponentsResourceMobilePaymentElement>;

export const CustomerSessionResourceComponentsResourcePaymentElementResourceFeatures = z.object({
'payment_method_allow_redisplay_filters': z.array(z.enum(['always', 'limited', 'unspecified'])),
'payment_method_redisplay': z.enum(['disabled', 'enabled']),
'payment_method_redisplay_limit': z.number().int(),
'payment_method_remove': z.enum(['disabled', 'enabled']),
'payment_method_save': z.enum(['disabled', 'enabled']),
'payment_method_save_usage': z.enum(['off_session', 'on_session'])
});

export type CustomerSessionResourceComponentsResourcePaymentElementResourceFeaturesModel = z.infer<typeof CustomerSessionResourceComponentsResourcePaymentElementResourceFeatures>;

export const CustomerSessionResourceComponentsResourcePaymentElement = z.object({
'enabled': z.boolean(),
'features': z.union([CustomerSessionResourceComponentsResourcePaymentElementResourceFeatures])
});

export type CustomerSessionResourceComponentsResourcePaymentElementModel = z.infer<typeof CustomerSessionResourceComponentsResourcePaymentElement>;

export const CustomerSessionResourceComponentsResourcePricingTable = z.object({
'enabled': z.boolean()
});

export type CustomerSessionResourceComponentsResourcePricingTableModel = z.infer<typeof CustomerSessionResourceComponentsResourcePricingTable>;

export const CustomerSessionResourceComponents = z.object({
'buy_button': CustomerSessionResourceComponentsResourceBuyButton,
'customer_sheet': CustomerSessionResourceComponentsResourceCustomerSheet,
'mobile_payment_element': CustomerSessionResourceComponentsResourceMobilePaymentElement,
'payment_element': CustomerSessionResourceComponentsResourcePaymentElement,
'pricing_table': CustomerSessionResourceComponentsResourcePricingTable
});

export type CustomerSessionResourceComponentsModel = z.infer<typeof CustomerSessionResourceComponents>;

export const CustomerSession = z.object({
'client_secret': z.string(),
'components': CustomerSessionResourceComponents.optional(),
'created': z.number().int(),
'customer': z.union([z.string(), z.lazy(() => Customer)]),
'expires_at': z.number().int(),
'livemode': z.boolean(),
'object': z.enum(['customer_session'])
});

export type CustomerSessionModel = z.infer<typeof CustomerSession>;

export const DeletedAccount = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['account'])
});

export type DeletedAccountModel = z.infer<typeof DeletedAccount>;

export const DeletedApplePayDomain = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['apple_pay_domain'])
});

export type DeletedApplePayDomainModel = z.infer<typeof DeletedApplePayDomain>;

export const DeletedCoupon = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['coupon'])
});

export type DeletedCouponModel = z.infer<typeof DeletedCoupon>;

export const DeletedInvoiceitem = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['invoiceitem'])
});

export type DeletedInvoiceitemModel = z.infer<typeof DeletedInvoiceitem>;

export const DeletedPerson = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['person'])
});

export type DeletedPersonModel = z.infer<typeof DeletedPerson>;

export const DeletedProductFeature = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['product_feature'])
});

export type DeletedProductFeatureModel = z.infer<typeof DeletedProductFeature>;

export const DeletedRadarValueList = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['radar.value_list'])
});

export type DeletedRadarValueListModel = z.infer<typeof DeletedRadarValueList>;

export const DeletedRadarValueListItem = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['radar.value_list_item'])
});

export type DeletedRadarValueListItemModel = z.infer<typeof DeletedRadarValueListItem>;

export const DeletedSubscriptionItem = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['subscription_item'])
});

export type DeletedSubscriptionItemModel = z.infer<typeof DeletedSubscriptionItem>;

export const DeletedTerminalConfiguration = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['terminal.configuration'])
});

export type DeletedTerminalConfigurationModel = z.infer<typeof DeletedTerminalConfiguration>;

export const DeletedTerminalLocation = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['terminal.location'])
});

export type DeletedTerminalLocationModel = z.infer<typeof DeletedTerminalLocation>;

export const DeletedTerminalReader = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['terminal.reader'])
});

export type DeletedTerminalReaderModel = z.infer<typeof DeletedTerminalReader>;

export const DeletedTestHelpersTestClock = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['test_helpers.test_clock'])
});

export type DeletedTestHelpersTestClockModel = z.infer<typeof DeletedTestHelpersTestClock>;

export const DeletedWebhookEndpoint = z.object({
'deleted': z.boolean(),
'id': z.string(),
'object': z.enum(['webhook_endpoint'])
});

export type DeletedWebhookEndpointModel = z.infer<typeof DeletedWebhookEndpoint>;

export const EntitlementsFeature = z.object({
'active': z.boolean(),
'id': z.string(),
'livemode': z.boolean(),
'lookup_key': z.string(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['entitlements.feature'])
});

export type EntitlementsFeatureModel = z.infer<typeof EntitlementsFeature>;

export const EntitlementsActiveEntitlement = z.object({
'feature': z.union([z.string(), EntitlementsFeature]),
'id': z.string(),
'livemode': z.boolean(),
'lookup_key': z.string(),
'object': z.enum(['entitlements.active_entitlement'])
});

export type EntitlementsActiveEntitlementModel = z.infer<typeof EntitlementsActiveEntitlement>;

export const EntitlementsActiveEntitlementSummary = z.object({
'customer': z.string(),
'entitlements': z.object({
'data': z.array(EntitlementsActiveEntitlement),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'livemode': z.boolean(),
'object': z.enum(['entitlements.active_entitlement_summary'])
});

export type EntitlementsActiveEntitlementSummaryModel = z.infer<typeof EntitlementsActiveEntitlementSummary>;

export const EntitlementsActiveEntitlementSummaryUpdated = z.object({
'object': EntitlementsActiveEntitlementSummary
});

export type EntitlementsActiveEntitlementSummaryUpdatedModel = z.infer<typeof EntitlementsActiveEntitlementSummaryUpdated>;

export const EphemeralKey = z.object({
'created': z.number().int(),
'expires': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['ephemeral_key']),
'secret': z.string().optional()
});

export type EphemeralKeyModel = z.infer<typeof EphemeralKey>;

export const Error = z.object({
'error': z.lazy(() => ApiErrors)
});

export type ErrorModel = z.infer<typeof Error>;

export const NotificationEventData = z.object({
'object': z.object({}),
'previous_attributes': z.object({}).optional()
});

export type NotificationEventDataModel = z.infer<typeof NotificationEventData>;

export const NotificationEventRequest = z.object({
'id': z.string(),
'idempotency_key': z.string()
});

export type NotificationEventRequestModel = z.infer<typeof NotificationEventRequest>;

export const Event = z.object({
'account': z.string().optional(),
'api_version': z.string(),
'context': z.string().optional(),
'created': z.number().int(),
'data': NotificationEventData,
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['event']),
'pending_webhooks': z.number().int(),
'request': z.union([NotificationEventRequest]),
'type': z.enum(['account.application.authorized', 'account.application.deauthorized', 'account.external_account.created', 'account.external_account.deleted', 'account.external_account.updated', 'account.updated', 'application_fee.created', 'application_fee.refund.updated', 'application_fee.refunded', 'balance.available', 'balance_settings.updated', 'billing.alert.triggered', 'billing_portal.configuration.created', 'billing_portal.configuration.updated', 'billing_portal.session.created', 'capability.updated', 'cash_balance.funds_available', 'charge.captured', 'charge.dispute.closed', 'charge.dispute.created', 'charge.dispute.funds_reinstated', 'charge.dispute.funds_withdrawn', 'charge.dispute.updated', 'charge.expired', 'charge.failed', 'charge.pending', 'charge.refund.updated', 'charge.refunded', 'charge.succeeded', 'charge.updated', 'checkout.session.async_payment_failed', 'checkout.session.async_payment_succeeded', 'checkout.session.completed', 'checkout.session.expired', 'climate.order.canceled', 'climate.order.created', 'climate.order.delayed', 'climate.order.delivered', 'climate.order.product_substituted', 'climate.product.created', 'climate.product.pricing_updated', 'coupon.created', 'coupon.deleted', 'coupon.updated', 'credit_note.created', 'credit_note.updated', 'credit_note.voided', 'customer.created', 'customer.deleted', 'customer.discount.created', 'customer.discount.deleted', 'customer.discount.updated', 'customer.source.created', 'customer.source.deleted', 'customer.source.expiring', 'customer.source.updated', 'customer.subscription.created', 'customer.subscription.deleted', 'customer.subscription.paused', 'customer.subscription.pending_update_applied', 'customer.subscription.pending_update_expired', 'customer.subscription.resumed', 'customer.subscription.trial_will_end', 'customer.subscription.updated', 'customer.tax_id.created', 'customer.tax_id.deleted', 'customer.tax_id.updated', 'customer.updated', 'customer_cash_balance_transaction.created', 'entitlements.active_entitlement_summary.updated', 'file.created', 'financial_connections.account.account_numbers_updated', 'financial_connections.account.created', 'financial_connections.account.deactivated', 'financial_connections.account.disconnected', 'financial_connections.account.reactivated', 'financial_connections.account.refreshed_balance', 'financial_connections.account.refreshed_ownership', 'financial_connections.account.refreshed_transactions', 'financial_connections.account.upcoming_account_number_expiry', 'identity.verification_session.canceled', 'identity.verification_session.created', 'identity.verification_session.processing', 'identity.verification_session.redacted', 'identity.verification_session.requires_input', 'identity.verification_session.verified', 'invoice.created', 'invoice.deleted', 'invoice.finalization_failed', 'invoice.finalized', 'invoice.marked_uncollectible', 'invoice.overdue', 'invoice.overpaid', 'invoice.paid', 'invoice.payment_action_required', 'invoice.payment_attempt_required', 'invoice.payment_failed', 'invoice.payment_succeeded', 'invoice.sent', 'invoice.upcoming', 'invoice.updated', 'invoice.voided', 'invoice.will_be_due', 'invoice_payment.paid', 'invoiceitem.created', 'invoiceitem.deleted', 'issuing_authorization.created', 'issuing_authorization.request', 'issuing_authorization.updated', 'issuing_card.created', 'issuing_card.updated', 'issuing_cardholder.created', 'issuing_cardholder.updated', 'issuing_dispute.closed', 'issuing_dispute.created', 'issuing_dispute.funds_reinstated', 'issuing_dispute.funds_rescinded', 'issuing_dispute.submitted', 'issuing_dispute.updated', 'issuing_personalization_design.activated', 'issuing_personalization_design.deactivated', 'issuing_personalization_design.rejected', 'issuing_personalization_design.updated', 'issuing_token.created', 'issuing_token.updated', 'issuing_transaction.created', 'issuing_transaction.purchase_details_receipt_updated', 'issuing_transaction.updated', 'mandate.updated', 'payment_intent.amount_capturable_updated', 'payment_intent.canceled', 'payment_intent.created', 'payment_intent.partially_funded', 'payment_intent.payment_failed', 'payment_intent.processing', 'payment_intent.requires_action', 'payment_intent.succeeded', 'payment_link.created', 'payment_link.updated', 'payment_method.attached', 'payment_method.automatically_updated', 'payment_method.detached', 'payment_method.updated', 'payout.canceled', 'payout.created', 'payout.failed', 'payout.paid', 'payout.reconciliation_completed', 'payout.updated', 'person.created', 'person.deleted', 'person.updated', 'plan.created', 'plan.deleted', 'plan.updated', 'price.created', 'price.deleted', 'price.updated', 'product.created', 'product.deleted', 'product.updated', 'promotion_code.created', 'promotion_code.updated', 'quote.accepted', 'quote.canceled', 'quote.created', 'quote.finalized', 'radar.early_fraud_warning.created', 'radar.early_fraud_warning.updated', 'refund.created', 'refund.failed', 'refund.updated', 'reporting.report_run.failed', 'reporting.report_run.succeeded', 'reporting.report_type.updated', 'review.closed', 'review.opened', 'setup_intent.canceled', 'setup_intent.created', 'setup_intent.requires_action', 'setup_intent.setup_failed', 'setup_intent.succeeded', 'sigma.scheduled_query_run.created', 'source.canceled', 'source.chargeable', 'source.failed', 'source.mandate_notification', 'source.refund_attributes_required', 'source.transaction.created', 'source.transaction.updated', 'subscription_schedule.aborted', 'subscription_schedule.canceled', 'subscription_schedule.completed', 'subscription_schedule.created', 'subscription_schedule.expiring', 'subscription_schedule.released', 'subscription_schedule.updated', 'tax.settings.updated', 'tax_rate.created', 'tax_rate.updated', 'terminal.reader.action_failed', 'terminal.reader.action_succeeded', 'terminal.reader.action_updated', 'test_helpers.test_clock.advancing', 'test_helpers.test_clock.created', 'test_helpers.test_clock.deleted', 'test_helpers.test_clock.internal_failure', 'test_helpers.test_clock.ready', 'topup.canceled', 'topup.created', 'topup.failed', 'topup.reversed', 'topup.succeeded', 'transfer.created', 'transfer.reversed', 'transfer.updated', 'treasury.credit_reversal.created', 'treasury.credit_reversal.posted', 'treasury.debit_reversal.completed', 'treasury.debit_reversal.created', 'treasury.debit_reversal.initial_credit_granted', 'treasury.financial_account.closed', 'treasury.financial_account.created', 'treasury.financial_account.features_status_updated', 'treasury.inbound_transfer.canceled', 'treasury.inbound_transfer.created', 'treasury.inbound_transfer.failed', 'treasury.inbound_transfer.succeeded', 'treasury.outbound_payment.canceled', 'treasury.outbound_payment.created', 'treasury.outbound_payment.expected_arrival_date_updated', 'treasury.outbound_payment.failed', 'treasury.outbound_payment.posted', 'treasury.outbound_payment.returned', 'treasury.outbound_payment.tracking_details_updated', 'treasury.outbound_transfer.canceled', 'treasury.outbound_transfer.created', 'treasury.outbound_transfer.expected_arrival_date_updated', 'treasury.outbound_transfer.failed', 'treasury.outbound_transfer.posted', 'treasury.outbound_transfer.returned', 'treasury.outbound_transfer.tracking_details_updated', 'treasury.received_credit.created', 'treasury.received_credit.failed', 'treasury.received_credit.succeeded', 'treasury.received_debit.created'])
});

export type EventModel = z.infer<typeof Event>;

export const ExchangeRate = z.object({
'id': z.string(),
'object': z.enum(['exchange_rate']),
'rates': z.record(z.string(), z.number())
});

export type ExchangeRateModel = z.infer<typeof ExchangeRate>;

export const FileCreated = z.object({
'object': z.lazy(() => File)
});

export type FileCreatedModel = z.infer<typeof FileCreated>;

export const FinancialConnectionsAccountOwner = z.object({
'email': z.string(),
'id': z.string(),
'name': z.string(),
'object': z.enum(['financial_connections.account_owner']),
'ownership': z.string(),
'phone': z.string(),
'raw_address': z.string(),
'refreshed_at': z.number().int()
});

export type FinancialConnectionsAccountOwnerModel = z.infer<typeof FinancialConnectionsAccountOwner>;

export const FinancialConnectionsAccountOwnership = z.object({
'created': z.number().int(),
'id': z.string(),
'object': z.enum(['financial_connections.account_ownership']),
'owners': z.object({
'data': z.array(FinancialConnectionsAccountOwner),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
})
});

export type FinancialConnectionsAccountOwnershipModel = z.infer<typeof FinancialConnectionsAccountOwnership>;

export const FinancialConnectionsAccount = z.object({
'account_holder': z.union([BankConnectionsResourceAccountholder]),
'account_numbers': z.array(BankConnectionsResourceAccountNumberDetails),
'balance': z.union([BankConnectionsResourceBalance]),
'balance_refresh': z.union([BankConnectionsResourceBalanceRefresh]),
'category': z.enum(['cash', 'credit', 'investment', 'other']),
'created': z.number().int(),
'display_name': z.string(),
'id': z.string(),
'institution_name': z.string(),
'last4': z.string(),
'livemode': z.boolean(),
'object': z.enum(['financial_connections.account']),
'ownership': z.union([z.string(), FinancialConnectionsAccountOwnership]),
'ownership_refresh': z.union([BankConnectionsResourceOwnershipRefresh]),
'permissions': z.array(z.enum(['balances', 'ownership', 'payment_method', 'transactions'])),
'status': z.enum(['active', 'disconnected', 'inactive']),
'subcategory': z.enum(['checking', 'credit_card', 'line_of_credit', 'mortgage', 'other', 'savings']),
'subscriptions': z.array(z.enum(['transactions'])),
'supported_payment_method_types': z.array(z.enum(['link', 'us_bank_account'])),
'transaction_refresh': z.union([BankConnectionsResourceTransactionRefresh])
});

export type FinancialConnectionsAccountModel = z.infer<typeof FinancialConnectionsAccount>;

export const FinancialConnectionsAccountAccountNumbersUpdated = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountAccountNumbersUpdatedModel = z.infer<typeof FinancialConnectionsAccountAccountNumbersUpdated>;

export const FinancialConnectionsAccountCreated = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountCreatedModel = z.infer<typeof FinancialConnectionsAccountCreated>;

export const FinancialConnectionsAccountDeactivated = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountDeactivatedModel = z.infer<typeof FinancialConnectionsAccountDeactivated>;

export const FinancialConnectionsAccountDisconnected = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountDisconnectedModel = z.infer<typeof FinancialConnectionsAccountDisconnected>;

export const FinancialConnectionsAccountReactivated = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountReactivatedModel = z.infer<typeof FinancialConnectionsAccountReactivated>;

export const FinancialConnectionsAccountRefreshedBalance = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountRefreshedBalanceModel = z.infer<typeof FinancialConnectionsAccountRefreshedBalance>;

export const FinancialConnectionsAccountRefreshedOwnership = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountRefreshedOwnershipModel = z.infer<typeof FinancialConnectionsAccountRefreshedOwnership>;

export const FinancialConnectionsAccountRefreshedTransactions = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountRefreshedTransactionsModel = z.infer<typeof FinancialConnectionsAccountRefreshedTransactions>;

export const FinancialConnectionsAccountUpcomingAccountNumberExpiry = z.object({
'object': FinancialConnectionsAccount
});

export type FinancialConnectionsAccountUpcomingAccountNumberExpiryModel = z.infer<typeof FinancialConnectionsAccountUpcomingAccountNumberExpiry>;

export const FinancialConnectionsSession = z.object({
'account_holder': z.union([BankConnectionsResourceAccountholder]),
'accounts': z.object({
'data': z.array(FinancialConnectionsAccount),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string().regex(/^\/v1\/financial_connections\/accounts/)
}),
'client_secret': z.string(),
'filters': BankConnectionsResourceLinkAccountSessionFilters.optional(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['financial_connections.session']),
'permissions': z.array(z.enum(['balances', 'ownership', 'payment_method', 'transactions'])),
'prefetch': z.array(z.enum(['balances', 'ownership', 'transactions'])),
'return_url': z.string().optional()
});

export type FinancialConnectionsSessionModel = z.infer<typeof FinancialConnectionsSession>;

export const FinancialConnectionsTransaction = z.object({
'account': z.string(),
'amount': z.number().int(),
'currency': z.string(),
'description': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['financial_connections.transaction']),
'status': z.enum(['pending', 'posted', 'void']),
'status_transitions': BankConnectionsResourceTransactionResourceStatusTransitions,
'transacted_at': z.number().int(),
'transaction_refresh': z.string(),
'updated': z.number().int()
});

export type FinancialConnectionsTransactionModel = z.infer<typeof FinancialConnectionsTransaction>;

export const FinancialReportingFinanceReportRunRunParameters = z.object({
'columns': z.array(z.string()).optional(),
'connected_account': z.string().optional(),
'currency': z.string().optional(),
'interval_end': z.number().int().optional(),
'interval_start': z.number().int().optional(),
'payout': z.string().optional(),
'reporting_category': z.string().optional(),
'timezone': z.string().optional()
});

export type FinancialReportingFinanceReportRunRunParametersModel = z.infer<typeof FinancialReportingFinanceReportRunRunParameters>;

export const ForwardedRequestContext = z.object({
'destination_duration': z.number().int(),
'destination_ip_address': z.string()
});

export type ForwardedRequestContextModel = z.infer<typeof ForwardedRequestContext>;

export const ForwardedRequestHeader = z.object({
'name': z.string(),
'value': z.string()
});

export type ForwardedRequestHeaderModel = z.infer<typeof ForwardedRequestHeader>;

export const ForwardedRequestDetails = z.object({
'body': z.string(),
'headers': z.array(ForwardedRequestHeader),
'http_method': z.enum(['POST'])
});

export type ForwardedRequestDetailsModel = z.infer<typeof ForwardedRequestDetails>;

export const ForwardedResponseDetails = z.object({
'body': z.string(),
'headers': z.array(ForwardedRequestHeader),
'status': z.number().int()
});

export type ForwardedResponseDetailsModel = z.infer<typeof ForwardedResponseDetails>;

export const ForwardingRequest = z.object({
'created': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()).optional(),
'object': z.enum(['forwarding.request']),
'payment_method': z.string(),
'replacements': z.array(z.enum(['card_cvc', 'card_expiry', 'card_number', 'cardholder_name', 'request_signature'])),
'request_context': z.union([ForwardedRequestContext]),
'request_details': z.union([ForwardedRequestDetails]),
'response_details': z.union([ForwardedResponseDetails]),
'url': z.string()
});

export type ForwardingRequestModel = z.infer<typeof ForwardingRequest>;

export const FundingInstructionsBankTransfer = z.object({
'country': z.string(),
'financial_addresses': z.array(FundingInstructionsBankTransferFinancialAddress),
'type': z.enum(['eu_bank_transfer', 'jp_bank_transfer'])
});

export type FundingInstructionsBankTransferModel = z.infer<typeof FundingInstructionsBankTransfer>;

export const FundingInstructions = z.object({
'bank_transfer': FundingInstructionsBankTransfer,
'currency': z.string(),
'funding_type': z.enum(['bank_transfer']),
'livemode': z.boolean(),
'object': z.enum(['funding_instructions'])
});

export type FundingInstructionsModel = z.infer<typeof FundingInstructions>;

export const GelatoDataDocumentReportDateOfBirth = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type GelatoDataDocumentReportDateOfBirthModel = z.infer<typeof GelatoDataDocumentReportDateOfBirth>;

export const GelatoDataDocumentReportExpirationDate = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type GelatoDataDocumentReportExpirationDateModel = z.infer<typeof GelatoDataDocumentReportExpirationDate>;

export const GelatoDataDocumentReportIssuedDate = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type GelatoDataDocumentReportIssuedDateModel = z.infer<typeof GelatoDataDocumentReportIssuedDate>;

export const GelatoDataIdNumberReportDate = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type GelatoDataIdNumberReportDateModel = z.infer<typeof GelatoDataIdNumberReportDate>;

export const GelatoDataVerifiedOutputsDate = z.object({
'day': z.number().int(),
'month': z.number().int(),
'year': z.number().int()
});

export type GelatoDataVerifiedOutputsDateModel = z.infer<typeof GelatoDataVerifiedOutputsDate>;

export const GelatoDocumentReportError = z.object({
'code': z.enum(['document_expired', 'document_type_not_supported', 'document_unverified_other']),
'reason': z.string()
});

export type GelatoDocumentReportErrorModel = z.infer<typeof GelatoDocumentReportError>;

export const GelatoDocumentReport = z.object({
'address': z.union([Address]),
'dob': z.union([GelatoDataDocumentReportDateOfBirth]).optional(),
'error': z.union([GelatoDocumentReportError]),
'expiration_date': z.union([GelatoDataDocumentReportExpirationDate]).optional(),
'files': z.array(z.string()),
'first_name': z.string(),
'issued_date': z.union([GelatoDataDocumentReportIssuedDate]),
'issuing_country': z.string(),
'last_name': z.string(),
'number': z.string().optional(),
'sex': z.enum(['[redacted]', 'female', 'male', 'unknown']).optional(),
'status': z.enum(['unverified', 'verified']),
'type': z.enum(['driving_license', 'id_card', 'passport']),
'unparsed_place_of_birth': z.string().optional(),
'unparsed_sex': z.string().optional()
});

export type GelatoDocumentReportModel = z.infer<typeof GelatoDocumentReport>;

export const GelatoEmailReportError = z.object({
'code': z.enum(['email_unverified_other', 'email_verification_declined']),
'reason': z.string()
});

export type GelatoEmailReportErrorModel = z.infer<typeof GelatoEmailReportError>;

export const GelatoEmailReport = z.object({
'email': z.string(),
'error': z.union([GelatoEmailReportError]),
'status': z.enum(['unverified', 'verified'])
});

export type GelatoEmailReportModel = z.infer<typeof GelatoEmailReport>;

export const GelatoIdNumberReportError = z.object({
'code': z.enum(['id_number_insufficient_document_data', 'id_number_mismatch', 'id_number_unverified_other']),
'reason': z.string()
});

export type GelatoIdNumberReportErrorModel = z.infer<typeof GelatoIdNumberReportError>;

export const GelatoIdNumberReport = z.object({
'dob': z.union([GelatoDataIdNumberReportDate]).optional(),
'error': z.union([GelatoIdNumberReportError]),
'first_name': z.string(),
'id_number': z.string().optional(),
'id_number_type': z.enum(['br_cpf', 'sg_nric', 'us_ssn']),
'last_name': z.string(),
'status': z.enum(['unverified', 'verified'])
});

export type GelatoIdNumberReportModel = z.infer<typeof GelatoIdNumberReport>;

export const GelatoPhoneReportError = z.object({
'code': z.enum(['phone_unverified_other', 'phone_verification_declined']),
'reason': z.string()
});

export type GelatoPhoneReportErrorModel = z.infer<typeof GelatoPhoneReportError>;

export const GelatoPhoneReport = z.object({
'error': z.union([GelatoPhoneReportError]),
'phone': z.string(),
'status': z.enum(['unverified', 'verified'])
});

export type GelatoPhoneReportModel = z.infer<typeof GelatoPhoneReport>;

export const GelatoProvidedDetails = z.object({
'email': z.string().optional(),
'phone': z.string().optional()
});

export type GelatoProvidedDetailsModel = z.infer<typeof GelatoProvidedDetails>;

export const GelatoRelatedPerson = z.object({
'account': z.string(),
'person': z.string()
});

export type GelatoRelatedPersonModel = z.infer<typeof GelatoRelatedPerson>;

export const GelatoReportDocumentOptions = z.object({
'allowed_types': z.array(z.enum(['driving_license', 'id_card', 'passport'])).optional(),
'require_id_number': z.boolean().optional(),
'require_live_capture': z.boolean().optional(),
'require_matching_selfie': z.boolean().optional()
});

export type GelatoReportDocumentOptionsModel = z.infer<typeof GelatoReportDocumentOptions>;

export const GelatoReportIdNumberOptions = z.object({

});

export type GelatoReportIdNumberOptionsModel = z.infer<typeof GelatoReportIdNumberOptions>;

export const GelatoSelfieReportError = z.object({
'code': z.enum(['selfie_document_missing_photo', 'selfie_face_mismatch', 'selfie_manipulated', 'selfie_unverified_other']),
'reason': z.string()
});

export type GelatoSelfieReportErrorModel = z.infer<typeof GelatoSelfieReportError>;

export const GelatoSelfieReport = z.object({
'document': z.string(),
'error': z.union([GelatoSelfieReportError]),
'selfie': z.string(),
'status': z.enum(['unverified', 'verified'])
});

export type GelatoSelfieReportModel = z.infer<typeof GelatoSelfieReport>;

export const GelatoSessionDocumentOptions = z.object({
'allowed_types': z.array(z.enum(['driving_license', 'id_card', 'passport'])).optional(),
'require_id_number': z.boolean().optional(),
'require_live_capture': z.boolean().optional(),
'require_matching_selfie': z.boolean().optional()
});

export type GelatoSessionDocumentOptionsModel = z.infer<typeof GelatoSessionDocumentOptions>;

export const GelatoSessionEmailOptions = z.object({
'require_verification': z.boolean().optional()
});

export type GelatoSessionEmailOptionsModel = z.infer<typeof GelatoSessionEmailOptions>;

export const GelatoSessionIdNumberOptions = z.object({

});

export type GelatoSessionIdNumberOptionsModel = z.infer<typeof GelatoSessionIdNumberOptions>;

export const GelatoSessionLastError = z.object({
'code': z.enum(['abandoned', 'consent_declined', 'country_not_supported', 'device_not_supported', 'document_expired', 'document_type_not_supported', 'document_unverified_other', 'email_unverified_other', 'email_verification_declined', 'id_number_insufficient_document_data', 'id_number_mismatch', 'id_number_unverified_other', 'phone_unverified_other', 'phone_verification_declined', 'selfie_document_missing_photo', 'selfie_face_mismatch', 'selfie_manipulated', 'selfie_unverified_other', 'under_supported_age']),
'reason': z.string()
});

export type GelatoSessionLastErrorModel = z.infer<typeof GelatoSessionLastError>;

export const GelatoSessionMatchingOptions = z.object({
'dob': z.enum(['none', 'similar']).optional(),
'name': z.enum(['none', 'similar']).optional()
});

export type GelatoSessionMatchingOptionsModel = z.infer<typeof GelatoSessionMatchingOptions>;

export const GelatoSessionPhoneOptions = z.object({
'require_verification': z.boolean().optional()
});

export type GelatoSessionPhoneOptionsModel = z.infer<typeof GelatoSessionPhoneOptions>;

export const GelatoVerificationReportOptions = z.object({
'document': GelatoReportDocumentOptions.optional(),
'id_number': GelatoReportIdNumberOptions.optional()
});

export type GelatoVerificationReportOptionsModel = z.infer<typeof GelatoVerificationReportOptions>;

export const GelatoVerificationSessionOptions = z.object({
'document': GelatoSessionDocumentOptions.optional(),
'email': GelatoSessionEmailOptions.optional(),
'id_number': GelatoSessionIdNumberOptions.optional(),
'matching': GelatoSessionMatchingOptions.optional(),
'phone': GelatoSessionPhoneOptions.optional()
});

export type GelatoVerificationSessionOptionsModel = z.infer<typeof GelatoVerificationSessionOptions>;

export const GelatoVerifiedOutputs = z.object({
'address': z.union([Address]),
'dob': z.union([GelatoDataVerifiedOutputsDate]).optional(),
'email': z.string(),
'first_name': z.string(),
'id_number': z.string().optional(),
'id_number_type': z.enum(['br_cpf', 'sg_nric', 'us_ssn']),
'last_name': z.string(),
'phone': z.string(),
'sex': z.enum(['[redacted]', 'female', 'male', 'unknown']).optional(),
'unparsed_place_of_birth': z.string().optional(),
'unparsed_sex': z.string().optional()
});

export type GelatoVerifiedOutputsModel = z.infer<typeof GelatoVerifiedOutputs>;

export const IdentityVerificationReport = z.object({
'client_reference_id': z.string(),
'created': z.number().int(),
'document': GelatoDocumentReport.optional(),
'email': GelatoEmailReport.optional(),
'id': z.string(),
'id_number': GelatoIdNumberReport.optional(),
'livemode': z.boolean(),
'object': z.enum(['identity.verification_report']),
'options': GelatoVerificationReportOptions.optional(),
'phone': GelatoPhoneReport.optional(),
'selfie': GelatoSelfieReport.optional(),
'type': z.enum(['document', 'id_number', 'verification_flow']),
'verification_flow': z.string().optional(),
'verification_session': z.string()
});

export type IdentityVerificationReportModel = z.infer<typeof IdentityVerificationReport>;

export const VerificationSessionRedaction = z.object({
'status': z.enum(['processing', 'redacted'])
});

export type VerificationSessionRedactionModel = z.infer<typeof VerificationSessionRedaction>;

export const IdentityVerificationSession = z.object({
'client_reference_id': z.string(),
'client_secret': z.string(),
'created': z.number().int(),
'id': z.string(),
'last_error': z.union([GelatoSessionLastError]),
'last_verification_report': z.union([z.string(), IdentityVerificationReport]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['identity.verification_session']),
'options': z.union([GelatoVerificationSessionOptions]),
'provided_details': z.union([GelatoProvidedDetails]).optional(),
'redaction': z.union([VerificationSessionRedaction]),
'related_customer': z.string(),
'related_person': GelatoRelatedPerson.optional(),
'status': z.enum(['canceled', 'processing', 'requires_input', 'verified']),
'type': z.enum(['document', 'id_number', 'verification_flow']),
'url': z.string(),
'verification_flow': z.string().optional(),
'verified_outputs': z.union([GelatoVerifiedOutputs]).optional()
});

export type IdentityVerificationSessionModel = z.infer<typeof IdentityVerificationSession>;

export const IdentityVerificationSessionCanceled = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionCanceledModel = z.infer<typeof IdentityVerificationSessionCanceled>;

export const IdentityVerificationSessionCreated = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionCreatedModel = z.infer<typeof IdentityVerificationSessionCreated>;

export const IdentityVerificationSessionProcessing = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionProcessingModel = z.infer<typeof IdentityVerificationSessionProcessing>;

export const IdentityVerificationSessionRedacted = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionRedactedModel = z.infer<typeof IdentityVerificationSessionRedacted>;

export const IdentityVerificationSessionRequiresInput = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionRequiresInputModel = z.infer<typeof IdentityVerificationSessionRequiresInput>;

export const IdentityVerificationSessionVerified = z.object({
'object': IdentityVerificationSession
});

export type IdentityVerificationSessionVerifiedModel = z.infer<typeof IdentityVerificationSessionVerified>;

export const TreasurySharedResourceBillingDetails = z.object({
'address': Address,
'email': z.string(),
'name': z.string()
});

export type TreasurySharedResourceBillingDetailsModel = z.infer<typeof TreasurySharedResourceBillingDetails>;

export const InboundTransfersPaymentMethodDetailsUsBankAccount = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]).optional(),
'network': z.enum(['ach']),
'routing_number': z.string()
});

export type InboundTransfersPaymentMethodDetailsUsBankAccountModel = z.infer<typeof InboundTransfersPaymentMethodDetailsUsBankAccount>;

export const InboundTransfers = z.object({
'billing_details': TreasurySharedResourceBillingDetails,
'type': z.enum(['us_bank_account']),
'us_bank_account': InboundTransfersPaymentMethodDetailsUsBankAccount.optional()
});

export type InboundTransfersModel = z.infer<typeof InboundTransfers>;

export const InvoiceCreated = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceCreatedModel = z.infer<typeof InvoiceCreated>;

export const InvoiceDeleted = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceDeletedModel = z.infer<typeof InvoiceDeleted>;

export const InvoiceFinalizationFailed = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceFinalizationFailedModel = z.infer<typeof InvoiceFinalizationFailed>;

export const InvoiceFinalized = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceFinalizedModel = z.infer<typeof InvoiceFinalized>;

export const InvoiceMarkedUncollectible = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceMarkedUncollectibleModel = z.infer<typeof InvoiceMarkedUncollectible>;

export const InvoiceOverdue = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceOverdueModel = z.infer<typeof InvoiceOverdue>;

export const InvoiceOverpaid = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceOverpaidModel = z.infer<typeof InvoiceOverpaid>;

export const InvoicePaid = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoicePaidModel = z.infer<typeof InvoicePaid>;

export const InvoicePaymentActionRequired = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoicePaymentActionRequiredModel = z.infer<typeof InvoicePaymentActionRequired>;

export const InvoicePaymentAttemptRequired = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoicePaymentAttemptRequiredModel = z.infer<typeof InvoicePaymentAttemptRequired>;

export const InvoicePaymentFailed = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoicePaymentFailedModel = z.infer<typeof InvoicePaymentFailed>;

export const InvoicePaymentSucceeded = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoicePaymentSucceededModel = z.infer<typeof InvoicePaymentSucceeded>;

export const InvoiceSent = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceSentModel = z.infer<typeof InvoiceSent>;

export const InvoiceUpcoming = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceUpcomingModel = z.infer<typeof InvoiceUpcoming>;

export const InvoiceUpdated = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceUpdatedModel = z.infer<typeof InvoiceUpdated>;

export const InvoiceVoided = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceVoidedModel = z.infer<typeof InvoiceVoided>;

export const InvoiceWillBeDue = z.object({
'object': z.lazy(() => Invoice)
});

export type InvoiceWillBeDueModel = z.infer<typeof InvoiceWillBeDue>;

export const InvoicePaymentPaid = z.object({
'object': z.lazy(() => InvoicePayment)
});

export type InvoicePaymentPaidModel = z.infer<typeof InvoicePaymentPaid>;

export const InvoiceRenderingTemplate = z.object({
'created': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'nickname': z.string(),
'object': z.enum(['invoice_rendering_template']),
'status': z.enum(['active', 'archived']),
'version': z.number().int()
});

export type InvoiceRenderingTemplateModel = z.infer<typeof InvoiceRenderingTemplate>;

export const InvoiceSettingQuoteSetting = z.object({
'days_until_due': z.number().int(),
'issuer': z.lazy(() => ConnectAccountReference)
});

export type InvoiceSettingQuoteSettingModel = z.infer<typeof InvoiceSettingQuoteSetting>;

export const ProrationDetails = z.object({
'discount_amounts': z.array(DiscountsResourceDiscountAmount)
});

export type ProrationDetailsModel = z.infer<typeof ProrationDetails>;

export const Invoiceitem = z.object({
'amount': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'date': z.number().int(),
'description': z.string(),
'discountable': z.boolean(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount)])),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice)]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'net_amount': z.number().int().optional(),
'object': z.enum(['invoiceitem']),
'parent': z.union([BillingBillResourceInvoiceItemParentsInvoiceItemParent]),
'period': InvoiceLineItemPeriod,
'pricing': z.union([BillingBillResourceInvoicingPricingPricing]),
'proration': z.boolean(),
'proration_details': ProrationDetails.optional(),
'quantity': z.number().int(),
'tax_rates': z.array(TaxRate),
'test_clock': z.union([z.string(), TestHelpersTestClock])
});

export type InvoiceitemModel = z.infer<typeof Invoiceitem>;

export const InvoiceitemCreated = z.object({
'object': Invoiceitem
});

export type InvoiceitemCreatedModel = z.infer<typeof InvoiceitemCreated>;

export const InvoiceitemDeleted = z.object({
'object': Invoiceitem
});

export type InvoiceitemDeletedModel = z.infer<typeof InvoiceitemDeleted>;

export const IssuingAuthorizationCreated = z.object({
'object': z.lazy(() => IssuingAuthorization)
});

export type IssuingAuthorizationCreatedModel = z.infer<typeof IssuingAuthorizationCreated>;

export const IssuingAuthorizationRequest = z.object({
'object': z.lazy(() => IssuingAuthorization)
});

export type IssuingAuthorizationRequestModel = z.infer<typeof IssuingAuthorizationRequest>;

export const IssuingAuthorizationUpdated = z.object({
'object': z.lazy(() => IssuingAuthorization)
});

export type IssuingAuthorizationUpdatedModel = z.infer<typeof IssuingAuthorizationUpdated>;

export const IssuingCardCreated = z.object({
'object': z.lazy(() => IssuingCard)
});

export type IssuingCardCreatedModel = z.infer<typeof IssuingCardCreated>;

export const IssuingCardUpdated = z.object({
'object': z.lazy(() => IssuingCard)
});

export type IssuingCardUpdatedModel = z.infer<typeof IssuingCardUpdated>;

export const IssuingCardholderCreated = z.object({
'object': IssuingCardholder
});

export type IssuingCardholderCreatedModel = z.infer<typeof IssuingCardholderCreated>;

export const IssuingCardholderUpdated = z.object({
'object': IssuingCardholder
});

export type IssuingCardholderUpdatedModel = z.infer<typeof IssuingCardholderUpdated>;

export const IssuingDisputeClosed = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeClosedModel = z.infer<typeof IssuingDisputeClosed>;

export const IssuingDisputeCreated = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeCreatedModel = z.infer<typeof IssuingDisputeCreated>;

export const IssuingDisputeFundsReinstated = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeFundsReinstatedModel = z.infer<typeof IssuingDisputeFundsReinstated>;

export const IssuingDisputeFundsRescinded = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeFundsRescindedModel = z.infer<typeof IssuingDisputeFundsRescinded>;

export const IssuingDisputeSubmitted = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeSubmittedModel = z.infer<typeof IssuingDisputeSubmitted>;

export const IssuingDisputeUpdated = z.object({
'object': z.lazy(() => IssuingDispute)
});

export type IssuingDisputeUpdatedModel = z.infer<typeof IssuingDisputeUpdated>;

export const IssuingPersonalizationDesignActivated = z.object({
'object': IssuingPersonalizationDesign
});

export type IssuingPersonalizationDesignActivatedModel = z.infer<typeof IssuingPersonalizationDesignActivated>;

export const IssuingPersonalizationDesignDeactivated = z.object({
'object': IssuingPersonalizationDesign
});

export type IssuingPersonalizationDesignDeactivatedModel = z.infer<typeof IssuingPersonalizationDesignDeactivated>;

export const IssuingPersonalizationDesignRejected = z.object({
'object': IssuingPersonalizationDesign
});

export type IssuingPersonalizationDesignRejectedModel = z.infer<typeof IssuingPersonalizationDesignRejected>;

export const IssuingPersonalizationDesignUpdated = z.object({
'object': IssuingPersonalizationDesign
});

export type IssuingPersonalizationDesignUpdatedModel = z.infer<typeof IssuingPersonalizationDesignUpdated>;

export const IssuingTokenCreated = z.object({
'object': IssuingToken
});

export type IssuingTokenCreatedModel = z.infer<typeof IssuingTokenCreated>;

export const IssuingTokenUpdated = z.object({
'object': IssuingToken
});

export type IssuingTokenUpdatedModel = z.infer<typeof IssuingTokenUpdated>;

export const IssuingTransactionCreated = z.object({
'object': z.lazy(() => IssuingTransaction)
});

export type IssuingTransactionCreatedModel = z.infer<typeof IssuingTransactionCreated>;

export const IssuingTransactionPurchaseDetailsReceiptUpdated = z.object({
'object': z.lazy(() => IssuingTransaction)
});

export type IssuingTransactionPurchaseDetailsReceiptUpdatedModel = z.infer<typeof IssuingTransactionPurchaseDetailsReceiptUpdated>;

export const IssuingTransactionUpdated = z.object({
'object': z.lazy(() => IssuingTransaction)
});

export type IssuingTransactionUpdatedModel = z.infer<typeof IssuingTransactionUpdated>;

export const LoginLink = z.object({
'created': z.number().int(),
'object': z.enum(['login_link']),
'url': z.string()
});

export type LoginLinkModel = z.infer<typeof LoginLink>;

export const MandateUpdated = z.object({
'object': z.lazy(() => Mandate)
});

export type MandateUpdatedModel = z.infer<typeof MandateUpdated>;

export const OutboundPaymentsPaymentMethodDetailsFinancialAccount = z.object({
'id': z.string(),
'network': z.enum(['stripe'])
});

export type OutboundPaymentsPaymentMethodDetailsFinancialAccountModel = z.infer<typeof OutboundPaymentsPaymentMethodDetailsFinancialAccount>;

export const OutboundPaymentsPaymentMethodDetailsUsBankAccount = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]).optional(),
'network': z.enum(['ach', 'us_domestic_wire']),
'routing_number': z.string()
});

export type OutboundPaymentsPaymentMethodDetailsUsBankAccountModel = z.infer<typeof OutboundPaymentsPaymentMethodDetailsUsBankAccount>;

export const OutboundPaymentsPaymentMethodDetails = z.object({
'billing_details': TreasurySharedResourceBillingDetails,
'financial_account': OutboundPaymentsPaymentMethodDetailsFinancialAccount.optional(),
'type': z.enum(['financial_account', 'us_bank_account']),
'us_bank_account': OutboundPaymentsPaymentMethodDetailsUsBankAccount.optional()
});

export type OutboundPaymentsPaymentMethodDetailsModel = z.infer<typeof OutboundPaymentsPaymentMethodDetails>;

export const OutboundTransfersPaymentMethodDetailsFinancialAccount = z.object({
'id': z.string(),
'network': z.enum(['stripe'])
});

export type OutboundTransfersPaymentMethodDetailsFinancialAccountModel = z.infer<typeof OutboundTransfersPaymentMethodDetailsFinancialAccount>;

export const OutboundTransfersPaymentMethodDetailsUsBankAccount = z.object({
'account_holder_type': z.enum(['company', 'individual']),
'account_type': z.enum(['checking', 'savings']),
'bank_name': z.string(),
'fingerprint': z.string(),
'last4': z.string(),
'mandate': z.union([z.string(), z.lazy(() => Mandate)]).optional(),
'network': z.enum(['ach', 'us_domestic_wire']),
'routing_number': z.string()
});

export type OutboundTransfersPaymentMethodDetailsUsBankAccountModel = z.infer<typeof OutboundTransfersPaymentMethodDetailsUsBankAccount>;

export const OutboundTransfersPaymentMethodDetails = z.object({
'billing_details': TreasurySharedResourceBillingDetails,
'financial_account': OutboundTransfersPaymentMethodDetailsFinancialAccount.optional(),
'type': z.enum(['financial_account', 'us_bank_account']),
'us_bank_account': OutboundTransfersPaymentMethodDetailsUsBankAccount.optional()
});

export type OutboundTransfersPaymentMethodDetailsModel = z.infer<typeof OutboundTransfersPaymentMethodDetails>;

export const PaymentAttemptRecord = z.object({
'amount': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_authorized': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_canceled': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_failed': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_guaranteed': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_refunded': PaymentsPrimitivesPaymentRecordsResourceAmount,
'amount_requested': PaymentsPrimitivesPaymentRecordsResourceAmount,
'application': z.string(),
'created': z.number().int(),
'customer_details': z.union([PaymentsPrimitivesPaymentRecordsResourceCustomerDetails]),
'customer_presence': z.enum(['off_session', 'on_session']),
'description': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['payment_attempt_record']),
'payment_method_details': z.union([PaymentsPrimitivesPaymentRecordsResourcePaymentMethodDetails]),
'payment_record': z.string(),
'processor_details': PaymentsPrimitivesPaymentRecordsResourceProcessorDetails,
'reported_by': z.enum(['self', 'stripe']),
'shipping_details': z.union([PaymentsPrimitivesPaymentRecordsResourceShippingDetails])
});

export type PaymentAttemptRecordModel = z.infer<typeof PaymentAttemptRecord>;

export const PaymentFlowsAmountDetailsClient = z.object({
'tip': PaymentFlowsAmountDetailsClientResourceTip.optional()
});

export type PaymentFlowsAmountDetailsClientModel = z.infer<typeof PaymentFlowsAmountDetailsClient>;

export const PaymentFlowsInstallmentOptions = z.object({
'enabled': z.boolean(),
'plan': PaymentMethodDetailsCardInstallmentsPlan.optional()
});

export type PaymentFlowsInstallmentOptionsModel = z.infer<typeof PaymentFlowsInstallmentOptions>;

export const PaymentIntentAmountCapturableUpdated = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentAmountCapturableUpdatedModel = z.infer<typeof PaymentIntentAmountCapturableUpdated>;

export const PaymentIntentCanceled = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentCanceledModel = z.infer<typeof PaymentIntentCanceled>;

export const PaymentIntentCreated = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentCreatedModel = z.infer<typeof PaymentIntentCreated>;

export const PaymentIntentPartiallyFunded = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentPartiallyFundedModel = z.infer<typeof PaymentIntentPartiallyFunded>;

export const PaymentIntentPaymentFailed = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentPaymentFailedModel = z.infer<typeof PaymentIntentPaymentFailed>;

export const PaymentIntentProcessing = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentProcessingModel = z.infer<typeof PaymentIntentProcessing>;

export const PaymentIntentRequiresAction = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentRequiresActionModel = z.infer<typeof PaymentIntentRequiresAction>;

export const PaymentIntentSucceeded = z.object({
'object': z.lazy(() => PaymentIntent)
});

export type PaymentIntentSucceededModel = z.infer<typeof PaymentIntentSucceeded>;

export const PaymentIntentTypeSpecificPaymentMethodOptionsClient = z.object({
'capture_method': z.enum(['manual', 'manual_preferred']).optional(),
'installments': PaymentFlowsInstallmentOptions.optional(),
'request_incremental_authorization_support': z.boolean().optional(),
'require_cvc_recollection': z.boolean().optional(),
'routing': PaymentMethodOptionsCardPresentRouting.optional(),
'setup_future_usage': z.enum(['none', 'off_session', 'on_session']).optional(),
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type PaymentIntentTypeSpecificPaymentMethodOptionsClientModel = z.infer<typeof PaymentIntentTypeSpecificPaymentMethodOptionsClient>;

export const PaymentLinkCreated = z.object({
'object': PaymentLink
});

export type PaymentLinkCreatedModel = z.infer<typeof PaymentLinkCreated>;

export const PaymentLinkUpdated = z.object({
'object': PaymentLink
});

export type PaymentLinkUpdatedModel = z.infer<typeof PaymentLinkUpdated>;

export const PaymentMethodAttached = z.object({
'object': z.lazy(() => PaymentMethod)
});

export type PaymentMethodAttachedModel = z.infer<typeof PaymentMethodAttached>;

export const PaymentMethodAutomaticallyUpdated = z.object({
'object': z.lazy(() => PaymentMethod)
});

export type PaymentMethodAutomaticallyUpdatedModel = z.infer<typeof PaymentMethodAutomaticallyUpdated>;

export const PaymentMethodDetached = z.object({
'object': z.lazy(() => PaymentMethod)
});

export type PaymentMethodDetachedModel = z.infer<typeof PaymentMethodDetached>;

export const PaymentMethodUpdated = z.object({
'object': z.lazy(() => PaymentMethod)
});

export type PaymentMethodUpdatedModel = z.infer<typeof PaymentMethodUpdated>;

export const PaymentMethodConfigResourceDisplayPreference = z.object({
'overridable': z.boolean(),
'preference': z.enum(['none', 'off', 'on']),
'value': z.enum(['off', 'on'])
});

export type PaymentMethodConfigResourceDisplayPreferenceModel = z.infer<typeof PaymentMethodConfigResourceDisplayPreference>;

export const PaymentMethodConfigResourcePaymentMethodProperties = z.object({
'available': z.boolean(),
'display_preference': PaymentMethodConfigResourceDisplayPreference
});

export type PaymentMethodConfigResourcePaymentMethodPropertiesModel = z.infer<typeof PaymentMethodConfigResourcePaymentMethodProperties>;

export const PaymentMethodConfiguration = z.object({
'acss_debit': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'active': z.boolean(),
'affirm': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'afterpay_clearpay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'alipay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'alma': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'amazon_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'apple_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'application': z.string(),
'au_becs_debit': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'bacs_debit': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'bancontact': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'billie': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'blik': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'boleto': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'card': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'cartes_bancaires': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'cashapp': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'crypto': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'customer_balance': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'eps': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'fpx': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'giropay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'google_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'grabpay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'id': z.string(),
'ideal': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'is_default': z.boolean(),
'jcb': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'kakao_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'klarna': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'konbini': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'kr_card': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'link': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'livemode': z.boolean(),
'mb_way': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'mobilepay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'multibanco': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'name': z.string(),
'naver_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'nz_bank_account': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'object': z.enum(['payment_method_configuration']),
'oxxo': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'p24': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'parent': z.string(),
'pay_by_bank': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'payco': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'paynow': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'paypal': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'pix': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'promptpay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'revolut_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'samsung_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'satispay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'sepa_debit': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'sofort': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'swish': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'twint': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'us_bank_account': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'wechat_pay': PaymentMethodConfigResourcePaymentMethodProperties.optional(),
'zip': PaymentMethodConfigResourcePaymentMethodProperties.optional()
});

export type PaymentMethodConfigurationModel = z.infer<typeof PaymentMethodConfiguration>;

export const PaymentMethodDomainResourcePaymentMethodStatusDetails = z.object({
'error_message': z.string()
});

export type PaymentMethodDomainResourcePaymentMethodStatusDetailsModel = z.infer<typeof PaymentMethodDomainResourcePaymentMethodStatusDetails>;

export const PaymentMethodDomainResourcePaymentMethodStatus = z.object({
'status': z.enum(['active', 'inactive']),
'status_details': PaymentMethodDomainResourcePaymentMethodStatusDetails.optional()
});

export type PaymentMethodDomainResourcePaymentMethodStatusModel = z.infer<typeof PaymentMethodDomainResourcePaymentMethodStatus>;

export const PaymentMethodDomain = z.object({
'amazon_pay': PaymentMethodDomainResourcePaymentMethodStatus,
'apple_pay': PaymentMethodDomainResourcePaymentMethodStatus,
'created': z.number().int(),
'domain_name': z.string(),
'enabled': z.boolean(),
'google_pay': PaymentMethodDomainResourcePaymentMethodStatus,
'id': z.string(),
'klarna': PaymentMethodDomainResourcePaymentMethodStatus,
'link': PaymentMethodDomainResourcePaymentMethodStatus,
'livemode': z.boolean(),
'object': z.enum(['payment_method_domain']),
'paypal': PaymentMethodDomainResourcePaymentMethodStatus
});

export type PaymentMethodDomainModel = z.infer<typeof PaymentMethodDomain>;

export const PayoutCanceled = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutCanceledModel = z.infer<typeof PayoutCanceled>;

export const PayoutCreated = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutCreatedModel = z.infer<typeof PayoutCreated>;

export const PayoutFailed = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutFailedModel = z.infer<typeof PayoutFailed>;

export const PayoutPaid = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutPaidModel = z.infer<typeof PayoutPaid>;

export const PayoutReconciliationCompleted = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutReconciliationCompletedModel = z.infer<typeof PayoutReconciliationCompleted>;

export const PayoutUpdated = z.object({
'object': z.lazy(() => Payout)
});

export type PayoutUpdatedModel = z.infer<typeof PayoutUpdated>;

export const PersonCreated = z.object({
'object': Person
});

export type PersonCreatedModel = z.infer<typeof PersonCreated>;

export const PersonDeleted = z.object({
'object': Person
});

export type PersonDeletedModel = z.infer<typeof PersonDeleted>;

export const PersonUpdated = z.object({
'object': Person
});

export type PersonUpdatedModel = z.infer<typeof PersonUpdated>;

export const PlanCreated = z.object({
'object': z.lazy(() => Plan)
});

export type PlanCreatedModel = z.infer<typeof PlanCreated>;

export const PlanDeleted = z.object({
'object': z.lazy(() => Plan)
});

export type PlanDeletedModel = z.infer<typeof PlanDeleted>;

export const PlanUpdated = z.object({
'object': z.lazy(() => Plan)
});

export type PlanUpdatedModel = z.infer<typeof PlanUpdated>;

export const PriceCreated = z.object({
'object': z.lazy(() => Price)
});

export type PriceCreatedModel = z.infer<typeof PriceCreated>;

export const PriceDeleted = z.object({
'object': z.lazy(() => Price)
});

export type PriceDeletedModel = z.infer<typeof PriceDeleted>;

export const PriceUpdated = z.object({
'object': z.lazy(() => Price)
});

export type PriceUpdatedModel = z.infer<typeof PriceUpdated>;

export const ProductCreated = z.object({
'object': z.lazy(() => Product)
});

export type ProductCreatedModel = z.infer<typeof ProductCreated>;

export const ProductDeleted = z.object({
'object': z.lazy(() => Product)
});

export type ProductDeletedModel = z.infer<typeof ProductDeleted>;

export const ProductUpdated = z.object({
'object': z.lazy(() => Product)
});

export type ProductUpdatedModel = z.infer<typeof ProductUpdated>;

export const ProductFeature = z.object({
'entitlement_feature': EntitlementsFeature,
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['product_feature'])
});

export type ProductFeatureModel = z.infer<typeof ProductFeature>;

export const PromotionCodeCreated = z.object({
'object': z.lazy(() => PromotionCode)
});

export type PromotionCodeCreatedModel = z.infer<typeof PromotionCodeCreated>;

export const PromotionCodeUpdated = z.object({
'object': z.lazy(() => PromotionCode)
});

export type PromotionCodeUpdatedModel = z.infer<typeof PromotionCodeUpdated>;

export const QuotesResourceAutomaticTax = z.object({
'enabled': z.boolean(),
'liability': z.union([z.lazy(() => ConnectAccountReference)]),
'provider': z.string(),
'status': z.enum(['complete', 'failed', 'requires_location_inputs'])
});

export type QuotesResourceAutomaticTaxModel = z.infer<typeof QuotesResourceAutomaticTax>;

export const QuotesResourceTotalDetailsResourceBreakdown = z.object({
'discounts': z.array(LineItemsDiscountAmount),
'taxes': z.array(LineItemsTaxAmount)
});

export type QuotesResourceTotalDetailsResourceBreakdownModel = z.infer<typeof QuotesResourceTotalDetailsResourceBreakdown>;

export const QuotesResourceTotalDetails = z.object({
'amount_discount': z.number().int(),
'amount_shipping': z.number().int(),
'amount_tax': z.number().int(),
'breakdown': QuotesResourceTotalDetailsResourceBreakdown.optional()
});

export type QuotesResourceTotalDetailsModel = z.infer<typeof QuotesResourceTotalDetails>;

export const QuotesResourceRecurring = z.object({
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'interval': z.enum(['day', 'month', 'week', 'year']),
'interval_count': z.number().int(),
'total_details': QuotesResourceTotalDetails
});

export type QuotesResourceRecurringModel = z.infer<typeof QuotesResourceRecurring>;

export const QuotesResourceUpfront = z.object({
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'line_items': z.object({
'data': z.array(Item),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'total_details': QuotesResourceTotalDetails
});

export type QuotesResourceUpfrontModel = z.infer<typeof QuotesResourceUpfront>;

export const QuotesResourceComputed = z.object({
'recurring': z.union([QuotesResourceRecurring]),
'upfront': QuotesResourceUpfront
});

export type QuotesResourceComputedModel = z.infer<typeof QuotesResourceComputed>;

export const QuotesResourceFromQuote: z.ZodType<QuotesResourceFromQuoteModel> = z.object({
'is_revision': z.boolean(),
'quote': z.union([z.string(), z.lazy(() => Quote)])
});

export const QuotesResourceStatusTransitions = z.object({
'accepted_at': z.number().int(),
'canceled_at': z.number().int(),
'finalized_at': z.number().int()
});

export type QuotesResourceStatusTransitionsModel = z.infer<typeof QuotesResourceStatusTransitions>;

export const QuotesResourceSubscriptionDataBillingMode = z.object({
'flexible': SubscriptionsResourceBillingModeFlexible.optional(),
'type': z.enum(['classic', 'flexible'])
});

export type QuotesResourceSubscriptionDataBillingModeModel = z.infer<typeof QuotesResourceSubscriptionDataBillingMode>;

export const QuotesResourceSubscriptionDataSubscriptionData = z.object({
'billing_mode': QuotesResourceSubscriptionDataBillingMode,
'description': z.string(),
'effective_date': z.number().int(),
'metadata': z.record(z.string(), z.string()),
'trial_period_days': z.number().int()
});

export type QuotesResourceSubscriptionDataSubscriptionDataModel = z.infer<typeof QuotesResourceSubscriptionDataSubscriptionData>;

export const QuotesResourceTransferData = z.object({
'amount': z.number().int(),
'amount_percent': z.number(),
'destination': z.union([z.string(), z.lazy(() => Account)])
});

export type QuotesResourceTransferDataModel = z.infer<typeof QuotesResourceTransferData>;

export const Quote: z.ZodType<QuoteModel> = z.object({
'amount_subtotal': z.number().int(),
'amount_total': z.number().int(),
'application': z.union([z.string(), Application, DeletedApplication]),
'application_fee_amount': z.number().int(),
'application_fee_percent': z.number(),
'automatic_tax': QuotesResourceAutomaticTax,
'collection_method': z.enum(['charge_automatically', 'send_invoice']),
'computed': QuotesResourceComputed,
'created': z.number().int(),
'currency': z.string(),
'customer': z.union([z.string(), z.lazy(() => Customer), DeletedCustomer]),
'default_tax_rates': z.array(z.union([z.string(), TaxRate])).optional(),
'description': z.string(),
'discounts': z.array(z.union([z.string(), z.lazy(() => Discount)])),
'expires_at': z.number().int(),
'footer': z.string(),
'from_quote': z.union([z.lazy(() => QuotesResourceFromQuote)]),
'header': z.string(),
'id': z.string(),
'invoice': z.union([z.string(), z.lazy(() => Invoice), DeletedInvoice]),
'invoice_settings': InvoiceSettingQuoteSetting,
'line_items': z.object({
'data': z.array(Item),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}).optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'number': z.string(),
'object': z.enum(['quote']),
'on_behalf_of': z.union([z.string(), z.lazy(() => Account)]),
'status': z.enum(['accepted', 'canceled', 'draft', 'open']),
'status_transitions': QuotesResourceStatusTransitions,
'subscription': z.union([z.string(), z.lazy(() => Subscription)]),
'subscription_data': QuotesResourceSubscriptionDataSubscriptionData,
'subscription_schedule': z.union([z.string(), z.lazy(() => SubscriptionSchedule)]),
'test_clock': z.union([z.string(), TestHelpersTestClock]),
'total_details': QuotesResourceTotalDetails,
'transfer_data': z.union([QuotesResourceTransferData])
});

export const QuoteAccepted = z.object({
'object': z.lazy(() => Quote)
});

export type QuoteAcceptedModel = z.infer<typeof QuoteAccepted>;

export const QuoteCanceled = z.object({
'object': z.lazy(() => Quote)
});

export type QuoteCanceledModel = z.infer<typeof QuoteCanceled>;

export const QuoteCreated = z.object({
'object': z.lazy(() => Quote)
});

export type QuoteCreatedModel = z.infer<typeof QuoteCreated>;

export const QuoteFinalized = z.object({
'object': z.lazy(() => Quote)
});

export type QuoteFinalizedModel = z.infer<typeof QuoteFinalized>;

export const RadarEarlyFraudWarning = z.object({
'actionable': z.boolean(),
'charge': z.union([z.string(), z.lazy(() => Charge)]),
'created': z.number().int(),
'fraud_type': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['radar.early_fraud_warning']),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]).optional()
});

export type RadarEarlyFraudWarningModel = z.infer<typeof RadarEarlyFraudWarning>;

export const RadarEarlyFraudWarningCreated = z.object({
'object': RadarEarlyFraudWarning
});

export type RadarEarlyFraudWarningCreatedModel = z.infer<typeof RadarEarlyFraudWarningCreated>;

export const RadarEarlyFraudWarningUpdated = z.object({
'object': RadarEarlyFraudWarning
});

export type RadarEarlyFraudWarningUpdatedModel = z.infer<typeof RadarEarlyFraudWarningUpdated>;

export const RadarValueListItem = z.object({
'created': z.number().int(),
'created_by': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['radar.value_list_item']),
'value': z.string(),
'value_list': z.string()
});

export type RadarValueListItemModel = z.infer<typeof RadarValueListItem>;

export const RadarValueList = z.object({
'alias': z.string(),
'created': z.number().int(),
'created_by': z.string(),
'id': z.string(),
'item_type': z.enum(['card_bin', 'card_fingerprint', 'case_sensitive_string', 'country', 'customer_id', 'email', 'ip_address', 'sepa_debit_fingerprint', 'string', 'us_bank_account_fingerprint']),
'list_items': z.object({
'data': z.array(RadarValueListItem),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string()
}),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'name': z.string(),
'object': z.enum(['radar.value_list'])
});

export type RadarValueListModel = z.infer<typeof RadarValueList>;

export const ReceivedPaymentMethodDetailsFinancialAccount = z.object({
'id': z.string(),
'network': z.enum(['stripe'])
});

export type ReceivedPaymentMethodDetailsFinancialAccountModel = z.infer<typeof ReceivedPaymentMethodDetailsFinancialAccount>;

export const RefundCreated = z.object({
'object': z.lazy(() => Refund)
});

export type RefundCreatedModel = z.infer<typeof RefundCreated>;

export const RefundFailed = z.object({
'object': z.lazy(() => Refund)
});

export type RefundFailedModel = z.infer<typeof RefundFailed>;

export const RefundUpdated = z.object({
'object': z.lazy(() => Refund)
});

export type RefundUpdatedModel = z.infer<typeof RefundUpdated>;

export const ReportingReportRun = z.object({
'created': z.number().int(),
'error': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['reporting.report_run']),
'parameters': FinancialReportingFinanceReportRunRunParameters,
'report_type': z.string(),
'result': z.union([z.lazy(() => File)]),
'status': z.string(),
'succeeded_at': z.number().int()
});

export type ReportingReportRunModel = z.infer<typeof ReportingReportRun>;

export const ReportingReportRunFailed = z.object({
'object': ReportingReportRun
});

export type ReportingReportRunFailedModel = z.infer<typeof ReportingReportRunFailed>;

export const ReportingReportRunSucceeded = z.object({
'object': ReportingReportRun
});

export type ReportingReportRunSucceededModel = z.infer<typeof ReportingReportRunSucceeded>;

export const ReportingReportType = z.object({
'data_available_end': z.number().int(),
'data_available_start': z.number().int(),
'default_columns': z.array(z.string()),
'id': z.string(),
'livemode': z.boolean(),
'name': z.string(),
'object': z.enum(['reporting.report_type']),
'updated': z.number().int(),
'version': z.number().int()
});

export type ReportingReportTypeModel = z.infer<typeof ReportingReportType>;

export const ReportingReportTypeUpdated = z.object({
'object': ReportingReportType
});

export type ReportingReportTypeUpdatedModel = z.infer<typeof ReportingReportTypeUpdated>;

export const ReviewClosed = z.object({
'object': z.lazy(() => Review)
});

export type ReviewClosedModel = z.infer<typeof ReviewClosed>;

export const ReviewOpened = z.object({
'object': z.lazy(() => Review)
});

export type ReviewOpenedModel = z.infer<typeof ReviewOpened>;

export const SigmaScheduledQueryRunError = z.object({
'message': z.string()
});

export type SigmaScheduledQueryRunErrorModel = z.infer<typeof SigmaScheduledQueryRunError>;

export const ScheduledQueryRun = z.object({
'created': z.number().int(),
'data_load_time': z.number().int(),
'error': SigmaScheduledQueryRunError.optional(),
'file': z.union([z.lazy(() => File)]),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['scheduled_query_run']),
'result_available_until': z.number().int(),
'sql': z.string(),
'status': z.string(),
'title': z.string()
});

export type ScheduledQueryRunModel = z.infer<typeof ScheduledQueryRun>;

export const SetupIntentCanceled = z.object({
'object': z.lazy(() => SetupIntent)
});

export type SetupIntentCanceledModel = z.infer<typeof SetupIntentCanceled>;

export const SetupIntentCreated = z.object({
'object': z.lazy(() => SetupIntent)
});

export type SetupIntentCreatedModel = z.infer<typeof SetupIntentCreated>;

export const SetupIntentRequiresAction = z.object({
'object': z.lazy(() => SetupIntent)
});

export type SetupIntentRequiresActionModel = z.infer<typeof SetupIntentRequiresAction>;

export const SetupIntentSetupFailed = z.object({
'object': z.lazy(() => SetupIntent)
});

export type SetupIntentSetupFailedModel = z.infer<typeof SetupIntentSetupFailed>;

export const SetupIntentSucceeded = z.object({
'object': z.lazy(() => SetupIntent)
});

export type SetupIntentSucceededModel = z.infer<typeof SetupIntentSucceeded>;

export const SetupIntentTypeSpecificPaymentMethodOptionsClient = z.object({
'verification_method': z.enum(['automatic', 'instant', 'microdeposits']).optional()
});

export type SetupIntentTypeSpecificPaymentMethodOptionsClientModel = z.infer<typeof SetupIntentTypeSpecificPaymentMethodOptionsClient>;

export const SigmaScheduledQueryRunCreated = z.object({
'object': ScheduledQueryRun
});

export type SigmaScheduledQueryRunCreatedModel = z.infer<typeof SigmaScheduledQueryRunCreated>;

export const SourceCanceled = z.object({
'object': Source
});

export type SourceCanceledModel = z.infer<typeof SourceCanceled>;

export const SourceChargeable = z.object({
'object': Source
});

export type SourceChargeableModel = z.infer<typeof SourceChargeable>;

export const SourceFailed = z.object({
'object': Source
});

export type SourceFailedModel = z.infer<typeof SourceFailed>;

export const SourceMandateNotificationAcssDebitData = z.object({
'statement_descriptor': z.string().optional()
});

export type SourceMandateNotificationAcssDebitDataModel = z.infer<typeof SourceMandateNotificationAcssDebitData>;

export const SourceMandateNotificationBacsDebitData = z.object({
'last4': z.string().optional()
});

export type SourceMandateNotificationBacsDebitDataModel = z.infer<typeof SourceMandateNotificationBacsDebitData>;

export const SourceMandateNotificationSepaDebitData = z.object({
'creditor_identifier': z.string().optional(),
'last4': z.string().optional(),
'mandate_reference': z.string().optional()
});

export type SourceMandateNotificationSepaDebitDataModel = z.infer<typeof SourceMandateNotificationSepaDebitData>;

export const SourceMandateNotification_1 = z.object({
'acss_debit': SourceMandateNotificationAcssDebitData.optional(),
'amount': z.number().int(),
'bacs_debit': SourceMandateNotificationBacsDebitData.optional(),
'created': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['source_mandate_notification']),
'reason': z.string(),
'sepa_debit': SourceMandateNotificationSepaDebitData.optional(),
'source': Source,
'status': z.string(),
'type': z.string()
});

export type SourceMandateNotification_1Model = z.infer<typeof SourceMandateNotification_1>;

export const SourceMandateNotification = z.object({
'object': SourceMandateNotification_1
});

export type SourceMandateNotificationModel = z.infer<typeof SourceMandateNotification>;

export const SourceRefundAttributesRequired = z.object({
'object': Source
});

export type SourceRefundAttributesRequiredModel = z.infer<typeof SourceRefundAttributesRequired>;

export const SourceTransactionAchCreditTransferData = z.object({
'customer_data': z.string().optional(),
'fingerprint': z.string().optional(),
'last4': z.string().optional(),
'routing_number': z.string().optional()
});

export type SourceTransactionAchCreditTransferDataModel = z.infer<typeof SourceTransactionAchCreditTransferData>;

export const SourceTransactionChfCreditTransferData = z.object({
'reference': z.string().optional(),
'sender_address_country': z.string().optional(),
'sender_address_line1': z.string().optional(),
'sender_iban': z.string().optional(),
'sender_name': z.string().optional()
});

export type SourceTransactionChfCreditTransferDataModel = z.infer<typeof SourceTransactionChfCreditTransferData>;

export const SourceTransactionGbpCreditTransferData = z.object({
'fingerprint': z.string().optional(),
'funding_method': z.string().optional(),
'last4': z.string().optional(),
'reference': z.string().optional(),
'sender_account_number': z.string().optional(),
'sender_name': z.string().optional(),
'sender_sort_code': z.string().optional()
});

export type SourceTransactionGbpCreditTransferDataModel = z.infer<typeof SourceTransactionGbpCreditTransferData>;

export const SourceTransactionPaperCheckData = z.object({
'available_at': z.string().optional(),
'invoices': z.string().optional()
});

export type SourceTransactionPaperCheckDataModel = z.infer<typeof SourceTransactionPaperCheckData>;

export const SourceTransactionSepaCreditTransferData = z.object({
'reference': z.string().optional(),
'sender_iban': z.string().optional(),
'sender_name': z.string().optional()
});

export type SourceTransactionSepaCreditTransferDataModel = z.infer<typeof SourceTransactionSepaCreditTransferData>;

export const SourceTransaction = z.object({
'ach_credit_transfer': SourceTransactionAchCreditTransferData.optional(),
'amount': z.number().int(),
'chf_credit_transfer': SourceTransactionChfCreditTransferData.optional(),
'created': z.number().int(),
'currency': z.string(),
'gbp_credit_transfer': SourceTransactionGbpCreditTransferData.optional(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['source_transaction']),
'paper_check': SourceTransactionPaperCheckData.optional(),
'sepa_credit_transfer': SourceTransactionSepaCreditTransferData.optional(),
'source': z.string(),
'status': z.string(),
'type': z.enum(['ach_credit_transfer', 'ach_debit', 'alipay', 'bancontact', 'card', 'card_present', 'eps', 'giropay', 'ideal', 'klarna', 'multibanco', 'p24', 'sepa_debit', 'sofort', 'three_d_secure', 'wechat'])
});

export type SourceTransactionModel = z.infer<typeof SourceTransaction>;

export const SourceTransactionCreated = z.object({
'object': SourceTransaction
});

export type SourceTransactionCreatedModel = z.infer<typeof SourceTransactionCreated>;

export const SourceTransactionUpdated = z.object({
'object': SourceTransaction
});

export type SourceTransactionUpdatedModel = z.infer<typeof SourceTransactionUpdated>;

export const SubscriptionScheduleAborted = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleAbortedModel = z.infer<typeof SubscriptionScheduleAborted>;

export const SubscriptionScheduleCanceled = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleCanceledModel = z.infer<typeof SubscriptionScheduleCanceled>;

export const SubscriptionScheduleCompleted = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleCompletedModel = z.infer<typeof SubscriptionScheduleCompleted>;

export const SubscriptionScheduleCreated = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleCreatedModel = z.infer<typeof SubscriptionScheduleCreated>;

export const SubscriptionScheduleExpiring = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleExpiringModel = z.infer<typeof SubscriptionScheduleExpiring>;

export const SubscriptionScheduleReleased = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleReleasedModel = z.infer<typeof SubscriptionScheduleReleased>;

export const SubscriptionScheduleUpdated = z.object({
'object': z.lazy(() => SubscriptionSchedule)
});

export type SubscriptionScheduleUpdatedModel = z.infer<typeof SubscriptionScheduleUpdated>;

export const TaxProductResourceTaxAssociationTransactionAttemptsResourceCommitted = z.object({
'transaction': z.string()
});

export type TaxProductResourceTaxAssociationTransactionAttemptsResourceCommittedModel = z.infer<typeof TaxProductResourceTaxAssociationTransactionAttemptsResourceCommitted>;

export const TaxProductResourceTaxAssociationTransactionAttemptsResourceErrored = z.object({
'reason': z.enum(['another_payment_associated_with_calculation', 'calculation_expired', 'currency_mismatch', 'original_transaction_voided', 'unique_reference_violation'])
});

export type TaxProductResourceTaxAssociationTransactionAttemptsResourceErroredModel = z.infer<typeof TaxProductResourceTaxAssociationTransactionAttemptsResourceErrored>;

export const TaxProductResourceTaxAssociationTransactionAttempts = z.object({
'committed': TaxProductResourceTaxAssociationTransactionAttemptsResourceCommitted.optional(),
'errored': TaxProductResourceTaxAssociationTransactionAttemptsResourceErrored.optional(),
'source': z.string(),
'status': z.string()
});

export type TaxProductResourceTaxAssociationTransactionAttemptsModel = z.infer<typeof TaxProductResourceTaxAssociationTransactionAttempts>;

export const TaxAssociation = z.object({
'calculation': z.string(),
'id': z.string(),
'object': z.enum(['tax.association']),
'payment_intent': z.string(),
'tax_transaction_attempts': z.array(TaxProductResourceTaxAssociationTransactionAttempts)
});

export type TaxAssociationModel = z.infer<typeof TaxAssociation>;

export const TaxProductResourcePostalAddress = z.object({
'city': z.string(),
'country': z.string(),
'line1': z.string(),
'line2': z.string(),
'postal_code': z.string(),
'state': z.string()
});

export type TaxProductResourcePostalAddressModel = z.infer<typeof TaxProductResourcePostalAddress>;

export const TaxProductResourceCustomerDetailsResourceTaxId = z.object({
'type': z.enum(['ad_nrt', 'ae_trn', 'al_tin', 'am_tin', 'ao_tin', 'ar_cuit', 'au_abn', 'au_arn', 'aw_tin', 'az_tin', 'ba_tin', 'bb_tin', 'bd_bin', 'bf_ifu', 'bg_uic', 'bh_vat', 'bj_ifu', 'bo_tin', 'br_cnpj', 'br_cpf', 'bs_tin', 'by_tin', 'ca_bn', 'ca_gst_hst', 'ca_pst_bc', 'ca_pst_mb', 'ca_pst_sk', 'ca_qst', 'cd_nif', 'ch_uid', 'ch_vat', 'cl_tin', 'cm_niu', 'cn_tin', 'co_nit', 'cr_tin', 'cv_nif', 'de_stn', 'do_rcn', 'ec_ruc', 'eg_tin', 'es_cif', 'et_tin', 'eu_oss_vat', 'eu_vat', 'gb_vat', 'ge_vat', 'gn_nif', 'hk_br', 'hr_oib', 'hu_tin', 'id_npwp', 'il_vat', 'in_gst', 'is_vat', 'jp_cn', 'jp_rn', 'jp_trn', 'ke_pin', 'kg_tin', 'kh_tin', 'kr_brn', 'kz_bin', 'la_tin', 'li_uid', 'li_vat', 'ma_vat', 'md_vat', 'me_pib', 'mk_vat', 'mr_nif', 'mx_rfc', 'my_frp', 'my_itn', 'my_sst', 'ng_tin', 'no_vat', 'no_voec', 'np_pan', 'nz_gst', 'om_vat', 'pe_ruc', 'ph_tin', 'ro_tin', 'rs_pib', 'ru_inn', 'ru_kpp', 'sa_vat', 'sg_gst', 'sg_uen', 'si_tin', 'sn_ninea', 'sr_fin', 'sv_nit', 'th_vat', 'tj_tin', 'tr_tin', 'tw_vat', 'tz_vat', 'ua_vat', 'ug_tin', 'unknown', 'us_ein', 'uy_ruc', 'uz_tin', 'uz_vat', 've_rif', 'vn_tin', 'za_vat', 'zm_tin', 'zw_tin']),
'value': z.string()
});

export type TaxProductResourceCustomerDetailsResourceTaxIdModel = z.infer<typeof TaxProductResourceCustomerDetailsResourceTaxId>;

export const TaxProductResourceCustomerDetails = z.object({
'address': z.union([TaxProductResourcePostalAddress]),
'address_source': z.enum(['billing', 'shipping']),
'ip_address': z.string(),
'tax_ids': z.array(TaxProductResourceCustomerDetailsResourceTaxId),
'taxability_override': z.enum(['customer_exempt', 'none', 'reverse_charge'])
});

export type TaxProductResourceCustomerDetailsModel = z.infer<typeof TaxProductResourceCustomerDetails>;

export const TaxProductResourceJurisdiction = z.object({
'country': z.string(),
'display_name': z.string(),
'level': z.enum(['city', 'country', 'county', 'district', 'state']),
'state': z.string()
});

export type TaxProductResourceJurisdictionModel = z.infer<typeof TaxProductResourceJurisdiction>;

export const TaxProductResourceLineItemTaxRateDetails = z.object({
'display_name': z.string(),
'percentage_decimal': z.string(),
'tax_type': z.enum(['amusement_tax', 'communications_tax', 'gst', 'hst', 'igst', 'jct', 'lease_tax', 'pst', 'qst', 'retail_delivery_fee', 'rst', 'sales_tax', 'service_tax', 'vat'])
});

export type TaxProductResourceLineItemTaxRateDetailsModel = z.infer<typeof TaxProductResourceLineItemTaxRateDetails>;

export const TaxProductResourceLineItemTaxBreakdown = z.object({
'amount': z.number().int(),
'jurisdiction': TaxProductResourceJurisdiction,
'sourcing': z.enum(['destination', 'origin']),
'tax_rate_details': z.union([TaxProductResourceLineItemTaxRateDetails]),
'taxability_reason': z.enum(['customer_exempt', 'not_collecting', 'not_subject_to_tax', 'not_supported', 'portion_product_exempt', 'portion_reduced_rated', 'portion_standard_rated', 'product_exempt', 'product_exempt_holiday', 'proportionally_rated', 'reduced_rated', 'reverse_charge', 'standard_rated', 'taxable_basis_reduced', 'zero_rated']),
'taxable_amount': z.number().int()
});

export type TaxProductResourceLineItemTaxBreakdownModel = z.infer<typeof TaxProductResourceLineItemTaxBreakdown>;

export const TaxCalculationLineItem = z.object({
'amount': z.number().int(),
'amount_tax': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['tax.calculation_line_item']),
'product': z.string(),
'quantity': z.number().int(),
'reference': z.string(),
'tax_behavior': z.enum(['exclusive', 'inclusive']),
'tax_breakdown': z.array(TaxProductResourceLineItemTaxBreakdown).optional(),
'tax_code': z.string()
});

export type TaxCalculationLineItemModel = z.infer<typeof TaxCalculationLineItem>;

export const TaxProductResourceShipFromDetails = z.object({
'address': TaxProductResourcePostalAddress
});

export type TaxProductResourceShipFromDetailsModel = z.infer<typeof TaxProductResourceShipFromDetails>;

export const TaxProductResourceTaxCalculationShippingCost = z.object({
'amount': z.number().int(),
'amount_tax': z.number().int(),
'shipping_rate': z.string().optional(),
'tax_behavior': z.enum(['exclusive', 'inclusive']),
'tax_breakdown': z.array(TaxProductResourceLineItemTaxBreakdown).optional(),
'tax_code': z.string()
});

export type TaxProductResourceTaxCalculationShippingCostModel = z.infer<typeof TaxProductResourceTaxCalculationShippingCost>;

export const TaxProductResourceTaxRateDetails = z.object({
'country': z.string(),
'flat_amount': z.union([TaxRateFlatAmount]),
'percentage_decimal': z.string(),
'rate_type': z.enum(['flat_amount', 'percentage']),
'state': z.string(),
'tax_type': z.enum(['amusement_tax', 'communications_tax', 'gst', 'hst', 'igst', 'jct', 'lease_tax', 'pst', 'qst', 'retail_delivery_fee', 'rst', 'sales_tax', 'service_tax', 'vat'])
});

export type TaxProductResourceTaxRateDetailsModel = z.infer<typeof TaxProductResourceTaxRateDetails>;

export const TaxProductResourceTaxBreakdown = z.object({
'amount': z.number().int(),
'inclusive': z.boolean(),
'tax_rate_details': TaxProductResourceTaxRateDetails,
'taxability_reason': z.enum(['customer_exempt', 'not_collecting', 'not_subject_to_tax', 'not_supported', 'portion_product_exempt', 'portion_reduced_rated', 'portion_standard_rated', 'product_exempt', 'product_exempt_holiday', 'proportionally_rated', 'reduced_rated', 'reverse_charge', 'standard_rated', 'taxable_basis_reduced', 'zero_rated']),
'taxable_amount': z.number().int()
});

export type TaxProductResourceTaxBreakdownModel = z.infer<typeof TaxProductResourceTaxBreakdown>;

export const TaxCalculation = z.object({
'amount_total': z.number().int(),
'currency': z.string(),
'customer': z.string(),
'customer_details': TaxProductResourceCustomerDetails,
'expires_at': z.number().int(),
'id': z.string(),
'line_items': z.object({
'data': z.array(TaxCalculationLineItem),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string().regex(/^\/v1\/tax\/calculations\/[^\/]+\/line_items/)
}).optional(),
'livemode': z.boolean(),
'object': z.enum(['tax.calculation']),
'ship_from_details': z.union([TaxProductResourceShipFromDetails]),
'shipping_cost': z.union([TaxProductResourceTaxCalculationShippingCost]),
'tax_amount_exclusive': z.number().int(),
'tax_amount_inclusive': z.number().int(),
'tax_breakdown': z.array(TaxProductResourceTaxBreakdown),
'tax_date': z.number().int()
});

export type TaxCalculationModel = z.infer<typeof TaxCalculation>;

export const TaxProductRegistrationsResourceCountryOptionsDefaultStandard = z.object({
'place_of_supply_scheme': z.enum(['inbound_goods', 'standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsDefaultStandardModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsDefaultStandard>;

export const TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods = z.object({
'standard': TaxProductRegistrationsResourceCountryOptionsDefaultStandard.optional(),
'type': z.enum(['standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoodsModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods>;

export const TaxProductRegistrationsResourceCountryOptionsDefault = z.object({
'type': z.enum(['standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsDefaultModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsDefault>;

export const TaxProductRegistrationsResourceCountryOptionsSimplified = z.object({
'type': z.enum(['simplified'])
});

export type TaxProductRegistrationsResourceCountryOptionsSimplifiedModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsSimplified>;

export const TaxProductRegistrationsResourceCountryOptionsEuStandard = z.object({
'place_of_supply_scheme': z.enum(['inbound_goods', 'small_seller', 'standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsEuStandardModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsEuStandard>;

export const TaxProductRegistrationsResourceCountryOptionsEurope = z.object({
'standard': TaxProductRegistrationsResourceCountryOptionsEuStandard.optional(),
'type': z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsEuropeModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsEurope>;

export const TaxProductRegistrationsResourceCountryOptionsCaProvinceStandard = z.object({
'province': z.string()
});

export type TaxProductRegistrationsResourceCountryOptionsCaProvinceStandardModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsCaProvinceStandard>;

export const TaxProductRegistrationsResourceCountryOptionsCanada = z.object({
'province_standard': TaxProductRegistrationsResourceCountryOptionsCaProvinceStandard.optional(),
'type': z.enum(['province_standard', 'simplified', 'standard'])
});

export type TaxProductRegistrationsResourceCountryOptionsCanadaModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsCanada>;

export const TaxProductRegistrationsResourceCountryOptionsThailand = z.object({
'type': z.enum(['simplified'])
});

export type TaxProductRegistrationsResourceCountryOptionsThailandModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsThailand>;

export const TaxProductRegistrationsResourceCountryOptionsUsLocalAmusementTax = z.object({
'jurisdiction': z.string()
});

export type TaxProductRegistrationsResourceCountryOptionsUsLocalAmusementTaxModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsUsLocalAmusementTax>;

export const TaxProductRegistrationsResourceCountryOptionsUsLocalLeaseTax = z.object({
'jurisdiction': z.string()
});

export type TaxProductRegistrationsResourceCountryOptionsUsLocalLeaseTaxModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsUsLocalLeaseTax>;

export const TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxElection = z.object({
'jurisdiction': z.string().optional(),
'type': z.enum(['local_use_tax', 'simplified_sellers_use_tax', 'single_local_use_tax'])
});

export type TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxElectionModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxElection>;

export const TaxProductRegistrationsResourceCountryOptionsUsStateSalesTax = z.object({
'elections': z.array(TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxElection).optional()
});

export type TaxProductRegistrationsResourceCountryOptionsUsStateSalesTaxModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsUsStateSalesTax>;

export const TaxProductRegistrationsResourceCountryOptionsUnitedStates = z.object({
'local_amusement_tax': TaxProductRegistrationsResourceCountryOptionsUsLocalAmusementTax.optional(),
'local_lease_tax': TaxProductRegistrationsResourceCountryOptionsUsLocalLeaseTax.optional(),
'state': z.string(),
'state_sales_tax': TaxProductRegistrationsResourceCountryOptionsUsStateSalesTax.optional(),
'type': z.enum(['local_amusement_tax', 'local_lease_tax', 'state_communications_tax', 'state_retail_delivery_fee', 'state_sales_tax'])
});

export type TaxProductRegistrationsResourceCountryOptionsUnitedStatesModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptionsUnitedStates>;

export const TaxProductRegistrationsResourceCountryOptions = z.object({
'ae': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'al': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'am': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ao': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'at': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'au': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'aw': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'az': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ba': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'bb': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'bd': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'be': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'bf': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'bg': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'bh': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'bj': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'bs': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'by': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ca': TaxProductRegistrationsResourceCountryOptionsCanada.optional(),
'cd': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'ch': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'cl': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'cm': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'co': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'cr': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'cv': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'cy': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'cz': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'de': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'dk': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'ec': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ee': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'eg': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'es': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'et': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'fi': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'fr': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'gb': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'ge': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'gn': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'gr': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'hr': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'hu': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'id': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ie': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'in': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'is': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'it': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'jp': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'ke': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'kg': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'kh': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'kr': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'kz': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'la': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'lt': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'lu': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'lv': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'ma': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'md': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'me': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'mk': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'mr': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'mt': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'mx': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'my': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ng': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'nl': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'no': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'np': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'nz': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'om': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'pe': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ph': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'pl': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'pt': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'ro': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'rs': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'ru': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'sa': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'se': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'sg': TaxProductRegistrationsResourceCountryOptionsDefaultInboundGoods.optional(),
'si': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'sk': TaxProductRegistrationsResourceCountryOptionsEurope.optional(),
'sn': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'sr': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'th': TaxProductRegistrationsResourceCountryOptionsThailand.optional(),
'tj': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'tr': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'tw': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'tz': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ua': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'ug': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'us': TaxProductRegistrationsResourceCountryOptionsUnitedStates.optional(),
'uy': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'uz': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'vn': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'za': TaxProductRegistrationsResourceCountryOptionsDefault.optional(),
'zm': TaxProductRegistrationsResourceCountryOptionsSimplified.optional(),
'zw': TaxProductRegistrationsResourceCountryOptionsDefault.optional()
});

export type TaxProductRegistrationsResourceCountryOptionsModel = z.infer<typeof TaxProductRegistrationsResourceCountryOptions>;

export const TaxRegistration = z.object({
'active_from': z.number().int(),
'country': z.string(),
'country_options': TaxProductRegistrationsResourceCountryOptions,
'created': z.number().int(),
'expires_at': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['tax.registration']),
'status': z.enum(['active', 'expired', 'scheduled'])
});

export type TaxRegistrationModel = z.infer<typeof TaxRegistration>;

export const TaxProductResourceTaxSettingsDefaults = z.object({
'provider': z.enum(['anrok', 'avalara', 'sphere', 'stripe']),
'tax_behavior': z.enum(['exclusive', 'inclusive', 'inferred_by_currency']),
'tax_code': z.string()
});

export type TaxProductResourceTaxSettingsDefaultsModel = z.infer<typeof TaxProductResourceTaxSettingsDefaults>;

export const TaxProductResourceTaxSettingsHeadOffice = z.object({
'address': Address
});

export type TaxProductResourceTaxSettingsHeadOfficeModel = z.infer<typeof TaxProductResourceTaxSettingsHeadOffice>;

export const TaxProductResourceTaxSettingsStatusDetailsResourceActive = z.object({

});

export type TaxProductResourceTaxSettingsStatusDetailsResourceActiveModel = z.infer<typeof TaxProductResourceTaxSettingsStatusDetailsResourceActive>;

export const TaxProductResourceTaxSettingsStatusDetailsResourcePending = z.object({
'missing_fields': z.array(z.string())
});

export type TaxProductResourceTaxSettingsStatusDetailsResourcePendingModel = z.infer<typeof TaxProductResourceTaxSettingsStatusDetailsResourcePending>;

export const TaxProductResourceTaxSettingsStatusDetails = z.object({
'active': TaxProductResourceTaxSettingsStatusDetailsResourceActive.optional(),
'pending': TaxProductResourceTaxSettingsStatusDetailsResourcePending.optional()
});

export type TaxProductResourceTaxSettingsStatusDetailsModel = z.infer<typeof TaxProductResourceTaxSettingsStatusDetails>;

export const TaxSettings = z.object({
'defaults': TaxProductResourceTaxSettingsDefaults,
'head_office': z.union([TaxProductResourceTaxSettingsHeadOffice]),
'livemode': z.boolean(),
'object': z.enum(['tax.settings']),
'status': z.enum(['active', 'pending']),
'status_details': TaxProductResourceTaxSettingsStatusDetails
});

export type TaxSettingsModel = z.infer<typeof TaxSettings>;

export const TaxSettingsUpdated = z.object({
'object': TaxSettings
});

export type TaxSettingsUpdatedModel = z.infer<typeof TaxSettingsUpdated>;

export const TaxProductResourceTaxTransactionLineItemResourceReversal = z.object({
'original_line_item': z.string()
});

export type TaxProductResourceTaxTransactionLineItemResourceReversalModel = z.infer<typeof TaxProductResourceTaxTransactionLineItemResourceReversal>;

export const TaxTransactionLineItem = z.object({
'amount': z.number().int(),
'amount_tax': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['tax.transaction_line_item']),
'product': z.string(),
'quantity': z.number().int(),
'reference': z.string(),
'reversal': z.union([TaxProductResourceTaxTransactionLineItemResourceReversal]),
'tax_behavior': z.enum(['exclusive', 'inclusive']),
'tax_code': z.string(),
'type': z.enum(['reversal', 'transaction'])
});

export type TaxTransactionLineItemModel = z.infer<typeof TaxTransactionLineItem>;

export const TaxProductResourceTaxTransactionResourceReversal = z.object({
'original_transaction': z.string()
});

export type TaxProductResourceTaxTransactionResourceReversalModel = z.infer<typeof TaxProductResourceTaxTransactionResourceReversal>;

export const TaxProductResourceTaxTransactionShippingCost = z.object({
'amount': z.number().int(),
'amount_tax': z.number().int(),
'shipping_rate': z.string().optional(),
'tax_behavior': z.enum(['exclusive', 'inclusive']),
'tax_breakdown': z.array(TaxProductResourceLineItemTaxBreakdown).optional(),
'tax_code': z.string()
});

export type TaxProductResourceTaxTransactionShippingCostModel = z.infer<typeof TaxProductResourceTaxTransactionShippingCost>;

export const TaxTransaction = z.object({
'created': z.number().int(),
'currency': z.string(),
'customer': z.string(),
'customer_details': TaxProductResourceCustomerDetails,
'id': z.string(),
'line_items': z.object({
'data': z.array(TaxTransactionLineItem),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string().regex(/^\/v1\/tax\/transactions\/[^\/]+\/line_items/)
}).optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['tax.transaction']),
'posted_at': z.number().int(),
'reference': z.string(),
'reversal': z.union([TaxProductResourceTaxTransactionResourceReversal]),
'ship_from_details': z.union([TaxProductResourceShipFromDetails]),
'shipping_cost': z.union([TaxProductResourceTaxTransactionShippingCost]),
'tax_date': z.number().int(),
'type': z.enum(['reversal', 'transaction'])
});

export type TaxTransactionModel = z.infer<typeof TaxTransaction>;

export const TaxRateCreated = z.object({
'object': TaxRate
});

export type TaxRateCreatedModel = z.infer<typeof TaxRateCreated>;

export const TaxRateUpdated = z.object({
'object': TaxRate
});

export type TaxRateUpdatedModel = z.infer<typeof TaxRateUpdated>;

export const TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig = z.object({
'splashscreen': z.union([z.string(), z.lazy(() => File)]).optional()
});

export type TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfigModel = z.infer<typeof TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig>;

export const TerminalConfigurationConfigurationResourceOfflineConfig = z.object({
'enabled': z.boolean()
});

export type TerminalConfigurationConfigurationResourceOfflineConfigModel = z.infer<typeof TerminalConfigurationConfigurationResourceOfflineConfig>;

export const TerminalConfigurationConfigurationResourceRebootWindow = z.object({
'end_hour': z.number().int(),
'start_hour': z.number().int()
});

export type TerminalConfigurationConfigurationResourceRebootWindowModel = z.infer<typeof TerminalConfigurationConfigurationResourceRebootWindow>;

export const TerminalConfigurationConfigurationResourceCurrencySpecificConfig = z.object({
'fixed_amounts': z.array(z.number().int()).optional(),
'percentages': z.array(z.number().int()).optional(),
'smart_tip_threshold': z.number().int().optional()
});

export type TerminalConfigurationConfigurationResourceCurrencySpecificConfigModel = z.infer<typeof TerminalConfigurationConfigurationResourceCurrencySpecificConfig>;

export const TerminalConfigurationConfigurationResourceTipping = z.object({
'aed': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'aud': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'bgn': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'cad': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'chf': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'czk': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'dkk': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'eur': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'gbp': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'gip': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'hkd': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'huf': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'jpy': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'mxn': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'myr': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'nok': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'nzd': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'pln': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'ron': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'sek': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'sgd': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional(),
'usd': TerminalConfigurationConfigurationResourceCurrencySpecificConfig.optional()
});

export type TerminalConfigurationConfigurationResourceTippingModel = z.infer<typeof TerminalConfigurationConfigurationResourceTipping>;

export const TerminalConfigurationConfigurationResourceEnterprisePeapWifi = z.object({
'ca_certificate_file': z.string().optional(),
'password': z.string(),
'ssid': z.string(),
'username': z.string()
});

export type TerminalConfigurationConfigurationResourceEnterprisePeapWifiModel = z.infer<typeof TerminalConfigurationConfigurationResourceEnterprisePeapWifi>;

export const TerminalConfigurationConfigurationResourceEnterpriseTlsWifi = z.object({
'ca_certificate_file': z.string().optional(),
'client_certificate_file': z.string(),
'private_key_file': z.string(),
'private_key_file_password': z.string().optional(),
'ssid': z.string()
});

export type TerminalConfigurationConfigurationResourceEnterpriseTlsWifiModel = z.infer<typeof TerminalConfigurationConfigurationResourceEnterpriseTlsWifi>;

export const TerminalConfigurationConfigurationResourcePersonalPskWifi = z.object({
'password': z.string(),
'ssid': z.string()
});

export type TerminalConfigurationConfigurationResourcePersonalPskWifiModel = z.infer<typeof TerminalConfigurationConfigurationResourcePersonalPskWifi>;

export const TerminalConfigurationConfigurationResourceWifiConfig = z.object({
'enterprise_eap_peap': TerminalConfigurationConfigurationResourceEnterprisePeapWifi.optional(),
'enterprise_eap_tls': TerminalConfigurationConfigurationResourceEnterpriseTlsWifi.optional(),
'personal_psk': TerminalConfigurationConfigurationResourcePersonalPskWifi.optional(),
'type': z.enum(['enterprise_eap_peap', 'enterprise_eap_tls', 'personal_psk'])
});

export type TerminalConfigurationConfigurationResourceWifiConfigModel = z.infer<typeof TerminalConfigurationConfigurationResourceWifiConfig>;

export const TerminalConfiguration = z.object({
'bbpos_wisepad3': TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig.optional(),
'bbpos_wisepos_e': TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig.optional(),
'id': z.string(),
'is_account_default': z.boolean(),
'livemode': z.boolean(),
'name': z.string(),
'object': z.enum(['terminal.configuration']),
'offline': TerminalConfigurationConfigurationResourceOfflineConfig.optional(),
'reboot_window': TerminalConfigurationConfigurationResourceRebootWindow.optional(),
'stripe_s700': TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig.optional(),
'tipping': TerminalConfigurationConfigurationResourceTipping.optional(),
'verifone_p400': TerminalConfigurationConfigurationResourceDeviceTypeSpecificConfig.optional(),
'wifi': TerminalConfigurationConfigurationResourceWifiConfig.optional()
});

export type TerminalConfigurationModel = z.infer<typeof TerminalConfiguration>;

export const TerminalConnectionToken = z.object({
'location': z.string().optional(),
'object': z.enum(['terminal.connection_token']),
'secret': z.string()
});

export type TerminalConnectionTokenModel = z.infer<typeof TerminalConnectionToken>;

export const TerminalLocation = z.object({
'address': Address,
'address_kana': LegalEntityJapanAddress.optional(),
'address_kanji': LegalEntityJapanAddress.optional(),
'configuration_overrides': z.string().optional(),
'display_name': z.string(),
'display_name_kana': z.string().optional(),
'display_name_kanji': z.string().optional(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['terminal.location']),
'phone': z.string().optional()
});

export type TerminalLocationModel = z.infer<typeof TerminalLocation>;

export const TerminalOnboardingLinkAppleTermsAndConditions = z.object({
'allow_relinking': z.boolean(),
'merchant_display_name': z.string()
});

export type TerminalOnboardingLinkAppleTermsAndConditionsModel = z.infer<typeof TerminalOnboardingLinkAppleTermsAndConditions>;

export const TerminalOnboardingLinkLinkOptions = z.object({
'apple_terms_and_conditions': z.union([TerminalOnboardingLinkAppleTermsAndConditions])
});

export type TerminalOnboardingLinkLinkOptionsModel = z.infer<typeof TerminalOnboardingLinkLinkOptions>;

export const TerminalOnboardingLink = z.object({
'link_options': TerminalOnboardingLinkLinkOptions,
'link_type': z.enum(['apple_terms_and_conditions']),
'object': z.enum(['terminal.onboarding_link']),
'on_behalf_of': z.string(),
'redirect_url': z.string()
});

export type TerminalOnboardingLinkModel = z.infer<typeof TerminalOnboardingLink>;

export const TerminalReaderReaderResourceCustomText = z.object({
'description': z.string(),
'skip_button': z.string(),
'submit_button': z.string(),
'title': z.string()
});

export type TerminalReaderReaderResourceCustomTextModel = z.infer<typeof TerminalReaderReaderResourceCustomText>;

export const TerminalReaderReaderResourceEmail = z.object({
'value': z.string()
});

export type TerminalReaderReaderResourceEmailModel = z.infer<typeof TerminalReaderReaderResourceEmail>;

export const TerminalReaderReaderResourceNumeric = z.object({
'value': z.string()
});

export type TerminalReaderReaderResourceNumericModel = z.infer<typeof TerminalReaderReaderResourceNumeric>;

export const TerminalReaderReaderResourcePhone = z.object({
'value': z.string()
});

export type TerminalReaderReaderResourcePhoneModel = z.infer<typeof TerminalReaderReaderResourcePhone>;

export const TerminalReaderReaderResourceChoice = z.object({
'id': z.string(),
'style': z.enum(['primary', 'secondary']),
'text': z.string()
});

export type TerminalReaderReaderResourceChoiceModel = z.infer<typeof TerminalReaderReaderResourceChoice>;

export const TerminalReaderReaderResourceSelection = z.object({
'choices': z.array(TerminalReaderReaderResourceChoice),
'id': z.string(),
'text': z.string()
});

export type TerminalReaderReaderResourceSelectionModel = z.infer<typeof TerminalReaderReaderResourceSelection>;

export const TerminalReaderReaderResourceSignature = z.object({
'value': z.string()
});

export type TerminalReaderReaderResourceSignatureModel = z.infer<typeof TerminalReaderReaderResourceSignature>;

export const TerminalReaderReaderResourceText = z.object({
'value': z.string()
});

export type TerminalReaderReaderResourceTextModel = z.infer<typeof TerminalReaderReaderResourceText>;

export const TerminalReaderReaderResourceToggle = z.object({
'default_value': z.enum(['disabled', 'enabled']),
'description': z.string(),
'title': z.string(),
'value': z.enum(['disabled', 'enabled'])
});

export type TerminalReaderReaderResourceToggleModel = z.infer<typeof TerminalReaderReaderResourceToggle>;

export const TerminalReaderReaderResourceInput = z.object({
'custom_text': z.union([TerminalReaderReaderResourceCustomText]),
'email': TerminalReaderReaderResourceEmail.optional(),
'numeric': TerminalReaderReaderResourceNumeric.optional(),
'phone': TerminalReaderReaderResourcePhone.optional(),
'required': z.boolean(),
'selection': TerminalReaderReaderResourceSelection.optional(),
'signature': TerminalReaderReaderResourceSignature.optional(),
'skipped': z.boolean().optional(),
'text': TerminalReaderReaderResourceText.optional(),
'toggles': z.array(TerminalReaderReaderResourceToggle),
'type': z.enum(['email', 'numeric', 'phone', 'selection', 'signature', 'text'])
});

export type TerminalReaderReaderResourceInputModel = z.infer<typeof TerminalReaderReaderResourceInput>;

export const TerminalReaderReaderResourceCollectInputsAction = z.object({
'inputs': z.array(TerminalReaderReaderResourceInput),
'metadata': z.record(z.string(), z.string())
});

export type TerminalReaderReaderResourceCollectInputsActionModel = z.infer<typeof TerminalReaderReaderResourceCollectInputsAction>;

export const TerminalReaderReaderResourceTippingConfig = z.object({
'amount_eligible': z.number().int().optional()
});

export type TerminalReaderReaderResourceTippingConfigModel = z.infer<typeof TerminalReaderReaderResourceTippingConfig>;

export const TerminalReaderReaderResourceCollectConfig = z.object({
'enable_customer_cancellation': z.boolean().optional(),
'skip_tipping': z.boolean().optional(),
'tipping': TerminalReaderReaderResourceTippingConfig.optional()
});

export type TerminalReaderReaderResourceCollectConfigModel = z.infer<typeof TerminalReaderReaderResourceCollectConfig>;

export const TerminalReaderReaderResourceCollectPaymentMethodAction = z.object({
'collect_config': TerminalReaderReaderResourceCollectConfig.optional(),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'payment_method': z.lazy(() => PaymentMethod).optional()
});

export type TerminalReaderReaderResourceCollectPaymentMethodActionModel = z.infer<typeof TerminalReaderReaderResourceCollectPaymentMethodAction>;

export const TerminalReaderReaderResourceConfirmConfig = z.object({
'return_url': z.string().optional()
});

export type TerminalReaderReaderResourceConfirmConfigModel = z.infer<typeof TerminalReaderReaderResourceConfirmConfig>;

export const TerminalReaderReaderResourceConfirmPaymentIntentAction = z.object({
'confirm_config': TerminalReaderReaderResourceConfirmConfig.optional(),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)])
});

export type TerminalReaderReaderResourceConfirmPaymentIntentActionModel = z.infer<typeof TerminalReaderReaderResourceConfirmPaymentIntentAction>;

export const TerminalReaderReaderResourceProcessConfig = z.object({
'enable_customer_cancellation': z.boolean().optional(),
'return_url': z.string().optional(),
'skip_tipping': z.boolean().optional(),
'tipping': TerminalReaderReaderResourceTippingConfig.optional()
});

export type TerminalReaderReaderResourceProcessConfigModel = z.infer<typeof TerminalReaderReaderResourceProcessConfig>;

export const TerminalReaderReaderResourceProcessPaymentIntentAction = z.object({
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]),
'process_config': TerminalReaderReaderResourceProcessConfig.optional()
});

export type TerminalReaderReaderResourceProcessPaymentIntentActionModel = z.infer<typeof TerminalReaderReaderResourceProcessPaymentIntentAction>;

export const TerminalReaderReaderResourceProcessSetupConfig = z.object({
'enable_customer_cancellation': z.boolean().optional()
});

export type TerminalReaderReaderResourceProcessSetupConfigModel = z.infer<typeof TerminalReaderReaderResourceProcessSetupConfig>;

export const TerminalReaderReaderResourceProcessSetupIntentAction = z.object({
'generated_card': z.string().optional(),
'process_config': TerminalReaderReaderResourceProcessSetupConfig.optional(),
'setup_intent': z.union([z.string(), z.lazy(() => SetupIntent)])
});

export type TerminalReaderReaderResourceProcessSetupIntentActionModel = z.infer<typeof TerminalReaderReaderResourceProcessSetupIntentAction>;

export const TerminalReaderReaderResourceRefundPaymentConfig = z.object({
'enable_customer_cancellation': z.boolean().optional()
});

export type TerminalReaderReaderResourceRefundPaymentConfigModel = z.infer<typeof TerminalReaderReaderResourceRefundPaymentConfig>;

export const TerminalReaderReaderResourceRefundPaymentAction = z.object({
'amount': z.number().int().optional(),
'charge': z.union([z.string(), z.lazy(() => Charge)]).optional(),
'metadata': z.record(z.string(), z.string()).optional(),
'payment_intent': z.union([z.string(), z.lazy(() => PaymentIntent)]).optional(),
'reason': z.enum(['duplicate', 'fraudulent', 'requested_by_customer']).optional(),
'refund': z.union([z.string(), z.lazy(() => Refund)]).optional(),
'refund_application_fee': z.boolean().optional(),
'refund_payment_config': TerminalReaderReaderResourceRefundPaymentConfig.optional(),
'reverse_transfer': z.boolean().optional()
});

export type TerminalReaderReaderResourceRefundPaymentActionModel = z.infer<typeof TerminalReaderReaderResourceRefundPaymentAction>;

export const TerminalReaderReaderResourceLineItem = z.object({
'amount': z.number().int(),
'description': z.string(),
'quantity': z.number().int()
});

export type TerminalReaderReaderResourceLineItemModel = z.infer<typeof TerminalReaderReaderResourceLineItem>;

export const TerminalReaderReaderResourceCart = z.object({
'currency': z.string(),
'line_items': z.array(TerminalReaderReaderResourceLineItem),
'tax': z.number().int(),
'total': z.number().int()
});

export type TerminalReaderReaderResourceCartModel = z.infer<typeof TerminalReaderReaderResourceCart>;

export const TerminalReaderReaderResourceSetReaderDisplayAction = z.object({
'cart': z.union([TerminalReaderReaderResourceCart]),
'type': z.enum(['cart'])
});

export type TerminalReaderReaderResourceSetReaderDisplayActionModel = z.infer<typeof TerminalReaderReaderResourceSetReaderDisplayAction>;

export const TerminalReaderReaderResourceReaderAction = z.object({
'collect_inputs': TerminalReaderReaderResourceCollectInputsAction.optional(),
'collect_payment_method': TerminalReaderReaderResourceCollectPaymentMethodAction.optional(),
'confirm_payment_intent': TerminalReaderReaderResourceConfirmPaymentIntentAction.optional(),
'failure_code': z.string(),
'failure_message': z.string(),
'process_payment_intent': TerminalReaderReaderResourceProcessPaymentIntentAction.optional(),
'process_setup_intent': TerminalReaderReaderResourceProcessSetupIntentAction.optional(),
'refund_payment': TerminalReaderReaderResourceRefundPaymentAction.optional(),
'set_reader_display': TerminalReaderReaderResourceSetReaderDisplayAction.optional(),
'status': z.enum(['failed', 'in_progress', 'succeeded']),
'type': z.enum(['collect_inputs', 'collect_payment_method', 'confirm_payment_intent', 'process_payment_intent', 'process_setup_intent', 'refund_payment', 'set_reader_display'])
});

export type TerminalReaderReaderResourceReaderActionModel = z.infer<typeof TerminalReaderReaderResourceReaderAction>;

export const TerminalReader = z.object({
'action': z.union([TerminalReaderReaderResourceReaderAction]),
'device_sw_version': z.string(),
'device_type': z.enum(['bbpos_chipper2x', 'bbpos_wisepad3', 'bbpos_wisepos_e', 'mobile_phone_reader', 'simulated_stripe_s700', 'simulated_wisepos_e', 'stripe_m2', 'stripe_s700', 'verifone_P400']),
'id': z.string(),
'ip_address': z.string(),
'label': z.string(),
'last_seen_at': z.number().int(),
'livemode': z.boolean(),
'location': z.union([z.string(), TerminalLocation]),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['terminal.reader']),
'serial_number': z.string(),
'status': z.enum(['offline', 'online'])
});

export type TerminalReaderModel = z.infer<typeof TerminalReader>;

export const TerminalReaderActionFailed = z.object({
'object': TerminalReader
});

export type TerminalReaderActionFailedModel = z.infer<typeof TerminalReaderActionFailed>;

export const TerminalReaderActionSucceeded = z.object({
'object': TerminalReader
});

export type TerminalReaderActionSucceededModel = z.infer<typeof TerminalReaderActionSucceeded>;

export const TerminalReaderActionUpdated = z.object({
'object': TerminalReader
});

export type TerminalReaderActionUpdatedModel = z.infer<typeof TerminalReaderActionUpdated>;

export const TestHelpersTestClockAdvancing = z.object({
'object': TestHelpersTestClock
});

export type TestHelpersTestClockAdvancingModel = z.infer<typeof TestHelpersTestClockAdvancing>;

export const TestHelpersTestClockCreated = z.object({
'object': TestHelpersTestClock
});

export type TestHelpersTestClockCreatedModel = z.infer<typeof TestHelpersTestClockCreated>;

export const TestHelpersTestClockDeleted = z.object({
'object': TestHelpersTestClock
});

export type TestHelpersTestClockDeletedModel = z.infer<typeof TestHelpersTestClockDeleted>;

export const TestHelpersTestClockInternalFailure = z.object({
'object': TestHelpersTestClock
});

export type TestHelpersTestClockInternalFailureModel = z.infer<typeof TestHelpersTestClockInternalFailure>;

export const TestHelpersTestClockReady = z.object({
'object': TestHelpersTestClock
});

export type TestHelpersTestClockReadyModel = z.infer<typeof TestHelpersTestClockReady>;

export const Token = z.object({
'bank_account': z.lazy(() => BankAccount).optional(),
'card': z.lazy(() => Card).optional(),
'client_ip': z.string(),
'created': z.number().int(),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['token']),
'type': z.string(),
'used': z.boolean()
});

export type TokenModel = z.infer<typeof Token>;

export const TopupCanceled = z.object({
'object': z.lazy(() => Topup)
});

export type TopupCanceledModel = z.infer<typeof TopupCanceled>;

export const TopupCreated = z.object({
'object': z.lazy(() => Topup)
});

export type TopupCreatedModel = z.infer<typeof TopupCreated>;

export const TopupFailed = z.object({
'object': z.lazy(() => Topup)
});

export type TopupFailedModel = z.infer<typeof TopupFailed>;

export const TopupReversed = z.object({
'object': z.lazy(() => Topup)
});

export type TopupReversedModel = z.infer<typeof TopupReversed>;

export const TopupSucceeded = z.object({
'object': z.lazy(() => Topup)
});

export type TopupSucceededModel = z.infer<typeof TopupSucceeded>;

export const TransferCreated = z.object({
'object': z.lazy(() => Transfer)
});

export type TransferCreatedModel = z.infer<typeof TransferCreated>;

export const TransferReversed = z.object({
'object': z.lazy(() => Transfer)
});

export type TransferReversedModel = z.infer<typeof TransferReversed>;

export const TransferUpdated = z.object({
'object': z.lazy(() => Transfer)
});

export type TransferUpdatedModel = z.infer<typeof TransferUpdated>;

export const TreasuryReceivedCreditsResourceStatusTransitions = z.object({
'posted_at': z.number().int()
});

export type TreasuryReceivedCreditsResourceStatusTransitionsModel = z.infer<typeof TreasuryReceivedCreditsResourceStatusTransitions>;

export const TreasuryTransactionsResourceBalanceImpact = z.object({
'cash': z.number().int(),
'inbound_pending': z.number().int(),
'outbound_pending': z.number().int()
});

export type TreasuryTransactionsResourceBalanceImpactModel = z.infer<typeof TreasuryTransactionsResourceBalanceImpact>;

export const TreasuryReceivedDebitsResourceDebitReversalLinkedFlows = z.object({
'issuing_dispute': z.string()
});

export type TreasuryReceivedDebitsResourceDebitReversalLinkedFlowsModel = z.infer<typeof TreasuryReceivedDebitsResourceDebitReversalLinkedFlows>;

export const TreasuryReceivedDebitsResourceStatusTransitions = z.object({
'completed_at': z.number().int()
});

export type TreasuryReceivedDebitsResourceStatusTransitionsModel = z.infer<typeof TreasuryReceivedDebitsResourceStatusTransitions>;

export const TreasuryDebitReversal: z.ZodType<TreasuryDebitReversalModel> = z.object({
'amount': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'linked_flows': z.union([TreasuryReceivedDebitsResourceDebitReversalLinkedFlows]),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'network': z.enum(['ach', 'card']),
'object': z.enum(['treasury.debit_reversal']),
'received_debit': z.string(),
'status': z.enum(['failed', 'processing', 'succeeded']),
'status_transitions': TreasuryReceivedDebitsResourceStatusTransitions,
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryInboundTransfersResourceFailureDetails = z.object({
'code': z.enum(['account_closed', 'account_frozen', 'bank_account_restricted', 'bank_ownership_changed', 'debit_not_authorized', 'incorrect_account_holder_address', 'incorrect_account_holder_name', 'incorrect_account_holder_tax_id', 'insufficient_funds', 'invalid_account_number', 'invalid_currency', 'no_account', 'other'])
});

export type TreasuryInboundTransfersResourceFailureDetailsModel = z.infer<typeof TreasuryInboundTransfersResourceFailureDetails>;

export const TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlows = z.object({
'received_debit': z.string()
});

export type TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlowsModel = z.infer<typeof TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlows>;

export const TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitions = z.object({
'canceled_at': z.number().int().optional(),
'failed_at': z.number().int(),
'succeeded_at': z.number().int()
});

export type TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitionsModel = z.infer<typeof TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitions>;

export const TreasuryInboundTransfer: z.ZodType<TreasuryInboundTransferModel> = z.object({
'amount': z.number().int(),
'cancelable': z.boolean(),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'failure_details': z.union([TreasuryInboundTransfersResourceFailureDetails]),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'linked_flows': TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlows,
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['treasury.inbound_transfer']),
'origin_payment_method': z.string(),
'origin_payment_method_details': z.union([InboundTransfers]),
'returned': z.boolean(),
'statement_descriptor': z.string(),
'status': z.enum(['canceled', 'failed', 'processing', 'succeeded']),
'status_transitions': TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitions,
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetails = z.object({
'ip_address': z.string(),
'present': z.boolean()
});

export type TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetailsModel = z.infer<typeof TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetails>;

export const TreasuryOutboundPaymentsResourceReturnedStatus: z.ZodType<TreasuryOutboundPaymentsResourceReturnedStatusModel> = z.object({
'code': z.enum(['account_closed', 'account_frozen', 'bank_account_restricted', 'bank_ownership_changed', 'declined', 'incorrect_account_holder_name', 'invalid_account_number', 'invalid_currency', 'no_account', 'other']),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitions = z.object({
'canceled_at': z.number().int(),
'failed_at': z.number().int(),
'posted_at': z.number().int(),
'returned_at': z.number().int()
});

export type TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitionsModel = z.infer<typeof TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitions>;

export const TreasuryOutboundPaymentsResourceAchTrackingDetails = z.object({
'trace_id': z.string()
});

export type TreasuryOutboundPaymentsResourceAchTrackingDetailsModel = z.infer<typeof TreasuryOutboundPaymentsResourceAchTrackingDetails>;

export const TreasuryOutboundPaymentsResourceUsDomesticWireTrackingDetails = z.object({
'chips': z.string(),
'imad': z.string(),
'omad': z.string()
});

export type TreasuryOutboundPaymentsResourceUsDomesticWireTrackingDetailsModel = z.infer<typeof TreasuryOutboundPaymentsResourceUsDomesticWireTrackingDetails>;

export const TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetails = z.object({
'ach': TreasuryOutboundPaymentsResourceAchTrackingDetails.optional(),
'type': z.enum(['ach', 'us_domestic_wire']),
'us_domestic_wire': TreasuryOutboundPaymentsResourceUsDomesticWireTrackingDetails.optional()
});

export type TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetailsModel = z.infer<typeof TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetails>;

export const TreasuryOutboundPayment: z.ZodType<TreasuryOutboundPaymentModel> = z.object({
'amount': z.number().int(),
'cancelable': z.boolean(),
'created': z.number().int(),
'currency': z.string(),
'customer': z.string(),
'description': z.string(),
'destination_payment_method': z.string(),
'destination_payment_method_details': z.union([OutboundPaymentsPaymentMethodDetails]),
'end_user_details': z.union([TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetails]),
'expected_arrival_date': z.number().int(),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['treasury.outbound_payment']),
'returned_details': z.union([z.lazy(() => TreasuryOutboundPaymentsResourceReturnedStatus)]),
'statement_descriptor': z.string(),
'status': z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']),
'status_transitions': TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitions,
'tracking_details': z.union([TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetails]),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryOutboundTransfersResourceReturnedDetails: z.ZodType<TreasuryOutboundTransfersResourceReturnedDetailsModel> = z.object({
'code': z.enum(['account_closed', 'account_frozen', 'bank_account_restricted', 'bank_ownership_changed', 'declined', 'incorrect_account_holder_name', 'invalid_account_number', 'invalid_currency', 'no_account', 'other']),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryOutboundTransfersResourceStatusTransitions = z.object({
'canceled_at': z.number().int(),
'failed_at': z.number().int(),
'posted_at': z.number().int(),
'returned_at': z.number().int()
});

export type TreasuryOutboundTransfersResourceStatusTransitionsModel = z.infer<typeof TreasuryOutboundTransfersResourceStatusTransitions>;

export const TreasuryOutboundTransfersResourceAchTrackingDetails = z.object({
'trace_id': z.string()
});

export type TreasuryOutboundTransfersResourceAchTrackingDetailsModel = z.infer<typeof TreasuryOutboundTransfersResourceAchTrackingDetails>;

export const TreasuryOutboundTransfersResourceUsDomesticWireTrackingDetails = z.object({
'chips': z.string(),
'imad': z.string(),
'omad': z.string()
});

export type TreasuryOutboundTransfersResourceUsDomesticWireTrackingDetailsModel = z.infer<typeof TreasuryOutboundTransfersResourceUsDomesticWireTrackingDetails>;

export const TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetails = z.object({
'ach': TreasuryOutboundTransfersResourceAchTrackingDetails.optional(),
'type': z.enum(['ach', 'us_domestic_wire']),
'us_domestic_wire': TreasuryOutboundTransfersResourceUsDomesticWireTrackingDetails.optional()
});

export type TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetailsModel = z.infer<typeof TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetails>;

export const TreasuryOutboundTransfer: z.ZodType<TreasuryOutboundTransferModel> = z.object({
'amount': z.number().int(),
'cancelable': z.boolean(),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'destination_payment_method': z.string(),
'destination_payment_method_details': OutboundTransfersPaymentMethodDetails,
'expected_arrival_date': z.number().int(),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['treasury.outbound_transfer']),
'returned_details': z.union([z.lazy(() => TreasuryOutboundTransfersResourceReturnedDetails)]),
'statement_descriptor': z.string(),
'status': z.enum(['canceled', 'failed', 'posted', 'processing', 'returned']),
'status_transitions': TreasuryOutboundTransfersResourceStatusTransitions,
'tracking_details': z.union([TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetails]),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasurySharedResourceInitiatingPaymentMethodDetailsUsBankAccount = z.object({
'bank_name': z.string(),
'last4': z.string(),
'routing_number': z.string()
});

export type TreasurySharedResourceInitiatingPaymentMethodDetailsUsBankAccountModel = z.infer<typeof TreasurySharedResourceInitiatingPaymentMethodDetailsUsBankAccount>;

export const TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetails = z.object({
'balance': z.enum(['payments']).optional(),
'billing_details': TreasurySharedResourceBillingDetails,
'financial_account': ReceivedPaymentMethodDetailsFinancialAccount.optional(),
'issuing_card': z.string().optional(),
'type': z.enum(['balance', 'financial_account', 'issuing_card', 'stripe', 'us_bank_account']),
'us_bank_account': TreasurySharedResourceInitiatingPaymentMethodDetailsUsBankAccount.optional()
});

export type TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetailsModel = z.infer<typeof TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetails>;

export const TreasuryReceivedCreditsResourceSourceFlowsDetails: z.ZodType<TreasuryReceivedCreditsResourceSourceFlowsDetailsModel> = z.object({
'credit_reversal': z.lazy(() => TreasuryCreditReversal).optional(),
'outbound_payment': z.lazy(() => TreasuryOutboundPayment).optional(),
'outbound_transfer': z.lazy(() => TreasuryOutboundTransfer).optional(),
'payout': z.lazy(() => Payout).optional(),
'type': z.enum(['credit_reversal', 'other', 'outbound_payment', 'outbound_transfer', 'payout'])
});

export const TreasuryReceivedCreditsResourceLinkedFlows: z.ZodType<TreasuryReceivedCreditsResourceLinkedFlowsModel> = z.object({
'credit_reversal': z.string(),
'issuing_authorization': z.string(),
'issuing_transaction': z.string(),
'source_flow': z.string(),
'source_flow_details': z.union([z.lazy(() => TreasuryReceivedCreditsResourceSourceFlowsDetails)]).optional(),
'source_flow_type': z.string()
});

export const TreasuryReceivedCreditsResourceReversalDetails = z.object({
'deadline': z.number().int(),
'restricted_reason': z.enum(['already_reversed', 'deadline_passed', 'network_restricted', 'other', 'source_flow_restricted'])
});

export type TreasuryReceivedCreditsResourceReversalDetailsModel = z.infer<typeof TreasuryReceivedCreditsResourceReversalDetails>;

export const TreasuryReceivedCredit: z.ZodType<TreasuryReceivedCreditModel> = z.object({
'amount': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'failure_code': z.enum(['account_closed', 'account_frozen', 'international_transaction', 'other']),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'initiating_payment_method_details': TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetails,
'linked_flows': z.lazy(() => TreasuryReceivedCreditsResourceLinkedFlows),
'livemode': z.boolean(),
'network': z.enum(['ach', 'card', 'stripe', 'us_domestic_wire']),
'object': z.enum(['treasury.received_credit']),
'reversal_details': z.union([TreasuryReceivedCreditsResourceReversalDetails]),
'status': z.enum(['failed', 'succeeded']),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryReceivedDebitsResourceLinkedFlows = z.object({
'debit_reversal': z.string(),
'inbound_transfer': z.string(),
'issuing_authorization': z.string(),
'issuing_transaction': z.string(),
'payout': z.string()
});

export type TreasuryReceivedDebitsResourceLinkedFlowsModel = z.infer<typeof TreasuryReceivedDebitsResourceLinkedFlows>;

export const TreasuryReceivedDebitsResourceReversalDetails = z.object({
'deadline': z.number().int(),
'restricted_reason': z.enum(['already_reversed', 'deadline_passed', 'network_restricted', 'other', 'source_flow_restricted'])
});

export type TreasuryReceivedDebitsResourceReversalDetailsModel = z.infer<typeof TreasuryReceivedDebitsResourceReversalDetails>;

export const TreasuryReceivedDebit: z.ZodType<TreasuryReceivedDebitModel> = z.object({
'amount': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'failure_code': z.enum(['account_closed', 'account_frozen', 'insufficient_funds', 'international_transaction', 'other']),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'initiating_payment_method_details': TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetails.optional(),
'linked_flows': TreasuryReceivedDebitsResourceLinkedFlows,
'livemode': z.boolean(),
'network': z.enum(['ach', 'card', 'stripe']),
'object': z.enum(['treasury.received_debit']),
'reversal_details': z.union([TreasuryReceivedDebitsResourceReversalDetails]),
'status': z.enum(['failed', 'succeeded']),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryTransactionsResourceFlowDetails: z.ZodType<TreasuryTransactionsResourceFlowDetailsModel> = z.object({
'credit_reversal': z.lazy(() => TreasuryCreditReversal).optional(),
'debit_reversal': z.lazy(() => TreasuryDebitReversal).optional(),
'inbound_transfer': z.lazy(() => TreasuryInboundTransfer).optional(),
'issuing_authorization': z.lazy(() => IssuingAuthorization).optional(),
'outbound_payment': z.lazy(() => TreasuryOutboundPayment).optional(),
'outbound_transfer': z.lazy(() => TreasuryOutboundTransfer).optional(),
'received_credit': z.lazy(() => TreasuryReceivedCredit).optional(),
'received_debit': z.lazy(() => TreasuryReceivedDebit).optional(),
'type': z.enum(['credit_reversal', 'debit_reversal', 'inbound_transfer', 'issuing_authorization', 'other', 'outbound_payment', 'outbound_transfer', 'received_credit', 'received_debit'])
});

export const TreasuryTransactionEntry: z.ZodType<TreasuryTransactionEntryModel> = z.object({
'balance_impact': TreasuryTransactionsResourceBalanceImpact,
'created': z.number().int(),
'currency': z.string(),
'effective_at': z.number().int(),
'financial_account': z.string(),
'flow': z.string(),
'flow_details': z.union([z.lazy(() => TreasuryTransactionsResourceFlowDetails)]).optional(),
'flow_type': z.enum(['credit_reversal', 'debit_reversal', 'inbound_transfer', 'issuing_authorization', 'other', 'outbound_payment', 'outbound_transfer', 'received_credit', 'received_debit']),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['treasury.transaction_entry']),
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)]),
'type': z.enum(['credit_reversal', 'credit_reversal_posting', 'debit_reversal', 'inbound_transfer', 'inbound_transfer_return', 'issuing_authorization_hold', 'issuing_authorization_release', 'other', 'outbound_payment', 'outbound_payment_cancellation', 'outbound_payment_failure', 'outbound_payment_posting', 'outbound_payment_return', 'outbound_transfer', 'outbound_transfer_cancellation', 'outbound_transfer_failure', 'outbound_transfer_posting', 'outbound_transfer_return', 'received_credit', 'received_debit'])
});

export const TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitions = z.object({
'posted_at': z.number().int(),
'void_at': z.number().int()
});

export type TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitionsModel = z.infer<typeof TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitions>;

export const TreasuryTransaction: z.ZodType<TreasuryTransactionModel> = z.object({
'amount': z.number().int(),
'balance_impact': TreasuryTransactionsResourceBalanceImpact,
'created': z.number().int(),
'currency': z.string(),
'description': z.string(),
'entries': z.object({
'data': z.array(z.lazy(() => TreasuryTransactionEntry)),
'has_more': z.boolean(),
'object': z.enum(['list']),
'url': z.string().regex(/^\/v1\/treasury\/transaction_entries/)
}).optional(),
'financial_account': z.string(),
'flow': z.string(),
'flow_details': z.union([z.lazy(() => TreasuryTransactionsResourceFlowDetails)]).optional(),
'flow_type': z.enum(['credit_reversal', 'debit_reversal', 'inbound_transfer', 'issuing_authorization', 'other', 'outbound_payment', 'outbound_transfer', 'received_credit', 'received_debit']),
'id': z.string(),
'livemode': z.boolean(),
'object': z.enum(['treasury.transaction']),
'status': z.enum(['open', 'posted', 'void']),
'status_transitions': TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitions
});

export const TreasuryCreditReversal: z.ZodType<TreasuryCreditReversalModel> = z.object({
'amount': z.number().int(),
'created': z.number().int(),
'currency': z.string(),
'financial_account': z.string(),
'hosted_regulatory_receipt_url': z.string(),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'network': z.enum(['ach', 'stripe']),
'object': z.enum(['treasury.credit_reversal']),
'received_credit': z.string(),
'status': z.enum(['canceled', 'posted', 'processing']),
'status_transitions': TreasuryReceivedCreditsResourceStatusTransitions,
'transaction': z.union([z.string(), z.lazy(() => TreasuryTransaction)])
});

export const TreasuryCreditReversalCreated = z.object({
'object': z.lazy(() => TreasuryCreditReversal)
});

export type TreasuryCreditReversalCreatedModel = z.infer<typeof TreasuryCreditReversalCreated>;

export const TreasuryCreditReversalPosted = z.object({
'object': z.lazy(() => TreasuryCreditReversal)
});

export type TreasuryCreditReversalPostedModel = z.infer<typeof TreasuryCreditReversalPosted>;

export const TreasuryDebitReversalCompleted = z.object({
'object': z.lazy(() => TreasuryDebitReversal)
});

export type TreasuryDebitReversalCompletedModel = z.infer<typeof TreasuryDebitReversalCompleted>;

export const TreasuryDebitReversalCreated = z.object({
'object': z.lazy(() => TreasuryDebitReversal)
});

export type TreasuryDebitReversalCreatedModel = z.infer<typeof TreasuryDebitReversalCreated>;

export const TreasuryDebitReversalInitialCreditGranted = z.object({
'object': z.lazy(() => TreasuryDebitReversal)
});

export type TreasuryDebitReversalInitialCreditGrantedModel = z.infer<typeof TreasuryDebitReversalInitialCreditGranted>;

export const TreasuryFinancialAccountsResourceBalance = z.object({
'cash': z.record(z.string(), z.number().int()),
'inbound_pending': z.record(z.string(), z.number().int()),
'outbound_pending': z.record(z.string(), z.number().int())
});

export type TreasuryFinancialAccountsResourceBalanceModel = z.infer<typeof TreasuryFinancialAccountsResourceBalance>;

export const TreasuryFinancialAccountsResourceTogglesSettingStatusDetails = z.object({
'code': z.enum(['activating', 'capability_not_requested', 'financial_account_closed', 'rejected_other', 'rejected_unsupported_business', 'requirements_past_due', 'requirements_pending_verification', 'restricted_by_platform', 'restricted_other']),
'resolution': z.enum(['contact_stripe', 'provide_information', 'remove_restriction']),
'restriction': z.enum(['inbound_flows', 'outbound_flows']).optional()
});

export type TreasuryFinancialAccountsResourceTogglesSettingStatusDetailsModel = z.infer<typeof TreasuryFinancialAccountsResourceTogglesSettingStatusDetails>;

export const TreasuryFinancialAccountsResourceToggleSettings = z.object({
'requested': z.boolean(),
'status': z.enum(['active', 'pending', 'restricted']),
'status_details': z.array(TreasuryFinancialAccountsResourceTogglesSettingStatusDetails)
});

export type TreasuryFinancialAccountsResourceToggleSettingsModel = z.infer<typeof TreasuryFinancialAccountsResourceToggleSettings>;

export const TreasuryFinancialAccountsResourceAbaToggleSettings = z.object({
'requested': z.boolean(),
'status': z.enum(['active', 'pending', 'restricted']),
'status_details': z.array(TreasuryFinancialAccountsResourceTogglesSettingStatusDetails)
});

export type TreasuryFinancialAccountsResourceAbaToggleSettingsModel = z.infer<typeof TreasuryFinancialAccountsResourceAbaToggleSettings>;

export const TreasuryFinancialAccountsResourceFinancialAddressesFeatures = z.object({
'aba': TreasuryFinancialAccountsResourceAbaToggleSettings.optional()
});

export type TreasuryFinancialAccountsResourceFinancialAddressesFeaturesModel = z.infer<typeof TreasuryFinancialAccountsResourceFinancialAddressesFeatures>;

export const TreasuryFinancialAccountsResourceInboundAchToggleSettings = z.object({
'requested': z.boolean(),
'status': z.enum(['active', 'pending', 'restricted']),
'status_details': z.array(TreasuryFinancialAccountsResourceTogglesSettingStatusDetails)
});

export type TreasuryFinancialAccountsResourceInboundAchToggleSettingsModel = z.infer<typeof TreasuryFinancialAccountsResourceInboundAchToggleSettings>;

export const TreasuryFinancialAccountsResourceInboundTransfers = z.object({
'ach': TreasuryFinancialAccountsResourceInboundAchToggleSettings.optional()
});

export type TreasuryFinancialAccountsResourceInboundTransfersModel = z.infer<typeof TreasuryFinancialAccountsResourceInboundTransfers>;

export const TreasuryFinancialAccountsResourceOutboundAchToggleSettings = z.object({
'requested': z.boolean(),
'status': z.enum(['active', 'pending', 'restricted']),
'status_details': z.array(TreasuryFinancialAccountsResourceTogglesSettingStatusDetails)
});

export type TreasuryFinancialAccountsResourceOutboundAchToggleSettingsModel = z.infer<typeof TreasuryFinancialAccountsResourceOutboundAchToggleSettings>;

export const TreasuryFinancialAccountsResourceOutboundPayments = z.object({
'ach': TreasuryFinancialAccountsResourceOutboundAchToggleSettings.optional(),
'us_domestic_wire': TreasuryFinancialAccountsResourceToggleSettings.optional()
});

export type TreasuryFinancialAccountsResourceOutboundPaymentsModel = z.infer<typeof TreasuryFinancialAccountsResourceOutboundPayments>;

export const TreasuryFinancialAccountsResourceOutboundTransfers = z.object({
'ach': TreasuryFinancialAccountsResourceOutboundAchToggleSettings.optional(),
'us_domestic_wire': TreasuryFinancialAccountsResourceToggleSettings.optional()
});

export type TreasuryFinancialAccountsResourceOutboundTransfersModel = z.infer<typeof TreasuryFinancialAccountsResourceOutboundTransfers>;

export const TreasuryFinancialAccountFeatures = z.object({
'card_issuing': TreasuryFinancialAccountsResourceToggleSettings.optional(),
'deposit_insurance': TreasuryFinancialAccountsResourceToggleSettings.optional(),
'financial_addresses': TreasuryFinancialAccountsResourceFinancialAddressesFeatures.optional(),
'inbound_transfers': TreasuryFinancialAccountsResourceInboundTransfers.optional(),
'intra_stripe_flows': TreasuryFinancialAccountsResourceToggleSettings.optional(),
'object': z.enum(['treasury.financial_account_features']),
'outbound_payments': TreasuryFinancialAccountsResourceOutboundPayments.optional(),
'outbound_transfers': TreasuryFinancialAccountsResourceOutboundTransfers.optional()
});

export type TreasuryFinancialAccountFeaturesModel = z.infer<typeof TreasuryFinancialAccountFeatures>;

export const TreasuryFinancialAccountsResourceAbaRecord = z.object({
'account_holder_name': z.string(),
'account_number': z.string().optional(),
'account_number_last4': z.string(),
'bank_name': z.string(),
'routing_number': z.string()
});

export type TreasuryFinancialAccountsResourceAbaRecordModel = z.infer<typeof TreasuryFinancialAccountsResourceAbaRecord>;

export const TreasuryFinancialAccountsResourceFinancialAddress = z.object({
'aba': TreasuryFinancialAccountsResourceAbaRecord.optional(),
'supported_networks': z.array(z.enum(['ach', 'us_domestic_wire'])).optional(),
'type': z.enum(['aba'])
});

export type TreasuryFinancialAccountsResourceFinancialAddressModel = z.infer<typeof TreasuryFinancialAccountsResourceFinancialAddress>;

export const TreasuryFinancialAccountsResourcePlatformRestrictions = z.object({
'inbound_flows': z.enum(['restricted', 'unrestricted']),
'outbound_flows': z.enum(['restricted', 'unrestricted'])
});

export type TreasuryFinancialAccountsResourcePlatformRestrictionsModel = z.infer<typeof TreasuryFinancialAccountsResourcePlatformRestrictions>;

export const TreasuryFinancialAccountsResourceClosedStatusDetails = z.object({
'reasons': z.array(z.enum(['account_rejected', 'closed_by_platform', 'other']))
});

export type TreasuryFinancialAccountsResourceClosedStatusDetailsModel = z.infer<typeof TreasuryFinancialAccountsResourceClosedStatusDetails>;

export const TreasuryFinancialAccountsResourceStatusDetails = z.object({
'closed': z.union([TreasuryFinancialAccountsResourceClosedStatusDetails])
});

export type TreasuryFinancialAccountsResourceStatusDetailsModel = z.infer<typeof TreasuryFinancialAccountsResourceStatusDetails>;

export const TreasuryFinancialAccount = z.object({
'active_features': z.array(z.enum(['card_issuing', 'deposit_insurance', 'financial_addresses.aba', 'financial_addresses.aba.forwarding', 'inbound_transfers.ach', 'intra_stripe_flows', 'outbound_payments.ach', 'outbound_payments.us_domestic_wire', 'outbound_transfers.ach', 'outbound_transfers.us_domestic_wire', 'remote_deposit_capture'])).optional(),
'balance': TreasuryFinancialAccountsResourceBalance,
'country': z.string(),
'created': z.number().int(),
'features': TreasuryFinancialAccountFeatures.optional(),
'financial_addresses': z.array(TreasuryFinancialAccountsResourceFinancialAddress),
'id': z.string(),
'is_default': z.boolean().optional(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'nickname': z.string().optional(),
'object': z.enum(['treasury.financial_account']),
'pending_features': z.array(z.enum(['card_issuing', 'deposit_insurance', 'financial_addresses.aba', 'financial_addresses.aba.forwarding', 'inbound_transfers.ach', 'intra_stripe_flows', 'outbound_payments.ach', 'outbound_payments.us_domestic_wire', 'outbound_transfers.ach', 'outbound_transfers.us_domestic_wire', 'remote_deposit_capture'])).optional(),
'platform_restrictions': z.union([TreasuryFinancialAccountsResourcePlatformRestrictions]).optional(),
'restricted_features': z.array(z.enum(['card_issuing', 'deposit_insurance', 'financial_addresses.aba', 'financial_addresses.aba.forwarding', 'inbound_transfers.ach', 'intra_stripe_flows', 'outbound_payments.ach', 'outbound_payments.us_domestic_wire', 'outbound_transfers.ach', 'outbound_transfers.us_domestic_wire', 'remote_deposit_capture'])).optional(),
'status': z.enum(['closed', 'open']),
'status_details': TreasuryFinancialAccountsResourceStatusDetails,
'supported_currencies': z.array(z.string())
});

export type TreasuryFinancialAccountModel = z.infer<typeof TreasuryFinancialAccount>;

export const TreasuryFinancialAccountClosed = z.object({
'object': TreasuryFinancialAccount
});

export type TreasuryFinancialAccountClosedModel = z.infer<typeof TreasuryFinancialAccountClosed>;

export const TreasuryFinancialAccountCreated = z.object({
'object': TreasuryFinancialAccount
});

export type TreasuryFinancialAccountCreatedModel = z.infer<typeof TreasuryFinancialAccountCreated>;

export const TreasuryFinancialAccountFeaturesStatusUpdated = z.object({
'object': TreasuryFinancialAccount
});

export type TreasuryFinancialAccountFeaturesStatusUpdatedModel = z.infer<typeof TreasuryFinancialAccountFeaturesStatusUpdated>;

export const TreasuryInboundTransferCanceled = z.object({
'object': z.lazy(() => TreasuryInboundTransfer)
});

export type TreasuryInboundTransferCanceledModel = z.infer<typeof TreasuryInboundTransferCanceled>;

export const TreasuryInboundTransferCreated = z.object({
'object': z.lazy(() => TreasuryInboundTransfer)
});

export type TreasuryInboundTransferCreatedModel = z.infer<typeof TreasuryInboundTransferCreated>;

export const TreasuryInboundTransferFailed = z.object({
'object': z.lazy(() => TreasuryInboundTransfer)
});

export type TreasuryInboundTransferFailedModel = z.infer<typeof TreasuryInboundTransferFailed>;

export const TreasuryInboundTransferSucceeded = z.object({
'object': z.lazy(() => TreasuryInboundTransfer)
});

export type TreasuryInboundTransferSucceededModel = z.infer<typeof TreasuryInboundTransferSucceeded>;

export const TreasuryOutboundPaymentCanceled = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentCanceledModel = z.infer<typeof TreasuryOutboundPaymentCanceled>;

export const TreasuryOutboundPaymentCreated = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentCreatedModel = z.infer<typeof TreasuryOutboundPaymentCreated>;

export const TreasuryOutboundPaymentExpectedArrivalDateUpdated = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentExpectedArrivalDateUpdatedModel = z.infer<typeof TreasuryOutboundPaymentExpectedArrivalDateUpdated>;

export const TreasuryOutboundPaymentFailed = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentFailedModel = z.infer<typeof TreasuryOutboundPaymentFailed>;

export const TreasuryOutboundPaymentPosted = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentPostedModel = z.infer<typeof TreasuryOutboundPaymentPosted>;

export const TreasuryOutboundPaymentReturned = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentReturnedModel = z.infer<typeof TreasuryOutboundPaymentReturned>;

export const TreasuryOutboundPaymentTrackingDetailsUpdated = z.object({
'object': z.lazy(() => TreasuryOutboundPayment)
});

export type TreasuryOutboundPaymentTrackingDetailsUpdatedModel = z.infer<typeof TreasuryOutboundPaymentTrackingDetailsUpdated>;

export const TreasuryOutboundTransferCanceled = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferCanceledModel = z.infer<typeof TreasuryOutboundTransferCanceled>;

export const TreasuryOutboundTransferCreated = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferCreatedModel = z.infer<typeof TreasuryOutboundTransferCreated>;

export const TreasuryOutboundTransferExpectedArrivalDateUpdated = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferExpectedArrivalDateUpdatedModel = z.infer<typeof TreasuryOutboundTransferExpectedArrivalDateUpdated>;

export const TreasuryOutboundTransferFailed = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferFailedModel = z.infer<typeof TreasuryOutboundTransferFailed>;

export const TreasuryOutboundTransferPosted = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferPostedModel = z.infer<typeof TreasuryOutboundTransferPosted>;

export const TreasuryOutboundTransferReturned = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferReturnedModel = z.infer<typeof TreasuryOutboundTransferReturned>;

export const TreasuryOutboundTransferTrackingDetailsUpdated = z.object({
'object': z.lazy(() => TreasuryOutboundTransfer)
});

export type TreasuryOutboundTransferTrackingDetailsUpdatedModel = z.infer<typeof TreasuryOutboundTransferTrackingDetailsUpdated>;

export const TreasuryReceivedCreditCreated = z.object({
'object': z.lazy(() => TreasuryReceivedCredit)
});

export type TreasuryReceivedCreditCreatedModel = z.infer<typeof TreasuryReceivedCreditCreated>;

export const TreasuryReceivedCreditFailed = z.object({
'object': z.lazy(() => TreasuryReceivedCredit)
});

export type TreasuryReceivedCreditFailedModel = z.infer<typeof TreasuryReceivedCreditFailed>;

export const TreasuryReceivedCreditSucceeded = z.object({
'object': z.lazy(() => TreasuryReceivedCredit)
});

export type TreasuryReceivedCreditSucceededModel = z.infer<typeof TreasuryReceivedCreditSucceeded>;

export const TreasuryReceivedDebitCreated = z.object({
'object': z.lazy(() => TreasuryReceivedDebit)
});

export type TreasuryReceivedDebitCreatedModel = z.infer<typeof TreasuryReceivedDebitCreated>;

export const WebhookEndpoint = z.object({
'api_version': z.string(),
'application': z.string(),
'created': z.number().int(),
'description': z.string(),
'enabled_events': z.array(z.string()),
'id': z.string(),
'livemode': z.boolean(),
'metadata': z.record(z.string(), z.string()),
'object': z.enum(['webhook_endpoint']),
'secret': z.string().optional(),
'status': z.string(),
'url': z.string()
});

export type WebhookEndpointModel = z.infer<typeof WebhookEndpoint>;