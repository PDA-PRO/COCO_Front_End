module.exports = {
    presets: [["@babel/preset-env", {
      targets: {
        node: "14"
      }
    }]],
    env: {
      test: {
        plugins: [
          "@babel/plugin-transform-modules-commonjs",
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  }