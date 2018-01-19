import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers';

const middlewares = [];

let sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
middlewares.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initState) {
    const store = createStoreWithMiddleware(rootReducer, initState);
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
};