import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import Header from '../components/Header';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    companyEmail: '',
    password: ''
  });

  const { companyEmail, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(companyEmail, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  // else if (!isAuthenticated){
  //   return <Navigate to="/about" />;
  // }

  return (
    <div className="login">
            <Header/>
            <form onSubmit={onSubmit}>
                <h3>Login To Account</h3>
                <input
                    type="text" 
                    placeholder="Email"
                    id="username" 
                    name="companyEmail"
                    value={companyEmail}
                    onChange={onChange}
                />
                
                <input
                    type="password" 
                    placeholder="password"
                    id="password" 
                    name="password"
                    value={password}
                    onChange={onChange}
                />
                
                <input type="submit" className='login-button' value="Login" />
                <center>
                <p style={{"marginTop":"40px", "color":"#555"}}>&#xA9; O'mesh Nigeria Limited</p>
                </center>
                
                
            </form>
        </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);





















