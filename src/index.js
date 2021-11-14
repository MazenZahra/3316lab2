import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';//importing the css file for formating


//creating a square(button) function instead of class since things are getting rendered in other classes, thus there would be redundency
function Square(props) {
  return (//className can be altered, so we can assign different classes to each button, so we can change colour
    <button className={props.ClassName} onClick={props.onClick}>
    </button>
  );
}

//class for th board
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {//lifting the state to the parent component. to keep children components in sync
      squares: Array(16).fill(null),
      blueIsNext: true,//initializes the first state as blue's turn
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();//implements immutability to make this much simpler and cleaner
    if (calculateWinner(squares) || squares[i]) {//checks if theres a winner
      return;
    }
    squares[i] = this.state.blueIsNext ? 'Blue' : 'Red';//sets the value for the pressed button
    this.setState({
      squares: squares,
      blueIsNext: !this.state.blueIsNext,//flips the value for the next button
    });
  }

  //property passing mechanism to modify each square based on the selected props
  renderSquare(i) {
    return (
      <Square
        ClassName={this.state.squares[i]}//sets the class name to the current state, this allows us to set the colour
        onClick={() => this.handleClick(i)}//on click calls upon the handle click method
      />
    );
  }

  render() {
    //consistently checks if theres a winner, if there is update the header, if there isn't update the ehader to show which player is next
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.blueIsNext ? 'Blue' : 'Red');
    }

    //renders all the buttons on the screen
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

//puts everything in one class 
class Game extends React.Component {
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

ReactDOM.render(//renders the game
  <Game />,
  document.getElementById('root')
);

//checking if there is a winner function
function calculateWinner(squares) {
  //lists all possible winning senarios 
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
  ];
  //checks if the lines match any set of picks by the players
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]&& squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}