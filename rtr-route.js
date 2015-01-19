/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function() {
    "use strict";
    /**
    * @element rtr-route
    * An element that reperesents a route. You must derive your own custom route elements from rtr-route (i.e. extends="rtr-route") and provide a route handler function that will be called for the route.
    * @attribute method Either "get", "post", "put" or "delete".
    * @attribute path The URL asociated with this route.
    * @attribute handler The name of the function that is to be called to handle the route.
    * @status alpha
    * @homepage https://github.com/jeffschwartz/rtr
    * @author Jeff Schwartz
    */
    Polymer("rtr-route", {
        /**
         * @method domReady A lifecycle callback. Adds rtrRouter and rtrHistory properties to itself.
         */
        domReady: function () {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
        },
        method: "get", // A sensible daefault
        path: "",
        handler: ""
    });
}());
