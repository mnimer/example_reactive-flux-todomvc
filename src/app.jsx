/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactDOM = require('react-dom');

// load the stores and let the store subscribe to the actions it needs
var TodoStore = require('./stores/TodoStore').subscribe();

//load Services and let them subscribe to the actions they are watching
var CreateService = require('./services/CreateService').subscribe();
var UpdateService = require('./services/UpdateService').subscribe();
var DeleteService = require('./services/DeleteService').subscribe();

//Components
var TodoApp = require('./components/TodoApp');


ReactDOM.render(
  <TodoApp />, document.getElementById('todoapp')
);


