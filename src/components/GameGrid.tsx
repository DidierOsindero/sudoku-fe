import "./GameGrid.css";
interface IGameGridProps {
  gameGrid: string[][];
  setGameGrid: React.Dispatch<React.SetStateAction<string[][]>>;
}

export default function GameGrid({ gameGrid, setGameGrid }: IGameGridProps) {
  const updateGrid = (val: string, rowIdx: number, columnIdx: number) => {
    const gameGridCopy = [...gameGrid];
    gameGridCopy[rowIdx] = [...gameGrid[rowIdx]];
    gameGridCopy[rowIdx][columnIdx] = val;
    setGameGrid(gameGridCopy);
  };
  return (
    <>
      <h1>Game Grid</h1>
      <div className="grid-container">
        {gameGrid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="grid-row">
              {row.map((cell, columnIdx) => {
                return cell === "." ? (
                  <input
                    className="grid-cell"
                    value={gameGrid[rowIdx][columnIdx]}
                    key={columnIdx}
                    maxLength={1}
                    onChange={(e) =>
                      updateGrid(e.target.value, rowIdx, columnIdx)
                    }
                  />
                ) : (
                  <div className="grid-cell preset-num" key={columnIdx}>
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
