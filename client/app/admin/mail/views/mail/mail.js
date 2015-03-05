(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailCtrl($location, $scope, MailService, $stateParams, $http, AuthService, MailService, UserAdmin, $rootScope, $anchorScroll) {
        var self = this;
        self.inoxCounter = 0;
        self.userList = MailService.getUserList();
        self.user = AuthService.getUserInfo();
        self.curMessage = '';
        self.pageIdx = 0;

        //Get MailMessages
        self.getInboxFromService = function () {
            self.mailMessages = MailService.getMailMessages();
            self.messagesByCat();
        }
        self.getInboxFromHttp = function () {
            self.mailMessagesPromise = MailService.getMailMessagesHttp(self.user._id);
            self.mailMessagesPromise.then(function (response) {
                MailService.setMailMessages(response.data)
                self.mailMessages = response.data;
                self.messagesByCat();
            });
            
        }

        self.messagesByCat = function () {


            self.inboxMessages = [];
            self.sentMessages = [];
            self.trashMessages = [];
            self.starMessages = [];

            console.log(self.mailMessages)

            angular.forEach(self.mailMessages, function (value, key) {

                if (!value.isDelete && value.fromUser[0] != self.user._id) {
                    if (!value.isRead)
                        self.inoxCounter++;
                    alert(value.isDelete);
                    self.inboxMessages.push(value);
                }

                if (value.isDelete) {
                    console.log(value)
                    self.trashMessages.push(value)
                }

                if (value.fromUser[0] == self.user._id && !value.isDelete) {
                    self.sentMessages.push(value)
                }
                if (value.isStar && !value.isDelete) {
                    self.starMessages.push(value)
                }


            });
            MailService.setInboxMessages(self.inboxMessages);
            MailService.setSentMessages(self.sentMessages);
            MailService.setTrashMessages(self.trashMessages);
            MailService.setStarMessages(self.starMessages);
            $rootScope.$broadcast("CatMailMessages");

        }




        $scope.$on('mailMessagesFromService', function () {
         
            self.getInboxFromService()
        });

        $scope.$on('mailMessagesFromHttp', function () {

            self.getInboxFromHttp()
        });


        self.getInboxFromService();

        //Delete Email
        self.deleteMail = function () {
            var tmpDelArr = [];
            angular.forEach(self.inboxMessages, function (value, key) {
                if (value.isChecked) {
                 
                    tmpDelArr.push(value._id)
                }
            });
            $http({
                url: '/MailMessageService.svc/DeleteMailMessagesFromInbox',
                method: 'POST',
                data: tmpDelArr
            }).then(function (response) {

                self.getInbox();


            }, function () { alert("DeleteMailMessagesFromInbox error") });
        }


        //set Current Meesage
        self.setCurMessage = function (message) {
            MailService.setCurMessage(message);
            $anchorScroll();
        }

        //toRead
        self.toRead = function (messages) {
            var flag = false;
            angular.forEach(messages, function (value, key) {
                if (value.isChecked) {
                    flag = true;
                    value.isRead = true;
                }
            })
            if (flag) {
                $http.post('/MailMessageService.svc/UpdateMailMessages', messages).
                        success(function (data, status, headers, config) {
                            $rootScope.$broadcast("mailMessagesFromHttp");
                        }).error(function (data, status, headers, config) { });
            }
        }
        //toUnread
        self.toUnRead = function (messages) {
            var flag = false;
            angular.forEach(messages, function (value, key) {
                if (value.isChecked) {
                    flag = true;
                    value.isRead = false;
                }
            })
            if (flag) {
                $http.post('/MailMessageService.svc/UpdateMailMessages', messages).
                        success(function (data, status, headers, config) {
                            $rootScope.$broadcast("mailMessagesFromHttp");
                        }).error(function (data, status, headers, config) { });
            }
        }

        //Update Star
        self.changeStar = function (message) {
            message.isStar = !message.isStar;
            $http.post('/MailMessageService.svc/UpdateMailMessage', message).
                      success(function (data, status, headers, config) {
                          $rootScope.$broadcast("mailMessagesFromHttp");
                      }).error(function (data, status, headers, config) { });
        }

        //Refresh

        self.refresh = function () {
            $rootScope.$broadcast("mailMessagesFromHttp");
        }

        //DeleteMessages
        self.deleteMail = function (messages) {
            MailService.deleteMessages(messages);
        }

    

    }

    angular.module('eli.admin')
        .controller('MailCtrl', ['$location', '$scope', 'MailService', '$stateParams', '$http', 'AuthService', 'MailService', 'UserAdmin','$rootScope','$anchorScroll', MailCtrl]);
}());










