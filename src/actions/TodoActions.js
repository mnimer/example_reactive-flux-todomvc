/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */
'use strict';
var Rx = require("rx");

module.exports = {

    /**
     * trigger a new filter on the todo list
     */
    filter: new Rx.Subject(),

    /**
     * Create new a new item in the list
     */
    create: new Rx.Subject(),

    /**
     * Edit a single item
     */
    updateText: new Rx.Subject(),

    /**
     * Mark a single item complete
     */
    toggleComplete: new Rx.Subject(),

    /**
     * Mark all items in the list complete
     */
    toggleCompleteAll: new Rx.Subject(),

    /**
     * Remove a single item from the list
     */
    destroy: new Rx.Subject(),

    /**
     * Remove all items in the list that have already been marked complete
     */
    destroyCompleted: new Rx.Subject()
};

