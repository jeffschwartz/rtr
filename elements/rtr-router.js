/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function(w) {
    "use strict";
    var initCalled = false,
        routes = {};

    function route(verb, url, valuesHash) {
        //TODO(JS) a way to do some work prior to processing the 1st routing request
        var rt = getRoute(verb, url);
        //0.6.5 Push valuesHash onto route.params so it will be passed to
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

    function contains(s1, s2) {
        // if (typeof(s1) === "string") {
        //     for (var i = 0, len = s1.length; i < len; i++) {
        //         if (s1[i] === s2) {
        //             return true;
        //         }
        //     }
        // }
        // return false;
        return [].some.call(s1, function(ch) {
            return ch === s2;
        });
    }

    function getRoute(verb, url) {
        var a = url.substring(1).split("/"),
            params = [],
            rel = false,
            b, c, eq, vrb, route, handlers;
        for (route in routes) {
            if (routes.hasOwnProperty(route)) {
                //Get the "veb".
                // vrb = route.substring(0, route.indexOf(" "));
                // If the route has a matching verb then handlers will be set to the callback
                handlers = routes[route][verb];
                if (handlers) {
                    //Get the url.
                    b = route.substring(route.indexOf("/") + 1).split("/");
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
                                if (c.length === 2) {
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

    function routeFound(route) {
        //0.6.0 Prior versions called controller.init() when the controller is loaded. Starting with 0.6.0,
        //controller.init() is only called when routing is called to one of their route callbacks. This
        //eliminates unnecessary initialization if the controller is never used.
        // var controller = v.controllers.getController(route.controllerName);
        // if (controller.hasOwnProperty("init") && !controller.hasOwnProperty("initCalled")) {
        //     controller.init();
        //     controller.initCalled = true;
        // }
        //Route callbacks are bound (their contexts (their "this")) to their controllers.
        //0.6.5 valuesHash now pushed onto route.params - route handlers can now receive parameters and a valuesHash.
        route.handlers.forEach(function(r) {
            if (route.params.length) {
                r.apply(route.params);
            } else {
                r.call();
            }
        });
    }

    function routeNotFound(url) {
        console.log("router::routeNotFound called with route = " + url);
    }

    // v.router = {
    //     route: route
    // };

    Polymer("rtr-router", {
        ready: function() {
            document.addEventListener("location-changed", this.locationChangedHandler);
            // this.onMutation(this, this.mutated);
        },
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
        // init: function(callback) {
        //     callback();
        //     initCalled = true;
        // },
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
                routeEl[routeEl.handler].bind( routeEl));
        },
        route: function(method, path, valuesHash) {
            console.log("router.route called");
            route(method, path, valuesHash);
        },
        locationChangedHandler: function(evt) {
            console.log("router caught location-changed event", evt.detail);
        }
        // ,
        // mutated: function(observer, mutations) {
        //     console.log("router mutated called");
        //     console.log("observer", observer);
        //     console.log("mutations", mutations);
        //     this.onMutation(this, this.mutated);
        // }
    });
}(window));
