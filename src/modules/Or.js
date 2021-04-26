import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildOr(buildProps) {
    return buildElement(
      "Or", 
      "Or", 
      {event: "PUSH", 
      inputs: ["Boolean", "Boolean"],
      outputs: ["Boolean"]},
      buildProps.position,
    );
}

// eslint-disable-next-line
const Or = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"Or"}
       type={nodeType}
       inputs={data.inputs}
       outputs={data.outputs}
      />
    );
  };
  export default React.memo(Or);
