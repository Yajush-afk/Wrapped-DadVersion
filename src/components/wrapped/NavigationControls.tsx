type NavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  isLast: boolean;
};

export function NavigationControls({ onPrevious, onNext, canPrevious, isLast }: NavigationProps) {
  return (
    <nav className="story-nav" aria-label="Story navigation">
      <button className="story-nav__button" onClick={onPrevious} disabled={!canPrevious} aria-label="Previous card">
        <span aria-hidden="true">←</span>
      </button>
      <span className="story-nav__hint">tap · swipe · arrow keys</span>
      <button className="story-nav__button story-nav__button--next" onClick={onNext} aria-label={isLast ? "Open the memory constellation" : "Next card"}>
        <span>{isLast ? "TO THE STARS" : "NEXT"}</span><span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
