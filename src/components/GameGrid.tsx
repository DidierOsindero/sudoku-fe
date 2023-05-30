import "./GameGrid.css";
interface IGameGridProps {
  gameGrid: string[][];
}

export default function GameGrid({ gameGrid }: IGameGridProps) {
  return (
    <>
      <h1>Game Grid</h1>
      <div className="grid-container">
        {gameGrid.map((row, idx) => {
          return (
            <div key={idx} className="grid-row">
              {row.map((cell, pos) => {
                return cell === "." ? (
                  <input className="grid-cell" key={pos} maxLength={1} />
                ) : (
                  <div className="grid-cell preset-num" key={pos}>
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
