import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildFalse(buildProps) {
    return buildElement(
      "False", 
      "False", 
      {event: "INCOMMING_FLOW", 
      outputs: ["Boolean"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const False = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"False"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
export default False;
