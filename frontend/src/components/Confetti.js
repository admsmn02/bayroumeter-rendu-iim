// src/components/Confetti.js
import React, { useEffect, useState } from "react";

const Confetti = ({ show, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      // Create confetti particles
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10,
          rotation: Math.random() * 360,
          color: ["#667eea", "#764ba2", "#48bb78", "#f56565", "#fbd38d"][
            Math.floor(Math.random() * 5)
          ],
          emoji: ["🎉", "🎊", "✨", "🎈", "🥳", "🎯", "🏆"][
            Math.floor(Math.random() * 7)
          ],
        });
      }
      setParticles(newParticles);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            fontSize: "1.5rem",
            color: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confettiFall 3s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
