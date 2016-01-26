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

        TodoActions.create.subscribe(function(data_){
            this._createTodoItem(data_);
        }.bind(this));

        TodoActions.updateText.subscribe(function(data_){
            this._updateTodoItem(data_.item, data_.text);
        }.bind(this));

        TodoActions.destroy.subscribe(function(data_){
            debugger;
            this._removeTodoItem(data_.item);
        }.bind(this));

        TodoActions.destroyCompleted.subscribe(function(data_){
            debugger;
            this._removeCompletedTodoItems();
        }.bind(this));

        TodoActions.toggleComplete.subscribe(function(data_){
            this._toggleItem(data_.item, data_.complete);
        }.bind(this));

        TodoActions.toggleCompleteAll.subscribe(function(data_){
            this._toggleAll(data_.complete);
        }.bind(this));
    },


    /**
     * Create new TODO items
     * @param text_
     * @private
     */
    _createTodoItem:function(text_)
    {
        // Hand waving here -- not showing how this interacts with XHR or persistent
        // server-side storage.
        // Using the current timestamp + random number in place of a real id.
        var _id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var _todo = {
            id: _id,
            complete: false,
            text: text_
        };

        if( _todo.text.length > 0 ) // don't add empty items
        {
            // add the new _todo item to the array stored in the todoList subject
            this.todoList.getValue().push(_todo);
        }
        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( this.todoList.getValue() );
    },


    /**
     * Update the todo item text
     * @param item_
     * @param text_
     * @private
     */
    _updateTodoItem: function( item_, text_ ){

        item_.text = text_;
        var list = this.todoList.getValue();

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( list );
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
            if( !todo.complete )
            {
                newList.push(todo);
            }
        }

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( newList );
    },


    /**
     * Set the completed flag for a single item
     * @param item_
     * @param toggle_
     * @private
     */
    _toggleItem: function( item_, completed_ ){
        var list = this.todoList.getValue();
        item_.complete = completed_; //update reference

        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( list );
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
        }

        debugger;
        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext( list );
    }
};


