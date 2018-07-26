import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';
import { RouteComponentProps } from 'react-router-dom';
import * as InfiniteScroll from 'react-infinite-scroller';

import { Grid } from 'lupa/components/grid';
import { Movie } from '../domains/movie';
import { MovieCard } from '../components/movie-card';
import { DEFAULT_FETCH_OPTION } from '../domains/api';

interface ExplorePageProps extends RouteComponentProps<any>, React.Props<any> { }
interface ExplorePageState {
  movies: Movie[];
}
export class ExplorePage extends React.Component<ExplorePageProps, ExplorePageState> {

  movies: Movie[] = [];
  fetching: boolean;
  fetchOptions = DEFAULT_FETCH_OPTION;

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

  componentWillUnmount() {
    this.fetchOptions.page = 1;
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

  onClickItem(id: number) {
    this.props.history.push(`/detail/${id}/reviews`);
  }

  renderGrid() {
    const { movies } = this.state;
    const moviesCard = movies
      .map((movie: Movie) => <MovieCard key={movie.id} movie={movie} onClick={() => this.onClickItem(movie.id)}/>);

    return <div className="container"><Grid items={moviesCard}/></div>;
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => this.fetchMovies()}
        hasMore={true || false}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {this.renderGrid()}
      </InfiniteScroll>
    );
  }
}
