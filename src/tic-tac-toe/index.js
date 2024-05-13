
import useTicTacToe from "./useTicTacToe";
import "./style.css";

const Players = {
  A: 0,
  B: 1,
};

const PlayerIcon = {
  [Players.A]: "X",
  [Players.B]: "O",
};



function TicTacToe() {


  const buttons = Array.from(new Array(9));

  const { handleRestart, handleTurn, message, playerTurns, activePlayer } = useTicTacToe();
 

  return (
    <div className="tic-tac-toe">
      {buttons.map((_, index) => {
        const otherPlayer = activePlayer === Players.A ? Players.B : Players.A;
        const currentPlayerTurns = playerTurns[activePlayer];
        const otherPlayerTurns = playerTurns[otherPlayer];

        let icon = "";

        if (currentPlayerTurns.join("").includes(String(index))) {
          icon = PlayerIcon[activePlayer];
        } else if (otherPlayerTurns.join("").includes(String(index))) {
          icon = PlayerIcon[otherPlayer];
        }

        return (
          <button onClick={handleTurn(index)} key={index}>
            {icon}
          </button>
        );
      })}

      {!!message && (
        <div className="message">
          <h4>{message}</h4>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
     
    </div>
  );
}

export default TicTacToe;
