import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './containers/App';

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}><App /></Provider>, document.getElementById("root")
);

