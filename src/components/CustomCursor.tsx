import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 20, stiffness: 400 };
  const trailConfig = { damping: 30, stiffness: 200 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover], input, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
      return interactiveElements;
    };

    const elements = addHoverListeners();
    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isClicking ? 8 : isHovering ? 6 : 10,
          height: isClicking ? 8 : isHovering ? 6 : 10,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 64 : isClicking ? 28 : 40,
          height: isHovering ? 64 : isClicking ? 28 : 40,
          opacity: isHovering ? 0.8 : 0.3,
          borderColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.4)',
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary/20 blur-xl pointer-events-none z-[9997]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 80 : 50,
          height: isHovering ? 80 : 50,
          opacity: isHovering ? 0.15 : 0.05,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
