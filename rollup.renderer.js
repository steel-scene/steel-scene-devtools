var typescript = require('rollup-plugin-typescript');

module.exports = {
    entry: './src/renderer/index.tsx',
    dest: './app/renderer/index.js',
    format: 'cjs',
    plugins: [
        typescript({
            declaration: true,
            declarationDir: "app/renderer",
            typescript: require('typescript')
        })
    ]
};