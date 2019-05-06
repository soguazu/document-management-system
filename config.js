/* eslint-disable no-undef */
/*
 * Create and export configuration variables
 *
 */

// Container for all environments
const environments = {};

// Staging (default) environment
environments.stagging = {
    envName: 'staging',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 80,
    db:
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true'
};

// Production environment
environments.production = {
    envName: 'production',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 80,
    db:
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true'
};

environments.test = {
    envName: 'test',
    hashingSecret: process.env.MY_SECRET,
    httpPort: 80,
    db:
        'mongodb+srv://grey123:grey123@dmscluster-evk9t.mongodb.net/dms?retryWrites=true'
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
// module.exports.environmentToExport = environmentToExport;
