import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Welcome() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const SLIDES = [
    {
      title: 'Welcome to Flare AI',
      description:
        'Your skin has a story—and Flare AI helps you understand it better. We combine science, environment data, and your daily inputs to predict flare-ups before they happen.',
    },
    {
      title: 'Why This Matters',
      description:
        'No more guessing games. By tracking your lifestyle, weather triggers, and skin patterns, Flare AI delivers insights you can act on. Our goal: prevent flare-ups, not just react to them.',
    },
    {
      title: 'Let’s Talk Permissions',
      description:
        'To work its magic, Flare AI needs:\n\n' +
        '📍 Location – track UV & pollen alerts\n' +
        '📸 Camera – optional skin analysis\n' +
        '🗂 Files – store your photos securely\n' +
        '📡 Data – minimal, private, only what helps predictions',
    },
  ];

  const goToNextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/onboarding');
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      goToNextSlide();
    } else if (event.key === 'ArrowLeft') {
      goToPrevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #EAD7C0 0%, #F5E6D3 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        '--primary-color': '#5C4033',
        '--accent-color': '#8C5C3A',
        '--text-color': '#2E2C29',
        '--secondary-text': '#6B5B4B',
        '--secondary-bg': '#E6D5C3',
        '--dot-inactive': '#C8B9A6',
      }}
      role="main"
      aria-label="Welcome to Flare AI onboarding"
    >
      <Head>
        <title>Welcome | Flare AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#5C4033" />
        <meta name="description" content="Flare AI: Your personal skin health radar" />
        <link rel="apple-touch-icon" href="/flare-logo.png" />
      </Head>

      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          position: 'relative',
          padding: '1.25rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            width: '100%',
            maxWidth: '336px',
            height: 'calc(100% - 1.5rem)',
            backgroundColor: 'var(--secondary-bg)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '360px',
            padding: '1.5rem',
            backgroundColor: '#FAF7F2',
            borderRadius: '14px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            animation: 'scaleIn 0.5s ease-in-out',
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '220px',
              overflow: 'hidden',
            }}
          >
            {SLIDES.map((slide, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  padding: '1.5rem',
                  boxSizing: 'border-box',
                  opacity: currentSlide === index ? 1 : 0,
                  transform: `translateX(${
                    currentSlide === index ? '0' : currentSlide > index ? '-100%' : '100%'
                  })`,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  pointerEvents: currentSlide === index ? 'auto' : 'none',
                }}
              >
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: 'var(--text-color)',
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--secondary-text)',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1.25rem 0',
              gap: '8px',
            }}
          >
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentSlide === index ? 'var(--primary-color)' : 'var(--dot-inactive)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.25rem',
            }}
          >
            <button
              style={{
                fontSize: '0.95rem',
                color: '#FFFFFF',
                backgroundColor: currentSlide === 0 ? '#D6C6B8' : 'var(--primary-color)',
                border: 'none',
                borderRadius: '6px',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                minWidth: '80px',
                padding: '0.6rem',
                touchAction: 'manipulation',
                zIndex: 3,
                transition: 'transform 0.2s, background-color 0.3s',
              }}
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Previous
            </button>

            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--secondary-text)',
              }}
            >
              Step {currentSlide + 1} / {SLIDES.length}
            </span>

            <button
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#FFFFFF',
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                minWidth: '80px',
                touchAction: 'manipulation',
                transition: 'transform 0.2s, background-color 0.3s',
              }}
              onClick={goToNextSlide}
              aria-label={currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next slide'}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        button:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}