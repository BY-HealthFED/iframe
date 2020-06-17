/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import EventEmitter from 'eventemitter3';
import { Message, MessageType } from './message';
import { createAllowedOrigins } from './mixins';

export interface ChannelConfig {
  allowedOrigins?: string[];
}

export abstract class Channel {
  protected emitter: EventEmitter<string>;
  protected allowedOrigins: { test(text: string): boolean };

  constructor(config: ChannelConfig = {}) {
    this.emitter = new EventEmitter<string>();
    this.allowedOrigins = createAllowedOrigins(config.allowedOrigins);
  }

  protected abstract postMessage(message: Message): void;

  protected handleMessage(event: MessageEvent) {
    if (!this.allowedOrigins.test(event.origin)) {
      return;
    }

    const message = Message.parse(event.data);
    if (!message) {
      return;
    }

    const { sender, type, payload } = message;
    switch (type) {
      case MessageType.SYN:
        break;
      case MessageType.ACK:
        break;
      case MessageType.SYN_ACK:
        break;
      case MessageType.FIN:
        break;

      case MessageType.PING:
        break;
      case MessageType.PONG:
        break;

      case MessageType.EVENT:
        const [event, ...args] = payload;
        this.emitter.emit(event, ...args);
        break;
      case MessageType.DATA:
        break;
      case MessageType.DATA_RECEIVE:
        break;

      default:
        break;
    }
  }

  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this.emitter.on(event, fn, context);
    return this;
  }

  public once(event: string, fn: (...args: any[]) => void, context?: any) {
    this.emitter.once(event, fn, context);
    return this;
  }

  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this.emitter.off(event, fn, context);
    return this;
  }

  public emit(event: string, ...args: any[]) {}
}
