'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setSuccess('');
      } else {
        setSuccess(data.message);
        setError('');
        router.push('/login');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
