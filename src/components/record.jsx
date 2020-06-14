import React, { Component } from "react";
import { connect } from "react-redux";
import { Popconfirm, Modal, Button, Space, Input } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  fetchRecords,
  saveRecord,
  updateRecord,
  deleteRecord,
} from "../actions/record";
import { search } from "../ultility/search";
import {formatDate} from "../ultility/formatDate";
import "../css/index.css";

class Record extends Form {
  state = {
    filterData: [],
  };

  componentDidMount = async () => {
    await this.props.fetchRecords();
    this.setState({ filterData: this.props.records });
  };
  render() {
    
    const { filterData } = this.state;

    return (
      <div className="col">
        <div className="pt-5 pb-3">
          <div className="row pb-3">
            <div className="col-6 input-group">
              <input
                // onChange={(e) => this.filterEvent(e.currentTarget.value)}
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
            <div className="col-6">
              <button
                className="btn btn-outline-secondary float-right"
                type="button"
                // onClick={() => this.showModal({})}
              >
                New Record
              </button>
            </div>
          </div>

          <div data-spy="scroll" className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                    <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Medicine</th>
                      <th scope="col">Next Appointment</th>
                      <th scope="col">Fee</th>
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map((x) => (
                      <tr key={x._id}>
                        <td>{formatDate(x.date)}</td>
                        <td>{x.patient.name}</td>
                        <td>{x.description}</td>
                        <td>{x.medicine}</td>
                        <td>{x.nextAppointmentDate}</td>
                        <td>{x.fee}</td>
                        <td>
                          <i
                            onClick={() => this.showModal(x)}
                            style={{ color: "grey", fontSize: 18 }}
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td>
                          <Popconfirm
                            placement="leftTop"
                            title={`Are you sure delete ${formatDate(x.date)} / ${x.name}?`}
                            onConfirm={() => this.deleteEvent(x)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <div>
                              <i
                                style={{ color: "red", fontSize: 18 }}
                                className="fa fa-trash"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <Modal>
        
        </Modal> */}
      </div>
    );
  }
}



const mapStateToProps = ({ records }) => {
  return { records };
};

export default connect(mapStateToProps, {
  fetchRecords,
  saveRecord,
  updateRecord,
  deleteRecord,
})(Record);

