import * as React from 'react';
import { Board } from './components/board';

import './styles/titac-app.scss';

export interface TicTacGameState {
  history: any[];
}
export class Tictac extends React.Component<{}, TicTacGameState> {

  constructor() {
    super({});
    this.state = {
      history: [
        {
          square: Array(9).fill(null),
        },
      ],
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
