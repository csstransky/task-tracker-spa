
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';

function NewTask(props) {
  let tasks = Task(props)
  return <div className="col">
    {tasks}
  </div>;
}

function Task(props) {
  let {users, dispatch} = props;
  let options = CreateUserOptions(users);
  return <div className="form-group">
    <p>Title: <input id="title" className="form-control"/></p>
    <p>Description: <input id="desc" className="form-control"/></p>
    <p>Complete? <input id="complete" type="checkbox" /></p>
    <br/>
    <p>Time: <input id="time" type="number" step="0.25" defaultValue="0" min="0"/> hours</p>
    <p>User:
      <select id="user">
        {options}
      </select>
    </p>
    <button onClick={() => api.create_task(
              document.getElementById("title").value,
              document.getElementById("desc").value,
              document.getElementById("complete").checked,
              document.getElementById("time").value,
              document.getElementById("user").value,
            )}
            className="btn btn-success">Create Task</button>
  </div>;
}

function CreateUserOptions(users) {
  let tasks = _.map(users, (user) => {
    return <option value={user.id}>{user.name}</option>
  });
  return tasks;
}

function state2props(state) {
  console.log("rerender", state);
  return {
    users: state.users,
  };
}

// Export result of curried function call.
export default connect(state2props)(NewTask);
