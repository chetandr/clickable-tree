import React from "react";
import { Grid, Paper, Box } from "@material-ui/core";
import { Provider } from "react-redux";
import { createStore, IModuleStore } from "redux-dynamic-modules-core";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { dynamicTabProps, dynamicTreeViewProps, kpiViewProps, ModelViewProps } from './config';

import DynamicTabs from "./components/DynamicTabs";
import Title from './components/Title';
import DynamicTreeView from './components/DynamicTreeView';
import AppState from './state.type';
import DynamicKPI from "./components/DynamicKPI";
import ScenarioModal from "./components/DynamicNewScenarioModal/_components/NewScenario";

const store: IModuleStore<AppState> = createStore({
  extensions: [getSagaExtension()]
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper>
              <Box p={1}>
                <Title title="View Controller"/>
                <DynamicTabs {...dynamicTabProps}>Loading..</DynamicTabs>
                <DynamicTreeView {...dynamicTreeViewProps}>Loading...</DynamicTreeView>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <DynamicKPI {...kpiViewProps}></DynamicKPI>
            <ScenarioModal {...ModelViewProps} />
          </Grid>
        </Grid>
      </div>
    </Provider>
  );
};

export default App;
