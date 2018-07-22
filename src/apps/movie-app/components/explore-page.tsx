import * as React from 'react';

import { MovieGrid } from './movie-grid';
import { Movie } from '../domains/movie';
import { API_KEY } from '../domains/api';

import { HttpClient } from 'lupa/utils/http-client';

export class ExplorePage extends React.Component<{}, { movies: Movie[] }> {

  movies: Movie[] = [];

  onClickCard() {
    alert('card clicked');
  }

  constructor(props: any) {
    super(props);
    this.state = {
      movies: this.movies,
    };
  }

  componentDidMount() {
    const endpoint = 'https://api.themoviedb.org/3/discover/movie';
    const option = {
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
      api_key: API_KEY,
    };
    HttpClient.getInstance().fetch(endpoint, option)
      .then((data: any) => this.onGetMoviesDone(data))
      .catch();

  }

  onGetMoviesDone(data: any) {
    data.results.forEach((result: any) => {
      const movie = Movie.createFromResponse(result);
      this.movies.push(movie);
    });
    this.setState({ movies: [...this.movies] });
  }

  render() {
    return <MovieGrid movies={this.state.movies}/>;
  }
}
