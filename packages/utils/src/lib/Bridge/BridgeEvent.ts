export enum HostEventType {
  Initialize = 'initialize',
  ContentRequested = 'contentRequested',
}

export enum GuestEventType {
  Ready = 'ready',
  ContentProvided = 'contentProvided',
}

type HostEvent =
  | {
      type: HostEventType.Initialize;
      title: string;
      content: string;
    }
  | {
      type: HostEventType.ContentRequested;
    };

type GuestEvent =
  | {
      type: GuestEventType.Ready;
    }
  | {
      type: GuestEventType.ContentProvided;
      content: string;
    };

export type BridgeEvent = HostEvent | GuestEvent;

export type BridgeEventType = BridgeEvent['type'];

export const isBridgeEvent = (data: unknown): data is BridgeEvent => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return [
    HostEventType.Initialize,
    HostEventType.ContentRequested,
    GuestEventType.Ready,
    GuestEventType.ContentProvided,
  ].includes((data as BridgeEvent).type);
};
