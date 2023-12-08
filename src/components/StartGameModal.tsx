import { Difficulty } from "../utils/types";
import "./StartGameModal.css";

interface IEndGameModalProps {
  handleBeginGame: (difficulty: Difficulty) => void;
}

export default function StartGameModal({
  handleBeginGame,
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
            onClick={() => handleBeginGame("easy")}
          >
            Easy
          </button>

          <button
            className="difficulty-btn medium-btn"
            onClick={() => handleBeginGame("medium")}
          >
            Medium
          </button>

          <button
            className="difficulty-btn hard-btn"
            onClick={() => handleBeginGame("hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
