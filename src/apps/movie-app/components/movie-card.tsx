import * as React from 'react';

import { Card } from 'lupa/components/card/card';

import { Movie } from '../domains/movie';

import '../styles/movie-card.scss';
export class MovieCard extends React.Component<{ movie: Movie, onClick: Function }, {}> {
  render() {
    return (
        <Card
          image={this.props.movie.image}
          overview={this.props.movie.overview}
          title={this.props.movie.title}
          subtitle={`★ ${this.props.movie.subtitle}`}
          onClickCard={() => this.props.onClick()}
        />
    );
  }
}
