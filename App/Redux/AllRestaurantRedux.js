import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restaurantsRequest: ['start','count','category_id','isRestaurantSuccessCallBack','isRestaurantFailureCallBack'],
  restaurantsSuccess: ['data'],
  restaurantsFailure: ['error'],
})

export const RestaurantsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allRestaurantList:null,
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
  return state.merge({ fetching: true, error: null, allRestaurantList:data.restaurants })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANTS_REQUEST]: restaurants,
  [Types.RESTAURANTS_SUCCESS]: success,
  [Types.RESTAURANTS_FAILURE]: failure
})
