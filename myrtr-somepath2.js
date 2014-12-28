(function() {
    "use strict";
    Polymer("myrtr-somepath2", {
        get: function(){
            console.log("myrtr-somepath2 get called");
        },
        post: function(){
            console.log("myrtr-somepath2 post called");
        },
        put: function () {
            console.log("myrtr-somepath2 put called");
        },
        del: function () {
            console.log("myrtr-somepath2 delete called");
        }
    });
}());
