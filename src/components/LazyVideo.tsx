import React, { useState, useEffect } from 'react';

interface LazyVideoProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Lazy-loaded video iframe component
 * Only loads the iframe when user scrolls near it or clicks to play
 */
const LazyVideo: React.FC<LazyVideoProps> = ({ src, title, className = '' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to load when near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Load video after a short delay to prioritize other content
            setTimeout(() => setShouldLoad(true), 500);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    );

    const container = document.getElementById('video-container');
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return (
      <div
        id="video-container"
        className={`relative w-full aspect-video bg-luxe-cream flex items-center justify-center ${className}`}
      >
        <div className="text-luxe-charcoal">Chargement de la vidéo...</div>
      </div>
    );
  }

  if (!shouldLoad) {
    return (
      <div
        className={`relative w-full aspect-video bg-luxe-cream flex items-center justify-center cursor-pointer ${className}`}
        onClick={() => setShouldLoad(true)}
      >
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-luxe-roseGold"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <p className="text-luxe-black font-semibold">Cliquez pour charger la vidéo</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video bg-luxe-cream flex-shrink-0 ${className}`}>
      <iframe
        src={src}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title}
        loading="lazy"
      />
    </div>
  );
};

export default LazyVideo;

