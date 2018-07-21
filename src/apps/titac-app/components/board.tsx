import * as React from 'react';

import { Square } from './square';

export interface BoardProps {}
export interface BoardState {
  squares: ('X' | 'O' | null)[];
  isX: boolean;
  winner: 'X' | 'O' | null;
}
export class Board extends React.Component<BoardProps, BoardState> {

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isX: true,
      winner: null,
    };
  }

  handleClick(i: number) {
    const winner = calculateWinner(this.state.squares);
    const squares = [...this.state.squares];
    if (winner || squares[i]) {
      this.setState({ winner });
      return;
    }

    squares[i] = this.state.isX ? 'X' : 'O';
    this.setState({ squares, isX: !this.state.isX });
  }

  renderSquare(i: number) {
    return <Square
        value = { this.state.squares[i] }
        onClick = {() => this.handleClick(i)}
      />;
  }

  render() {
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = `Turn ${this.state.isX ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: ('X' | 'O' | null)[]): ('X' | 'O' | null) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i = i + 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
