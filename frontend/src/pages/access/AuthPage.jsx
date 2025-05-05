import { useState } from "react";
import "./style.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    setSignUp(true);
    setSignIn(false);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    setSignIn(true);
    setSignUp(false);
  };

  const [signUpValues, setSignUpValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/register', signUpValues)
      .then(res => {
        if(res.data.Status === "Success"){
          setIsRightPanelActive(false);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }

  const [signInValues, setSignInValues] = useState({
    email: '',
    password: ''
  });
  axios.defaults.withCredentials = true;
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', signInValues)
      .then(res => {
        if(res.data.Status === "Success"){
          navigate('/');
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="box-border">
      <div className="bg-[#f6f5f7]
                      flex justify-center items-center flex-col
                      font-Montserrat
                      h-screen
                      -mt-5 mx-0 mb-[50px]">
        <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          <form className="auth-form" action="#" onSubmit={handleSignUpSubmit}>
            <h1 className="auth-h1">Create Account</h1>
            <div className="social-container">
              <a href="#" className="auth-a social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="auth-a social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="auth-a social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="auth-span">or use your email for registration</span>
            <input className="auth-input" type="text" placeholder="Name" onChange={e => setSignUpValues({...signUpValues, name: e.target.value})} />
            <input className="auth-input" type="email" placeholder="Email" onChange={e => setSignUpValues({...signUpValues, email: e.target.value})} />
            <input className="auth-input" type="password" placeholder="Password" onChange={e => setSignUpValues({...signUpValues, password: e.target.value})} />
            <button className="auth-button" type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form className="auth-form" action="#" onSubmit={handleSignInSubmit}>
            <h1 className="auth-h1">Sign in</h1>
            <div className="social-container">
              <a href="#" className="auth-a social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="auth-a social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="auth-a social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="auth-span">or use your account</span>
            <input className="auth-input" type="email" placeholder="Email" onChange={e => setSignInValues({...signInValues, email: e.target.value})} />
            <input className="auth-input" type="password" placeholder="Password" onChange={e => setSignInValues({...signInValues, password: e.target.value})} />
            <a className="auth-a" href="#">Forgot your password?</a>
            <button className="auth-button" type="submit">Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="auth-h1">Welcome Back!</h1>
              <p className="auth-p">To keep connected with us please login with your personal info</p>
              <button className="ghost auth-button" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="auth-h1">Hello, Friend!</h1>
              <p className="auth-p">Enter your personal details and start journey with us</p>
              <button className="ghost auth-button" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  );
};

export default AuthPage;
