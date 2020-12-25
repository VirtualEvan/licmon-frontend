import {combineReducers} from 'redux'
import {SELECT_FEATURE} from '../actions/feature'

export default combineReducers({
  selectedFeature: (state = null, action) => {
    switch(action.type) {
      case SELECT_FEATURE:
        return action.feature
      default:
        return state
    }
  }
})