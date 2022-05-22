import { Component } from "react";
import "./App.css";
import "./mobile.css";
import { Dice } from "../dices/dices";

class App extends Component {
  state = {
    player1: true,
    player2: false,
    winner: null,
    player1class: "play",
    player2class: "wait",
    player1Score: 0,
    player2Score: 0,
    player1CurrScore: 0,
    player2CurrScore: 0,
    firstDice: 6,
    secondDice: 6,
    pointsToWin: 100,
    ptwEdit: false,
  };
  switchSide = () => {
    if (this.state.player2) {
      this.setState({
        player2: false,
        player1class: "play",
        player2class: "wait",
      });
    } else if (this.state.player1) {
      this.setState({
        player1: false,
        player1class: "wait",
        player2class: "play",
      });
    }
  };
  onDice = () => {
    if (!this.state.winner) {
      let firstRanNum = Math.floor(Math.random() * 6) + 1;
      let secondRanNum = Math.floor(Math.random() * 6) + 1;
      let totalval = firstRanNum + secondRanNum;

      if (this.state.player1) {
        if (totalval === 12) {
          this.switchSide();
          this.setState({ player1CurrScore: 0, player2: true });
        } else {
          this.setState({
            firstDice: firstRanNum,
            secondDice: secondRanNum,
            player1CurrScore: this.state.player1CurrScore + totalval,
            ptwEdit: true,
          });
        }
      } else {
        if (totalval === 12) {
          this.switchSide();
          this.setState({ player2CurrScore: 0, player1: true });
        } else {
          this.setState({
            firstDice: firstRanNum,
            secondDice: secondRanNum,
            player2CurrScore: this.state.player2CurrScore + totalval,
            ptwEdit: true,
          });
        }
      }
    }
  };
  game = () => {
    if (
      this.state.player1CurrScore !== 0 ||
      this.state.player2CurrScore !== 0
    ) {
      if (this.state.player1) {
        this.setState({
          player1Score: this.state.player1Score + this.state.player1CurrScore,
          player1CurrScore: 0,
          player2: true,
        });
      } else {
        this.setState({
          player2Score: this.state.player2Score + this.state.player2CurrScore,
          player2CurrScore: 0,
          player1: true,
        });
      }
      this.switchSide();
    }
  };
  onHold = () => {
    this.game();
  };
  newGame = () => {
    this.setState({
      player1: true,
      player2: false,
      winner: null,
      player1class: "play",
      player2class: "wait",
      player1Score: 0,
      player2Score: 0,
      player1CurrScore: 0,
      player2CurrScore: 0,
      firstDice: 6,
      secondDice: 6,
      pointsToWin: 100,
      ptwEdit: false,
    });
  };

  render() {
    return (
      <div className="board">
        <div className={this.state.player1class + " top"}>
          <h1>Player 1</h1>
          <p>current: {this.state.player1CurrScore}</p>
          <h3>{this.state.player1Score}</h3>
        </div>
        <div className="center ">
          <div className="column">
            <button className="newG" onClick={this.newGame}>
              New Game
            </button>
          </div>
          <div className="column">
            <Dice val={this.state.firstDice} />
            <Dice val={this.state.secondDice} />
          </div>
          <div className="column">
            <button onClick={this.onDice}>DICE!</button>
            <button onClick={this.onHold}>Hold</button>
            <h2>points to win: </h2>
            <input
              disabled={this.state.ptwEdit}
              type="number"
              value={this.state.pointsToWin}
              onChange={(e) => {
                this.setState({ pointsToWin: e.target.value });
              }}
            />
          </div>
        </div>
        <div className={this.state.player2class}>
          <h1>Player 2</h1>
          <p>current: {this.state.player2CurrScore}</p>
          <h3>{this.state.player2Score}</h3>
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    if (!this.state.winner) {
      if (this.state.player1Score === this.state.pointsToWin) {
        this.setState({ winner: "player1" });
      } else if (this.state.player2Score === this.state.pointsToWin) {
        this.setState({ winner: "player2" });
      } else if (this.state.player1Score > this.state.pointsToWin) {
        this.setState({ winner: "player2" });
      } else if (this.state.player2Score > this.state.pointsToWin) {
        this.setState({ winner: "player1" });
      }
    } else if (
      this.state.winner === "player1" &&
      this.state.player1class !== "winner"
    ) {
      this.setState({ player1class: "winner", player2class: "wait" });
    } else if (
      this.state.winner === "player2" &&
      this.state.player2class !== "winner"
    ) {
      this.setState({ player2class: "winner", player1class: "wait" });
    }
  }
}

export default App;
