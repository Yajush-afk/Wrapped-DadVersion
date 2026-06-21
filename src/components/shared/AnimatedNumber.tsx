import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type AnimatedNumberProps = { value: number; suffix?: string };

export function AnimatedNumber({ value, suffix = "" }: AnimatedNumberProps) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(value);
      return;
    }
    const start = performance.now();
    const duration = 950;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value]);

  return (
    <>
      <span className="animated-number__value">{current.toLocaleString("en-IN")}</span>
      {suffix && <span className="animated-number__suffix">{suffix.trim()}</span>}
    </>
  );
}
