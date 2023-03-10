import React from "react";
import Board from "./Board";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>2048 Game</h1>
                <Board GridSize={4} />
            </div>
        );
    }
}

export default App;
