$(function() {
    main();
});

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

//****************************************************
function main() {
    alert("Here we go!");
}