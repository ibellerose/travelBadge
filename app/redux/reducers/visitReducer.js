import { VISITED_TRUE } from '../actions/actionTypes'
import colors from '../../config/colors'

const initialState = {
    visited: false,
    badgeColor: colors.darkGray
  };
   
  export default (state = initialState, action) => {
    switch (action.type) {
      case VISITED_TRUE:
        return {
          ...state,
          visited: true,
          badgeColor: colors.secondary
        };
      default:
        return state;
    }
  };