
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';

import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';
import NewTask from './new_task';
import NewUser from './new_user';
import history from './history';

export default function root_init(node, store) {
  store.dispatch({type: "TASK_LIST", data: window.tasks})
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router history={history}>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
              <Route path="/new_task" exact={true} render={() =>
                <NewTask />
              } />
              <Route path="/new_user" exact={true} render={() =>
                <NewUser />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
