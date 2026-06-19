import { useEffect, useRef } from "react";
import type { MemoryStar } from "../../types";
import { SafeImage } from "../shared/SafeImage";

type MemoryDialogProps = {
  memory: MemoryStar;
  position: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function MemoryDialog({ memory, position, total, onClose, onPrevious, onNext }: MemoryDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button")?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("button")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="memory-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="memory-dialog" role="dialog" aria-modal="true" aria-labelledby="memory-title" ref={panelRef}>
        <button className="memory-dialog__close" onClick={onClose} aria-label="Close memory">×</button>
        <div className="memory-dialog__photo">
          <SafeImage src={memory.image} alt={memory.alt} label={`MEMORY ${position}`} />
        </div>
        <div className="memory-dialog__copy">
          <p className="memory-dialog__count">Memory {position} / {total}</p>
          <h2 id="memory-title">{memory.title}</h2>
          <p>{memory.memory}</p>
          <nav className="memory-dialog__nav" aria-label="Memory navigation">
            <button onClick={onPrevious} aria-label="Previous memory">← Previous</button>
            <button onClick={onNext} aria-label="Next memory">Next →</button>
          </nav>
        </div>
      </div>
    </div>
  );
}
