import { NkeyCollection } from "./NkeyCollection";
import { IStorage } from "./storage/IStorage";
import { NoStorageProvidedError } from "../errors/NoStorageProvidedError";
/**
 * ---
 * Nkey
 * ---
 * ___Data structure for storing key-value pairs___
 */

export class Nkey<
  TCollections extends object = { [key: string]: unknown },
  T = unknown
> extends NkeyCollection<T> {
  private collections: Map<
    keyof TCollections,
    IStorage<TCollections[keyof TCollections]>
  > = new Map();

  constructor(private defaultStorage?: IStorage<T>) {
    super(
      defaultStorage ??
        ({
          create: () => {
            throw new NoStorageProvidedError();
          },
          read: () => {
            throw new NoStorageProvidedError();
          },
          update: () => {
            throw new NoStorageProvidedError();
          },
          delete: () => {
            throw new NoStorageProvidedError();
          },
          upsert: () => {
            throw new NoStorageProvidedError();
          },
          has: () => {
            throw new NoStorageProvidedError();
          },
          size: () => {
            throw new NoStorageProvidedError();
          },
          clear: () => {
            throw new NoStorageProvidedError();
          },
          values: () => {
            throw new NoStorageProvidedError();
          },
          keys: () => {
            throw new NoStorageProvidedError();
          },
          entries: () => {
            throw new NoStorageProvidedError();
          },
        } as IStorage<T>)
    );
  }

  //
  // ____________________OVERLOADs____________________
  //
  collection<K extends keyof TCollections>(
    name: K,
    storage?: IStorage<TCollections[K]>
  ): NkeyCollection<TCollections[K]>;

  collection<U>(name: string, storage: IStorage<U>): NkeyCollection<U>;

  collection<K extends keyof TCollections>(
    name: K,
    storage?: IStorage<TCollections[K]>
  ): NkeyCollection<TCollections[K]> {
    if (!this.collections.has(name)) {
      this.collections.set(
        name,
        storage ??
          (this.defaultStorage as IStorage<TCollections[keyof TCollections]>)
      );
    }
    return new NkeyCollection<TCollections[K]>(
      this.collections.get(name)! as IStorage<TCollections[K]>
    );
  }
}
