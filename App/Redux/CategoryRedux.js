import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryRequest: ['isSuccessCallBack','isFailureCallBack'],
  categorySuccess: ['data'],
  categoryFailure: ['error'],
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categoryData:null,
  fetching: null,
  error: null  
})

/* ------------- Selectors ------------- */

export const CategorySelectors = {
  getCategory: state => state.data
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const categories = (state) =>
  state.merge({ fetching: true})

// successful avatar lookup
export const success = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, categoryData:data.categories })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: categories,
  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_FAILURE]: failure
})
