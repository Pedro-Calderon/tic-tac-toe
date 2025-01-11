import React, {useState} from 'react';
import ReactDOM from 	'react-dom';

import 	'./index.css'

// Square representa cada casilla del tablero
const Square = (props) =>{
  return(
    <button 
    className='square'
    onClick={props.onClickEvent}
  
    >
      {props.value}
    </button>
  );
};

// el componente board gestiona el tablero y la logica de juego
const Board = () => {
  const initialSquare=Array(9).fill(null);
  const [squares,setSquares]=useState(initialSquare);
  const [xIsNext, setxIsNext]=useState(true);


  // esta funcion maneja los clics
  const handledClickEvent =(i)=>{
    const newSquares= [...squares];
    const winnerDeclared=Boolean(calculateWinner(newSquares));
    const squareFill=Boolean(newSquares[i]);
    if (winnerDeclared || squareFill) {
      return;
    }
    newSquares[i]=xIsNext ? 'X':'O';
    setSquares(newSquares);
    setxIsNext(!xIsNext);

  };

  // Renderiza las casillas
  const renderSquare = (i) =>{
    return (
      <Square value={squares[i]}
      onClickEvent={()=> handledClickEvent(i)}
      />
    );
  };

    const winner= calculateWinner(squares);
    const status= winner?
    `El ganador es: ${winner}`:
    `Siguiente jugador: ${xIsNext ? "X": "O"}`;

    // REnderiza el tablero
  return (
    <div>
      
      <div className='status'>{status}</div>
        <div className='board-row'> 
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
        </div>
        <div className='board-row'> 
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
        </div>
        <div className='board-row'> 
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
        </div>
    </div>
  );

};
const Game = () => {
  return(
      <div className='game'>
        Tic-Tac-Toe
        <Board />
      </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// funcion que busca un ganador
function calculateWinner(square){
const lines=[
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

for(let line of lines){
  const [a,b,c]= line;
  
  if (square[a] && square[a] === square[b] && square[a]===square[c]) {
    return square[a];
  }
}

return null;
}