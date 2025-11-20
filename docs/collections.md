# Collections

Collections allow you to organize multiple logical tables inside a single Nkey instance.  
This is useful when you want to separate different entities (e.g., `users`, `products`) but still use the same API.

---

### Manual Typing per Collection

You can manually type each collection when creating it:

```ts
import { Nkey, FileStorage } from "nkey";

interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

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
  email: "wellizx@example.com",
  active: true,
});

// Products collection
const products = db.collection<Product>(
  "products",
  new FileStorage<Product>(`${basePath}/products.json`)
);
products.create("product:1", { id: "1", name: "Laptop", price: 2000 });

console.log(users.read("user:1"));
console.log(products.read("product:1"));
```

### Automatic Typing with a Collections Map

You can define a map of collections to get automatic type inference:

```ts
interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Collections {
  users: User;
  products: Product;
}

// Explicit `unknown` ensures correct inference
const db = new Nkey<unknown, Collections>();

const users = db.collection(
  "users",
  new FileStorage<User>("database/users.json")
);
const products = db.collection(
  "products",
  new FileStorage<Product>("database/products.json")
);

users.create("user:1", {
  id: "1",
  name: "Wellizx",
  email: "wellizx@example.com",
  active: true,
});
products.create("product:1", { id: "1", name: "Phone", price: 1500 });

console.log(users.read("user:1")); // User | undefined
console.log(products.read("product:1")); // Product | undefined
```

### Why unknown?

When using Nkey in collections mode, you must pass unknown as the first generic parameter:

```ts
const db = new Nkey<unknown, Collections>();
```

> This explicit unknown ensures that TypeScript correctly distinguishes between key-value mode and collections mode, preserving type inference for each collection.
