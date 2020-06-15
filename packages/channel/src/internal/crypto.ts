/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

declare global {
  interface Window {
    msCrypto?: typeof Crypto;
  }
}

const MAX_VALUE = 4294967295;

const crypto = window.crypto ||
  window.msCrypto || {
    getRandomValues<T extends Array<number>>(buf: T): T {
      for (let i = 0; i < buf.length; i += 1) {
        buf[i] = Math.floor(Math.random() * MAX_VALUE);
      }
      return buf;
    },
  };

export function getRandomBytes(length: number) {
  const buf = new Uint8Array(length);
  crypto.getRandomValues(buf);
  return buf;
}

export function getRandomString(length: number, characters: string) {
  const buf = new Uint16Array(length);
  crypto.getRandomValues(buf);

  let string = '';
  for (let i = 0; i < length; i++) {
    string += characters[buf[i] % characters.length];
  }
  return string;
}
