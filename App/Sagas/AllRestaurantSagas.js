import { call, put } from 'redux-saga/effects'
import RestaurantsActions from '../Redux/AllRestaurantRedux'

export function* getRestaurants(api, action) {
//   const { username } = action
  const {start,count,category_id,isRestaurantSuccessCallBack, isRestaurantFailureCallBack } = action;
  const response = yield call(api.getRestaurants,start,count,category_id);

  // success?
  try{
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(RestaurantsActions.restaurantsSuccess(response.data));
      yield call(isRestaurantSuccessCallBack);
    } else {
      const error = errorType(response);
      yield put(RestaurantsActions.restaurantsFailure(error));
      yield call(isRestaurantFailureCallBack, error);
    }
  }
  catch(e){
    console.log(e)
  }
}
