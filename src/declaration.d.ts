declare type Nullable<T> = T | null;
declare type VoidFunction = (...args: unknown[]) => void;
declare type AnyFunction<T> = (...args: never) => T;
