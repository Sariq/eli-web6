(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param ChatService: Service
     * @constructor
     */
    function ChatController($interval, $http, $location, $scope, $stateParams, ChatService, AuthService, $modal) {
        var self = this;
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        self.chatMessages = [];
        self.currentWebUser = '';
        self.flag = false;
        self.flagAdminMsg = false;
        self.isAdminOnline = false;
        self.userInfo = AuthService.getUserInfo()



        self.saveReport = function () {



        }


        self.chatWebs = ChatService.query()


        self.chatWebs.$promise.then(function (result) {
            console.log(result);


        });



        self.myLoad = function () {

            self.xmlHttp_OneTime = ChatService.loadChat();
            self.xmlHttp_OneTime.onreadystatechange = self.getResponse_Connect;
            self.xmlHttp_OneTime.send();


        }


        self.getResponse_Connect = function () {

            if (self.xmlHttp_OneTime.readyState == 4) {
                self.GuID = self.xmlHttp_OneTime.responseText;
                ChatService.setadminChatId(self.xmlHttp_OneTime.responseText)

                // self.xmlHttp_OneTime.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }

        }

        self.getResponse_FirstTime = function () {

            if (self.xmlHttp_OneTime.readyState == 4) {

                var myJSON_Text = self.xmlHttp_OneTime.responseText;
                alert(myJSON_Text)
                myJsonObject = eval('(' + myJSON_Text + ')');
                console.log(myJsonObject)

                self.chatMessages = myJsonObject;
                $scope.$apply();

                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
        }

        self.getResponse_Process = function () {

            self.flag = false;
            var temp_resultInMinutes = '';
            if (self.xmlHttp_Process.readyState == 4) {
                var myJSON_Text = self.xmlHttp_Process.responseText;

                var myJsonObject_Temp = eval('(' + myJSON_Text + ')');
                console.log(myJsonObject_Temp)
                if (myJsonObject_Temp.arrType == "messagesArr") {
                    //alert("message")



                    //console.log(myJsonObject_TempclientName.clientName + "==" + self.currentWebUser.clientId)
                    if (myJsonObject_Temp.clientId == self.currentWebUser.clientId) {
                        self.chatMessages = myJsonObject_Temp.allMessage;
                        self.flag = true;
                    }

                    console.log(self.chatWebs)
                    if (!self.flagAdminMsg && myJsonObject_Temp.clientId != self.currentWebUser.clientId) {
                        for (var i = 0; i < self.chatWebs.length; i++) {
                            if (self.chatWebs[i].clientId == myJsonObject_Temp.clientId) {
                                self.chatWebs[i].isNewMessage = true;
                            }
                        }
                    }
                    self.flagAdminMsg = false;

                    //if (self.flag == false) {
                    //    for (var i = 0; i < self.chatWebs.length; i++) {
                    //        self.chatWebs[i].newMessage = false;
                    //        if (self.chatWebs[i].clientId == myJsonObject_Temp[0].clientId) {
                    //            self.chatWebs[i].newMessage = true;
                    //            }       
                    //    } 
                    //}

                    for (var j = 0; j < self.chatMessages.length; j++) {
                        self.chatMessages[j].messageUpdateT = self.updateMessageTme(myJsonObject_Temp.allMessage[j]._date)

                    }
                    console.log(self.chatMessages)

                } else {
                    // alert("webs")
                    // console.log(myJsonObject_Temp)
                    self.chatWebs = myJsonObject_Temp.allwebs;
                    $scope.$apply();

                }

                $scope.$apply();
                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
        }

        $interval(function () {
            for (var j = 0; j < self.chatMessages.length; j++) {
                self.chatMessages[j].messageUpdateT = self.updateMessageTme(self.chatMessages[j]._date)
            }
        }, 20000);

        self.myClick = function () {
            self.flagAdminMsg = true;
            alert(self.currentWebUser.clientId)
            ChatService.myClick(self.myMessage, self.currentWebUser.clientId);
            self.myMessage = '';

        }

      
        self.createReport = function (webUser) {
            var modalInstance = $modal.open({
                templateUrl: '../admin/report/views/add/add.html',
                controller: 'ReportCtrl',
                controllerAs: 'report',
                size: 'lg'
            });
            modalInstance.result.then(function (res) {
                res.chatId = ChatService.getwebChatId();
                res.adminId = self.userInfo._id;
                console.log(res);
                $http.post('/ReportService.svc/addReport', res).
                success(function (data, status, headers, config) {
                    //DELETE USER
                    $http.post('/ClientService.svc/RemoveWeb', webUser._id).
                   success(function (data, status, headers, config) {
                  
                       self.chatWebs = ChatService.query()
                   }).error(function (data, status, headers, config) { alert("Project Add") });

            }).error(function (data, status, headers, config) { alert("Project Add") });
        }, function (data) {
            var resp = angular.copy(data);
            console.log('Selected false');
        });
  
    }
        self.remove = function (id) {
            $http.post('/ClientService.svc/RemoveWeb', id).
                  success(function (data, status, headers, config) {
                     
                      self.chatWebs = ChatService.query()
                  }).error(function (data, status, headers, config) { alert("Project Add") });

        }


    self.getWebUserChat = function (webUser, index) {

        ChatService.setwebChatId(webUser.clientId)
        alert(webUser.clientId)
        self.currentWebUser = webUser;
        self.chatWebs[index].isNewMessage = false;

        $http({
            url: '/ChatMessageService.svc/GetAllOnlineMessagesOfClient',
            method: 'POST',
            data: webUser.clientId
        }).then(function (response) {
            console.log(response)
            self.chatMessages = response.data;
            for (var j = 0; j < self.chatMessages.length; j++) {
                self.chatMessages[j].messageUpdateT = self.updateMessageTme(self.chatMessages[j]._date)

            }
        }, function () { alert("GetAllMessages error") });
    }


    self.updateMessageTme = function (messageTime) {

        var startTime = new Date(parseInt(messageTime.substr(6)))
        console.log(startTime)
        var endTime = new Date()
        var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds

        var resultInMinutes = Math.round(difference / 60000);
        if (resultInMinutes > 60) {
            return "more than 1h";
        } else {

            return resultInMinutes + " mins ago";
        }

    }

    self.register = function () {
        self.isAdminOnline = true;
        self.myLoad();

    }

    self.myUnLoad = function () {
        self.isAdminOnline = false;
        var url = "/AsyncHandler.ashx?cmd=unregister&type=" + "admin";
        self.xmlHttp_OneTime.open("POST", url, true);
        self.xmlHttp_OneTime.send();
    }

    self.unRegister = function () {

        self.myUnLoad();

    }


    //window.onunload = self.myUnLoad;
    // window.onload = self.myLoad;
    //self.myLoad();






}

    angular.module('eli.admin')
        .controller('ChatController', ['$interval', '$http', '$location', '$scope', '$stateParams', 'ChatService', 'AuthService', '$modal', ChatController]);
}());










