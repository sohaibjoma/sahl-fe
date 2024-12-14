import { useSelector } from 'react-redux';
import MenuItems from './MenuItems';
import { homeSelector } from '../../../../modules/Home/state';
import './styles.css';

const CategoriesBar = () => {
  const { categories } = useSelector(homeSelector);

  return (
    <div className='nav-area'>
      <ul className='menus'>
        {categories.map((category, index) => {
          return <MenuItems key={index} category={category} />;
        })}
      </ul>
    </div>
  );
};

export default CategoriesBar;
