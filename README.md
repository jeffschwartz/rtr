## Coming Soon - rtr, a router built on top of Polymer. Supports anchor tabs, form submits, lazy loading. Everything is an element so there is nothing new to learn. Watch this repo for further progress. If you are daring then checkout the development branch which gets merged with feature branches as they mature. If you are really daring then checkout the feature branches.

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


seed-element
============

See the [component page](http://polymerlabs.github.io/seed-element) for more information.

## Getting Started

We've put together a [guide to seed-element](http://www.polymer-project.org/docs/start/reusableelements.html) to help get you rolling.

## Testing Your Element

Add the logic specific to your new element and verify its functionality. Good unit tests are essential to your verification plan but a good way to quickly sanity test your component is to access your demo.html file via a local web server. There are several ways to do this but one easy method is to run a simple web server that ships with Python, using the commands:

```sh
python -m SimpleHTTPServer
```

Or other method using NodeJS:

```sh
http-server ./
```

This starts a web server on port 8000, so you can test your new element by navigating a browser to `localhost:8000/test/index.html`.

### web-component-tester

The tests are also compatible with [web-component-tester](https://github.com/Polymer/web-component-tester). You can run them on multiple local browsers via:

```sh
npm install -g web-component-tester
wct
```
