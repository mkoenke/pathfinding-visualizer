import { combineReducers } from "redux"
import { SET_ALGORITHM, SET_GRID } from "./actionTypes"

const defaultState = {
  grid: [],
  algorithm: "dijkstra",
}

function gridReducer(prevState = defaultState.grid, action) {
  switch (action.type) {
    case SET_GRID:
      return action.payload
    default:
      return prevState
  }
}

function algorithmReducer(prevState = defaultState.algorithm, action) {
  switch (action.type) {
    case SET_ALGORITHM:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  grid: gridReducer,
  algorithm: algorithmReducer,
})

export default rootReducer
