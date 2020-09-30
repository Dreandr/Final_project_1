import React from "react";

const Card = (props) => {
  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("card_id",target.id);
    setTimeout(()=>{
      target.style.display = "none";
    })
  }

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  const dropOff = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
    e.target.style.height="auto";
  }

  return(
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <div>
        {props.text}
      </div>
      <div
        className="target"
        onDrop={dropOff}
        onDragOver={dragOver}
      >
      </div>
    </div>
  )
}


export default Card;
