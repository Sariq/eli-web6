(function () {

    function ChatService($resource, localStorageService) {
        var self = this;
       
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        var myJsonObject;

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

        self.myData = { name: "sari", lasname: "qashuw" }
        //alert(JSON.stringify(self.myData))
        //self.myDatas = JSON.stringify(self.myData);
        self.loadChat = function () {
     
            var url = "/AsyncHandler.ashx?cmd=register&type=" + "web";
            self.xmlHttp_OneTime.open("POST", url, true);
            return self.xmlHttp_OneTime;
        }


        self.FirstTimeFunction = function () {
            var url = "/AsyncHandler.ashx?cmd=firstTime";
            self.xmlHttp_OneTime.open("POST", url, true);
            return self.xmlHttp_OneTime;
        }

        self.myUnLoad = function () {
           
            var url = "/AsyncHandler.ashx?cmd=unregister&type=web&clientId=" + self.getChatUserId();;
            self.xmlHttp_OneTime.open("POST", url, true);
            self.xmlHttp_OneTime.send();
        }

        self.ProcessFunction = function () {
            var url = "/AsyncHandler.ashx?cmd=process&guid=" + self.getChatUserId();;
            self.xmlHttp_Process.open("POST", url, true);
            return self.xmlHttp_Process;
        }
    


        self.myClick = function (myMessage) {
            //alert(self.getChatUserId();)
            var myObj = { clientId: "clientIdsar", messageContent: "messageContentsar",messageTime:"" };
            var url = "/AsyncHandler.ashx?cmd=sendMessage&myText=" + encodeURIComponent(myMessage) + "&clientId=" + encodeURIComponent(self.getChatUserId()) + "&type=" + "web";

            self.xmlHttp_OneTime.open("POST", url, true);
            self.xmlHttp_OneTime.onreadystatechange = self.getResponse_Process;
            self.xmlHttp_OneTime.send();
        }

        self.setChatUserId = function (ChatUserId) {

            return localStorageService.set("ChatUserId", ChatUserId);
        };
        self.getChatUserId = function (ChatUserId) {
            return localStorageService.get("ChatUserId");
        };
        self.clearChatUserId = function () {
                alert()
            return localStorageService.remove("ChatUserId");
        }



    }

    angular.module('eliApp')
    .service('ChatService', ['$resource','localStorageService', ChatService])
}());