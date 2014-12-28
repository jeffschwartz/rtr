(function() {
    "use strict";
    Polymer("myrtr-somepath", {
        get: function(){
            console.log("myrtr-somepath get called");
        },
        post: function(){
            console.log("myrtr-somepath post called");
        },
        put: function () {
            console.log("myrtr-somepath put called");
        },
        del: function () {
            console.log("myrtr-somepath delete called");
        }
    });
}());
