import { combineReducers } from "redux"
import {
  OFF_INFO,
  ON_INFO,
  SET_ALGORITHM,
  SET_FINISHED_RUNNING,
  SET_GRID,
  SET_IS_RUNNING,
} from "./actionTypes"

const defaultState = {
  grid: [],
  algorithm: "dijkstra",
  onInfo: false,
  isRunning: false,
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

function changeOnInfoReducer(prevState = defaultState.onInfo, action) {
  switch (action.type) {
    case ON_INFO:
      return action.payload
    case OFF_INFO:
      return action.payload
    default:
      return prevState
  }
}

function isRunningReducer(prevState = defaultState.isRunning, action) {
  switch (action.type) {
    case SET_IS_RUNNING:
      console.log(action, action.payload)
      return action.payload
    case SET_FINISHED_RUNNING:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  grid: gridReducer,
  algorithm: algorithmReducer,
  onInfo: changeOnInfoReducer,
  isRunning: isRunningReducer,
})

export default rootReducer
