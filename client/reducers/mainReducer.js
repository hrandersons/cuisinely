import { SET_SHOPPING_LIST, SET_MEAL_PLAN, EDIT_MEAL_PLAN, COMPLETE_RECIPE, SET_USER_INFO, SET_POINT, SET_EDIT } from '../actions/actions.js';
const initialState = {
  loggedIn: '',
  shoppingList: [],
  mealPlan: [],
  user: {},
  points: 0,
  editId: '',
  editDate: ''
};

export default function(state = initialState, action) {
  let shoppingList;
  let mealPlan;
  let recipeToAdd;
  let completedRecipe;
  let user;
  let points;
  let editId;
  let editDate;
  switch (action.type) {
  case SET_SHOPPING_LIST:
    shoppingList = action.payload;
    return {...state, shoppingList };
  case SET_MEAL_PLAN:
    mealPlan = action.payload;
    return {...state, mealPlan};
  case EDIT_MEAL_PLAN:
    recipeToAdd = action.payload;
    mealPlan = state.mealPlan.slice();
    for (let i = 0; i < mealPlan.length; i ++) {
      if (mealPlan[i].algolia === state.editId) {
        recipeToAdd.date = mealPlan[i].date;
        mealPlan[i] = recipeToAdd;
        break;
      }
    }
    editId = '';
    return {...state, mealPlan, editId};
  case COMPLETE_RECIPE:
    completedRecipe = action.payload;
    mealPlan = state.mealPlan.slice();
    for (let i = 0; i < mealPlan.length; i ++) {
      if (mealPlan[i].algolia === completedRecipe.algolia && mealPlan[i].date === completedRecipe.date) {
        mealPlan[i].complete = true;
        break;
      }
    }
    return {...state, mealPlan};
  case SET_USER_INFO:
    user = action.payload;
    return {...state, user};
  case SET_POINT:
    points = action.payload;
    return {...state, points};
  case SET_EDIT:
    editId = action.payload.id;
    editDate = action.payload.date;
    return {...state, editId, editDate};
  default:
    return state;
  }
}
