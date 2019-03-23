import * as React from 'react';
import TreeView from '../components/TreeView';
import { connect } from 'react-redux';
import Editor from '../components/Editor';

export class App extends React.Component<any, any> {
  
  render() {
    return (
      <div style={{display: 'flex'}}>
        <TreeView/>
        <Editor/>
      </div>
    );
  }

}

export default connect()(App);

