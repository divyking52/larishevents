import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const EDITORIAL_EASE = [0.44, 0, 0.56, 1];

/**
 * Character-by-character blur & y-offset reveal matching Framer's Text Effect:
 * filter: blur(10px), opacity: 0.001, y: 10 -> filter: blur(0px), opacity: 1, y: 0
 * duration: 2s, ease: [0.44, 0, 0.56, 1]
 */
export function CharacterBlurReveal({
  text,
  tag = 'h2',
  className = 'preset-h2',
  startDelay = 0,
  trigger = 'onMount',
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const shouldAnimate = trigger === 'onMount' ? true : isInView;
  const Tag = motion[tag] || motion.h2;
  const chars = Array.from(text);

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={text}
      style={{ ...style, display: 'block' }}
    >
      {chars.map((ch, idx) => (
        <motion.span
          key={idx}
          aria-hidden="true"
          initial={{ filter: 'blur(10px)', opacity: 0.001, y: 10 }}
          animate={
            shouldAnimate
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0.001, y: 10 }
          }
          transition={{
            delay: startDelay + 0.1 + idx * 0.055,
            duration: 2,
            ease: EDITORIAL_EASE,
            type: 'tween',
          }}
          style={{
            display: 'inline-block',
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
            willChange: 'transform, opacity, filter',
          }}
        >
          {ch}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * Line-by-line blur & y-offset reveal on scroll into view (Framer Ff preset):
 * threshold: 0.5, repeat: false, delay: 0.1s, duration: 1s, ease: [0.44, 0, 0.56, 1]
 */
export function LineBlurReveal({
  lines,
  tag = 'h2',
  className = 'preset-h2 section-max-800',
  id,
  innerRef,
}) {
  const localRef = useRef(null);
  const ref = innerRef || localRef;
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Tag = tag;
  const lineArray = Array.isArray(lines) ? lines : [lines];

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      aria-label={lineArray.join(' ')}
    >
      {lineArray.map((line, idx) => (
        <motion.span
          key={idx}
          aria-hidden="true"
          initial={{ filter: 'blur(10px)', opacity: 0.001, y: 10 }}
          animate={
            isInView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0.001, y: 10 }
          }
          transition={{
            delay: 0.1 + idx * 0.12,
            duration: 1,
            ease: EDITORIAL_EASE,
            type: 'tween',
          }}
          style={{
            display: 'block',
            willChange: 'transform, opacity, filter',
          }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * Animated Number Counter matching Framer University Wl component:
 * Counts from start (0) to end (24) over duration: 2s, ease: [0.44, 0, 0.56, 1]
 */
export function AnimatedCounter({ start = 0, end = 24, duration = 2 }) {
  const [val, setVal] = useState(start);

  useEffect(() => {
    const controls = animate(start, end, {
      duration,
      ease: EDITORIAL_EASE,
      onUpdate: (latest) => {
        setVal(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [start, end, duration]);

  return (
    <motion.div
      className="hero-date-counter"
      initial={{ opacity: 0.001, scale: 0.7, x: '-50%', y: '-50%' }}
      animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
      transition={{ delay: 0, duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
    >
      {val}
    </motion.div>
  );
}
