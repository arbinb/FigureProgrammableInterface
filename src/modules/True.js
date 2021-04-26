import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildTrue(buildProps) {
    return buildElement(
      "True", 
      "True", 
      {event: "INCOMMING_FLOW", 
      outputs: ["Boolean"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const True = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"True"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
export default True;
