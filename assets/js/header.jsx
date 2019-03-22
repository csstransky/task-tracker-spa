
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from './api';
import store from './store';

function Header(props) {
  let {session} = props;
  let session_info;
  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input id="name" placeholder="name" />
      <input id="password" placeholder="password" />
      <button onClick={() => api.create_session(
                document.getElementById("name").value,
                document.getElementById("password").value)
              }
              className="btn btn-success">Login</button>
      <Link to={"/new_user"}>
        <button className="btn btn-secondary">Register</button>
      </Link>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user_name}</p>
      <button onClick={() => store.dispatch({ type: 'DELETE_SESSION' })}
              className="btn btn-success">Logout</button>
    </div>
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>Task Tracker</h1>
    </div>
    <div className="col-4">
      <p>
        <Link to={"/"}>Tasks</Link> &nbsp; | &nbsp;
        <Link to={"/users"}>Users</Link>
      </p>
    </div>
    <div className="col-4">
      {session_info}
    </div>
  </div>;
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);
