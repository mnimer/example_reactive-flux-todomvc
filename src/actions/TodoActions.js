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
    create: new Rx.Subject(),
    updateText: new Rx.Subject(),
    toggleComplete: new Rx.Subject(),
    toggleCompleteAll: new Rx.Subject(),
    destroy: new Rx.Subject(),
    destroyCompleted: new Rx.Subject()
};

