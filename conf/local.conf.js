var browserstack = require('browserstack-local');

exports.config = {
  'specs': [ '../specs/local.js' ],
  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  'capabilities': {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'build': 'protractor-browserstack',
    'name': 'local_test',
    'browserName': 'chrome',
    'browserstack.local': true,
    'browserstack.debug': 'true'
  },

  // OV: add JUnit reporter
  // as found on http://stackoverflow.com/questions/21338019/setting-up-continuous-integration-of-protractor-using-jenkins
  // but newer syntax from http://stackoverflow.com/questions/25228472/jasmine-reporters-is-not-generating-any-file
  onPrepare: function() {
    // The require statement must be down here, since jasmine-reporters
    // needs jasmine to be in the global and protractor does not guarantee
    // this until inside the onPrepare function.
    // jasmine1 syntax:
    require('jasmine-reporters');
    jasmine.getEnv().addReporter(
        new jasmine.JUnitXmlReporter('xmloutput', true, true)
    );
    // jasmine2 syntax:
//    var jasmineReporters = require('jasmine-reporters');
//    jasmine.getEnv().addReporter(
//        new jasmineReporters.JUnitXmlReporter('xmloutput', true, true)
//    );
  },

  // Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.capabilities['browserstack.key'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }
};
