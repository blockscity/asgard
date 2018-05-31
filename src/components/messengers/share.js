import React, {Component, createElement} from 'react';
import {connect} from 'react-redux'
import {alloc, dealloc} from './actions'
import {isEmpty} from 'lodash';

export default (props) => {
    const {children, messenger} = props;
    return (<div>
        {
            React.Children.map(children, child =>
                React.cloneElement(child, {...this.props, messenger: messenger, data: messenger.uri}))
        }
    </div>)
}