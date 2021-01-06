import {
  OFF_INFO,
  ON_INFO,
  SET_ALGORITHM,
  SET_FINISHED_RUNNING,
  SET_GRID,
  SET_IS_RUNNING,
} from "./actionTypes"

export function setGrid(gridArray) {
  return { type: SET_GRID, payload: gridArray }
}

export function setAlgorithm(algo) {
  return { type: SET_ALGORITHM, payload: algo }
}

export function setOnInfo() {
  return { type: ON_INFO, payload: true }
}

export function setOffInfo() {
  return { type: OFF_INFO, payload: false }
}

export function setIsRunning() {
  return { type: SET_IS_RUNNING, payload: true }
}

export function setFinishedRunning() {
  return { type: SET_FINISHED_RUNNING, payload: false }
}
