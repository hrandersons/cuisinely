import { SET_SHOPPING_LIST, SET_USER_INFO, SET_POINT, SET_EDIT } from '../actions/actions.js';
const initialState = {
  loggedIn: '',
  shoppingList: [],
  user: {},
  points: 0,
  editId: ''
};

export default function(state = initialState, action) {
  let shoppingList;
  let user;
  let points;
  let editId;
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
  case SET_EDIT:
    console.log('editing');
    editId = action.payload;
    return {...state, editId};
  default:
    return state;
  }
}
