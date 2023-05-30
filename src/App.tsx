import { useEffect, useState } from "react";
import "./App.css";
import { sudokuGenerator } from "./utils/sudokuGenerator";
import GameGrid from "./components/GameGrid";

function App() {
  //Handler to generate new sudoku grid:
  const generateGrid = () => {
    setGameGrid(sudokuGenerator());
  };
  //Generate new Sudoku on-mount
  const [gameGrid, setGameGrid] = useState<string[][]>([]);
  useEffect(() => {
    generateGrid();
  }, []);

  console.log(gameGrid);

  return (
    <>
      <h1>Sudoku</h1>
      {gameGrid && <GameGrid gameGrid={gameGrid} />}
    </>
  );
}

export default App;
