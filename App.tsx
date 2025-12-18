import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TextToImage from './pages/TextToImage';
import ImageToImage from './pages/ImageToImage';
import ImageEnhance from './pages/ImageEnhance';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="text-to-image" element={<TextToImage />} />
          <Route path="image-to-image" element={<ImageToImage />} />
          <Route path="enhance" element={<ImageEnhance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;