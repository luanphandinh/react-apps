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
        <div className="common-card-view">
          <div className="common-card-view--inner" onClick={() => this.props.onClickCard()}>
            <div className="common-card-view--cover"></div>

            <div className="common-card-view--content">
              {this.props.title && <div className="common-card-view--content-overview">{this.props.subtitle}</div>}

              {this.props.subtitle && <div className="common-card-view--content-title">{this.props.title}</div>}

              {this.props.overview && <div className="common-card-view--content-author">{this.props.overview}</div>}

              {this.props.supportingText && <div className="common-card-view--content-text">{this.props.supportingText}</div>}
            </div>
          </div>
        </div>
    );
  }
}
