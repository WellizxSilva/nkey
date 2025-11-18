import { Nkey, FileStorage } from "./src";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  active: boolean;
};
type Product = { id: string; name: string; price: number };

const db = new Nkey();
const basePath = "database";
// Users collection
const users = db.collection<User>(
  "users",
  new FileStorage<User>(`${basePath}/users.json`)
);
users.create("user:1", {
  id: "1",
  name: "Wellizx",
  age: 25,
  email: "wellizx@example.com",
  active: true,
});

// Products collection
const products = db.collection<Product>(
  "products",
  new FileStorage<Product>(`${basePath}/products.json`)
);
products.create("product:1", { id: "1", name: "Laptop", price: 2000 });

// Queries
console.log(users.read("user:1"));
// Output: { id: "1", name: "Wellizx", age: 25, email: "wellizx@example.com", active: true }

console.log(products.read("product:1"));
// Output: { id: "1", name: "Laptop", price: 2000 }
