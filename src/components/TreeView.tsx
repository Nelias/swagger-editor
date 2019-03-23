import * as React from 'react';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { connect } from 'react-redux';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> { 
  spec: any,
  diagnostics: IRuleResult[] 
}

class TreeView extends React.Component<TreeViewProps, any> {

  render() {
    let keysFromJSON: Array<string> = [];

    const extractKeys = (file: any) => {
  
      for (let i: number = 0; i < Object.keys(file).length; i++) {
  
        let value = file[Object.keys(file)[i]];
  
        keysFromJSON.push(Object.keys(file)[i]);
  
        if (typeof value !== 'string') {
          keysFromJSON.push("->");
  
          extractKeys(value);
  
          keysFromJSON.push("<-")
        }
      }
  
    };
  
    extractKeys(this.props.spec);
  
    let htmlTree: Array<string> = keysFromJSON.map((elem: string) => {
  
      if (elem === "->") {
        return "<ul>";
      }
  
      if (elem === "<-") {
        return "</ul>";
      }
  
      return `<li>${elem}</li>`;
  
    });

    return (
      <div style={{height: "500px", overflowY: "scroll"}} className="swagger-tree" dangerouslySetInnerHTML={{__html: htmlTree.join(" ")}} />
    );
  }
}

const mapStateToProps = (state: any, ownProps: any = {}) => {
  return {
    spec: state.spec,
    diagnostics: state.diagnostics
  }
};

export default connect(mapStateToProps)(TreeView);

