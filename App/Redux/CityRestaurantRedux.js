import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cityRestaurantsRequest: ['city_id','start','count','category_id','isCityRestaurantSuccessCallBack','isCityRestaurantFailureCallBack'],
  cityRestaurantsSuccess: ['data'],
  cityRestaurantsFailure: ['error'],
})

export const CityRestaurantsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  restaurantList:null,
  fetching: null,
  error: null  
})

/* ------------- Selectors ------------- */

export const RestaurantSelectors = {
  getRestaurant: state => state.data
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const restaurants = (state) =>
  state.merge({ fetching: true})

// successful avatar lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: true, error: null, restaurantList:data.restaurants })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CITY_RESTAURANTS_REQUEST]: restaurants,
  [Types.CITY_RESTAURANTS_SUCCESS]: success,
  [Types.CITY_RESTAURANTS_FAILURE]: failure
})
