/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { Channel } from './channel';

interface HostConfig {
  target?: string | HTMLElement;
}

class Host {
  private _channel: Channel;
  private _target: HTMLElement;
  private _iframe?: HTMLIFrameElement;

  public get iframe() {
    return this._iframe;
  }

  constructor(config: HostConfig) {
    this._channel = new Channel(this._sendMessage);

    if (typeof config.target === 'string') {
      this._target = document.querySelector(config.target) as HTMLElement;
    } else if (config.target instanceof HTMLElement) {
      this._target = config.target;
    } else {
      this._target = document.body;
    }
  }

  private _sendMessage = (message: string) => {
    this._iframe?.contentWindow?.postMessage(message, '*');
  };

  private _receiveMessage = (event: MessageEvent) => {
    this._channel.receiveMessage(event.data);
  };

  public open(url: string, attrs?: any) {
    if (!this._iframe) {
      this._iframe = document.createElement('iframe');
      this._target.appendChild(this._iframe);
      window.addEventListener('message', this._receiveMessage);
    }

    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        this._iframe?.setAttribute(key, attrs[key]);
      });
    }

    this._iframe.src = url;
  }

  public close() {
    if (this._iframe) {
      window.removeEventListener('message', this._receiveMessage);
      this._target.removeChild(this._iframe);
      this._iframe = undefined;
    }
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

export { Host };
