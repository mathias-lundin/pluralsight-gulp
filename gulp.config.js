module.exports = function () {

    'use strict';

    var client = './src/client/',
        clientApp = client + 'app/',
        server = './src/server/',
        temp = './.tmp/';

    var config = {
        //File paths
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        client: client,
        css: temp + 'styles.css',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js' //Excluded
        ],
        less: client + '/styles/styles.less',
        server: server,
        temp: temp,

        // browser sync
        browserReloadDelay: 0,

        //Bower and NPM locations
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        },

        // Node settings
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function () {
        return {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
    };

    return config;
};
