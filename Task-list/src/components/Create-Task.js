import React, { Component } from "react";
import axios from "axios";

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: "",
      taskDescription: "",
      taskDate: "",
      taskProgress: "",
    };
  }

  onChangeTaskName = (e) => {
    this.setState({ taskName: e.target.value });
  };

  onChangeTaskDescription = (e) => {
    this.setState({ taskDescription: e.target.value });
  };

  onChangeTaskDate = (e) => {
    this.setState({ taskDate: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitteed:");
    console.log(`Task Name: ${this.state.taskName}`);
    console.log(`Task Description: ${this.state.taskDescription}`);
    console.log(`Task Date: ${this.state.taskDate}`);

    const newTask = {
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
      taskDate: this.state.taskDate,
    };

    axios
      .post('/tasks/add', newTask)
      .then((res) => console.log(res.data));

    this.setState({
      taskName: "",
      taskDescription: "",
      taskDate: "",
    });
    this.props.navigate("/")
  };

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Task</h3>
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
              type="date"
              className="form-control"
              value={this.state.taskDate}
              onChange={this.onChangeTaskDate}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Task"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
