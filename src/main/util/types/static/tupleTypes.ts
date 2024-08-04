export type HeadOf<T extends any[]> = T extends [infer Head, ...infer _] ? Head : never;
export type TailOf<T extends any[]> = T extends [infer _, ...infer Tail] ? Tail : never;
