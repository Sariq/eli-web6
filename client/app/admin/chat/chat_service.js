(function () {

    function ChatService($resource) {
        var self = this;
        self.GuID;
        self.xmlHttp_OneTime;
        self.xmlHttp_Process;
        var myJsonObject;
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
            var url = "/AsyncHandler.ashx?cmd=register";
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
            var url = "/AsyncHandler.ashx?cmd=process&guid=" + self.GuID;
            self.xmlHttp_Process.open("POST", url, true);
            return self.xmlHttp_Process;
        }
    


        self.myClick = function (myMessage) {

            var url = "/AsyncHandler.ashx?cmd=sendMessage&myText=" + myMessage;
            self.xmlHttp_OneTime.open("POST", url, true);
            self.xmlHttp_OneTime.send();
        }

        return self;



    }

    angular.module('eli.admin')
    .service('ChatService', ['$resource', ChatService])
}());