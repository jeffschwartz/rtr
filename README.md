&lt;rtr-router&gt; is a router built on top of Polymer
======================================================
* Routing for <b>anchor tag click events</b> and <b>form submit events</b>.
* Optional <b>lazy loading</b> of route handlers.
* <b>Static</b> and <b>parameterized</b> paths.
* Form submits are conveniently routed to their handlers with a <b>hash of input values</b>.
* <b>Everything is a custom element</b> so there is nothing new to learn.

Documentation And Demo
======================
See the [component page](http://jeffschwartz.github.io/rtr/components/rtr/) for complete <b>documentation</b> and <b>demo</b>.

Example
=======
Define your routes using JavaScript:

    <link rel="import" href="../../polymer/polymer.html">
    <link rel="import" href="../rtr-route.html">
    <polymer-element name="demo-routes" extends="rtr-route">
        <template>
        </template>
        <script>
```javascript
(function() {
    "use strict";
    Polymer("demo-routes", {
        staticPath: function(){
            document.getElementById("demo-staticpath-info").textContent =
                "demo-staticpath \"staticPath\" route handler called";
            console.log("demo-staticpath \"staticPath\" route handler called");
        },
        parameterizedPath: function(year, month, day) {
            document.getElementById("demo-parameterizedpath-info").innerHTML =
                "demo-parameterizedpath \"parameterizedPath\" route handler was called with parameters" +
                "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-parameterizedpath \"parameterizedPath\" route handler called");
        },
        formSubmit: function(valuesHash) {
            document.getElementById("demo-formsubmit-info").innerHTML =
                "demo-formsubmit \"formSubmit\" route handler was called with a form's valuesHash" +
                "<br>name = " + valuesHash.txtName + "<br>occupation = " + valuesHash.selOccupation.toString();
            console.log("demo-formsubmit \"formSubmit\" route handler called");
        }
    });
}());
```
        </script>
    </polymer-element>

Declare your routes in your markup:

    <html>
    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <title>rtr Demo</title>
    <script src="../webcomponentsjs/webcomponents.min.js"></script>
    <link rel="import" href="rtr-router.html">
    <link rel="import" href="demo/demo-routes.html">
    </head>
    <body>
    ...
    <rtr-router>
        <!-- demo-routes: declares multiple route handlers -->
        <demo-routes
            routes='[{
                "method": "get",
                "path": "/rtr/components/rtr/demo-staticpath",
                "handler": "staticPath"
            }, {
                "method": "get",
                "path": "/rtr/components/rtr/demo-parameterizedpath/year/:y/month/:m/day/:d",
                "handler": "parameterizedPath"
            }, {
                "method": "post",
                "path": "/rtr/components/rtr/demo-formsubmit",
                "handler": "formSubmit"
            }]'></demo-routes>
    </rtr-router>
    ...
    </body>
    </html>

How you can contribute to this project
======================================
No project is an island and this project is no different. Your participation is fundamental to this project's success. It needs your feedback in the form of bug reports and feature requests, both of which can be filed [here](https://github.com/jeffschwartz/rtr/issues).

Watch this repo for further progress
=====================================
The master branch represents the current stable tip of the repo. Development branches are merged into the master branch as the development branche matures. If you are daring then checkout the development branch which gets merged with feature branches as they mature. If you are really daring then checkout the feature branches (if there are any).

LICENSE
=======
Copyright (c) 2015 Jeffrey Schwartz. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Jeffrey Schwartz nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOTLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
