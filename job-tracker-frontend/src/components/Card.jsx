import React, { useState } from 'react';

const Card = ({
  header,
  body,
  footer,
  children,
  imageSrc,
  imageAlt = '',
  className = '',
  headerClass = '',
  bodyClass = '',
  footerClass = '',
  imageClass = '',
  interactive = false,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseShadow = '4px 4px 0 var(--color-arcade-shadow)';
  const pressedShadow = 'inset 4px 4px 0 var(--color-arcade-shadow)';
  const hoverShadow = '0 0 10px 2px var(--color-arcade-neonGreen)';

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onMouseDown={() => interactive && setIsPressed(true)}
      onMouseUp={() => interactive && setIsPressed(false)}
      onMouseLeave={(e) => {
        if (interactive) {
          setIsPressed(false);
          e.currentTarget.style.boxShadow = baseShadow;
        }
      }}
      onMouseEnter={(e) => {
        if (interactive && !isPressed) {
          e.currentTarget.style.boxShadow = `${baseShadow}, ${hoverShadow}`;
        }
      }}
      onKeyDown={(e) => {
        if (!interactive) return;
        if (e.key === 'Enter' || e.key === ' ') setIsPressed(true);
      }}
      onKeyUp={(e) => {
        if (!interactive) return;
        if (e.key === 'Enter' || e.key === ' ') setIsPressed(false);
      }}
      className={`bg-[var(--color-discord-background)] rounded-lg p-4 max-w-md mx-auto font-pixel text-[var(--color-discord-text)] cursor-${interactive ? 'pointer' : 'default'} ${className}`}
      style={{
        outline: 'none',
        userSelect: interactive ? 'none' : 'auto',
        boxShadow: isPressed ? pressedShadow : baseShadow,
        transition: 'box-shadow 0.15s ease-in-out',
      }}
      onKeyPress={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full mb-4 rounded-t-md border-2 border-[var(--color-discord-primary)] ${imageClass}`}
          style={{ imageRendering: 'pixelated' }}
        />
      )}

      {header && (
        <div
          className={`mb-3 text-lg font-bold text-[var(--color-discord-primary)] ${headerClass}`}
          style={{
            textShadow: '2px 2px var(--color-arcade-shadow)',
          }}
        >
          {header}
        </div>
      )}

      {(children || body) && (
        <div
          className={`mb-4 text-sm text-[var(--color-discord-text)] ${bodyClass}`}
          style={{ lineHeight: 1.3 }}
        >
          {children || body}
        </div>
      )}

      {footer && (
        <div
          className={`pt-2 border-t-2 border-[var(--color-discord-primary)] text-xs text-[var(--color-discord-accent)] ${footerClass}`}
          style={{
            textShadow: '1px 1px var(--color-arcade-shadow)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
