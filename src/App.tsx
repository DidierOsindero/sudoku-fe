import { useEffect, useState } from "react";
import "./App.css";
import { sudokuGenerator } from "./utils/sudokuGenerator";
import GameGrid from "./components/GameGrid";
import { ICell } from "./utils/types";
import EndGameModal from "./components/EndGameModal";
import { checkGrid } from "./utils/checkGrid";

function App() {
  //Handler to generate new sudoku grid:
  const generateGrid = () => {
    const generatedGrid = sudokuGenerator();
    setGameGrid(generatedGrid);
  };

  //Generate new Sudoku on-mount
  const [gameGrid, setGameGrid] = useState<ICell[][]>([]);
  useEffect(() => {
    generateGrid();
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

      {/* End Game Modal */}
      {isEndOfGame && (
        <EndGameModal gameGrid={gameGrid} handlePlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;
