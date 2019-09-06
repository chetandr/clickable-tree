import { DynamicTabProps } from "../components/DynamicTabs";
import { DynamicTreeViewConfig } from '../components/DynamicTreeView';
import { DynamicKPIProps } from "../components/DynamicKPI";

export const dynamicTabProps: DynamicTabProps = {
    tabsUrl: "http://localhost:3001/jda/tabs", // TODO: Should be able to accept JSON or a callback to getch data
    collapsibelTreeView: false,
    showSelectAll: true,
    setTabIndex: () => {},
    setTabValue: () => {},
    tabIndex: 0,
    tabValue: "",
    tabItems: [],
    getTabItems: () => {},
    loading: true,
  };

export const dynamicTreeViewProps: DynamicTreeViewConfig ={
    treeItems: [],
    tabChanged: false,
    openItems : [],
    searchString : "",
    checkedItems: [],
    selectedTab: "",
    treeDataUrl: "http://localhost:3001/jda/tabs",
    getTreeData: (data, tab) => {},
    setChecked: (data) => {},
    setOpen: (data) => {},
    setSearch: (data) => {},
    setSelectedTab: (data) => {},
    collapsibelTreeView: false,
    showSelectAll: true,
    updateButton: true,
    updateButtonLabel: "Update view",
    loading: true
}

export const kpiViewProps: DynamicKPIProps = {
  kpiUrl: "http://localhost:3001/jda/kpiimpact",
  loading: true,
  kpiItems: [],
  getKPIItems: () => {},
  getKPILeftItems: (data) => {},
  getKPIRightItems: (data) => {}
}

export const scenarioprops = {
  label: "Scenario Name",
  textValue: ""
}

export const descriptionprops = {
  label: "Description",
  textValue: ""
}

export const baseScenarioProps = {
  label: "Base Scenario",
  optionsValue: ["Live", "s1", "s2", "s3"],
}

export const publishProps = {
  label: "Publish",
  optionsValue: [ "Private", "Public"],
}

export const applicationsProps = {
  label: "Applications",
  items: [
  {
    label: "Demand",
    checked: true
  },{
    label: "ESP",
    checked: true
  }, {
    label: "Fulfillment",
    checked: false
  }, {
    label: "Inventory",
    checked: false
  }]
}

export const typeProps = {
  label: "Type",
  optionsValue: ["Incremental", "Full Scope"],
}

export const ModelViewProps = {
  modalTitle: "New Scenario",
  scenarioName: scenarioprops,
  description: descriptionprops,
  baseScenario: baseScenarioProps,
  publishRadio: publishProps,
  applications: applicationsProps,
  typeRadio: typeProps,
}
