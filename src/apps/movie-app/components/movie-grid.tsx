import * as React from 'react';

import { MovieCard } from './movie-card';
import { Movie } from '../domains/movie';

export class MovieGrid extends React.Component<{}, {}> {

  movies: Movie[] = [
    Movie.createFromResponse({
      id: 'id',
      vote_count: 'voteCount',
      video: 'video',
      vote_average: '10',
      title: 'Star war',
      popularity: 'popularity',
      poster_path: '/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
      original_language: 'originalLanguage',
      original_title: 'originalTitle',
      backdrop_path: 'backdropPath',
      adult: 'adult',
      overview: 'overview',
      release_date: 'releaseDate',
    }),
    Movie.createFromResponse({
      id: 'id 2',
      vote_count: 'voteCount 2',
      video: 'video 2',
      vote_average: '10',
      title: 'Thor Ragnarok 2',
      popularity: 'popularity 2',
      poster_path: '/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
      original_language: 'originalLanguage 2',
      original_title: 'originalTitle 2',
      backdrop_path: 'backdropPath 2',
      adult: 'adult 2',
      overview: 'overview 2',
      release_date: 'releaseDate 2',
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
