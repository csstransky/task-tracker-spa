
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';

function TaskList(props) {
  let {users, tasks, counts, dispatch} = props;
  let prods = _.map(tasks, (p) => {
    let count = counts.get(p.id) || 1;
    return <Task key={p.id} task={p} count={count} dispatch={dispatch} />
  });
  console.log("HWOHW")
  console.log(props)
  return <div className="col">
    <Link to={"/new_task"}>
      <button className="btn btn-primary">New Task</button>
    </Link>
    {prods}
  </div>;
}

function Task(props) {
  let {task, count, dispatch} = props;
  function update(ev) {
    let action = {
      type: 'UPDATE_ADD_CART_FORM',
      task_id: task.id,
      count: ev.target.value,
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
        <strong>User:</strong> {task.id}
      </p>
      <div className="form-inline">
        <div className="form-group">
          <input type="number" className="form-control col-3 m-1" value={task.time}
                 onChange={update} />
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
    counts: state.add_item_forms,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList);
