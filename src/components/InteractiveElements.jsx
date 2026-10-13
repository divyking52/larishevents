import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EDITORIAL_EASE = [0.44, 0, 0.56, 1];

export function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className={`faq-item ${isOpen ? 'opened' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
    >
      <h5 className="preset-h5 faq-question">{question}</h5>
      <motion.div
        className="faq-answer-wrap"
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 1,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
      >
        <p
          className="preset-body"
          style={{
            textAlign: 'center',
            paddingTop: isOpen ? '0px' : '0px',
          }}
        >
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function StickyBottomButton({ scaleMotionValue, opacityMotionValue, onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#rsvp');
    } else {
      const el = document.querySelector('#rsvp');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="sticky-bottom-cta-wrap"
      style={{
        scale: scaleMotionValue,
        opacity: opacityMotionValue,
      }}
    >
      <a
        href="#rsvp"
        className="sticky-rsvp-btn"
        onClick={handleClick}
        aria-label="Inquire & Reserve"
      >
        <motion.span
          className="sticky-rsvp-line"
          initial={{ opacity: 0.001, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
        />
        <motion.span
          className="preset-eyebrow"
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
          style={{ padding: '0 2px', zIndex: 3 }}
        >
          INQUIRE
        </motion.span>
        <motion.span
          className="sticky-rsvp-line"
          initial={{ opacity: 0.001, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
        />
      </a>
    </motion.div>
  );
}

export function FormSubmitButton({ status = 'default' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={status === 'loading' || status === 'success'}
      className={`form-submit-btn ${
        status === 'success'
          ? 'state-success'
          : status === 'error'
          ? 'state-error'
          : ''
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay: 0.1, duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
    >
      <motion.span
        className="form-submit-line"
        initial={{ opacity: 0.001, x: 10 }}
        animate={{ opacity: status === 'success' ? 0 : 1, x: 0 }}
        transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
      />

      {status === 'loading' ? (
        <span className="form-submit-spinner" aria-label="Submitting" />
      ) : status === 'success' ? (
        <span
          className="preset-eyebrow"
          style={{ color: 'var(--color-border)', userSelect: 'none' }}
        >
          Thank you
        </span>
      ) : status === 'error' ? (
        <span
          className="preset-label"
          style={{ color: 'rgb(255, 0, 0)', userSelect: 'none' }}
        >
          Something went wrong
        </span>
      ) : (
        <span className="preset-eyebrow" style={{ userSelect: 'none' }}>
          Submit
        </span>
      )}

      <motion.span
        className="form-submit-line"
        initial={{ opacity: 0.001, x: -10 }}
        animate={{ opacity: status === 'success' ? 0 : 1, x: 0 }}
        transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
      />
    </motion.button>
  );
}
