"use client"
import { useEffect } from 'react';
import "./pointer.css"

export default function Pointer() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nav = document.querySelector('.nav');
      const navRect = nav.getBoundingClientRect();
      if (e.clientX >= navRect.left && e.clientX <= navRect.right &&
          e.clientY >= navRect.top && e.clientY <= navRect.bottom) {
        return; 
      }

      const bubbleContainer = document.getElementById('bubble-container');
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');

      const size = Math.random() * 10 + 10; // Random size between 10px and 20px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${e.clientX - size / 2}px`;
      bubble.style.top = `${e.clientY - size / 2}px`;

      bubbleContainer.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 2000); // Remove bubble after 2 seconds (matching the animation duration)
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bubble-container" id="bubble-container"></div>
  );
}
