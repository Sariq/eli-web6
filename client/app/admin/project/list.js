(function () {
    function ProjectListController(PatientAdmin, $stateParams, $scope, $filter, ngTableParams) {
        var self = this;
        self.patients = PatientAdmin.query();

        self.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }

        self.dataForTheTree =
    [
    {
        "name": "Joe", "age": "21", "children": [
          { "name": "Smith", "age": "42", "children": [] },
          {
              "name": "Gary", "age": "21", "children": [
                {
                    "name": "Jenifer", "age": "23", "children": [
                      { "name": "Dani", "age": "32", "children": [] },
                      { "name": "Max", "age": "34", "children": [] }
                    ]
                }
              ]
          }
        ]
    },
    { "name": "Albert", "age": "33", "children": [] },
    { "name": "Ron", "age": "29", "children": [] }
    ];

        //self.patients.$promise.then(function (result) {
        //    console.log(result);
        //    self.data = result;
        //    self.myFun();

        //});






    }

    angular.module('AbnTest')
      .controller('ProjectListController', ['PatientAdmin', '$stateParams', '$scope', '$filter', 'ngTableParams', ProjectListController]);
}());
















