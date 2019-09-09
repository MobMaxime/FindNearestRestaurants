import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cityRequest: ['city_name','isCitySuccessCallBack','isCityFailureCallBack'],
  citySuccess: ['data'],
  cityFailure: ['error'],
})

export const CityTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cityData:null,
  fetching: null,
  error: null  
})

/* ------------- Selectors ------------- */

export const CitySelectors = {
  getCity: state => state.data
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const city = (state) =>
  state.merge({ fetching: true})

// successful avatar lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, cityData:data.location_suggestions })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CITY_REQUEST]: city,
  [Types.CITY_SUCCESS]: success,
  [Types.CITY_FAILURE]: failure
})
