import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';
import TextReveal from './TextReveal';

const technicalSkills = [
  { category: 'Programming', items: ['C','C++', 'Java', 'JavaScript', 'Python'] },
  { category: 'Web Framework', items: ['React', 'HTML', 'Tailwind CSS', 'Android'] },
  { category: 'Backend Framework', items: [ 'Spring Boot','FastAPI'] },
  { category: 'Specialized', items: ['GenAI', 'Machine Learning', 'FastAPI', 'MERN Stack'] },
  { category: 'Database', items: ['MongoDB','PostgreSQL', 'MySQL'] },
  { category: 'Version Control', items: ['Git', 'GitHub'] },
  { category: 'Data Science', items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn'] },
  { category: 'AI Framework', items: ['LangChain', 'LangGraph', 'Hugging Face'] },
  { category: 'Automation', items: ['n8n'] },
];

const experience = [
  { year: '2023 — 2027', role: 'B.Tech - Information Technology - Dharmsinh Desai University - Nadiad', company: 'CPI: 9.04', type: 'current' },
  { year: '2021 — 2023', role: 'HSC - Shree Swaminarayan Gurukul - Surat', company: 'PR: 99.21%', type: 'past' },
  { year: '2020 — 2021', role: 'SSC - Shree Swaminarayan Gurukul - Surat', company: 'PR: 97.99%', type: 'past' },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-2 sm:py-3 px-6 sm:px-8 md:px-16 relative overflow-hidden">
      {/* Background decorations */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute  -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 15, repeat: Infinity, delay: 3 }}
        className="absolute  -right-32 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center  sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4  rounded-full glass"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">About Me</span>
          </motion.div>
          
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              I am an aspiring Full-Stack AI Engineer with a strong focus on developing intelligent, scalable, and high-performance applications. With hands-on experience in AI, Machine Learning, and modern web technologies, I aim to bridge the gap between innovative ideas and real-world implementation.
            </p>
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              I am deeply interested in Generative AI, Agentic Systems, and advanced problem-solving, continuously learning and building projects that push the boundaries of technology.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            {experience.map((exp, i) => (
              <TiltCard key={exp.year} className="cursor-default">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 group hover:glow-border hover-lift hover-glow transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-primary tracking-wider">{exp.year}</span>
                    <p className="font-heading text-base font-semibold text-foreground mt-3">{exp.role}</p>
                    <p className="font-body text-sm text-muted-foreground mt-2">{exp.company}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>

        {/* Skills */}
        <div id="skills" className="scroll-mt-24" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 text-center">
            Technical Skills & Technologies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalSkills.map((skill, i) => (
              <TiltCard key={skill.category} className="cursor-default">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  whileHover={{ y: -6 }}
                  className="glass rounded-2xl p-5 group hover:glow-border hover-lift hover-glow transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <p className="font-heading text-sm font-semibold text-foreground mb-3">{skill.category}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {skill.items.map((item) => (
                        <li key={`${skill.category}-${item}`} className="before:content-['•'] before:text-primary before:mr-2 before:inline-block">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
