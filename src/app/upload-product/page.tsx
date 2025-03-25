'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UploadProductPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setSuccess('');
      } else {
        setSuccess(data.message);
        setError('');
        router.push('/products'); // Redirect to product list after upload
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Upload Product</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProductPage;
