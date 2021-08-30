import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getLoggedInUser } from '../actions/UserActions';
import LogoImg from '../assets/images/logo.svg';

function Header(props) {
  const {
    history,
  } = props;
  const loggedUser = getLoggedInUser();

  return (
    <header className="mainHeader">
      <div className="container">
        <div className="dis-f a-c jc-b py-2">
          <img
            className="cur-poi"
            onClick={() => history.push('/')}
            src={LogoImg}
            width={60}
            alt="Logo Test Valtio Example"
          />
          <div
            className="headerAccount dis-f a-c cur-poi"
            onClick={() => history.push('/account')}
          >
            <span className="mr-2 dis-b">{get(loggedUser, 'data.first_name', '')}</span>
            <img
              className="brdCircle"
              src={get(loggedUser, 'data.avatar', '')}
              alt={`${get(loggedUser, 'data.name', '')} Avatar`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
