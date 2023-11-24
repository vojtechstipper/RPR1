import React from 'react';
import ProductList from './components/ProductList';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <h1>Vaše Aplikace</h1>
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;