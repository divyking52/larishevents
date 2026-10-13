import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { PETAL_DATA_URIS, BOUQUET_DATA_URIS } from './EngravedOrnaments';

function buildParticles(density, minSpacing) {
  const placed = [];
  return Array.from({ length: density }, (_, id) => {
    let pos = { left: 5 + Math.random() * 90, top: 6 + Math.random() * 84 };
    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = { left: 5 + Math.random() * 90, top: 6 + Math.random() * 84 };
      const ok = placed.every((p) => Math.abs(p.left - candidate.left) >= minSpacing);
      pos = candidate;
      if (ok) break;
    }
    placed.push(pos);
    return {
      id,
      assetIndex: id % PETAL_DATA_URIS.length,
      left: pos.left,
      top: pos.top,
      delayOffset: id / density + Math.random() / density,
      scale: 0.72 + Math.random() * 0.62,
      rotate: -180 + Math.random() * 360,
      waveBias: -1 + Math.random() * 2,
      wobble: 0.78 + Math.random() * 0.56,
      dir: Math.random() > 0.5 ? 1 : -1,
      opacityBump: 0.68 + Math.random() * 0.32,
    };
  });
}

export function FallingPetals({ opacityMotionValue }) {
  const density = 7;
  const duration = 10;
  const landingHold = 1;
  const interval = 1;
  const size = 100;
  const sizeVariation = 20;
  const waveAmount = 50;
  const catchFlightTime = 1;

  const particles = useMemo(() => buildParticles(density, 15), []);
  const [caughtMap, setCaughtMap] = useState({});
  const [cycleMap, setCycleMap] = useState({});
  const caughtSetRef = useRef(new Set());

  const totalCycle = duration + landingHold + 0.8;
  const ke = (duration / totalCycle) * 100;
  const Ae = ((duration + landingHold) / totalCycle) * 100;
  const je = ke * 0.2;
  const Me = ke * 0.4;
  const Ne = ke * 0.6;
  const Pe = ke * 0.8;

  const handleCatch = useCallback((id) => {
    if (caughtSetRef.current.has(id)) return;
    caughtSetRef.current.add(id);
    setCaughtMap((prev) => ({ ...prev, [id]: true }));
  }, []);

  const handleRespawn = useCallback((id) => {
    caughtSetRef.current.delete(id);
    setCaughtMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setCycleMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  return (
    <motion.div
      className="falling-petals-layer"
      style={{
        opacity: opacityMotionValue,
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes weddingFlowerFall {
          0% {
            transform: translate3d(var(--from-x), var(--from-y), 0) scale(var(--scale));
            opacity: 0;
          }
          ${je.toFixed(2)}% {
            transform: translate3d(var(--x1), var(--y1), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          ${Me.toFixed(2)}% {
            transform: translate3d(var(--x2), var(--y2), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          ${Ne.toFixed(2)}% {
            transform: translate3d(var(--x3), var(--y3), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          ${Pe.toFixed(2)}% {
            transform: translate3d(var(--x4), var(--y4), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          ${ke.toFixed(2)}% {
            transform: translate3d(var(--to-x), var(--land-y), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          ${Ae.toFixed(2)}% {
            transform: translate3d(var(--to-x), var(--land-y), 0) scale(var(--scale));
            opacity: var(--flower-opacity);
          }
          100% {
            transform: translate3d(var(--to-x), var(--land-y), 0) scale(var(--scale));
            opacity: 0;
          }
        }
        @keyframes weddingFlowerRotate {
          0% { transform: rotate(var(--start-rot)); }
          100% { transform: rotate(var(--rotEnd)); }
        }
        @keyframes weddingFlowerCaughtRise {
          0% {
            transform: translate3d(0, 0, 0) scale(1.08);
            opacity: 1;
          }
          62% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, var(--caught-rise), 0) scale(0.92);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => {
        const isCaught = !!caughtMap[p.id];
        const cycle = cycleMap[p.id] || 0;
        const pxSize = Math.max(8, size + (p.scale - 1) * sizeVariation);
        const w = waveAmount * p.wobble;
        const s = p.waveBias >= 0 ? 1 : -1;
        const startRot = p.rotate * 0.18;
        const rotEnd = startRot + 360 * p.dir;
        const delaySec = p.delayOffset * interval * density;
        const imgSrc = isCaught
          ? BOUQUET_DATA_URIS[0]
          : PETAL_DATA_URIS[p.assetIndex % PETAL_DATA_URIS.length];

        return (
          <div
            key={`${p.id}-${cycle}`}
            role="button"
            tabIndex={isCaught ? -1 : 0}
            aria-label="Catch bouquet"
            onClick={(e) => {
              e.stopPropagation();
              handleCatch(p.id);
            }}
            onKeyDown={(e) => {
              if (!isCaught && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleCatch(p.id);
              }
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: pxSize,
              height: pxSize,
              pointerEvents: isCaught ? 'none' : 'auto',
              cursor: 'pointer',
              '--from-x': `${p.left.toFixed(2)}vw`,
              '--from-y': '-18vh',
              '--to-x': `calc(${p.left.toFixed(2)}vw + ${(w * 0.14 * s).toFixed(1)}px)`,
              '--land-y': `calc(100vh - ${Math.round(pxSize)}px)`,
              '--x1': `calc(${p.left.toFixed(2)}vw + ${(w * 0.42 * s).toFixed(1)}px)`,
              '--x2': `calc(${p.left.toFixed(2)}vw + ${(-w * 0.28 * s).toFixed(1)}px)`,
              '--x3': `calc(${p.left.toFixed(2)}vw + ${(w * 0.34 * s).toFixed(1)}px)`,
              '--x4': `calc(${p.left.toFixed(2)}vw + ${(-w * 0.18 * s).toFixed(1)}px)`,
              '--y1': '10vh',
              '--y2': '38vh',
              '--y3': '66vh',
              '--y4': '94vh',
              '--scale': p.scale,
              '--start-rot': `${startRot.toFixed(1)}deg`,
              '--rotEnd': `${rotEnd.toFixed(1)}deg`,
              '--flower-opacity': p.opacityBump,
              '--caught-rise': '-13.6vh',
              animation: `weddingFlowerFall ${totalCycle}s linear ${delaySec.toFixed(2)}s infinite both`,
              animationPlayState: isCaught ? 'paused' : 'running',
            }}
          >
            <div
              onAnimationEnd={() => {
                if (isCaught) handleRespawn(p.id);
              }}
              style={{
                width: '100%',
                height: '100%',
                animation: isCaught
                  ? `weddingFlowerCaughtRise ${catchFlightTime}s cubic-bezier(.2,.72,.22,1) forwards`
                  : 'none',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  animation: `weddingFlowerRotate ${totalCycle}s linear ${delaySec.toFixed(2)}s infinite both`,
                  animationPlayState: isCaught ? 'paused' : 'running',
                }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  draggable={false}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    userSelect: 'none',
                    filter: isCaught
                      ? 'drop-shadow(0 4px 10px rgba(45, 41, 38, 0.25))'
                      : 'drop-shadow(0 2px 5px rgba(45, 41, 38, 0.12))',
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
