import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import './styles.css';

function ImageMagnifier({ imgUrl, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleMouseHover = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <div
      className='img-magnifier-container'
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
      style={{
        borderRadius: '8px',
        boxShadow: '0 0 8px 0 rgba(0,0,0,0.1)',
      }}
    >
      <Zoom>
        <img
          loading='lazy'
          className='magnifier-img'
          src={imgUrl}
          alt={alt}
          onLoad={handleImageLoad}
          style={{
            display: isLoaded ? 'block' : 'none',
          }}
        />
      </Zoom>

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            left: `${cursorPosition.x - 100}px`,
            top: `${cursorPosition.y - 100}px`,
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          <div
            className='magnifier-image'
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageMagnifier;
