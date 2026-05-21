import { GetUserProfileResponse } from "@/__generated__/RwInterfaceApi";
import { isClient } from "./common";

/**
 * The session storage tool with complete types， and supports prefix separated namespaces
 * When using storage, it can provide value type hints to reduce mental burden
 * */
interface StorageOptions {
  storageType?: "localStorage" | "sessionStorage";
  prefix?: string | string[];
}

export default class SStorage<Mapping extends Record<keyof unknown, unknown>> {
  private storageType: StorageOptions["storageType"];

  private get storage() {
    if (!isClient())
      return { getItem() {}, setItem() {}, removeItem() {}, clear() {} };
    return window[this.storageType!];
  }

  private prefix: StorageOptions["prefix"] = "";

  constructor(options?: StorageOptions) {
    if (options?.prefix) this.prefix = options.prefix;

    this.storageType = options?.storageType || "localStorage";
  }

  set<Key extends keyof Mapping, Value = Mapping[Key]>(key: Key, value: Value) {
    const realKey = this.getKey(key);
    const stringifyValue = this.stringify(value);

    this.storage.setItem(realKey, stringifyValue);
  }

  get<Key extends keyof Mapping, Value = Mapping[Key]>(key: Key): Value | null {
    const realKey = this.getKey(key);

    const stringifyValue = this.storage.getItem(realKey);

    if (!stringifyValue) return null;

    return this.parse<Value>(stringifyValue);
  }

  remove<Key extends keyof Mapping>(key: Key) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }

  private getKey(key: string | number | symbol): string {
    if (this.prefix) {
      const tempPrefix = ([] as string[]).concat(this.prefix);
      return [...tempPrefix, key as string].join("_");
    }

    return key as string;
  }

  private stringify(v: unknown): string {
    return JSON.stringify(v);
  }

  private parse<T>(v: string): T {
    return JSON.parse(v) as T;
  }
}

export const enum UserStorageType {
  TOKEN = "TOKEN",
  UPDATE_AI_RESUME = "UPDATE_AI_RESUME",
}

export interface UserStorageMapping {
  TOKEN: {
    accessToken: string;
    expiresAt: string;
  };
  USER_PROFILE: GetUserProfileResponse;
  UPDATE_AI_RESUME: string | null;
}

export const userStorage = new SStorage<UserStorageMapping>({
  prefix: "USER",
  storageType: "localStorage",
});
