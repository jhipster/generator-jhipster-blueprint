/* global describe, beforeEach, it */

const assert = require('yeoman-assert');
const { validateModuleName, validateGitHubName } = require('../generators/app/input-validation');

describe('input validation', () => {
    describe('validateModuleName', () => {
        it('for invalid syntax: sample_blueprint', () => {
            const result = validateModuleName('sample_blueprint');
            assert(result === 'Your blueprint name is mandatory, cannot contain special characters or a blank space, using the default name instead');
        });
        it('for invalid syntax: sample blueprint', () => {
            const result = validateModuleName('sample blueprint');
            assert(result === 'Your blueprint name is mandatory, cannot contain special characters or a blank space, using the default name instead');
        });
        it('for invalid syntax: sample!blueprint', () => {
            const result = validateModuleName('sample!blueprint');
            assert(result === 'Your blueprint name is mandatory, cannot contain special characters or a blank space, using the default name instead');
        });
        it('for valid syntax: sample-blueprint', () => {
            const result = validateModuleName('sample-blueprint');
            assert(result === true);
        });
        it('for valid syntax: sample', () => {
            const result = validateModuleName('sample');
            assert(result === true);
        });
        it('for valid syntax: SAMPLE', () => {
            const result = validateModuleName('SAMPLE');
            assert(result === true);
        });
        it('for valid syntax: SaMPlE', () => {
            const result = validateModuleName('SaMPlE');
            assert(result === true);
        });
    });
    describe('validateGitHubName', () => {
        it('for invalid syntax: Test_Person', () => {
            const result = validateGitHubName('Test_Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -Test_Person', () => {
            const result = validateGitHubName('-Test-Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: Test-Person-', () => {
            const result = validateGitHubName('Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -Test-Person', () => {
            const result = validateGitHubName('-Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: -TestPerson', () => {
            const result = validateGitHubName('-Test-Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: TestPerson-', () => {
            const result = validateGitHubName('Test-Person-');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for invalid syntax: Test--Person', () => {
            const result = validateGitHubName('Test--Person');
            assert(result === 'Your username is mandatory, cannot contain special characters or a blank space');
        });

        it('for valid syntax: Test-Person', () => {
            const result = validateGitHubName('Test-Person');
            assert(result === true);
        });

        it('for valid syntax: Test-Person-Person', () => {
            const result = validateGitHubName('Test-Person-Person');
            assert(result === true);
        });

        it('for valid syntax: TestPerson', () => {
            const result = validateGitHubName('TestPerson');
            assert(result === true);
        });

        it('for valid syntax: Test1Person123', () => {
            const result = validateGitHubName('Test1Person123');
            assert(result === true);
        });

        it('for valid syntax: Test1-Person123', () => {
            const result = validateGitHubName('Test1-Person123');
            assert(result === true);
        });

        it('for valid syntax: 123Test1-Person123', () => {
            const result = validateGitHubName('123Test1-Person123');
            assert(result === true);
        });
    });
});
