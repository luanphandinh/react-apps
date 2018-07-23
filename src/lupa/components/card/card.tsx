import * as React from 'react';

import './card.scss';

export interface CardProps {
  image?: string;
  overview?: string;
  title?: string;
  subtitle?: string;
  supportingText?: any;
  cardObject?: any;
  isHover?: boolean;

  onClickCard: Function;
}

export class Card extends React.Component<CardProps, {}> {

  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return (
        <div className="lpcard">
          <div className="lpcard__inner" onClick={() => this.props.onClickCard()}>
            <div className="lpcard__cover"
              style={{ backgroundImage: this.props.image ? `url('${this.props.image}')` : 'none' }}>
            </div>

            <div className="lpcard__content">
              {this.props.title && <div className="lpcard__content-overview">{this.props.subtitle}</div>}

              {this.props.subtitle && <div className="lpcard__content-title">{this.props.title}</div>}

              {this.props.overview && <div className="lpcard__content-author">{this.props.overview}</div>}

              {this.props.supportingText && <div className="lpcard__content-text">{this.props.supportingText}</div>}
            </div>
          </div>
        </div>
    );
  }
}
