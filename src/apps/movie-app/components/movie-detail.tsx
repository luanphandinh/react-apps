import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';
import { LupaNavbar } from 'lupa/components/navbar';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Movie } from '../domains/movie';
import { Genre } from '../domains/genre';
import { API_KEY } from '../domains/api';

import '../styles/movie-detail.scss';

interface MovieDetailPageProps extends RouteComponentProps<any>, React.Props<any> { }

interface MovieDetailState {
  movie: Movie;
}
export class MovieDetail extends React.Component<MovieDetailPageProps, MovieDetailState> {

  fetching: boolean;
  fetchOptions = {
    api_key: API_KEY,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie() {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    const endpoint = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}`;

    HttpClient.getInstance().fetch(endpoint, this.fetchOptions)
      .then((data: any) => this.onFetchMovieDone(data))
      .catch();
  }

  onFetchMovieDone(data: any) {
    const movie = Movie.createMovieDetailFromResponse(data);
    this.setState({ movie });
    this.fetching = false;
  }

  renderTitle(movie: Movie) {
    if (!movie.title) {
      return;
    }
    return (
      <div className="header__content-title">
        {movie.title}
        <span className="text-md ml-2">Relase date : {movie.releaseDate}</span>
      </div>
    );
  }

  renderPlayTrailerButton(movie: Movie) {
    return (
      <div className="header__content-btn-play has-cursor">
        <i className="fa fa-play fa-1x text-grey" aria-hidden="true"></i>
        <span className="text-grey text-bold">Watch trailer</span>
      </div>
    );
  }

  renderMovieOverview(movie: Movie) {
    if (!movie.overview) {
      return;
    }
    return (
      <div>
        <div className="header__content-about">Overview</div>
        <div className="text-md">{this.state.movie.overview}</div>
      </div>
    );
  }

  renderGenres(movie: Movie) {
    if (!movie.genres) {
      return;
    }

    const genres = movie.genres.map((genre: Genre) => <span className="header__genre text-grey" key={genre.id}>{genre.name}</span>);
    return (
      <div>
        <div className="header__content-about">Genres</div>
        {genres}
      </div>
    );
  }

  rendeHeaderContent() {
    const { match } = this.props;
    const { movie } = this.state;
    if (!movie) {
      return;
    }

    return (
      <div className="header text-white" style={movie.getBackdropImageStyle()}>
        <div className="header__custom_bg">
          <div className="container">
            <Link to={'/explore'}>
              <a className="header__link has-cursor">
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                <span>Back to search results</span>
              </a>
            </Link>

            <div className="row header__wrapper">
              <div className="col-md-6 col-lg-4">
                <div className="header__card has-cursor">
                  <div className="header__card-cover" style={movie.getBannerStyle()}></div>
                </div>
              </div>
              <div className="col-md-6 col-lg-8 header__content">
                {this.renderTitle(movie)}
                {this.renderPlayTrailerButton(movie)}
                {this.renderMovieOverview(movie)}
                {this.renderGenres(movie)}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }

  renderNavbar() {
    const navItems = [
      { text: 'Review' },
      { text: 'Trailers' },
      { text: 'Gallery' },
      { text: 'Actors' },
    ];

    return <LupaNavbar items={navItems} selectItem={ (id: number): void => null }/>;
  }

  render() {
    const movie = this.state.movie;
    return (
      <div className="movie-detail-page">
        {this.rendeHeaderContent()}
        {this.renderNavbar()}
      </div>
    );
  }
}
