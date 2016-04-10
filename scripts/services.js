'use strict';

//==================================================
// travelBlogApp service
//==================================================
angular.module('travelBlogApp')

    .service('travelService', function($http) {

        console.log("travelService: executing");

        var trips;
        var currentTrip;

        //----------------------------------------
        var tripComparer = function(a,b) {
            return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : (a.id- b.id);
        };
        //-----------------------------------------
        var findTripById = function(id) {
            var trip;
            if(trips && id) {
                trip = trips.find(function (elem) {
                    return elem.id == id;
                });
            }
            return trip;
        };
        //-----------------------------------------
        var getFirstTrip = function() {
            var trip;
            if (trips) {
                trip = trips[0];
            }
            return trip;
        };
        //-----------------------------------------
        this.getTrips = function(callback) {
            if(trips) {
                console.log("travelService: Getting trips already loaded.")
                setTimeout(function() {
                    callback(trips);
                }, 0);
            }
            else {
                console.log("travelService: Loading trips from json");
                $http.get("data/trips.json")
                    .then(function(response) {
                        trips = response.data.sort(tripComparer);
                        currentTrip = getFirstTrip();
                        callback(trips);
                    });
            }
        };
        //-----------------------------------------
        this.setCurrentTripById = function(id) {
            currentTrip = findTripById(id);
            return currentTrip;
        }
        //-----------------------------------------
        this.getCurrentTrip = function() {
            return currentTrip;
        }
    });

