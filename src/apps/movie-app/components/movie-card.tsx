import * as React from 'react';

import { Card } from 'lupa/components/card/card';

import { Movie } from '../domains/movie';

export class MovieCard extends React.Component<{ movie: Movie }, {}> {

  onClickCard() {
    alert('card clicked');
  }

  render() {
    return (
        <Card
          overview={this.props.movie.overview}
          title={this.props.movie.title}
          subtitle={this.props.movie.subtitle}
          onClickCard={() => this.onClickCard()}
        />
    );
  }
}
