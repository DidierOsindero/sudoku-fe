import { ICell } from "../utils/types";
import "./GameGrid.css";
interface IGameGridProps {
  gameGrid: ICell[][];
  setGameGrid: React.Dispatch<React.SetStateAction<ICell[][]>>;
  clashArr: string[];
  isCheckMode: boolean;
}

export default function GameGrid({
  gameGrid,
  setGameGrid,
  clashArr,
  isCheckMode,
}: IGameGridProps) {
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
                //Check to see if cell is included in clash array
                const isClashing =
                  clashArr.length && isCheckMode
                    ? clashArr.includes(`${rowIdx}${columnIdx}`)
                    : false;
                return (
                  <>
                    {cell.status === "user-defined" && (
                      <input
                        className={`grid-cell ${
                          isClashing && "clashing-cell"
                        } `}
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
                    )}

                    {cell.status === "pre-defined" && (
                      <div
                        className={`grid-cell preset-num ${
                          isClashing && isCheckMode && "clashing-cell"
                        } `}
                        key={columnIdx}
                      >
                        {cell.val}
                      </div>
                    )}

                    {cell.status === "hint" && (
                      <div
                        className={`grid-cell hint ${
                          isClashing && isCheckMode && "clashing-cell"
                        } `}
                        key={columnIdx}
                      >
                        {cell.val}
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
