import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { MovieCard } from './movie-card';
import { Movie } from '../domains/movie';

export class MovieGrid extends React.Component<{ movies: Movie[], history?: any }, {}> {

  onClickItem(id: number) {
    console.log('click grid item');
    this.props.history.push(`/detail/${id}`);
  }

  renderGrid() {
    const moviesCard = this.props.movies.map((movie: Movie) => {
      return (
        <div key={movie.id} className="col-md-3">
          <MovieCard movie={movie}
            onClick={() => this.onClickItem(movie.id)}
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
