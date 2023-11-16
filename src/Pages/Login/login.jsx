import React, { useState, useEffect } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firebase.firestore(), 'users'), (snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsersList(usersList);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided email and password match any user in the ListUser data
    const userToLogin = usersList.find(
      (user) => user.email === email && user.password === password
    );

    if (userToLogin) {
      // If the user is found, simulate successful login
      navigate('/listuser');
    } else {
      // If the user is not found, simulate login failure
      alert('Đăng nhập thất bại sai email hoặc mật khẩu vui lòng nhập lại !');
    }
  };

  return (
    <div className="login">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="IMG" />
            </div>
            <form className="login100-form validate-form">
              <span className="login100-form-title">Đăng nhập thành viên</span>
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true" />
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true" />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button onClick={handleLogin} className="login100-form-btn" type="submit">
                  Đăng nhập
                </button>
              </div>
              <div className="text-center p-t-12">
                <span className="txt1">Quên &nbsp;</span>
                <Link to="/forgot-password">Email / Mật khẩu?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
