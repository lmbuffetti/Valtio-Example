import React, { useEffect, Lazy, Suspense } from 'react';
import { loggedInUser, getLoggedInUser } from '../../actions/UserActions';
import { Route, Switch } from 'react-router-dom';

function App() {
  const loggeUser = getLoggedInUser();
  console.log(loggeUser.data);
  return (
    <div>
      {JSON.stringify(loggeUser.data)}
    </div>
  );
}

export default App;
