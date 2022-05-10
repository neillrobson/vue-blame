const path = require('path');

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'src')]
    },
    entry: 'index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: {
            name: 'VueBlame',
            type: 'umd'
        }
    }
};
