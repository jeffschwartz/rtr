/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
/**
 * lazyroute-element acts as a delegate for routing requests. On receiving the 1st request
 * for any lazy loaded route it will dynamically import and create the appropriate route-element as
 * defined by its attributes. It then calls the target route handler (also defined in its
 * attributes) associated with the request (see routeHanlder below).
 */
 //TODO(JS): Eliminate having to pass the tag name as an attribute. Posibly obtain the tag name from
 // the imported file itself?
(function() {
    "use strict";
    Polymer("rtr-lazyroute", {
        /**
        * The `domReady` method is a lifecycle callback.
        *
        * @method domReady
        */
        domReady: function() {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
            this.targetEl = null;
        },
        /**
         * @method routeHandler - On receiving the 1st request for any lazy loaded route it will dynamically
         * import and create the appropriate route-element as defined by its attributes. It then
         * calls the target route handler (also defined in its attributes) associated with the
         * request passing it arguments.
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
         * @method callTarget - Calls the target element's handler passing it arguments.
         *
         * @param  {object} args - A collection of arguments to be passed to the target handler.
         */
        callTarget: function (args) {
            this.targetEl[this.handler].apply(this.targetEl, args);
        }
    });
}());
