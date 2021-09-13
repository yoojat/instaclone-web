import React from 'react';
import { useHistory } from 'react-router';
import { logUserOut } from '../apollo';

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome we did it!</h1>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
