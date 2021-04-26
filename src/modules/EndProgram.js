import React from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';

export function buildEndProgram(buildProps) {
    return buildElement(
      "EndProgram", 
      "EndProgram", 
      {event: "PUSH", 
      inputs: ["Trigger"]}, 
      buildProps.position,
    );
}

// eslint-disable-next-line
const EndProgram = ({ data, id, selected, nodeType }) => {
    return (
      <NodeTemplate
       id={id}
       title={"EndProgram"}
       type={nodeType}
       inputs={data.inputs}

      />
    );
  };
  export default React.memo(EndProgram);
