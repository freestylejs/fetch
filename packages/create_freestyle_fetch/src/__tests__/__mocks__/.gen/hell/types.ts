// Helper types for schemas

export type HellObjectModel = {
  'required-key': string;
  'optional-key'?: string | undefined;
  'spaced key': number;
  '$special$'?: boolean | undefined;
};

export type DeepNestedModel = {
  'level1'?: {
  'level2'?: Array<{
  'level3'?: 'deep' | undefined;
}> | undefined;
} | undefined;
};

export type IntersectionHellModel = HellObjectModel & {
  'extra'?: string | undefined;
};

export type UnionHellModel = OptionAModel | OptionBModel;

export type OptionAModel = {
  'type': 'A';
  'a'?: string | undefined;
};

export type OptionBModel = {
  'type': 'B';
  'b'?: number | undefined;
};