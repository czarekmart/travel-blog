'use strict';

//==================================================
// ROUTES
//==================================================
angular.module('travelBlogApp', ['ngRoute', 'ngResource'])

    .config(function($routeProvider){

    console.log("Executing routeProvider");
    $routeProvider

        .when('/', {
            templateUrl: 'views/blog-list.html',
            controller: 'CurrentTripController'
        })
        .when('/:id', {
            templateUrl: 'views/blog-list.html',
            controller: 'CurrentTripController'
        });
});


//****************************************************
// MAIN
//****************************************************
$(function() {

    $("[data-hide]").on("click", function(){
        var selector = "." + $(this).attr("data-hide");
        console.log("Selector: ", selector);
        $(this).closest(selector).hide();
    });

    $('#newTripLink').click(function(evt){
        evt.preventDefault();
        // Clear fields
        $('#tripDate').val('');
        $('#tripTitle').val('');
        $('#tripLocation').val('');
        $('#newTripModal').modal('toggle');
    });

    //$('#enterTripButton').click(newTripButtonHandler);

    //$('#enterBlogButton').click(newBlogEntryHandler);

    /*
     $t.LoadTrips(
     function() {
     selectTrip(populateTripMenu());
     },
     function(err) {
     console.log("Failed to load trips: ", err.status, err.statusText );
     });
     */

});
