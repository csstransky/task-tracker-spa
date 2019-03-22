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

  fetch_cart() {
    // TODO: Pass user_id to server
    this.fetch_path(
      "/api/v1/cart_items",
      (resp) => {
        store.dispatch({
          type: 'CART_LIST',
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

  delete_session() {
    this.send_post(
      "/api/v1/auth",
      (resp) => {
        store.dispatch({
          type: 'DELETE_SESSION',
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

  add_to_cart(product_id) {
    let state = store.getState();
    let user_id = state.session.user_id;
    let count = state.add_item_forms.get(product_id) || 1;
    console.log("add to cart", state);
    this.send_post(
      "/api/v1/cart_items",
      {cart_item: {product_id, user_id, count}},
      (resp) => {
        this.fetch_cart();
      },
    );
  }

  delete_cart_item(id) {
    $.ajax('/api/v1/cart_items/' + id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
          type: 'CART_DELETE',
          cart_item_id: id,
        });
      }
    });
  }
}

export default new TheServer();
