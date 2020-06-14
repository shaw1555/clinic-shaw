import http from "../services/httpService";
import * as TYPES from "./types";
import * as api from "./apiEndpoint";

const urlEndPoint = api.urlGetRecord;

const getHeader = () => {
  return {
    //on later time >> can add token //
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};

export const fetchRecords = () => async (dispatch) => {
  try {
    const res = await http.get(urlEndPoint, getHeader());
    dispatch({ type: TYPES.GET_RECORD, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.GET_RECORD, payload: [] });
    console.error("fetchRecords error ", error);
  }
};

export const saveRecord = (record) => async (dispatch) => {
  try {
    const res = await http.post(urlEndPoint, record, getHeader());
    dispatch({ type: TYPES.SAVE_RECORD, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.SAVE_RECORD, payload: [] });
    console.error("saveRecord error ", error);
  }
};


export const updateRecord = (record) => async (dispatch) => {
  try {
    const url = urlEndPoint + "/" + record._id;
    delete record["_id"];
    const res = await http.put(url, record, getHeader());
    dispatch({ type: TYPES.UPDATE_RECORD, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.UPDATE_RECORD, payload: [] });
    console.error("updateRecord error ", error);
  }
};


export const deleteRecord = (_id) => async (dispatch) => {
  try {
    const res = await http.delete(urlEndPoint+"/"+_id, getHeader());
    dispatch({ type: TYPES.DELETE_RECORD, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.DELETE_RECORD, payload: [] });
    console.error("deleteRecord error ", error);
  }
};
