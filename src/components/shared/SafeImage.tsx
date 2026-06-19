import { useEffect, useState } from "react";

type SafeImageProps = {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
  label?: string;
};

export function SafeImage({ src, alt, className = "", eager = false, label = "YOUR PHOTO" }: SafeImageProps) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => setFailed(!src), [src]);

  if (failed || !src) {
    return (
      <div className={`safe-image safe-image--fallback ${className}`} role="img" aria-label={`${alt}. Photo placeholder.`}>
        <span className="safe-image__sun" aria-hidden="true" />
        <span className="safe-image__label">{label}</span>
      </div>
    );
  }

  return (
    <img
      className={`safe-image ${className}`}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
