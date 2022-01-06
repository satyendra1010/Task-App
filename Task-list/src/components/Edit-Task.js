import React, { Component } from "react";
import axios from "axios";



export default class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_description: "",
      task_responsible: "",
      task_priority: "",
      task_completed: false,
    };
  }

  componentDidMount() {
    const params = this.props.params;
    const id = params.id;
    axios
      .get('/tasks/' + id)
      .then((res) => {
        this.setState({
          taskName: res.data.taskName,
          taskDescription: res.data.taskDescription,
          taskDate: res.data.taskDate,
          taskProgress: res.data.taskProgress,
        });
      })
      .catch((err) => console.log(err));
  }

  onChangeTaskName = (e) => {
    this.setState({
      taskName: e.target.value,
    });
  };

  onChangeTaskDescription = (e) => {
    this.setState({
      taskDescription: e.target.value,
    });
  };

  onChangeTaskDate = (e) => {
    this.setState({
      taskDate: e.target.value,
    });
  };
  onChangeTaskProgress = (e) => {
    this.setState({
      taskProgress: e.target.value,
    });
  };


  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
      taskDate: this.state.taskDate,
      taskProgress: this.state.taskProgress,
    };
    axios
      .post('/tasks/update/' + this.props.params.id, obj)
      .then((res) => console.log(res.data));

    console.log(this.props);
    this.props.navigate("/");
  };

  render() {
    return (
      <div>
        <h3>Update Tasks</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.taskName}
              onChange={this.onChangeTaskName}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.taskDescription}
              onChange={this.onChangeTaskDescription}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.taskDate}
              onChange={this.onChangeTaskDate}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="archived"
                id="archived"
                value="Archived"
                checked={this.state.taskProgress === "Archived"}
                onChange={this.onChangeTaskProgress}
              />
              <label className="form-check-label"> Archived </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inprogress"
                id="inprogress"
                value="Inprogress"
                checked={this.state.taskProgress === "Inprogress"}
                onChange={this.onChangeTaskProgress}
              />
              <label className="form-check-label">Inprogress</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="completed"
                id="completed"
                value="Completed"
                checked={this.state.taskProgress === "Completed"}
                onChange={this.onChangeTaskProgress}
              />
              <label className="form-check-label">Completed</label>
            </div>
          </div>
        
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

