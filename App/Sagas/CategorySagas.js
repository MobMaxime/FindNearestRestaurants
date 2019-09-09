import { call, put } from 'redux-saga/effects'
import CategoryActions from '../Redux/CategoryRedux'
export function* getCategories(api, action) {
  const {isSuccessCallBack, isFailureCallBack } = action;
  const response = yield call(api.getCategory);

  // success?
  try{
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(CategoryActions.categorySuccess(response.data));
      yield call(isSuccessCallBack);
    } else {
      const error = errorType(response);
      yield put(CategoryActions.categoryFailure(error));
      yield call(isFailureCallBack, error);
    }
  }catch(e)
  {
    console.log(e);
  }
}
