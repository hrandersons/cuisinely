import { SET_SHOPPING_LIST } from '../actions/actions.js';
const initialState = {
  loggedIn: '',
  shoppingList: []
};

export default function(state = initialState, action) {
  let shoppingList;
  switch (action.type) {
  case SET_SHOPPING_LIST:
    shoppingList = action.payload;
    return {...state, shoppingList };
  default:
    return state;
  }
}
