import { BACK_BAY_VISITED, BEACON_HILL_VISITED, SEAPORT_VISITED } from '../actions/actionTypes';
import colors from '../../config/colors'

const initialState = {
    "Beacon Hill": {"color": colors.darkGray, "visited": false},
    "Back Bay": {"color": colors.darkGray, "visited": false},
    "Seaport": {"color": colors.darkGray, "visited": false}
  };
   
  export default (state = initialState, action) => {
    switch (action.type) {
      case BACK_BAY_VISITED:
        return {
          ...state,
          "Back Bay": {"color": colors.tritiary, "visited": true}
        };
      case BEACON_HILL_VISITED:
        return {
          ...state,
          "Beacon Hill": {"color": colors.tritiary, "visited": true}
        };
      case SEAPORT_VISITED:
        return {
          ...state,
          "Seaport": {"color": colors.tritiary, "visited": true}
        };
      default:
        return state;
    }
  };