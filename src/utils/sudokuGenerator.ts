import { solveSudoku } from "./solveSudoku";

export const sudokuGenerator = (): string[][] => {
  //Create the board
  const board = Array(9);
  for (let i = 0; i < 9; i++) {
    board[i] = Array(9).fill(".");
  }

  //Fill first three boxes
  fillBox(board, 0, 0);
  fillBox(board, 3, 3);
  fillBox(board, 6, 6);

  solveSudoku(board);
  removeNums(board, 64);
  return board;
};

const fillBox = (board: string[][], row: number, column: number) => {
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i++) {
    board[row][column] =
      nums[Math.floor(Math.random() * nums.length)].toString();
    nums = nums.filter((item) => item.toString() !== board[row][column]);
    if (!((column + 1) % 3)) {
      row++;
      column = Math.floor(column / 3) * 3;
    } else column++;
  }
};

const removeNums = (board: string[][], amount: number) => {
  for (let i = 0; i < amount; i++) {
    let rand1 = Math.floor(Math.random() * 9);
    let rand2 = Math.floor(Math.random() * 9);
    while (board[rand1][rand2] === ".") {
      rand1 = Math.floor(Math.random() * 9);
      rand2 = Math.floor(Math.random() * 9);
    }
    board[rand1][rand2] = ".";
  }
};
