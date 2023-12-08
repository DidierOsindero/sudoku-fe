import { useEffect, useState } from "react";
import "./App.css";
import { sudokuGenerator } from "./utils/sudokuGenerator";
import GameGrid from "./components/GameGrid";
import { ICell } from "./utils/types";
import EndGameModal from "./components/EndGameModal";
import { checkGrid } from "./utils/checkGrid";
import StartGameModal from "./components/StartGameModal";

function App() {
  //Handler to generate new sudoku grid:
  const generateGrid = (filledInCells = 35) => {
    const generatedGrid = sudokuGenerator(filledInCells);
    //Return an object with target and attempt
    setGameGrid(generatedGrid.board);
    setTargetGrid(generatedGrid.target);
  };

  //Generate new Sudoku on-mount
  const [gameGrid, setGameGrid] = useState<ICell[][]>([]);
  const [targetGrid, setTargetGrid] = useState<ICell[][]>([]);
  useEffect(() => {
    generateGrid(30);
  }, []);

  //Check if grid is completely filled in
  const isComplete = gameGrid.every((row) => {
    return row.every((el) => /[1-9]/.test(el.val));
  });

  //Handler for check/submit button
  const [isEndOfGame, setIsEndOfGame] = useState(false);
  const [clashArr, setClashArr] = useState<string[]>([]);
  const handleCheckSubmit = () => {
    if (isComplete) {
      setIsEndOfGame(true);
    } else {
      console.log(checkGrid(gameGrid));
      setClashArr(checkGrid(gameGrid));
    }
  };

  //Handler for hint buttn
  const [isHint, setIsHint] = useState(false);
  const handleHint = () => {
    setIsHint(true);
    let row = Math.floor(Math.random() * 9);
    let column = Math.floor(Math.random() * 9);

    while (
      /[1-9]/.test(gameGrid[row][column].val) ||
      gameGrid[row][column] === undefined
    ) {
      row = Math.floor(Math.random() * 9);
      column = Math.floor(Math.random() * 9);
    }
    const prev = { ...gameGrid[row][column] };
    const gameGridCopy = [...gameGrid];
    gameGridCopy[row] = [...gameGrid[row]];
    gameGridCopy[row][column] = { ...targetGrid[row][column] };
    gameGridCopy[row][column].status = "hint";
    setGameGrid(gameGridCopy);

    setTimeout(() => {
      console.log("Set timeout running");
      const gameGridCopy = [...gameGrid];
      gameGridCopy[row] = [...gameGrid[row]];
      gameGridCopy[row][column] = { ...prev };
      setGameGrid(gameGridCopy);
      setIsHint(false);
    }, 5000);
  };

  //Reset Clash Array when game grid is updated
  useEffect(() => {
    if (gameGrid.length) setClashArr(checkGrid(gameGrid));
  }, [gameGrid]);

  // State to track check mode
  const [isCheckMode, setIsCheckMode] = useState(false);

  //Handle Play Again
  const handlePlayAgain = () => {
    setClashArr([]);
    generateGrid();
    setIsEndOfGame(false);
  };

  return (
    <div className="app">
      <h1 className="title">Sudoku</h1>
      {gameGrid && (
        <GameGrid
          gameGrid={gameGrid}
          setGameGrid={setGameGrid}
          clashArr={clashArr}
          isCheckMode={isCheckMode}
        />
      )}

      <StartGameModal handlePlayAgain={handlePlayAgain} />

      {/* Submit button */}
      {isComplete && (
        <button className="submit-btn" onClick={handleCheckSubmit}>
          Submit
        </button>
      )}
      {/* Check Toggle */}
      {!isComplete && (
        <button
          className={isCheckMode ? "check-btn check-mode-colour" : "check-btn"}
          onClick={() => setIsCheckMode((prev) => !prev)}
        >
          {isCheckMode ? "Don't check!" : "Check"}
        </button>
      )}

      {/* Hint Button */}
      {
        <button
          className="hint-btn"
          onClick={() => {
            handleHint();
          }}
          disabled={isHint || isComplete}
        >
          Hint
        </button>
      }
      {/* End Game Modal */}
      {isEndOfGame && (
        <EndGameModal gameGrid={gameGrid} handlePlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
