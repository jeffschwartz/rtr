/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function(w) {
    "use strict";
    var routes = {};
    /**
     * Routes the request.
     *
     * @param  {string} verb - Eighter get, post, put, delete.
     * @param  {strung} url - The request path.
     * @param  {object} valuesHash - A values hash if request is for a form submit.
     */
    function route(verb, url, valuesHash) {
        //TODO(JS) a way to do some work prior to processing the 1st routing request
        var rt = getRoute(verb, url);
        //Push valuesHash onto route.params so it will be passed to
        //the handler, following any parameter arguments, as the last argument.
        if (rt) {
            if (valuesHash) {
                rt.params.push(valuesHash);
            }
            routeFound(rt);
        } else {
            routeNotFound(verb, url);
        }
    }
    /**
     * Returns true if s1 contains the character s2.
     *
     * @param  {string} s1 - The string to search if it contains the character s2.
     * @param  {string} s2 - The character to search for.
     * @return {boolean} true if found, otherwise false.
     */
    function contains(s1, s2) {
        return [].some.call(s1, function(ch) {
            return ch === s2;
        });
    }
    /**
     * Parses the request and attempts to match it to route handlers.
     *
     * @param  {string} verb - Either get, post, put, delete.
     * @param  {string} url -  A URL path that begins with a "/".
     * @return {object} If a match is found returns a hash with a handlers and a params property. If
     * not found return undefined.
     */
    function getRoute(verb, url) {
        // var a = url.substring(1).split("/"),
        var a = url.split("/"),
            params = [],
            rel = false,
            b, c, eq, route, handlers;
        for (route in routes) {
            if (routes.hasOwnProperty(route)) {
                //Get the "veb".
                // vrb = route.substring(0, route.indexOf(" "));
                // If the route has a matching verb then handlers will be set to the callback
                handlers = routes[route][verb];
                if (handlers) {
                    //Get the url.
                    // b = route.substring(route.indexOf("/") + 1).split("/");
                    b = route.split("/");
                    if (a.length === b.length || contains(route, "*")) {
                        eq = true;
                        //The url and the route have the same number of segments so the route can
                        //be either static or it could contain parameterized segments.
                        for (var i = 0, len = b.length; i < len; i++) {
                            //If the segments are equal then continue looping.
                            if (a[i] === b[i]) {
                                continue;
                            }
                            //If the route segment is parameterized then save the parameter and continue looping.
                            if (contains(b[i], ":")) {
                                //0.4.0 - checking for "some:thing"
                                c = b[i].split(":");
                                if (c.length === 2 && c[0]) {
                                    if (a[i].substr(0, c[0].length) === c[0]) {
                                        params.push(a[i].substr(c[0].length));
                                    }
                                } else {
                                    params.push(a[i]);
                                }
                                continue;
                            }
                            //If the route is a relative route, push it onto the array and break out of the loop.
                            if (contains(b[i], "*")) {
                                rel = true;
                                eq = false;
                                break;
                            }
                            //If none of the above
                            eq = false;
                            break;
                        }
                        //The route matches the url so attach the params (it could be empty) to the route and return the route.
                        if (eq) {
                            //function to call, function arguments to call with...
                            return {
                                // controllerName: routes[route][0],
                                handlers: handlers,
                                params: params
                            };
                        }
                        if (rel) {
                            //function to call, function arguments to call with...
                            for (var ii = i, llen = a.length, relUrl = ""; ii < llen; ii++) {
                                relUrl += ("/" + a[ii]);
                            }
                            //function to call, function arguments to call with...
                            return {
                                // controllerName: routes[route][0],
                                handlers: handlers,
                                params: [relUrl]
                            };
                        }
                    }
                }
            }
        }
    }
    /**
     * Routes the request to the target handlers.
     *
     * @param  {object} route - A hash which contains a handlers and a params property.
     */
    function routeFound(route) {
        route.handlers.forEach(function(r){
            /*
              *** Note ***
              The handler function, r, has already been bound to its Route or LazyRoute
              object (see addRoute below). Using apply and call on them as is done below
              cannot change the calling context they were bound to because once bound the
              function's calling context cannot be changed.
            */
            if (route.params.length) {
                r.apply(null, route.params);
            } else {
                r.call(null);
            }
        });
    }
    /**
     * Called when target handlers cannot be found for the request.
     *
     * @param  {string} url - The request path.
     */
    function routeNotFound(url) {
        //TODO(JS): perhaps allow user defined callback here
        console.log("router::routeNotFound called with route = " + url);
    }
    /**
    *An element that provides routing.
    * @element rtr-router
    * @summary An element that provides routing.
    * @status alpha
    * @homepage https://github.com/jeffschwartz/rtr
    * @author Jeff Schwartz
    */
    Polymer("rtr-router", {
        /**
         * @method domReady - A lifecycle callback. Adds rtrHistory property to itself and propagates
         * the routes array.
         */
        domReady: function() {
            var self = this;
            this.rtrHistory = this.shadowRoot.querySelector("rtr-history");
            [].forEach.call(this.children, function(routeEl) {
                if (routeEl instanceof w.RtrRoute || routeEl instanceof w.RtrLazyRoute) {
                    self.addRoute(routeEl);
                }
            });
            console.log("routes hash", routes);
        },
        /**
         * @method addRoute - Called by domReady. Adds a route to the routes hash (see domeReady above).
         * @param {element} routeEl - Either a rtr-route element or a rtr-lazyroute element.
         */
        addRoute: function(routeEl) {
            if (!routes[routeEl.path]) {
                routes[routeEl.path] = {};
            }
            if (!routes[routeEl.path][routeEl.method]) {
                routes[routeEl.path][routeEl.method] = [];
            }
            routes[routeEl.path][routeEl.method].push(
                routeEl instanceof w.RtrLazyRoute ?
                routeEl.routeHandler.bind(routeEl) :
                routeEl[routeEl.handler].bind(routeEl));
        },
        /**
         * @method route - Called to route a request to its target handlers.
         * @param  {string} method - Either "get", "post", "put" or "delete".
         * @param  {string} path - The request path.
         * @param  {object} hash - A hash of form element names (keys) and their values (values) to
         * pass to the target handler as  the last argument if the request is for a form submit.
         */
        route: function(method, path, valuesHash) {
            console.log("router.route called");
            route(method, path, valuesHash);
        }
    });
}(window));
