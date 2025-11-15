import { describe, it, expect } from "vitest";
import { Nkey } from "../src/core/Nkey";
import { MemoryStorage } from "../src/core/storage/MemoryStorage";

type User = {
  name: string;
  age?: number;
};

describe("Nkey<User> with MemoryStorage<User>", () => {
  it("should dispatch to memory", () => {
    const db = new Nkey<User>(new MemoryStorage<User>());
    db.create("user:1", { name: "Wellizx" });
    expect(db.read("user:1")).toEqual({ name: "Wellizx" });
  });
});
