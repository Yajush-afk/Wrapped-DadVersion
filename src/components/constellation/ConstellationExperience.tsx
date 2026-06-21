import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { MemoryStar } from "../../types";
import { MemoryDialog } from "./MemoryDialog";
import { StarField } from "./StarField";

type ConstellationProps = {
  memories: MemoryStar[];
  viewed: Set<string>;
  setViewed: (viewed: Set<string>) => void;
  onFinale: () => void;
  onReplay: () => void;
};

export function ConstellationExperience({ memories, viewed, setViewed, onFinale, onReplay }: ConstellationProps) {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    memories.forEach((memory) => {
      const image = new Image();
      image.src = memory.image;
    });
  }, [memories]);

  const selectMemory = useCallback((index: number) => {
    setSelected(index);
    const nextViewed = new Set(viewed);
    nextViewed.add(memories[index].id);
    setViewed(nextViewed);
  }, [memories, setViewed, viewed]);

  const allViewed = viewed.size === memories.length;

  return (
    <main className="constellation-experience">
      <header className="constellation-header">
        <p>A constellation of lessons</p>
        <h1>Somethings stay with us<br /><em>Forever.</em></h1>
        <span>{viewed.size} of {memories.length} lessons opened</span>
      </header>
      <StarField memories={memories} viewed={viewed} onSelect={selectMemory} />
      <footer className="constellation-footer">
        <button className="button-quiet" onClick={onReplay}>↺ Replay Wrapped</button>
        <p>Choose a lesson</p>
        <button className={allViewed ? "is-ready" : ""} onClick={onFinale}>Final message →</button>
      </footer>
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MemoryDialog
              memory={memories[selected]}
              position={selected + 1}
              total={memories.length}
              onClose={() => setSelected(null)}
              onPrevious={() => selectMemory((selected - 1 + memories.length) % memories.length)}
              onNext={() => selectMemory((selected + 1) % memories.length)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
