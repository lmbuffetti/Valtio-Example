import React from 'react';
import { withRouter } from 'react-router-dom';

function Home() {
  return (
    <div className="pt-20 container">
      <h1>Home</h1>

      <p className="mt-5">
        This is a demo of simple APP with the integration of fakeAPI, axios and Valtio
      </p>
    </div>
  );
}

export default withRouter(Home);
