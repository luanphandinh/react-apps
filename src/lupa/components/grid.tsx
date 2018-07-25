import * as React from 'react';

export class Grid extends React.Component<{ items: any, className?: any }, {}> {

  render() {
    const { items } = this.props;
    let { className } = this.props;
    if (!className) {
      className = 'row';
    }
    return (
      <div className={className}>
        {items}
      </div>
    );
  }

}
