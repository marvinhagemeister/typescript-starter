declare namespace DeepEql {
  export interface Exports {
    (a: any, b: any): boolean;
    MemoizeMap: WeakMap<any, any>;
  }

  export var deep: Exports;
}

declare module "deep-eql" {
  export = DeepEql.deep;
}
