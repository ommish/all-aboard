const QuoteReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUOTE:
    return Object.assign({}, state, action.quote);
    default:
    return state;
  }
}

export default QuoteReducer;
