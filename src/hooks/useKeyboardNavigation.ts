import { useEffect } from "react";

export function useKeyboardNavigation(onPrevious: () => void, onNext: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight" || event.key === "Enter") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, onNext, onPrevious]);
}
