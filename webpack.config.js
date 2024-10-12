const { override, addWebpackAlias, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");

module.exports = override(
  // Tambahkan fallback untuk modul Node.js
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      url: require.resolve("url/"),
      assert: require.resolve("assert/"),
    };
    return config;
  }
);
