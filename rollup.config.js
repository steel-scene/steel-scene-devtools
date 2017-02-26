var typescript = require('rollup-plugin-typescript');

module.exports = {
    entry: './src/index.ts',
    dest: './public/app.js',
    format: 'cjs',
    plugins: [
        typescript({
            typescript: require('typescript')
        })
    ]
};