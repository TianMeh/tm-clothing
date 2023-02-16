import { all, call } from "typed-redux-saga/macro";

import { categories } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {

    yield* all([call(categories), call(userSagas)])
}
