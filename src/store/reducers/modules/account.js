import actionTypes from '../../actionTypes';

const initState = {
  token: '',
  userInfo: {},
};

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      return {
        ...state,
        token: action.info.token || state.userInfo.token,
        userInfo: {
          ...state.userInfo,
          ...action.info,
        },
      };
    default:
      return state;
  }
}

export default account;
