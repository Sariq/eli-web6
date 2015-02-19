(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param ChatService: Service
     * @constructor
     */
    function ChatController($interval,$http, $location, $scope, $stateParams, ChatService, AuthService) {
        var self = this;
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        self.chatMessages = [];
        self.currentWebUser = '';
        self.flag = false;

       

       
        self.chatWebs = ChatService.query()
        self.userInfo = AuthService.getUserInfo()
        
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
               
                ChatService.GuID = self.GuID;
                self.xmlHttp_OneTime = ChatService.FirstTimeFunction();
                self.xmlHttp_OneTime.onreadystatechange = self.getResponse_FirstTime;
                self.xmlHttp_OneTime.send();

            }
          
        }

        self.getResponse_FirstTime = function () {
            if (self.xmlHttp_OneTime.readyState == 4) {
                var myJSON_Text = self.xmlHttp_OneTime.responseText;
                myJsonObject = eval('(' + myJSON_Text + ')');
                console.log(myJsonObject)
                self.chatMessages = myJsonObject;
                $scope.$apply();
                self.xmlHttp_Process=ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
        }
        
        self.getResponse_Process = function () {
            alert()
            self.flag = false;
            var temp_resultInMinutes = '';
            if (self.xmlHttp_Process.readyState == 4) {
                var myJSON_Text = self.xmlHttp_Process.responseText;
                                   
                var myJsonObject_Temp = eval('(' + myJSON_Text + ')');
                console.log(self.myJsonObject_Temp)
                if (myJsonObject_Temp[0].hasOwnProperty('messageContent')) {
                    //alert("message")
                     
                   
                   
                    console.log(myJsonObject_Temp[0].clientId + "=="+self.currentWebUser.clientId)
                    if (myJsonObject_Temp[0].clientId == self.currentWebUser.clientId) {
                        self.chatMessages = myJsonObject_Temp;
                        self.flag = true;
                    }
                    //if (self.flag == false) {
                    //    for (var i = 0; i < self.chatWebs.length; i++) {
                    //        self.chatWebs[i].newMessage = false;
                    //        if (self.chatWebs[i].clientId == myJsonObject_Temp[0].clientId) {
                    //            self.chatWebs[i].newMessage = true;
                    //            }       
                    //    } 
                    //}

                    for (var j = 0; j < self.chatMessages.length; j++) {
                        self.chatMessages[j].messageUpdateT = self.updateMessageTme(myJsonObject_Temp[j].messageTime)
                        
                    }
                    console.log(self.chatMessages)
                    
            } else {
                // alert("webs")
                // console.log(myJsonObject_Temp)
                self.chatWebs = myJsonObject_Temp;
                $scope.$apply();

            }
              
            $scope.$apply();
            self.xmlHttp_Process = ChatService.ProcessFunction();
            self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
            self.xmlHttp_Process.send();

        }
    }

        $interval(function() {
     
            for (var j = 0; j < self.chatMessages.length; j++) {
                self.chatMessages[j].messageUpdateT = self.updateMessageTme(self.chatMessages[j].messageTime)
            }
        }, 20000);
  
    self.myClick = function () {
           
        ChatService.myClick(self.myMessage, self.currentWebUser.clientId);
        self.myMessage = '';
     
    }

    self.getWebUserChat = function (webUser,index) {
        self.currentWebUser = webUser;
        self.chatWebs[index].newMessage = false;
           
        $http({
            url: '/MessageService.svc/GetAllOnlineMessagesOfClient',
            method: 'POST',
            data: webUser.clientId
        }).then(function (response) {
            console.log(response)
            self.chatMessages = response.data;
            for (var j = 0; j < self.chatMessages.length; j++) {
                self.chatMessages[j].messageUpdateT = self.updateMessageTme(self.chatMessages[j].messageTime)

            }


        }, function () { alert("GetAllMessages error") });
    }


    self.updateMessageTme = function (messageTime) {
        var startTime = new Date(messageTime)
        var endTime = new Date()
        var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
        var resultInMinutes = Math.round(difference / 60000);
        if (resultInMinutes > 60) {
            return resultInMinutes + " more than 1h";
        } else {
            return resultInMinutes + " mins ago";
        }
        
    }

    self.register = function () {
       
        self.myLoad();

    }

    self.myUnLoad = function () {
        alert("myUnLoad")
        var url = "/AsyncHandler.ashx?cmd=unregister&type=" + "admin";
        self.xmlHttp_OneTime.open("POST", url, true);
        self.xmlHttp_OneTime.send();
    }
        
    self.unRegister = function () {
        
        self.myUnLoad();

    }
    
    window.onunload = self.myUnLoad;
    // window.onload = self.myLoad;
    //self.myLoad();
   
    return self;





}

    angular.module('eli.admin')
        .controller('ChatController', ['$interval','$http', '$location', '$scope', '$stateParams', 'ChatService', 'AuthService', ChatController]);
}());










