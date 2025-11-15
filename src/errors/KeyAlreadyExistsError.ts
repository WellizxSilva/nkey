import { DatabaseError } from "./DatabaseError";

export class KeyAlreadyExistsError extends DatabaseError {
  constructor(key: string) {
    super(`Key "${key}" already exists`);
    this.name = "Nkey KeyAlreadyExistsError";
  }
}
