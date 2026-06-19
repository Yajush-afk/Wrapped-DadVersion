import type { MemoryStar } from "../../types";

const ambientStars = Array.from({ length: 58 }, (_, index) => ({
  x: (index * 47 + 13) % 100,
  y: (index * 31 + 7) % 86,
  size: 1 + (index % 3),
  delay: (index % 9) * 0.22,
}));

type StarFieldProps = {
  memories: MemoryStar[];
  viewed: Set<string>;
  onSelect: (index: number) => void;
};

export function StarField({ memories, viewed, onSelect }: StarFieldProps) {
  const points = memories.map((memory) => `${memory.position.x},${memory.position.y}`).join(" ");

  return (
    <div className="star-field">
      <div className="ambient-stars" aria-hidden="true">
        {ambientStars.map((star, index) => (
          <span key={index} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: `${star.delay}s` }} />
        ))}
      </div>
      <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} />
      </svg>
      {memories.map((memory, index) => (
        <button
          key={memory.id}
          className={`memory-star ${viewed.has(memory.id) ? "is-viewed" : ""}`}
          style={{ left: `${memory.position.x}%`, top: `${memory.position.y}%` }}
          onClick={() => onSelect(index)}
          aria-label={`Open memory ${index + 1}: ${memory.title}${viewed.has(memory.id) ? ", viewed" : ""}`}
        >
          <span className="memory-star__core" aria-hidden="true" />
          <span className="memory-star__number">{index + 1}</span>
        </button>
      ))}
    </div>
  );
}
