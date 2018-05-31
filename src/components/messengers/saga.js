import {all, fork, take, put} from "redux-saga/es/effects";
import {REQUEST, SUCCESS, FAILURE} from "actions";
import {TYPE} from "./actions";
import * as actions from "./actions";
import promisified from "../../sagas/promisified";
import api from './api';

function* request(client) {
    let messengers = new api(client);
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(REQUEST) && ac.type.startsWith(TYPE));
        switch (type) {
            case `${actions.alloc.REQUEST}`:
                let messenger = yield messengers.alloc();
                yield put(actions.alloc.success(messenger));
                break;
            default:
        }
    }
}

function* success() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(SUCCESS) && ac.type.startsWith(TYPE));
        switch (type) {
            default:
        }
    }
}

function* failure() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(FAILURE) && ac.type.startsWith(TYPE));
        switch (type) {
            default:
                console.error("failure", type, payload);
        }
    }
}


export default client =>  function* () {
    yield all([
        fork(request, client),
        fork(success, client),
        fork(failure, client),
    ]);
}
