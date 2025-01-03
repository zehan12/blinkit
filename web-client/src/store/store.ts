import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducer";
import rootSaga from "./saga";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the rootReducer and saga middleware
export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: false,
});

sagaMiddleware.run(rootSaga);
