export type ArrayCallbackType<InType, OutType> = (v: InType, i: number, a: Array<typeof v>) => OutType;

export type ArrayForEachCallback<InType>      = ArrayCallbackType<InType, void>;
export type ArrayMapCallback<InType, OutType> = ArrayCallbackType<InType, OutType>;
export type ArrayFilterCallback<InType>       = ArrayCallbackType<InType, boolean>;

export type AsyncArrayForEachCallback<InType>      = ArrayCallbackType<InType, Promise<void>>;
export type AsyncArrayMapCallback<InType, OutType> = ArrayCallbackType<InType, Promise<OutType>>;
export type AsyncArrayFilterCallback<InType>       = ArrayCallbackType<InType, Promise<boolean>>;

type ReduceCallback<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;

export type ReduceSignature1<T>    = (callbackfn: ReduceCallback<T, T>) => T;
export type ReduceSignature2<T, U> = (callbackfn: ReduceCallback<T, U>, initialValue?: U) => U;

export type AsyncReduceCallback<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => Promise<U>;

export type AsyncReduceSignature1<T>    = (callbackfn: AsyncReduceCallback<T, T>) => Promise<ReturnType<ReduceSignature1<T>>>;
export type AsyncReduceSignature2<T, U> = (callbackfn: AsyncReduceCallback<T, U>, initialValue?: U) => Promise<ReturnType<ReduceSignature2<T, U>>>;

// type ReduceParameters1<T> = Parameters<ReduceSignature1<T>>;
// type ReduceParameters2<T> = Parameters<ReduceSignature2<T>>;
// type ReduceParameters3<T, U> = Parameters<ReduceSignature3<T, U>>;