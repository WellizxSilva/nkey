export type HookEventMap<T> = {
  create: (key: string, value: T) => void;
  read: (key: string, value: T | undefined) => void;
  update: (key: string, oldValue: T | undefined, newValue: T) => void;
  delete: (key: string, oldValue: T | undefined) => void;
  upsert: (key: string, oldValue: T | undefined, newValue: T) => void;
};

export type HookEvent = keyof HookEventMap<unknown>;
export type HookCallback<T, E extends HookEvent> = HookEventMap<T>[E];
