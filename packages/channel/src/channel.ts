/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import EventEmitter from 'eventemitter3';
import { v4 as uuid } from 'uuid';
import { Message, MessageType, BROADCAST_ADDR } from './message';

type Sender = (msg: string) => void;

class Channel {
  private _channelId: string;
  private _remoteId?: string;
  private _emitter: EventEmitter;
  private _sender: Sender;

  constructor(sender: Sender) {
    this._channelId = uuid();
    this._emitter = new EventEmitter();
    this._sender = sender;
  }

  private _sendMessage = (receiver: string, type: MessageType, data?: any) => {
    const message = new Message(this._channelId, receiver, type, data);
    this._sender(message.serialize());
  };

  public receiveMessage = (raw: any) => {
    if (typeof raw !== 'string') {
      return;
    }

    try {
      const message = Message.parse(raw);
      if (!message.valid(this._channelId)) {
        return;
      }

      switch (message.type) {
        case MessageType.SYN:
          this._sendMessage(message.sender, MessageType.SYN_ACK);
          break;

        case MessageType.SYN_ACK:
          this._sendMessage(message.sender, MessageType.ACK);
          this._remoteId = message.sender;
          this._emitter.emit('ready', this._remoteId);
          break;

        case MessageType.ACK:
          this._remoteId = message.sender;
          this._emitter.emit('ready', this._remoteId);
          break;

        case MessageType.FIN:
          this._emitter.emit('disconnected', this._remoteId);
          this._remoteId = undefined;
          break;

        case MessageType.EVENT:
          const { event, data } = message.data;
          this._emitter.emit(event, data);
          break;

        default:
          console.warn('Invalid message type.');
          break;
      }
    } catch (error) {}
  };

  public connect() {
    if (this._remoteId) {
      throw new Error('The connection is ready.');
    }
    this._sendMessage(BROADCAST_ADDR, MessageType.SYN);
  }

  public disconnect() {
    if (!this._remoteId) {
      throw new Error('The connection is not ready.');
    }
    this._sendMessage(this._remoteId, MessageType.FIN);
    this._remoteId = undefined;
  }

  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this._emitter.on(event, fn, context);
  }

  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this._emitter.off(event, fn, context);
  }

  public emit(event: string, data?: any) {
    if (!this._remoteId) {
      throw new Error('The connection is not ready.');
    }
    this._sendMessage(this._remoteId, MessageType.EVENT, { event, data });
  }
}

export { Channel };
