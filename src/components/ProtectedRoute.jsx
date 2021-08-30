/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Route, withRouter,
} from 'react-router-dom';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { getLoggedInUser } from '../actions/UserActions';

const cookie = new Cookies();

// COMPONENT TO ENABLE ROUTES TO ONLY LOGGED IN USER
const ProtectedRoute = (props) => {
  const {
    allowAccess,
    userTypes,
    component,
    exact,
    history,
    path,
    render,
  } = props;
  const loggedUser = getLoggedInUser();

  useEffect(() => {
    if (
      (get(window, 'location.hostname', '').includes('localhost') || get(window, 'location.hostname', '').includes('192.168')) &&
      typeof cookie.get('token') === 'undefined' &&
      !window.localStorage.getItem('token')
    ) {
      history.push('/login');
    }
  }, [loggedUser]);

  if (allowAccess && userTypes && allowAccess !== userTypes) {
    return (<div />);
  }

  return (
    <>
      {
        get(loggedUser, 'data.id', null) && (
          <>
            {
              render ? (
                <Route path={path} exact={exact} render={() => render} />
              ) : (
                <Route path={path} exact={exact} component={component} />
              )
            }
          </>
        )
      }
    </>
  );
};

ProtectedRoute.propTypes = {
  allowAccess: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  exact: PropTypes.bool,
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  userTypes: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  allowAccess: false,
  component: null,
  userTypes: null,
  exact: false,
  render: null,
};

export default withRouter(ProtectedRoute);
