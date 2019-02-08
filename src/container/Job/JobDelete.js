import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from '../../layout/modal/modal';
import { fetchJob, deleteJob } from '../../actions';

const propTypes = {
  fetchJob: PropTypes.func.isRequired,
  editJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired
};

class JobDelete extends React.Component {
  componentDidMount() {
    this.props.fetchJob(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteJob(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/job" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.job) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete the stream with title: ${
      this.props.job.job_name
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Job"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => this.props.history.push('/')}
      />
    );
  }
}
JobDelete.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => {
  return { job: state.job[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchJob, deleteJob }
)(JobDelete);
