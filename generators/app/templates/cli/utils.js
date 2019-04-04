#!/usr/bin/env node

const p = require('path');

function generateJHipsterPath(relativePath) {
    const absolutePath = p.join(__dirname, relativePath);
    return p.normalize(absolutePath);
}

function initArguments(...args) {
    const inputArgs = _removeNodeArgsInProcessArgv();

    return args.concat(inputArgs);
}

function _removeNodeArgsInProcessArgv() {
    return process.argv ? process.argv.slice(2) : [];
}

module.exports = {
    generateJHipsterPath,
    initArguments
};
