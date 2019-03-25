import * as React from 'react';
import TreeView from '../components/TreeView';
import { connect } from 'react-redux';
import Editor from '../components/Editor';
require('../styles/main.css');

export class App extends React.Component<any, any> {
  
  render() {
    return (
      <div>
        <h1 className="app-title">Swagger Editor</h1>
        <div className="app-wrapper">
          <TreeView/>
          <Editor/>
        </div>
      </div>
  
    );
  }

}

export default connect()(App);

