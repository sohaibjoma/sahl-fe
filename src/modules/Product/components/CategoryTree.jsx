import { useState } from 'react';
import '../styles/tree.css';
import Iconify from '@/shared/components/iconify';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryTree = ({ data = [] }) => {
  return (
    <div className='d-tree'>
      <ul className='d-flex d-tree-container flex-column'>
        {data.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const isRTL = localStorage.getItem('language') === 'ar';
  const hasChild = node.children?.length > 0 ? true : false;
  const [childVisible, setChildVisiblity] = useState(false);

  return (
    <li className='d-tree-node border-0'>
      <div
        className='d-flex'
        onClick={(e) => {
          if (!hasChild) {
            return;
          }
          setChildVisiblity((v) => !v);
        }}
      >
        <Stack direction={'row'} spacing={2}>
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? 'active' : ''
            }`}
            style={{ cursor: hasChild && 'pointer' }}
          >
            <Iconify
              icon={'ic:baseline-keyboard-arrow-right'}
              sx={{ visibility: hasChild ? 'visible' : 'hidden' }}
            />
          </div>

          <div className='col'>
            <Link className='d-tree-label' href={`/product/c/${node.slug}`}>
              {isRTL ? node.name_ar : node.name_en}
            </Link>
          </div>
        </Stack>
      </div>

      {hasChild && childVisible && (
        <div className='d-tree-content'>
          <ul className='d-flex d-tree-container flex-column'>
            <CategoryTree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default CategoryTree;
