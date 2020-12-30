import * as Types from "../constants/reduxConst";
const initialState = {
  isShow: false,
};

const myReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Types.SHOW_MODAL_LAR:
      return { ...state, isShow: payload.isShow };

    default:
      return state;
  }
};
export default myReducer;
