angular
  .module('sysdoc')
  .config(sysdocRoutes);

sysdocRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
function sysdocRoutes($stateProvider, $urlRouterProvider) {
  console.log('-- sysdoc: routes');

  $urlRouterProvider.otherwise('/test');

  $stateProvider
    .state('test', {
      url: '/test',
      views: {
        '@': {
      		controller: 'sysdocTestCtrl',
			    templateUrl: 'modules/sysdoc/views/test.client.view.html',
        }
      }
    });
}
