import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationRestRequest: ['lat','long','start','count','isLocationRestSuccessCallBack','isLocationRestFailureCallBack'],
  locationRestSuccess: ['data'],
  locationRestFailure: ['error'],
})

export const LocationRestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  restaurantList:null,
  fetching: null,
  error: null  
})

/* ------------- Selectors ------------- */

export const LocationRestSelectors = {
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
  [Types.LOCATION_REST_REQUEST]: restaurants,
  [Types.LOCATION_REST_SUCCESS]: success,
  [Types.LOCATION_REST_FAILURE]: failure
})
