import { BACK_BAY_VISITED, BEACON_HILL_VISITED, SEAPORT_VISITED } from '../actions/actionTypes';

  const visitLocation = (location) => {
    if(location == "Back Bay") {
      return {
        type: BACK_BAY_VISITED,
      };
    } else if(location == "Beacon Hill") {
      return {
        type: BEACON_HILL_VISITED,
      };
    } else if(location == "Seaport") {
      return {
        type: SEAPORT_VISITED,
      };
    }
  };

  export { visitLocation }