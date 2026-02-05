"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FooterV2ContextType {
  showFooterV2: boolean;
  setShowFooterV2: (show: boolean) => void;
}

const FooterV2Context = createContext<FooterV2ContextType | undefined>(
  undefined,
);

export function FooterV2Provider({ children }: { children: ReactNode }) {
  const [showFooterV2, setShowFooterV2] = useState(false);

  return (
    <FooterV2Context.Provider value={{ showFooterV2, setShowFooterV2 }}>
      {children}
    </FooterV2Context.Provider>
  );
}

export function useFooterV2() {
  const context = useContext(FooterV2Context);
  if (context === undefined) {
    throw new Error("useFooterV2 must be used within a FooterV2Provider");
  }
  return context;
}

// Custom hook to toggle footer v2 on any page
export function useFooterV2Toggle(showFooter: boolean = true) {
  const { setShowFooterV2 } = useFooterV2();

  useEffect(() => {
    setShowFooterV2(showFooter);
    return () => setShowFooterV2(false);
  }, [showFooter, setShowFooterV2]);
}
