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
            _trips.push({
                trip: trip.name,
                location: trip.location,
                date: trip.date,
                id: ++_maxId,
            });
            return newTrip;
        },
        SetCurrentTrip: function(trip) {
            _currentTrip = trip;
            console.log("Current trip is", trip);
            return this;
        },
        GetCurrentTrip: function() {
            return _currentTrip;
        },
        TripComparer: function(a,b) {
            return (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : (a.id- b.id);
        }

    };

    Trips.init.prototype = Trips.prototype;

    global.Trips = Trips;
    global.$t = Trips();

})(window);



function makeUpTrips() {
    return [
        {
            name: 'Oregon Dunes',
            location: "Coose Bay, Oregon",
            date: '20120321',
            id: 7,
        },
        {
            name: 'Indian Wells',
            location: 'Palm Springs, CA',
            date: '20140411',
            id: 17,
        },
        {
            name: 'Royal Caribbean Cruise',
            location: "Western Caribbeans",
            date: '20130702',
            id: 3,
        },
        {
            name: 'Mount Baker Skiing',
            location: "Mount Baker Skiing Area",
            date: '20130320',
            id: 24,
            blogs: [
                {
                    text: "" +
                    "Lorem ipsum dolor sit amet, non pellentesque adipiscing enim quisque, tellus nonummy adipiscing in nullam wisi lacus, donec interdum, "+
                    "mattis et pharetra sem. Sed ac commodo parturient, aliquam vestibulum etiam, metus neque tellus "+
                    "sed a, sed vel vel. Arcu urna vestibulum adipiscing mauris amet phasellus, "+
                    "donec turpis eu egestas elit nisl lorem, eu phasellus scelerisque elit ligula sapien nec. "+
                    "Et suspendisse, egestas eu nulla, suscipit sed ante quisquam laoreet enim, "+
                    "velit nec eros morbi pellentesque fermentum interdum, "+
                    "laoreet wisi quis turpis orci. Magna scelerisque sed, justo deleniti vel vel volutpat rutrum duis, "+
                    "vitae potenti justo sodales gravida arcu, ornare nec at amet enim neque, "+
                    "eleifend volutpat vitae metus sed sagittis. ",

                    imgUrl: "img/mtbaker1.jpg",
                    imgDesc: 'Mount Baker Winterland',
                },
                {
                    imgUrl: 'img/shuksan1.jpg',
                    imgDesc: 'Mount Shuksan',
                },
                {
                    text: "" +
                    "Lorem ipsum dolor sit amet, non pellentesque adipiscing enim quisque, tellus nonummy adipiscing in nullam wisi lacus, donec interdum, "+
                    "mattis et pharetra sem. Sed ac commodo parturient, aliquam vestibulum etiam, metus neque tellus "+
                    "sed a, sed vel vel. Arcu urna vestibulum adipiscing mauris amet phasellus, "+
                    "donec turpis eu egestas elit nisl lorem, eu phasellus scelerisque elit ligula sapien nec. "+
                    "Et suspendisse, egestas eu nulla, suscipit sed ante quisquam laoreet enim, "+
                    "velit nec eros morbi pellentesque fermentum interdum, "+
                    "laoreet wisi quis turpis orci. Magna scelerisque sed, justo deleniti vel vel volutpat rutrum duis, "+
                    "vitae potenti justo sodales gravida arcu, ornare nec at amet enim neque, "+
                    "eleifend volutpat vitae metus sed sagittis. ",

                    imgUrl: "img/mtbaker1.jpg",
                    imgDesc: 'Mount Baker Winterland',
                },
                {
                    text: ""+
                    'Lorem ipsum dolor sit amet, non pellentesque adipiscing enim quisque, tellus nonummy adipiscing in nullam wisi lacus, donec interdum, '+
                    'mattis et pharetra sem. Sed ac commodo parturient, aliquam vestibulum etiam, metus neque tellus '+
                    'sed a, sed vel vel. "rcu urna vestibulum adipiscing mauris amet phasellus, '+
                    'donec turpis eu egestas elit nisl lorem, eu phasellus scelerisque elit ligula sapien nec. '+
                    'Et suspendisse, egestas eu nulla, suscipit sed ante quisquam laoreet enim, '+
                    'velit nec eros morbi pellentesque fermentum interdum, '+
                    'laoreet wisi quis turpis orci. Magna scelerisque sed, justo deleniti vel vel volutpat rutrum duis, '+
                    'vitae potenti justo sodales gravida arcu, ornare nec at amet enim neque, '+
                    'eleifend volutpat vitae metus sed sagittis. Tristique augue vel lorem, mi interdum risus sed, '+
                    'in pulvinar, nisl hac quisque libero, non elit. Elementum vel urna penatibus cursus et tempor, '+
                    'duis purus, est nibh, convallis nulla nec fermentum erat. Sed viverra vestibulum gravida, '+
                    'tristique iaculis est ligula ullamcorper, nonummy pretium orci. '
                },
            ],
        },
    ];
};

