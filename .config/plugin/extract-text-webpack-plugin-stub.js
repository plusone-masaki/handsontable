'use strict';

class ExtractTextPluginStub {
  constructor() {} // No options needed for the stub.

  // The real plugin wires into webpack to emit separate CSS assets. For the
  // purposes of these tests we only need the loaders to run, so the stub is
  // a no-op.
  apply() {}

  static extract(options) {
    const opts = options || {};
    const loaders = [];

    if (opts.fallback) {
      loaders.push(opts.fallback);
    }

    if (opts.use) {
      if (Array.isArray(opts.use)) {
        loaders.push(...opts.use);
      } else {
        loaders.push(opts.use);
      }
    }

    return loaders.join('!');
  }
}

module.exports = ExtractTextPluginStub;
