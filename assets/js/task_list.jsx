
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';

function TaskList(props) {
  let {users, tasks, dispatch} = props;
  let prods = _.map(tasks, (p) => {
    return <Task key={p.id} task={p} dispatch={dispatch} />
  });
  return <div className="col">
    <Link to={"/new_task"}>
      <button className="btn btn-primary">New Task</button>
    </Link>
    {prods}
  </div>;
}

function Task(props) {
  let {task, user, dispatch} = props;
  console.log("TODO LOOK HERE FOR THE GOODS STUFF")
  console.log(tasks)
  // TODO Get rid of this
  function update(ev) {
    let action = {
      type: 'UPDATE_ADD_CART_FORM',
      task_id: task.id,
    };
    dispatch(action);
  }
  return <div className="card">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        {task.desc} <br/><br/>
        <strong>Time:</strong> {task.time} hours <br/>
        <strong>Complete:</strong> {task.complete.toString()} <br/>
        <strong>User:</strong> {task.user_name}
      </p>
      <div className="form-inline">
        <div className="form-group">
          <Link to={"/users"}>
            <button className="btn btn-primary">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return {
    tasks: state.tasks,
    users: state.users,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);
