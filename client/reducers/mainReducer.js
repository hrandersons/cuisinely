import { SET_SHOPPING_LIST, SET_USER_INFO, SET_POINT } from '../actions/actions.js';
const initialState = {
  loggedIn: '',
  shoppingList: [],
  user: {},
  points: 0
};

export default function(state = initialState, action) {
  let shoppingList;
  let user;
  let points;
  switch (action.type) {
  case SET_SHOPPING_LIST:
    shoppingList = action.payload;
    return {...state, shoppingList };
  case SET_USER_INFO:
    user = action.payload;
    return {...state, user};
  case SET_POINT:
    points = action.payload;
    return {...state, points};
  default:
    return state;
  }
}
