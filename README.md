<div align="center">
    <h3>Nkey - Experimental Lightweight Database</h3>

![Build Status](https://img.shields.io/github/actions/workflow/status/WellizxSilva/nkey/ci.yml?branch=main)
![Tests](https://img.shields.io/github/actions/workflow/status/WellizxSilva/nkey/test.yml?label=tests)
![License](https://img.shields.io/github/license/WellizxSilva/nkey)
![Version](https://img.shields.io/github/package-json/v/WellizxSilva/nkey/main)
![Issues](https://img.shields.io/github/issues/WellizxSilva/nkey)

</div>

**Nkey** is an experimental database project designed to explore data structures such as key-value stores and trees. It starts simple, with fast in-memory CRUD operations, and will evolve to support hierarchies, indexes, and persistence layers.

## Features

- Lightweight in-memory storage

- File-based JSON persistence

- Fast CRUD operations (Create, Read, Update, Delete)

- Key-Value model as the foundation

- Collections support (multiple logical tables)

Planned support for:

- Tree-based structures (BST, B-Tree)

- Indexes for faster queries

- Fluent API for chaining operations

## 📦 Installation

Clone the repository:

```sh
git clone https://github.com/WellizxSilva/nkey.git
cd nkey
```

## 🛠 Usage

#### In-Memory Usage

```ts
import { Nkey, MemoryStorage } from "./src";

type User = { name: string; age: number };
const db = new Nkey<User>(new MemoryStorage<User>());

db.create("user:1", { name: "Wellizx", age: 25 });
console.log(db.read("user:1"));
// Output: { name: "Wellizx", age: 25 }
```

#### File-Based Storage (JSON persistence)

```ts
import { Nkey, FileStorage } from "./src";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  active: boolean;
};

const db = new Nkey<User>(new FileStorage<User>("./users.json"));

// Create entries
db.create("user:1", {
  id: "1",
  name: "Wellizx",
  age: 25,
  email: "wellizx@example.com",
  active: true,
});
db.create("user:2", {
  id: "2",
  name: "John",
  age: 30,
  email: "john@example.com",
  active: true,
});

// Read entry
console.log(db.read("user:1"));
// Output: { id: "1", name: "Wellizx", age: 25, email: "wellizx@example.com", active: true }

// Update entry
db.update("user:1", {
  id: "1",
  name: "Wellizx",
  age: 26,
  email: "wellizx@example.com",
  active: true,
});
console.log(db.read("user:1"));
// Output: { id: "1", name: "Wellizx", age: 26, email: "wellizx@example.com", active: true }

// Delete entry
db.delete("user:2");
console.log(db.read("user:2"));
// Output: undefined
```

#### Collections (multiple logical tables)

**You can create collections in two ways:**

- 1.Manual typing per collection

```ts
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
```

2. Automatic typing with a collections map

```ts
import { Nkey, FileStorage } from "./src";

interface User {
  id: string;
  name: string;
  age: number;
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

const db = new Nkey<Collections>();
const users = db.collection(
  "users",
  new FileStorage<User>("database/users.json")
);
const products = db.collection(
  "products",
  new FileStorage<Product>("database/products.json")
);

users.create("user:1", {
  id: "2",
  name: "wellizx",
  age: 30,
  email: "wellizx@example.com",
  active: true,
});
products.create("product:1", { id: "1", name: "Phone", price: 1500 });

console.log(users.read("user:1"));
console.log(products.read("product:1"));
```

🧪 Testing
This project uses Vitest for unit testing. Run the tests with:

```sh
npm install
npm run test
# using yarn
yarn install
yarn test
```

## 🗺 Roadmap

✅ In-memory key-value store (MemoryStorage)

✅ Error handling (KeyAlreadyExistsError, KeyNotFoundError)

✅ Unit tests with Vitest

✅ JSON-based persistence (JSONStorage)

✅ Collections support

🔜 Tree structures (BST, B-Tree)

🔜 Indexes for optimized queries

🔜 Fluent API for chaining operations

## 📖 License

This repository is intended for study, experimentation, and learning purposes. Feel free to explore, fork, and contribute.
