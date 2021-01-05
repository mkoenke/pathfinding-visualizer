import { SET_ALGORITHM, SET_GRID } from "./actionTypes"

export function setGrid(gridArray) {
  return { type: SET_GRID, payload: gridArray }
}

export function setAlgorithm(algo) {
  return { type: SET_ALGORITHM, payload: algo }
}
