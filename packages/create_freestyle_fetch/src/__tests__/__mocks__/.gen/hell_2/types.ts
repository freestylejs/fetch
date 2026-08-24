// Helper types for schemas

export type StringDictionaryModel = {
  [key: string]: string;
};

export type ObjectWithCatchallModel = {
  'id': string;
};

export type SimpleUnionModel = string | boolean;

export type AnyOfUnionModel = StringDictionaryModel | number;

export type ConstStringModel = string;

export type NullableStringModel = string | null;