import React, { Component }from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchJobs, deleteJob } from '../../actions';
import Modal from '../../layout/modal/modal';

const propTypes = {
  fetchJobs: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  jobs: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

class JobList extends Component {

  state = {
    modalShow: false,
    id: null
  }
  componentDidMount() {
    this.props.fetchJobs();
    console.log("jobs", this.props.jobs);
  }

  deleteHandle(id){
    this.setState({modalShow: true, id: id});
  }

  renderAdmin(job) {
    return (
      <div className="right floated content">
        <Link to={`/job/edit/${job.id}`} className="float-right btn btn-primary">
          Edit
        </Link>
        <button
          onClick={()=>this.deleteHandle(job.id)}
          className="float-right btn btn-danger"
        >
          Delete
        </button>
      </div>
    );
  }

  renderList() {
    return this.props.jobs.map(job => {
      return (
        <div className="item" key={job.id}>
          {this.renderAdmin(job)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/job/${job.id}`} className="header">
              {job.job_name}
            </Link>
            <div className="description">{job.job_description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isAuth) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/job/new" className="btn btn-info">
            Create job
          </Link>
        </div>
      );
    }
  }

  renderDeleteActions() {
    const { id } = this.state;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteJob(id)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <Link to="/job" className="btn btn-info">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderDeleteContent() {
    return 'Are you sure you want to delete this stream?';
  }

  render() {
    return (
      <div>
        <div>
          <h2>Job List</h2>
          {this.renderCreate()}
        </div>
        <div className="ui celled list">{this.renderList()}</div>
        {this.state.modalShow?
          <Modal
            title="Delete Job"
            content={this.renderDeleteContent()}
            actions={this.renderDeleteActions()}
            onDismiss={() => this.props.history.push('/job')}
          />
        :null
        }
      </div>
    );
  }
}

JobList.propTypes = propTypes;

const mapStateToProps = state => {
  return {
    jobs: Object.values(state.job),
    isAuth: state.auth.isAuth
  };
};

export default connect(
  mapStateToProps,
  { fetchJobs, deleteJob }
)(JobList);