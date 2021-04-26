import React, { useCallback, useMemo, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStoreState } from 'react-flow-renderer';
import { useProject } from "./context/ProjectContext";

const textareaStyles = {
  fontSize: 12,
  height: "100%",
  resize: "none",
  width: "100%",
};

const controlsStyles = {
  display: "flex",
  position: "absolute",
  right: "100%",
  top: -10,
  transform: "rotate(-90deg)",
  transformOrigin: "bottom right",
};

const getDrawerStyles = (visible) => ({
  height: "100%",
  padding: 10,
  position: "absolute",
  right: 0,
  top: 0,
  transform: visible ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.4s ease",
  width: 400,
});

export const getDefaultProject = () => ({
  id: uuidv4(),
  elements: [],
  transform: {
    x: 0,
    y: 0,
    zoom: 1,
  },
});

export default function Sidebar() {
  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  const [visible, setVisible] = useState(false);
  const drawerStyles = useMemo(() => getDrawerStyles(visible), [visible]);
  const { elements, id, setElements, setId, setTransform, transform } = useProject();

  function getNode(id) {
    return nodes.find(node => node.id === id);
  }

  function createNodeInfo(node, index) {
    let frescoInputs = []; // List of inputs for this node
    const incomingEdges = getIncomingEdges(node, edges) ?? [];
    let i = 1;
    incomingEdges.forEach(myEdge => {
      let sourceNode = getNode(myEdge.source);
      let inputString = i + ":" + sourceNode.data.frescoid + ":" + myEdge.sourceHandle;
      frescoInputs.push(inputString);
      i++;
    });
  
    const template = 
    {	
      "id" : node.data.frescoid,
      "type" : node.type, 
      "event" : node.data.event, 
      "parameters" : node.data.parameters ?? [],
      "inputs" : frescoInputs,
    }
    return template;
  }

  function buildApp(){
    let frescoModules = [];
    nodes.map((node, index) => {
        //{Use the index of the node in the map as the integer for the FRESCO ID}
        node.data.frescoid = index + 1;
        frescoModules.push(createNodeInfo(node, index));
        return createNodeInfo(node, index);
    });
    return JSON.stringify(
      {
        frescoModules: frescoModules.map(element => ({ ...element, __rf: undefined })),
      },
      null,
      2
    );
  }

  // Load project from URL
  useEffect(() => {
    const project = atob(window.location.hash.substr(1));
    try {
      const { elements, id, transform } = JSON.parse(project);
      setElements(elements);
      setId(id ?? uuidv4());
      setTransform(transform);
    } catch (e) {
      console.error(e);
    }
  }, [setElements, setId, setTransform]);

  // Store project in URL
  useEffect(() => {
    window.location.hash = btoa(
      JSON.stringify({
        elements: elements.map(element => ({ ...element, __rf: undefined })),
        id,
        transform,
      })
    );
  }, [elements, id, transform]);

  const onChange = useCallback(
    (e) => {
      try {
        const { elements, id, transform } = JSON.parse(e.target.value);
        setElements(elements);
        setId(id ?? uuidv4());
        setTransform(transform);
      } catch (e) {
        console.error(e);
      }
    },
    [setElements, setId, setTransform]
  );

  const clearProject = useCallback(() => {
    const defaultProject = getDefaultProject();
    setElements(defaultProject.elements);
    setId(defaultProject.id);
    setTransform(defaultProject.transform);
  }, [setElements, setId, setTransform]);

  const toggleProjectDrawer = useCallback(() => setVisible(visible => !visible), []);

  //
  // downloadApplication() adapted from StackOverflow answer: https://stackoverflow.com/a/44661948
  //
  const downloadApplication = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('frescoOutput').value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "new_fresco_application.fre";
    document.body.appendChild(element);
    element.click();
  }, []);

  return (
    <div style={drawerStyles}>
      <textarea onChange={onChange} editable="false" spellCheck="false" id="frescoOutput" style={textareaStyles} value={buildApp()} />
      <div style={controlsStyles}>
        <button onClick={clearProject} style={{ marginRight: 20 }}>
          clear
        </button>
        <button onClick={downloadApplication} style={{ marginRight: 10 }}>
          download
        </button>
        <button onClick={toggleProjectDrawer}>{visible ? "hide" : "application"}</button>
      </div>
    </div>
  );
};

function getIncomingEdges(node, edges) {
  return edges.filter((edge) => {
    return edge.target === node.id;
  });
}