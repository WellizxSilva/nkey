import { NkeyCollection } from "./NkeyCollection";
import { IStorage } from "./storage/IStorage";
import { NoStorageProvidedError } from "../errors/NoStorageProvidedError";
/**
 * ---
 * Nkey
 * ---
 * ___Data structure for storing key-value pairs___
 */

export class Nkey<T> extends NkeyCollection<T> {
  private collections: Map<string, IStorage<unknown>> = new Map();

  constructor(storage?: IStorage<T>) {
    super(
      storage ??
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

  collection<U>(name: string, storage: IStorage<U>): NkeyCollection<U> {
    if (!this.collections.has(name)) {
      this.collections.set(name, storage);
    }
    return new NkeyCollection<U>(this.collections.get(name)! as IStorage<U>); // makes a type assertion to the correct type
  }
}
