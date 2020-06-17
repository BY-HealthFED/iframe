/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { getRandomString } from './crypto';

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId() {
  return getRandomString(10, CHARACTERS);
}

function escapeRegex(text: string) {
  return text.replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace('*', '.*');
}

export function createAllowedOrigins(origins?: string[]) {
  if (!origins || origins.length === 0) {
    return {
      test() {
        return true;
      },
    };
  }

  return new RegExp(`^(${origins.map((x) => escapeRegex(x.replace(/\/$/, ''))).join('|')})$`, 'i');
}
