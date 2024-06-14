import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Login() {

  const location = useLocation()

  console.log(location)

  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
