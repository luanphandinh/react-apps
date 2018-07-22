import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { ExplorePage } from './components/explore-page';
import { MovieDetail } from './components/movie-detail';

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
          <Route path="/detail/:id" component={MovieDetail} />
        </div>
      </Router>
    );
  }
}
