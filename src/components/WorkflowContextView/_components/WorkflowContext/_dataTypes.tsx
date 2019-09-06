export interface WorkflowContextItem {
  businessUnit: any;
  productGroup: any;
  productFamily: any;
  items: any;
  location: any;
  resources: any;
}
export interface WorkflowContextModalProps {
  workflowModalUrl: string;
  loading: boolean;
  WorkflowContextItems: Array<WorkflowContextItem>;
  getWorkflowContextItems: Function;
}
