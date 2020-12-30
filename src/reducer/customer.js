import * as Types from "../constants/reduxConst";
const initialState = {
  isLogin: false,
  data: -1,
};

const myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SET_CUSTOMER:
      return { ...state, isLogin: true, data: payload.data };
    case Types.DELETE_CUSTOMER:
      return { ...state, isLogin: false, data: -1 };

    default:
      return state;
  }
};
export default myReducer;
