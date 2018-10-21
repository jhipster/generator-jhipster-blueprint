/* global describe, beforeEach, it */

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const expectedFiles = {
    module: [
        '.editorconfig',
        '.eslintignore',
        '.eslintrc.json',
        '.gitattributes',
        '.gitignore',
        '.travis.yml',
        'package.json',
        'README.md'
    ],
    client: [
        'generators/client/index.js',
        'generators/client/files.js',
        'generators/client/prompts.js',
        'generators/client/templates/_dummy.txt'
    ],
    entity: ['generators/entity/index.js'],
    'entity-client': ['generators/entity-client/index.js'],
    'entity-server': ['generators/entity-server/index.js'],
    'entity-i18n': ['generators/entity-i18n/index.js'],
    server: ['generators/server/index.js'],
    'spring-controller': ['generators/spring-controller/index.js'],
    'spring-service': ['generators/spring-service/index.js'],
    license: ['LICENSE']
};

const ALL_SUBGENS = ['client', 'entity', 'entity-client', 'entity-i18n', 'entity-server', 'server', 'spring-controller', 'spring-service'];

describe('JHipster generator blueprint', () => {
    describe('default configuration no license', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: [],
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'no'
                })
                .on('end', done);
        });
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it("doesn't generate license", () => {
            assert.noFile(expectedFiles.license);
        });
        ALL_SUBGENS.forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
            });
        });
    });

    describe('default configuration license Apache', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: [],
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'apache'
                })
                .on('end', done);
        });
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license Apache', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'Apache-2.0');
            assert.fileContent('package.json', 'Apache-2.0');
        });
        ALL_SUBGENS.forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
            });
        });
    });

    describe('default configuration license GNU GPLv3', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: [],
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'gpl'
                })
                .on('end', done);
        });
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'GPL-3.0');
            assert.fileContent('package.json', 'GPL-3.0');
        });
        ALL_SUBGENS.forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
            });
        });
    });

    describe('default configuration license MIT', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: [],
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'mit'
                })
                .on('end', done);
        });
        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates license', () => {
            assert.file(expectedFiles.license);
            assert.fileContent('README.md', 'MIT');
            assert.fileContent('package.json', 'MIT');
        });
        ALL_SUBGENS.forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
            });
        });
    });

    describe('generate client and entity blueprint templates only', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: ['client', 'entity'],
                    hookCallback: 'app',
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'no'
                })
                .on('end', done);
        });

        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        it('generates client files', () => {
            assert.file(expectedFiles.client);
        });
        it('generates entity files', () => {
            assert.file(expectedFiles.entity);
        });
        ['entity-client', 'entity-i18n', 'entity-server', 'server', 'spring-controller', 'spring-service'].forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
            });
        });
    });
    describe('generate all blueprint templates only', () => {
        beforeEach(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: ALL_SUBGENS,
                    hookCallback: 'app',
                    githubName: 'githubName',
                    authorName: 'authorName',
                    authorEmail: 'mail@mail',
                    authorUrl: 'authorUrl',
                    license: 'no'
                })
                .on('end', done);
        });

        it('generates default files', () => {
            assert.file(expectedFiles.module);
        });
        ALL_SUBGENS.forEach(subGen => {
            it(`generates ${subGen} files`, () => {
                assert.file(expectedFiles[subGen]);
            });
        });
    });
});
