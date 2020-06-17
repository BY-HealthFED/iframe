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
host
  .on('ready', function () {
    console.log('Host: client ready');
  })
  .on('error', function (error) {
    console.error(error);
  })
  .open('./iframe.html', {
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
client
  .on('ready', function () {
    console.log('Client: Host ready');
  })
  .on('error', function (error) {
    console.error(error);
  })
  .connect();

// 发起自定义事件
client.emit('custom_event', payload);

// 连接到服务端
await client.connect();

// 发送数据“1”到服务端，并等待服务端的答复
const resp = await client.send('1');

// 等待服务端发送数据过来
const data = await client.receive();
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

Open iframe.

- `url`: iframe open url
- `attrs`: iframe attributes, eg: width, height, style, class...

### `host.close(): void`

Close (remove) iframe.

### `host.on(event: string, fn: (...args: any[]) => void, context?: any): void`

Add an event listener.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `host.once(event: string, fn: (...args: any[]) => void, context?: any): void`

Add an event listener, the same as `host.on()`, but the callback is automatically deleted after the call.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `host.off(event: string, fn: (...args: any[]) => void, context?: any): void`

Remove an event listener.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `host.emit(event: string, data?: any): void`

Dispatch `event`, the client will receive it.

- `event`: event name
- `data`: payload

---

## ClientConfig

```ts
interface ClientConfig {
  /**
   * Example: ['https://*.by-health.com', 'https://*.4000916916.com']
   */
  allowedOrigins?: string[];

  /**
   * Add window.addEventListener('resize') listener, when the height of the element changes, it automatically emit `resize` event to the host
   */
  autoHeight?: boolean;
}
```

## Client

### `client.connect(): void`

Connect to host.

### `client.disconnect(): void`

Disconnect to host.

### `client.on(event: string, fn: (...args: any[]) => void, context?: any): void`

Add an event listener.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `client.once(event: string, fn: (...args: any[]) => void, context?: any): void`

Add an event listener, the same as `client.on()`, but the callback is automatically deleted after the call.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `client.off(event: string, fn: (...args: any[]) => void, context?: any): void`

Remove an event listener.

- `event`: event name
- `fn`: event callback
- `context`: callback context (this)

### `client.emit(event: string, data?: any): void`

Dispatch `event`, the host will receive it.

- `event`: event name
- `data`: payload
