'use client';

import React, { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      {products.length === 0 ? (
        <p>No products found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white shadow-md p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
