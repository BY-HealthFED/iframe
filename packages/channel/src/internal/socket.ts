/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import EventEmitter from 'eventemitter3';
import { Message, MessageBuilder, MsgType } from './message';
import { getRandomId } from './utils';

export class Socket {
  public id: string;
  public remote: {
    id: string | null;
  };

  private _emitter: EventEmitter;
  private _builder: MessageBuilder;

  constructor() {
    this.id = getRandomId();

    this._emitter = new EventEmitter();
    this._builder = new MessageBuilder(this);
  }

  public postMessage(message: Message) {}

  public handleMessage(raw: string) {
    if (typeof raw !== 'string') {
      return;
    }

    const message = Message.parse(raw);
    if (!message || message.checkSign(this)) {
      return;
    }

    switch (message.type) {
      // Host
      case MsgType.ACK:
        break;
      case MsgType.SYN:
        break;

      // Client
      case MsgType.SYN_ACK:
        break;

      // Host & Client
      case MsgType.FIN:
        break;

      // Keepalive
      case MsgType.PING:
        break;
      case MsgType.PONG:
        break;

      // Event
      case MsgType.EVENT:
        const { event, args } = message.payload;
        this._emitter.emit(event, ...args);
        break;

      // Data segment
      case MsgType.DATA_SEND:
        break;
      case MsgType.DATA_RECEIVE:
        break;

      default:
        console.error('Invalid message type: ' + JSON.stringify(message));
        break;
    }
  }

  public connect() {
    this.postMessage(this._builder.SYN());
  }

  public disconnect() {
    this.postMessage(this._builder.FIN());
  }

  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this._emitter.on(event, fn, context);
  }
  public once(event: string, fn: (...args: any[]) => void, context?: any) {
    this._emitter.once(event, fn, context);
  }
  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this._emitter.off(event, fn, context);
  }
  public emit(event: string, ...args: any[]) {
    this.postMessage(this._builder.EVENT(event, ...args));
  }
}
