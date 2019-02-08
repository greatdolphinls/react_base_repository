import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createJob } from '../../actions';
import JobForm from './JobForm';

const propTypes = {
  createJob: PropTypes.func.isRequired
};

class JobCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createJob(formValues);
  };

  render() {
    return (
      <div className="ml-4">
        <h3>Create a Job</h3>
        <JobForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

JobCreate.propTypes = propTypes;

export default connect(
  null,
  { createJob }
)(JobCreate);