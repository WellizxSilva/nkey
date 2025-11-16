import { describe, it, expect } from "vitest";
import { FileStorage, KeyAlreadyExistsError, KeyNotFoundError } from "../src";

type User = { name: string; age: number };

describe("FileStorage<User>", () => {
  const filePath = "./test-db.json";

  it("should create and read a value", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    storage.create("user:1", { name: "Wellizx", age: 25 });
    expect(storage.read("user:1")).toEqual({ name: "Wellizx", age: 25 });
  });

  it("should throw error when creating duplicate key", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    storage.create("user:1", { name: "Wellizx", age: 25 });
    expect(() => storage.create("user:1", { name: "John", age: 30 })).toThrow(
      KeyAlreadyExistsError
    );
  });

  it("should update existing value", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.update("user:1", { name: "Wellizx", age: 26 });
    expect(storage.read("user:1")).toEqual({ name: "Wellizx", age: 26 });
  });

  it("should throw error when updating non-existent key", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    expect(() => storage.update("user:99", { name: "X", age: 0 })).toThrow(
      KeyNotFoundError
    );
  });

  it("should delete existing key", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    storage.create("user:1", { name: "Wellizx", age: 25 });
    storage.delete("user:1");
    expect(storage.read("user:1")).toBeUndefined();
  });

  it("should upsert values correctly", () => {
    const storage = new FileStorage<User>(filePath);
    storage.clear();

    // creates
    storage.upsert("user:1", { name: "Wellizx", age: 25 });
    expect(storage.read("user:1")).toEqual({ name: "Wellizx", age: 25 });

    // updates
    storage.upsert("user:1", { name: "Wellizx", age: 26 });
    expect(storage.read("user:1")).toEqual({ name: "Wellizx", age: 26 });
  });
});
