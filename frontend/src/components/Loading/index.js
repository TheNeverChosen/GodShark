import React from 'react';

import loadingSvg from '../../assets/loading.svg';
import './styles.css';

export default function Loading(){

  return (
    <div className='container'>
      <img src={loadingSvg} alt='Loading spinner'/>
    </div>
  );

}