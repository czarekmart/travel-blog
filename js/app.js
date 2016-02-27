$(function() {
    main();
});
//****************************************************
function formatDate(date,format) {
    if(!format) {
        format = "MMM Do, YYYY";
    }
    var result = moment(date, "YYYYMMDD").format(format);
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
        $('#nameHeader').text(trip.name);
        $('#locationHeader').text(trip.location + ', ' + formatDate(trip.date, "MMMM Do, YYYY"));
        // fill the blogs
        var $blogs = $('#blogs');
        $blogs.html('');    // clear first
        if(trip.blogs) {
            var imgOnLeft = true;
            trip.blogs.forEach(function(blog){
                if(blog.text || blog.imgUrl) {
                    var $rowContent = $('<div class="row row-content"></div>');

                    var $img, $p, $imgDiv, $textDiv;
                    if(blog.imgUrl) {
                        $img = $('<img src="' + blog.imgUrl + '" class="img-responsive">');
                        if (blog.imgDesc) {
                            $img.attr('alt', blog.imgDesc);
                        }
                    }
                    if(blog.text) {
                        $p = $('<p />');
                        $p.text(blog.text);
                    }

                    if(blog.text && blog.imgUrl) {
                        // text and blog
                        $imgDiv = $('<div class="col-xs-12 col-sm-7"></div>');
                        $textDiv = $('<div class="col-xs-12 col-sm-5"></div>');

                        $imgDiv.append($img);
                        $textDiv.append($p);

                        if(imgOnLeft) {
                            $rowContent.append($imgDiv);
                            $rowContent.append($textDiv);
                        }
                        else {
                            $rowContent.append($textDiv);
                            $rowContent.append($imgDiv);
                        }
                        imgOnLeft = !imgOnLeft;
                    }
                    else if (blog.text) {
                        // only text
                        $textDiv = $('<div class="col-xs-12 col-sm-12"></div>');
                        $textDiv.append($p);
                        $rowContent.append($textDiv);
                    }
                    else {
                        // only image
                        $img.addClass('center-block'); // if it's only image then it needs to be centered
                        $imgDiv = $('<div class="col-xs-12 col-sm-12"></div>');
                        $imgDiv.append($img);
                        $rowContent.append($imgDiv);
                    }
                    $blogs.append($rowContent);
                }
            });
        }

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