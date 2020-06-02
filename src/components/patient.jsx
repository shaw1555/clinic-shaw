import React, { Component } from "react";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { fetchPatients, deletePatient } from "../actions/index";
import { search } from "../ultility/search";

class Patient extends Component {
  state = {
    filterData: [],
  };

  componentDidMount = async () => {
    await this.props.fetchPatients();
    this.setState({ filterData: this.props.patients });
  };

  editEvent = async (x) => {
    console.log(x);
  };

  deleteEvent = async (x) => {
    await this.props.deletePatient(x._id);
    toast.error("Deleted");
  };

  filterEvent = (serachValue) => {
    const { patients } = this.props;
    const filterData = patients.filter(function (patient) {
      return (
        search(patient.name, serachValue) ||
        search(patient.dateOfYear, serachValue) ||
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
    return (
      <div>
        <div className="row pt-5 p-3">
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
              id="button-addon2"
            >
              New Patient
            </button>
          </div>
        </div>

        <div data-spy="scroll" className="row p-3">
          <div className="col-12">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date Of Year</th>
                  <th scope="col">Age</th>
                  <th scope="col">Address</th>
                  <th scope="col">Mobile No</th>
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
                    <td>{x.dateOfYear}</td>
                    <td>{x.age}</td>
                    <td>{x.address}</td>
                    <td>{x.mobileNo}</td>
                    <td>{x.date}</td>
                    <td>
                      <i
                        onClick={() => this.editEvent(x)}
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
    );
  }
}

const mapStateToProps = ({ patients }) => {
  return { patients };
};

export default connect(mapStateToProps, { fetchPatients, deletePatient })(
  Patient
);
