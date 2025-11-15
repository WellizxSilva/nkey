export interface IStorage<T> {
  create(key: string, value: T): boolean;
  read(key: string): T | undefined;
  update(key: string, value: T): boolean;
  delete(key: string): boolean;
  has(key: string): boolean;
  size(): number;
  clear(): void;
  values(): T[];
  keys(): string[];
  entries(): [string, T][];
}
