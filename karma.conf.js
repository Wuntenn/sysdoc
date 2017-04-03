// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // libs
      'public/lib/angular/angular.min.js', 
      'public/lib/angular-aria/angular-aria.min.js',
      'public/lib/angular-animate/angular-animate.min.js',
      'public/lib/angular-touch/angular-touch.min.js',
      'public/lib/angular-route/angular-route.min.js',
      'public/lib/angular-resource/angular-resource.min.js',
      'public/lib/angular-ui-router/release/angular-ui-router.min.js',
      'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',

      // angular mocks
      'public/lib/angular-mocks/angular-mocks.js',

      // app files
      'public/application.js',

      // load application modules
      'modules/**/*.js',
    ],
    reporters: ['spec'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-spec-reporter'
    ],
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: false,      // print the time elapsed for each spec
      failFast: true              // test would finish with error when a first fail occurs. 
    },
    browsers: ['PhantomJS'],
    // colors: true,
    // autoWatch: true,
    captureTimeout: 60000,
    singleRun: true
  });
};
