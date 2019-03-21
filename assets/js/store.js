
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
  Application state layout
  {
    // Session
    session: null, // { token, user_id }

    // DB Caches
    tasks: props.tasks, // List of Task
    users: [], // List of User
    cart: [], // List of CartItem

    // Forms
    login_form: { name: "", password, "" },
    add_item_forms: new Map(), // { task_id => count }
  }
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function cart(state = [], action) {
  switch (action.type) {
  case 'CART_LIST':
    return action.data;
  case 'CART_DELETE':
    return _.filter(state, (item) => item.id != action.cart_item_id);
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  default:
    return state;
  }
}

let login_form0 = {name: "", password: ""};
function login_form(state = login_form0, action) {
  return state;
}

function add_item_forms(state = new Map(), action) {
  switch (action.type) {
  case 'UPDATE_ADD_CART_FORM':
    let state1 = new Map(state);
    state1.set(action.task_id, action.count);
    return state1;
  default:
    return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, cart, session,
                                 login_form, add_item_forms});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
