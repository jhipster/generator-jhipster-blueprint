const chalk = require('chalk');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const filter = require('gulp-filter');
const NpmApi = require('npm-api');
const path = require('path');
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
                this.generators = {
                    app: { name: 'AppGenerator', path: 'generator-jhipster/generators/app' },
                    server: { name: 'ServerGenerator', path: 'generator-jhipster/generators/server' },
                    client: { name: 'ClientGenerator', path: 'generator-jhipster/generators/client' },
                    common: { name: 'CommonGenerator', path: 'generator-jhipster/generators/common' },
                    entity: { name: 'EntityGenerator', path: 'generator-jhipster/generators/entity' },
                    'entity-client': { name: 'EntityClientGenerator', path: 'generator-jhipster/generators/entity-client' },
                    'entity-server': { name: 'EntityServerGenerator', path: 'generator-jhipster/generators/entity-server' },
                    'entity-i18n': { name: 'EntityI18nGenerator', path: 'generator-jhipster/generators/entity-i18n' },
                    languages: { name: 'LanguagesGenerator', path: 'generator-jhipster/generators/languages' },
                    'spring-controller': { name: 'SpringControllerGenerator', path: 'generator-jhipster/generators/spring-controller' },
                    'spring-service': { name: 'SpringServiceGenerator', path: 'generator-jhipster/generators/spring-service' }
                };

                if (args === 'default') {
                    // generate default blueprint
                    this.config.defaults({
                        moduleName: 'helloworld',
                        moduleDescription: 'Default Blueprint',
                        blueprintSubs: Object.keys(this.generators),
                        githubName: 'jhipster-bot',
                        authorName: 'JHipster Bot',
                        authorEmail: 'jhipster@localhost',
                        authorUrl: 'https://twitter.com/java_hipster',
                        license: 'apache'
                    });
                }
            },

            displayLogo() {
                this.log(chalk.white.bold('         http://www.jhipster.tech\n'));
                this.log(
                    chalk.white(`Welcome to the ${chalk.bold('JHipster Blueprint')} Generator! ${chalk.yellow(`v${packagejs.version}\n`)}`)
                );
            },

            loadLastestJHipsterVersion() {
                return new NpmApi()
                    .repo('generator-jhipster')
                    .package()
                    .then(
                        pkg => {
                            this.config.set('jhipsterVersion', pkg.version);
                        },
                        err => {
                            this.warning(`Something went wrong fetching the latest generator-jhipster version...\n${err}`);
                        }
                    );
            }
        };
    }

    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'moduleName',
                validate: validateModuleName,
                message: 'What is the base name of your module?',
                default: path.basename(this.destinationRoot())
            },
            {
                type: 'input',
                name: 'moduleDescription',
                message: 'Give a description of your module',
                default: this.determineAppname()
            },
            {
                type: 'input',
                name: 'jhipsterVersion',
                message: 'Which version are you targeting?'
            },
            {
                type: 'checkbox',
                name: 'blueprintSubs',
                message: 'Which sub-generators do you want to override?',
                choices: Object.keys(this.generators)
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

        return this.prompt(prompts, this.config);
    }

    configuring() {
        Object.assign(this, this.config.getAll());
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
        this.template('prettierignore', '.prettierignore');
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

        this.blueprintSubs.forEach(generator => {
            this.subGenerator = generator;

            if (generator === 'client') {
                mkdirp('generators/client/templates');
                this.template('generators/client/_files.js', 'generators/client/files.js');
                this.template('generators/client/_prompts.js', 'generators/client/prompts.js');
                this.template('generators/client/templates/_dummy.txt', 'generators/client/templates/_dummy.txt');
            }
            this.template('test/_subgen.spec.ejs', `test/${generator}.spec.js`);
            if (!['common', 'client', 'server'].includes(generator)) {
                this.template('test/templates/ngx-blueprint/.yo-rc.json.ejs', 'test/templates/ngx-blueprint/.yo-rc.json');
            }

            this.template('generators/_index.js.ejs', `generators/${generator}/index.js`);
        });
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
