import { compose, applyMiddleware, createStore, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { loggerMiddleware } from "./middleware/logger"; <-- or use homemade logger
// import thunk from "redux-thunk";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger, // <-- or use homemade logger
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); // removes anything that is false so if not development mode we get an empty array

const componsedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const componsedEnhancers = componsedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  componsedEnhancers
);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);
