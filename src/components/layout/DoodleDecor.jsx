import React from 'react';
import './DoodleDecor.css';

// Hand-drawn style SVG components (no emojis allowed)
const MountainDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 80L35 30L55 60L75 20L95 80H10Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35 30L45 45L35 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M75 20L85 35L75 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompassDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" strokeLinedasharray="5 5"/>
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3"/>
    <path d="M50 10L60 50L50 90L40 50L50 10Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 50L50 60L90 50L50 40L10 50Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TreesDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15L20 55H40L25 85H75L60 55H80L50 15Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 85V100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const CameraDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="30" width="70" height="50" rx="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="55" r="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 30V25C30 22.2386 32.2386 20 35 20H65C67.7614 20 70 22.2386 70 25V30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="75" cy="45" r="2" fill="currentColor"/>
  </svg>
);

const HotAirBalloonDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C30 10 20 30 20 45C20 65 40 75 40 75H60C60 75 80 65 80 45C80 30 70 10 50 10Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 75L45 90H55L60 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50 10V75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M30 25C30 25 45 35 50 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const MapPinDoodle = ({ style }) => (
  <svg className="doodle-svg" style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 90C50 90 20 60 20 40C20 23.4315 33.4315 10 50 10C66.5685 10 80 23.4315 80 40C80 60 50 90 50 90Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="40" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DoodleDecor = ({ variant = 'section' }) => {
  const doodles = [
    { id: 1, Component: MountainDoodle, style: { top: '15%', left: '5%', width: '80px', transform: 'rotate(-10deg)' }, delay: '0s' },
    { id: 2, Component: CompassDoodle, style: { top: '25%', right: '10%', width: '100px', transform: 'rotate(15deg)' }, delay: '-2s' },
    { id: 3, Component: TreesDoodle, style: { bottom: '20%', left: '15%', width: '70px', transform: 'rotate(5deg)' }, delay: '-4s' },
    { id: 4, Component: CameraDoodle, style: { top: '45%', right: '15%', width: '60px', transform: 'rotate(-20deg)' }, delay: '-1s' },
    { id: 5, Component: HotAirBalloonDoodle, style: { top: '65%', left: '8%', width: '90px', transform: 'rotate(10deg)' }, delay: '-5s' },
    { id: 6, Component: MapPinDoodle, style: { bottom: '30%', right: '8%', width: '60px', transform: 'rotate(15deg)' }, delay: '-3s' }
  ];

  const visibleDoodles = variant === 'hero' ? doodles : doodles.slice(0, 3);

  return (
    <div className="doodle-container">
      {visibleDoodles.map(({ id, Component, style, delay }) => (
        <div key={id} className="doodle-wrapper" style={{ ...style, animationDelay: delay }}>
          <Component />
        </div>
      ))}
    </div>
  );
};

export default DoodleDecor;
