import { WorkflowContextData } from "./_reducers";
import { getWorkflowContextAsync, getWorkflowContextList } from "./_saga";

export function getWorkflowContextModule() {
  return {
    id: "workflowcontext_data",
    reducerMap: {
      workflowState: WorkflowContextData
    },
    sagas: [getWorkflowContextAsync, getWorkflowContextList]
  };
}
