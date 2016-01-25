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
    //Subjects to hold the stores values (properties)
    todoCount: new Rx.BehaviorSubject(0),
    completedCount: new Rx.BehaviorSubject(0),
    todoList: new Rx.BehaviorSubject([]),


    /**
     * Subscribe method to link store to actions
     */
    subscribe:function()
    {


        TodoActions.create.subscribe(function(data_){
            this._createTodoItem(data_);
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

        // add the new _todo item to the array stored in the todoList subject
        this.todoList.value.push(_todo);
        //reset the value in the subject to trigger all subscribers
        this.todoList.onNext(this.todoList.value);
    }

};


