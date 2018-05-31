import React from 'react'
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash';
import {identity} from 'reducers/selectors';

class Restricted extends React.Component {
    render() {
        const {
            identity,
            component: Component,
            ...props
        } = this.props;

        return (
            <Route
                {...props}
                render={props =>
                    (identity && !isEmpty(identity))
                        ? <Component {...props} />
                        : (
                            <Redirect to={{
                                pathname: '/login',
                                state: {from: props.location}
                            }}/>
                        )
                }
            />
        )
    }
}

export default connect(state => ({identity: identity(state)}))(Restricted)