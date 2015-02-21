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
        self.GuID=''
   
        //self.isAdminOnline = function () {
            $http({
                url: '/ClientService.svc/isAdminOnline',
                method: 'POST',
             
            }).then(function (response) {
                console.log(response.data)
                self.adminOnlineStatus = response.data;


            }, function () { //alert("isAdminOnline error")
            });

        //}

        self.myLoad = function () {
            self.xmlHttp_OneTime = ChatService.loadChat();

            self.xmlHttp_OneTime.onreadystatechange = self.getResponse_Connect;
            self.xmlHttp_OneTime.send();
            
           
            }

           
        self.getResponse_Connect = function () {
            if (self.xmlHttp_OneTime.readyState == 4) {
                self.GuID = self.xmlHttp_OneTime.responseText;
                alert(self.GuID)
                ChatService.GuID = self.GuID;
                $scope.$apply();
                self.xmlHttp_OneTime.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
          
        }

        self.getResponse_FirstTime = function () {
            alert("FIRST")
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
                console.log(myJsonObject_Temp)
                self.chatMessages = myJsonObject_Temp.allMessage;
                $scope.$apply();
                self.xmlHttp_Process = ChatService.ProcessFunction();
                self.xmlHttp_Process.onreadystatechange = self.getResponse_Process;
                self.xmlHttp_Process.send();

            }
        }

      

  
        self.myClick = function () {
           
            ChatService.myClick(self.myMessage);
            self.myMessage='';
     
        }
        self.register = function () {
           
            self.myLoad();

        }
        self.myUnLoad = function () {
            alert("myUnLoad")
            var url = "AsyncHandler.ashx?cmd=unregister&type=" + "web";
            xmlHttp_OneTime.open("POST", url, true);
            xmlHttp_OneTime.send();
        }

        window.onunload = self.myUnLoad;
        //window.onload = self.myLoad;

   
        return self;





    }

    angular.module('eliApp')
        .controller('ChatController', ['$http','$location', '$scope',  '$stateParams','ChatService', ChatController]);
}());










