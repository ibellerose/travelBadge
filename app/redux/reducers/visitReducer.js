import { BACK_BAY_VISITED, BEACON_HILL_VISITED, SEAPORT_VISITED } from '../actions/actionTypes';
import colors from '../../config/colors'

const initialState = {
    "Beacon Hill": {"iconColor": colors.darkGray, "areaFillColor": colors.areaFillColor , "visited": false},
    "Back Bay": {"iconColor": colors.darkGray, "areaFillColor": colors.areaFillColor, "visited": false},
    "Seaport": {"iconColor": colors.darkGray, "areaFillColor": colors.areaFillColor, "visited": false}
  };
   
  export default (state = initialState, action) => {
    switch (action.type) {
      case BACK_BAY_VISITED:
        return {
          ...state,
          "Back Bay": {"iconColor": colors.tritiary, "areaFillColor": colors.areaFillSuccessColor, "visited": true}
        };
      case BEACON_HILL_VISITED:
        return {
          ...state,
          "Beacon Hill": {"iconColor": colors.tritiary, "areaFillColor": colors.areaFillSuccessColor, "visited": true}
        };
      case SEAPORT_VISITED:
        return {
          ...state,
          "Seaport": {"iconColor": colors.tritiary, "areaFillColor": colors.areaFillSuccessColor, "visited": true}
        };
      default:
        return state;
    }
  };