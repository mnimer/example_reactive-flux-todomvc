/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            totalCount: 0,
            completeCount: 0,
            completed: true
        }
    },


    componentWillMount: function () {

        // listen for property changes
        this.todoListSubscription = TodoStore.todoList.subscribe(function (data_) {
            this.state.todos = data_;

            //todo loop over and see if everything else is complete, if so flip the flag
            this.state.totalCount = data_.length;

            this.state.completeCount = 0;
            for (var i = 0; i < data_.length; i++)
            {
                var item = data_[i];
                if( item.complete ){
                    this.state.completeCount++;
                }
            }


            if (this.isMounted()) this.forceUpdate();
        }.bind(this));
    },


    componentWillUnmount: function () {
        if (this.todoListSubscription !== undefined)
        {
            this.todoListSubscription.dispose();
        }
    },

    /**
     * Event handler to delete all completed TODOs
     */
    _onClearCompletedClick: function () {
        TodoActions.destroyCompleted.onNext(true);
    },


    /**
     * @return {object}
     */
    render: function () {

        var itemsLeft = this.state.totalCount - this.state.completeCount;
        var itemsLeftPhrase = (itemsLeft === 1 ? ' item ' : ' items ') + 'left';

        return (
            <footer id="footer">
                <span id="todo-count">
                  <strong>{itemsLeft}</strong>{itemsLeftPhrase}
                </span>

                <ul id="filters" className="filters">
                    <li>
                        <a
                            href="#/"
                            className="selected">
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/active">
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#/completed">
                            Completed
                        </a>
                    </li>
                </ul>

                {(() => {
                    if (this.state.completeCount > 0)
                    {
                        return (
                            <button
                                id="clear-completed"
                                onClick={this._onClearCompletedClick}>
                                Clear completed ({this.state.completeCount})
                            </button>
                        );
                    }
                })()}
            </footer>
        );
    }

});


