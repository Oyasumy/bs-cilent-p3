import * as Types from "../constants/reduxConst";
// Set show modal
export const handleShowModal = (is) => ({
  type: Types.SHOW_MODAL_LAR,
  payload: {
    isShow: is,
  },
});
