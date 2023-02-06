import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// root-reducer

const middleWares = [logger];

const componsedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, componsedEnhancers);
