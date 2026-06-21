import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConstellationExperience } from "./components/constellation/ConstellationExperience";
import { Finale } from "./components/constellation/Finale";
import { WrappedExperience } from "./components/wrapped/WrappedExperience";
import { dadWrapped } from "./content/dadWrapped";
import { useReducedMotion } from "./hooks/useReducedMotion";

type ExperienceStage = "wrapped" | "transition" | "constellation" | "finale";

type PersistedExperience = {
  stage: ExperienceStage;
  activeCardIndex: number;
  viewedMemoryIds: string[];
};

export const EXPERIENCE_STORAGE_KEY = "dad-wrapped-progress-v1";

const defaultProgress: PersistedExperience = {
  stage: "wrapped",
  activeCardIndex: 0,
  viewedMemoryIds: [],
};

function loadProgress(): PersistedExperience {
  try {
    const stored = window.localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    if (!stored) return defaultProgress;

    const parsed = JSON.parse(stored) as Partial<PersistedExperience>;
    const validStages: ExperienceStage[] = ["wrapped", "transition", "constellation", "finale"];
    const storedStage = validStages.includes(parsed.stage as ExperienceStage)
      ? parsed.stage as ExperienceStage
      : "wrapped";
    const activeCardIndex = Number.isInteger(parsed.activeCardIndex)
      ? Math.max(0, Math.min(parsed.activeCardIndex!, dadWrapped.cards.length - 1))
      : 0;
    const validMemoryIds = new Set(dadWrapped.memories.map((memory) => memory.id));
    const viewedMemoryIds = Array.isArray(parsed.viewedMemoryIds)
      ? parsed.viewedMemoryIds.filter((id): id is string => typeof id === "string" && validMemoryIds.has(id))
      : [];

    return {
      // A reload during the short visual transition should land at its destination.
      stage: storedStage === "transition" ? "constellation" : storedStage,
      activeCardIndex,
      viewedMemoryIds,
    };
  } catch {
    return defaultProgress;
  }
}

export default function App() {
  const [initialProgress] = useState(loadProgress);
  const [stage, setStage] = useState<ExperienceStage>(initialProgress.stage);
  const [activeCardIndex, setActiveCardIndex] = useState(initialProgress.activeCardIndex);
  const [viewedMemoryIds, setViewedMemoryIds] = useState<Set<string>>(() => new Set(initialProgress.viewedMemoryIds));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const progress: PersistedExperience = {
      stage,
      activeCardIndex,
      viewedMemoryIds: [...viewedMemoryIds],
    };

    try {
      window.localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The experience still works when storage is unavailable or disabled.
    }
  }, [activeCardIndex, stage, viewedMemoryIds]);

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
      <main className="cosmic-transition" aria-label="Opening eight lessons from Dad">
        <motion.div
          className="cosmic-transition__orb"
          initial={{ scale: 0.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 1.3, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 0.55 }}>
          Look up. Eight lessons are waiting.
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
