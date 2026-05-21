/// <reference types="next-images" />

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

declare module 'react-spinners';
