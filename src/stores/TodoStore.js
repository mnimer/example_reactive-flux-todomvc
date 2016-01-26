/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */
'use strict';
var Rx = require("rx");
var TodoActions = require("../actions/TodoActions");


module.exports = {
    todoList: new Rx.BehaviorSubject([]),


    /**
     * Subscribe method to link store to actions
     */
    subscribe:function()
    {
        TodoActions.destroyCompleted.subscribe(function(data_){
            this._removeCompletedTodoItems();
        }.bind(this));

        TodoActions.toggleCompleteAll.subscribe(function(data_){
            this._toggleAll(data_.complete);
        }.bind(this));



        //////////////////////////
        // Listen for the results from the different Service Calls (notice the "sink" in the path)
        //
        TodoActions.create.sink.subscribe(function(data_){
            this._createTodoItem(data_);
        }.bind(this));

        TodoActions.update.sink.subscribe(function(data_){
            this._updateTodoItem(data_);
        }.bind(this));

        TodoActions.destroy.sink.subscribe(function(data_){
            this._removeTodoItem(data_);
        }.bind(this));
    },




    /**
     * Create new TODO items
     * @param text_
     * @private
     */
    _createTodoItem:function(item_)
    {
        var list = this.todoList.getValue();
        // add the new _todo item to the array stored in the todoList subject
        list.push(item_);

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( list );
    },


    /**
     * Update the todo item text
     *
     * @param item_
     * @param text_
     * @private
     */
    _updateTodoItem: function( item_, text_ ){
        var list = this.todoList.getValue();
        var newList = [];

        for (var i = 0; i < list.length; i++)
        {
            debugger;
            var todo = list[i];
            if( todo.id === item_.id )
            {
                // add the new item instead of what's in the array
                newList.push(item_);
            }else{
                newList.push(todo);
            }
        }

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( newList );
    },



    /**
     * Update the todo item text
     * @param item_
     * @param text_
     * @private
     */
    _removeTodoItem: function( item_ ){
        var list = this.todoList.getValue();
        var newList = [];

        for (var i = 0; i < list.length; i++)
        {
            var todo = list[i];
            // add everything but the one that was deleted
            if( todo.id !== item_.id )
            {
                newList.push(todo);
            }
        }

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( newList );
    },

    /**
     * Update the todo item text
     * @param item_
     * @param text_
     * @private
     */
    _removeCompletedTodoItems: function( ){
        var list = this.todoList.getValue();
        var newList = [];

        for (var i = 0; i < list.length; i++)
        {
            var todo = list[i];
            if( todo.complete )
            {
                // call the destroy service for each item that has been marked complete
                TodoActions.destroy.source.onNext(todo);
            }
        }
    },



    /**
     * Set the completed flag for a all items
     * @param toggle_
     * @private
     */
    _toggleAll: function( completed_ ){
        var list = this.todoList.getValue();

        for (var i = 0; i < list.length; i++)
        {
            var todo = list[i];
            todo.complete = completed_;

            // Call the update service to save the changes
            TodoActions.update.source.onNext(todo);
        }

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( list );
    }
};


