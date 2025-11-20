# Getting Started

This guide shows how to install and use Nkey.

## Installation

```sh
npm install git+https://github.com/WellizxSilva/nkey.git
# using yarn
yarn add https://github.com/WellizxSilva/nkey.git
```


### First Example

```ts
import { Nkey, MemoryStorage } from "nkey";

interface User {
  name: string;
  age: number;
}

const db = new Nkey<User>(new MemoryStorage<User>());

db.create("user:1", { name: "Wellizx", age: 25 });
console.log(db.read("user:1"));
// Output: { name: "Wellizx", age: 25 }
````

For more examples, see [key-value](./key-value.md) and [collections](collections.md).
