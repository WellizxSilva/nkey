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

```sh
npm install git+https://github.com/WellizxSilva/nkey.git
# using yarn
yarn add https://github.com/WellizxSilva/nkey.git
```

## Documentation

Usage examples are avaiable on the [docs](./docs) folder

- [Getting Started](./docs/getting-started.md)
- [Key-Value](./docs/key-value.md)
- [Collections](./docs/collections.md)
- [Storage](./docs/storage.md)
- [Hooks](./docs/hooks.md)
- [Advanced](./docs/advanced.md)

## 🧪 Testing

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
