# Hooks

Hooks allow you to react to lifecycle events in Nkey.  
They are useful for logging or triggering side effects whenever data changes.

---

## Supported Events

- `create` → fired when a new entry is created
- `read` → fired when an entry is read
- `update` → fired when an entry is updated
- `delete` → fired when an entry is deleted
- `upsert` → fired when an entry is created or updated

---

## Example: Logging Updates

```ts
import { Nkey, MemoryStorage } from "nkey";

interface User {
  id: string;
  name: string;
  email: string;
}

const db = new Nkey<User>(new MemoryStorage<User>());

// Attach a hook
db.on("update", (key, oldValue, newValue) => {
  console.log(`Updated ${key}:`, oldValue, "→", newValue);
});

// Create and update
db.create("user:1", { id: "1", name: "Wellizx", email: "wellizx@example.com" });
db.update("user:1", { id: "1", name: "Wellizx", email: "new@example.com" });
```
## Example: Auditing Deletes

```ts
db.on("delete", (key, value) => {
  console.log(`Deleted ${key}:`, value);
});

db.delete("user:1");
```

## Example: Using Hooks in Collections

Hooks also work inside collections:

```ts
interface Collections {
  users: User;
}

const db = new Nkey<unknown, Collections>();
const users = db.collection("users", new MemoryStorage<User>());

users.on("create", (key, value) => {
  console.log(`New user created: ${key}`, value);
});

users.create("user:2", { id: "2", name: "John", email: "john@example.com" });
```

