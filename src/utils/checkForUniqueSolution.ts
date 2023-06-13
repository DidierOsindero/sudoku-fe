import { isValidCell } from "./isValidSudoku";
import { ICell } from "./types";

export function checkForUniqueSolution(board: ICell[][]): boolean {
  const allSolutions: ICell[][][] = [];
  solve(board);
  function solve(board: ICell[][], row = 0, column = 0): boolean {
    //END if there is more than one solution
    if (allSolutions.length > 1) return true;
    // If last board[row][column] on board is reached and it is valid push to All solutions and increment choose another val

    if (
      row === 8 &&
      column === 8 &&
      board[row][column].val !== "." &&
      isValidCell(board, row, column)
    ) {
      //Add copy of valid solution
      const copy = [...board];
      for (let i = 0; i < 9; i++) {
        copy[i] = [...board[i]];
        for (let j = 0; j < 9; j++) {
          copy[i][j] = { ...board[i][j] };
        }
      }
      allSolutions.push(copy);
      //Initiate backtracking by forcing wrong solution
      return false;
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
        if (row === 8 && column === 8) {
          //Add copy of valid solution
          const copy = [...board];
          for (let i = 0; i < 9; i++) {
            copy[i] = [...board[i]];
            for (let j = 0; j < 9; j++) {
              copy[i][j] = { ...board[i][j] };
            }
          }
          allSolutions.push(copy);
          board[row][column].val = "";
          return false;
        }

        //if somewhere further along the path does not work (returns false)
        // reset board[row][column].val to "."
        if (
          solve(
            board,
            nextRowColumn(row, column)[0],
            nextRowColumn(row, column)[1]
          ) === false
        ) {
          board[row][column].val = ".";
        } else return true;
      }
    }

    //If you've reached the end
    if (row === 0 && column === 0) return true;
    board[row][column].val = ".";
    return false;
  }
  return allSolutions.length === 1;
}

function nextRowColumn(row: number, column: number): number[] {
  if (column === 8) return [row + 1, 0];
  return [row, column + 1];
}
