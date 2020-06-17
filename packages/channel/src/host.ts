/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { Channel, ChannelConfig } from './channel';
import { Message } from './message';

interface HostConfig extends ChannelConfig {}

export class Host extends Channel {
  public iframe?: HTMLIFrameElement;

  constructor(config: HostConfig = {}) {
    super(config);
  }

  protected postMessage(message: Message) {
    this.iframe?.contentWindow?.postMessage(message.serialize(), '*');
  }

  public open(url: string) {}

  public close() {}
}
