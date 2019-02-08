import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchJob } from '../../actions';

const propTypes = {
  fetchJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

class JobShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchJob(id);
  }

  render() {
    if (!this.props.job) {
      return <div>Loading...</div>;
    }

    const { job_name, job_description } = this.props.job;

    return (
      <div>
        <h1>{job_name}</h1>
        <h5>{job_description}</h5>
      </div>
    );
  }
}

JobShow.propTypes = propTypes;
const mapStateToProps = (state, ownProps) => {
  return { job: state.job[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchJob }
)(JobShow);