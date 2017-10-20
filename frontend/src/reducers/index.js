import NavigationReducer from './NavigationReducer'
import userReducer from './userReducer'
import campaignsReducer from './campaignsReducer'
// import profileReducer from './profileReducer'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

const Nemo = combineReducers({
  navigation: NavigationReducer,
  // profiles: profileReducer,
  user: userReducer,
  router: routerReducer,
  campaigns: campaignsReducer
})

export default Nemo
