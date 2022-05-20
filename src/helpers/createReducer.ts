export default function createReducer(initialState: any, handlers:any) {
  return (state = initialState, action:any) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);
}
