import React, { useEffect, lazy, Suspense } from 'react';
import { loggedInUser, getLoggedInUser } from './actions/UserActions';
import { Route, Switch } from 'react-router-dom';

const Account = lazy(() => import('./Pages/Account/Account'));

function App() {
  useEffect(() => {
    loggedInUser();
  }, []);

  return (
    <div>
      <header>
      </header>
      <Suspense fallback={"Loading..."}>
        <Switch>
          <Route path="/account" component={Account} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
