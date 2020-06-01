/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { Channel } from './channel';

interface ClientConfig {}

class Client {
  private _channel: Channel;
  private _targetWindow: Window;

  constructor(config: ClientConfig) {
    this._channel = new Channel(this._sendMessage);
    this._targetWindow = this._findParentWindow();
  }

  private _findParentWindow() {
    if (window.parent !== window) {
      return window.parent;
    } else if (window.opener) {
      return window.opener;
    }
  }

  private _sendMessage = (message: string) => {
    this._targetWindow.postMessage(message, '*');
  };

  private _receiveMessage = (event: MessageEvent) => {
    this._channel.receiveMessage(event.data);
  };

  public connect() {
    window.addEventListener('message', this._receiveMessage);
    this._channel.connect();
  }

  public disconnect() {
    window.removeEventListener('message', this._receiveMessage);
    this._channel.disconnect();
  }

  public on(event: 'ready', fn: () => void): void;
  public on(event: string, fn: (...args: any[]) => void, context?: any): void;
  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this._channel.on(event, fn, context);
  }

  public off(event: 'ready', fn: () => void): void;
  public off(event: string, fn: (...args: any[]) => void, context?: any): void;
  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this._channel.off(event, fn, context);
  }

  public emit(event: 'ready'): void;
  public emit(event: string, data?: any): void;
  public emit(event: string, data?: any) {
    this._channel.emit(event, data);
  }
}

export { Client };
