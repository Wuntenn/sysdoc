angular
  .module('sysdoc')
  .controller('sysdocDecisionTreeCtrl', sysdocDecisionTreeCtrl);

sysdocDecisionTreeCtrl.$injects = ['$scope'];
function sysdocDecisionTreeCtrl($scope) {
  var vm = this;
  console.log('--sysdoc: decision-tree');
  
  /** 
   * set initial state
   */

  // Get brand involved
  vm.brandNeeded = null;

  // For collecting the answers
  vm.answer = null; 

  // Used for final results
  vm.attendees = null; 

  // Roles are repeated throughout the matrix. Because new
  // roles may be added in the future, or details change,
  // it's best to keep this separate.
  // I've merged the table of staff into this. I wasn't 100% sure
  // if this is what you intended where you say the data can be 
  // transformed.
  // I could've created another object and performed a lookup
  // against the level key.
  var role = {
    brand: [{
      displayName: 'Head of Tech',
      level: 'HOB',
      staff: [
        'Brett Sedcole'
      ]
    }, {
      displayName: 'Senior Brand Consultant',
      level: 'SBC',
      staff: [
        'Gemma Tuffield'
      ] 
    }, {
      displayName: 'Brand Consultant',
      level: 'BCN',
      staff: [
        'Tom Buglar',
        'Mikhail Graham'
      ]
    }],
    tech: [{
      displayName: 'Head of Tech',
      level: 'HOT',
      staff: [
        'John Hay'
      ] 
    },{
      displayName: 'Senior Tech Consultant',
      level: 'STC',
      staff: [
        'Chris Campbell',
        'Scott Thompson',
        'Bishnu Biswas',
        'Byron Chan'
      ]
    }, {
      displayName: 'Tech Consultant',
      level: 'TCN',
      staff: [
        'Clark Tozer',
        'Valeria Maneva'
      ] 
    }]
  },

  // If we ignore order the below matrics can be constructed by
  // the 6 unique combinations: HL, HM, HH, ML, MM, and LL
  // where each one points to a brand and tech role eg:
  //
  // ...
  // MM: {
  //  brandLevel: role.brand[2],
  //  techLevel: role.tech[2]
  // }
  // ... 
  //
  // By creating a search key from the inputs and sorting both that
  // contructed key and the keys in the object (like above) alphabetically
  // we'd save (3) extra cells, owever, for maintainance reasons it's
  // better to use the extended form.
  matrix = {
    high: {
      high: {
        brand: role.brand[0],
        tech: role.tech[0]
      },
      medium: {
        brand: role.brand[0],
        tech: role.tech[0]
      },
      low: {
        brand: role.brand[1],
        tech: role.tech[1]
      }
    },
    medium: {
      high: {
        brand: role.brand[0],
        tech: role.tech[0]
      },
      medium: {
        brand: role.brand[1],
        tech: role.tech[1]
      },
      low: {
        brand: role.brand[1],
        tech: role.tech[1]
      }
    },
    low: {
      high: {
        brand: role.brand[1],
        tech: role.tech[1]
      },
      medium: {
        brand: role.brand[1],
        tech: role.tech[1]
      },
      low: {
        brand: role.brand[2],
        tech: role.tech[2]
      }
    }
  };

  // Selection logic - Called once we have all input
  function selectCandidates() {
    // Fail early: Primary questions are lowest denom for a result. Return if not selected
    if (!primaryQuestionsAnswered()) return; 

    // Logic for selections
    if (vm.answer.isInteractive && vm.answer.isStrategic) {
      curateAttendees({ brand: role.brand[0], tech: role.tech[0]}, true);
    } else if (!vm.answer.isInteractive && vm.answer.isStrategic) {
      curateAttendees({ brand: null, tech: role.tech[0]}, false);
    } else if (!matrixQuestionsAnswered()) {
      // state is invalid for all other states unless the
      // matrix is selected so reset state to reflect this
      vm.attendees = null;
    } else { // we're in any other state for strategic/intertive where the matrix question are selected
      if (vm.answer.isInteractive && !vm.answer.isStrategic && matrixQuestionsAnswered()) {
        curateAttendees(matrix[vm.answer.opportunityValue][vm.answer.opportunityComplexity], true);
      } else if (!vm.answer.isInteractive && !vm.answer.isStrategic && matrixQuestionsAnswered()) {
        curateAttendees(matrix[vm.answer.opportunityValue][vm.answer.opportunityComplexity], false);
      }
    }

    // Below two functions could be removed if I use something like `some` from underscore/lodash
    function primaryQuestionsAnswered() {
      if (!angular.isDefined(vm.answer.isInteractive) || !angular.isDefined(vm.answer.isStrategic)) {
        return false; 
      }
      return true;
    }

    function matrixQuestionsAnswered() {
      if (!angular.isDefined(vm.answer.opportunityValue) || !angular.isDefined(vm.answer.opportunityComplexity)) {
        return false;
      }
      return true;
    }

  }

  vm.setAttendees = curateAttendees;
  
  // Final say on who goes!
  function curateAttendees(candidates, withBrand) {
    vm.attendees = {}; // first reset to erase prev state
    vm.attendees.tech = candidates.tech;
    if (withBrand) vm.attendees.brand = candidates.brand;
  }

  vm.tmpCount = 0;
  $scope.$watchCollection('vm.answer', function () {
    selectCandidates();
  }); 
}
