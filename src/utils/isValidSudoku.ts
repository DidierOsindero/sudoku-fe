export function isValidSudoku(board: string[][]): boolean {
  return board.every((row, rowIdx) => {
    return row.every((cell, columnIdx) => {
      return isValidCell(board, rowIdx, columnIdx);
    });
  });
}

export function isValidCell(
  board: string[][],
  row: number,
  column: number
): boolean {
  const cellToValidate = board[row][column];
  if (cellToValidate === ".") return true;
  let squareCurrentRow = Math.floor(row / 3) * 3;
  let squareCurrentColumn = Math.floor(column / 3) * 3;

  for (let i = 0; i < 9; i++) {
    //Going down a column
    if (i !== row) {
      const currentCell = board[i][column];
      if (currentCell === cellToValidate) return false;
    }

    //Going along a row
    if (i !== column) {
      const currentCell = board[row][i];
      if (currentCell === cellToValidate) return false;
    }

    //Skip cell to validate and check if there number is duplicated in square
    const currentCellInSquare = board[squareCurrentRow][squareCurrentColumn];
    const isSamePosition =
      squareCurrentColumn === column && squareCurrentRow === row;
    if (currentCellInSquare === cellToValidate && !isSamePosition) {
      return false;
    }

    //If the next column is outside the square, skip to next row and first column in this square
    if (!((squareCurrentColumn + 1) % 3)) {
      squareCurrentRow++;
      squareCurrentColumn = Math.floor(column / 3) * 3;
    } else {
      squareCurrentColumn++;
    }
  }
  return true;
}
