// Application module
angular
  .module('app', ['ui.bootstrap', 'sysdoc'])
  .config(appConfig);

console.log('application module');

// Configure routes not to use the hash
// Used in legacy browsers
appConfig.$inject = ['$locationProvider'];
function appConfig($locationProvider) {
  $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
}
