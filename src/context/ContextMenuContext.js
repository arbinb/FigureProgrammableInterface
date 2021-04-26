import { createContext, useContext } from "react";

export const ContextMenuContext = createContext();

export function useContextMenu() {
  const context = useContext(ContextMenuContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}
