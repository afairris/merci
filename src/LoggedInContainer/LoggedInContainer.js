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
      Flour: 10,
      Bread: 0,
      Money: 0,
      Hat: "No Hat",
      grindProgress: 0,
      bakeProgress: 0
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
      grindProgress: this.state.grindProgress,
      bakeProgress: this.state.bakeProgress,
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
    if (this.state.Money >= 10)
        this.setState({
          Money: this.state.Money - 10,
          Wheat: this.state.Wheat + 11,
        });
  }

  grind(){
    if (this.state.Wheat >= 1)
    {
      this.setState({
        Wheat: this.state.Wheat - 1,
      });
      this.increaseGrindProgress();
    }
  }

  bakeBread(){
    if (this.state.Flour >= 1)
    {
      this.setState({
       Flour: this.state.Flour - 1,
      });
      this.increaseBakeProgress();
    }
  }

  sellBread(){
    if (this.state.Bread >= 10)
      this.setState({
        Bread: this.state.Bread - 10,
        Money: this.state.Money + 10,
      });
  }

  increaseGrindProgress(){
    var elem = document.getElementById("myGrindBar");
      if (this.state.grindProgress > 100) {
        this.setState({Flour: this.state.Flour + 10, grindProgress: 0,});
        elem.style.width = 100 + '%';
        elem.style.textAlign = 'center';
        elem.innerHTML = 'Ensaché!';
      } else {
        this.setState({grindProgress: this.state.grindProgress + 10,});
        elem.style.width = this.state.grindProgress + '%';
        elem.innerHTML = '';
      }
    }

  increaseBakeProgress() {
    var elem = document.getElementById("myBakeBar");
      if (this.state.bakeProgress > 100) {
        this.setState({Bread: this.state.Bread + 10, bakeProgress: 0,});
        elem.style.width = 100 + '%';
        elem.style.textAlign = 'center';
        elem.innerHTML = 'Cuit!';
      } else {
        this.setState({bakeProgress: this.state.bakeProgress + 10,});
        elem.style.width = this.state.bakeProgress + '%';
        elem.innerHTML = '';
      }
    }

 
  render(){
        return (
          <div>
            <div> Wheat: {this.state.Wheat}<button onClick={ this.buyWheat.bind(this) }>Buy Wheat</button></div>
            <div> Flour: {this.state.Flour} <button onClick={ this.grind.bind(this) }>Grind</button></div>
            <div id="myGrindProgress">
               <div id="myGrindBar">0%</div>
            </div>
            <div> Bread: {this.state.Bread} <button onClick={ this.bakeBread.bind(this) }>Bake Bread</button></div>
            <div id="myBakeProgress">
               <div id="myBakeBar">0%</div>
            </div>
            <div> Money: {this.state.Money} <button onClick={ this.sellBread.bind(this) }>Sell Bread</button></div>
            <div> Hat: {this.state.Hat} <button>Buy Hat</button></div>
            <button onClick={ this.handleSubmit.bind(this)}>Save Game</button>
          </div>
        )
  }
}

export default LoggedInContainer;