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
Define your routes declaratively:

    <rtr-router>
        <demo-staticpath methdo="get" path="/rtr/demo-staticpath" handler="get"></demo-staticpath>
        <rtr-lazyroute method="get" path="/rtr/demo-lazystaticpath"
            importPath="/rtr/components/rtr/demo/demo-lazystaticpath.html"
            tagname="demo-lazystaticpath" handler="get"></rtr-lazyroute>
        <demo-parameterizedpath methdo="get"
            path="/rtr/demo-parameterizedpath/year/:y/month/:m/day/:d"
            handler="get"></demo-parameterizedpath>
        <rtr-lazyroute method="get"
            path="/rtr/demo-lazyparameterizedpath/year/:y/month/:m/day/:d"
            importPath="/rtr/components/rtr/demo/demo-lazyparameterizedpath.html"
            tagname="demo-lazyparameterizedpath" handler="get"></rtr-lazyroute>
        <demo-formsubmit method="post" path="/rtr/demo-formsubmit" handler="post"></demo-formsubmit>
        <rtr-lazyroute method="post" path="/rtr/demo-lazyformsubmit"
            importPath="/rtr/components/rtr/demo/demo-lazyformsubmit.html"
            tagname="demo-lazyformsubmit" handler="post"></rtr-lazyroute>
        <demo-redirect methdo="get" path="/rtr/demo-redirect" handler="get"></demo-redirect>
        <demo-redirecttarget methdo="get" path="/rtr/demo-redirecttarget" handler="get"></demo-redirecttarget>
    </rtr-router>

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
