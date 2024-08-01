type HeadOf<T extends any[]> = T extends [infer Head, ...infer _] ? Head : never;
type TailOf<T extends any[]> = T extends [infer _, ...infer Tail] ? Tail : never;
