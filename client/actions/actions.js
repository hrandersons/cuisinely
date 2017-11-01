export const SET_SHOPPING_LIST = 'SET_SHOPPING_LIST';
export const SET_MEAL_PLAN = 'SET_MEAL_PLAN';
export const EDIT_MEAL_PLAN = 'EDIT_MEAL_PLAN';
export const COMPLETE_RECIPE = 'COMPLETE_RECIPE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_POINT = 'SET_POINT';
export const SET_EDIT = 'SET_EDIT';

export const setList = (list) => ({
  type: SET_SHOPPING_LIST,
  payload: list
});

export const setMealPlan = (mealPlan) => ({
  type: SET_MEAL_PLAN,
  payload: mealPlan
});

export const editMealPlan = (recipeToAdd) => ({
  type: EDIT_MEAL_PLAN,
  payload: recipeToAdd
});

export const completeRecipe = (completedRecipe) => ({
  type: COMPLETE_RECIPE,
  payload: completedRecipe
});

export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user
});

export const setPoints = (points) => ({
  type: SET_POINT,
  payload: points
});

export const setEdit = (recipeId) => ({
  type: SET_EDIT,
  payload: recipeId
});
