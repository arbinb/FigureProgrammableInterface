import { createContext, useContext } from "react";

export const ProjectContext = createContext();

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}
