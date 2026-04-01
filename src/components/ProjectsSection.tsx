import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import TextReveal from './TextReveal';

const projects = [
  {
    title: 'TeamBond',
    category: 'Web App / AI Tool / Project-1',
    description: 'AI-Powered Hackathon Team Member Finder that analyzes GitHub profiles and technical skills to find compatible teammates.',
    tags: ['React','Spring','Boot','GenAI','MongoDB','WebSocket','redis','rabbitMQ'],
    image: '/project-1.png',
    projectUrl: 'https://frontend-lovat-chi-40.vercel.app/',
    githubUrl: 'https://github.com/Darshan-Sheta/Final-TeamBond-Project',
    gradient: 'from-primary/20 via-primary/5 to-accent/10',
    accent: 'primary',
  },
  {
    title: 'RHYThymix',
    category: 'Web App / ML / GenAi / DuHacks-5.0',
    description: 'AI music recognition engine using audio fingerprinting and K-Means clustering for intelligent recommendations.',
    tags: ['Python', 'React', 'FastAPI', 'ML', 'Scikit-Learn', 'Librosa', 'Chromaprint', 'SQLite'],
    image: '/project-2.png',
    projectUrl: 'https://github.com/Darshan-Sheta/RHYThymix',
    githubUrl: 'https://github.com/Darshan-Sheta/RHYThymix',
    gradient: 'from-accent/20 via-accent/5 to-primary/10',
    accent: 'accent',
  },
  {
    title: 'AutoHire-AI',
    category: 'Web App / GenAi / Project-2',
    description: 'An end-to-end AI-powered hiring assessment platform that eliminates bias, automates evaluation, and catches fraud — from job posting to final hire.',
    tags: ['Next.js','TypeScript','TailwindCSS','Node.js','MongoDB','WebSockets','Generative AI'],
    image: '/project-3.png',
    projectUrl: 'https://github.com/Darshan-Sheta/AutoHire-AI',
    githubUrl: 'https://github.com/Darshan-Sheta/AutoHire-AI',
    gradient: 'from-primary/15 via-transparent to-accent/15',
    accent: 'primary',
  },
  {
    title: 'AyuGama',
    category: 'Web App / Real World Solution / Ayurvedic Doctor',
    description: 'Dedicated Ayurvedic Doctor providing holistic, natural, and personalized healthcare solutions.',
    tags: ['MERN', 'AI/ML', 'GenAI'],
    image: '/project-4.png',
    projectUrl: 'https://github.com/Darshan-Sheta/AyuGama',
    githubUrl: 'https://github.com/Darshan-Sheta/AyuGama',
    gradient: 'from-accent/15 via-transparent to-primary/20',
    accent: 'accent',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20 });
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

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
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl overflow-hidden glass hover:glow-border hover-lift hover-glow transition-all duration-500 cursor-pointer"
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY] as any,
            ([gx, gy]: number[]) => `radial-gradient(circle at ${gx}% ${gy}%, hsl(var(--primary) / 0.1), transparent 50%)`
          ),
        }}
      />

      {/* Project preview area */}
      <div
        className={`h-48 sm:h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden cursor-pointer`}
        onClick={() => project.projectUrl && window.open(project.projectUrl, '_blank')}
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated project icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-strong flex items-center justify-center relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="font-heading text-xl sm:text-2xl font-bold text-gradient"
          >
            {project.title.charAt(0)}
          </motion.span>
        </motion.div>

        {/* Floating particles on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -60],
                x: [0, (i - 2) * 15],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="absolute bottom-10 left-1/2 w-1 h-1 rounded-full bg-primary"
            />
          ))}
        </motion.div>

        {/* Hover icons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-3.5 h-3.5" />
          </motion.a>
          <motion.a
            href={project.projectUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-foreground hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Project number */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-4 left-4 font-heading text-6xl font-bold text-foreground"
        >
          0{index + 1}
        </motion.span>
      </div>

      <div className="p-5 sm:p-6 relative">
        <div className="flex items-start justify-between mb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {project.category}
          </p>
          <motion.div
            whileHover={{ rotate: 45 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
        <a href={project.projectUrl} target="_blank" rel="noreferrer" className="block">
          <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
        </a>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className=" py-20 sm:py-32 px-6 sm:px-8 md:px-16 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Selected Work</span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Darshan-Sheta"
            whileHover={{ scale: 1.05, gap: '12px' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            View All Projects
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
