$(function() {
    main();
});


//****************************************************
function main() {
    $('#openTripLink').click(function(evt){
        // open modal to select a trip
    });

    $('#newTripLink').click(function(evt){
        $('#newTripModal').modal('toggle');
    });
    $('#enterTrip').click(function(evt){
        var date = $('#tripDate').val();
        var title = $('#tripTitle').val();
        var location = $('#tripLocation').val();
        Trips().AddTrip({date:date, name: title, location: location});
        $('#newTripModal').modal('hide');
    });
}