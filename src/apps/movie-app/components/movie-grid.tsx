import * as React from 'react';

import { MovieCard } from './movie-card';
import { Movie } from '../domains/movie';

export class MovieGrid extends React.Component<{ movies: Movie[] }, {}> {
  renderGrid() {
    const moviesCard = this.props.movies.map((movie: Movie) => {
      return <div key={movie.id} className="col-md-3"><MovieCard movie={movie} /></div>;
    });

    return <div className="row">{moviesCard}</div>;
  }

  render() {
    return (
      <div className="container">
        {this.renderGrid()}
      </div>
    );
  }
}
