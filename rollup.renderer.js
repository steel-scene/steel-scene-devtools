var typescript = require('rollup-plugin-typescript');

module.exports = {
  entry: './src/renderer/index.ts',
  external: [
    "csx",
    "typestyle",
    "vue",
    "path",
    "url"
  ],
  dest: './app/renderer/index.js',
  format: 'cjs',
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'app/renderer',
      typescript: require('typescript') 
    })
  ]
}
