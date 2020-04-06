import api from '../services/api';

async function isAuthenticated(){
  const verification= await api.get('/auth');
  return verification.data;
}

export { isAuthenticated };