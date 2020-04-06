import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiUserPlus, FiUsers } from 'react-icons/fi';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Header from '../../components/Header';
import api from '../../services/api';
import { passwordReg, usernameReg } from '../../utils/regex';

import './styles.css';

export default function SignIn(){
  
  const history=useHistory();

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    username: Yup.string()
      .min(3, 'Min 3 characters')
      .max(25, 'Max 25 characters')
      .matches(usernameReg, 'Username can only have letters, numbers and the characters \'-\' and \'_\''),
    password: Yup.string()
      .min(8, 'Min 8 characters')
      .max(70, 'Max 70 characters')
      .matches(passwordReg, 'Password should have 1 lowercase letter, 1 uppercase letter and 1 number')
  });
    
  function handleSubmit(values){
    values = {...values, type:'normal', photo_url:''};
    api.post('/user', values)
      .then(resp =>{
        alert('Account Created.');
        history.push('/signin');
      }).catch( err=>{
        alert('Fail in account creation.');
      });
  }
    
  return (
    <>
      <Header />
      <div className='signup-container'>
        <div className='content'>
          <div className='block'>
            <h1>Sign Up</h1>
            <p>Don't you have an account? Fill the fields to create one</p>
            <p>If you do, Sign In now:</p>
              <Link to='/signup' className='button'>
                <FiUsers size={18} color='white'/>
                Sign in account
              </Link>
          </div>
          
          <div className='block'>
            <Formik
              initialValues={{name:'', email:'', username:'', password:''}}
              onSubmit={handleSubmit}
              validationSchema={SignupSchema}
            >
              <Form className='form'>

                <label htmlFor='name'>Name</label>
                <Field id='name' name='name' type='text' required autoFocus='autofocus' />
                <ErrorMessage className='error-message' name='name' component='span'/>

                <label htmlFor='email'>Email</label>
                <Field id='email' name='email' type='email' required />
                <ErrorMessage className='error-message' name='email' component='span'/>

                <label htmlFor='username'>Username</label>
                <Field id='username' name='username' type='text' required />
                <ErrorMessage className='error-message' name='username' component='span'/>
                
                <label htmlFor='password'>Password</label>
                <Field id='password' name='password' type='password' required />
                <ErrorMessage className='error-message' name='password' component='span'/>
                
                <button type='submit' className='button'>
                  <FiUserPlus size={18} color='white' />
                  Sign Up
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}