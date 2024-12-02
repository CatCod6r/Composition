'use strict';

const combine = (...functions) => (input) => {
  const callbacks = [];
  const combined = (input) => {
    if (functions.length === 0) return input;
    const len = functions.length - 1;
    let result = input;
    try {
      for (let i = len; i >= 0; i--) {
        result = functions[i](result);
      }
      return result;
    } catch (err) {
      for (const callback of callbacks) {
        callback(err);
      }
      return null;
    }
  };
  combined.on = (event, callback) => {
    if (event === 'error') callbacks.push(callback);
  };
  return combined;
};



module.exports = { compose };
