import React, { Component } from 'react';
import './index1.css';

export default class Snake extends Component {
    constructor(props) {
        super(props)
        this.skipIncrement = false;
        this.height = 30;
        this.width = 30;
        this.gameover = "";
        this.intervalfood = 5000;
        this.intervalsnake = 100;
        this.state = {
            arr: Array.from({ length: this.height }, i => Array(this.width).fill(" ")),
            snake: [[4, 0], [4, 1], [4, 2],],
            x_axis: true,
            increment: true,
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', (event) => {
            const { snake, x_axis, increment } = this.state
            let row, col;
            [row, col] = snake[snake.length - 1]
            console.log(event.key);
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    if (!x_axis && increment) {
                        return;
                    } else if (row) { this.setState({ x_axis: false, increment: false }); }
                    break;
                case 's':
                case 'ArrowDown':
                    if (!x_axis && !increment) {
                        return;
                    } else if (row < this.height - 1) { this.setState({ x_axis: false, increment: true }); }
                    break;
                case 'a':
                case 'ArrowLeft':
                    if (x_axis && increment) {
                        return;
                    } else if (col) { this.setState({ x_axis: true, increment: false }); }
                    break;
                case 'd':
                case 'ArrowRight':
                    if (x_axis && !increment) {
                        return;
                    } else if (col < this.width - 1) { this.setState({ x_axis: true, increment: true }); }
                    break;
                default:
                    return;
            }
        });
    }

    change() {
        const { snake, x_axis, increment, food, arr } = this.state;
        let temparr = Array.from({ length: this.height }, i => Array(100).fill(" "));
        let tempsnake = snake.slice();
        let [row, col] = tempsnake[tempsnake.length - 1];
        if (x_axis) {
            if (increment) {
                if (col !== this.width - 1) {
                    col += 1;
                    if (arr[row][col] === "#" && [row, col] !== tempsnake[0]) {
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                        this.gameover = "Game Over"
                    };
                    tempsnake.push([row, col]);
                    if (this.skipIncrement) {
                        this.skipIncrement = false;
                    } else {
                        tempsnake.shift();
                    }
                }
            } else {
                if (col) {
                    col -= 1;
                    if (arr[row][col] === "#" && [row, col] !== tempsnake[0]) {
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                        this.gameover = "Game Over"
                    };
                    tempsnake.push([row, col]);
                    if (this.skipIncrement) {
                        this.skipIncrement = false;
                    } else {
                        tempsnake.shift();
                    }
                }
            }
        } else {
            if (increment) {
                if (row !== this.height - 1) {
                    row += 1;
                    if (arr[row][col] === "#" && [row, col] !== tempsnake[0]) {
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                        this.gameover = "Game Over"
                    };
                    tempsnake.push([row, col]);
                    if (this.skipIncrement) {
                        this.skipIncrement = false;
                    } else {
                        tempsnake.shift();
                    }
                }
            } else {
                if (row) {
                    row -= 1;
                    if (arr[row][col] === "#" && [row, col] !== tempsnake[0]) {
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                        this.gameover = "Game Over"
                    };
                    tempsnake.push([row, col]);
                    if (this.skipIncrement) {
                        this.skipIncrement = false;
                    } else {
                        tempsnake.shift();
                    }
                }
            }
        }
        if (arr[row][col] === "*") {
            this.skipIncrement = true;
            this.foodSetter()
        }
        temparr[food[0]][food[1]] = "*";
        for ([row, col] of tempsnake) {
            temparr[row][col] = "#"
        }
        this.setState({
            arr: temparr,
            snake: tempsnake,
        });
    }

    foodSetter() {
        this.setState({ food: [Math.round(Math.random() * (this.height - 1)), Math.round(Math.random() * this.width - 1)] })
    }

    autorender() {
        this.foodSetter();
        // this.autorender2 = setInterval(() => this.foodSetter(), this.intervalfood);
        this.autorender1 = setInterval(() => {
            this.setState(() => {
                this.change();
                return;
            })
        }, this.intervalsnake);
    }

    square(value) {
        return (
            <div className="square1">
                <div>{value}</div>
            </div>
        );
    }

    Row(row) {
        return (
            <div className="row">
                {row.map((value) => this.square(value))}
            </div>
        );
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    {this.state.arr.map((row) => this.Row(row))}
                </div>
                <div className="game-info">
                    <button onClick={() => this.autorender()}>start</button>
                    <h4 >length is {this.state.snake.length}</h4>
                    <h4>{this.gameover}</h4>
                </div>
            </div>
        );
    }
}

