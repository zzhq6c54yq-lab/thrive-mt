import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CrisisResources() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/crisis-support', { replace: true });
  }, [navigate]);

  return null;
}
