# @byhealth/channel

Quickly connect to iframe.

## Usages

Install package `npm install @byhealth/channel`

### host.html

```js
import { Host } from '@byhealth/channel';

const host = new Host({
  allowedOrigins: ['http://*.example.com'],
  target: '#container',
});
host.on('ready', function () {
  console.log('Host: client ready');
});
host.open('./iframe.html', {
  style: 'border: 0',
  width: '100%',
  height: '100px',
});
```

### iframe.html

```js
import { Client } from '@byhealth/channel';

const client = new Client({
  allowedOrigins: ['http://*.example.com'],
});
client.on('ready', function () {
  console.log('Client: Host ready');
});
client.connect();
```

### APIs

## HostConfig

```ts
interface HostConfig {
  /**
   * Example: ['https://*.by-health.com', 'https://*.4000916916.com']
   */
  allowedOrigins?: string[];

  /**
   * Mount point as selector or target element.
   */
  target?: string | HTMLElement;

  /**
   * Auto adjust height when receive 'resize' event from client
   */
  autoHeight?: boolean;
}
```

## Host

### `host.open(url: string, attr?: any): void`

### `host.close(): void`

### `host.on(event: string, fn: (...args: any[]) => void, context?: any): void`

### `host.off(event: string, fn: (...args: any[]) => void, context?: any): void`

### `host.emit(event: string, data?: any): void`

## Client

### `client.connect(): void`

### `client.disconnect(): void`

### `client.on(event: string, fn: (...args: any[]) => void, context?: any): void`

### `client.off(event: string, fn: (...args: any[]) => void, context?: any): void`

### `client.emit(event: string, data?: any): void`
