import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';

import { isAuthenticated } from '../../utils/auth';

import InternalError from '../../pages/InternalError';
import Loading from '../Loading';

export default function PrivateRoute({component: Component, ...rest}){
  const [data, setData]=useState({fetched: false});

  useEffect(()=>{
    async function verify(){
      let res;
      try{
        res={fetched: true, ...await isAuthenticated()};
      } catch(err){
        res={fetched: true, err};
      }
      
      setData(res);
    }
    verify();
  }, []);

  return(
    <Route {...rest}
      render={props=>{
        if(!data.fetched) return (<Loading />);
        else if(data.err) return (<InternalError />)
        else if(data.verified) return (<Component props />);
        else return (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  );
};