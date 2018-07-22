import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { Tictac } from './titac-app/titac.app';
import { MovieApp } from './apps/movie-app/movie.app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// import './styles/app.scss';

// ReactDOM.render(
//   <Tictac />,
//   document.getElementById('app'),
// );

ReactDOM.render(
  <MovieApp />,
  document.getElementById('app'),
);
