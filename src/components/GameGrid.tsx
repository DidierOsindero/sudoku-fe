import { ICell } from "../utils/types";
import "./GameGrid.css";
interface IGameGridProps {
  gameGrid: ICell[][];
  setGameGrid: React.Dispatch<React.SetStateAction<ICell[][]>>;
}

export default function GameGrid({ gameGrid, setGameGrid }: IGameGridProps) {
  const updateGrid = (val: string, rowIdx: number, columnIdx: number) => {
    if (/[1-9]/.test(val) || val === "") {
      const gameGridCopy = [...gameGrid];
      gameGridCopy[rowIdx] = [...gameGrid[rowIdx]];
      gameGridCopy[rowIdx][columnIdx].val = val;
      setGameGrid(gameGridCopy);
    }
  };
  return (
    <>
      <div className="grid-container">
        {gameGrid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="grid-row">
              {row.map((cell, columnIdx) => {
                return cell.status === "user-defined" ? (
                  <input
                    className="grid-cell"
                    value={
                      //If the cell is "." show nothing
                      gameGrid[rowIdx][columnIdx].val !== "."
                        ? gameGrid[rowIdx][columnIdx].val
                        : ""
                    }
                    key={columnIdx}
                    maxLength={1}
                    onChange={(e) =>
                      updateGrid(e.target.value, rowIdx, columnIdx)
                    }
                  />
                ) : (
                  <div className="grid-cell preset-num" key={columnIdx}>
                    {cell.val}
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
