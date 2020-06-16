/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { Socket } from './internal/socket';

class Host {
  private _socket: Socket;

  constructor() {
    this._socket = new Socket();
  }

  public open(url: string) {}
  public listen(iframe: HTMLIFrameElement) {}
  public close() {}

  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this._socket.on(event, fn, context);
    return this;
  }
  public once(event: string, fn: (...args: any[]) => void, context?: any) {
    this._socket.once(event, fn, context);
    return this;
  }
  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this._socket.off(event, fn, context);
    return this;
  }
  public emit(event: string, ...args: any[]) {
    this._socket.emit(event, ...args);
  }

  // public send<T>(): Promise<T> {}
}

export { Host };
