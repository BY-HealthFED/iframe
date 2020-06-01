function escape(text: string) {
  return text.replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace('*', '.*');
}

function createRegexp(list: string[]) {
  if (list.length === 0) {
    return new RegExp('(?:)');
  }

  return new RegExp(`^(${list.map(escape).join('|')})$`, 'i');
}

export { createRegexp };
