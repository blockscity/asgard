import {take, fork, select, call, put, all} from 'redux-saga/effects';
import {REQUEST, SUCCESS, FAILURE} from "actions";
import promisified from './promisified';

function* logger() {
    while (true) {
        const action = yield take("*");
        const state = yield select();
        console.log("Action: " + JSON.stringify(action) + " happend with state: " + JSON.stringify(state));
    }
}

function* request() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(REQUEST));
        switch (type) {
            default:
        }
    }
}

function* success() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(SUCCESS));
        switch (type) {
            default:
        }
    }
}

function* failure() {
    while (true) {
        const {type, payload, meta} = yield take(ac => ac.type.endsWith(FAILURE));
        switch (type) {
            default:
                console.error("failure", type, payload);
        }
    }
}

export default function* () {
    yield all([
        fork(logger),
        fork(request),
        fork(success),
        fork(failure),
        fork(promisified),
    ]);
}
