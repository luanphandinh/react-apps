import * as React from 'react';

import { Card } from 'lupa/components/card';

import { Movie } from '../domains/movie';

import '../styles/movie-card.scss';
export class MovieCard extends React.Component<{ movie: Movie, onClick: Function }, {}> {
  render() {
    const { movie, onClick } = this.props;
    return (
      <div className="col-md-3 col-xs-6 movie-card">
        <Card
          image={movie.image}
          overview={movie.overview}
          title={movie.title}
          subtitle={`★ ${movie.subtitle}`}
          onClickCard={() => onClick()}/>
      </div>
    );
  }
}
