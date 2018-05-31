import {combineReducers, applyMiddleware, createStore} from 'redux'
import createSagaMiddleware, {END} from 'redux-saga';
import {persistReducer, persistStore, getStoredState} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import rootReducer from 'reducers';
import sagas from 'sagas';

export const configure = async (middlewares, reducers) => {
    let config = {
        key: 'root',
        storage: storage,
        debug: true,
        timeout: 10000,
        stateReconciler: autoMergeLevel2
    };

    let storedState = await getStoredState(config);

    const sagaMiddleware = createSagaMiddleware();
    let _middlewares = [...middlewares, sagaMiddleware];

    let persistedReducer = persistReducer(config, combineReducers({
        ...rootReducer,
        ...reducers
    }));

    let store = createStore(persistedReducer, storedState, applyMiddleware(..._middlewares));

    persistStore(store);

    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);
    return store;
};


export default configure