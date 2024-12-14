import { NavLink } from 'react-router-dom';
import './styles.css';

const Dropdown = ({ submenus, dropdown }) => {
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <ul className={`dropdown dropdown-submenu ${dropdown ? 'show' : ''}`}>
      {submenus?.map((submenu, index) => {
        return (
          <NavLink key={index} to={`/product/c/${submenu.slug}`} type='button'>
            {isRTL ? submenu?.name_ar : submenu?.name_en}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default Dropdown;
