import React, { memo } from 'react';

// Child memo component
const UserProfile = memo(({ name, email }:{name:string,email:string})=> {
  console.log('UserProfile 1 rendered'); 
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});

// Child simple component
const UserProfile2 = ({ name, email }:{name:string,email:string})=> {
  console.log('UserProfile 2 rendered'); 
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// Parent component
function UserList() {
  const [users] = React.useState([
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Sarah', email: 'sarah@example.com' },
    { id: 3, name: 'tommy', email: 'tommy@example.com' }
  ]);
  const [count, setCount] = React.useState(0);
  console.log('Parent rendered'); 
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Re-render Parent ({count})
      </button>
      
      {users.map(user => (
        <UserProfile 
          key={user.id}
          name={user.name} 
          email={user.email} 
        />
      ))}
      {users.map(user => (
        <UserProfile2 
          key={user.id}
          name={user.name} 
          email={user.email} 
        />
      ))}
    </div>
  );
}

export default UserList