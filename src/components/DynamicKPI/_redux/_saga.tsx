import { call, put, takeLatest } from "redux-saga/effects";
import { SET_ITEMS, GET_ITEMS } from "./_actions";

export function* getKPIList(action: any) {
  if (action) {
    const response = yield call(fetch, action.url);
    const json = yield call([response, response.json]);
    yield put({ type: SET_ITEMS, payload: json });
  } else {
    yield put({ type: SET_ITEMS, payload: [] });
   }
}

export function* getKPIListAsync() {
  console.log(GET_ITEMS);
  yield takeLatest(GET_ITEMS, getKPIList);
}
