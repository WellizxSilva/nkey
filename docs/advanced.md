# Advanced Usage

This section covers advanced scenarios when working with Nkey.

---

## Default Storage

You can provide a **default storage** to Nkey.  
This storage will be used automatically by collections that don’t specify their own.

```ts
import { Nkey, FileStorage } from "nkey";

interface User {
  id: string;
  name: string;
}

const db = new Nkey<User>(new FileStorage<User>("./default.json"));

// Any collection without explicit storage will fallback to this default
const users = db.collection<User>("users");
users.create("user:1", { id: "1", name: "Wellizx" });
```

### Multiple Collections with Different Storages

You can mix and match storages for different collections:

```ts
import { Nkey, FileStorage, MemoryStorage } from "nkey";

interface User {
  id: string;
  name: string;
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

const db = new Nkey<unknown, Collections>();

const users = db.collection("users", new FileStorage<User>("database/users.json"));
const products = db.collection("products", new MemoryStorage<Product>());

users.create("user:1", { id: "1", name: "Wellizx" });
products.create("product:1", { id: "1", name: "Laptop", price: 2000 });
``` 