import React, { Component } from 'react';
// import AccountPage from '../AccountPage';
// import RequestPage from '../RequestPage';
// import ContributePage from '../ContributePage';
// import VotePage from '../VotePage';

class LoggedInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wheat: 100,
      Flour: 0,
      Bread: 0,
      Money: 0,
      Hat: "No Hat"
    }

  }

  handleSubmit(){
    //Save state to DB
    this.props.database.set({
      Wheat: this.state.Wheat,
      Flour: this.state.Flour,
      Bread: this.state.Bread,
      Money: this.state.Money,
      Hat: this.state.Hat,
    });
    console.log("Updated");
  }

  componentDidMount() {
    // Load state from DB
    this.props.database.on('value', (snapshotData) => {
      console.log(snapshotData.val())
      if (snapshotData.val()) {

        this.setState({
          ...snapshotData.val()
        })
      }
    })
  }

  buyWheat(){
    this.setState({
      Money: this.state.Wheat - 1,
      Wheat: this.state.Flour + 1,
    });
  }

  grind(){
    this.setState({
      Wheat: this.state.Wheat - 1,
      Flour: this.state.Flour + 1,
    });
  }

  bakeBread(){
    this.setState({
      Flour: this.state.Flour - 1,
      Bread: this.state.Bread + 1,
    });
  }

  sellBread(){
    this.setState({
      Bread: this.state.Bread - 1,
      Money: this.state.Money + 1,
    });
  }
 
  render() {
        return (
          <div>
            <div> Wheat: {this.state.Wheat}<button onClick={ this.buyWheat.bind(this) }>Buy Wheat</button></div>
            <div> Flour: {this.state.Flour} <button onClick={ this.grind.bind(this) }>Grind</button></div>
            <div> Bread: {this.state.Bread} <button onClick={ this.bakeBread.bind(this) }>Bake Bread</button></div>
            <div> Money: {this.state.Money} <button onClick={ this.sellBread.bind(this) }>Sell Bread</button></div>
            <div> Hat: {this.state.Hat} <button>Buy Hat</button></div>
            <button onClick={ this.handleSubmit.bind(this)}>Save Game</button>
          </div>
        )
  }
}

export default LoggedInContainer;