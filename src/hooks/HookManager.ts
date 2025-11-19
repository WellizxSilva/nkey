import { HookEvent, HookCallback, HookEventMap } from "./types";

export class HookManager<T> {
  private hooks: { [K in HookEvent]?: HookEventMap<T>[K][] } = {};

  on<E extends HookEvent>(event: E, callback: HookCallback<T, E>) {
    if (!this.hooks[event]) {
      this.hooks[event] = [];
    }
    this.hooks[event]!.push(callback);
  }

  trigger<E extends HookEvent>(
    event: E,
    ...args: Parameters<HookEventMap<T>[E]>
  ): void {
    const callbacks = this.hooks[event];
    if (callbacks) {
      for (const cb of callbacks) {
        (cb as (...p: Parameters<HookEventMap<T>[E]>) => void)(...args);
      }
    }
  }
}
