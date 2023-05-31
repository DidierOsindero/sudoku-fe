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
      {isCorrect && <h2>Well Done!</h2>}{" "}
      {!isCorrect && <h2>Better luck next time!</h2>}
    </div>
  );
}
