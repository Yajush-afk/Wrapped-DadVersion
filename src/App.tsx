import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConstellationExperience } from "./components/constellation/ConstellationExperience";
import { Finale } from "./components/constellation/Finale";
import { WrappedExperience } from "./components/wrapped/WrappedExperience";
import { dadWrapped } from "./content/dadWrapped";
import { useReducedMotion } from "./hooks/useReducedMotion";

type ExperienceStage = "wrapped" | "transition" | "constellation" | "finale";

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>("wrapped");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [viewedMemoryIds, setViewedMemoryIds] = useState<Set<string>>(new Set());
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (stage !== "transition") return;
    const timer = window.setTimeout(() => setStage("constellation"), reducedMotion ? 80 : 1450);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, stage]);

  const replay = () => {
    setActiveCardIndex(0);
    setViewedMemoryIds(new Set());
    setStage("wrapped");
  };

  if (stage === "wrapped") {
    return (
      <WrappedExperience
        cards={dadWrapped.cards}
        activeIndex={activeCardIndex}
        setActiveIndex={setActiveCardIndex}
        onComplete={() => setStage("transition")}
      />
    );
  }

  if (stage === "transition") {
    return (
      <main className="cosmic-transition" aria-label="Opening the memory constellation">
        <motion.div
          className="cosmic-transition__orb"
          initial={{ scale: 0.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 0.55 }}>
          Look up. We saved a few things.
        </motion.p>
      </main>
    );
  }

  if (stage === "finale") {
    return <Finale dadName={dadWrapped.dadName} message={dadWrapped.closingMessage} onMemories={() => setStage("constellation")} onReplay={replay} />;
  }

  return (
    <ConstellationExperience
      memories={dadWrapped.memories}
      viewed={viewedMemoryIds}
      setViewed={setViewedMemoryIds}
      onFinale={() => setStage("finale")}
      onReplay={replay}
    />
  );
}
