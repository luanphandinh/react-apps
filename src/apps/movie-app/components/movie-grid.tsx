import * as React from 'react';

import { MovieCard } from './movie-card';
import { Movie } from '../domains/movie';

export class MovieGrid extends React.Component<{ movies: Movie[], onClickItem: (id: number) => void }, {}> {
  renderGrid() {
    const { movies, onClickItem } = this.props;
    const moviesCard = movies.map((movie: Movie) => {
      return (
        <div key={movie.id} className="col-md-3 col-6 movie-card">
          <MovieCard movie={movie}
            onClick={() => onClickItem(movie.id)}
          />
        </div>
      );
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
