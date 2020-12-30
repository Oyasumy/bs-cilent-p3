import * as Types from "../constants/reduxConst";
const initialState = {
  data: {},
};

const myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_SHIP_CODE:
      return { ...state, data: payload.data };
    case Types.DELETE_SHIP_CODE:
      return { ...state, data: {} };

    default:
      return state;
  }
};
export default myReducer;
