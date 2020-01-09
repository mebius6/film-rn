import actionTypes from '../../actionTypes';

const initState = {
  tabsData: [],
  loading: false,
  errorMsg: '',
};

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_TABSDATA:
      return {
        ...state,
        tabsData: action.tabsData,
      };
    case actionTypes.REQ_START:
      return {
        ...state,
        tabsData: [],
        loading: action.loading,
      };
    case actionTypes.REQ_FAIL:
      return {
        ...state,
        loading: action.loading,
        errorMsg: action.errorMsg,
      };
    case actionTypes.REQ_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        tabsData: action.tabsData,
      };
    default:
      return state;
  }
}

export default account;
