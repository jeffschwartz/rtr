(function() {
    "use strict";
    Polymer("myrtr-datepath", {
        get: function(yyyy, mm, dd){
            console.log("myrtr-datepath get called with argument", arguments);
        },
        post: function(yyyy, mm, dd, formVals){
            console.log("myrtr-datepath post called", arguments);
        },
        put: function (yyyy, mm, dd, formVals) {
            console.log("myrtr-datepath put called", arguments);
        },
        del: function (yyyy, mm, dd, formVals) {
            console.log("myrtr-datepath delete called", arguments);
        }
    });
}());
