(function () {
    function TreeViewController(PatientAdmin, $stateParams, $scope, $filter, $location, $treeService, ProjectService, ReminderService, $rootScope, $timeout, AuthService, $http) {
        var self = this;

        $scope.treeName = "treeSample";
        $scope.itemIcon = "icons empty";
        $scope.showRTL = true;
        $scope.showIcons = true;
        $scope.currnetItem = '';
        $scope.userInfo = AuthService.getUserInfo()
        $scope.remoteData = [];
        $scope.localData =
          [
              { "id": "1", "items": [{ "id": "11", "items": null, "pId": null, "text": "Art" }, { "id": "12", "items": [{ "id": "121", "items": null, "pId": null, "text": "Economics" }, { "id": "122", "items": [{ "id": "1221", "items": null, "pId": null, "text": "Bonds" }, { "id": "1222", "items": null, "pId": null, "text": "Options" }, { "id": "1223", "items": null, "pId": null, "text": "Stocks" }], "pId": null, "text": "Investing" }, { "id": "123", "items": null, "pId": null, "text": "Management" }, { "id": "124", "items": null, "pId": null, "text": "Small Business" }], "pId": null, "text": "Business" }, { "id": "13", "items": null, "pId": null, "text": "Health" }, { "id": "14", "items": null, "pId": null, "text": "Literature" }, { "id": "15", "items": [{ "id": "151", "items": null, "pId": null, "text": "Astronomy" }, { "id": "152", "items": null, "pId": null, "text": "Mathematics" }, { "id": "153", "items": null, "pId": null, "text": "Evolution" }, { "id": "154", "items": null, "pId": null, "text": "Nature" }], "pId": null, "text": "Science" }], "pId": null, "text": "Books" }, { "id": "2", "items": null, "pId": null, "text": "Computers" }, { "id": "3", "items": [{ "id": "31", "items": null, "pId": null, "text": "Camera" }, { "id": "32", "items": null, "pId": null, "text": "Cell Phones" }, { "id": "33", "items": null, "pId": null, "text": "Video Game Consoles" }], "pId": null, "text": "Electronics" }, { "id": "4", "items": [{ "id": "41", "items": null, "pId": null, "text": "Blues" }, { "id": "42", "items": null, "pId": null, "text": "Classic Rock" }, { "id": "43", "items": null, "pId": null, "text": "Pop" }, { "id": "44", "items": null, "pId": null, "text": "Jazz" }], "pId": null, "text": "Music" }, { "id": "5", "items": null, "pId": null, "text": "Watches" }
          ]

        $scope.loadRemote = function () {
            var dataSource = $http.post('/ProjectService.svc/getProject', $scope.userInfo._id);
            if (dataSource) {
                var dataFields = {
                    id: 'id',
                    pid: 'pid',
                    text: 'text',
                    expanded: 'isExpanded'
                }

                dataSource.success(function (data) {
                    console.log(data)
                    $treeService.loadData($scope.treeName, data.items);
                });
                dataSource.error(function (data) {
                    alert("AJAX failed to load data");
                });
            }
        }



        //$timeout(function () {
        //    $treeService.collapse($scope.treeName);
        //}, 1000)

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

        $scope.onDragDrop = function (e) {
    
                $scope.update()
        }
        $scope.onItemClick = function (e) {
            if (e.item) {

                        if (!e.item.items!=null) {
                            ProjectService.setTask(e.item);
                            $timeout(function () {
                                $location.path('/projects/task/' + e.item.text);
                            }, 1000)
                        }
                    }
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
            $scope.update();
        }
        

        //$scope.onItemClick = function (e) {
        //    if (e.item) {

        //        if (!e.item.hasOwnProperty('items')) {
        //            ProjectService.setTask(e.item);
        //            $timeout(function () {
        //                $location.path('/projects/task/' + e.item.text);
        //            }, 1000)


        //        }
        //    }

        //}
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
            $http.post('/ProjectService.svc/getProject', $scope.userInfo._id).
                 success(function (data, status, headers, config) {
           $scope.treeId = data._id;
           $treeService.loadData($scope.treeName, data.items);
           $treeService.collapse($scope.treeName);
                 }).error(function (data, status, headers, config) { alert("Project Get") });
        }
        $scope.get();
        $scope.update = function () {
            var project = { userId: $scope.userInfo._id, items: $scope.remoteData, _id: $scope.treeId };
            $http.post('/ProjectService.svc/update', project).
       success(function (data, status, headers, config) {

       }).error(function (data, status, headers, config) { alert("Project update") });
         
        }




    }

    angular.module('eli.admin')
      .controller('TreeViewController', ['PatientAdmin', '$stateParams', '$scope', '$filter', '$location', 'IntegralUITreeViewService', 'ProjectService', 'ReminderService', '$rootScope', '$timeout', 'AuthService', '$http', TreeViewController]);
}());
















