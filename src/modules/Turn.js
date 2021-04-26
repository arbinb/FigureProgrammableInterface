import React, { useState, useEffect } from 'react';
import buildElement from '../NodeHelper'
import NodeTemplate from '../NodeTemplate';
import { useProject } from "../context/ProjectContext";

export function buildTurn(buildProps) {
    return buildElement(
      "Turn", 
      "Turn", 
      {event: "50", 
      parameters: ["90"], 
      outputs: ["Trigger"], 
      inputs: ["Trigger"], 
      }, 
      buildProps.position,
      );
}

// eslint-disable-next-line
const Turn = ({ data, id, selected, nodeType }) => {
    const [ipAddress, setIP] = useState(data.parameters[0]);
    const [event, setEvent] = useState(data.event);

    const { setElements } = useProject();
    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.data = {
              ...el.data,
              parameters: [ipAddress],
              event: event,
            };
          }

          return el;
        })
      );      
    }, [ipAddress, event, id, setElements]);
    return (
        <div>
          <NodeTemplate
          id={id}
          title={`Turn: ${ipAddress} degrees`}
          type={nodeType}
          inputs={data.inputs}
          outputs={data.outputs}
          >
            {selected && (
              <div className="customNode_editor">
                <div className="customNode_item">
                    <span>Rotation (degrees):</span>
                    <input onChange={e => setIP(e.target.value)} value={ipAddress}/>
                </div>
                <div className="customNode_item">
                    <span>Speed (0-100):</span>
                    <input onChange={e => setEvent(e.target.value)} value={event} />
              </div>
            </div>

            )}
            </NodeTemplate>
        </div>

    );
  };
export default React.memo(Turn);
