import React from "react";

function Square({ onClick, value, wonPosition, i }) {
    return (
        <button className="square" onClick={onClick}
            style={{ fontWeight: wonPosition.includes(i) ? "bold" : "" }}>
            {value}
        </button>
    );
}

export default class Board extends React.Component {

    renderSquare(i) {
        return (<Square className="square" value={this.props.squares[i]}
            wonPosition={this.props.wonPosition} i={i}
            onClick={() => this.props.onClick(i)} />
        );
    }


    render() {
        return (
            <div>
                {Array(3).fill(null).map((e, i) => (
                    <div className="board-row">
                        {Array(3).fill(0).map((f, j) => this.renderSquare(i * 3 + j))}
                    </div>
                ))}
            </div>
        );
    }
}