import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import Board from './board';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            wonPosition: [],
            reversed: false

        }
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            won: null
        });
    };

    handleclick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.state.won || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        const [wonPerson, wonPosition] = calwin(squares) || []

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            won: wonPerson,
            wonPosition: wonPosition || [i]
        });

    }

    sort() {
        this.setState({
            reversed: !this.state.reversed
        });
    }

    render() {
        const { history, stepNumber, won, xIsNext, reversed } = this.state;
        const current = history[this.state.stepNumber];
        const selected_history = reversed ? history.slice().reverse() : history;
        console.log(selected_history)
        const length = (history.length) - 1
        var desc;
        const moves = selected_history.map(({ squares }, move) => {
            if (move && !reversed) {
                const indexDetails = selected_history[move - 1].squares.map((e, i) => {
                    if (squares[i] && e !== squares[i]) return i;
                }).filter(e => e || e === 0);
                var [row, column] = [parseInt(indexDetails[0] / 3),
                parseInt(indexDetails[0] % 3)];
                desc = `Go to move # ${row} ${column}`
            } else if (reversed && move!==length){
                const indexDetails = selected_history[move + 1].squares.map((e, i) => {
                    if (squares[i] && e !== squares[i]) return i;
                }).filter(e => e || e === 0);
                [row, column] = [parseInt(indexDetails[0] / 3),
                parseInt(indexDetails[0] % 3)];
                desc = `Go to move # ${row} ${column}`
                move = length - move
            } else if(reversed){
                desc = "Go to start"
                move = length - move
            } else{
                desc = "Go to start"
            }

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (won) {
            status = `Winner: ${won}`
        } else if (!won && stepNumber === 9) {
            status = `Match is Draw`
        } else {
            status = 'Next player:' + (xIsNext ? "X" : "O")
        };

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} wonPosition={this.state.wonPosition}
                        onClick={(i) => this.handleclick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.sort()}>Toggle</button>
                    <ol className="history">{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================
function calwin(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}

