import * as Types from "../constants/reduxConst";

const initialState = {
  data: [],
};

const myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_CATEGORY:
      return { ...state, data: payload.data };

    default:
      return state;
  }
};
export default myReducer;
