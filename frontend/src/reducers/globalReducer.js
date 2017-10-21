const initialState = {}
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  } // Switch
}
