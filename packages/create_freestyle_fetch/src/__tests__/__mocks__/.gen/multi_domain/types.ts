// Helper types for schemas

export type UserModel = {
  'id': string;
  'name': string;
};

export type InvoiceModel = {
  'id': string;
  'amount_due': number;
  'currency': string;
};

export type InvoiceListModel = {
  'data': InvoiceModel[];
  'has_more': boolean;
};

export type ListUsersSearchParamsModel = {
  'page'?: number | undefined;
};

export type ListUsersResponseModel = UserModel[];