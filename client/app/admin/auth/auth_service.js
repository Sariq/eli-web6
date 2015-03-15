(function () {

    function AuthService($resource, $http, localStorageService, jwtHelper, ipCookie) {
        var self = this;
        self.authResource = $resource('/UserService.svc/SignIn/:id', {}, [{ update: { method: 'PUT' } }]);
        // self.authResource = $resource('/DatabaseService.svc/Initialize', {}, [{ update: { method: 'PUT' } }]);
        
        self.getTokenId = function () {
            if (self.TokenId() != null) {
                var tokenPayload = jwtHelper.decodeToken(self.TokenId());
                var bool = jwtHelper.isTokenExpired(self.TokenId());
                if (bool) {
                    $http({
                        url: '/TokenService.svc/RefreshToken',
                        headers: {
                            'Authorization': self.TokenId()
                        },
                        skipAuthorization: true,
                        method: 'POST'
                    }).then(function (response) {
                        var id_token = response.headers("id_token");
                        self.saveToken('id_token', id_token);
                    }, function () { alert("refresh token error") });
                };
                return self.TokenId();
            } else {
                return false;
            }
        }
        self.TokenId = function () {
            return localStorageService.cookie.get('id_token');
        }


        self.setUserInfo = function (userInfo) {
            return localStorageService.set("userInfo", userInfo);
        };
        self.getUserInfo = function (userInfo) {
            return localStorageService.get("userInfo");
        };
        self.clearUserInfo = function () {
            return localStorageService.remove("userInfo");
        }

        self.create = function () {
            var user = {
                userId: '',
                password: '',
                isRememberMe: false,
                projectAassignments: [],
                projects: [],
                reminders: [],
                patients:[]
            };
            return new self.authResource(user);
        };
        self.saveToken = function (key, val) {
            if (!self.getUserInfo().isRememberMe) {
                ipCookie(key, val, { expires: '' });
            } else {
                ipCookie.remove('id_token');
                ipCookie(key, val, { expires: 30 })
            }
        }

    
    }

    angular.module('eli.admin')
      .service('AuthService', ['$resource', '$http', 'localStorageService', 'jwtHelper', 'ipCookie', AuthService])
}());
