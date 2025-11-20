# Storages

Storages are pluggable backends that implement the `IStorage<T>` interface.  
They define how data is persisted and retrieved in Nkey.

---

## Available Storages

### 1. MemoryStorage

- In-memory key-value store
- Fast and lightweight
- Data is lost when the process ends

```ts
import { Nkey, MemoryStorage } from "nkey";

interface User {
  name: string;
  age: number;
}

const db = new Nkey<User>(new MemoryStorage<User>());
db.create("user:1", { name: "Wellizx", age: 25 });
console.log(db.read("user:1"));
```

### 2. FileStorage

- Persists data in a JSON file
- Suitable for small projects and fast prototyping

```ts
import { Nkey, FileStorage } from "nkey";

interface User {
  id: string;
  name: string;
  email: string;
}

const db = new Nkey<User>(new FileStorage<User>("./users.json"));
db.create("user:1", { id: "1", name: "Wellizx", email: "wellizx@example.com" });
console.log(db.read("user:1"));
```

### Implementing a Custom Storage

To create a custom storage, implement the `IStorage<T>` interface:

```ts
import { IStorage } from "nkey";

class CustomStorage<T> implements IStorage<T> {
  create(key: string, value: T): boolean { /* ... */ }
  read(key: string): T | undefined { /* ... */ }
  update(key: string, value: T): boolean { /* ... */ }
  delete(key: string): boolean { /* ... */ }
  upsert(key: string, value: T): boolean { /* ... */ }
  has(key: string): boolean { /* ... */ }
  size(): number { /* ... */ }
  clear(): void { /* ... */ }
  values(): T[] { /* ... */ }
  keys(): string[] { /* ... */ }
  entries(): [string, T][] { /* ... */ }
}
```
