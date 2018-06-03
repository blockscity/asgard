import * as actions from './actions';

export default (state = {}, action) => {
    switch (action.type) {
        case actions.alloc.SUCCESS:
            return {...state, ...action.payload};
        case actions.heard.SUCCESS:
            return {...state, ...action.payload};
        default:
            return state;
    }

};