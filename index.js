/**
 * Created by Simon on 16/12/27.
 */
angular.module("timeApp", []).controller("timeCtrl", ["$scope", "$interval", function ($scope, $interval) {
    $scope.edit = true;
    $scope.hour = "00";
    $scope.min = "00";
    $scope.sec = "00";
    $scope.go = true;
    $scope.start = function () {
        if($scope.hour == 0 && $scope.min == 0 && $scope.sec == 0){
            alert("Please type the number into the input!")
        }else{
            $scope.go = false;
            $scope.edit = true;
            checkNull($scope.hour);
            checkNull($scope.min);
            checkNull($scope.sec);
            t = $interval(startTime, 1000);
        }

        function startTime() {
            $scope.sec--;

            if ($scope.sec < 0) {
                $scope.sec = 59;
                $scope.min = $scope.min - 1
            }
            if ($scope.min < 0) {
                $scope.min = 59;
                $scope.hour = $scope.hour - 1;
            }
            checktime($scope.hour);
            checktime($scope.min);
            checktime($scope.sec);
            if ($scope.hour == 0 && $scope.min == 0 && $scope.sec == 0) {
                $interval.cancel(t);
            }
        }

        function checktime(param) {
            if (param < 10) {
                param = "0" + param;
            }
            return param;
        }

        function checkNull(param) {
            if (param == "") {
                param = "00";
            }
            return param;

        }
    };
    $scope.stop = function () {
        $scope.go = true;
        $interval.cancel(t);
    }


}])