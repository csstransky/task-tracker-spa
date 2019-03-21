
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

function TaskList(props) {
  let {tasks, counts, dispatch} = props;
  let prods = _.map(tasks, (p) => {
    let count = counts.get(p.id) || 1;
    return <Task key={p.id} task={p} count={count} dispatch={dispatch} />
  });
  return <div className="row">
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
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.name}</h2>
      <p className="card-text">
        {task.desc} <br/>
        price: {task.price}
      </p>
      <div className="form-inline">
        <div className="form-group">
          <input type="number" className="form-control col-3 m-1" value={count}
                 onChange={update} />
          <button className="btn btn-primary m-1"
                 onClick={() => api.add_to_cart(task.id)}>Add</button>
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
