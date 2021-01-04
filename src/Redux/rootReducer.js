import { combineReducers } from "redux"
import { SET_GRID } from "./actionTypes"

const defaultState = {
  grid: [],
}

function gridReducer(prevState = defaultState.grid, action) {
  switch (action.type) {
    case SET_GRID:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  grid: gridReducer,
})

export default rootReducer
