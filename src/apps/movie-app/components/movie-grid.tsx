import * as React from 'react';

import { MovieCard } from './movie-card';
import { Movie } from '../domains/movie';

export class MovieGrid extends React.Component<{}, {}> {

  movies: Movie[] = [
    Movie.createFromResponse({
      id: 'id',
      voteCount: 'voteCount',
      video: 'video',
      voteAverage: 'voteAverage',
      title: 'title',
      popularity: 'popularity',
      posterPath: 'posterPath',
      originalLanguage: 'originalLanguage',
      originalTitle: 'originalTitle',
      backdropPath: 'backdropPath',
      adult: 'adult',
      overview: 'overview',
      releaseDate: 'releaseDate',
    }),
    Movie.createFromResponse({
      id: 'id 2',
      voteCount: 'voteCount 2',
      video: 'video 2',
      voteAverage: 'voteAverage 2',
      title: 'title 2',
      popularity: 'popularity 2',
      posterPath: 'posterPath 2',
      originalLanguage: 'originalLanguage 2',
      originalTitle: 'originalTitle 2',
      backdropPath: 'backdropPath 2',
      adult: 'adult 2',
      overview: 'overview 2',
      releaseDate: 'releaseDate 2',
    }),
  ];

  onClickCard() {
    alert('card clicked');
  }

  renderGrid() {
    const moviesCard = this.movies.map((movie: Movie) => {
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
