<div align="center">
    <h3>Nkey - Experimental Lightweight Database</h3>

![Build Status](https://img.shields.io/github/actions/workflow/status/WellizxSilva/nkey/ci.yml?branch=main)
![Tests](https://img.shields.io/github/actions/workflow/status/WellizxSilva/nkey/test.yml?label=tests)
![Coverage](https://img.shields.io/codecov/c/github/WellizxSilva/nkey)
![License](https://img.shields.io/github/license/WellizxSilva/nkey)
![Version](https://img.shields.io/github/package-json/v/WellizxSilva/nkey/main)
![Issues](https://img.shields.io/github/issues/WellizxSilva/nkey)

</div>

**Nkey** is an experimental database project designed to explore data structures such as key-value stores and trees. It starts simple, with fast in-memory CRUD operations, and will evolve to support hierarchies, indexes, and persistence layers.

## Features

Lightweight in-memory storage

Fast CRUD operations (Create, Read, Update, Delete)

Key-Value model as the foundation

Planned support for:

Tree-based structures (BST, B-Tree)

Indexes for faster queries

Optional persistence layer (e.g., JSON storage)

## 📦 Installation

Clone the repository:

```sh
git clone https://github.com/WellizxSilva/nkey.git
cd nkey
```

## 🛠 Usage

In-Memory Usage

```ts
import { Nkey, MemoryStorage } from "./src";

type User = { name: string; age: number };
const db = new Nkey<User>(new MemoryStorage<User>());

db.create("user:1", { name: "Wellizx", age: 25 });
console.log(db.read("user:1"));
// Output: { name: "Wellizx", age: 25 }
```

File-Based Storage (JSON persistence)

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

🔜 Tree structures (BST, B-Tree)

🔜 Indexes for optimized queries

🔜 Fluent API for chaining operations

## 📖 License

This repository is intended for study, experimentation, and learning purposes. Feel free to explore, fork, and contribute.
