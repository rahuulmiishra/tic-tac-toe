import { useState } from "react";


  const WinningPatters = ["012", "345", "678", "036", "147", "258", "048", "246"];

  const Players = {
    A: 0,
    B: 1,
  };
  
  const PlayerIcon = {
    [Players.A]: "X",
    [Players.B]: "O",
  };

  const DefaultTurns = {
    [Players.A]: [],
    [Players.B]: [],
  };
  
  

function useTicTacToe() {
  const [activePlayer, setActivePlayer] = useState(Players.A);
  const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));
  const [message, setMessage] = useState("");
  
  

  function handleTurn(index) {
    return () => {
      const newPlayer = activePlayer === Players.A ? Players.B : Players.A;

      const playerATurns = playerTurns[Players.A];
      const playerBTurns = playerTurns[Players.B];

      if (playerATurns.join("").includes(String(index))) {
        return;
      } else if (playerBTurns.join("").includes(String(index))) {
        return;
      }

      const oldPlayerTurns = structuredClone(playerTurns);

      oldPlayerTurns[activePlayer].push(String(index));

      const isWon = isPlayerWon(oldPlayerTurns[activePlayer]);
      if (isWon) {
        setMessage(`Player ${activePlayer} Won the Game`);
      }
      setPlayerTurns(oldPlayerTurns);
      setActivePlayer(newPlayer);
    };
  }

  function isPlayerWon(turns) {
    const turnsInStr = turns.sort().join("");

    const isWon = WinningPatters.some((t) => moreStrict(t, turnsInStr));

    return isWon;
  }

  function moreStrict(singlePattern, turnsInStr) {
    return singlePattern.split("").every((p) => turnsInStr.includes(p));
  }

  function handleRestart() {
    setPlayerTurns(DefaultTurns);
    setActivePlayer(Players.A);
    setMessage("");
  }

  return { handleRestart, handleTurn, message, playerTurns, activePlayer };
}

export default useTicTacToe;
