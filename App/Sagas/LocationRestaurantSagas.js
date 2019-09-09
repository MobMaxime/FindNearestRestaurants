import { call, put } from 'redux-saga/effects'
import LocationRestActions from '../Redux/LocationRestaurantRedux'

export function* getLocationRestaurants(api, action) {
//   const { username } = action
  const {lat,long,start,count,isLocationRestSuccessCallBack, isLocationFailureCallBack } = action;
  const response = yield call(api.getLocationRestaurants,lat,long,start,count);

  // success?
  try{
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(LocationRestActions.locationRestSuccess(response.data));
      yield call(isLocationRestSuccessCallBack);
    } else {
      const error = errorType(response);
      yield put(LocationRestActions.locationRestFailure(error));
      yield call(isLocationFailureCallBack, error);
    }
  }
  catch(e){
    console.log(e)
  }
}
