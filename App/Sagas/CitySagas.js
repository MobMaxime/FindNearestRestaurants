import { call, put } from 'redux-saga/effects'
import CityActions from '../Redux/CityRedux'

export function* getCity(api, action) {
  const {city_name,isCitySuccessCallBack, isCityFailureCallBack } = action;
  const response = yield call(api.getCity,city_name);

  // success?
  try{
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(CityActions.citySuccess(response.data));
      yield call(isCitySuccessCallBack);
    } else {
      const error = errorType(response);
      yield put(CityActions.cityFailure(error));
      yield call(isCityFailureCallBack, error);
    }
  }catch(e)
  {
    console.log(e);
  }
}
