'use strict';

angular.module('travelBlogApp')

    //------------------------------------------------
    // TripRouteController
    //------------------------------------------------
    .controller('CurrentTripController', [ '$scope', '$routeParams', 'travelService', function($scope, $routeParams, travelService){

        console.log("CurrentTripController:executing , id = " + $routeParams.id);

        travelService.getTrips(function(data) {

            $scope.trips = data;
            if ($routeParams.id) {
                travelService.setCurrentTripById($routeParams.id);
                console.log("CurrentTripController:Received trip[" + $routeParams.id + "]");
            }
            else {
                console.log("CurrentTripController:Received trip with default id");
            }
            $scope.currentTrip = travelService.getCurrentTrip();
            console.log("CurrentTripController:Current trip: ", $scope.currentTrip);
            $scope.$apply();
        });

        $scope.newBlog = {};

        var clearNewBlog = function() {
            $scope.newBlog.imgUrl = "";
            $scope.newBlog.imgDesc = "";
            $scope.newBlog.text = "";
        };

        clearNewBlog();

        $scope.submitBlog = function() {

            $scope.currentTrip.blogs.push({
                imgUrl: $scope.newBlog.imgUrl,
                imgDesc: $scope.newBlog.imgDesc,
                text: $scope.newBlog.text
            });
            clearNewBlog();
        };

    }])

    //------------------------------------------------
    // TripListController
    //------------------------------------------------
    .controller('TripListController', [ '$scope', 'travelService', function($scope, travelService){

        console.log("TripListController:executing");

        travelService.getTrips(function(data) {
            $scope.trips = data;
        });
    }])

;
