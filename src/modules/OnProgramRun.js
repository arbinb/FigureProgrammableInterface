import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildOnProgramRun(buildProps) {
    return buildElement(
      "OnProgramRun", 
      "OnProgramRun", 
      {event: "INCOMMING_FLOW", 
      outputs: ["Trigger"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const OnProgramRun = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"OnProgramRun"}
       type={nodeType}
       outputs={data.outputs}
       
      />
    );
  };
export default OnProgramRun;
