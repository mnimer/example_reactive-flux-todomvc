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
var TodoTextInput = require('./TodoTextInput');

var classNames = require('classnames');

module.exports = React.createClass({

    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            isEditing: false
        };
    },


    _onDoubleClick: function () {
        this.setState({isEditing: true});
    },

    _onToggleComplete: function () {
        // update the property and trigger the action that will tell the service to update
        this.props.todo.complete = !this.props.todo.complete;
        TodoActions.update.source.onNext(this.props.todo);
    },

    _onSave: function (text_) {
        this.setState({isEditing: false});
        // update the property and trigger the action that will tell the service to update
        item:this.props.todo.text = text_;
        TodoActions.update.source.onNext(this.props.todo);
    },

    _onDestroyClick: function () {
        //trigger the action to call the service and remove the item
        TodoActions.destroy.source.onNext(this.props.todo);
    },


    /**
     * @return {object}
     */
    render: function () {
        var todo = this.props.todo;

        var input;
        if (this.state.isEditing)
        {
            input =
                <TodoTextInput
                    className="edit"
                    onSave={this._onSave}
                    value={todo.text}
                />;
        }

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (
            <li
                className={classNames({
                  'completed': todo.complete,
                  'editing': this.state.isEditing
                })}
                key={todo.id}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this._onToggleComplete}
                    />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onDestroyClick}/>
                </div>
                {input}
            </li>
        );
    }

});
