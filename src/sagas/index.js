import {take, fork, select, call, put, all} from 'redux-saga/effects';
import {REQUEST, SUCCESS, FAILURE} from "actions";
import promisified from './promisified';
import messengers from 'components/messengers/saga'
import 'whatwg-fetch';

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
    class HttpError extends Error {
        constructor(message, status, body = null) {
            super(message);
            this.message = message;
            this.status = status;
            this.body = body;
            this.name = this.constructor.name;
            if (typeof Error.captureStackTrace === 'function') {
                Error.captureStackTrace(this, this.constructor);
            } else {
                this.stack = new Error(message).stack;
            }
            this.stack = new Error().stack;
        }
    }

    let client = (url) => ({
            abs: uri => {
                return `${url}${uri}`
            },
            rel: uri => {
                return uri.replace(url, "");
            },
            fetch: (path, options) => {
                const requestHeaders =
                    (options.headers && new Headers({...options.headers})) ||
                    new Headers({
                        Accept: 'application/json',
                    });
                if (
                    !requestHeaders.has('Content-Type') &&
                    !(options && options.body && options.body instanceof FormData)
                ) {
                    requestHeaders.set('Content-Type', 'application/json');
                }

                return fetch(`${url}${path}`, {...options, headers: requestHeaders})
                    .then(response =>
                        response.text().then(text => ({
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers,
                            body: text,
                        })))
                    .then(({status, statusText, headers, body}) => {
                        let json;
                        try {
                            json = JSON.parse(body);
                        } catch (e) {
                            // not json, no big deal
                        }
                        if (status < 200 || status >= 300) {
                            return Promise.reject(
                                new HttpError(
                                    (json && json.message) || statusText,
                                    status,
                                    json
                                )
                            );
                        }
                        return {status, headers, body, json};
                    });
            }
        })
    ;
    yield all([
        fork(logger),
        fork(request),
        fork(success),
        fork(failure),
        fork(promisified),
        fork(messengers(client("http://localhost:3002")))
    ]);
}
