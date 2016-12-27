/**
 * Created by Simon on 16/12/27.
 */
angular.module("timeApp", [])
    .controller("timeCtrl", ["$scope", "$interval", "timeService", function ($scope, $interval, timeService) {
        $scope.edit = true;
        $scope.go = true;
        $scope.timeCtrl = {
            hour: "00",
            min: "00",
            sec: "00"
        };
        $scope.start = function () {
            if ($scope.timeCtrl.hour == 0 && $scope.timeCtrl.min == 0 && $scope.timeCtrl.sec == 0) {
                alert("Please type the number into the input!")
            } else {
                $scope.go = false;
                $scope.edit = true;
                $scope.t = $interval(function () {
                    timeService.startTime($scope.timeCtrl);
                    if ($scope.timeCtrl.hour == 0 && $scope.timeCtrl.min == 0 && $scope.timeCtrl.sec == 0) {
                        $interval.cancel($scope.t);
                        $scope.go = true;
                    }
                }, 1000);
            }
        };
        $scope.stop = function () {
            $scope.go = true;
            $interval.cancel($scope.t);
        }
    }])
    .service("timeService", function () {
        return {
            startTime: function (param) {
                param.sec--;
                if (param.sec < 0) {
                    param.sec = 59;
                    param.min = param.min - 1;
                }
                if (param.min < 0) {
                    param.min = 59;
                    param.hour = param.hour - 1;
                }
                param.hour = this.checkTime(param.hour);
                param.min = this.checkTime(param.min);
                param.sec = this.checkTime(param.sec);
            },
            checkTime: function (param) {
                var string = param.toString();
                if (string.length === 1) {
                    string = "0" + string;
                }
                return string;
            }
        }
    })