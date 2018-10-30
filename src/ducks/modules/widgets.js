import { createActions, handleActions } from 'redux-actions';

// Actions
// [best] action name: <NOUN>_<VERB>
// [ducks rule] MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
const LOAD = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

const initialState = {};

// Reducer
// [ducks rule]: MUST export default a function called reducer()
// [redux-actions] build your reducers using redux-actions’ handleActions()
export default handleActions({
  [LOAD]: (state, action) => state,
  [CREATE]: (state, action) => state,
  [UPDATE]: (state, action) => state,
  [REMOVE]: (state, action) => state,
},
initialState);
// export default function reducer(state = {}, action = {}) {
//   switch (action.type) {
//     // do reducer stuff
//     default: return state;
//   }
// }

// Action Creators
// [ducks rule] MUST export its action creators as functions
export const {
  // [best] action creator name: <verb><Noun>
  loadWidgets, createWidget, updateWidget, removeWidget,
} = createActions({
  [LOAD]: () => {},
  [CREATE]: widget => ({ widget }),
  [UPDATE]: widget => ({ widget }),
  [REMOVE]: widget => ({ widget }),
});

// export function loadWidgets() {
//   return { type: LOAD };
// }

// export function createWidget(widget) {
//   return { type: CREATE, widget };
// }

// export function updateWidget(widget) {
//   return { type: UPDATE, widget };
// }

// export function removeWidget(widget) {
//   return { type: REMOVE, widget };
// }

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function loadWidge() {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)));
// }

// [best] selector name: get<Noun>
export const getWidget = state => state;
