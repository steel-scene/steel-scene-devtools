export * from './dom'
import { AppState } from '../types'
import { createStore, combineReducers } from 'redux'
import { dom } from './index'

const reducers = combineReducers<AppState>({
  dom
})
const devTools = process.env.NODE_ENV === 'production'
  ? undefined
  : (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore<AppState>(reducers, devTools)