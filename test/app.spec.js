const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const expectedFiles = {
    module: [
        '.editorconfig',
        '.eslintignore',
        '.eslintrc.json',
        '.prettierrc',
        '.prettirignore',
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
    templates: ['test/templates/ngx-blueprint/.yo-rc.json'],
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
        before(done => {
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
                assert.noFile([`test/${subGen}.spec.js`]);
                assert.noFile(expectedFiles.templates);
            });
        });
    });

    describe('default configuration license Apache', () => {
        before(done => {
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
                assert.noFile([`test/${subGen}.spec.js`]);
                assert.noFile(expectedFiles.templates);
            });
        });
    });

    describe('default configuration license GNU GPLv3', () => {
        before(done => {
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
                assert.noFile([`test/${subGen}.spec.js`]);
                assert.noFile(expectedFiles.templates);
            });
        });
    });

    describe('default configuration license MIT', () => {
        before(done => {
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
                assert.noFile([`test/${subGen}.spec.js`]);
                assert.noFile(expectedFiles.templates);
            });
        });
    });

    describe('generate client and entity blueprint templates only', () => {
        before(done => {
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
            assert.file(['test/client.spec.js']);
        });
        it('generates entity files', () => {
            assert.file(expectedFiles.entity);
            assert.file(['test/entity.spec.js']);
            assert.file(expectedFiles.templates);
        });
        ALL_SUBGENS.filter(subGen => !['client', 'entity'].includes(subGen)).forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
                assert.noFile([`test/${subGen}.spec.js`]);
            });
        });
    });

    describe('generate server blueprint templates only', () => {
        before(done => {
            helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts({
                    moduleName: 'hello-world',
                    moduleDescription: 'hello world',
                    blueprintSubs: ['server'],
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
        it('generates server files', () => {
            assert.file(expectedFiles.server);
            assert.file(['test/server.spec.js']);
        });
        it("doesn't generate unecessary template folder", () => {
            assert.noFile(expectedFiles.templates);
        });
        ALL_SUBGENS.filter(subGen => subGen !== 'server').forEach(subGen => {
            it(`doesn't generate ${subGen} files`, () => {
                assert.noFile(expectedFiles[subGen]);
                assert.noFile([`test/${subGen}.spec.js`]);
            });
        });
    });

    describe('generate all blueprint templates only', () => {
        before(done => {
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
            if (!subGen.startsWith('entity-')) {
                it(`generates ${subGen} test files`, () => {
                    assert.file([`test/${subGen}.spec.js`]);
                });
            }
        });
    });
});
