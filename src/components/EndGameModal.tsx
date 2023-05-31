import { isValidSudoku } from "../utils/isValidSudoku";
import { ICell } from "../utils/types";
import "./EndGameModal.css";

interface IEndGameModalProps {
  gameGrid: ICell[][];
}

export default function EndGameModal({
  gameGrid,
}: IEndGameModalProps): JSX.Element {
  const isCorrect = isValidSudoku(gameGrid);
  return (
    <div className="modal">
      <div className="inner-modal">
        {isCorrect && <h2 className="inner-modal-title">Well Done!</h2>}{" "}
        {!isCorrect && (
          <h2 className="inner-modal-title">Better luck next time!</h2>
        )}
        <button className="play-again-btn">Play Again</button>
      </div>
    </div>
  );
}
