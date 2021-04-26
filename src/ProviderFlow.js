import React, { useState, useMemo } from 'react';
import {
  ReactFlowProvider,
} from 'react-flow-renderer';
import ContextMenu from "./ContextMenu";
import Sidebar, { getDefaultProject } from './Sidebar';
import Flow from "./Flow";
import { ProjectContext } from "./context/ProjectContext";
import './provider.css';

export const GRID_SIZE = 10;

// define a function called ProviderFlow that takes no arguments () and then runs =>
const ProviderFlow = () => { 
  const defaultProject = useMemo(getDefaultProject, []);
  const [id, setId] = useState(defaultProject.id);
  const [elements, setElements] = useState(defaultProject.elements);
  const [transform, setTransform] = useState(defaultProject.transform);
  const project = { elements, id, setElements, setId, setTransform, transform };
  return (
    <ProjectContext.Provider value={project}>
      <div className="providerflow">
        <ReactFlowProvider>
          <ContextMenu>
            <div
              style={{
                      alignItems: "stretch",
                      display: "flex",
                      height: "100vh",
                    }}
              >
              <Flow key={project.id}/>
              <Sidebar />
            </div>
          </ContextMenu>
        </ReactFlowProvider>
      </div>
    </ProjectContext.Provider>
  );
};
export default ProviderFlow;
