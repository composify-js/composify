import { type BridgeEventType, type BridgeEvent, isBridgeEvent } from './BridgeEvent';

export type BridgeEventHandler<Event extends BridgeEvent = BridgeEvent> = (event: Event) => void;

export class Bridge {
  private readonly target: Window;
  private readonly origin: string;
  private readonly abort = new AbortController();

  private listeners = new Map<BridgeEventType, Set<BridgeEventHandler>>();

  public constructor(target: Window, origin = '*') {
    this.target = target;
    this.origin = origin;

    window.addEventListener('message', this.handle.bind(this), {
      signal: this.abort.signal,
    });
  }

  public emit(event: BridgeEvent) {
    this.target.postMessage(event, this.origin);
  }

  public addListener<EventType extends BridgeEventType>(
    type: EventType,
    listener: BridgeEventHandler<Extract<BridgeEvent, { type: EventType }>>
  ) {
    const listeners = this.listeners.get(type) ?? new Set();

    listeners.add(listener as BridgeEventHandler);
    this.listeners.set(type, listeners);
  }

  public dispose() {
    this.abort.abort();
    this.listeners.forEach(listeners => listeners.clear());
    this.listeners.clear();
  }

  private handle(message: MessageEvent) {
    if (message.source !== this.target) {
      return;
    }

    if (this.origin !== '*' && message.origin !== this.origin) {
      return;
    }

    if (!isBridgeEvent(message.data)) {
      return;
    }

    const event = message.data;
    const listeners = this.listeners.get(event.type);

    listeners?.forEach(listener => {
      try {
        listener(event);
      } catch (error: unknown) {
        console.error(error);
      }
    });
  }
}
