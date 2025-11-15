import { Nkey, MemoryStorage } from "./src";

//Type example

type User = { name: string; age: number };

// Create a new database instance using in-memory storage
const db = new Nkey<User>(new MemoryStorage<User>());

// Create entries
db.create("user:1", { name: "Wellizx", age: 25 });
db.create("user:2", { name: "John", age: 30 });

// Read entry
console.log(db.read("user:1"));
// Output: { name: "Wellizx", age: 25 }

// Update entry
db.update("user:1", { name: "Wellizx", age: 26 });
console.log(db.read("user:1"));
// Output: { name: "Wellizx", age: 26 }

// Delete entry
db.delete("user:2");
console.log(db.read("user:2"));
// Output: undefined

// Inspect database
console.log(db.keys()); // ["user:1"]
console.log(db.entries()); // [["user:1", { name: "Wellizx", age: 26 }]]
console.log(db.size()); // 1
