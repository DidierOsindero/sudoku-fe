import { isValidCell } from "./isValidSudoku";
import { ICell } from "./types";

export function solveSudoku(
  board: ICell[][],
  row: number = 0,
  column: number = 0
): boolean {
  // Base case => return if last board[row][column] on board is reached and it is valid
  if (row === 8 && column === 8 && board[row][column].val !== ".") {
    return isValidCell(board, row, column);
  }

  //Find next empty slot
  while (board[row][column].val !== "." && !(row === 8 && column === 8)) {
    const result = nextRowColumn(row, column);
    row = result[0];
    column = result[1];
  }

  //Have to backtrack if path is incorrect
  for (let candidate = 1; candidate < 10; candidate++) {
    board[row][column].val = candidate.toString();
    if (isValidCell(board, row, column)) {
      //Check if it is a valid last cell
      if (row === 8 && column === 8) return true;

      //if somewhere further along the path does not work (returns false)
      // reset board[row][column].val to "."
      if (
        solveSudoku(
          board,
          nextRowColumn(row, column)[0],
          nextRowColumn(row, column)[1]
        ) === false
      ) {
        board[row][column].val = ".";
        board[row][column].status = "user-defined";
      } else return true;
    }
  }

  if (row === 0 && column === 0) return true;
  board[row][column].val = ".";
  board[row][column].status = "user-defined";
  return false;
}

function nextRowColumn(row: number, column: number): number[] {
  if (column === 8) return [row + 1, 0];
  return [row, column + 1];
}
