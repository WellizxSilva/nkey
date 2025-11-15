import { describe, it, expect } from "vitest";
import { MemoryStorage, KeyAlreadyExistsError, KeyNotFoundError } from "../src";

type User = {
  name: string;
  age: number;
};

describe("MemoryStorage<User>", () => {
  it("should create and read a value", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 20 });

    const result = storage.read("user:1");
    expect(result).toEqual({ name: "Wellizx", age: 20 });
  });

  it("should throw an error when trying to create a key that already exists", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 25 });

    expect(() => storage.create("user:1", { name: "other", age: 99 })).toThrow(
      KeyAlreadyExistsError
    );
  });

  it("should update a value that already exists", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.update("user:1", { name: "Wellizx", age: 26 });

    expect(storage.read("user:1")).toEqual({ name: "Wellizx", age: 26 });
  });

  it("should throw an error when trying to update a non-existent key", () => {
    const storage = new MemoryStorage<User>();
    expect(() => storage.update("user:99", { name: "X", age: 0 })).toThrow(
      KeyNotFoundError
    );
  });

  it("should delete an existing key", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.delete("user:1");

    expect(storage.read("user:1")).toBeUndefined();
  });

  it("should throw an error when deleting a non-existent key", () => {
    const storage = new MemoryStorage<User>();
    expect(() => storage.delete("user:99")).toThrow(KeyNotFoundError);
  });

  it("should return the keys, values and entries", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.create("user:2", { name: "John", age: 30 });

    expect(storage.keys()).toEqual(["user:1", "user:2"]);
    expect(storage.values()).toEqual([
      { name: "Wellizx", age: 25 },
      { name: "John", age: 30 },
    ]);
    expect(storage.entries()).toEqual([
      ["user:1", { name: "Wellizx", age: 25 }],
      ["user:2", { name: "John", age: 30 }],
    ]);
  });

  it("should clear the storage", () => {
    const storage = new MemoryStorage<User>();
    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.clear();

    expect(storage.size()).toBe(0);
    expect(storage.keys()).toEqual([]);
  });
});
