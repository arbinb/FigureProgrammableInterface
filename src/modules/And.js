import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildAnd(buildProps) {
    return buildElement(
      "And", 
      "And", 
      {event: "PUSH", 
      inputs: ["Boolean", "Boolean"],
      outputs: ["Boolean"]},
      buildProps.position,
    );
}

// eslint-disable-next-line
const And = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"And"}
       type={nodeType}
       inputs={data.inputs}
       outputs={data.outputs}
      />
    );
  };
  export default React.memo(And);
