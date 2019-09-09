import { call, put } from 'redux-saga/effects'
import CityRestaurantsActions from '../Redux/CityRestaurantRedux'

export function* getCityRestaurants(api, action) {
//   const { username } = action
  const {city_id,start,count,category_id,isCityRestaurantSuccessCallBack, isCityRestaurantFailureCallBack } = action;
  const response = yield call(api.getCityRestaurants,city_id,start,count,category_id);

  // success?
  try{
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(CityRestaurantsActions.cityRestaurantsSuccess(response.data));
      yield call(isCityRestaurantSuccessCallBack);
    } else {
      const error = errorType(response);
      yield put(CityRestaurantsActions.cityRestaurantsFailure(error));
      yield call(isCityRestaurantFailureCallBack, error);
    }
  }
  catch(e){
    console.log(e)
  }
}
