import { API_URL } from '@/redux/helpers/baseQuery';
import { useMemo, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import './styles.css';

function ImageMagnifier({ src, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => setIsLoaded(true);
  const handleMouseHover = (e) => {
    if (!isLoaded) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  const imageUrl = useMemo(() => `${API_URL}/images${src}`, [src]);

  return (
    <div
      className='img-magnifier-container'
      onMouseEnter={() => isLoaded && setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <Zoom>
        <img
          className='magnifier-img'
          src={imageUrl}
          alt={alt}
          onLoad={handleImageLoad}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </Zoom>

      {!isLoaded && (
        <div
          className='skeleton-loading'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
      )}

      {showMagnifier && isLoaded && (
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
            className='magnified-image'
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageMagnifier;