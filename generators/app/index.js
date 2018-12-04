const chalk = require('chalk');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const filter = require('gulp-filter');
const packagejs = require('../../package.json');
const { prettierTransform, prettierOptions } = require('./generator-transforms');
const { validateGitHubName, validateModuleName } = require('./input-validation');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // Register file transforms for generated files, using Prettier
        const prettierFilter = filter(['{generators,test}/**/*.{js,json}'], { restore: true });
        // this pipe will pass through (restore) anything that doesn't match prettierFilter
        this.registerTransformStream([prettierFilter, prettierTransform(prettierOptions), prettierFilter.restore]);
    }

    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    this.default = true;
                }
            },

            displayLogo() {
                this.log(chalk.white.bold('         http://www.jhipster.tech\n'));
                this.log(
                    chalk.white(`Welcome to the ${chalk.bold('JHipster Blueprint')} Generator! ${chalk.yellow(`v${packagejs.version}\n`)}`)
                );
            }
        };
    }

    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'input',
                name: 'moduleName',
                validate: validateModuleName,
                message: 'What is the base name of your module?',
                default: 'helloworld'
            },
            {
                type: 'input',
                name: 'moduleDescription',
                message: 'Give a description of your module'
            },
            {
                type: 'checkbox',
                name: 'blueprintSubs',
                message: 'Which sub-generators do you want to override?',
                choices: [
                    {
                        name: 'client',
                        value: 'client'
                    },
                    {
                        name: 'server',
                        value: 'server'
                    },
                    {
                        name: 'entity',
                        value: 'entity'
                    },
                    {
                        name: 'entity-client',
                        value: 'entity-client'
                    },
                    {
                        name: 'entity-server',
                        value: 'entity-server'
                    },
                    {
                        name: 'entity-i18n',
                        value: 'entity-i18n'
                    },
                    {
                        name: 'spring-controller',
                        value: 'spring-controller'
                    },
                    {
                        name: 'spring-service',
                        value: 'spring-service'
                    }
                ]
            },
            {
                type: 'input',
                name: 'githubName',
                validate: validateGitHubName,
                store: true,
                message: 'What is your GitHub username?'
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Who are you? Firstname Lastname',
                default: 'Firstname Lastname',
                store: true
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Your email?',
                store: true
            },
            {
                type: 'input',
                name: 'authorUrl',
                message: 'Your home page url?',
                store: true
            },
            {
                type: 'list',
                name: 'license',
                message: 'Do you want to add a license?',
                choices: [
                    { name: 'No license', value: 'no' },
                    { name: 'Apache License 2.0', value: 'apache' },
                    { name: 'GNU General Public License v3.0', value: 'gnu' },
                    { name: 'MIT License', value: 'mit' }
                ],
                default: 'no'
            }
        ];

        if (this.default) {
            // generate default blueprint
            this.moduleName = 'helloworld';
            this.moduleDescription = 'Default Blueprint';
            this.blueprintSubs = [
                'client',
                'server',
                'entity',
                'entity-client',
                'entity-server',
                'entity-i18n',
                'spring-controller',
                'spring-service'
            ];
            this.githubName = 'jhipster-bot';
            this.authorName = 'JHipster Bot';
            this.authorEmail = 'jhipster@localhost';
            this.authorUrl = 'https://twitter.com/java_hipster';
            this.license = 'apache';
            done();
        } else {
            this.prompt(prompts).then(props => {
                this.props = props;
                this.moduleName = props.moduleName;
                this.moduleDescription = props.moduleDescription;
                this.blueprintSubs = props.blueprintSubs;
                this.githubName = props.githubName;
                this.authorName = props.authorName;
                this.authorEmail = props.authorEmail;
                this.authorUrl = props.authorUrl;
                this.license = props.license;

                this.log(this.blueprintSubs);
                done();
            });
        }
    }

    writing() {
        // function to use directly template
        this.template = function(source, destination) {
            this.fs.copyTpl(this.templatePath(source), this.destinationPath(destination), this);
        };

        // copy general files
        this.template('editorconfig', '.editorconfig');
        this.template('eslintignore', '.eslintignore');
        this.template('eslintrc.json', '.eslintrc.json');
        this.template('prettierrc.json', '.prettierrc');
        this.template('prettirignore', '.prettirignore');
        this.template('gitattributes', '.gitattributes');
        this.template('gitignore', '.gitignore');
        this.template('_travis.yml', '.travis.yml');
        this.template('_package.json', 'package.json');
        if (this.license === 'apache') {
            this.template('_LICENSE_APACHE', 'LICENSE');
        } else if (this.license === 'gpl') {
            this.template('_LICENSE_GPL', 'LICENSE');
        } else if (this.license === 'mit') {
            this.template('_LICENSE_MIT', 'LICENSE');
        }
        this.template('_README.md', 'README.md');

        if (this.blueprintSubs.includes('client')) {
            // copy files for the client generator
            mkdirp('generators/client/templates');
            this.template('generators/client/_index.js', 'generators/client/index.js');
            this.template('generators/client/_files.js', 'generators/client/files.js');
            this.template('generators/client/_prompts.js', 'generators/client/prompts.js');
            this.template('generators/client/templates/_dummy.txt', 'generators/client/templates/_dummy.txt');
        }
        if (this.blueprintSubs.includes('server')) {
            // copy files for the server generator
            this.template('generators/server/_index.js', 'generators/server/index.js');
        }
        if (this.blueprintSubs.includes('entity')) {
            // copy files for the entity generator
            this.template('generators/entity/_index.js', 'generators/entity/index.js');
        }
        if (this.blueprintSubs.includes('entity-client')) {
            // copy files for the entity-client generator
            this.template('generators/entity-client/_index.js', 'generators/entity-client/index.js');
        }
        if (this.blueprintSubs.includes('entity-server')) {
            // copy files for the entity-server generator
            this.template('generators/entity-server/_index.js', 'generators/entity-server/index.js');
        }
        if (this.blueprintSubs.includes('entity-i18n')) {
            // copy files for the entity-i18n generator
            this.template('generators/entity-i18n/_index.js', 'generators/entity-i18n/index.js');
        }
        if (this.blueprintSubs.includes('spring-controller')) {
            // copy files for the spring-controller generator
            this.template('generators/spring-controller/_index.js', 'generators/spring-controller/index.js');
        }
        if (this.blueprintSubs.includes('spring-service')) {
            // copy files for the spring-service generator
            this.template('generators/spring-service/_index.js', 'generators/spring-service/index.js');
        }

        this.blueprintSubs.filter(subGen => !subGen.startsWith('entity-')).forEach(subGenerator => {
            this.subGenerator = subGenerator;
            this.template('test/_subgen.spec.ejs', `test/${subGenerator}.spec.js`);
        });
        if (this.blueprintSubs.find(subGen => ['entity', 'spring-controller', 'spring-service'].includes(subGen))) {
            this.template('test/templates/ngx-blueprint/.yo-rc.json.ejs', 'test/templates/ngx-blueprint/.yo-rc.json');
        }
    }

    end() {
        this.log(`\n${chalk.bold.green('##### USAGE #####')}`);
        this.log('To begin to work:');
        this.log(`- launch: ${chalk.yellow.bold('yarn install')} or ${chalk.yellow.bold('npm install')}`);
        this.log(`- link: ${chalk.yellow.bold('yarn link')} or ${chalk.yellow.bold('npm link')}`);
        this.log(
            `- link JHipster: ${chalk.yellow.bold('yarn link generator-jhipster')} or ${chalk.yellow.bold('npm link generator-jhipster')}`
        );
        this.log('- test your module in a JHipster project: ');
        this.log('    - create a new directory and go into it');
        this.log(
            `    - link the blueprint: ${chalk.yellow.bold(`yarn link generator-jhipster-${this.moduleName}`)} or ${chalk.yellow.bold(
                `npm link generator-jhipster-${this.moduleName}`
            )}`
        );
        this.log(`    - launch JHipster with flags: ${chalk.yellow.bold(`jhipster --blueprint ${this.moduleName}`)}`);
        this.log('- then, come back here, and begin to code!\n');
    }
};
