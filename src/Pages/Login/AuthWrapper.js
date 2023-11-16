import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        navigate('/login');
      } else {
        // Nếu người dùng đã đăng nhập, chuyển hướng đến trang chủ
        navigate('/listuser');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default AuthWrapper;
