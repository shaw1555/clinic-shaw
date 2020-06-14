import React, { Component } from "react";
import { connect } from "react-redux";
import { Popconfirm, Modal, Button, Space, Input } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  fetchPatients,
  savePatient,
  updatePatient,
  deletePatient,
} from "../actions/index";
import { search } from "../ultility/search";
import {formatDate} from "../ultility/formatDate";
import "../css/patient.css";

class Patient extends Form {
  state = {
    filterData: [],
    visible: false,
    selectedPatient: {},
    modalTitle: "New Patient",
    data: {      
      name: "",
      mobileNo: "",
      address: "",
      age: "",
    },
    errors: {},
    _id: "",
  };

  schema = {    
    name: Joi.string().required().min(3).max(50).label("Name"),
    mobileNo: Joi.string().required().label("Mobile No"),
    address: Joi.string().required().label("Address"),
    age: Joi.number().required().min(1).max(150).label("Age"),
  };

  componentDidMount = async () => {
    await this.props.fetchPatients();
    this.setState({ filterData: this.props.patients });
  };

  doSubmit = async () => {
    let data = {...this.state.data};
    data._id = this.state._id;
    if (this.state._id) await this.props.updatePatient(data);
    else await this.props.savePatient(data);
    // await saveMovie(this.state.data);
    // this.props.history.push("/movies");

    this.setState({
      visible: false,
      filterData: this.props.patients
    });
  };

  deleteEvent = async (x) => {
    await this.props.deletePatient(x._id);
    this.setState({      
      filterData: this.props.patients
    });
    toast.error("Deleted");
  };

  showModal = (patient) => {
    let _id = "";

    let data = {      
      name: "",
      mobileNo: "",
      address: "",
      age: "",
    };

    let modalTitle = "New Patient";

    if (!_.isEmpty(patient)) {
      modalTitle = "Modify Patient";
      data = {        
        name: patient.name,
        mobileNo: patient.mobileNo,
        address: patient.address,
        age: patient.age,
      };
      _id = patient._id;
    }

    this.setState({
      visible: true,
      selectedPatient: patient,
      modalTitle,
      data,
      errors: {},
      _id
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

  filterEvent = (serachValue) => {
    const { patients } = this.props;
    if (serachValue == "") {
      this.setState({ filterData: patients });
      return;
    }

    const filterData = patients.filter(function (patient) {
      return (
        search(patient.name, serachValue) ||        
        search(patient.age, serachValue) ||
        search(patient.address, serachValue) ||
        search(patient.mobileNo, serachValue) ||
        search(patient.date, serachValue)
      );
    });
    this.setState({ filterData });
  };

  render() {
    const { filterData } = this.state;
    
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <div className="col">
        <div className="pt-5 pb-3">
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
            <div className="col-6">
              <button
                className="btn btn-outline-secondary float-right"
                type="button"
                onClick={() => this.showModal({})}
              >
                New Patient
              </button>
            </div>
          </div>

          <div data-spy="scroll" className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Address</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Date</th>
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map((x) => (
                      <tr key={x._id}>
                        <td>
                          <Link to={`/record/${x._id}`}>{x.name}</Link>
                        </td>                        
                        <td>{x.age}</td>
                        <td>{x.address}</td>
                        <td>{x.mobileNo}</td>
                        <td>{formatDate(x.date)}</td>
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
                            title={`Are you sure delete ${x.name}?`}
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
            {this.renderInput("name", "Name")}            
            {this.renderInput("age", "Age", "number")}
            {this.renderInput("address", "Address")}
            {this.renderInput("mobileNo", "Mobile")}
            {this.renderButton("Save")}
          </form>
        </Modal>
      </div>
    );
  }
}



const mapStateToProps = ({ patients }) => {
  return { patients };
};

export default connect(mapStateToProps, {
  fetchPatients,
  savePatient,
  updatePatient,
  deletePatient,
})(Patient);


