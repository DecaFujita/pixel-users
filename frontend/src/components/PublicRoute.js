import React from "react";
import { Route, Redirect } from 'react-router-dom';

function PublicRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => !authed 
          ? <Component {...props} />
          : <Redirect to={'/'} />}
      />
    )
  }

export default PublicRoute;