import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class JobForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="job_name" component={this.renderInput} label="Enter Name" />
        <Field
          name="job_description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.job_name) {
    errors.job_name = 'You must enter a name';
  }

  if (!formValues.job_description) {
    errors.job_description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'jobForm',
  validate
})(JobForm);
