
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';


export default connect(({users}) => { return {users};})((props) => {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row">
    <div className="col-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>name</th>
            <th>admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
});

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.name}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}
