/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { Channel, ChannelConfig } from './channel';
import { Message } from './message';

interface ClientConfig extends ChannelConfig {}

export class Client extends Channel {
  public ownerWindow?: Window;

  constructor(config: ClientConfig = {}) {
    super(config);
  }

  protected postMessage(message: Message) {
    this.ownerWindow?.postMessage(message.serialize(), '*');
  }

  public connect() {}

  public close() {}
}
