import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { WrappedCard as WrappedCardType } from "../../types";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { NavigationControls } from "./NavigationControls";
import { ProgressBar } from "./ProgressBar";
import { WrappedCard } from "./WrappedCard";

type WrappedExperienceProps = {
  cards: WrappedCardType[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onComplete: () => void;
};

export function WrappedExperience({ cards, activeIndex, setActiveIndex, onComplete }: WrappedExperienceProps) {
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const nextCard = cards[activeIndex + 1];
    if (!nextCard) return;

    const sources = nextCard.images ?? (nextCard.image ? [nextCard.image] : []);
    sources.forEach((source) => {
      const image = new Image();
      image.src = source;
    });
  }, [activeIndex, cards]);

  const previous = useCallback(() => {
    if (activeIndex === 0) return;
    setDirection(-1);
    setActiveIndex(activeIndex - 1);
  }, [activeIndex, setActiveIndex]);

  const next = useCallback(() => {
    if (activeIndex === cards.length - 1) {
      onComplete();
      return;
    }
    setDirection(1);
    setActiveIndex(activeIndex + 1);
  }, [activeIndex, cards.length, onComplete, setActiveIndex]);

  useKeyboardNavigation(previous, next);

  const onDragEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -70) next();
    if (info.offset.x > 70) previous();
  };

  return (
    <main className="wrapped-experience">
      <ProgressBar total={cards.length} current={activeIndex} />
      <p className="sr-only" aria-live="polite">Card {activeIndex + 1} of {cards.length}: {cards[activeIndex].title}</p>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          className="wrapped-slide"
          key={cards[activeIndex].id}
          custom={direction}
          initial={{ x: direction * 90, opacity: 0, rotate: direction * 1.5 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: direction * -90, opacity: 0, rotate: direction * -1.5 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          <WrappedCard card={cards[activeIndex]} index={activeIndex} />
        </motion.div>
      </AnimatePresence>
      <NavigationControls onPrevious={previous} onNext={next} canPrevious={activeIndex > 0} isLast={activeIndex === cards.length - 1} />
    </main>
  );
}
