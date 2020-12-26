import {combineReducers} from 'redux'
import {
  SELECT_FEATURE,
  FILTER_FEATURES
} from '../actions/status'

export default combineReducers({
  selectedFeature: (state = null, action) => {
    switch(action.type) {
      case SELECT_FEATURE:
        return action.feature
      default:
        return state
    }
  },

  filteredFeatures: (state = [], action) => {
    switch(action.type) {
      case FILTER_FEATURES:
        return action.filter
      default:
        return state
    }
  }
})