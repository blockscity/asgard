import {take, call, put, race, takeEvery, all} from 'redux-saga/effects';
import {PROMISIFIED} from "actions";

export function* promisifiedHandler({ payload }) {
    const { request, defer, types } = payload;
    const { resolve, reject } = defer;
    const [ SUCCESS, FAILURE ] = types;

    const [ { success, failure } ] = yield all([
        race({
            success: take(SUCCESS),
            failure: take(FAILURE),
        }),
        put(request),
    ]);

    if (success) {
        yield call(resolve);
    } else {
        yield call(reject, failure && failure.payload ? failure.payload : failure);
    }
}

export default function* promisified() {
    yield takeEvery(PROMISIFIED, promisifiedHandler);
}