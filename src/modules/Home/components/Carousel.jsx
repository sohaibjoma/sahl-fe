import { useEffect, useState } from 'react';
import Colors from '../../../theme/colors';
import Iconify from '@/shared/components/iconify/Iconify';

export default function Carousel({ images, isAuto = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  const slideStyles = {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${images[currentIndex].url})`,
  };

  const leftArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '32px',
    fontSize: '45px',
    color: Colors.white,
    zIndex: '1',
    cursor: 'pointer',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2019',
    borderRadius: '50%',
  };

  const rightArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '32px',
    fontSize: '45px',
    color: Colors.white,
    zIndex: '1',
    cursor: 'pointer',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2019',
    borderRadius: '50%',
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const dotsContainerStyles = {
    display: 'flex',
    marginTop: '5px',
    justifyContent: 'center',
  };

  const goToPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isAuto) {
      intervalId = setInterval(() => {
        goToNext();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, isAuto]);

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrev}>
        <Iconify icon='bi:chevron-left' />
      </div>

      <div style={rightArrowStyles} onClick={goToNext}>
        <Iconify icon='bi:chevron-right' />
      </div>

      <div style={slideStyles}></div>

      <div style={dotsContainerStyles}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              margin: '0 3px',
              cursor: 'pointer',
              color:
                currentIndex === index ? Colors.lightBrown : Colors.lightBeige,
            }}
            onClick={() => goToSlide(index)}
          >
            <Iconify icon='bi:circle-fill' width={10} height={10} />
          </div>
        ))}
      </div>
    </div>
  );
}
