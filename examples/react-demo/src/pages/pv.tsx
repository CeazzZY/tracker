import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pv() {
  const navigate = useNavigate();
  return (
    <div>
      <div>pv</div>
      <div onClick={() => navigate('/')}>back</div>
    </div>
  );
}
