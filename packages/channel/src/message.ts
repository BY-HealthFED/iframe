/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

const enum MessageType {
  SYN = 0,
  SYN_ACK,
  ACK,
  FIN,
  EVENT = 8,
}

const BROADCAST_ADDR = '00000000-0000-0000-0000-000000000000';

class Message {
  private _sender: string;
  private _receiver: string;
  private _type: MessageType;
  private _data?: any;

  constructor(sender: string, receiver: string, type: MessageType, data?: any) {
    this._sender = sender;
    this._receiver = receiver;
    this._type = type;
    this._data = data;
  }

  public get sender() {
    return this._sender;
  }
  public get receiver() {
    return this._receiver;
  }
  public get type() {
    return this._type;
  }
  public get data() {
    return this._data;
  }

  public valid(receiver: string) {
    return this._receiver === receiver || this._receiver === BROADCAST_ADDR;
  }

  public serialize() {
    return JSON.stringify([this.sender, this.receiver, this.type, this.data]);
  }

  public static parse(raw: string) {
    const [sender, receiver, type, data] = JSON.parse(raw);
    return new Message(sender, receiver, type, data);
  }
  public static serialize(message: Message) {
    return message.serialize();
  }
}

export { BROADCAST_ADDR };
export { MessageType };
export { Message };
