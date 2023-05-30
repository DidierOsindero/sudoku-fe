import { solveSudoku } from "./solveSudoku";
import { ICell } from "./types";

export const sudokuGenerator = (): ICell[][] => {
  //Create the board
  const board: ICell[][] = Array(9);
  const cellTemplate: ICell = { val: ".", status: "pre-defined" };
  for (let i = 0; i < 9; i++) {
    board[i] = [
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
      { ...cellTemplate },
    ];
  }

  //Fill first three boxes
  fillBox(board, 0, 0);
  fillBox(board, 3, 3);
  fillBox(board, 6, 6);

  solveSudoku(board);
  removeNums(board, 64);
  return board;
};

const fillBox = (board: ICell[][], row: number, column: number) => {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i++) {
    board[row][column].val =
      nums[Math.floor(Math.random() * nums.length)].toString();
    nums = nums.filter((item) => item.toString() !== board[row][column].val);
    if (!((column + 1) % 3)) {
      row++;
      column = Math.floor(column / 3) * 3;
    } else column++;
  }
};

const removeNums = (board: ICell[][], amount: number) => {
  for (let i = 0; i < amount; i++) {
    let rand1 = Math.floor(Math.random() * 9);
    let rand2 = Math.floor(Math.random() * 9);
    while (board[rand1][rand2].val === ".") {
      rand1 = Math.floor(Math.random() * 9);
      rand2 = Math.floor(Math.random() * 9);
    }
    board[rand1][rand2].val = ".";
    board[rand1][rand2].status = "user-defined";
  }
};
