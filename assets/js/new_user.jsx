
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import { Link } from 'react-router-dom';

function NewUser(props) {
  return <div className="col">
    <User />
  </div>;
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }
  handle_pass_change(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handle_name_change(event) {
    this.setState({
      name: event.target.value,
    });
  }
  render() {
    return <form className="form-group">
      <p>Name: <input value={this.state.name} type="text" onChange={this.handle_name_change.bind(this)}
                      id="name" className="form-control"/></p>
      <p>Password: <input value={this.state.password} type="password" onChange={this.handle_pass_change.bind(this)}
                          id="password" className="form-control"/></p>
      <button onClick={(e) => {
          e.preventDefault();
          api.register_user(this.state.name, this.state.password)
        }
      }
      className="btn btn-success">Create User</button>
    </form>;
  }
}

function state2props(state) {
  console.log("rerender", state);
  return {
    users: state.users,
  };
}

// Export result of curried function call.
export default connect(state2props)(NewUser);
