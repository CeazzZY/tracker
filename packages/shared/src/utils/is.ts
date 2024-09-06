function isType(type: any) {
  return function (value: any): boolean {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  };
}

export const isFunction = isType('Function');
