import React, { Component } from "react";
import "./dices.css";
class Dice extends Component {
  render() {
    return <img src={require(`../img/dice-${this.props.val}.png`)} alt="" />;
  }
}
export { Dice };
