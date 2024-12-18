import { createStore, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';

    const initialState = {};

    function rootReducer(state = initialState, action) {
      switch (action.type) {
        default:
          return state;
      }
    }

    const store = createStore(rootReducer, applyMiddleware(thunk));

    export default store;
