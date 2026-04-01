import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useRef } from 'react';
import HeroScene from './HeroScene';
import { ArrowDown, Github, Linkedin, Instagram, Download } from 'lucide-react';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 30);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 30);
  };

  const springConfig = { damping: 20, stiffness: 150 };
  const photoX = useSpring(useTransform(mouseX, v => v * 0.8), springConfig);
  const photoY = useSpring(useTransform(mouseY, v => v * 0.8), springConfig);
  const bgX = useSpring(useTransform(mouseX, v => v * -0.3), springConfig);
  const bgY = useSpring(useTransform(mouseY, v => v * -0.3), springConfig);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouse}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
    >
      <HeroScene />

      {/* Animated gradient blobs that follow mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        style={{ x: bgX, y: bgY, left: '20%', top: '10%' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] pointer-events-none"
        style={{ x: useSpring(useTransform(mouseX, v => v * 0.5), springConfig), y: useSpring(useTransform(mouseY, v => v * 0.5), springConfig), right: '10%', bottom: '20%' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/50" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-6 sm:px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto"
      >
        {/* Left: Text content */}
        <div>
          

          <motion.div variants={fadeUp}>
            <h1 className="font-heading text-2xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-4">
              Darshan Sheta
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg font-medium mb-6 text-muted-foreground">
              <span className="text-primary">Full-Stack Developer</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary">AI/ML Engineer</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary">Generative AI Developer</span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
          >
            Crafting high-performance web applications with modern, scalable architecture and seamless user experiences.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <MagneticButton
              as="a"
              href="#work"
              strength={0.25}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3.5 text-sm font-medium text-primary-foreground hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/resume.pdf"
              download="resume.pdf"
              strength={0.25}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 sm:px-8 py-3.5 text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_35px_hsl(var(--primary)/0.18)] hover:-translate-y-0.5 transition-all duration-500"
            >
              <Download className="w-4 h-4" />
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-5">
            {[
              { icon: Github, href: 'https://github.com/Darshan-Sheta', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/darshan-sheta-942941288/', label: 'LinkedIn' },
              { icon: Instagram, href: 'https://www.instagram.com/darshan__sheta__/', label: 'Instagram' },
            ].map(({ icon: Icon, href, label }, i) => (
              <MagneticButton key={label} as="a" href={href} strength={0.4} className="relative group">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500"
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              </MagneticButton>
            ))}

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 48 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="h-px bg-border"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="font-mono text-[10px] text-muted-foreground tracking-wider"
            >
              FOLLOW ME
            </motion.span>
          </motion.div>
        </div>

        {/* Right: Photo with advanced parallax */}
        <motion.div
          variants={fadeUp}
          className="relative flex justify-center lg:justify-end"
          style={{ x: photoX, y: photoY }}
        >
          <div className="relative">
            {/* Animated rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-dashed border-primary/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-16 rounded-full border border-dotted border-accent/10"
            />

            {/* Glow behind photo */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-6 rounded-3xl bg-primary/20 blur-3xl"
            />

            {/* Photo container */}
            <motion.div
              whileHover={{ scale: 1.03, rotateY: 5, rotateX: -5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden glow-border"
              style={{ perspective: 1000 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="w-full h-full relative overflow-hidden bg-card">
                <img
                  src="/profile-photo1.png"
                  alt="Profile photo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <motion.div
                  animate={{ y: ['-100%', '300%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none"
                />
              </div>
            </motion.div>

            {/* Floating badges with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }, opacity: { delay: 1 }, x: { delay: 1 } }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass-strong rounded-xl px-3 py-2 sm:px-4 sm:py-2 hover:glow-border transition-all duration-300"
            >
              <p className="text-xs font-mono font-semibold text-primary flex items-center gap-1.5">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-accent inline-block"
                />
                3+ Years
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
              transition={{ y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }, opacity: { delay: 1.2 }, x: { delay: 1.2 } }}
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-strong rounded-xl px-3 py-2 sm:px-4 sm:py-2 hover:glow-border transition-all duration-300"
            >
              <p className="text-xs font-mono font-semibold text-accent flex items-center gap-1.5">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                />
                6+ Projects
              </p>
            </motion.div>

            {/* New floating element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [0, 5, 0] }}
              transition={{ x: { repeat: Infinity, duration: 4, ease: 'easeInOut' }, opacity: { delay: 1.4 } }}
              className="absolute top-1/2 -right-12 sm:-right-16 glass-strong rounded-full w-10 h-10 flex items-center justify-center"
            >
              <span className="text-primary text-sm">✦</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Scroll</span>
        <motion.div className="w-5 h-8 rounded-full border border-primary/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
