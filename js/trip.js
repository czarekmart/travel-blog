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

    var _trips;
    var _maxId = 0;
    var _currentTrip;

    Trips.prototype = {
        LoadTrips: function(successCallback, errorCallback) {

            $.getJSON( "./data/trips.json", function(data) {
                _trips = data;
                if(_trips) {
                    for (var i = 0; i < _trips.length; i++) {
                        if (_trips[i].id > _maxId) _maxId = _trips[i].id;
                    }
                }
                console.log("Loaded trips. Max id = ", _maxId);
            })
                .done(function() {
                    if(successCallback) {
                        successCallback(_trips);
                    }
                })
                .fail(function(err) {
                    if(errorCallback) {
                        errorCallback(err);
                    }
                });


        },
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
        },
        AddBlog: function(blog) {
            if(_currentTrip ) {
                if(!_currentTrip.blogs) {
                    _currentTrip.blogs = [];
                }
                var newBlog = {};
                if(blog.text) newBlog.text = blog.text;
                if(blog.imgUrl) newBlog.imgUrl = blog.imgUrl;
                if(blog.imgDesc) newBlog.imgDesc = blog.imgDesc;
                _currentTrip.blogs.push(newBlog);
            }
            return this;
        }
    };

    Trips.init.prototype = Trips.prototype;

    global.Trips = Trips;
    global.$t = Trips();

})(window);

