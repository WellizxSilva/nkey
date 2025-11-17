import { Nkey, FileStorage } from "./src";

type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  active: boolean;
};

const db = new Nkey<User>(new FileStorage<User>("./users.json"));

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
db.create("user:3", {
  id: "3",
  name: "Foo",
  age: 22,
  email: "foo@example.com",
  active: false,
});

console.log("User 1:", db.read("user:1"));

const user2 = db.read("user:2");
if (user2 && user2.age > 28) {
  db.update("user:2", { ...user2, active: false });
}
console.log("User 2 updated:", db.read("user:2"));

db.delete("user:3");
console.log("User 3:", db.read("user:3")); // undefined

const activeUsers = db.values().filter((u) => u.active);
console.log("Active users:", activeUsers);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const olderUsers = db.entries().filter(([_, u]) => u.age > 24);
console.log("Users older than 24:", olderUsers);

// Email Export
const emails = db.values().map((u) => u.email);
console.log("Emails:", emails);

// Inspection
console.log("Keys:", db.keys());
console.log("Entries:", db.entries());
console.log("Size:", db.size());
