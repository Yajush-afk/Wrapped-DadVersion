import type { WrappedCard as WrappedCardType } from "../../types";
import { AnimatedNumber } from "../shared/AnimatedNumber";
import { DecorativeShapes } from "../shared/DecorativeShapes";
import { SafeImage } from "../shared/SafeImage";

export function WrappedCard({ card, index }: { card: WrappedCardType; index: number }) {
  const renderMedia = () => {
    if (card.images) {
      return (
        <div className="photo-stack">
          {card.images.map((image, imageIndex) => (
            <SafeImage key={image} src={image} alt={`Dad Wrapped memory ${imageIndex + 1}`} label={`PHOTO ${imageIndex + 1}`} />
          ))}
        </div>
      );
    }
    if (card.image) return <SafeImage src={card.image} alt="Dad and family" eager={index === 0} />;
    return null;
  };

  const media = renderMedia();

  return (
    <article className={`wrapped-card wrapped-card--${card.type} theme-${card.theme}`}>
      <DecorativeShapes variant={index} />
      <div className="wrapped-card__inner">
        <div className="wrapped-card__copy">
          {card.eyebrow && <p className="eyebrow">{card.eyebrow}</p>}
          {card.value !== undefined && (
            <p className="mega-stat" aria-label={`${card.value}${card.suffix ?? ""}`}>
              <AnimatedNumber value={card.value} suffix={card.suffix} />
            </p>
          )}
          {card.quote && <blockquote className="mega-quote">“{card.quote}”</blockquote>}
          <h1>{card.title}</h1>
          {card.caption && <p className="wrapped-card__caption">{card.caption}</p>}
        </div>
        {media && <div className="wrapped-card__media">{media}</div>}
      </div>
      <span className="card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    </article>
  );
}
