import { useCategoryFilterStore } from "@/store/categoryFilterStore";
import { useEffect, useRef, useState } from "react";

export const useActiveCategory = (categoryIds: number[]) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const setActiveTab = useCategoryFilterStore((s) => s.toggle);
  const prev = useRef<number | null>(null);

  useEffect(() => {
    if (categoryIds.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const observedIds = new Set<number>();
    let rafId: number | null = null;

    const setupObservers = () => {
      categoryIds.forEach((id) => {
        if (observedIds.has(id)) return;
        const el = document.getElementById(`category-${id}`);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && prev.current !== id) {
              prev.current = id;
              setActiveId(id);
              setActiveTab(id);
            }
          },
          {
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0.1,
          }
        );

        observer.observe(el);
        observers.push(observer);
        observedIds.add(id);
      });

      if (observedIds.size < categoryIds.length) {
        rafId = window.requestAnimationFrame(setupObservers);
      }
    };

    setupObservers();

    return () => {
      observers.forEach((observer) => observer.disconnect());
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [categoryIds.join(","), setActiveTab]);

  return activeId;
};
