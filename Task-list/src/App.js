import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import { EditHOC } from "./components/EditHOC";
import TaskList from "./components/Task-list";
import { CreateHOC } from "./components/CreateHOC";

class App extends Component {
  render() {
    return (
      <Router>
      {console.log("Thanks for opening the console. Hope you liked the Project.")}
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <img src={logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">
              Tasks App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#myNavbar"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link text-primary">
                    Task List
                  </Link>
                </li>
                <li className="navbar-item ">
                  <Link to="/create" className="nav-link text-primary">
                    Create Tasks
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="/" exact element={<TaskList />} />
          <Route path="/edit/:id" element={<EditHOC />} />
          <Route path="/create" element={<CreateHOC />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
