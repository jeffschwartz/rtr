(function() {
    "use strict";
    Polymer("myrtr-lazyloaded", {
        ready: function() {
            console.log("myrtr-lazyloaded ready called");
        },
        get: function(){
            console.log("myrtr-lazyloaded get called");
        },
        post: function(){
            console.log("myrtr-lazyloaded post called");
        },
        put: function () {
            console.log("myrtr-lazyloaded put called");
        },
        del: function () {
            console.log("myrtr-lazyloaded delete called");
        }
    });
}());
