import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar/navbar";
import "../Styles/sudokuSolver.css";

const Solve = () => {
  const boardSize = 9; // Fixed board size

  // Initialize a 9x9 empty board
  const initialBoard = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      value: "",
      isValid: true,
      isEmpty: true,
    }))
  );

  const [isBoardSolved, setIsBoardSolved] = useState(false);
  const [board, setBoard] = useState(initialBoard);

  const handleCellChange = (event, i, j) => {
    const newValue = parseInt(event.target.value, 10);
  
    if (event.target.value === "") {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[i][j].value = "";
        newBoard[i][j].isEmpty = true;
        newBoard[i][j].isValid = true;
        return newBoard;
      });
    } else if (newValue >= 1 && newValue <= boardSize) {
      // Check if the number is valid before setting it
      if (isValid(board, i, j, newValue.toString())) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[i][j].value = newValue.toString();
          newBoard[i][j].isEmpty = false;
          newBoard[i][j].isValid = true;
          return newBoard;
        });
      } else {
        toast.error(`Invalid move! ${newValue} is already in this row, column, or 3x3 box.`);
      }
    }
  };
  

  // Validate if a number can be placed in a cell
  const isValid = (board, row, col, num) => {
    for (let i = 0; i < boardSize; i++) {
      const subRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const subCol = 3 * Math.floor(col / 3) + (i % 3);

      if (board[i][col].value === num) return false;
      if (board[row][i].value === num) return false;
      if (board[subRow][subCol].value === num) return false;
    }
    return true;
  };

  // Solve Sudoku using Backtracking
  const solve = (board) => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j].value === "") {
          for (let num = 1; num <= boardSize; num++) {
            if (isValid(board, i, j, num.toString())) {
              board[i][j].value = num.toString();
              if (solve(board)) return true;
              board[i][j].value = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Wrapper function to solve Sudoku
  const solveSudoku = () => {
    const newBoard = [...board];
    setIsBoardSolved(false);

    if (!solve(newBoard)) {
      toast.error("Invalid Sudoku!");
    } else {
      setIsBoardSolved(true);
      setBoard(newBoard);
    }
  };

  // Reset board to initial state
  const handleReset = () => {
    setBoard(initialBoard);
    setIsBoardSolved(false);
  };

  return (
    <div className="sudoku-container">
      <Navbar /> 
      <h1 className="title">Sudoku Solver</h1>
      <div className="board-container">
        <ul className="board">
          {board.map((row, i) => (
            <li key={i} className="board-row">
              {row.map((col, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  min="1"
                  max="9"
                  value={col.value}
                  disabled={isBoardSolved}
                  onChange={(event) => handleCellChange(event, i, j)}
                  className="cell"
                />
              ))}
            </li>
          ))}
        </ul>
        <div className="button-group">
          <button onClick={solveSudoku} disabled={isBoardSolved} className="btn btn-solve">
            Solve
          </button>
          <button onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
  
};

export default Solve;
