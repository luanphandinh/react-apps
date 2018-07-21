import * as React from 'react';

export interface SquareProps {
}

export class Square extends React.Component<SquareProps, {}> {
  render() {
    return (
      <button className="square">
      </button>
    );
  }
}
