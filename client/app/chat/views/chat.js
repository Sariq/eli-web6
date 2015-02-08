(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param ChatService: Service
     * @constructor
     */
    function ChatController($location, $scope, $stateParams, ChatService) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        //self.info = ChatService.info;
 
  
        //chat

        var GuID;
        var xmlHttp_OneTime;
        var xmlHttp_Process;
        var myJsonObject;

        self.myLoad = function () {
       
            try {
                xmlHttp_OneTime = new ActiveXObject("Microsoft.XMLHTTP");
                xmlHttp_Process = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlHttp_OneTime = new XMLHttpRequest()
                    xmlHttp_Process = new XMLHttpRequest()
                }
                catch (e) {
                }
            }
            var url = "/AsyncHandler.ashx?cmd=register";
            xmlHttp_OneTime.open("POST", url, true);
            xmlHttp_OneTime.onreadystatechange = self.getResponse_Connect;
            xmlHttp_OneTime.send();
        }

        self.getResponse_Connect=function () {
            if (xmlHttp_OneTime.readyState == 4) {
                GuID = xmlHttp_OneTime.responseText;
                self.FirstTimeFunction();
            }
        }
        self.FirstTimeFunction=function () {
            var url = "/AsyncHandler.ashx?cmd=firstTime";
            xmlHttp_OneTime.open("POST", url, true);
            xmlHttp_OneTime.onreadystatechange = self.getResponse_FirstTime;
            xmlHttp_OneTime.send();
        }
        self.getResponse_FirstTime=function () {
            if (xmlHttp_OneTime.readyState == 4) {
                var myJSON_Text = xmlHttp_OneTime.responseText;
                myJsonObject = eval('(' + myJSON_Text + ')');
                console.log(myJsonObject)
                self.ProcessFunction();
            }
        }

        self.myUnLoad=function () {
            var url = "/AsyncHandler.ashx?cmd=unregister";
            xmlHttp_OneTime.open("POST", url, true);
            xmlHttp_OneTime.send();
        }

        self.ProcessFunction=function () {
            var url = "/AsyncHandler.ashx?cmd=process&guid=" + GuID;
            xmlHttp_Process.open("POST", url, true);
            xmlHttp_Process.onreadystatechange = self.getResponse_Process;
            xmlHttp_Process.send();
        }
        self.getResponse_Process=function () {
            if (xmlHttp_Process.readyState == 4) {
                var myJSON_Text = xmlHttp_Process.responseText;

                var myJsonObject_Temp = eval('(' + myJSON_Text + ')');
                console.log(myJsonObject_Temp)
                self.ProcessFunction();
            }
        }

        self.myClick=function () {
       
            var url = "/AsyncHandler.ashx?cmd=sendMessage&myText=" + self.myMessage;
            xmlHttp_OneTime.open("POST", url, true);
            xmlHttp_OneTime.send();
        }

        window.onunload = self.myUnLoad;
        window.onload = self.myLoad;

        //chat


   
        self.patientId = $stateParams.patientId;
        self.meetingId = $stateParams.meetingId;
        //alert($stateParams.patientId)
        self.steps = [];

       

        self.isValid = function () {
            return true;
        };

        if (self.patientId) {

           // self.patient = ChatService.get($stateParams.patientId);
            self.patient.$promise.then(function (result) {
                console.log(self.patient);
                if (typeof (self.meetingId) != 'undefined') {

                 //   ChatService.addMeeting(self.patient, self.meetingId);
                   // alert(angular.toJson(self.patient))
                    self.patient.$save(function (response) {
                        //alert(angular.toJson(response))
                    });
                }

            });

        } else {
            self.isNew = true;
            //self.patient = ChatService.create();
        }

      
       

        self.save = function () {
           
            var success_url = '/patients';
            if (self.configurationId) {
                success_url = success_url + '/' + self.patient;

            }
            if (self.isNew) {

                console.log(self.patient);
                self.patient.$save(function (response) {
                    console.log(response);
                   
                        $location.path(success_url);
                   
                        
                   
                });
            } else {
              
                self.patient.$update(function (response) {
                    console.log(response);
                   
                        $location.path(success_url);
                 
                });
            }
        };










    }

    angular.module('eliApp')
        .controller('ChatController', ['$location', '$scope',  '$stateParams','ChatService', ChatController]);
}());










