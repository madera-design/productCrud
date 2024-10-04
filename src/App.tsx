import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListView from './views/ProductListView';
import ProductFormView from './views/ProductFormView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">CRUD de productos</h1>
          <Routes>
            <Route path="/" element={<ProductListView />} />
            <Route path="/create" element={<ProductFormView />} />
            <Route path="/edit/:id" element={<ProductFormView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;