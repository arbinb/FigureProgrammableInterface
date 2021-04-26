import React, { useState, useEffect } from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';
import { useProject } from "../context/ProjectContext";

export function buildIf(buildProps) {
    return buildElement(
      "If", 
      "If", 
      {event: "PULL", 
      parameters: ["N"], 
      outputs: ["Trigger", "Trigger"], 
      inputs: ["Boolean"], 
      }, 
      buildProps.position,
      );
}

// eslint-disable-next-line
const If = ({ data, id, selected, nodeType }) => {
    const [port, setIP] = useState(data.parameters[0]);

    const { setElements } = useProject();
    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              parameters: [port],
            };
          }

          return el;
        })
      );      
    }, [port, id, setElements]);
    return (
        <div>
          <NodeTemplate
          id={id}
          title={`If`}
          type={nodeType}
          inputs={data.inputs}
          outputs={data.outputs}
          >
            {selected && (
              <div className="customNode_editor">
                <div className="customNode_item">
                    <span>Negate? (Y/N):</span>
                    <input onChange={e => setIP(e.target.value)} value={port}/>
                </div>
            </div>

            )}
            </NodeTemplate>
        </div>

    );
  };
export default React.memo(If);