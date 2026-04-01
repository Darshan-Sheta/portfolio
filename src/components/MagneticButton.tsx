import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button';
  href?: string;
  download?: string | boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  download,
  onClick,
  type,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="inline-block">
      <Tag
        href={href}
        download={download}
        onClick={onClick}
        type={as === 'button' ? type : undefined}
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.95 }}
        className={className}
      >
        {children}
      </Tag>
    </div>
  );
}
