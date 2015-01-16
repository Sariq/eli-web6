(function () {

    function AuthService($resource, $http, localStorageService, jwtHelper, ipCookie) {
                                               


        var self = this;
        var count = 0;
        self.userInfo = {};
        self.count = 1;
        self.authResource = $resource('/UserService.svc/SignIn/:id', {}, [{ update: { method: 'PUT' } }]);
        //self.tokenRefreshResource = $resource('http://localhost:83\:83/TokenService.svc/RefreshToken/:id', {}, { update: { method: 'PUT' } });
        self.getTokenId = function () {
            if (localStorageService.cookie.get('id_token') != null) {
                var tokenPayload = jwtHelper.decodeToken(localStorageService.cookie.get('id_token'));
                var bool = jwtHelper.isTokenExpired(localStorageService.cookie.get('id_token'));
                console.log("AuthService FUNCTION")
                if (bool) {
                    $http({
                        url: '/TokenService.svc/RefreshToken',
                        headers: {
                            'Authorization': localStorageService.cookie.get('id_token')
                        },
                        skipAuthorization: true,
                        method: 'POST'
                    }).then(function (response) {
                        alert("re")
                        var id_token = response.headers("id_token");
                        self.saveToken('id_token', id_token);
                    }, function () { alert("rssse") });
                };
                return localStorageService.cookie.get('id_token');
            } else {
                return false;
            }
        }
        self.TokenId = function () { if (localStorageService.cookie.get('id_token') != null) { return true } else { return false } }
        self.get = function (auth_id) {

            return self.authResource.get({ id: auth_id }, function (d) {
                self.w = d;
            });
        };

        self.setUserInfo = function (userInfo) {
            self.userInfo = userInfo;
        };
        self.getUserInfo = function (userInfo) {
            return self.userInfo;
        };
        self.create = function () {
            var user = {
                userId: '',
                password: ''
               
            };
            return new self.authResource(user);
        };
        self.saveToken = function (key, val) {
            //change with paylod instead of (self.userInfo._isRememberMe)
            if (!self.userInfo._isRememberMe) {
                ipCookie(key, val, { expires: '' });
            } else {
                ipCookie(key, val, { expires: 30 })
            }
        }

        return self;
    }

    angular.module('eli.admin')
      .service('AuthService', ['$resource', '$http', 'localStorageService', 'jwtHelper', 'ipCookie', AuthService])
}());
