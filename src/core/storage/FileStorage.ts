import { IStorage } from "./IStorage";
import { KeyAlreadyExistsError } from "../../errors/KeyAlreadyExistsError";
import { KeyNotFoundError } from "../../errors/KeyNotFoundError";
import * as fs from "node:fs";
export class FileStorage<T> implements IStorage<T> {
  private filePath: string;
  private store: Map<string, T>;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.store = new Map<string, T>();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      this.store = new Map(Object.entries(JSON.parse(data)));
    }
  }

  private persist(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(Object.fromEntries(this.store))
    );
  }

  create(key: string, value: T): boolean {
    if (this.store.has(key)) {
      throw new KeyAlreadyExistsError(key);
    }
    this.store.set(key, value);
    this.persist();
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
    this.persist();
    return true;
  }

  delete(key: string): boolean {
    if (!this.store.has(key)) {
      throw new KeyNotFoundError(key);
    }
    this.store.delete(key);
    this.persist();
    return true;
  }

  upsert(key: string, value: T): boolean {
    this.store.set(key, value);
    this.persist();
    return true;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }

  values(): T[] {
    return Array.from(this.store.values());
  }

  entries(): [string, T][] {
    return Array.from(this.store.entries());
  }

  clear(): void {
    this.store.clear();
    this.persist();
  }

  size(): number {
    return this.store.size;
  }
}
