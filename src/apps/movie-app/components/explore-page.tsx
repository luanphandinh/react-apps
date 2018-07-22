import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';
import * as InfiniteScroll from 'react-infinite-scroller';

import { MovieGrid } from './movie-grid';
import { Movie } from '../domains/movie';
import { API_KEY } from '../domains/api';

interface ExplorePageState {
  movies: Movie[];
}
export class ExplorePage extends React.Component<{}, ExplorePageState> {

  movies: Movie[] = [];
  fetching: boolean;
  fetchOptions = {
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
    page: 1,
    api_key: API_KEY,
  };

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
    this.fetchMovies();
  }

  fetchMovies() {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    const endpoint = 'https://api.themoviedb.org/3/discover/movie';

    HttpClient.getInstance().fetch(endpoint, this.fetchOptions)
      .then((data: any) => this.onFetchMoviesDone(data))
      .catch();
  }

  onFetchMoviesDone(data: any) {
    data.results.forEach((result: any) => {
      const movie = Movie.createFromResponse(result);
      this.movies.push(movie);
    });
    this.setState({ movies: [...this.movies] });
    this.fetchOptions.page += 1;
    this.fetching = false;
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => this.fetchMovies()}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <MovieGrid movies={this.state.movies}/>;
      </InfiniteScroll>
    );
  }
}
