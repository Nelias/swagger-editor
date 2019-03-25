import * as React from 'react';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { connect } from 'react-redux';
import { IRuleResult } from '@stoplight/spectral';
import { diagnose } from '../util/linting';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> { 
  spec: object
}

class TreeView extends React.Component<TreeViewProps, any> {

  diagnostics: IRuleResult[] = diagnose(this.props.spec);

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


    let checkedErrors: Array<string> = [];

    for (let i: number = 0; i < this.diagnostics.length; i++) {

      let currentProblem = this.diagnostics[i];

      keysFromJSON = keysFromJSON.map((elem: string) => {
  
        if (elem === currentProblem.path[0]) {
          checkedErrors = [];
          checkedErrors.push(elem);
          return `${elem}てて`;
        }

        if (checkedErrors.length !== 0) {

          for (let j: number = 0; j < currentProblem.path.length; j++) {
            if (elem === currentProblem.path[j] && checkedErrors.length === j) {

              checkedErrors.push(elem);
              
              if (checkedErrors.length === currentProblem.path.length) {
                checkedErrors = [checkedErrors[0]];
                return `${elem}てて`;
              } else {
                return `${elem}てて`;
              }
            }
          }

        }

        return elem;
      });

    }

    let htmlTree: Array<string> =  keysFromJSON.map((elem: string) => {
  
      if (elem === "->") {
        return "<ul>";
      }
  
      if (elem === "<-") {
        return "</ul>";
      }

      if (elem.match(/てて/)) {
        return `<li><span class="warning">${elem.slice(0, -2)}</span></li>`;
      }
  
      return `<li>${elem}</li>`;
  
    });
  
    return (
      <div className="swagger-tree" dangerouslySetInnerHTML={{__html: htmlTree.join(" ")}} />
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

