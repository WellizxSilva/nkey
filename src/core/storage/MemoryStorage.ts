import { IStorage } from "./IStorage";
import { KeyAlreadyExistsError } from "../../errors/KeyAlreadyExistsError";
import { KeyNotFoundError } from "../../errors/KeyNotFoundError";

export class MemoryStorage<T> implements IStorage<T> {
  private store: Map<string, T> = new Map();

  create(key: string, value: T): boolean {
    if (this.store.has(key)) {
      throw new KeyAlreadyExistsError(key);
    }
    this.store.set(key, value);
    return true;
  }

  read(key: string): T | undefined {
    return this.store.get(key);
  }

  update(key: string, value: T): boolean {
    if (!this.store.has(key)) {
      throw new KeyNotFoundError(key);
    }
    this.store.set(key, value);
    return true;
  }

  delete(key: string): boolean {
    if (!this.store.has(key)) {
      throw new KeyNotFoundError(key);
    }
    return this.store.delete(key);
  }

  upsert(key: string, value: T): boolean {
    this.store.set(key, value);
    return true;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  size(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  values(): T[] {
    return Array.from(this.store.values());
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  entries(): [string, T][] {
    return Array.from(this.store.entries());
  }
}
