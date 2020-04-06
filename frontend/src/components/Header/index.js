import React from 'react';

import { Link } from 'react-router-dom'

import logo from '../../assets/shark.png';
import './styles.css';

export default function Header(){

  return (
    <div className='header'>
      <Link className='header-link' to='/'>
        <span>GodShark</span>
        <img src={logo} alt='GodShark Logo'/>
      </Link>
    </div>
  );

}