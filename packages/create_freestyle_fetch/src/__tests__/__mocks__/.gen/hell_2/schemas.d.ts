import type { StringDictionaryModel, ObjectWithCatchallModel, SimpleUnionModel, AnyOfUnionModel, ConstStringModel, NullableStringModel } from './types';

export declare const parseStringDictionary: (value: unknown) => StringDictionaryModel;

export declare const parseObjectWithCatchall: (value: unknown) => ObjectWithCatchallModel;

export declare const parseSimpleUnion: (value: unknown) => SimpleUnionModel;

export declare const parseAnyOfUnion: (value: unknown) => AnyOfUnionModel;

export declare const parseConstString: (value: unknown) => ConstStringModel;

export declare const parseNullableString: (value: unknown) => NullableStringModel;