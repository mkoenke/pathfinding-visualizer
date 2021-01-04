import { SET_GRID } from "./actionTypes"

export function setGrid(gridArray) {
  return { type: SET_GRID, payload: gridArray }
}
