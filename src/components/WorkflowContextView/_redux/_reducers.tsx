import { SET_ITEMS } from "./_actions";

export function WorkflowContextData(state: string, action: any) {
  switch (action.type) {
    case SET_ITEMS:
      if (action.payload.length !== 0) {
        return Object.assign({}, state, {
          WorkflowContextItems: action.payload,
          loading: false
        });
      } else {
        return Object.assign({}, state, { loading: true });
      }
    default:
      return Object.assign({}, state);
  }
}
