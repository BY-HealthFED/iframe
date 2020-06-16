/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { Socket } from './socket';

export const enum MsgType {
  SYN = 0,
  SYN_ACK = 1,
  ACK = 2,
  FIN = 3,

  PING = 5,
  PONG = 6,

  EVENT = 8,
  DATA_SEND = 9,
  DATA_RECEIVE = 10,
}

export class Message {
  public sender: string;
  public receiver: string | null;
  public type: MsgType;
  public payload?: any;

  constructor(sender: string, receiver: string | null, type: MsgType, payload?: any) {
    this.sender = sender;
    this.receiver = receiver;
    this.type = type;
    this.payload = payload;
  }

  public checkSign(socket: Socket) {
    if (this.type === MsgType.SYN && this.receiver === null) {
      return true;
    }

    if (this.receiver === socket.id) {
      return true;
    }

    return false;
  }

  public toString() {
    return JSON.stringify({ sender: this.sender, receiver: this.receiver, type: this.type, payload: this.payload });
  }

  public static parse(raw: string) {
    try {
      const [sender, receiver, type, payload] = JSON.parse(raw);
      return new Message(sender, receiver, type, payload);
    } catch (error) {
      return null;
    }
  }

  public static serialize({ sender, receiver, type, payload }: Message) {
    return JSON.stringify([sender, receiver, type, payload]);
  }
}

export class MessageBuilder {
  public socket: Socket;

  constructor(sender: Socket) {
    this.socket = sender;
  }

  public SYN() {
    return new Message(this.socket.id, null, MsgType.SYN);
  }
  public SYN_ACK(remote: string) {
    return new Message(this.socket.id, remote, MsgType.SYN_ACK);
  }
  public ACK(remote: string) {
    return new Message(this.socket.id, remote, MsgType.ACK);
  }
  public FIN() {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.FIN);
  }

  public PING() {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.PING);
  }
  public PONG() {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.PONG);
  }

  public EVENT(event: string, ...args: any[]) {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.EVENT, { event, args });
  }

  public DATA_SEND(seq: number, data: any) {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.DATA_SEND, { seq, data });
  }
  public DATA_RECEIVE(seq: number, data: any) {
    return new Message(this.socket.id, this.socket.remote!.id, MsgType.DATA_RECEIVE, { seq, data });
  }
}
