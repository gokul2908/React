import React, { Component } from 'react';
import './calculator.css';

function Buttongen({ val, onClick }) {
    return (
        <button className="button" onClick={() => onClick(val)} id={val}>
            {val}
        </button>
    );
}

class Row extends Component {
    render() {
        this.class = "row" + this.props.index
        return (
            <div className={this.class}>
                {Array(3).fill(true).map((x, index) => {
                    return (
                        <Buttongen val={this.props.val + index + 1} onClick={this.props.onClick} />
                    );
                })}
            </div>
        );
    }
}


class ButtonInput extends Component {
    render() {
        this.buttons = ["+", "-", "/", "*"]
        this.row3 = [".", "0", "EXP"]
        return (
            <div className="numInfo">
                {Array(3).fill(true).map((x, index) => {
                    return (<Row val={(index) * 3} index={index} onClick={this.props.onClick} />)
                })}
                <div className="row3">
                    {this.row3.map((x) => {
                        return (
                            <Buttongen val={x} onClick={this.props.onClick} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: [],
            Number: [],
        }
    }

    record(value) {
        const num = this.state.Number.slice()
        console.log(value)
        console.log(this.state.Number)
        num.push(value)
        this.setState({ Number: num })
    }

    render() {
        return (
            <div>
                <div className="view">
                    <div><input className="give_input"></input></div>
                    <input className="show_input"></input>
                </div>
                <div>
                    <ButtonInput onClick={(val) => this.record(val)} />
                </div>
            </div>
        )
    }
}



