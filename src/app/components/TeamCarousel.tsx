import { useState, useEffect } from 'react';
import SwipeIndicator from './SwipeIndicator';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  sportIcon: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Football Analyst',
    image: '/pp1.png',
    sportIcon: '🏈'
  },
  {
    id: 2,
    name: 'Maria Johnson',
    role: 'Tennis Expert',
    image: '/pp2.png',
    sportIcon: '🎾'
  },
  {
    id: 3,
    name: 'David Lee',
    role: 'Basketball Analyst',
    image: '/pp3.png',
    sportIcon: '🏀'
  },
  {
    id: 4,
    name: 'Sarah Chen',
    role: 'Soccer Expert',
    image: '/pp4.png',
    sportIcon: '⚽'
  },
  {
    id: 5,
    name: 'Alex Patel',
    role: 'Baseball Analyst',
    image: '/pp5.png',
    sportIcon: '⚾'
  }
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % teamMembers.length
    );
  };

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  }

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="team-section">
      <div className="team-tag">Meet Our Expert Team</div>

      <div
        className="team-carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="team-cards-container">
          <div
            className="team-card transition-all duration-300"
            style={{ backgroundImage: `url(${currentMember.image})` }}
          >
            <div className="team-header">
              <div className="team-text">
                <h3 className="team-name">{currentMember.name}</h3>
                <p className="team-role">{currentMember.role}</p>
              </div>
              <div className="team-sport-icon">
                {currentMember.sportIcon}
              </div>
            </div>
          </div>
        </div>

        {isMobile ? (
          <SwipeIndicator />
        ) : (
          <div className="team-nav-arrows">
            <button className="team-nav-arrow team-nav-left" onClick={goToPrevious}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button className="team-nav-arrow team-nav-right" onClick={goToNext}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}