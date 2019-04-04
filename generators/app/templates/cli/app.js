#!/usr/bin/env node

const fork = require('child_process').fork;
const utils = require('./utils');

const jhipsterPath = utils.generateJHipsterPath('../node_modules/generator-jhipster/cli/jhipster');
const args = utils.initArguments('--blueprint', '<%= moduleName %>');

fork(jhipsterPath, args);
