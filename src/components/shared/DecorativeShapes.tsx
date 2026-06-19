export function DecorativeShapes({ variant = 0 }: { variant?: number }) {
  return (
    <div className={`shapes shapes--${variant % 4}`} aria-hidden="true">
      <span className="shape shape--ring" />
      <span className="shape shape--burst">✦</span>
      <span className="shape shape--pill" />
      <span className="shape shape--dots" />
    </div>
  );
}
