(function () {

    function ChatService($resource, localStorageService) {
        var self = this;
        self.GuID;
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        var myJsonObject;
        self.chatWebResource = $resource('/ClientService.svc/GetAllWebs/:id', {},
          { update: { method: 'PUT' } }
        );
        self.chatMessagesResource = $resource('/MessageService.svc/GetAllOnlineMessagesOfClient/:id', {},
        { update: { method: 'PUT' } }
      );
        self.getMessages = function (clientId) {
            return self.chatMessagesResource.get({ id: clientId });
        }

        self.query = function () {
            return self.chatWebResource.query();
        };

        self.loadChat = function () {
            try {
                self.xmlHttp_OneTime = new ActiveXObject("Microsoft.XMLHTTP");
                self.xmlHttp_Process = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                try {
                    self.xmlHttp_OneTime = new XMLHttpRequest()
                    self.xmlHttp_Process = new XMLHttpRequest()
                }
                catch (e) {
                }
            }
            var url = "/AsyncHandler.ashx?cmd=register&type=" + "admin";
            self.xmlHttp_OneTime.open("POST", url, true);
            return self.xmlHttp_OneTime;
        }


        self.FirstTimeFunction = function () {

            var url = "/AsyncHandler.ashx?cmd=firstTime";
            self.xmlHttp_OneTime.open("POST", url, true);
            return self.xmlHttp_OneTime;
        }

        self.myUnLoad = function () {
            var url = "/AsyncHandler.ashx?cmd=unregister";
            self.xmlHttp_OneTime.open("POST", url, true);
            self.xmlHttp_OneTime.send();
        }

        self.ProcessFunction = function () {
          
            var url = "/AsyncHandler.ashx?cmd=process&guid=" + self.getadminChatId();
            self.xmlHttp_Process.open("POST", url, true);
            return self.xmlHttp_Process;
        }
    
        self.setadminChatId = function (adminChatId) {
   
             
            return localStorageService.set("adminChatId", adminChatId);
        };
        self.getadminChatId = function () {
            return localStorageService.get("adminChatId");
        };
        self.clearadminChatId = function () {

            return localStorageService.remove("adminChatId");
        }

        self.setwebChatId = function (webChatId) {


            return localStorageService.set("webChatId", webChatId);
        };
        self.getwebChatId = function () {
            return localStorageService.get("webChatId");
        };
        self.clearwebChatId = function () {

            return localStorageService.remove("webChatId");
        }

        self.myClick = function (myMessage, currentWebUser) {
            alert(self.getadminChatId())
            var url = "/AsyncHandler.ashx?cmd=sendMessage&myText=" + encodeURIComponent(myMessage) + "&clientId=" + encodeURIComponent(currentWebUser) + "&type=" + "admin";
            self.xmlHttp_OneTime.open("POST", url, true);
            self.xmlHttp_OneTime.send();
        }
       
        return self;



    }

    angular.module('eli.admin')
    .service('ChatService', ['$resource','localStorageService', ChatService])
}());