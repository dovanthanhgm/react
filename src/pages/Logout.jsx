import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthProvider'

function Logout() {
  const navigate = useNavigate();
  const user = useAuth();
  useEffect(() => {
    user.logoutUser()
    navigate('/');
  }, [navigate]);

  return null;
}

export default Logout;
