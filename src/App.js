import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game/Game';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      jogador1 : "Player 1",
      jogador2 : "Player 2",
    }

    this.jogador1HandleChange = this.jogador1HandleChange.bind(this)
    this.jogador2HandleChange = this.jogador2HandleChange.bind(this)
    this.iniciarJogo = this.iniciarJogo.bind(this)

  }

  jogador1HandleChange(event){
    this.setState({jogador1 : event.target.value})
  }

  jogador2HandleChange(event){
    this.setState({jogador2 : event.target.value})
  }

  iniciarJogo(){
    ReactDOM.render(
      <Game nomJogador1={this.state.jogador1} nomJogador2={this.state.jogador2}/>,
      document.getElementById('root')
    )
  }

  render(){
    return (
      <div className="App">
        <h2>Jogo da Velha</h2>

        <label htmlFor="jogador1">Nome do jogador 1 (X)</label><br/>
        <input
          type="text"
          value={this.state.jogador1}
          id="jogador1"
          size="10"
          onChange={this.jogador1HandleChange}
        />
        <br/><br/>

        <label htmlFor="jogador2">Nome do jogador 2 (O)</label><br/>
        <input
          type="text"
          value={this.state.jogador2}
          id="jogador2"
          size="10"
          onChange={this.jogador2HandleChange}
        />
        <br/><br/>
        <button onClick={this.iniciarJogo}>Confirmar</button>
        <br/><br/>
        <div id="Tabuleiro"></div>
      </div>
    );
  }
}
export default App;