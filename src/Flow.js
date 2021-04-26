import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  removeElements,
  Controls
} from 'react-flow-renderer';
import './provider.css';
import { useContextMenu } from './context/ContextMenuContext';
import { useProject } from "./context/ProjectContext";

/* HELP: Import new fresco modules here! */
import EndProgram, {buildEndProgram} from './modules/EndProgram';
import OnProgramRun, {buildOnProgramRun} from './modules/OnProgramRun';
import Walk, {buildWalk} from './modules/Walk';
import Wait, { buildWait } from './modules/Wait';
import If, { buildIf } from './modules/If';
import WaitForAudio, { buildWaitForAudio } from './modules/WaitForAudio';
import Wave, { buildWave } from './modules/Wave';
import Turn, {buildTurn} from './modules/Turn';
import And, { buildAnd } from './modules/And';
import False, { buildFalse } from './modules/False';
import Or, { buildOr } from './modules/Or';
import True, { buildTrue } from './modules/True';
import FM_custom, { buildFM_custom } from './modules/FM_custom';

const onElementClick = (event, element) => console.log();
const onLoad = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
export const GRID_SIZE = 10;

function snapToGrid(position) {
  return Math.floor(position / GRID_SIZE) * GRID_SIZE;
}

export default function Flow() {

  /* HELP: Add new fresco module types here! */
  const nodeTypes = {
    EndProgram: EndProgram,
    OnProgramRun: OnProgramRun,
    Walk: Walk,
    Wait: Wait,
    WaitForAudio: WaitForAudio,
    If: If,
    Wave: Wave,
    Turn : Turn,
    And: And,
    FM_custom: FM_custom,
    Or:Or,
    True:True,
    False:False,
  };

  const contextMenu = useContextMenu();
  const { elements, setElements, transform} = useProject();
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const addNode = useCallback(
    (type, buildFunction) => {
      console.log(type)
      const position = {
        x: snapToGrid((contextMenu.getRect().left - transform.x) / transform.zoom),
        y: snapToGrid((contextMenu.getRect().top - transform.y) / transform.zoom),
      };
      const buildProps = {
        position,
      }
      const node = buildFunction(buildProps);
      console.log("Node added");
      setElements((elements) => [...elements, node]);
      contextMenu.hide();
    },
    [contextMenu, setElements, transform]
  );

  const onNodeDragStop = useCallback(
    (event, draggedNode) => {
      const position = {
        x: snapToGrid(draggedNode.position.x),
        y: snapToGrid(draggedNode.position.y),
      };
      setElements((els) =>
        els.map((el) => {
          if (el.id === draggedNode.id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            el.position = position;
          }
          return el;
        })
      );
    },
    [setElements]
  );


  const onPaneClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const onPaneContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(<FlowContextMenu />);
    },
    [contextMenu]
  );
  
  function FlowContextMenu() {
    return (
      <ul className="contextMenu">
        {items.map(item => (
          <li key={item.label}>
            {item.label}
            <span>&#x276F;</span>
            {item.items && (
              <ul className="contextMenu sub">
                {item.items.map(subitem => (
                  <li key={subitem.label} onClick={() => addNode(subitem.label, subitem.build)}>
                    {subitem.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
  
  
  /* HELP: Add new FRESCO module here. This is the right-click toolbar */
  const items = [
    {
      items: [
        { label: "OnProgramRun", build: buildOnProgramRun },
        { label: "Wait", build: buildWait },
        { label: "WaitForAudio", build: buildWaitForAudio },
        { label: "EndProgram", build: buildEndProgram },
      ],
      label: "Event",
    },
    {
      items: [
        { label: "Walk", build: buildWalk },
        { label: "Turn", build: buildTurn },
        { label: "Wave", build: buildWave },
      ],
      label: "Actions",
    },
    {
      items: [
        { label: "If", build: buildIf },
        { label: "And", build: buildAnd },
        { label: "Or", build: buildOr },
        { label: "True", build: buildTrue },
        { label: "False", build: buildFalse },
      ],
      label: "Logic",
    },
  ];

  return (
    <div className="reactflow-wrapper" >
      <ReactFlow
        elements={elements}
        onElementClick={onElementClick}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        selectNodesOnDrag={false}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        style={{ zIndex: 0 }}
      >
        <Background gap={GRID_SIZE} />
        <Controls />
      </ReactFlow>
  </div>
  )

  
};


