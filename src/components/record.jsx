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
import { formatDate } from "../ultility/formatDate";
import "../css/index.css";
import { formatNumber } from "../ultility/formatNumber";

class Record extends Form {
  state = {
    filterData: [],
    visible: false,
    selectedRecord: {},
    modalTitle: "New Record",
    data: {
      description: "",
      medicine: "",
      // nextAppointmentDate: "",
      fee: "",
      patientId: "",
    },
    errors: {},
    _id: "",
    serachValue: "" ,
  };

  componentDidMount = async () => {
    await this.props.fetchRecords();
    this.setState({ filterData: this.props.records });
  };

  schema = {
    description: Joi.string().max(200).label("Description"),
    medicine: Joi.string().max(200).label("Medicine"),
    // nextAppointmentDate: Joi.date().label("Next Appointment"),
    patientId: Joi.string(),
    fee: Joi.number().required().min(0).label("Fee"),
  };

  doSubmit = async () => {
    let data = { ...this.state.data };
    data._id = this.state._id;
    if (this.state._id) await this.props.updateRecord(data);
    else await this.props.saveRecord(data);

    //fetch data again //
    await this.props.fetchRecords();   

    this.setState({
      visible: false,
      filterData: this.props.records,
    });

    this.filterEvent(this.state.serachValue);
  };

  filterEvent = (serachValue) => {

    const { records } = this.props;
    if (serachValue == "") {
      this.setState({ filterData: records });
      return;
    }

    const filterData = records.filter(function (record) {
      return (
        search(record.date, serachValue) ||
        search(record.patient.name, serachValue) ||
        search(record.description, serachValue) ||
        search(record.medicine, serachValue) ||
        // search(record.nextAppointmentDate, serachValue) ||
        search(record.fee, serachValue)
      );
    });
    this.setState({ filterData, serachValue });
  };

  deleteEvent = async (x) => {
    await this.props.deleteRecord(x._id);
    this.setState({
      filterData: this.props.records,
    });
    toast.error("Deleted");
  };

  showModal = (record) => {
    let _id = "";

    let data = {
      description: "",
      medicine: "",
      // nextAppointmentDate: "",
      fee: "",
      patientId: this.props.match.params.id,
    };

    let modalTitle = "New Record";

    if (!_.isEmpty(record)) {
      modalTitle = "Modify Record";
      data = {
        description: record.description,
        medicine: record.medicine,
        // nextAppointmentDate: record.nextAppointmentDate,
        fee: record.fee,
        patientId: record.patient._id,
      };
      _id = record._id;
    }

    this.setState({
      visible: true,
      selectedRecord: record,
      modalTitle,
      data,
      errors: {},
      _id,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { id } = this.props.match.params;
    let { filterData } = this.state;

    if (id !== undefined) {
      filterData = filterData.filter(function (el) {
        return el.patient._id == id;
      });
    }

    const DivNewReocrd = () => (
      <div className="col-6">
        <button
          className="btn btn-outline-secondary float-right"
          type="button"
          onClick={() => this.showModal({})}
        >
          New Record
        </button>
      </div>
    );

    return (
      <div className="col">
        <h3 className="pt-2 text-center">Records</h3>
        <div className="pt-3 pb-3">
          <div className="row pb-3">
            <div className="col-6 input-group">
              <input
                onChange={(e) => this.filterEvent(e.currentTarget.value)}
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
            {id === undefined ? null : <DivNewReocrd />}
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
                      {/* <th scope="col">Next Appointment</th> */}
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
                        {/* <td>
                          {x.nextAppointmentDate === null
                            ? null
                            : formatDate(x.nextAppointmentDate)}
                        </td> */}
                        <td>{formatNumber(x.fee)}</td>
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
                            title={`Are you sure delete ${formatDate(
                              x.date
                            )} / ${x.patient.name}?`}
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

        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("description", "Description")}
            {this.renderInput("medicine", "Medicine")}
            {/* {this.renderInput("nextAppointmentDate", "Next Appointment")} */}
            {this.renderInput("fee", "Fee", "number")}
            {this.renderButton("Save")}
          </form>
        </Modal>
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
