/**
 * Created by Simon on 16/12/27.
 */
angular.module("timeApp", []).controller("timeCtrl", ["$scope", "$interval", "timeService", function ($scope, $interval, timeService) {
    $scope.edit = true;
    $scope.go = true;
    $scope.timeCtrl={
        hour:"00",
        min:"00",
        sec:"10"
    }
    $scope.hour = "00";
    $scope.min = "01";
    $scope.sec = "11";
    $scope.start = function () {
        if ($scope.timeCtrl.hour == 0 && $scope.timeCtrl.min == 0 && $scope.timeCtrl.sec == 0) {
            alert("Please type the number into the input!")
        } else {
            $scope.go = false;
            $scope.edit = true;
            $scope.t = $interval(function(){
                timeService.startTime($scope.timeCtrl)
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
            startTime: function (timeCtrl) {

                timeCtrl.sec--;
                if (timeCtrl.sec < 0) {
                    timeCtrl.sec = 59;
                    timeCtrl.min = timeCtrl.min - 1;
                }

                if (timeCtrl.min < 0) {
                    timeCtrl.min = 59;
                    timeCtrl.hour = timeCtrl.hour - 1;
                }


                timeCtrl.hour=this.checkTime(timeCtrl.hour);
                timeCtrl.min=this.checkTime(timeCtrl.min);
                timeCtrl.sec=this.checkTime(timeCtrl.sec);

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