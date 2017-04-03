angular
  .module('sysdoc')
  .directive('sysdocDecisionTree', sysdocDecisionTreeDirective);

function sysdocDecisionTreeDirective() {
  console.log('-- sysdoc: Decision tree directive');

  return {
    restrict: 'E',
    templateUrl: 'modules/sysdoc/views/sysdoc-decision-tree.client.view.html',
    controller: 'sysdocDecisionTreeCtrl',
    controllerAs: 'vm',
    link: sysdocDecisionTreeLink
  };

  function sysdocDecisionTreeLink(scope, element, attrs, vm) {
    console.log('-- sysdoc: decision-tree-directive: link', vm);  
  }
}
