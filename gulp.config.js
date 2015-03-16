module.exports = function () {
    'use strict';

    var client = './src/client',
        config = {
        temp: './.tmp/',
        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        less: client + '/styles/styles.less'
    };

    return config;
};
