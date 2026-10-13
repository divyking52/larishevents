import React from 'react';

/**
 * Custom-authored vintage botanical engraving illustrations in warm sepia/taupe (#8a7d72 / #978a80)
 * matching the exact proportions, hatching aesthetic, and layout geometry of the reference template.
 */

export function CornerOrnament({ position = 'tr', className = '' }) {
  const transforms = {
    tr: 'none',
    tl: 'scaleX(-1)',
    br: 'scaleY(-1)',
    bl: 'scale(-1, -1)',
  };

  return (
    <svg
      viewBox="0 0 500 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`corner-ornament corner-${position} ${className}`}
      style={{ transform: transforms[position] }}
      aria-hidden="true"
    >
      <g stroke="#8a7d72" strokeLinecap="round" strokeLinejoin="round">
        {/* Main sweeping corner stem from top-left curl to bottom-right curl */}
        <path
          d="M 24 48 C 20 68, 65 72, 95 45 C 125 18, 175 16, 235 48 C 305 85, 385 165, 435 265 C 475 345, 482 415, 455 432 C 430 448, 412 425, 424 405"
          strokeWidth="2.4"
        />
        <path
          d="M 94 46 C 88 66, 106 82, 120 72 C 132 63, 126 48, 114 50"
          strokeWidth="1.8"
        />
        <path
          d="M 442 280 C 420 260, 392 275, 396 305 C 400 330, 422 332, 420 315"
          strokeWidth="1.7"
        />
        <path
          d="M 465 360 C 476 418, 455 468, 462 492 C 466 504, 476 502, 480 496"
          strokeWidth="1.4"
        />

        {/* Secondary inner tendril */}
        <path
          d="M 182 62 C 192 48, 224 58, 265 92 C 305 125, 338 162, 368 202"
          strokeWidth="1.2"
        />
        <path
          d="M 310 132 C 272 100, 232 98, 230 124 C 228 142, 242 144, 246 138"
          strokeWidth="1.5"
        />

        {/* Upper arched leaf near flower */}
        <path
          d="M 378 175 C 345 128, 326 84, 344 64 C 352 56, 360 62, 354 70 C 338 92, 355 132, 384 176"
          fill="#f9f7f4"
          strokeWidth="1.5"
        />
        <path d="M 346 72 C 344 102, 358 136, 378 168" strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Left-sweeping serrated botanical leaf 1 */}
        <path
          d="M 380 202 C 345 170, 298 158, 265 186 C 282 180, 298 184, 315 182 C 308 190, 306 196, 316 196 C 335 190, 358 192, 382 204 Z"
          fill="#fcfaf7"
          strokeWidth="1.5"
        />
        <path d="M 275 182 C 310 176, 345 184, 378 200" strokeWidth="1" />
        <path d="M 302 178 L 292 170 M 322 180 L 312 169 M 342 185 L 332 173" strokeWidth="0.8" />

        {/* Left-sweeping botanical leaf 2 */}
        <path
          d="M 432 272 C 402 232, 356 218, 326 244 C 346 242, 364 244, 376 246 C 365 254, 362 264, 366 268 C 384 256, 408 258, 434 274 Z"
          fill="#fcfaf7"
          strokeWidth="1.5"
        />
        <path d="M 336 240 C 368 236, 402 248, 430 270" strokeWidth="1" />
        <path d="M 358 238 L 348 229 M 378 242 L 368 231 M 398 250 L 388 238" strokeWidth="0.8" />

        {/* Engraved open blossom at top-right */}
        <path d="M 405 198 C 394 166, 398 136, 412 115" strokeWidth="1.6" />
        <g transform="translate(402, 56)">
          {/* Outer petals */}
          <path
            d="M 10 58 C -4 38, 2 12, 16 2 C 24 8, 26 22, 24 38"
            fill="#fdfcfa"
            strokeWidth="1.4"
          />
          <path
            d="M 16 58 C 16 32, 28 8, 46 2 C 52 12, 48 28, 38 44"
            fill="#fdfcfa"
            strokeWidth="1.4"
          />
          <path
            d="M 18 60 C 26 36, 46 16, 62 18 C 64 32, 54 48, 34 58"
            fill="#fdfcfa"
            strokeWidth="1.4"
          />
          <path
            d="M 22 60 C 40 52, 58 46, 68 54 C 60 66, 40 68, 20 62"
            fill="#fdfcfa"
            strokeWidth="1.3"
          />
          {/* Fine shading lines inside blossom */}
          <path
            d="M 14 52 C 10 38, 12 24, 16 14 M 22 54 C 26 38, 34 22, 42 12 M 26 56 C 36 44, 46 34, 54 26"
            strokeWidth="0.7"
            opacity="0.75"
          />
          {/* Calyx base */}
          <path d="M 8 56 C 12 64, 22 66, 28 58" fill="#8a7d72" fillOpacity="0.25" strokeWidth="1.3" />
        </g>

        {/* Small leaf bud Twig on right */}
        <path d="M 390 175 C 378 152, 376 132, 378 118" strokeWidth="1.3" />
        <path
          d="M 378 132 C 368 122, 370 106, 380 96 C 386 108, 386 122, 378 132 Z"
          fill="#fcfaf7"
          strokeWidth="1.3"
        />
        <path d="M 452 256 C 458 222, 462 192, 454 162" strokeWidth="1.2" />
        <path
          d="M 454 176 C 444 166, 444 152, 450 142 C 458 152, 460 166, 454 176 Z"
          fill="#fcfaf7"
          strokeWidth="1.2"
        />
        <path
          d="M 458 202 C 464 194, 472 190, 476 196 C 472 204, 464 206, 458 202 Z"
          fill="#fcfaf7"
          strokeWidth="1.1"
        />
        <path
          d="M 456 226 C 462 218, 470 214, 474 220 C 470 228, 462 230, 456 226 Z"
          fill="#fcfaf7"
          strokeWidth="1.1"
        />

        {/* Stippled engraving dots */}
        <circle cx="67" cy="70" r="2.2" fill="#8a7d72" />
        <circle cx="77" cy="65" r="1.8" fill="#8a7d72" />
        <circle cx="81" cy="76" r="3.5" fill="#8a7d72" />
        <circle cx="176" cy="42" r="2.5" stroke="#8a7d72" strokeWidth="1.2" fill="none" />
        <circle cx="192" cy="44" r="1.8" fill="#8a7d72" />
        <circle cx="202" cy="47" r="1.4" fill="#8a7d72" />
        <circle cx="442" cy="452" r="3.4" fill="#8a7d72" />
        <circle cx="442" cy="468" r="3.2" fill="#8a7d72" />
      </g>
    </svg>
  );
}

export function SectionDivider({ className = '' }) {
  return (
    <div className={`divider-ornament-wrap ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 870 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <g stroke="#8a7d72" strokeLinecap="round" strokeLinejoin="round">
          {/* Left symmetrical vine */}
          <path
            d="M 18 52 C 8 52, 6 36, 22 28 C 46 18, 86 34, 134 56 C 186 78, 242 74, 298 58 C 344 45, 376 42, 405 50"
            strokeWidth="2.4"
          />
          {/* Left bud branch */}
          <path d="M 278 62 C 248 62, 224 48, 212 34" strokeWidth="1.8" />
          <path
            d="M 212 36 C 198 36, 188 26, 186 14 C 198 16, 210 22, 212 36 Z"
            fill="#faf8f5"
            strokeWidth="1.5"
          />
          <path d="M 192 18 C 198 22, 204 28, 210 34" strokeWidth="0.9" />
          {/* Left upper leaf */}
          <path
            d="M 318 52 C 304 38, 286 24, 264 26 C 276 38, 294 48, 318 52 Z"
            fill="#faf8f5"
            strokeWidth="1.4"
          />
          <path d="M 272 28 C 288 34, 302 42, 314 50" strokeWidth="0.9" />
          {/* Left lower leaf */}
          <path
            d="M 332 50 C 318 60, 302 76, 292 88 C 308 82, 322 68, 332 50 Z"
            fill="#faf8f5"
            strokeWidth="1.4"
          />

          {/* Right symmetrical vine (mirrored) */}
          <g transform="translate(870, 0) scale(-1, 1)">
            <path
              d="M 18 52 C 8 52, 6 36, 22 28 C 46 18, 86 34, 134 56 C 186 78, 242 74, 298 58 C 344 45, 376 42, 405 50"
              strokeWidth="2.4"
            />
            <path d="M 278 62 C 248 62, 224 48, 212 34" strokeWidth="1.8" />
            <path
              d="M 212 36 C 198 36, 188 26, 186 14 C 198 16, 210 22, 212 36 Z"
              fill="#faf8f5"
              strokeWidth="1.5"
            />
            <path d="M 192 18 C 198 22, 204 28, 210 34" strokeWidth="0.9" />
            <path
              d="M 318 52 C 304 38, 286 24, 264 26 C 276 38, 294 48, 318 52 Z"
              fill="#faf8f5"
              strokeWidth="1.4"
            />
            <path d="M 272 28 C 288 34, 302 42, 314 50" strokeWidth="0.9" />
            <path
              d="M 332 50 C 318 60, 302 76, 292 88 C 308 82, 322 68, 332 50 Z"
              fill="#faf8f5"
              strokeWidth="1.4"
            />
          </g>

          {/* Center 5-petal wild rose engraving */}
          <g transform="translate(435, 48)">
            {[0, 72, 144, 216, 288].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  d="M 0 -6 C -14 -18, -18 -36, 0 -42 C 18 -36, 14 -18, 0 -6 Z"
                  fill="#faf8f5"
                  stroke="#8a7d72"
                  strokeWidth="1.5"
                />
                <path
                  d="M 0 -10 L 0 -32 M -5 -12 L -9 -28 M 5 -12 L 9 -28"
                  stroke="#8a7d72"
                  strokeWidth="0.7"
                  opacity="0.65"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="8" fill="#d8d0c8" stroke="#8a7d72" strokeWidth="1.4" />
            <circle cx="0" cy="0" r="3.5" fill="#8a7d72" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <circle
                key={deg}
                cx={Math.cos((deg * Math.PI) / 180) * 11}
                cy={Math.sin((deg * Math.PI) / 180) * 11}
                r="1.1"
                fill="#8a7d72"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export function LogoOrnament() {
  return (
    <div className="nav-logo-ornament" aria-hidden="true">
      <svg
        viewBox="0 0 692 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <g stroke="#8a7d72" strokeLinecap="round" strokeLinejoin="round">
          {/* Left scroll wing */}
          <path
            d="M 14 48 C 48 68, 114 64, 168 28 C 206 4, 254 4, 298 38"
            strokeWidth="3.2"
          />
          <path
            d="M 168 28 C 154 52, 166 84, 194 84 C 216 84, 226 62, 212 48 C 204 42, 196 46, 198 52"
            strokeWidth="2.6"
          />
          <circle cx="14" cy="48" r="4.5" fill="#8a7d72" />

          {/* Right scroll wing (mirrored) */}
          <g transform="translate(692, 0) scale(-1, 1)">
            <path
              d="M 14 48 C 48 68, 114 64, 168 28 C 206 4, 254 4, 298 38"
              strokeWidth="3.2"
            />
            <path
              d="M 168 28 C 154 52, 166 84, 194 84 C 216 84, 226 62, 212 48 C 204 42, 196 46, 198 52"
              strokeWidth="2.6"
            />
            <circle cx="14" cy="48" r="4.5" fill="#8a7d72" />
          </g>

          {/* Central 4-petal rosette */}
          <g transform="translate(346, 50)">
            {[0, 90, 180, 270].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path
                  d="M 0 -7 C -12 -18, -12 -34, 0 -45 C 12 -34, 12 -18, 0 -7 Z"
                  fill="#faf8f5"
                  stroke="#8a7d72"
                  strokeWidth="2.2"
                />
                <path d="M 0 -12 L 0 -36 M -4 -16 L -5 -30 M 4 -16 L 5 -30" strokeWidth="1" opacity="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="6" fill="#faf8f5" stroke="#8a7d72" strokeWidth="2.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function DateCartoucheSegment({ style }) {
  return (
    <svg
      viewBox="0 0 140 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '42px', height: 'auto', position: 'absolute', ...style }}
      aria-hidden="true"
    >
      <path
        d="M 12 16 C 4 16, 2 6, 14 4 C 32 2, 52 20, 70 20 C 88 20, 108 2, 126 4 C 138 6, 136 16, 128 16 C 122 16, 122 10, 126 10"
        stroke="#8a7d72"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaperTextureBg() {
  return (
    <div className="hero-paper-bg" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="larish-paper-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              seed="12"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#f4f1ed"
              surfaceScale="1.6"
              result="lit"
            >
              <feDistantLight azimuth="45" elevation="62" />
            </feDiffuseLighting>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="#f4f1ed" filter="url(#larish-paper-grain)" opacity="0.65" />
      </svg>
    </div>
  );
}

/**
 * Data-URI SVG Botanical Petals & Caught Bouquets for the interactive FallingPetals component (Pd)
 */
export const PETAL_DATA_URIS = [
  // Petal 1: Organic sculpted cream-ivory rose petal with soft sepia edge shading
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="p1" cx="42%" cy="38%" r="58%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="55%" stop-color="#f8f4ef"/>
          <stop offset="85%" stop-color="#ebe3da"/>
          <stop offset="100%" stop-color="#d5c7b8"/>
        </radialGradient>
        <linearGradient id="p1fold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e5dcd2"/>
          <stop offset="100%" stop-color="#cbbba9"/>
        </linearGradient>
      </defs>
      <path d="M32 88 C24 64, 34 28, 60 22 C82 17, 98 36, 90 60 C83 80, 62 96, 40 94 C35 93, 33 91, 32 88 Z" fill="url(#p1)" stroke="#cbbba9" stroke-width="0.8"/>
      <path d="M35 88 C45 68, 56 46, 63 26 M37 86 C54 70, 70 54, 82 38 M36 87 C40 66, 44 46, 48 32" stroke="#d5c7b8" stroke-width="0.6" opacity="0.65"/>
      <path d="M90 60 C79 62, 71 73, 64 85 C76 79, 85 70, 90 60 Z" fill="url(#p1fold)" opacity="0.85"/>
    </svg>
  `)}`,
  // Petal 2: Soft ruffled white-alabaster peony petal
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="p2" cx="48%" cy="42%" r="55%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#f9f6f1"/>
          <stop offset="90%" stop-color="#e8dfd5"/>
          <stop offset="100%" stop-color="#d1c2b2"/>
        </radialGradient>
      </defs>
      <path d="M42 92 C24 72, 26 38, 48 26 C58 20, 66 24, 74 22 C88 19, 96 36, 88 60 C80 82, 58 96, 42 92 Z" fill="url(#p2)" stroke="#cbbba9" stroke-width="0.8"/>
      <path d="M44 89 C46 66, 54 44, 60 28 M45 89 C58 72, 71 54, 78 38 M43 88 C36 68, 38 48, 46 34" stroke="#d5c7b8" stroke-width="0.6" opacity="0.6"/>
    </svg>
  `)}`,
  // Petal 3: Cupped ivory garden-rose petal
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
      <defs>
        <radialGradient id="p3" cx="50%" cy="45%" r="52%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="58%" stop-color="#f6f2ec"/>
          <stop offset="88%" stop-color="#e5dcd2"/>
          <stop offset="100%" stop-color="#cebfb0"/>
        </radialGradient>
      </defs>
      <path d="M48 94 C32 70, 34 36, 58 22 C82 34, 86 68, 68 94 C61 97, 54 97, 48 94 Z" fill="url(#p3)" stroke="#cbbba9" stroke-width="0.8"/>
      <path d="M58 92 L58 26 M56 88 C47 68, 47 48, 52 33 M60 88 C69 68, 69 48, 64 33" stroke="#d5c7b8" stroke-width="0.6" opacity="0.6"/>
    </svg>
  `)}`,
];

export const BOUQUET_DATA_URIS = [
  // Caught Bouquet 1: Fine engraved botanical rose blossom sprig
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
      <g stroke="#8a7d72" stroke-linecap="round" stroke-linejoin="round">
        <path d="M60 102 C58 82, 60 62, 60 44 M60 78 C50 70, 42 62, 38 54 M60 72 C70 64, 78 56, 82 48" stroke-width="1.6"/>
        <path d="M44 68 C34 66, 28 58, 32 50 C40 52, 46 60, 44 68 Z" fill="#f7f4ef" stroke-width="1.2"/>
        <path d="M76 62 C86 60, 92 52, 88 44 C80 46, 74 54, 76 62 Z" fill="#f7f4ef" stroke-width="1.2"/>
        <circle cx="60" cy="40" r="15" fill="#faf8f5" stroke-width="1.4"/>
        <path d="M50 38 C54 28, 66 28, 70 38 C66 48, 54 48, 50 38 Z" fill="#f4efe9" stroke-width="1.1"/>
        <circle cx="60" cy="40" r="4" fill="#8a7d72"/>
      </g>
    </svg>
  `)}`,
];
