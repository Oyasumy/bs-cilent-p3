import * as Types from "../constants/reduxConst";

const initialState = {
  string:""
};

const myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_SEARCH_STRING:
      return { ...state, string: payload.data };

    default:
      return state;
  }
};
export default myReducer;
