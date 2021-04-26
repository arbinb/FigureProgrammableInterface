import React, { useMemo, useCallback } from 'react';
import { Position, Handle, useStoreState} from 'react-flow-renderer';
import { useContextMenu } from "./context/ContextMenuContext";

function NodeTemplate(props) {
  const contextMenu = useContextMenu();
  const handleStyle = useMemo(
    () => ({
      background: `#${props.id.substr(-6)}`,
    }),
    [props.id]
  );

  const nodes = useStoreState((store) => store.nodes);
  function getNode(id) {
    return nodes.find(node => node.id === id);
  }

  // verify connections between modules are using the same string
  const isValidConnection = (connection) => {
    let sourceNode = getNode(connection.source);
    let targetNode = getNode(connection.target);
    if(!sourceNode.data.outputs || !targetNode.data.inputs) return false; // shouldn't ever happen 
    return (sourceNode.data.outputs[connection.sourceHandle - 1] === targetNode.data.inputs[connection.targetHandle - 1]);
  }
  
  const onClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  return (
    <div className="customNode" title={props.id} onClick={onClick} >
      <div className="customNode_header"> 
        {props.title ?? props.type}
      </div>
      <div className="customNode_body">
        {props.inputs && (
          <div className="customNode_inputs">
            {props.inputs.map((input, index) => (
              <div key={input} className="customNode_item">
                <Handle id={(index+1).toString()} position={Position.Left} style={handleStyle} type="target" isValidConnection={isValidConnection}/>
                {input}
              </div>
            ))}
          </div>
        )}
        {props.outputs && (
          <div className="customNode_outputs">
            {props.outputs.map((output, index) => (
              <div key={output} className="customNode_item">
                <Handle id={(index+1).toString()} position={Position.Right} style={handleStyle} type="source" isValidConnection={isValidConnection}/>
                {output}
              </div>
            ))}
          </div>
        )}
        {props.children}
      </div>
  </div>
  );

}

export default React.memo(NodeTemplate);
