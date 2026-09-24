import { createContext, useContext } from "react";
import { defaultPortfolioContent } from "../data/contentDefaults";

const PortfolioContentContext = createContext(defaultPortfolioContent);

export function PortfolioContentProvider({ content, children }) {
  return (
    <PortfolioContentContext.Provider value={content || defaultPortfolioContent}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  return useContext(PortfolioContentContext);
}
