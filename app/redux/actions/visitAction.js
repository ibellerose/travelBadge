import { VISITED_TRUE } from '../actions/actionTypes';

const visitLocation = () => {
    return {
      type: VISITED_TRUE,
    };
  };

  export { visitLocation }