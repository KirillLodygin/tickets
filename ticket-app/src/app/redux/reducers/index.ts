import { combineReducers } from 'redux'
import ticketReducer from './tickets'

export const rootReducer = combineReducers({
  tickets: ticketReducer,
})
