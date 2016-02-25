$(function() {
    main();
});

//****************************************************
function populateTripMenu() {

    var $tripMenu = $('#tripMenu');

    // clear choices first
    $tripMenu.html('');

    var ulHtml = '';
    var lastTrip;
    $t.GetTrips().forEach(function(trip) {

        ulHtml += '<li><a href="#" data-tripid="' + trip.id + '">' + trip.name + ', ' + trip.date + '</a></li>';
        lastTrip = trip;
    });

    $tripMenu.html(ulHtml);

    // We need to set the handler here because we erase handlers when we erase the menu
    $('#tripMenu>li>a').click(function(evt) {
        var tripid = $(evt.target).attr("data-tripid");
        var trip = $t.FindTripById(tripid);
        selectTrip(trip);
    });

    return lastTrip;
}

//****************************************************
function selectTrip(trip) {
    if(trip) {
        $('#tripName').html(trip.name + ', ' + trip.date);
        $t.SetCurrentTrip(trip);
    }
}

//****************************************************
// Handles clicking the button on 'New Trip' modal dialog
function newTripButtonHandler(evt) {

    var $alert = $('#newTripAlert');
    var $span = $alert.find("span").first();

    var date = $('#tripDate').val();
    var title = $('#tripTitle').val();
    var location = $('#tripLocation').val();
    if(!date) {
        $span.html('Please enter valid trip date.');
        $alert.show();
    }
    else if (!title) {
        $span.html('Please enter trip title.');
        $alert.show();
    }
    else if (!location) {
        $span.html("Please enter trip location.");
        $alert.show();
    }
    else {
        var trip = $t.AddTrip({date: date, name: title, location: location});
        populateTripMenu();
        selectTrip(trip);
        $('#newTripModal').modal('hide');
    }

}

//****************************************************
function main() {

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

    $('#enterTripButton').click(newTripButtonHandler);

    selectTrip(populateTripMenu());
}