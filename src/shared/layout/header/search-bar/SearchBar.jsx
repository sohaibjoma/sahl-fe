import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  colors,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import Colors from '../../../../theme/colors';
import { useLazyFetchProductsQuery } from '@/redux/apis/product';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const StyledSearch = styled(OutlinedInput)(({ theme }) => {
  const isRTL = localStorage.getItem('language') === 'ar';

  return {
    height: 50,
    width: 700,
    border: '1px solid #EEE',
    backgroundColor: '#FFFFFF',
    ...(isRTL && { paddingRight: 5 }),
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${alpha(theme.palette.grey[100], 0.32)} !important`,
    },
    input: {
      padding: '5px',
    },
  };
});

const MobileSearchOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: alpha(theme.palette.common.black, 0.75),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  padding: '.7rem',
}));

const SearchBar = ({ t, isMobile, HEADER_DESKTOP }) => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const isRTL = localStorage.getItem('language') === 'ar';

  const [fetchProductsWithCategory, { data: result, isFetching }] =
    useLazyFetchProductsQuery();

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    fetchProductsWithCategory({
      filters: [{ id: 'search', value: e.target.value }],
    });
  };

  const searchBar = (
    <StyledSearch
      placeholder={t('search')}
      onFocus={() => setIsFocused(true)}
      onChange={handleOnChange}
      value={search}
      startAdornment={
        <InputAdornment position='start'>
          <Iconify
            icon='eva:search-fill'
            sx={{
              width: 20,
              height: 20,
              color: colors.grey[600],
            }}
          />
        </InputAdornment>
      }
      endAdornment={
        isFocused && (
          <InputAdornment position={isRTL ? 'start' : 'end'}>
            <Iconify
              icon='eva:close-circle-outline'
              onClick={() => {
                setIsFocused(false);
                setSearch('');
              }}
              sx={{
                width: 20,
                height: 20,
                color: colors.grey[600],
                cursor: 'pointer',
              }}
            />
          </InputAdornment>
        )
      }
      sx={{
        ...(isFocused && {
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }),
      }}
    />
  );

  const searchingPopup = (
    <div
      style={{
        width: 700,
        position: 'absolute',
        backgroundColor: Colors.offWhite,
        color: Colors.black,
        padding: '0.5rem',
        borderBottomRightRadius: '6px',
        borderBottomLeftRadius: '6px',
        boxShadow: '0 8px 16px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
      }}
    >
      {search.length > 0 ? (
        isFetching ? (
          <div>{t('searching')}</div>
        ) : result?.data?.length > 0 ? (
          <>
            {result?.data?.slice(0, 3).map((product) => (
              <a
                key={product.id}
                href={`/product/${product.slug}`}
                className='search-result-item'
              >
                <div>
                  <span className='material-symbols-rounded'>category</span>
                  {isRTL ? product.name_ar : product.name_en}
                </div>
                <span className='material-symbols-rounded'>
                  {isRTL ? 'chevron_left' : 'chevron_right'}
                </span>
              </a>
            ))}
            <Link to={`/product/s/${search}`} className='search-result-item'>
              {t('allResults')}
            </Link>
          </>
        ) : (
          <div>{t('noResults')}</div>
        )
      ) : (
        <div>{t('writeToSearch')}</div>
      )}
    </div>
  );

  const mobileSearchBar = (
    <MobileSearchOverlay>
      <div
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <StyledSearch
          autoFocus
          placeholder={t('search')}
          onChange={handleOnChange}
          onFocus={() => setIsFocused(true)}
          value={search}
          startAdornment={
            <InputAdornment position='start'>
              <Iconify
                icon='eva:search-fill'
                sx={{
                  width: 20,
                  height: 20,
                  color: colors.grey[600],
                }}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <Iconify
                icon='eva:close-circle-outline'
                onClick={() => {
                  setIsFocused(false);
                  setIsIconClicked(false);
                  setSearch('');
                }}
                sx={{
                  width: 20,
                  height: 20,
                  color: colors.grey[600],
                  cursor: 'pointer',
                }}
              />
            </InputAdornment>
          }
          sx={{
            width: '350px',
            padding: 0,
            ...(search.length > 0 && {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }),
          }}
        />
        {search.length > 0 && (
          <div
            style={{
              backgroundColor: Colors.offWhite,
              color: Colors.black,
              padding: '0.5rem',
              borderBottomRightRadius: '6px',
              borderBottomLeftRadius: '6px',
              boxShadow: '0 8px 16px 4px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '100%',
              width: '350px',
              zIndex: 9999,
            }}
          >
            {isFetching ? (
              <div>{t('searching')}</div>
            ) : result?.data?.length > 0 ? (
              <>
                {result?.data?.slice(0, 3).map((product) => (
                  <a
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className='search-result-item'
                  >
                    <div>
                      <span className='material-symbols-rounded'>category</span>
                      {isRTL ? product.name_ar : product.name_en}
                    </div>
                    <span className='material-symbols-rounded'>
                      {isRTL ? 'chevron_left' : 'chevron_right'}
                    </span>
                  </a>
                ))}
                <Link
                  to={`/product/s/${search}`}
                  className='search-result-item'
                  onClick={() => {
                    setSearch('');
                    setIsFocused(false);
                    setIsIconClicked(false);
                  }}
                >
                  {t('allResults')}
                </Link>
              </>
            ) : (
              <div>{t('noResults')}</div>
            )}
          </div>
        )}
      </div>
    </MobileSearchOverlay>
  );

  return isMobile ? (
    <>
      <IconButton
        aria-label='search'
        onClick={() => setIsIconClicked(true)}
        sx={{ padding: 0 }}
      >
        <Iconify
          width={28}
          height={28}
          icon='eva:search-fill'
          sx={{
            color: '#2F2019',
          }}
        />
      </IconButton>
      {isIconClicked && mobileSearchBar}
    </>
  ) : (
    <div>
      {searchBar}
      {isFocused && searchingPopup}
    </div>
  );
};

export default SearchBar;
