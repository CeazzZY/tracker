import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate('/err', { replace: true })}>to err</div>
      <div onClick={() => navigate('/pv')}>to pv</div>
    </div>
  );
}
