export enum HostEventType {
  Initialize = 'initialize',
  ContentRequested = 'contentRequested',
}

export enum GuestEventType {
  Ready = 'ready',
  ContentProvided = 'contentProvided',
  SettingsClicked = 'settingsClicked',
  SaveClicked = 'saveClicked',
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
    }
  | {
      type: GuestEventType.SettingsClicked;
    }
  | {
      type: GuestEventType.SaveClicked;
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
    GuestEventType.SettingsClicked,
    GuestEventType.SaveClicked,
  ].includes((data as BridgeEvent).type);
};
