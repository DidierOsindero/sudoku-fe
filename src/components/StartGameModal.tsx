import "./StartGameModal.css";

interface IEndGameModalProps {
  handleDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
}

export default function StartGameModal({
  handleDifficulty,
}: IEndGameModalProps): JSX.Element {
  return (
    <div className="modal">
      <div className="inner-modal">
        <h2 className="inner-modal-title">Welcome To Sudoku Online</h2>
        <p className="inner-modal-description">
          Please select a difficulty level
        </p>
        <div className="flex-container">
          <button
            className="difficulty-btn easy-btn"
            onClick={() => handleDifficulty("easy")}
          >
            Easy
          </button>

          <button
            className="difficulty-btn medium-btn"
            onClick={() => handleDifficulty("medium")}
          >
            Medium
          </button>

          <button
            className="difficulty-btn hard-btn"
            onClick={() => handleDifficulty("hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
