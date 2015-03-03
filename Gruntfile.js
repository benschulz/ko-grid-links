'use strict';

module.exports = function (grunt) {
    require('grunt-commons')(grunt, {
        name: 'ko-grid-links',
        main: 'links',
        internalMain: 'links',

        shims: {
            'ko-grid': 'window.ko.bindingHandlers[\'grid\']'
        }
    }).initialize({});
};
