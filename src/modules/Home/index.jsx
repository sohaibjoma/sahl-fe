import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';

export default function HomeRoot() {
  return (
    <>
      <Helmet>
        <title>Sahl Furniture</title>
      </Helmet>

      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  );
}
