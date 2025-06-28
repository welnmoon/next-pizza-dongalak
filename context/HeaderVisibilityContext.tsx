// context/HeaderVisibilityContext.tsx
"use client";

import { createContext, useContext, useRef, useEffect, useState } from "react";

const HeaderVisibilityContext = createContext<{
  headerRef: React.RefObject<HTMLDivElement | null>;
  showMiniLogo: boolean;
}>({
  headerRef: { current: null },
  showMiniLogo: false,
});

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext);

export const HeaderVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [showMiniLogo, setShowMiniLogo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMiniLogo(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const el = headerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <HeaderVisibilityContext.Provider value={{ headerRef, showMiniLogo }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};
