'use strict';
var Rx = require("rx");
var TodoActions = require("../actions/TodoActions");


module.exports = {

    sink: undefined,

    subscribe: function () {
        console.log("{Create Service} subscribe");

        // save a reference to the sink Subject, we'll send the results back down this channel
        this.sink = TodoActions.create.sink;

        // call the execute function when we get back data
        TodoActions.create.source.subscribe(this.execute.bind(this));
    },

    /**
     * Return all of the data for a single node
     * @param val_
     * @returns {*}
     */
    execute: function (item_) {



        if( item_.text.length > 0 )  // skip empty items
        {
            // loop back on itself (replace with code below)
            item_.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            item_.complete = false;
            this.sink.onNext(item_);
        }

        /*****
         * In real code you can use code like this to make your ajax call back to the server, and wait for the results
        var _this = this;
        var _url = "/api/todo";
        $.ajax({
            method: "POST",
            url: _url
        }).then(function (data_, status_, xhr_) {

            // send results back to the application, through the sink Subject
            _this.sink.onNext(data_);

        }, function (xhr_, status_, errorThrown_) {

            //send the error to the store (through the sink observer as well)
            var _error = {'code': xhr_.status, 'status': xhr_.statusText, 'message': xhr_.responseText};
            _this.sink.onError(_error);

        });
        **/
    }
};