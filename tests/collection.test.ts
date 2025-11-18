import { describe, it, expect } from "vitest";
import { Nkey, FileStorage } from "../src";

type User = { id: string; name: string; age: number };
type Product = { id: string; name: string; price: number };

describe("Nkey Collections", () => {
  it("should handle multiple collections independently", () => {
    const db = new Nkey();

    const users = db.collection<User>(
      "users",
      new FileStorage<User>("./users.json")
    );
    const products = db.collection<Product>(
      "products",
      new FileStorage<Product>("./products.json")
    );

    // Users collection
    users.clear();
    users.create("user:1", { id: "1", name: "Wellizx", age: 25 });
    users.create("user:2", { id: "2", name: "John", age: 30 });

    // Products collection
    products.clear();
    products.create("product:1", { id: "1", name: "Laptop", price: 2000 });
    products.create("product:2", { id: "2", name: "Phone", price: 1200 });

    // Assertions
    expect(users.read("user:1")).toEqual({ id: "1", name: "Wellizx", age: 25 });
    expect(users.read("user:2")).toEqual({ id: "2", name: "John", age: 30 });

    expect(products.read("product:1")).toEqual({
      id: "1",
      name: "Laptop",
      price: 2000,
    });
    expect(products.read("product:2")).toEqual({
      id: "2",
      name: "Phone",
      price: 1200,
    });

    // Ensure collections are independent
    expect(users.read("product:1")).toBeUndefined();
    expect(products.read("user:1")).toBeUndefined();
  });
});
