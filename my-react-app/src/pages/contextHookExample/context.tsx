import { useContext } from 'react';
import { UserContext } from './userContext';

function Context() {
  const role = useContext(UserContext);
  return <p>Hello, {role}!</p>;
}

export default Context;