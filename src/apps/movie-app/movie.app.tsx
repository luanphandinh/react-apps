import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { APP_ROUTES, RouteWithSubRoutes } from './routes.config';

export class MovieApp extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          {APP_ROUTES.map((route, i) => <RouteWithSubRoutes key={i} route={{ ...route }} />)}
        </div>
      </Router>
    );
  }
}
