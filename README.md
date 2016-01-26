# Reactive-Flux TodoMVC Example
This is what a running Reactive Flux TodoMVC example with ReactJS & RxJS looks like:

<img src="screenshot.png" style="width: 100%;" />



## Overview
Branches:
* "master" - latest development version with all branches merged together
* "simple" - Initial version of the todo mvc app with everything in memory
* "with-services" - Adding onto the simple branch with stubbed in support for AJAX services


## Overview


## Structure and Data Flow


### Views


### Actions


### Stores


## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).

To run the app, spin up an HTTP server and visit http://localhost/.../todomvc-flux/.  Or simply open the index.html file in a browser.


## Credit

This TodoMVC application was forked form the [flux example application](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) and re-created by [Mike Nimer](https://www.twitter.com/mnimer).


