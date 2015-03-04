(function () {
    function TreeViewController(PatientAdmin, $stateParams, $scope, $filter, $location, $treeService, ProjectService, ReminderService, $rootScope, $timeout) {
        var self = this;

        $scope.treeName = "treeSample";
        $scope.itemIcon = "icons empty";
        $scope.showRTL = true;
        $scope.showIcons = true;
        $scope.currnetItem = '';
        $scope.localData = [
            {
                id: 1,
                text: "Books",
                icon: "icons books",

                items: [
                    { id: 11, pid: 1, text: "Art" },
                    {
                        id: 12,
                        pid: 1,

                        text: "Business",

                        icon: "icons business",
                        items: [
                            { id: 121, pid: 12, text: "Economics", body: "zzzzzzzzzzzzzzzzz" },
                            {
                                id: 122,
                                pid: 12,
                                text: "Investing",

                                icon: "icons chart",
                                items: [
                                    { id: 1221, pid: 122, text: "Bonds" },
                                    { id: 1222, pid: 122, text: "Options" },
                                    { id: 1223, pid: 122, text: "Stocks" }
                                ]
                            },
                            { id: 123, pid: 12, text: "Management" },
                            { id: 124, pid: 12, text: "Small Business" }
                        ]
                    },
                    { id: 13, pid: 1, text: "Health", icon: "icons health" },
                    { id: 14, pid: 1, text: "Literature" },
                    {
                        id: 15,
                        pid: 1,
                        text: "Science",

                        icon: "icons science",
                        items: [
                            { id: 151, pid: 15, text: "Astronomy" },
                            { id: 152, pid: 15, text: "Mathematics" },
                            { id: 153, pid: 15, text: "Evolution" },
                            { id: 154, pid: 15, text: "Nature" }
                        ]
                    }
                ]
            },
            { id: 2, text: "Computers" },
            {
                id: 3,
                text: "Electronics",

                items: [
                    { id: 31, pid: 3, text: "Camera" },
                    { id: 32, pid: 3, text: "Cell Phones" },
                    { id: 33, pid: 3, text: "Video Game Consoles" }
                ]
            },
            {
                id: 4,
                text: "Music",

                icon: "icons music",
                items: [
                    { id: 41, pid: 4, text: "Blues" },
                    { id: 42, pid: 4, text: "Classic Rock" },
                    { id: 43, pid: 4, text: "Pop" },
                    { id: 44, pid: 4, text: "Jazz" }
                ]
            },
            { id: 5, text: "Watches", icon: "icons time" }
        ];





        $timeout(function () {
            $treeService.collapse($scope.treeName);
        }, 1000)

        //expang path by Item ID
        $scope.searchItems = function (id) {
            console.log($scope.treeName)
            var item = $treeService.findItemById($scope.treeName, id);
            if (item) {
                $treeService.expand($scope.treeName, item);
                var parent = $treeService.getItemParent($scope.treeName, item);
                while (parent) {
                    item = $treeService.findItemById($scope.treeName, parent.id);
                    $treeService.expand($scope.treeName, item);
                    // alert("The parent for item " + item.text + " is: " + parent.text);
                    parent = $treeService.getItemParent($scope.treeName, item);
                }
            }
        }

        $scope.toggleRTL = function () {
            $scope.showRTL = !$scope.showRTL;
        }

        $scope.toggleIcons = function () {
            $scope.showIcons = !$scope.showIcons;
        }




        $scope.disableButtons = true;

        var itemCount = 0;

        var getCurrentSelection = function () {
            return $treeService.selectedItem($scope.treeName);
        }

        var createNewItem = function () {
            itemCount++;
            return { text: $scope.itemName };
        }

        $scope.addRoot = function () {
            $treeService.addItem($scope.treeName, createNewItem());
        }

        $scope.addChild = function () {
            $treeService.addItem($scope.treeName, createNewItem(), getCurrentSelection());
        }





        $scope.remove = function () {
            $treeService.removeItem($scope.treeName, getCurrentSelection());
        }



        $scope.clear = function () {
            $treeService.clearItems($scope.treeName);
            $scope.disableButtons = true;
            itemCount = 0;
        }

        $scope.treeEvents = {

            itemClick: function (e) {
                return $scope.onItemClick(e);
            }

        }

        $scope.onItemClick = function (e) {
        
            $scope.currItem = e.item;
            $scope.currItems = e.item;
            $scope.$watch('currItems', function (newVal, oldVal) {
               
                if (($scope.currItems != undefined) && newVal.text != undefined && oldVal.text != undefined && newVal.text != oldVal.text) {
                    ProjectService.setTask(e.item);
                    $rootScope.$broadcast("prjEdit");
                    alert("edit "+newVal.text + '-' + oldVal.text);
                    $scope.currItems = '';
                    return
                }
                
               
            }, true);
           
            if (e.item) {
              
                if (!e.item.hasOwnProperty('items')) {
                    ProjectService.setTask(e.item);
               
                
                    $timeout(function () {
                        $location.path('/projects/task/' + e.item.text);
                    }, 1000)
                  
                       
                }
            }

        }
        if (ReminderService.getTaskId() != '') {
            $timeout(function () {
                $scope.searchItems(ReminderService.getTaskId())
            }, 1000)
        }



        $rootScope.$on('taskReminder', function () {
            alert(ReminderService.getTaskId())
        });

    }

    angular.module('eli.admin')
      .controller('TreeViewController', ['PatientAdmin', '$stateParams', '$scope', '$filter', '$location', 'IntegralUITreeViewService', 'ProjectService', 'ReminderService', '$rootScope', '$timeout', TreeViewController]);
}());
















