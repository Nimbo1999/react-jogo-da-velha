import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board/Board';
import App from '../../App'
import './style.css';

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber : 0,
        }
    }

    handlerClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares:squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    changePlayer(){
        ReactDOM.render(
            <App/>,
            document.getElementById('root')
        )
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        let round = 0;
        const moves = history.map((step, move) => {
            var desc = move ? 'Jogada #' + move : 'Início do jogo';
            round ++;
            if(move === 9){
                desc = "Fim do jogo."
            }
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let novaRodada = true;
        if(winner){
            status = 'Vencedor: ' + (winner === 'X' ? this.props.nomJogador1 : this.props.nomJogador2) + '!';
            novaRodada = false;
        } else if(round === 10) {
            status = "Partida empatada!"
            novaRodada = false;
        } else {
            status = 'Próximo jogador: ' +
            (this.state.xIsNext ? this.props.nomJogador1 : this.props.nomJogador2);
        }

        return(
            <div>
                <div className="status-game">
                    <b>{status}</b><br/>
                    <br/>
                    <button
                        onClick={this.changePlayer}
                        className="ButtonRodada"
                        hidden={novaRodada}
                    >
                        Mudar Jogadores
                    </button>
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board 
                            squares = {current.squares}
                            onClick={(i) => this.handlerClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }

}

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

export default Game;