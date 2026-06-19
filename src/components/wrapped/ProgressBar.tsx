export function ProgressBar({ total, current }: { total: number; current: number }) {
  return (
    <div className="progress" aria-label={`Card ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <span key={index} className={`progress__segment ${index <= current ? "is-filled" : ""}`} />
      ))}
    </div>
  );
}
