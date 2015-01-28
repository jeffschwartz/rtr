&lt;rtr-router&gt; is a router built on top of Polymer
======================================================
* Supports routing for <b>anchor tag click events</b>, <b>form submit events</b>, as well as <b>lazy loading of route handlers</b>.
* <b>Everything is a custom element</b> so there is nothing new to learn.

Documentation And Demo
======================
See the [component page](http://jeffschwartz.github.io/rtr/components/rtr/) for complete <b>documentation</b> and <b>demo</b>.

Example
=======
    <rtr-router>
        <myrtr-somepath method="get" path="/somepath" handler="get"></myrtr-somepath>
        <myrtr-somepath method="post" path="/somepath" handler="post"></myrtr-somepath>
        <myrtr-somepath method="put" path="/somepath" handler="put"></myrtr-somepath>
        <myrtr-somepath method="delete" path="/somepath" handler="del"></myrtr-somepath>
        <rtr-lazyroute method="get" path="/somelazypath" handler="get" importPath="myrtr-lazyloaded.html"
            tagname="myrtr-lazyloaded"></rtr-lazyroute>
        <rtr-lazyroute method="post" path="/somelazypath" handler="post" importPath="myrtr-lazyloaded.html"
            tagname="myrtr-lazyloaded"></rtr-lazyroute>
        <rtr-lazyroute method="put" path="/somelazypath" handler="put" importPath="myrtr-lazyloaded.html"
            tagname="myrtr-lazyloaded"></rtr-lazyroute>
        <rtr-lazyroute method="delete" path="/somelazypath" handler="del" importPath="myrtr-lazyloaded.html"
            tagname="myrtr-lazyloaded"></rtr-lazyroute>
    </rtr-router>

Watch this repo for further progress.
=====================================
If you are daring then checkout the development branch which gets merged with feature branches as they mature. If you are really daring then checkout the feature branches.

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
