export const PROMISIFIED = '@bifrost/PROMISIFIED';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const promisify = (type, payloadFormatter = f => f, metaProvider = f => f) => {
    if (typeof type !== 'string') {
        type = "UNKNOWN";
    }

    let actions = [REQUEST, SUCCESS, FAILURE].reduce((acc, status) => {
        acc[status] = `${type}_${status}`;
        acc[status.toLowerCase()] = payload => ({
            type: `${type}_${status}`,
            payload: payloadFormatter(payload),
            meta: metaProvider(payload)
        });
        return acc
    }, {});

    return Object.assign((data, dispatch) => {
        const promisify = (payload) => ({
            type: PROMISIFIED,
            payload,
        });
        return new Promise((resolve, reject) => {
            dispatch(promisify({
                types: [SUCCESS, FAILURE].reduce((acc, status) => {
                    return [...acc, `${type}_${status}`]
                }, []),
                request: actions[`${REQUEST}`.toLowerCase()](data),
                defer: {resolve, reject},
            }));
        });
    }, actions);
};