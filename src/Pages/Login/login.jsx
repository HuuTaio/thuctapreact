import React from 'react';
import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div className='login'>
        
            <div>
  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-pic js-tilt" data-tilt>
          <img src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png" alt="IMG" />
        </div>
        <form className="login100-form validate-form">
          <span className="login100-form-title">
            Đăng nhập thành viên
          </span>
          <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            {/* input ở đây */}
            <input className="input100" type="text" name="email" placeholder="Email" />
           
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>

          </div>
          <div className="wrap-input100 validate-input" data-validate="Password is required">
            {/* input ở đây */}

            <input className="input100" type="password" name="pass" placeholder="Mật khẩu" />
            
            <span className="focus-input100" />      
            <span className="symbol-input100">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
          </div>
          <div className="container-login100-form-btn">
            {/* input ở đây */}
            <button className="login100-form-btn">
              Đăng nhập
            </button>
          </div>
          <div className="text-center p-t-12">
            <span className="txt1">
              Quên &nbsp;
            </span>
            <Link> Email  / Mật khẩu?</Link>         
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

        </div>
    );
};

export default Login;