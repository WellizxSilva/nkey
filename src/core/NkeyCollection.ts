import { IStorage } from "./storage/IStorage";
import { HookManager } from "../hooks/HookManager";
import { HookCallback, HookEvent } from "../hooks/types";
export class NkeyCollection<T> {
  private storage: IStorage<T>;
  private hookManager = new HookManager<T>();

  /** Storage instance: Adapter (eg. FileStorage) */
  constructor(storage: IStorage<T>) {
    this.storage = storage;
  }
  /** Activate a specific hook */
  on<E extends HookEvent>(event: E, callback: HookCallback<T, E>) {
    this.hookManager.on(event, callback);
  }

  /**
   * Create a new key-value pair
   * @param key - The key to create
   * @param value - The value to associate with the key
   */
  create(key: string, value: T) {
    const result = this.storage.create(key, value);
    this.hookManager.trigger("create", key, value);
    return result;
  }

  /**
   * Read the value associated with a key
   * @param key - The key to read
   */
  read(key: string) {
    const result = this.storage.read(key);
    this.hookManager.trigger("read", key, result);
    return result;
  }

  /**
   * Update the value associated with a key
   * @param key - The key to update
   * @param value - The new value to associate with the key
   */

  update(key: string, value: T) {
    const oldValue = this.storage.read(key);
    const result = this.storage.update(key, value);
    this.hookManager.trigger("update", key, oldValue, value);
    return result;
  }

  /**
   * Delete a key-value pair
   * @param key - The key to delete
   */
  delete(key: string) {
    const oldValue = this.storage.read(key);
    const result = this.storage.delete(key);
    this.hookManager.trigger("delete", key, oldValue);
    return result;
  }

  /**
   * Upsert a key-value pair (try to update, otherwise create)
   * @param key - The key to upsert
   * @param value - The value to associate with the key
   */
  upsert(key: string, value: T) {
    const exists = this.storage.has(key);
    const oldValue = exists ? this.storage.read(key) : undefined;
    const result = this.storage.upsert(key, value);
    this.hookManager.trigger(
      exists ? "update" : "create",
      key,
      oldValue,
      value
    );
    return result;
  }

  /**
   * Check if a key exists
   * @param key - The key to check
   */
  has(key: string) {
    return this.storage.has(key);
  }

  /**
   * Get the number of key-value pairs
   */
  size() {
    return this.storage.size();
  }

  /**
   * Remove all key-value pairs
   */
  clear() {
    return this.storage.clear();
  }

  /**
   * Get the values of all key-value pairs
   */
  values() {
    return this.storage.values();
  }

  /**
   * Get the keys of all key-value pairs
   */
  keys() {
    return this.storage.keys();
  }

  /**
   * Get all key-value pairs
   */
  entries() {
    return this.storage.entries();
  }
}
