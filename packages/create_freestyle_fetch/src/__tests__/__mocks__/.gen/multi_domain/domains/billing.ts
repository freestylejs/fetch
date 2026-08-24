import { f } from '@freestylejs/fetch';
import * as Schemas from '../schemas';

/**
 * Plain router structure for the 'billing' domain.
 * Leaves are uncompiled f.builder() chains; api.ts composes them.
 */
export const billingDomain = {
'billing': {
'invoices': {
/**
 * List invoices
 */
'GET': f.builder().def_json().def_response(async ({ json }) => Schemas.parseInvoiceList(await json())),
'$invoiceId': {
'void': {
/**
 * Void invoice
 */
'POST': f.builder().def_json().def_body(Schemas.parseVoidInvoiceBody).def_response(async ({ json }) => Schemas.parseInvoice(await json()))
}
}
}
}
};
