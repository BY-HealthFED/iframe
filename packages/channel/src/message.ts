/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export const enum MessageType {
  SYN = 0,
  SYN_ACK = 1,
  ACK = 2,
  FIN = 3,

  PING = 5,
  PONG = 6,

  EVENT = 8,
  DATA = 9,
  DATA_RECEIVE = 10,
}

export class Message {
  constructor(public sender: string, public receiver: string, public type: MessageType, public payload?: any) {}

  public serialize() {
    return Message.serialize(this);
  }

  public toString() {
    return JSON.stringify({
      sender: this.sender,
      receiver: this.receiver,
      type: this.type,
      payload: this.payload,
    });
  }

  public static parse(text: string) {
    try {
      const [sender, receiver, type, payload] = JSON.parse(text);
      if (!sender) return null;
      if (typeof type !== 'number') return null;
      return new Message(sender, receiver, type, payload);
    } catch (error) {
      return null;
    }
  }

  public static serialize(message: Message) {
    const { sender, receiver, type, payload } = message;
    return JSON.stringify([sender, receiver, type, payload]);
  }
}

export class MessageBuilder {}
