import React from 'react';
import "./Board.css";

class Board extends React.Component {
    constructor(props) {
        super(props);       //necessary 
        // extracts the GridSize value from the props
        const { GridSize } = this.props;
        // console.log("props", props);

        //-------Initialize the game grid with the specified size
        const grid = [];
        for (let i = 0; i < GridSize; i++) {
            grid.push([]);
            // console.log("grid", grid);
            for (let j = 0; j < GridSize; j++) {
                //-------Each cell is an object with a value and a merged flag
                grid[i].push({ value: 0, merged: false });
                // console.log("i, j", i, j);
                // console.log("gridvalue", grid[i]);
                // console.log("                ");
            }
        }
        //-------Add two random tiles to start the game
        for (let i = 0; i < 2; i++) {
            this.addRandomTile(grid);
        }
        this.state = {
            grid,
            score: 0,
        };
    }

    // handleKeyDown = (event) => {
    //     switch (event.key) {
    //         case 'ArrowLeft':
    //             this.moveTilesLeft();
    //             break;
    //         case 'ArrowRight':
    //             this.moveTilesRight();
    //             break;
    //         case 'ArrowUp':
    //             this.moveTilesUp();
    //             break;
    //         case 'ArrowDown':
    //             this.moveTilesDown();
    //             break;
    //         default:
    //             break;
    //     }
    // };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    moveTilesLeft = () => {
        const { grid } = this.state;
        // console.log("left key pressed");
        // console.log("length of grid", grid.length);

        //-------Move tiles to the left and merge them
        for (let i = 0; i < grid.length; i++) {
            let k = 0;
            for (let j = 0; j < grid.length; j++) {
                // console.log(grid[i][j].value);
                if (grid[i][j].value !== 0) {
                    if (k !== j) {
                        grid[i][k].value = grid[i][j].value;
                        grid[i][j].value = 0;
                    }
                    if (k > 0 && grid[i][k - 1].value === grid[i][k].value && !grid[i][k - 1].merged) {
                        //-------Merge tiles with the same value
                        grid[i][k - 1].value *= 2;
                        grid[i][k - 1].merged = true;
                        grid[i][k].value = 0;
                        this.setState({ score: this.state.score + grid[i][k - 1].value });
                    } else {
                        k++;
                    }
                }
            }
        }
        // console.log(grid );
        //-------Add a new tile after moving
        this.addRandomTile(grid);
        //-------Reset the merged flag for all tiles
        this.resetMergedFlag(grid);
        this.setState({ grid });
    };

    moveTilesRight = () => {
        // console.log(this.state);
        const { grid } = this.state;
        // console.log("right key pressed");

        //-------Move tiles to the right and merge them
        for (let i = 0; i < grid.length; i++) {
            let k = grid.length - 1;
            for (let j = grid.length - 1; j >= 0; j--) {
                if (grid[i][j].value !== 0) {
                    if (k !== j) {
                        grid[i][k].value = grid[i][j].value;
                        grid[i][j].value = 0;
                    }
                    if (k < grid.length - 1 && grid[i][k + 1].value === grid[i][k].value && !grid[i][k + 1].merged) {
                        //-------Merge tiles with the same value
                        grid[i][k + 1].value *= 2;
                        grid[i][k + 1].merged = true;
                        grid[i][k].value = 0;
                        this.setState({ score: this.state.score + grid[i][k + 1].value });
                    } else {
                        k--;
                    }
                }
            }
        }
        // console.log(grid );
        //-------Add a new tile after moving
        this.addRandomTile(grid);
        //-------Reset the merged flag for all tiles
        this.resetMergedFlag(grid);
        this.setState({ grid });
    };

    moveTilesUp = () => {
        const { grid } = this.state;
        // console.log("upper key pressed");

        //-------Move tiles up and merge them
        for (let j = 0; j < grid.length; j++) {
            let k = 0;
            for (let i = 0; i < grid.length; i++) {
                if (grid[i][j].value !== 0) {
                    if (k !== i) {
                        grid[k][j].value = grid[i][j].value;
                        grid[i][j].value = 0;
                    }
                    if (k > 0 && grid[k - 1][j].value === grid[k][j].value && !grid[k - 1][j].merged) {
                        //-------Merge tiles with the same value
                        grid[k - 1][j].value *= 2;
                        grid[k - 1][j].merged = true;
                        grid[k][j].value = 0;
                        this.setState({ score: this.state.score + grid[k - 1][j].value });
                    } else {
                        k++;
                    }
                }
            }
        }

        //-------Add a new tile after moving
        this.addRandomTile(grid);
        //-------Reset the merged flag for all tiles
        this.resetMergedFlag(grid);
        this.setState({ grid });

    };
    moveTilesDown = () => {
        const { grid } = this.state;
        // console.log("down key pressed");

        //-------Move tiles down and merge them
        for (let j = 0; j < grid.length; j++) {
            let k = grid.length - 1;
            for (let i = grid.length - 1; i >= 0; i--) {
                if (grid[i][j].value !== 0) {
                    if (k !== i) {
                        grid[k][j].value = grid[i][j].value;
                        grid[i][j].value = 0;
                    }
                    if (k < grid.length - 1 && grid[k + 1][j].value === grid[k][j].value && !grid[k + 1][j].merged) {
                        //-------Merge tiles with the same value
                        grid[k + 1][j].value *= 2;
                        grid[k + 1][j].merged = true;
                        grid[k][j].value = 0;
                        this.setState({ score: this.state.score + grid[k + 1][j].value });
                    } else {
                        k--;
                    }
                }
            }
        }

        //-------Add a new tile after moving
        this.addRandomTile(grid);
        //-------Reset the merged flag for all tiles
        this.resetMergedFlag(grid);
        this.setState({ grid });
    };

    addRandomTile = (grid) => {
        const { GridSize } = this.props;
        //-------Find empty cells in the grid
        const emptyCells = [];
        for (let i = 0; i < GridSize; i++) {
            for (let j = 0; j < GridSize; j++) {
                if (grid[i][j].value === 0) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        };
        //-------Choose a random empty cell and add a new tile with a value of 2 or 4
        if (emptyCells.length > 0) {
            //a random number between 0 and the length of emptyCells-> round down the random number to the nearest integer
            const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            grid[x][y].value = Math.random() < 0.9 ? 2 : 4;         //90% for 2 and 10% for 4
            grid[x][y].merged = false;
        }
    }
    resetMergedFlag = (grid) => {
        //-------Reset the merged flag for all tiles
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                grid[i][j].merged = false;
            }
        }
    };

    handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 37: // left
                this.moveTilesLeft();
                break;
            case 38: // up
                this.moveTilesUp();
                break;
            case 39: // right
                this.moveTilesRight();
                break;
            case 40: // down
                this.moveTilesDown();
                break;
            default:
                break;
        }
    };


    render() {
        // const { GridSize } = this.props;
        const { grid, score } = this.state;
        return (
            <div className="board" tabIndex="0" onKeyDown={this.handleKeyDown}>
                <div className="score">Score: {score}</div>
                {/* to iterate over an array of rows in a grid */}
                {grid.map((row, i) => (
                    <div key={i} className="board-row">
                        {/* to iterate over an array of tiles */}
                        {row.map((tile, j) => (
                            <div
                                key={j}
                                className={`board-box ${tile.value > 0 ? `board-box-${tile.value}` : ""}`}
                            >
                                {tile.value > 0 ? tile.value : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Board;