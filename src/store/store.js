import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
 // import { loggerMiddleware } from "./middleware/logger"; <-- or use homemade logger
import thunk from "redux-thunk";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger, // <-- or use homemade logger
  thunk,
].filter(Boolean); // removes anything that is false so if not development we get an empty array
     

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

export const persistor = persistStore(store);
