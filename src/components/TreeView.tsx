import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> { spec: any; diagnostics: IRuleResult[]; }

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {

  // put you solution here

  return <ul {...restProps} />;
}
