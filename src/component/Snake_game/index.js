import React, { Component } from 'react';
import './index1.css';

export default class Snake extends Component {
    constructor(props) {
        super(props)
        this.x = 30;
        this.state = {
            arr: Array.from({ length: this.x }, i => Array(100).fill(" ")),
            snake: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12]],
            x_axis: true,
            increment: true,
            food:[20,90],
        }
    }

    square(value) {
        return (
            <div className="square1">
                {value}
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

    componentDidMount() {
        window.addEventListener('keypress', (event) => {
            const { snake, x_axis, increment } = this.state
            let row, col;
            [row, col] = snake[snake.length - 1]
            switch (event.key) {
                case 'w':
                    if (!x_axis && increment){
                        return;
                    }else if (row) { this.setState({ x_axis: false, increment: false }); }
                    break;
                case 's':
                    if (!x_axis && !increment){
                        return;
                    }else if (row < this.x - 1) { this.setState({ x_axis: false, increment: true }); }
                    break;
                case 'a':
                    if (x_axis && increment){
                        return;
                    }else if (col) { this.setState({ x_axis: true, increment: false }); }
                    break;
                case 'd':
                    if (x_axis && !increment){
                        return;
                    }else if (col < 99) { this.setState({ x_axis: true, increment: true }); }
                    break;
                default:
                    return;
            }
        });
    }

    change() {
        const { snake, x_axis, increment, food, arr } = this.state;
        let temparr = Array.from({ length: 30 }, i => Array(100).fill(" "));
        let tempsnake = snake.slice();
        let [row, col] = tempsnake[tempsnake.length - 1];
        if (x_axis) {
            if (increment) {
                if (col !== 99) { 
                    col += 1 ;
                    if (arr[row][col]==="#" && [row,col]!==tempsnake[0]){
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                    }
                    tempsnake.shift(); 
                    tempsnake.push([row, col]);
                }
            } else {
                if (col) { 
                    col -= 1 ;
                    if (arr[row][col]==="#" && [row,col]!==tempsnake[0]){
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                    }
                    tempsnake.shift(); 
                    tempsnake.push([row, col]); 
                }
            }
        } else {
            if (increment) {
                if (row !== this.x - 1) { 
                    row += 1 ;
                    if (arr[row][col]==="#" && [row,col]!==tempsnake[0]){
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                    }
                    tempsnake.shift();
                    tempsnake.push([row, col]); 
                }
            } else {
                if (row) { 
                    row -= 1 ;
                    if (arr[row][col]==="#" && [row,col]!==tempsnake[0]){
                        clearInterval(this.autorender1);
                        clearInterval(this.autorender2);
                    }
                    tempsnake.shift();
                    tempsnake.push([row, col]); 
                }
            }
        }
        console.log(food);
        temparr[food[0]][food[1]] = "*";
        for ([row, col] of tempsnake) {
            temparr[row][col] = "#"
        }
        console.log(snake)
        this.setState({
            arr: temparr,
            snake: tempsnake,
        });
    }


    autorender() {
        const interval = 90 //ms
        this.autorender1 = setInterval(() => {
            this.setState((prev) => {
                this.change();
                return;
            })
        }, interval);
        this.autorender2 = setInterval(() => {
            this.setState({food: [Math.round(Math.random()*(this.x-1)),Math.round(Math.random()*99)]})
        }, 5000);
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    {this.state.arr.map((row) => this.Row(row))}
                </div>
                <div className="button">
                    <button onClick={() => this.autorender()}>start</button>
                </div>
            </div>
        );
    }
}

