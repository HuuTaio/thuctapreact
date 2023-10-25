import React from 'react';
import "../assets/css/login.css";

const Login = () => {
    return (
        <div>
            <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
  {/*---- Include the above in your HEAD tag --------*/}
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
            <input className="input100" type="text" name="email" placeholder="Email" />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </div>
          <div className="wrap-input100 validate-input" data-validate="Password is required">
            <input className="input100" type="password" name="pass" placeholder="Mật khẩu" />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">
              Đăng nhập
            </button>
          </div>
          <div className="text-center p-t-12">
            <span className="txt1">
              Quên &nbsp;
            </span>
            <a className="txt2" href="#">
               Email  / Mật khẩu?
            </a>
          </div>
          <div className="text-center p-t-136">
            <a className="txt2" href="#">
              Tạo tài khoản của bạn
              <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
            </a>
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