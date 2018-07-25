import * as React from 'react';
import { Route } from 'react-router-dom';

import { MovieDetail } from './pages/movie-detail';
import { ExplorePage } from './pages/explore-page';
import { ReviewPage } from './pages/review-page';

export const APP_ROUTES = [
  {
    path: '/explore',
    component: ExplorePage,
  },
  {
    path: '/detail/:id',
    component: MovieDetail,
    routes: [
      {
        path: '/detail/:id/reviews',
        component: ReviewPage,
      },
    ],
  },
];

export class RouteWithSubRoutes extends React.Component<{ route: any }, {}> {
  render() {
    const { route } = this.props;
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
}
