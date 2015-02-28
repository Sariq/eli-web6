(function() {
  var app, deps;

  deps = ['angularBootstrapNavTree'];

  if (angular.version.full.indexOf("1.2") >= 0) {
    deps.push('ngAnimate');
  }

  app = angular.module('AbnTest', deps);

  app.controller('AbnTestController', function ($scope, $timeout, ProjectService) {
      $scope.projectArr = [{
          label: 'prj1', children: [{
              label: 'Dog',
              data: {
                  description: "man's best friend", to: []
              }
          }]
      }, { label: 'prj1', children: [] }];
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function(branch) {
      var _ref;
      $scope.output = "You selected: " + branch.label;
        //alert(branch.data.description)
      ProjectService.setTask(branch);
      if ((_ref = branch.data) != null ? _ref.description : void 0) {
        return $scope.output += '(' + branch.data.description + ')';
      }
    };
    apple_selected = function(branch) {
      return $scope.output = "APPLE! : " + branch.label;
    };
    treedata_avm = [
      {
        label: 'Animal',
        children: [
          {
            label: 'Dog',
            data: {
              description: "man's best friend",to:[]
            }
          }, {
            label: 'Cat',
            data: {
              description: "Felis catus"
            }
          }, {
            label: 'Hippopotamus',
            data: {
              description: "hungry, hungry"
            }
          }, {
            label: 'Chicken',
            children: [{
                label: 'Dog',
                data: {
                    description: "man's best friend", to: []
                }
            }, 'Rhode Island Red', 'Jersey Giant']
          }
        ]
      }
    ];

    $scope.addProject = function () {
        $scope.project = { label: $scope.projectLable, children: [] }
        
        $scope.projectArr.push($scope.project)
    }
    $scope.my_data = treedata_avm;
    $scope.try_changing_the_tree_data = function() {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function() {
      $scope.my_data = [];
      $scope.doing_async = true;
      return $timeout(function() {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        return tree.expand_all();
      }, 1000);
    };
    return $scope.try_adding_a_branch = function() {
        var b;
       // alert($scope.lable)
      b = tree.get_selected_branch();
      return tree.add_branch(b, {
          label: $scope.lable,
        data: {
            description: $scope.description,
          "else": 43
        }
      });
    };
  });

}).call(this);


