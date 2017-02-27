var typescript = require('rollup-plugin-typescript');

module.exports = {
    entry: './src/main/index.ts',
    external: [
        "path",
        "url"
    ],
    dest: './app/main/index.js',
    format: 'cjs',
    plugins: [
        typescript({
            declaration: true,
            declarationDir: "app/main",
            typescript: require('typescript')
        })
    ]
};