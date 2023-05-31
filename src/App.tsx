import { useEffect, useState } from "react";
import "./App.css";
import { sudokuGenerator } from "./utils/sudokuGenerator";
import GameGrid from "./components/GameGrid";
import { ICell } from "./utils/types";

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

  console.log(gameGrid);

  return (
    <>
      <h1 className="title">Sudoku</h1>
      {gameGrid && <GameGrid gameGrid={gameGrid} setGameGrid={setGameGrid} />}
    </>
  );
}

export default App;
