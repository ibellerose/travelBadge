import { BACK_BAY_VISITED, BEACON_HILL_VISITED, SEAPORT_VISITED } from '../actions/actionTypes';

// const visitBeaconHill = () => {
//     return {
//       type: BEACON_HILL_VISITED,
//     };
//   };

//   const visitBackBay = () => {
//     return {
//       type: BACK_BAY_VISITED,
//     };
//   };

//   const visitSeaport = () => {
//     return {
//       type: SEAPORT_VISITED,
//     };
//   };

//   export { visitBeaconHill, visitBackBay, visitSeaport }

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