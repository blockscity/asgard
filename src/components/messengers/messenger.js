import React, {Component, createElement} from 'react';
import {connect} from 'react-redux'
import {alloc, dealloc, heard} from './actions'
import {isEmpty} from 'lodash';

class Messenger extends Component {

    componentWillMount() {
        const {alloc, messenger, heard} = this.props;
        if (messenger === undefined || messenger === null || isEmpty(messenger)) {
            alloc()
        } else {
            heard(messenger);
        }
        // dispatch create topic
        // the messengers topic existed and not expired , direct return or create new
    }

    render() {
        const {alloc, messenger, children, heard, hearing, bye} = this.props;
        if (messenger === undefined || messenger === null || isEmpty(messenger) || isEmpty(messenger.attributes)) {
            return (<div>
                {
                    hearing !== null && hearing !== undefined ?
                        React.cloneElement(hearing,{}) :
                        (<div>Loading</div>)
                }
            </div>)
        }
        if (messenger.attributes && messenger.attributes.content) {
            return (<div>
                {
                    heard || heard(messenger)
                }
                {

                    React.Children.map(children, child =>
                        React.cloneElement(child, {...this.props, messenger: messenger}))
                }
            </div>);
        }
    }
}

const messenger = state => {
    // todo: should able to filter the expired messenger, or invalid messenger
    return state.messenger;
};

let s2p = (state, props) => {
    return {
        messenger: messenger(state)
    };
};

let d2p = dispatch => {
    return {
        alloc: () => dispatch(alloc.request({})),
        heard: (messenger) => dispatch(heard.request(messenger)),
        dealloc: (messenger) => dispatch(dealloc.request(messenger))
    };
};

export default connect(s2p, d2p)(Messenger);
