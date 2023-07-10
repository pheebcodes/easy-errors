const easyError = Symbol("EasyError");

export function makeError(name, defaultMessageOrTransformer) {
  if (typeof defaultMessageOrTransformer === "function") {
    return (...args) =>
      Object.create(Error.prototype, {
        name: {
          value: name
        },
        message: {
          value: defaultMessageOrTransformer(...args)
        },
        [easyError]: {
          value: true
        }
      });
  }

  return (message) =>
    Object.create(Error.prototype, {
      name: {
        value: name
      },
      message: {
        value: message || defaultMessageOrTransformer
      },
      [easyError]: {
        value: true
      }
    });
}

export function isEasyError(e) {
  return e[easyError] || false;
}
