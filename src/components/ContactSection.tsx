import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Sparkles, Github, Linkedin, Instagram } from 'lucide-react';
import { useState, FormEvent } from 'react';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { useToast } from '../hooks/use-toast';

function MarqueeText() {
  return (
    <div className="overflow-hidden py-8 -mx-6 sm:-mx-8 md:-mx-16">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-foreground/5 select-none">
            LET'S WORK TOGETHER
            <span className="text-primary/20 mx-4">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "40d3cadf-1026-4195-969f-f4d423af0e20",
          name,
          email,
          message,
          subject: "New Project Inquiry from Portfolio",
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-6 sm:px-8 md:px-16 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Marquee */}


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Get In Touch</span>
          </motion.div>
          <MarqueeText />
          <motion.p
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto"
          >
            Have a project in mind? I'd love to hear about it. Let's discuss
            how we can bring your vision to life.
          </motion.p>
        </motion.div>

        {/* Contact details */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-16">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-8 hover-lift hover-glow"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Contact info</p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Current Location</p>
                    <p className="font-body text-sm text-muted-foreground">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Sparkles className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Availability</p>
                    <p className="font-body text-sm text-muted-foreground">Available for all remote roles</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-3xl p-8 hover-lift hover-glow"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Find me on</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MagneticButton
                  as="a"
                  href="https://github.com/Darshan-Sheta"
                  strength={0.3}
                  className="group rounded-3xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-5 text-left text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-secondary dark:hover:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary dark:bg-slate-900 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      <Github className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">GitHub</p>
                      <p className="text-[11px] text-muted-foreground">Code & repos</p>
                    </div>
                  </div>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://www.linkedin.com/in/darshan-sheta-942941288/"
                  strength={0.3}
                  className="group rounded-3xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-5 text-left text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-secondary dark:hover:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary dark:bg-slate-900 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      <Linkedin className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">LinkedIn</p>
                      <p className="text-[11px] text-muted-foreground">Professional network</p>
                    </div>
                  </div>
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="https://www.instagram.com/darshan__sheta__/"
                  strength={0.3}
                  className="group rounded-3xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-5 text-left text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-secondary dark:hover:bg-slate-900 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary dark:bg-slate-900 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      <Instagram className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Instagram</p>
                      <p className="text-[11px] text-muted-foreground">Visual updates</p>
                    </div>
                  </div>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 hover-lift hover-glow"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Send a Message</p>
              <p className="text-sm text-muted-foreground">Reach out directly for project inquiries, collaboration, or remote opportunities.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus-ring"
                />
              </div>
              {/* Hidden inputs are no longer needed since we manage it in fetch body, but keeping comments for clarity */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell me about your project or just say hi..."
                  className="w-full resize-none rounded-2xl border border-border dark:border-slate-800 bg-background/50 dark:bg-slate-950/70 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus-ring"
                />
              </div>
              <MagneticButton
                type="submit"
                strength={0.3}
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
              </MagneticButton>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
