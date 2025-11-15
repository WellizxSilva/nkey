import { IStorage } from "./storage/IStorage";

export class Nkey<T> {
  private storage: IStorage<T>;

  constructor(storage: IStorage<T>) {
    this.storage = storage;
  }

  create(key: string, value: T) {
    return this.storage.create(key, value);
  }

  read(key: string) {
    return this.storage.read(key);
  }

  update(key: string, value: T) {
    return this.storage.update(key, value);
  }

  delete(key: string) {
    return this.storage.delete(key);
  }

  has(key: string) {
    return this.storage.has(key);
  }

  size() {
    return this.storage.size();
  }

  clear() {
    return this.storage.clear();
  }

  values() {
    return this.storage.values();
  }

  keys() {
    return this.storage.keys();
  }

  entries() {
    return this.storage.entries();
  }
}
