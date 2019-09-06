import React from "react";
import { Provider } from "react-redux";
import { createStore, IModuleStore } from "redux-dynamic-modules-core";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AppState from "./state.type";
import { Dashboard, Comments} from './views/Loadables'
import { Grid} from "@material-ui/core";
import WorkflowContextView from "./components/WorkflowContextView";
import {workflowContextModalConfig} from "./config";

const store: IModuleStore<AppState> = createStore({
  extensions: [getSagaExtension()]
});
const App: React.FC = () => {
  return (
    <Provider store={store}>

      <Router>
        <Link to="/">Dashboard</Link> | <Link to="/comments">Comments</Link>
        <Switch>
          <Route
            path="/"
            exact
            component={Dashboard}
          ></Route>
          <Route
            path="/comments"
            exact
            component={Comments}
          ></Route>
        </Switch>
      </Router>
      <div>
      <Grid item xs={12}>
            <WorkflowContextView {...workflowContextModalConfig}>
              Loading...
            </WorkflowContextView>
          </Grid>
          </div>
    </Provider>
    
  );
};

export default App;
