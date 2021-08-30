import React from 'react';
import { get } from 'lodash';
import { getLoggedInUser } from '../../actions/UserActions';

function App() {
  const loggedUser = getLoggedInUser();
  // console.log(loggeUser.data);
  return (
    <div className="bgLogin container-login100">
      <div className="wrap-login100 pt-4 pb-6">
        <span className="login100-form-title pb-5 mb-6">
          Account
        </span>
        <div
          className="login100-form validate-form pb-4 pt-1"
        >
          <div className="ta-c">
            <img
              className="brdCircle mt-6-neg"
              src={get(loggedUser, 'data.avatar', '')}
              alt="Avatar"
            />
          </div>
          {
            Object.keys(get(loggedUser, 'data', {})).map((key, i) => (
              <React.Fragment key={i.toString()}>
                {
                  key !== 'avatar' && (
                    <div
                      className="wrap-input100 validate-input"
                    >
                      <div className="px-2">
                        <span className="tt-c fweight-600">
                          {key.replace('_', ' ')}:
                        </span>
                        <span className="ml-1">{get(loggedUser, `data[${key}]`, '')}</span>
                      </div>
                    </div>
                  )
                }
              </React.Fragment>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default App;
