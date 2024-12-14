import { useRef, useState } from 'react';
import { API_URL } from '@/redux/helpers/baseQuery';
import './styles.css';
import Iconify from '../iconify/Iconify';

export default function ImageSlider({ imgs, setCurrentImage }) {
  const containerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const isScrollEnabled = imgs.length > 4;

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    if (newScrollPosition < 0) {
      containerRef.current.scrollLeft = 0;
      return;
    }
    if (newScrollPosition >= containerRef.current.scrollWidth) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
      return;
    }
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <div className='container'>
      {isScrollEnabled && (
        <button className='action-btns' onClick={() => handleScroll(-200)}>
          <Iconify icon='iconamoon:arrow-left-2' />
        </button>
      )}

      <div
        ref={containerRef}
        style={{
          width: isScrollEnabled ? '75%' : '100%',
          overflowX: 'scroll',
          scrollBehavior: 'smooth',
        }}
      >
        <div
          className='content-box'
          style={{
            ...(!isScrollEnabled && {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          }}
        >
          {imgs.map((item, index) => (
            <div key={index} className='card'>
              <img
                src={API_URL + '/images/' + item.image_path}
                alt='product'
                onClick={() => setCurrentImage(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {isScrollEnabled && (
        <button className='action-btns' onClick={() => handleScroll(200)}>
          <Iconify icon='iconamoon:arrow-right-2' />
        </button>
      )}
    </div>
  );
}
