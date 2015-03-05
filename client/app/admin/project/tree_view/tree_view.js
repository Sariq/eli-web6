(function () {
    function TreeViewController(PatientAdmin, $stateParams, $scope, $filter, $location, $treeService, ProjectService, ReminderService, $rootScope, $timeout, AuthService,$http) {
        var self = this;

        $scope.treeName = "treeSample";
        $scope.itemIcon = "icons empty";
        $scope.showRTL = true;
        $scope.showIcons = true;
        $scope.currnetItem = '';
        $scope.userInfo = AuthService.getUserInfo()
        $scope.localData =
          [
              { "id": "1", "items": [{ "id": "11", "items": null, "pId": null, "text": "Art" }, { "id": "12", "items": [{ "id": "121", "items": null, "pId": null, "text": "Economics" }, { "id": "122", "items": [{ "id": "1221", "items": null, "pId": null, "text": "Bonds" }, { "id": "1222", "items": null, "pId": null, "text": "Options" }, { "id": "1223", "items": null, "pId": null, "text": "Stocks" }], "pId": null, "text": "Investing" }, { "id": "123", "items": null, "pId": null, "text": "Management" }, { "id": "124", "items": null, "pId": null, "text": "Small Business" }], "pId": null, "text": "Business" }, { "id": "13", "items": null, "pId": null, "text": "Health" }, { "id": "14", "items": null, "pId": null, "text": "Literature" }, { "id": "15", "items": [{ "id": "151", "items": null, "pId": null, "text": "Astronomy" }, { "id": "152", "items": null, "pId": null, "text": "Mathematics" }, { "id": "153", "items": null, "pId": null, "text": "Evolution" }, { "id": "154", "items": null, "pId": null, "text": "Nature" }], "pId": null, "text": "Science" }], "pId": null, "text": "Books" }, { "id": "2", "items": null, "pId": null, "text": "Computers" }, { "id": "3", "items": [{ "id": "31", "items": null, "pId": null, "text": "Camera" }, { "id": "32", "items": null, "pId": null, "text": "Cell Phones" }, { "id": "33", "items": null, "pId": null, "text": "Video Game Consoles" }], "pId": null, "text": "Electronics" }, { "id": "4", "items": [{ "id": "41", "items": null, "pId": null, "text": "Blues" }, { "id": "42", "items": null, "pId": null, "text": "Classic Rock" }, { "id": "43", "items": null, "pId": null, "text": "Pop" }, { "id": "44", "items": null, "pId": null, "text": "Jazz" }], "pId": null, "text": "Music" }, { "id": "5", "items": null, "pId": null, "text": "Watches" }
          ]





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

            //itemClick: function (e) {
            //    return $scope.onItemClick(e);
            //} ,
            afterLabelEdit: function (e) {
                return $scope.onAfterLabelEdit(e);
        }

        }

        $scope.onAfterLabelEdit = function (e) {
          alert()
        }

        $scope.onItemClick = function (e) {
            
            $scope.currItem = e.item;
            $scope.currItems = e.item;
            $scope.listener = $scope.$watch('currItems', function (newVal, oldVal) {
               
                if (($scope.currItems != undefined) && newVal.text != undefined && oldVal.text != undefined && newVal.text != oldVal.text) {
                    ProjectService.setTask(e.item);
                    $rootScope.$broadcast("prjEdit");
                    alert("edit "+newVal.text + '-' + oldVal.text);
                   
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
        $scope.save = function () {
            var project = { userId: $scope.userInfo._id, items: $scope.localData };
            $http.post('/ProjectService.svc/api', project).
       success(function (data, status, headers, config) {
          
       }).error(function (data, status, headers, config) { });
                alert("Project Add")
        }

        $scope.get = function () {
          //  var project = { userId: $scope.userInfo._id, items: $scope.localData };
            $http.post('/ProjectService.svc/getProject', $scope.userInfo._id).
       success(function (data, status, headers, config) {
           $scope.localData = data;
           console.log(data)
       }).error(function (data, status, headers, config) { });
            alert("Project Get")
        }
        $scope.update = function () {
            var project = { userId: $scope.userInfo._id, items: $scope.localData ,_id:'54f8a3b53f21cc0dbc645dac'};
            $http.post('/ProjectService.svc/update', project).
       success(function (data, status, headers, config) {

       }).error(function (data, status, headers, config) { });
            alert("Project Add")
        }
        $scope.update = function () {
            var project = { userId: $scope.userInfo._id, items: $scope.localData, _id: '54f8a3b53f21cc0dbc645dac' };
            $http.post('/ProjectService.svc/update', project).
       success(function (data, status, headers, config) {

       }).error(function (data, status, headers, config) { });
            alert("Project Add")
        }

       

    }

    angular.module('eli.admin')
      .controller('TreeViewController', ['PatientAdmin', '$stateParams', '$scope', '$filter', '$location', 'IntegralUITreeViewService', 'ProjectService', 'ReminderService', '$rootScope', '$timeout','AuthService','$http', TreeViewController]);
}());
















