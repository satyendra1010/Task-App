import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Task-list.css";
import * as moment  from 'moment'
import {API_PORT} from "../App"


const Tasks = (props) => (
  <tr>
    <td className={props.task.taskProgress==='Completed' ? "completed" : ""}>
      {props.task.taskName}
    </td>
    <td className={props.task.taskProgress==='Completed' ? "completed" : ""}>
      {props.task.taskDescription}
    </td>
    <td className={props.task.taskProgress==='Completed' ? "completed" : ""}>
    { moment(props.task.taskDate).format("DD/MM/YYYY")}
    </td>
    <td className={props.task.taskProgress==='Completed' ? "completed" : ""}>
      {props.task.taskProgress}
    </td>
    <td>
      <button className="btn btn-light">
        <Link to={`/edit/${props.task._id}`}>
          <i className="fas fa-edit"></i>
        </Link>
      </button>
      <button
        className="btn btn-light"
        onClick={function () {
          axios
            .post(`${API_PORT}/tasks/delete/${props.task._id}`)
            .then((res) => {
              console.log("Successfuly Deleted");
              window.location.reload();
            })
            .catch((err) => console.log(err));
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </td>
  </tr>
);

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${API_PORT}/tasks`)
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  taskList = () =>
  {
    if(this.state.tasks){
      this.state.tasks.map((task, index) => <Tasks task={task} key={index} />);
    }
  }
 

  render() {
    return (
      <div>
        <h3>Tasks List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}
