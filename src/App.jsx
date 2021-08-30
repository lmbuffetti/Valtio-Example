import React, { useEffect, lazy, Suspense } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { getUser } from './actions/UserActions';
import ProtectedRoute from './components/ProtectedRoute';

const Account = lazy(() => import('./Pages/Account/Account'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Account/Login'));
const Header = lazy(() => import('./components/Header'));

const cookie = new Cookies();

function App(props) {
  const {
    history,
  } = props;

  useEffect(() => {
    if (cookie.get('token')) getUser();
    else history.push('/login');
  }, []);

  return (
    <div>
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <Suspense fallback="Loading...">
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Suspense>
    </div>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
