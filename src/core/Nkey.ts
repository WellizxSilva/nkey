import { IStorage } from "./storage/IStorage";

/**
 * ---
 * Nkey
 * ---
 * ___Data structure for storing key-value pairs___
 */

export class Nkey<T> {
  private storage: IStorage<T>;

  /** Storage instance: Adapter (eg. FileStorage) */
  constructor(storage: IStorage<T>) {
    this.storage = storage;
  }

  /**
   * Create a new key-value pair
   * @param key - The key to create
   * @param value - The value to associate with the key
   */
  create(key: string, value: T) {
    return this.storage.create(key, value);
  }

  /**
   * Read the value associated with a key
   * @param key - The key to read
   */
  read(key: string) {
    return this.storage.read(key);
  }

  /**
   * Update the value associated with a key
   * @param key - The key to update
   * @param value - The new value to associate with the key
   */

  update(key: string, value: T) {
    return this.storage.update(key, value);
  }

  /**
   * Delete a key-value pair
   * @param key - The key to delete
   */
  delete(key: string) {
    return this.storage.delete(key);
  }

  /**
   * Upsert a key-value pair (try to update, otherwise create)
   * @param key - The key to upsert
   * @param value - The value to associate with the key
   */
  upsert(key: string, value: T) {
    return this.storage.upsert(key, value);
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
