$(function() {
    main();
});
//****************************************************
function formatDate(date) {
    var result = moment(date, "YYYYMMDD").format("MMM Do, YYYY");
    return result;
}
//****************************************************
function populateTripMenu() {

    var $tripMenu = $('#tripMenu');

    // clear choices first
    $tripMenu.html('');

    var ulHtml = '';
    var lastTrip;
    $t.GetTrips().sort($t.TripComparer).forEach(function(trip) {

        ulHtml += '<li><a href="#" data-tripid="' + trip.id + '">' + trip.name + ', ' + formatDate(trip.date) + '</a></li>';
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
        $('#tripName').html(trip.name + ', ' + formatDate(trip.date));
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
        var internalDate = moment(date, "YYYY-MM-DD").format("YYYYMMDD");
        var trip = $t.AddTrip({date: internalDate, name: title, location: location});
        populateTripMenu();
        selectTrip(trip);
        $('#newTripModal').modal('hide');
    }
}

//****************************************************
function newBlogEntryHandler(evt) {

    var $alert = $('#newBlogAlert');
    var $span = $alert.find("span").first();

    var imgUrl = $('#imageUrl').val();
    var blogText = $('#blogText').val();

    //var imgUrl1 = $("#imageUrl").text(someHtmlString);
    alert("You entered: " + imgUrl + ": " + blogText);

    // Note: you have to escape control characters when writing into labels
    // Here is how:
    // Option 1
    // before:
    // <div class="someClass">text</div>
    /*
    var someHtmlString = "<script>alert('hi!');</script>";

    // set a DIV's text:
    $("div.someClass").text(someHtmlString);
    // after:
    // <div class="someClass">&lt;script&gt;alert('hi!');&lt;/script&gt;</div>

    // get the text in a string:
    var escaped = $("<div>").text(someHtmlString).html();
    // value:
    // &lt;script&gt;alert('hi!');&lt;/script&gt;
    */

    // Option 2: http://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery
    /*
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });

    }
       */
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

    $('#enterBlogButton').click(newBlogEntryHandler);

    selectTrip(populateTripMenu());
}