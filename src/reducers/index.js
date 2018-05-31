import {combineReducers} from 'redux';
import {REQUEST, SUCCESS, FAILURE} from 'actions';


const appReducer = combineReducers({
    consistent: (state = {}, action) => {
        return state
    },
    identity: (state = {}, action) => {
        return state;
    }
});

const reducers = (state, action) => {
    switch (action.type) {
        default:
            return appReducer(state, action)
    }

};

export default reducers
