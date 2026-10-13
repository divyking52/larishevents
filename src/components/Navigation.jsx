import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LogoOrnament } from './EngravedOrnaments';

const EDITORIAL_EASE = [0.44, 0, 0.56, 1];

export function Navigation({ onNavigate }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpened, setMobileOpened] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth <= 809.98;
      setIsMobile(mobile);
      if (!mobile) setMobileOpened(false);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY <= 30) {
        setScrollingDown(false);
      } else if (delta > 3) {
        setScrollingDown(true);
      } else if (delta < -3) {
        setScrollingDown(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    if (mobileOpened) setMobileOpened(false);
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav-fixed-wrapper">
      <motion.nav
        className={`nav-container ${mobileOpened ? 'mobile-opened' : ''}`}
        aria-label="Primary Navigation"
        layout
        transition={{ duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
      >
        {/* Radial Gradient Backdrop (framer-150fnav) */}
        <motion.div
          className="nav-gradient-backdrop"
          animate={
            !isMobile && scrollingDown
              ? { rotateY: 80, opacity: 1 }
              : { rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
        />

        {/* Desktop/Tablet Left Links OR Mobile Opened Left Links */}
        {(!isMobile || mobileOpened) && (
          <motion.div
            className="nav-side-left"
            initial={{ opacity: 0.001, y: -10 }}
            animate={
              !isMobile && scrollingDown
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: isMobile ? 0.45 : scrollingDown ? 1 : 2,
              ease: EDITORIAL_EASE,
              type: 'tween',
            }}
            style={{ order: isMobile ? 2 : 0 }}
          >
            <p className={mobileOpened ? 'preset-eyebrow' : 'preset-label'}>
              <a
                href="#story"
                className="preset-link"
                onClick={(e) => handleLinkClick(e, '#story')}
              >
                our ethos
              </a>
            </p>
            <p className={mobileOpened ? 'preset-eyebrow' : 'preset-label'}>
              <a
                href="#ceremony"
                className="preset-link"
                onClick={(e) => handleLinkClick(e, '#ceremony')}
              >
                productions
              </a>
            </p>
          </motion.div>
        )}

        {/* Center Monogram Logo Wrap (framer-1bny3h0) */}
        <div className="nav-logo-wrap" style={{ order: 1 }}>
          {isMobile && (
            <button
              type="button"
              className="nav-mobile-trigger preset-label"
              onClick={() => setMobileOpened((prev) => !prev)}
              aria-expanded={mobileOpened}
            >
              {mobileOpened ? 'close' : 'menu'}
            </button>
          )}

          <motion.a
            href="#top"
            className="nav-logo-link"
            onClick={(e) => handleLinkClick(e, '#top')}
            initial={{ opacity: 0.001, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
            aria-label="Larish Events Home"
          >
            <LogoOrnament />
            <div className="letters-monogram">
              <h3 className="preset-h3 letter-left">L</h3>
              <p className="preset-eyebrow letter-amp">&amp;</p>
              <h3 className="preset-h3 letter-right">E</h3>
            </div>
          </motion.a>

          {isMobile && (
            <p className="nav-mobile-rsvp preset-label">
              <a
                href="#rsvp"
                className="preset-link"
                onClick={(e) => handleLinkClick(e, '#rsvp')}
              >
                inquire
              </a>
            </p>
          )}
        </div>

        {/* Desktop/Tablet Right Links OR Mobile Opened Right Links */}
        {(!isMobile || mobileOpened) && (
          <motion.div
            className="nav-side-right"
            initial={{ opacity: 0.001, y: -10 }}
            animate={
              !isMobile && scrollingDown
                ? { opacity: 0, y: -10 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: isMobile ? 0.45 : scrollingDown ? 1 : 2,
              ease: EDITORIAL_EASE,
              type: 'tween',
            }}
            style={{ order: isMobile ? 3 : 2 }}
          >
            <p className={mobileOpened ? 'preset-eyebrow' : 'preset-label'}>
              <a
                href="#schedule"
                className="preset-link"
                onClick={(e) => handleLinkClick(e, '#schedule')}
              >
                curation
              </a>
            </p>
            <p className={mobileOpened ? 'preset-eyebrow' : 'preset-label'}>
              <a
                href="#faq"
                className="preset-link"
                onClick={(e) => handleLinkClick(e, '#faq')}
              >
                questions
              </a>
            </p>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}
