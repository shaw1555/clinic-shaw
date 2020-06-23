import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { DatePicker } from "antd";
import moment from 'moment';

const dateFormat = "YYYY-MM-DD";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  onDateChange = (value) => {
    if (!value) return;
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };    
    data["dateOfBirth"] = value.format(dateFormat);    
    this.setState({ data, errors });
    console.log("Date: ", data);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-secondary">
        {label}
      </button>
    );
  }

  renderDatePicker(name, label){
    const { data, errors } = this.state;    

    let date = moment(new Date(), dateFormat);
    
    if(data[name] !== ''){
      date = moment(data[name], dateFormat);
    }

    return(
      <div className="mb-3">
        <div><label>{label}</label></div>
        <DatePicker
        style={{ width: "100%" }}
        defaultValue={moment(new Date(), dateFormat)}
        value = {date}
        format={dateFormat}
        onChange={this.onDateChange}
        error={errors[name]}
        />
      </div>
      
    )    
  }

  renderInput(name, label, type = "text") {

    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
