const initialState = {
    visited: false,
  };
   
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'VISITED_TRUE':
        return {
          ...state,
          visited: true,
        };
      default:
        return state;
    }
  };