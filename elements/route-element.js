(function() {
    "use strict";
    Polymer("route-element", {
        method: "get", // A sensible daefault
        path: "",
        handler: "routeHandler",
        // A no-op handler meant to be overriden in derived route handlers
        routeHandler: function() {}
    });
}());
