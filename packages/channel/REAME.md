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
