import store from './store';
import history from './history';

class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  create_session(name, password) {
    this.send_post(
      "/api/v1/auth",
      {name, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

  register_user(name, password) {
    this.send_post(
      "/api/v1/users",
      {user: {name, password}},
      (resp) => {
        history.push("/users")
        store.dispatch({
          type: 'USER_ADD',
          data: resp.data,
        });
      }
    );
  }

  create_task(title, desc, complete, time, user_id) {
    time = parseFloat(time);
    user_id = parseInt(user_id, 10);
    this.send_post(
      "/api/v1/tasks",
      {task: {title, desc, complete, time, user_id}},
      (resp) => {
        store.dispatch({
          type: 'TASK_ADD',
          data: resp.data,
        });
      }
    );
  }
}

export default new TheServer();
