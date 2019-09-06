import React, { FC } from "react";
import { connect } from "react-redux";
import { DynamicModuleLoader } from "redux-dynamic-modules";
import { WorkflowContextModalProps } from "./_components/WorkflowContext/_dataTypes";
import Workflow from "./_components/WorkflowContext";
import Loading from "../Loading";
import { GET_ITEMS, getWorkflowContextModule } from "./_redux";

const ConnectedWorkflowContext: FC<WorkflowContextModalProps> = props => {
  if (props.WorkflowContextItems.length === 0 && props.workflowModalUrl) {
    props.getWorkflowContextItems(props.workflowModalUrl);
  }
  return (
    <DynamicModuleLoader modules={[getWorkflowContextModule()]}>
      {props.loading ? <Loading /> : <Workflow {...props} />}
    </DynamicModuleLoader>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state.workflowState);
  if (!state.workflowState) {
    return {};
  } else {
    return state.workflowState;
  }
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getWorkflowContextItems: (url: string) => {
      console.log("getWorkflowContextItems");
      dispatch({ type: GET_ITEMS, url });
    }
  };
};

const WorkflowContextView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWorkflowContext);

export default WorkflowContextView;
export * from "./_components/WorkflowContext/_dataTypes";
