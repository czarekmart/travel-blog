//====== BlogEntry base class
function BlogEntry(text, imgUrl) {
    this.blogText = text;
    this.imageUrl = imgUrl;
}

BlogEntry.prototype.isTextOnly = function() {
    return this.blogText && !this.imageUrl;
}
BlogEntry.prototype.isImageOnly = function() {
    return this.imageUrl && !this.blogText;
}

BlogEntry.prototype.isImageAndText = function() {
    return this.imageUrl && this.blogText;
}

//========= BlogTextEntry
function BlogTextEntry(text) {
    BlogEntry.call(this, text, null);
}
BlogTextEntry.prototype = Object.create(BlogEntry.prototype);

//========= BlogImageEntry
function BlogImageEntry(imgUrl) {
    BlogEntry.call(this, null, imgUrl);
}
BlogImageEntry.prototype = Object.create(BlogEntry.prototype);

//============ Trip ===========================
function Trip(name, location, date, id) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.date = date;
    this.entries = [];
}

//**********************************************
(function (global) {

    var Trips = function() {
        return new Trips.init();
    }

    Trips.init = function () {

    }

    var _trips = makeUpTrips();
    var _maxId = 0;
    var _currentTrip;

    for(var i = 0; i < _trips.length; i++) {
        if( _trips[i].id > _maxId ) _maxId = _trips[i].id;
    }
    console.log("Loaded trips. Max id = ", _maxId);

    Trips.prototype = {
        GetTrips: function () {
            return _trips;
        },
        FindTripById: function(id) {
            var trip;
            if(id) {
                trip = _trips.find(function (elem) {
                    return elem.id == id;
                });
            }
            return trip;
        },
        AddTrip: function(trip) {
            var newTrip = new Trip(trip.name, trip.location, trip.date, ++_maxId);
            _trips.push(newTrip);
            return newTrip;
        },
        SetCurrentTrip: function(trip) {
            _currentTrip = trip;
            console.log("Current trip is", trip);
            return this;
        },
        GetCurrentTrip: function() {
            return _currentTrip;
        }

    };

    Trips.init.prototype = Trips.prototype;

    global.Trips = Trips;
    global.$t = Trips();

})(window);



function makeUpTrips() {
    var trips = [];
    trips.push(
        new Trip('Oregon Dunes', "Coose Bay, Oregon", '2012/3/21', 67),
        new Trip('Indian Wells', 'Palm Springs, CA', '2014/03/14', 87),
        new Trip('Royal Caribbean Cruise', 'Western Caribbeans', '2013/07/02', 21));
    return trips;
};

