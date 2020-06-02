import * as TYPES from "../actions/types";
import patient from "../components/patient";

export default function (state = [], action) {
  switch (action.type) {
    case TYPES.GET_PATIENT:
      return action.payload;
    case TYPES.DELETE_PATIENT:
      return state.filter((x) => x._id !== action.payload._id);
    case TYPES.UPDATE_PATIENT:
      return state.map((x) =>
        x.id !== action.payload._id ? x : action.payload
      );
    default:
      return state;
  }
}
