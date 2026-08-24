import type { UserModel, InvoiceModel, InvoiceListModel, ListUsersSearchParamsModel, ListUsersResponseModel } from './types';

export declare const parseUser: (value: unknown) => UserModel;

export declare const parseInvoice: (value: unknown) => InvoiceModel;

export declare const parseInvoiceList: (value: unknown) => InvoiceListModel;

export declare const parseListUsersSearchParams: (value: unknown) => ListUsersSearchParamsModel;

export declare const parseListUsersResponse: (value: unknown) => ListUsersResponseModel;

export declare const parseVoidInvoiceBody: (value: unknown) => URLSearchParams;