import { combineReducers } from 'redux';

import PlayerReducer from './reducerPlayer';

const rootReducer = combineReducers({
  players: PlayerReducer,
});

export default rootReducer;
