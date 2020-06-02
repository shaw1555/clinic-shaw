import axios from "axios";
import * as TYPES from "./types";
import * as api from "./apiEndpoint";

const getHeader = () => {
  return {
    //on later time >> can add token //
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};

export const fetchPatients = () => async (dispatch) => {
  try {
    const res = await axios.get(api.urlGetPatient, getHeader());
    dispatch({ type: TYPES.GET_PATIENT, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.GET_PATIENT, payload: [] });
    console.error("fetchPatient error ", error);
  }
};

export const deletePatient = (_id) => async (dispatch) => {
  try {
    const res = await axios.delete(api.urlGetPatient+"/"+_id, getHeader());
    dispatch({ type: TYPES.DELETE_PATIENT, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.GET_PATIENT, payload: [] });
    console.error("fetchPatient error ", error);
  }
};