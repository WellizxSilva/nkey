import { IStorage } from "./IStorage";
import { KeyAlreadyExistsError } from "../../errors/KeyAlreadyExistsError";
import { KeyNotFoundError } from "../../errors/KeyNotFoundError";

export class MemoryStorage<T> implements IStorage<T> {
  private db: Map<string, T> = new Map();

  create(key: string, value: T): boolean {
    if (this.db.has(key)) {
      throw new KeyAlreadyExistsError(key);
    }
    this.db.set(key, value);
    return true;
  }

  read(key: string): T | undefined {
    return this.db.get(key);
  }

  update(key: string, value: T): boolean {
    if (!this.db.has(key)) {
      throw new KeyNotFoundError(key);
    }
    this.db.set(key, value);
    return true;
  }

  delete(key: string): boolean {
    if (!this.db.has(key)) {
      throw new KeyNotFoundError(key);
    }
    return this.db.delete(key);
  }

  has(key: string): boolean {
    return this.db.has(key);
  }

  size(): number {
    return this.db.size;
  }

  clear(): void {
    this.db.clear();
  }

  values(): T[] {
    return Array.from(this.db.values());
  }

  keys(): string[] {
    return Array.from(this.db.keys());
  }

  entries(): [string, T][] {
    return Array.from(this.db.entries());
  }
}
