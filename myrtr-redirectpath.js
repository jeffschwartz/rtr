(function() {
    "use strict";
    Polymer("myrtr-redirectpath", {
        get: function() {
            console.log("myrtr-redirectpath get called");
            console.log("redirecting to /rtr/somepath");
            this.rtrHistory.navigate({
                state: {
                    verb: "get",
                    path: "/rtr/somepath"
                },
                method: "get",
                url: "/rtr/somepath",
                pushState: true,
                trigger: true
            });
        },
        post: function() {
            console.log("myrtr-redirectpath post called");
        },
        put: function() {
            console.log("myrtr-redirectpath put called");
        },
        del: function() {
            console.log("myrtr-redirectpath delete called");
        }
    });
}());
