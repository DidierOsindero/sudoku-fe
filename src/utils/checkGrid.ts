import { ICell } from "./types";

export function checkGrid(grid: ICell[][]): string[] {
  const clashSet = new Set<string>();
  //Create a copy of grid that can be mutated
  const gridCopy = [...grid];
  for (let i = 0; i < 9; i++) {
    gridCopy[i] = [...grid[i]];
    for (let j = 0; j < 9; j++) {
      gridCopy[i][j] = { ...grid[i][j] };
    }
  }
  //Iterate through each item
  gridCopy.forEach((row, rowIdx) => {
    row.forEach((cell, columnIdx) => {
      cell = { ...cell };
      //Check if cell has a value in it
      if (/[1-9]/.test(cell.val)) {
        const cellToValidate = gridCopy[rowIdx][columnIdx];
        let squareCurrentRow = Math.floor(rowIdx / 3) * 3;
        let squareCurrentColumn = Math.floor(columnIdx / 3) * 3;

        for (let i = 0; i < 9; i++) {
          //Going down a column
          if (i !== rowIdx) {
            const currentCell = gridCopy[i][columnIdx];

            //If found a match, push to clash arr
            if (currentCell.val === cellToValidate.val) {
              clashSet.add(`${rowIdx}${columnIdx}`);
              clashSet.add(`${i}${columnIdx}`);
            }
          }

          //Going along a row
          if (i !== columnIdx) {
            const currentCell = gridCopy[rowIdx][i];
            if (currentCell.val === cellToValidate.val) {
              clashSet.add(`${rowIdx}${columnIdx}`);
              clashSet.add(`${rowIdx}${i}`);
            }
          }

          //Skip cell to validate and check if there number is duplicated in square
          const currentCellInSquare =
            gridCopy[squareCurrentRow][squareCurrentColumn];
          const isSamePosition =
            squareCurrentColumn === columnIdx && squareCurrentRow === rowIdx;
          if (
            currentCellInSquare.val === cellToValidate.val &&
            !isSamePosition
          ) {
            clashSet.add(`${rowIdx}${columnIdx}`);
            clashSet.add(`${squareCurrentRow}${squareCurrentColumn}`);
          }

          //If the next column is outside the square, skip to next row and first column in this square
          if (!((squareCurrentColumn + 1) % 3)) {
            squareCurrentRow++;
            squareCurrentColumn = Math.floor(columnIdx / 3) * 3;
          } else {
            squareCurrentColumn++;
          }
        }
      }
    });
  });

  return [...clashSet];
}
