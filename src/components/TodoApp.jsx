/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var TodoStore = require('./../stores/TodoStore');



module.exports = React.createClass({

  componentDidMount: function() { },

  componentWillUnmount: function() { },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection/>
        <Footer />
      </div>
    );
  },

});

