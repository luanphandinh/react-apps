import * as React from 'react';

import { ExplorePage } from './components/explore-page';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

export class MovieApp extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/explore" />}
          />
          <Route path="/explore" component={ExplorePage} />
        </div>
      </Router>
    );
  }
}
