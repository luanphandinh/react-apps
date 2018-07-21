import * as React from 'react';

export interface SquareProps {
  value: string;
  onClick: Function;
}

export class Square extends React.Component<SquareProps, {}> {

  constructor(props: SquareProps) {
    super(props);
  }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
