import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiUserPlus } from 'react-icons/fi';

import { Formik, Form, Field } from 'formik';

import Header from '../../components/Header';
import api from '../../services/api';

import './styles.css';

export default function SignIn(){
  
  const history=useHistory();

  function handleSubmit(values){
    console.log('handle');
    api.post('/auth', values)
      .then(resp =>{
        alert('Successful Sign in.');
        history.push('/');
      }).catch( err=>{
        alert('Sign failed.');
      });
  }

  return (
    <>
      <Header />
      <div className='signin-container'>
        <div className='content'>
          <div className='block'>
            <h1>Sign In</h1>
            <p>Do you have an account? Fill the fields to continue</p>
            <p>If you don't, create now:</p>
              <Link to='/signup' className='button'>
                <FiUserPlus size={18} color='white'/>
                Create Account
              </Link>
          </div>

          <div className='block'>
            <Formik
              initialValues={{logger:'', password:''}}
              onSubmit={handleSubmit}
            >
              <Form className='form'>
                <label htmlFor='logger'>Username or email</label>
                <Field id='logger' name='logger' type='text' required autoFocus='autofocus' />
                <label htmlFor='password'>Password</label>
                <Field id='password' name='password' type='password' required />
                <button type='submit' className='button'>
                  Sign In
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}