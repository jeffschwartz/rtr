/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function() {
    "use strict";

    /**
    * lazyroute-element allows the defered loading of rtr-route elements until they are the target
    * of a routing request. On receiving the 1st routing request for anylazy loaded route,
    * rtr-lazyroute dynamically imports the route-element defined by the importpath attribute by
    * calling the Polymer.import method and then adds that element to the DOM giving it a tag name
    * defined by the tagname attribute. For this and all subsequent route requests it then calls the
    * target route handler defined by the handler attribute to handle the route.
    *
    * @element rtr-lazyroute
    * @status alpha
    * @homepage https://github.com/jeffschwartz/rtr
    * @author Jeff Schwartz
    */
    Polymer("rtr-lazyroute", {

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
        * The path passed to Polymer.import to dynamically load the rtr-route derived import file.
        *
        * @attribute importPath
        * @type string
        * @default ''
        */
        importPath: "",

        /**
        * The tag name to use when adding the rtr-route derived element to the DOM.
        *
        * @attribute tagName
        * @type string
        * @default ''
        */
        tagName: "",

        /**
         * @method domReady A lifecycle callback. Adds rtrRouter rtrHistory, targetEl propertie to itself.
         */
        domReady: function() {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
            this.targetEl = null;
        },

        /**
         * @method routeHandler On receiving the 1st request for any lazy loaded route it will dynamically import and create the appropriate route-element as defined by its attributes. It then calls the target route handler (also defined in its attributes) associated with the request passing it arguments.
         */
        routeHandler: function() {
            var self = this,
                args = arguments;
            if (!this.targetEl) {
                //Dynamically import, construct and insert the element into the DOM
                //and then call its handler
                Polymer.import([this.importPath], function() {
                    var routerEl = document.querySelector("rtr-router");
                    self.targetEl = document.createElement(self.tagname);
                    self.targetEl.setAttribute("method", self.method);
                    self.targetEl.setAttribute("path", self.path);
                    self.targetEl.setAttribute("handler", self.handler);
                    routerEl.appendChild(self.targetEl);
                    self.async(function() {
                        this.callTarget(args);
                    }, null, 100);
                });
            } else {
                //Call the target's handler
                this.callTarget(arguments);
            }
        },
        /**
         * @method callTarget Calls the target element's handler passing it arguments.
         * @param  {object} args A collection of arguments to be passed to the target handler.
         */
        callTarget: function (args) {
            this.targetEl[this.handler].apply(this.targetEl, args);
        }
    });
}());
