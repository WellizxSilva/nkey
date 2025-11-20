# Key-Value Usage

Nkey can be used as a simple **typed key-value store**.  
This mode is ideal when you only need one logical table and want direct CRUD operations with type inference.

---

### Basic Example (In-Memory)

```ts
import { Nkey, MemoryStorage } from "nkey";

interface User {
  name: string;
  age: number;
}

const db = new Nkey<User>(new MemoryStorage<User>());

db.create("user:1", { name: "Wellizx", age: 25 });

const user = db.read("user:1");
// user: User | undefined
console.log(user?.name); // "Wellizx"
```

### File-Based Persistence (JSON)

```ts
import { Nkey, FileStorage } from "nkey";

interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

const db = new Nkey<User>(new FileStorage<User>("./users.json"));

// Create
db.create("user:1", {
  id: "1",
  name: "Wellizx",
  email: "wellizx@example.com",
  active: true,
});

// Read
const user = db.read("user:1");
console.log(user?.email); // "wellizx@example.com"

// Update
db.update("user:1", {
  id: "1",
  name: "Wellizx",
  email: "new@example.com",
  active: true,
});

// Delete
db.delete("user:1");
```
