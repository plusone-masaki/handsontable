'use strict';

module.exports = function resolveExtractTextPlugin() {
  try {
    // Prefer the actual dependency when available.
    return require('extract-text-webpack-plugin');
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    }

    // Fallback to a lightweight stub that keeps the build scripts working
    // even when the original plugin is not installed in this workspace.
    return require('./extract-text-webpack-plugin-stub');
  }
};
