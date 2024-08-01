export type ArrayCallbackType<InType, OutType> = (v: InType, i: number, a: Array<typeof v>) => OutType;

export type ArrayForEachCallback<InType>      = ArrayCallbackType<InType, void>;
export type ArrayMapCallback<InType, OutType> = ArrayCallbackType<InType, OutType>;
export type ArrayFilterCallback<InType>       = ArrayCallbackType<InType, boolean>;

export type AsyncArrayForEachCallback<InType>      = ArrayCallbackType<InType, Promise<void>>;
export type AsyncArrayMapCallback<InType, OutType> = ArrayCallbackType<InType, Promise<OutType>>;
export type AsyncArrayFilterCallback<InType>       = ArrayCallbackType<InType, Promise<boolean>>;

type ReduceCallback<T, U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;

type SimplePromisifyReturnTypeTransform<T extends (...args: any[]) => any> = (...args: Parameters<T>) => Promise<ReturnType<T>>;

export type ReduceSignature1<T>        = (callbackfn: ReduceCallback<T, T>) => T;
export type ReduceSignature2<T, U = T> = (callbackfn: ReduceCallback<T, U>, initialValue: U) => U;

export type AsyncReduceCallback1<T> = SimplePromisifyReturnTypeTransform<ReduceCallback1<T>>;
export type AsyncReduceCallback2<T, U> = SimplePromisifyReturnTypeTransform<ReduceCallback2<T, U>>;

export type AsyncReduceSignature1<T>    = (callbackfn: AsyncReduceCallback1<T>) => Promise<ReturnType<ReduceSignature1<T>>>;
export type AsyncReduceSignature2<T>    = (callbackfn: AsyncReduceCallback1<T>) => Promise<ReturnType<ReduceSignature2<T>>>;
export type AsyncReduceSignature3<T, U> = (callbackfn: AsyncReduceCallback2<T, U>, initialValue: U) => Promise<ReturnType<ReduceSignature3<T, U>>>;


// type ReduceParameters1<T> = Parameters<ReduceSignature1<T>>;
// type ReduceParameters2<T> = Parameters<ReduceSignature2<T>>;
// type ReduceParameters3<T, U> = Parameters<ReduceSignature3<T, U>>;

export type SyncReduceParameters<T, U> = Parameters<ReduceSignature1<T>> | Parameters<ReduceSignature2<T>> | Parameters<ReduceSignature3<T, U>>;
export type SyncReduceReturn<T, U> = ReturnType<ReduceSignature1<T>> | ReturnType<ReduceSignature2<T>> | ReturnType<ReduceSignature3<T, U>>;