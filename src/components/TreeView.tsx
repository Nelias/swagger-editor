import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> { 
  spec: any,
  diagnostics: IRuleResult[] 
}

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {

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

  extractKeys(spec);

  let htmlTree: Array<string> = keysFromJSON.map((elem: string) => {
    if (elem === "->") {
      return "<ul>";
    }

    if (elem === "<-") {
      return "</ul>";
    }

    return `<li>${elem}</li>`;
  });

  return <div className="swagger-tree" dangerouslySetInnerHTML={{__html: htmlTree.join(" ")}} />;
}

