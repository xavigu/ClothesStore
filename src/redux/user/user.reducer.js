
const INITIAL_STATE = {
  currentUser: null
}

// if the state is undefined the default state will be the INITIAL_STATE
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return{
        ...state,
        currentUser: action.payload
      }
  
    default:
      return state;
  }
};

export default userReducer;