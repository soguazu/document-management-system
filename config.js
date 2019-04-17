/* eslint-disable no-undef */
/*
 * Create and export configuration variables
 *
 */

// Container for all environments
const environments = {};

// Staging (default) environment
environments.staging = {
    envName: 'staging',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 3000,
    db: 'mongodb://localhost/dms'
};

// Production environment
environments.production = {
    envName: 'production',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 3000,
    db: 'mongodb://localhost/dms'
};

environments.test = {
    envName: 'test',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 3000,
    db: 'mongodb://localhost/dms-test'
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
        typeof process.env.NODE_ENV === 'string'
            ? process.env.NODE_ENV.toLowerCase()
            : '',
    // Check that the current environment is one of the environments above, if not default to staging
    environmentToExport =
        typeof environments[currentEnvironment] === 'object'
            ? environments[currentEnvironment]
            : environments.staging;

// Export the module
export default environmentToExport;
