/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var rx = require('rx');

//action(s)
var TodoActions = require('../actions/TodoActions');

//store(s)
var TodoStore = require('../stores/TodoStore');

//components
var TodoItem = require('./TodoItem');


module.exports = React.createClass({

    getInitialState: function () {
        return {
            todos: [],
            areAllComplete: false
        };
    },


    componentWillMount: function () {

        // listen for property changes in the store
        this.todoListSubscription = TodoStore.todoList.subscribe(function (data_) {
            this.state.todos = data_;

            //loop over and see if everything else is complete, if so flip the flag
            var allCompleted = true;
            for (var i = 0; i < data_.length; i++)
            {
                var item = data_[i];
                if( !item.complete ){
                    allCompleted = false;
                    break;
                }
            }
            this.state.areAllComplete = allCompleted;

            //refresh the UI
            if (this.isMounted()) this.forceUpdate();
        }.bind(this));
    },


    componentWillUnmount: function () {

        if (this.todoListSubscription !== undefined) {
            this.todoListSubscription.dispose();
        }
    },


    _toggleCompleteAll: function (e) {
        TodoActions.toggleCompleteAll.onNext({complete:!this.state.areAllComplete});
    },



    /**
     * @return {object}
     */
    render: function () {

        return (
            <section id="main">
                <input
                    id="toggle-all"
                    type="checkbox"
                    onChange={this._toggleCompleteAll}
                    checked={this.state.areAllComplete ? 'checked' : ''}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>


                <ul id="todo-list">
                    {(() => {
                        return this.state.todos.map(function(item_){
                            return (
                                <TodoItem key={item_.id} todo={item_}/>
                            );
                        });
                    })()}
                </ul>
            </section>
        );
    },

});


