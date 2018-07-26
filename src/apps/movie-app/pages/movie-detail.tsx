import * as React from 'react';

import { HttpClient } from 'lupa/utils/http-client';
import { LupaNavbar } from 'lupa/components/navbar';
import { RouteComponentProps, Link } from 'react-router-dom';

import { Movie } from '../domains/movie';
import { Genre } from '../domains/genre';
import { API_KEY } from '../domains/api';
import { RouteWithSubRoutes } from '../routes.config';

import '../styles/movie-detail.scss';

interface MovieDetailPageProps extends RouteComponentProps<any>, React.Props<any> {
  routes?: any;
}

interface MovieDetailState {
  movie: Movie;
}
export class MovieDetail extends React.Component<MovieDetailPageProps, MovieDetailState> {
  fetchOptions = {
    api_key: API_KEY,
  };
  id: number;

  constructor(props: any) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    if (!this.state.movie) {
      this.fetchMovie();
    }
  }

  fetchMovie() {
    const endpoint = `https://api.themoviedb.org/3/movie/${this.id}`;

    HttpClient.getInstance().fetch(endpoint, this.fetchOptions)
      .then((data: any) => this.onFetchMovieDone(data))
      .catch();
  }

  onFetchMovieDone(data: any) {
    const movie = Movie.createMovieDetailFromResponse(data);
    this.setState({ movie });
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

  renderHeaderContent() {
    const { movie } = this.state;
    if (!movie) {
      return;
    }

    return (
      <div className="header text-white" style={movie.getBackdropImageStyle()}>
        <div className="header__custom_bg">
          <div className="container">
            <Link to={'/explore'}>
              <span className="header__link has-cursor">
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                <span>Back to search results</span>
              </span>
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
    if (!this.state.movie) {
      return;
    }

    const items = [
      { text: 'Review', path: `/detail/${this.id}/reviews` },
      { text: 'Trailers', path: `/detail/${this.id}/trailers` },
      { text: 'Gallery', path: `/detail/${this.id}/gallery` },
      { text: 'Actors', path: `/detail/${this.id}/actors` },
    ];

    const pathName: string = this.props.location.pathname;
    let selectedItem: number = 0;
    const navItems = items
      .map((item: any, index: number) => {
        if (item.path === pathName) {
          selectedItem = index;
        }
        return (
          <span
            onClick={() => this.props.history.push(item.path) }>
            {item.text}
          </span>
        );
      });

    return <LupaNavbar items={navItems} at={selectedItem}/>;
  }

  renderChildRoutes() {
    const { routes } = this.props;
    if (!routes) {
      return;
    }
    return <div>{routes.map((route: any, i: number) => <RouteWithSubRoutes key={i} route={{ ...route }} />)}</div>;
  }

  render() {
    return (
      <div className="movie-detail-page">
        {this.renderHeaderContent()}
        {this.renderNavbar()}
        {this.renderChildRoutes()}
      </div>
    );
  }
}
