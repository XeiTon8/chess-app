import React from 'react';
import './App.css'

interface ICell {
  x: string;
  y: number | string;
  color: string;
  selected: boolean;
}

function App() {
  
  const [cells, setCells] = React.useState<ICell[][]>([])
  const coordinates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  React.useEffect(() => {
  createBoard();
  }, [])

  const createBoard = () => {
    const board: ICell[][] = [];
    

    for (let i = coordinates.length - 1; i >=0; i--) {
      const row: ICell[] = [];

      for (let j = 0; j < numbers.length; j++) {
          let newCell: ICell = {
            x: coordinates[j],
            y: numbers[i],
            color: (i + j) % 2 == 0 ? "black" : "white",
            selected: false,
          }
          row.push(newCell);
      }

    board.push(row);
    }

    setCells(board);
  }

  const selectCell = (x: string, y: number) => {
    const newCells = [...cells].map((row) => {
      return row.map((cell) => {
        if (cell.x.includes(x) && cell.y === y) {
            console.log(`X: ${cell.x}, Y: ${cell.y}`)
            return {
              ...cell,
              selected: true,
            }
        } else {
            return {
              ...cell,
              selected: false,
            }
        }
      })
  })
    setCells(newCells);
  }

  const renderCells = () => {
    return cells.map((row) => {
      return row.map((cell, i) => {
        return (
          <div
          key={i}
          style={{
            minWidth: "40px", maxWidth: "40px",
            height: "40px", 
            backgroundColor: `${cell.selected ? "orange" : cell.color}`, 
            color: `${cell.color.includes("white") ? "black" : "white"}`,
            cursor: 'pointer',
            }}
            onClick={() => selectCell(String(cell.x), Number(cell.y))}
            >
              <span>{cell.x}</span>
              <span>{cell.y}</span>
            </div>
        )
      })
    })
  }

  return (
    <div style={{maxWidth: "320px", display: "flex", flexWrap: "wrap"}}>
      {renderCells()}
    </div>
  )
}

export default App
