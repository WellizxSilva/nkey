import { DatabaseError } from "./DatabaseError";

export class KeyNotFoundError extends DatabaseError {
  constructor(key: string) {
    super(`Key "${key}" not found`);
    this.name = "Nkey KeyNotFoundError";
  }
}
