import { DatabaseError } from "./DatabaseError";

export class NoStorageProvidedError extends DatabaseError {
  constructor() {
    super("NO STORAGE PROVIDED!");
    this.name = "Nkey NoStorageProvidedError";
  }
}
