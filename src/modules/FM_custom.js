import React, { useState, useEffect } from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';
import { useProject } from "../context/ProjectContext";

export function buildFM_custom(buildProps) {
    return buildElement(
      "FM_custom", 
      "FM_custom", 
      {event: "PULL", 
      parameters: [], 
      outputs: ["output1"], 
      inputs: ["input1"], 
      }, 
      buildProps.position,
      );
}

// eslint-disable-next-line
const FM_custom = ({ data, id, selected, nodeType }) => {
    const [custom_parameters, setIP] = useState(data.parameters[0]);

    const { setElements } = useProject();
    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              parameters: [custom_parameters],
            };
          }

          return el;
        })
      );      
    }, [custom_parameters, id, setElements]);
    return (
        <div>
          <NodeTemplate
          id={id}
          title={`FM_custom: ${custom_parameters}`}
          type={nodeType}
          inputs={data.inputs}
          outputs={data.outputs}
          >
            {selected && (
              <div className="customNode_editor">
                <div className="customNode_item">
                    <span>Custom Parameters:</span>
                    <input onChange={e => setIP(e.target.value)} value={custom_parameters}/>
                </div>
            </div>

            )}
            </NodeTemplate>
        </div>

    );
  };
export default React.memo(FM_custom);
