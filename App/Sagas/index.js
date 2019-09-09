import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { CategoryTypes } from '../Redux/CategoryRedux'
import {RestaurantsTypes} from '../Redux/AllRestaurantRedux'
import {CityRestaurantsTypes} from '../Redux/CityRestaurantRedux'
import {LocationRestTypes} from '../Redux/LocationRestaurantRedux'
import {CityTypes} from '../Redux/CityRedux'

/* ------------- Sagas ------------- */

import { getCategories } from './CategorySagas'
import {getRestaurants} from './AllRestaurantSagas'
import {getCityRestaurants} from './CityRestaurantSagas'
import {getLocationRestaurants} from './LocationRestaurantSagas'
import {getCity} from './CitySagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(CategoryTypes.CATEGORY_REQUEST, getCategories, api),
    takeLatest(RestaurantsTypes.RESTAURANTS_REQUEST, getRestaurants, api),
    takeLatest(CityRestaurantsTypes.CITY_RESTAURANTS_REQUEST, getCityRestaurants, api),
    takeLatest(LocationRestTypes.LOCATION_REST_REQUEST, getLocationRestaurants, api),
    takeLatest(CityTypes.CITY_REQUEST, getCity, api),
    // some sagas receive extra parameters in addition to an action
  ])
}
