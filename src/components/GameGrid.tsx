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
            <div key={idx}>
              <div className="grid-row">
                {row.map((cell, pos) => {
                  return (
                    <div className="grid-cell" key={pos}>
                      {cell}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
