import { SET_SHOPPING_LIST, SET_USER_INFO } from '../actions/actions.js';
const initialState = {
  loggedIn: '',
  shoppingList: [],
  user: {}
};

export default function(state = initialState, action) {
  let shoppingList;
  let user;
  switch (action.type) {
  case SET_SHOPPING_LIST:
    shoppingList = action.payload;
    return {...state, shoppingList };
  case SET_USER_INFO:
    user = action.payload;
    return {...state, user};
  default:
    return state;
  }
}
