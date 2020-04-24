# generator-jhipster-blueprint

[![NPM version][npm-image]][npm-url]
[![Azure DevOps Build Status][azure-devops-image]][azure-devops-url-main]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

> Yeoman generator to create a JHipster blueprint

<div align="center">
    <a href="https://www.jhipster.tech">
        <img src="https://github.com/jhipster/jhipster-artwork/blob/master/logos/JHipster%20RGB-small100x25px.png?raw=true">
    </a>
</div>

# Introduction

This [Yeoman](https://yeoman.io/) generator will help you to kickstart a new [JHipster](https://www.jhipster.tech) blueprint, if you intent to override or extend the JHipster generator.

# Prerequisites

Reading this [JHipster blueprint](https://www.jhipster.tech/modules/creating-a-blueprint/)

This generator requires yo and requires yeoman-environment >= 2.9.0. 
If you are having problems running this generator you should try reinstalling yo.

## With NPM
To install yo:
```bash
npm install -g yo
```

To reinstall yo:
```bash
npm uninstall -g yo
npm install -g yo
```

## With Yarn

To install yo:
```bash
yarn global add yo
```

To reinstall yo:
```bash
yarn global remove yo
yarn global add yo
```

# Installation

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-blueprint
```

To update this module:

```bash
npm update -g generator-jhipster-blueprint
```

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-blueprint
```

To update this module:

```bash
yarn global upgrade generator-jhipster-blueprint
```

# Usage

To run the module, follow these steps :

-   create a new directory

```bash
mkdir generator-jhipster-<name of your module>
```

-   go into this directory

```bash
cd generator-jhipster-<name of your module>
```

-   init the git repository

```bash
git init
```

-   launch the jhipster-blueprint

```bash
yo jhipster-blueprint
```

-   answer all questions

To regenarate:
```bash
yo jhipster-blueprint
```

To change any answer:
```bash
yo jhipster-blueprint --ask-answered
```

# License

Apache-2.0 © [Deepu KS](https://twitter.com/deepu105) and the respective JHipster contributors

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-blueprint.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-blueprint
[azure-devops-image]: https://dev.azure.com/jhipster/generator-jhipster-blueprint/_apis/build/status/jhipster.generator-jhipster-blueprint?branchName=master
[azure-devops-url-main]: https://dev.azure.com/jhipster/generator-jhipster-module/_build
[travis-image]: https://travis-ci.org/jhipster/generator-jhipster-blueprint.svg?branch=master
[travis-url]: https://travis-ci.org/jhipster/generator-jhipster-blueprint
[daviddm-image]: https://david-dm.org/jhipster/generator-jhipster-blueprint.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jhipster/generator-jhipster-blueprint
