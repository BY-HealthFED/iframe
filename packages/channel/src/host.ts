/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { Channel } from './channel';
import { createRegexp } from './whitelist';

interface HostConfig {
  allowedOrigins?: string[];
  target?: string | HTMLElement;
  autoHeight?: boolean;
}

class Host {
  private _channel: Channel;
  private _allowedOrigins: RegExp;
  private _target: HTMLElement;
  private _iframe?: HTMLIFrameElement;

  public get iframe() {
    return this._iframe;
  }

  constructor(config?: HostConfig) {
    this._channel = new Channel(this._sendMessage);
    this._allowedOrigins = createRegexp(config?.allowedOrigins || []);
    this._target = this._findTargetElement(config?.target);

    if (config?.autoHeight) {
      this._autoHeight();
    }
  }

  private _findTargetElement(target?: string | HTMLElement) {
    if (typeof target === 'string') {
      return document.querySelector(target) as HTMLElement;
    } else if (target instanceof HTMLElement) {
      return target;
    } else {
      return document.body;
    }
  }

  private _autoHeight() {
    this._channel.on('resize', ({ height }: { height: number }) => {
      this._iframe?.setAttribute('height', `${height}px`);
    });
  }

  private _sendMessage = (message: string) => {
    this._iframe?.contentWindow?.postMessage(message, '*');
  };

  private _receiveMessage = (event: MessageEvent) => {
    if (!this._allowedOrigins.test(event.origin)) {
      return;
    }

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

  public on(event: string, fn: (...args: any[]) => void, context?: any) {
    this._channel.on(event, fn, context);
  }

  public once(event: string, fn: (...args: any[]) => void, context?: any) {
    this._channel.on(event, fn, context);
  }

  public off(event: string, fn: (...args: any[]) => void, context?: any) {
    this._channel.off(event, fn, context);
  }

  public emit(event: string, data?: any) {
    this._channel.send(event, data);
  }
}

export { Host };
