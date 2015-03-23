(function () {
    function TreeViewController(PatientAdmin, $stateParams, $scope, $filter, $location, $treeService, ProjectService, ReminderService, $rootScope, $timeout, AuthService, $http, TaskgAdmin, UserAdmin) {
        var self = this;
        self.projectId = $stateParams.projectId;
        $scope.treeName = "treeSample";
        $scope.itemIcon = "icons empty";
        self.userInfo = AuthService.getUserInfo();
        $scope.showRTL = true;
        $scope.showIcons = true;
        $scope.currnetItem = '';
        $scope.remoteData = [];
        $scope.localData =
          [
              { "id": "1", "items": [{ "id": "11", "items": null, "pId": null, "text": "Art" }, { "id": "12", "items": [{ "id": "121", "items": null, "pId": null, "text": "Economics" }, { "id": "122", "items": [{ "id": "1221", "items": null, "pId": null, "text": "Bonds" }, { "id": "1222", "items": null, "pId": null, "text": "Options" }, { "id": "1223", "items": null, "pId": null, "text": "Stocks" }], "pId": null, "text": "Investing" }, { "id": "123", "items": null, "pId": null, "text": "Management" }, { "id": "124", "items": null, "pId": null, "text": "Small Business" }], "pId": null, "text": "Business" }, { "id": "13", "items": null, "pId": null, "text": "Health" }, { "id": "14", "items": null, "pId": null, "text": "Literature" }, { "id": "15", "items": [{ "id": "151", "items": null, "pId": null, "text": "Astronomy" }, { "id": "152", "items": null, "pId": null, "text": "Mathematics" }, { "id": "153", "items": null, "pId": null, "text": "Evolution" }, { "id": "154", "items": null, "pId": null, "text": "Nature" }], "pId": null, "text": "Science" }], "pId": null, "text": "Books" }, { "id": "2", "items": null, "pId": null, "text": "Computers" }, { "id": "3", "items": [{ "id": "31", "items": null, "pId": null, "text": "Camera" }, { "id": "32", "items": null, "pId": null, "text": "Cell Phones" }, { "id": "33", "items": null, "pId": null, "text": "Video Game Consoles" }], "pId": null, "text": "Electronics" }, { "id": "4", "items": [{ "id": "41", "items": null, "pId": null, "text": "Blues" }, { "id": "42", "items": null, "pId": null, "text": "Classic Rock" }, { "id": "43", "items": null, "pId": null, "text": "Pop" }, { "id": "44", "items": null, "pId": null, "text": "Jazz" }], "pId": null, "text": "Music" }, { "id": "5", "items": null, "pId": null, "text": "Watches" }
          ]

        //actions on project
        var getCurrentSelection = function () {
            return $treeService.selectedItem($scope.treeName);
        }

        var createNewItem = function () {
            return { text: $scope.itemName, idOfAssignments: [] };
        }

        $scope.addRoot = function () {
            $treeService.addItem($scope.treeName, createNewItem());
            $scope.update();

        }
        $scope.addChild = function () {
            $treeService.addItem($scope.treeName, createNewItem(), getCurrentSelection());
            $scope.update();
        }
        $scope.remove = function () {
           // alert(self.item)
            if (getCurrentSelection() != null) {
                $treeService.removeItem($scope.treeName, getCurrentSelection());
                $scope.update()
            }
        }
        $scope.onDragDrop = function (e) {

            $scope.update();
        }
        $scope.onItemClick = function (e) {

            if (e.item) {
    
                if (e.item.items == null) {
                    self.item = e.item;
                    console.log(self.item)
                    // ProjectService.setTask(e.item);
              
                   
                    if (e.item.idOfAssignments.length == 0) {
                        $timeout(function () {
                            $location.path('/item/' + self.projectId + '/add');
                        }, 0)
                        } else {
                            self.taskItem = TaskgAdmin.get(e.item.idOfAssignments[0]);
                            console.log(self.taskItem)
                            $location.path('/item/' + self.projectId + '/item/' + e.item.id);
                        }
                  
                }
            }
        }


        $scope.onAfterLabelEdit = function (e) {
            $scope.update();
        }

        //treeEvents                     
        $scope.treeEvents = {

            itemClick: function (e) {
                return $scope.onItemClick(e);
            },
            afterLabelEdit: function (e) {
                return $scope.onAfterLabelEdit(e);
            }
        }






         //Delete Project
        $scope.deleteProject = function () {
            $http.post('/ProjectService.svc/RemoveProject', self.projectId).
                success(function (data, status, headers, config) {
           
                }).error(function (data, status, headers, config) { console.log("RemoveProject error") });
        }


        $scope.save = function () {
            var project = { items: $scope.localData };
            $http.post('/ProjectService.svc/api', project).
       success(function (data, status, headers, config) {
           $scope.prjId = data;
       }).error(function (data, status, headers, config) { console.log("Project Add") });

        }

        $scope.get = function () {
            $http.post('/ProjectService.svc/getProject', self.projectId).
                 success(function (data, status, headers, config) {
                     $scope.project = data;

                     $treeService.loadData($scope.treeName, data.items);
                     $treeService.collapse($scope.treeName);
                 }).error(function (data, status, headers, config) { console.log("Project Get") });
        }
        // 
        $scope.get();
        $scope.update = function () {
            var project = { items: $scope.remoteData, _id: self.projectId, name: $scope.project.name };
            $http.post('/ProjectService.svc/update', project).
       success(function (data, status, headers, config) {
           //  alert(data.data)
       }).error(function (data, status, headers, config) { console.log("Project update") });

        }

        //task
        $rootScope.$on('taskReminder', function () {
            console.log(ReminderService.getTaskId())
        });
        $rootScope.$on('taskShared', function () {
            console.log(ReminderService.getTaskId())
        });


        self.saveTask = function (task, sendToUser, reminder) {
            console.log(self.item.idOfAssignments)
            if (self.item.id == undefined) {
                console.log("please click on task")
            }
            //alert(self.projectId)
            task.isProject = true;
            task.projectId = self.projectId;
            task.idInProject = self.item.id;
            task.title = self.item.text;
            $http.post('/AssignmentService.svc/api', task).
       success(function (data, status, headers, config) {

           self.assId = data._id;
           self.item.idOfAssignments.push(data._id);
           $scope.update();
           //SendToUSers
           //alert(data._id)
           sendToUser.push(data._id)
           $http.post('/UserService.svc/AddAssignmentOfProjectToUsers', sendToUser).
    success(function (data, status, headers, config) {
        console.log(data)
        //add Reminder
        if (reminder.reminderTime != '') {
            reminder.reminderTime = '/Date(' + reminder.reminderTime.getTime() + ')/';
            reminder.title = task.title;
            reminder.dataId = self.assId;
            reminder.dataType = "projectReminder";
            $http({
                url: '/ReminderService.svc/api',
                method: 'POST',
                data: reminder
            }).then(function (response) {
                console.log(response)
                UserAdmin.addReminder(response.data._id);
                

            }, function () { console.log("ReminderService add error") });
            /// alert(reminder.reminderTime)
        }



        self.taskItem = TaskgAdmin.get(self.item.idOfAssignments[0]);
        console.log(self.taskItem)
        $location.path('/item/' + self.projectId + '/item/' + self.item.id);
    }).error(function (data, status, headers, config) { console.log("AssignmentService Add") });



       }).error(function (data, status, headers, config) { console.log("AddAssignmentOfProjectToUsers Add") });

        }



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
        if (ReminderService.getTaskId() != '') {
            $timeout(function () {
                $scope.searchItems(ReminderService.getTaskId())
            }, 1000)
        }

        $scope.toggleRTL = function () {
            $scope.showRTL = !$scope.showRTL;
        }

        $scope.toggleIcons = function () {
            $scope.showIcons = !$scope.showIcons;
        }

        //$scope.disableButtons = true;

        //$scope.clear = function () {
        //    $treeService.clearItems($scope.treeName);
        //    $scope.disableButtons = true;
        //    itemCount = 0;
        //}

    }

    angular.module('eli.admin')
      .controller('TreeViewController', ['PatientAdmin', '$stateParams', '$scope', '$filter', '$location', 'IntegralUITreeViewService', 'ProjectService', 'ReminderService', '$rootScope', '$timeout', 'AuthService', '$http', 'TaskgAdmin', 'UserAdmin', TreeViewController]);
}());
















