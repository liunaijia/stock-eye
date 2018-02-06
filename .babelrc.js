module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "last 2 Chrome versions"
        },
        modules: false
      }
    ],
    "@babel/preset-stage-0",
    "@babel/preset-react"
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
      }
    ]
  ],
  env: {
    test: {
      plugins: [
        "@babel/transform-modules-commonjs"
      ]
    }
  }
}