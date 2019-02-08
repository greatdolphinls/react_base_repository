import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchJob, editJob } from '../../actions';
import JobForm from './JobForm';

const propTypes = {
  fetchJob: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};
class JobEdit extends React.Component {
  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editJob(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.job) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Job</h3>
        <JobForm
          initialValues={_.pick(this.props.job, 'job_name', 'job_description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
JobEdit.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  return { job: state.job[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchJob, editJob }
)(JobEdit);
