import React from "react";
import DefCard from './DefCard';
import Card from './Card';

const Board2 = (props) => {
  const {definitions} = props;
  const dropOff = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
    e.target.style.height="auto";
  }

  let defs_shuffled = []
  let defs = []
  definitions.forEach(val => {
    defs.push(val[1])
    defs_shuffled[val[0]] = val[1]
  })

  const dragOver = (e) => {
    e.preventDefault();
  }

  return(
    <div
      id="board_2"
      onDrop={dropOff}
      onDragOver={dragOver}
      className="board"
    >
      {
        defs_shuffled.length === 6 ? defs_shuffled.map((def,i) => {return(<DefCard id={`def${defs.indexOf(def)}`} className="card" draggable="true" text={def}/>)}) : <Card id="7" className="card" draggable="false" text="Loading..."/>
      }
    </div>
  )
}
export default Board2;
