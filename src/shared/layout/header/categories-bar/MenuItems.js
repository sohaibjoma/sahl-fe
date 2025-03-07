import { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import './styles.css';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

const MenuItems = ({ category }) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const isRTL = localStorage.getItem('language') === 'ar';

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      ref={ref}
      className='menu-items'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {category?.children?.length > 0 ? (
        <>
          <NavLink
            to={`/product/c/${category.slug}`}
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {isRTL ? category.name_ar : category.name_en}
            <Icon
              icon='heroicons:chevron-down'
              width={20}
              height={20}
              style={{
                transition: 'transform 0.3s',
                transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </NavLink>
          <Dropdown submenus={category?.children} dropdown={dropdown} />
        </>
      ) : (
        <NavLink
          to={`/product/c/${category.slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isRTL ? category?.name_ar : category?.name_en}
          <Icon
            icon='heroicons:chevron-down'
            width={20}
            height={20}
            style={{ display: 'none' }}
          />
        </NavLink>
      )}
    </li>
  );
};

export default MenuItems;
