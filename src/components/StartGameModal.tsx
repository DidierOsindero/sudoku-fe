import "./StartGameModal.css";

interface IEndGameModalProps {
  handlePlayAgain: () => void;
}

export default function StartGameModal({
  handlePlayAgain,
}: IEndGameModalProps): JSX.Element {
  return (
    <div className="modal">
      <div className="inner-modal">
        <h2 className="inner-modal-title">Welcome To Sudoku Online</h2>
        <p className="inner-modal-description">
          Please select a difficulty level
        </p>
        <div className="flex-container">
          <button className="difficulty-btn easy-btn" onClick={handlePlayAgain}>
            Easy
          </button>

          <button
            className="difficulty-btn medium-btn"
            onClick={handlePlayAgain}
          >
            Medium
          </button>

          <button className="difficulty-btn hard-btn" onClick={handlePlayAgain}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
