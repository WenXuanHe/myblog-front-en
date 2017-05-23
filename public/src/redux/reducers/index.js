import {combineReducers} from 'redux'
import writer from './writer'
import login from './login'

// export single root reducer
export default combineReducers({
  writer,
  login
})
