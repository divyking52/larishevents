import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import Lenis from 'lenis';
import {
  CornerOrnament,
  SectionDivider,
  DateCartoucheSegment,
  PaperTextureBg,
} from './components/EngravedOrnaments';
import { FallingPetals } from './components/FallingPetals';
import {
  CharacterBlurReveal,
  LineBlurReveal,
  AnimatedCounter,
} from './components/AnimatedText';
import { Navigation } from './components/Navigation';
import {
  FAQItem,
  StickyBottomButton,
  FormSubmitButton,
} from './components/InteractiveElements';

const EDITORIAL_EASE = [0.44, 0, 0.56, 1];

// Curated, verified HTTP-200 Unsplash luxury event & architectural stock imagery
const STOCK_IMAGES = {
  heroCenterpiece:
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
  story1:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
  story2:
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
  story3:
    'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85',
  story4:
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
  venueCeremony:
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85',
  venueReception:
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1400&q=85',
};

const SCHEDULE_DATA = [
  {
    phase: 'PHASE I · 01',
    title: 'Architectural Discovery',
    description:
      'An intimate consultation to distill your aesthetic vision, guest sensibility, and destination heritage into a bespoke creative blueprint.',
  },
  {
    phase: 'PHASE II · 02',
    title: 'Venue Scouting & Curation',
    description:
      'Private access to historic Italian villas, palazzos, and coastal estates, matching architectural grandeur with effortless guest flow.',
  },
  {
    phase: 'PHASE III · 03',
    title: 'Scenography & Floral Design',
    description:
      'Sculptural botanical installations, custom linenatelier commissions, and heirloom tableware curated to transform every space.',
  },
  {
    phase: 'PHASE IV · 04',
    title: 'Gastronomy & Sommelier',
    description:
      'Candlelit tasting menus crafted alongside Michelin-starred culinary teams, paired with rare vintage cellars and artisanal aperitifs.',
  },
  {
    phase: 'PHASE V · 05',
    title: 'Lighting & Acoustic Direction',
    description:
      'Warm architectural illumination, string quartets in the gardens, and bespoke soundscapes choreographed for every transition.',
  },
  {
    phase: 'PHASE VI · 06',
    title: 'Hospitality & Concierge',
    description:
      'White-glove guest logistics, private chauffeurs, yacht charters, and multi-day cultural itineraries across Milan, Rome, and Como.',
  },
  {
    phase: 'PHASE VII · 07',
    title: 'The Celebration Execution',
    description:
      'On-site orchestration by our senior production directors so you remain wholly immersed in every unforgettable moment.',
  },
];

const FAQ_DATA = [
  {
    q: 'When should we commission Larish Events?',
    a: 'We accept a limited number of twelve full-scale productions each year. We recommend inquiring 9 to 18 months prior to your desired celebration date to secure iconic historic estates.',
  },
  {
    q: 'Do you orchestrate multi-day destination celebrations?',
    a: 'Yes. Most of our productions span three to four days—encompassing welcome garden aperitivos, cultural excursions, the main ceremony and gala, and a farewell brunch.',
  },
  {
    q: 'Which destinations do you specialize in?',
    a: 'With ateliers in Rome and Milan, we specialize in Italy, the French Riviera, Lake Como, Tuscany, and private estates worldwide upon request.',
  },
  {
    q: 'How is the creative and floral direction handled?',
    a: 'Our in-house scenography studio oversees every visual touchpoint—from custom architectural structures and botanical installations to engraved stationery and lighting.',
  },
  {
    q: 'Can you accommodate private estates or non-traditional venues?',
    a: 'Absolutely. We regularly transform private residences and heritage monuments from the ground up, engineering marquee pavilions, acoustic staging, and satellite kitchens.',
  },
  {
    q: 'How do you manage weather contingencies for outdoor galas?',
    a: 'Every outdoor garden ceremony and terrace reception is designed with an equally breathtaking architectural glasshouse or salon Plan B held on standby.',
  },
  {
    q: 'Do you handle guest travel and accommodation blocks?',
    a: 'Our dedicated hospitality concierge manages luxury hotel buyouts, private aviation transfers, chauffeured fleets, and personalized guest itineraries.',
  },
  {
    q: 'How do you collaborate with photographers and filmmakers?',
    a: 'We curate and brief world-renowned editorial photographers and cinema directors so they capture the atmosphere unobtrusively while honoring privacy.',
  },
  {
    q: 'Can bespoke culinary and dietary programs be arranged?',
    a: 'Our culinary producers design tailored tasting menus accommodating kosher, plant-based, allergy-sensitive, and regional fine-dining preferences seamlessly.',
  },
  {
    q: 'What happens after we submit an inquiry below?',
    a: 'Our Senior Creative Director will respond within 48 hours to arrange a private video or in-person consultation and prepare a tailored proposal.',
  },
];

function FadeUpOnView({ children, delay = 0, duration = 1, className = '', style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ delay, duration, ease: EDITORIAL_EASE, type: 'tween' }}
    >
      {children}
    </motion.div>
  );
}

function StoryCard3D({ slotIndex, src, alt, storyProgress, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  // Exact initial 3D transforms from reference (lines 5286-5418 of formatted_components.js)
  const configs = {
    1: { rotate: -10, rotateX: 30, rotateY: -30, scale: 0.8, x: -100, y: -50 },
    2: { rotate: 10, rotateX: 30, rotateY: 30, scale: 0.8, x: 150, y: -50 },
    3: { rotate: -20, rotateX: -30, rotateY: -30, scale: 0.8, x: -150, y: 50 },
    4: { rotate: 20, rotateX: -30, rotateY: 30, scale: 0.8, x: 150, y: 50 },
  };
  const cfg = configs[slotIndex];

  const rawOpacity = useTransform(storyProgress, [0, 0.55], [0, 1]);
  const rawRotate = useTransform(storyProgress, [0, 0.55], [cfg.rotate, 0]);
  const rawRotateX = useTransform(storyProgress, [0, 0.55], [cfg.rotateX, 0]);
  const rawRotateY = useTransform(storyProgress, [0, 0.55], [cfg.rotateY, 0]);
  const rawScale = useTransform(storyProgress, [0, 0.55], [cfg.scale, 1]);
  const rawX = useTransform(storyProgress, [0, 0.55], [cfg.x, 0]);
  const rawY = useTransform(storyProgress, [0, 0.55], [cfg.y, 0]);

  const springConfig = { stiffness: 150, damping: 100, mass: 1 };
  const opacity = useSpring(rawOpacity, springConfig);
  const rotate = useSpring(rawRotate, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        className={`story-card-slot slot-${slotIndex}`}
        initial={{
          opacity: 0,
          rotate: cfg.rotate,
          rotateX: cfg.rotateX,
          rotateY: cfg.rotateY,
          scale: cfg.scale,
          x: cfg.x * 0.4,
          y: cfg.y * 0.5,
          transformPerspective: 1200,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                rotate: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                x: 0,
                y: 0,
                transformPerspective: 1200,
              }
            : undefined
        }
        transition={{ duration: 1, ease: EDITORIAL_EASE }}
      >
        <div className="story-image-mat">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`story-card-slot slot-${slotIndex}`}
      style={{
        opacity,
        rotate,
        rotateX,
        rotateY,
        scale,
        x,
        y,
        transformPerspective: 1200,
      }}
    >
      <div className="story-image-mat">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </motion.div>
  );
}

function VenueImageReveal({ src, alt }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <motion.div
      ref={ref}
      className="ceremony-image-mat"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
    >
      <div className="ceremony-image-frame">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.3 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.3 }}
          transition={{ delay: 0.1, duration: 1, ease: EDITORIAL_EASE, type: 'tween' }}
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const lenisRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for scroll-linked targets matching reference Framer IDs
  const messageSectionRef = useRef(null);
  const storySectionRef = useRef(null);
  const rsvpTitleRef = useRef(null);

  // Form state
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    curation: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('default');

  // Initialize Lenis Smooth Scroll (intensity: 20 -> duration: 2.0s as in reference)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 809.98);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavigate = useCallback((selector) => {
    if (selector === '#top') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const target = document.querySelector(selector);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // 1. Hero Scroll-Parting Progress (as Message section scrolls over the sticky Hero)
  const { scrollYProgress: heroExitProgress } = useScroll({
    target: messageSectionRef,
    offset: ['start end', 'center center'],
  });

  const springCfg = { stiffness: 150, damping: 100, mass: 1 };
  const heroLeftX = useSpring(
    useTransform(heroExitProgress, [0, 1], [0, -150]),
    springCfg
  );
  const heroLeftOpacity = useSpring(
    useTransform(heroExitProgress, [0, 0.85], [1, 0]),
    springCfg
  );
  const heroCenterScale = useSpring(
    useTransform(heroExitProgress, [0, 1], [1, 0.7]),
    springCfg
  );
  const heroCenterOpacity = useSpring(
    useTransform(heroExitProgress, [0, 0.85], [1, 0]),
    springCfg
  );
  const heroRightX = useSpring(
    useTransform(heroExitProgress, [0, 1], [0, 150]),
    springCfg
  );
  const heroRightOpacity = useSpring(
    useTransform(heroExitProgress, [0, 0.85], [1, 0]),
    springCfg
  );

  // 2. Story Section 3D Gallery Convergence Progress
  const { scrollYProgress: storyProgress } = useScroll({
    target: storySectionRef,
    offset: ['start 0.75', 'end 0.85'],
  });

  // 3. Global Page Scroll Progress for Falling Petals Opacity Choreography
  const { scrollYProgress: pageProgress } = useScroll();
  const petalsOpacity = useTransform(
    pageProgress,
    [0, 0.28, 0.42, 0.58, 0.76, 0.92, 1],
    [1, 1, 0.15, 1, 0.15, 1, 1]
  );

  // 4. Sticky Bottom CTA Auto-Hide when RSVP Title enters viewport
  const { scrollYProgress: rsvpReachProgress } = useScroll({
    target: rsvpTitleRef,
    offset: ['start end', 'end center'],
  });
  const stickyBtnScale = useSpring(
    useTransform(rsvpReachProgress, [0, 0.6], [1, 0]),
    springCfg
  );
  const stickyBtnOpacity = useSpring(
    useTransform(rsvpReachProgress, [0, 0.6], [1, 0]),
    springCfg
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email || !formState.eventType || !formState.guests) {
      return;
    }
    setSubmitStatus('loading');
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1200);
  };

  return (
    <div id="top" className="site-shell">
      {/* Fixed Header Navigation (framer-CzZ5L) */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content Container (1200px Desktop / 810px Tablet / 390px Mobile) */}
      <div className="page-container">
        <main className="page-main">
          {/* Sticky Viewport Ornamental Frame & Interactive Falling Botanical Petals (framer-t4iqg0) */}
          <div className="frame-wrap">
            <div className="frame-sticky">
              <motion.div
                className="frame-border-box"
                initial={{ opacity: 0.001, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: EDITORIAL_EASE, type: 'tween' }}
              >
                <CornerOrnament position="tr" />
                <CornerOrnament position="tl" />
                <CornerOrnament position="br" />
                <CornerOrnament position="bl" />
              </motion.div>

              <FallingPetals opacityMotionValue={petalsOpacity} />
            </div>
          </div>

          {/* ================================================================
              1. STICKY HERO SECTION (framer-18lg82c)
              ================================================================ */}
          <header className="hero-section" data-framer-name="Hero">
            <div className="hero-content">
              {/* Radial-Masked Vintage Paper Texture Background (framer-17ynkoo) */}
              <motion.div
                initial={{ opacity: 0.001 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.1, duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
              >
                <PaperTextureBg />
              </motion.div>

              {/* Left Column: Eyebrow + Names Component (framer-15emqpe) */}
              <motion.div
                className="hero-col-left"
                style={{
                  x: heroLeftX,
                  opacity: heroLeftOpacity,
                }}
              >
                <motion.p
                  className="preset-eyebrow hero-eyebrow"
                  initial={{ opacity: 0.001, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                >
                  bespoke event architecture
                </motion.p>

                <div className="hero-names-box">
                  <motion.h2
                    className="preset-h2 hero-names-amp"
                    initial={{ opacity: 0.001, x: '-50%', y: '-50%' }}
                    animate={{ opacity: 1, x: '-50%', y: '-50%' }}
                    transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                    aria-hidden="true"
                  >
                    &amp;
                  </motion.h2>

                  <CharacterBlurReveal
                    text="Larish"
                    tag="h2"
                    className="preset-h2 hero-names-word"
                    startDelay={0}
                    trigger="onMount"
                  />
                  <CharacterBlurReveal
                    text="Events"
                    tag="h2"
                    className="preset-h2 hero-names-word"
                    startDelay={1}
                    trigger="onMount"
                  />
                </div>
              </motion.div>

              {/* Center Column: Main Hero Image (framer-njr1i4) */}
              <motion.div
                className="hero-main-image-wrap"
                style={{
                  scale: heroCenterScale,
                  opacity: heroCenterOpacity,
                }}
              >
                <motion.div
                  className="hero-main-image-inner"
                  initial={{ opacity: 0.001, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                >
                  <img
                    src={STOCK_IMAGES.heroCenterpiece}
                    alt="Larish Events bespoke floral and architectural celebration centerpiece"
                    fetchPriority="high"
                  />
                </motion.div>
              </motion.div>

              {/* Right Column: Location, Ornate Circle Badge & Animated Number Counter (framer-w57572) */}
              <motion.div
                className="hero-col-right"
                style={{
                  x: heroRightX,
                  opacity: heroRightOpacity,
                }}
              >
                <motion.p
                  className="preset-eyebrow hero-place-top"
                  initial={{ opacity: 0.001, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                >
                  milan · rome
                </motion.p>

                <div className="hero-date-row">
                  <motion.p
                    className="preset-eyebrow hero-date-month"
                    initial={{ opacity: 0.001, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                  >
                    Est.
                  </motion.p>

                  <div className="hero-date-badge">
                    <AnimatedCounter start={0} end={24} duration={2} />

                    <motion.div
                      initial={{ opacity: 0.001, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <DateCartoucheSegment
                        style={{
                          top: '-1px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(180deg)',
                        }}
                      />
                      <DateCartoucheSegment
                        style={{
                          bottom: '0px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(0deg)',
                        }}
                      />
                      <DateCartoucheSegment
                        style={{
                          left: '-18px',
                          top: '50%',
                          transform: 'translateY(-50%) rotate(90deg)',
                        }}
                      />
                      <DateCartoucheSegment
                        style={{
                          right: '-18px',
                          top: '50%',
                          transform: 'translateY(-50%) rotate(-90deg)',
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.p
                    className="preset-eyebrow hero-date-year"
                    initial={{ opacity: 0.001, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                  >
                    2027
                  </motion.p>
                </div>

                <motion.p
                  className="preset-eyebrow hero-place-bottom"
                  initial={{ opacity: 0.001, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                >
                  worldwide
                </motion.p>
              </motion.div>
            </div>
          </header>

          {/* ================================================================
              2. MESSAGE / INVITATION SECTION (framer-gdmz50)
              ================================================================ */}
          <section
            id="message"
            ref={messageSectionRef}
            className="message-section"
            data-framer-name="Message"
          >
            <div className="section-header-stack">
              <FadeUpOnView delay={0} duration={1}>
                <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                  The Art of Gathering
                </p>
              </FadeUpOnView>

              <LineBlurReveal
                id="message-text"
                lines={[
                  'Crafting timeless celebrations',
                  'with architectural grace and soul',
                ]}
              />

              <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SectionDivider />
              </FadeUpOnView>

              <FadeUpOnView delay={0.3} duration={1} className="section-max-800">
                <p className="preset-body" style={{ textAlign: 'center' }}>
                  At Larish Events, we transform historic palazzos, sunlit Mediterranean villas, and private estates into living works of art. Every celebration is conceived from the ground up with poetic scenography, refined hospitality, and quiet luxury.
                </p>
              </FadeUpOnView>
            </div>
          </section>

          {/* ================================================================
              3. STORY / ETHOS & STICKY 2x2 3D GALLERY (framer-bgi981)
              ================================================================ */}
          <section
            id="story"
            ref={storySectionRef}
            className="story-section"
            data-framer-name="Story"
          >
            <div className="story-text-wrap">
              <div className="section-header-stack">
                <FadeUpOnView delay={0} duration={1}>
                  <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                    Our Ethos
                  </p>
                </FadeUpOnView>

                <LineBlurReveal
                  lines={['Where heritage meets', 'extraordinary celebration']}
                />

                <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <SectionDivider />
                </FadeUpOnView>

                <FadeUpOnView delay={0.3} duration={1} className="section-max-600">
                  <h5 className="preset-h5">
                    Great celebrations never feel staged. They unfold like a cherished memory—effortless in rhythm, intimate in scale, and unforgettable in every sensory detail.
                  </h5>
                </FadeUpOnView>
              </div>
            </div>

            <div id="images" className="story-images-grid" data-framer-name="Story Images">
              <StoryCard3D
                slotIndex={1}
                src={STOCK_IMAGES.story1}
                alt="Candlelit imperial banquet table designed by Larish Events"
                storyProgress={storyProgress}
                isMobile={isMobile}
              />
              <StoryCard3D
                slotIndex={2}
                src={STOCK_IMAGES.story2}
                alt="Bespoke botanical archway and ceremony floral installation"
                storyProgress={storyProgress}
                isMobile={isMobile}
              />
              <StoryCard3D
                slotIndex={3}
                src={STOCK_IMAGES.story3}
                alt="Artisanal wedding cake and champagne tower curation"
                storyProgress={storyProgress}
                isMobile={isMobile}
              />
              <StoryCard3D
                slotIndex={4}
                src={STOCK_IMAGES.story4}
                alt="Evening garden reception beneath warm architectural lighting"
                storyProgress={storyProgress}
                isMobile={isMobile}
              />
            </div>
          </section>

          {/* ================================================================
              4. CEREMONY & RECEPTION / SIGNATURE PRODUCTIONS (framer-sxrq4c)
              ================================================================ */}
          <section
            id="ceremony"
            className="ceremony-section"
            data-framer-name="Ceremony"
          >
            <div id="ceremony-title" className="section-header-stack" style={{ padding: 0 }}>
              <FadeUpOnView delay={0} duration={1}>
                <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                  Signature Productions
                </p>
              </FadeUpOnView>

              <LineBlurReveal
                lines={['Iconic sanctuaries across', 'the Mediterranean']}
              />

              <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SectionDivider />
              </FadeUpOnView>
            </div>

            <div className="ceremony-dual-row">
              {/* Left Venue / Service Showcase */}
              <div className="ceremony-column">
                <div className="ceremony-col-header">
                  <FadeUpOnView delay={0} duration={1}>
                    <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                      Destination Weddings
                    </p>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.1} duration={1}>
                    <h4 className="preset-h4">Villa Medici &amp; Gardens</h4>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.2} duration={1}>
                    <p className="preset-body" style={{ textAlign: 'center' }}>
                      Exchange vows surrounded by Renaissance architecture, manicured cypress avenues, and bespoke botanical scenography bathed in golden Roman light.
                    </p>
                  </FadeUpOnView>
                </div>

                <VenueImageReveal
                  src={STOCK_IMAGES.venueCeremony}
                  alt="Historic Italian villa ceremony setup with white garden chairs and floral aisle"
                />

                <div className="ceremony-meta-stack">
                  <FadeUpOnView delay={0} duration={1}>
                    <h4 className="preset-h4">4.00 pm</h4>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.1} duration={1} className="ceremony-address-stack">
                    <p className="preset-body" style={{ textAlign: 'center' }}>
                      Viale della Trinità dei Monti, Rome, Italy
                    </p>
                    <p className="preset-label">
                      <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preset-link"
                      >
                        View on Map
                      </a>
                    </p>
                  </FadeUpOnView>
                </div>
              </div>

              {/* Right Venue / Service Showcase */}
              <div className="ceremony-column">
                <div className="ceremony-col-header">
                  <FadeUpOnView delay={0} duration={1}>
                    <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                      Private Galas &amp; Soirées
                    </p>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.1} duration={1}>
                    <h4 className="preset-h4">The Belvedere Terrace</h4>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.2} duration={1}>
                    <p className="preset-body" style={{ textAlign: 'center' }}>
                      Following the ceremony, guests gather for Michelin-curated dining, live orchestral performances, and candlelit celebration beneath the stars.
                    </p>
                  </FadeUpOnView>
                </div>

                <VenueImageReveal
                  src={STOCK_IMAGES.venueReception}
                  alt="Luxury lakeside terrace reception setup for evening gala dinner"
                />

                <div className="ceremony-meta-stack">
                  <FadeUpOnView delay={0} duration={1}>
                    <h4 className="preset-h4">6.30 pm</h4>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.1} duration={1} className="ceremony-address-stack">
                    <p className="preset-body" style={{ textAlign: 'center' }}>
                      Palazzo Serbelloni &amp; Lake Como Estates, Italy
                    </p>
                    <p className="preset-label">
                      <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preset-link"
                      >
                        View on Map
                      </a>
                    </p>
                  </FadeUpOnView>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              5. SCHEDULE / EVENT CURATION PROCESS (framer-1q1dgfu)
              ================================================================ */}
          <section
            id="schedule"
            className="schedule-section"
            data-framer-name="Schedule"
          >
            <div id="schedule-title" className="section-header-stack" style={{ padding: 0 }}>
              <FadeUpOnView delay={0} duration={1}>
                <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                  The Curation
                </p>
              </FadeUpOnView>

              <LineBlurReveal lines={['Our Signature Journey']} />

              <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SectionDivider />
              </FadeUpOnView>
            </div>

            <div className="schedule-list">
              {SCHEDULE_DATA.map((item, idx) => (
                <div key={idx} className="schedule-item">
                  <FadeUpOnView delay={0} duration={1}>
                    <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                      {item.phase}
                    </p>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.1} duration={1}>
                    <h4 className="preset-h4">{item.title}</h4>
                  </FadeUpOnView>

                  <FadeUpOnView delay={0.2} duration={1}>
                    <p className="preset-body" style={{ textAlign: 'center' }}>
                      {item.description}
                    </p>
                  </FadeUpOnView>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================
              6. FAQ ACCORDION SECTION (framer-tjtgt5)
              ================================================================ */}
          <section id="faq" className="faq-section" data-framer-name="FAQ">
            <div id="faq-title" className="section-header-stack" style={{ padding: 0 }}>
              <LineBlurReveal lines={['Questions']} />

              <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SectionDivider />
              </FadeUpOnView>
            </div>

            <div className="faq-list">
              {FAQ_DATA.map((item, idx) => (
                <FAQItem key={idx} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>

          {/* ================================================================
              7. RSVP / CONSULTATION INQUIRY SECTION (framer-1rywi6a)
              ================================================================ */}
          <section id="rsvp" className="rsvp-section" data-framer-name="RSVP">
            <div
              id="rsvp-title"
              ref={rsvpTitleRef}
              className="section-header-stack"
              style={{ padding: 0 }}
            >
              <FadeUpOnView delay={0} duration={1}>
                <p className="preset-eyebrow" style={{ color: 'var(--color-muted)' }}>
                  Private Consultation
                </p>
              </FadeUpOnView>

              <LineBlurReveal lines={['Shall we begin planning?']} />

              <FadeUpOnView delay={0.2} duration={1} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <SectionDivider />
              </FadeUpOnView>
            </div>

            <div className="rsvp-form-wrap">
              <form className="rsvp-form-grid" onSubmit={handleFormSubmit}>
                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-name" className="preset-label">
                    full Name*
                  </label>
                  <input
                    id="field-name"
                    name="Name"
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    className="rsvp-input"
                    value={formState.fullName}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, fullName: e.target.value }))
                    }
                  />
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-email" className="preset-label">
                    email*
                  </label>
                  <input
                    id="field-email"
                    name="Email"
                    type="email"
                    required
                    placeholder="eleanor@vance.com"
                    className="rsvp-input"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-phone" className="preset-label">
                    phone
                  </label>
                  <input
                    id="field-phone"
                    name="Phone"
                    type="tel"
                    placeholder="+39 02 456 65 87"
                    className="rsvp-input"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                  />
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-type" className="preset-label">
                    Celebration Type*
                  </label>
                  <div className="rsvp-select-wrapper">
                    <select
                      id="field-type"
                      name="CelebrationType"
                      required
                      className={`rsvp-select ${
                        !formState.eventType ? 'placeholder-selected' : ''
                      }`}
                      value={formState.eventType}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, eventType: e.target.value }))
                      }
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option value="Destination Wedding">Destination Wedding</option>
                      <option value="Private Estate Gala">Private Estate Gala</option>
                      <option value="Milestone Celebration">Milestone Celebration</option>
                      <option value="Brand & Cultural Soirée">Brand &amp; Cultural Soirée</option>
                    </select>
                    <span className="rsvp-select-caret" aria-hidden="true">
                      ▾
                    </span>
                  </div>
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-guests" className="preset-label">
                    Estimated Guests*
                  </label>
                  <input
                    id="field-guests"
                    name="Number of Guests"
                    type="number"
                    min="1"
                    required
                    placeholder="120"
                    className="rsvp-input"
                    value={formState.guests}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, guests: e.target.value }))
                    }
                  />
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field">
                  <label htmlFor="field-curation" className="preset-label">
                    Preferred Destination
                  </label>
                  <div className="rsvp-select-wrapper">
                    <select
                      id="field-curation"
                      name="Destination"
                      className={`rsvp-select ${
                        !formState.curation ? 'placeholder-selected' : ''
                      }`}
                      value={formState.curation}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, curation: e.target.value }))
                      }
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option value="Rome & Lazio Villas">Rome &amp; Lazio Villas</option>
                      <option value="Lake Como & Milan">Lake Como &amp; Milan</option>
                      <option value="Tuscany & Florence">Tuscany &amp; Florence</option>
                      <option value="Amalfi Coast & Capri">Amalfi Coast &amp; Capri</option>
                      <option value="French Riviera">French Riviera</option>
                      <option value="Worldwide Private Estate">Worldwide Private Estate</option>
                    </select>
                    <span className="rsvp-select-caret" aria-hidden="true">
                      ▾
                    </span>
                  </div>
                </FadeUpOnView>

                <FadeUpOnView delay={0.1} duration={1} className="rsvp-field span-2">
                  <label htmlFor="field-message" className="preset-label">
                    Additional Message
                  </label>
                  <textarea
                    id="field-message"
                    name="Additional Message"
                    placeholder="Tell us about your preferred season, aesthetic vision, or celebration details..."
                    className="rsvp-textarea"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                  />
                </FadeUpOnView>

                <FormSubmitButton status={submitStatus} />
              </form>
            </div>
          </section>

          {/* ================================================================
              8. FOOTER SECTION (framer-1hzudpq)
              ================================================================ */}
          <footer className="footer-section" data-framer-name="Footer">
            <div className="footer-names-row">
              <CharacterBlurReveal
                text="Larish"
                tag="h2"
                className="preset-h2"
                startDelay={0}
                trigger="onInView"
              />
              <motion.h2
                className="preset-h2 footer-names-amp"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 2, ease: EDITORIAL_EASE, type: 'tween' }}
                style={{ color: 'var(--color-alabaster)', padding: '0 4px' }}
              >
                &amp;
              </motion.h2>
              <CharacterBlurReveal
                text="Events"
                tag="h2"
                className="preset-h2"
                startDelay={1}
                trigger="onInView"
              />
            </div>

            <FadeUpOnView delay={0.3} duration={1}>
              <p className="preset-label footer-meta-text">
                Via Monte Napoleone 8, Milan · Largo di Porta San Pancrazio, Rome.
              </p>
            </FadeUpOnView>

            <FadeUpOnView delay={0.4} duration={1}>
              <p className="preset-label footer-meta-text">
                bespoke celebrations · 2026 — 2028
              </p>
            </FadeUpOnView>
          </footer>
        </main>
      </div>

      {/* Sticky Bottom Center CTA (framer-sp0s0o) */}
      <StickyBottomButton
        scaleMotionValue={stickyBtnScale}
        opacityMotionValue={stickyBtnOpacity}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
