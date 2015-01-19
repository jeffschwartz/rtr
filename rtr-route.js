/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function() {
    "use strict";

    /**
    * An element that reperesents a route. You must extend your own custom route elements from rtr-route (i.e. extends="rtr-route") and provide a route handler function that will be called for the route.
    * @element rtr-route
    * @status alpha
    * @homepage https://github.com/jeffschwartz/rtr
    * @author Jeff Schwartz
    */
    Polymer("rtr-route", {

    /**
    * The method (think REST) associated with the routing request (e.g. "get", "post", "put", "delete", etc.).
    *
    * @attribute method
    * @type string
    * @default 'get'
    */
        method: "get", // A sensible daefault

        /**
        * The path (think URL) used for the routing reques.
        *
        * @attribute path
        * @type string
        * @default ''
        */
        path: "",

        /**
        * The name of the function that is to be called to handle the route.
        *
        * @attribute handler
        * @type string
        * @default ''
        */
        handler: "",

        /**
         * @method domReady A lifecycle callback. Adds rtrRouter and rtrHistory properties to itself.
         */
        domReady: function () {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
        }
    });
}());
