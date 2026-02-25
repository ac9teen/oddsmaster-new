import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExpertCardProps {
  name: string;
  role: string;
  image: string;
  sportIcon: React.ReactNode;
  index: number;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ name, role, image, sportIcon, index }) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="expert-card"
    >
      <img
        className="expert-image-img"
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc('/PROFILE1.jpg')}
      />
      <div className="expert-sport-pill">
        {sportIcon}
      </div>
      <div className="expert-overlay">
        <div className="expert-text">
          <div className="expert-name">{name}</div>
          <div className="expert-role">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

const experts: Omit<ExpertCardProps, 'index'>[] = [
  {
    name: 'Lex OddsMan',
    role: 'Chief Information Officer',
    image: '/pp2.png',
    sportIcon: '🎾'
  },
  {
    name: 'Abhinav Chadha',
    role: 'Co Founder & CEO',
    image: '/pp1.png',
    sportIcon: '⚽'
  },
  {
    name: 'Olivia Rhodes',
    role: 'Head of Operations',
    image: '/pp3.png',
    sportIcon: '🏀'
  },
  {
    name: 'Ethan Wu',
    role: 'Chief Data Scientist',
    image: '/pp4.png',
    sportIcon: '🏈'
  },
  {
    name: 'Andre Coleman',
    role: 'Pattern Recognition Lead',
    image: '/COLEMAN.png?v=2',
    sportIcon: '⚾'
  }
];

export default function ExpertsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = trackRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="experts-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="experts-header-tag"
          >
            Meet Our Expert Team
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            The Minds Behind <span className="text-[#07b57e]">The Edge</span>
          </motion.h2>
        </div>

        <div className="experts-container">
          <div className="experts-track scrollbar-hide" ref={trackRef}>
            {experts.map((expert, idx) => (
              <ExpertCard key={expert.name} {...expert} index={idx} />
            ))}
          </div>

          <div className="experts-arrows lg:hidden">
            <button className="experts-arrow" onClick={() => scroll('left')} aria-label="Previous">
              <ChevronLeft size={24} />
            </button>
            <button className="experts-arrow" onClick={() => scroll('right')} aria-label="Next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



