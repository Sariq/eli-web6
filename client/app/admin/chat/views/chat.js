(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param ChatService: Service
     * @constructor
     */
    function ChatController($http,$location, $scope, $stateParams, ChatService) {
        var self = this;
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        self.chatMessages = [];
        self.currentWebUser = '';
        //self.chatWebs = ChatService.query()
        
        //self.chatWebs.$promise.then(function (result) {
        //    console.log(result);
           

        //});

   

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
          
            if (self.xmlHttp_Process.readyState == 4) {
                var myJSON_Text = self.xmlHttp_Process.responseText;
                                   
                var myJsonObject_Temp = eval('(' + myJSON_Text + ')');
                if (myJsonObject_Temp.hasOwnProperty('messageContent')) {
                    console.log(myJsonObject_Temp)
                    self.chatMessages = myJsonObject_Temp;
                } else {
                    console.log(myJsonObject_Temp)
                    self.chatWebs = myJsonObject_Temp;

                }
              
                $scope.$apply();
                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
        }

      

  
        self.myClick = function () {
            alert(self.currentWebUser)
            ChatService.myClick(self.myMessage, self.currentWebUser);
            self.myMessage = '';
     
        }

        self.getWebUserChat = function (clientId) {
            self.currentWebUser = clientId;
            $http({
                url: '/MessageService.svc/GetAllMessages',
                method: 'POST',
                data: clientId
            }).then(function (response) {
                console.log(response)
                self.chatMessages = response.data;


            }, function () { alert("GetAllMessages error") });
        }



        window.onunload = self.myUnLoad;
        window.onload = self.myLoad;
        self.myLoad();
   
        return self;





    }

    angular.module('eli.admin')
        .controller('ChatController', ['$http','$location', '$scope',  '$stateParams','ChatService', ChatController]);
}());










