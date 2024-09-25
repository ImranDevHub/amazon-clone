import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../DataProvider/DataProvider';

function ProtectRoute({ children, redirect, msg }) {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const { state, dispatch } = context;
  const { user } = state;
  useEffect(() => {
    if (!user) navigate('/auth', { state: { msg, redirect } });
  }, [user, navigate, redirect, msg]);
  return <>{children}</>;
}

export default ProtectRoute;
