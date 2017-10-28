export const SET_SHOPPING_LIST = 'SET_SHOPPING_LIST';
export const SET_USER_INFO = 'SET_USER_INFO';

export const setList = (list) => ({
  type: SET_SHOPPING_LIST,
  payload: list
});

export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user
});
