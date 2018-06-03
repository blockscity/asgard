import {all, fork, take, put, spawn, call} from "redux-saga/es/effects";
import {REQUEST, SUCCESS, FAILURE} from "actions";
import {TYPE} from "./actions";
import * as actions from "./actions";
import promisified from "../../sagas/promisified";
import api from './api';
import {isEmpty} from 'lodash';

function* request(client) {
    let messengers = new api(client);
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(REQUEST) && ac.type.startsWith(TYPE));
        switch (type) {
            case `${actions.alloc.REQUEST}`:
                let messenger = yield messengers.alloc();
                yield put(actions.alloc.success(messenger));
                break;
            case `${actions.heard.REQUEST}`:
                let m = yield messengers.heard(payload);
                yield put(actions.heard.success(m));
                break;
            default:
        }
    }
}

function* success() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(SUCCESS) && ac.type.startsWith(TYPE));
        switch (type) {
            case `${actions.alloc.SUCCESS}`:
                yield put(actions.heard.request(payload));
                break;
            case `${actions.heard.SUCCESS}`:
                yield call((second) => new Promise(resolve => setTimeout(() => resolve(), second)), 1000);
                if (payload.attributes && !isEmpty(payload.attributes)) {
                    yield put(actions.dealloc.request());
                    break;
                }
                yield put(actions.heard.request(payload));
                break;
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


export default client => function* () {
    yield all([
        fork(request, client),
        fork(success, client),
        fork(failure, client),
    ]);
}
