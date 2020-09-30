import React from "react";

const DefCard = (props) => {
  const dragStart = (e) => {
    const target = e.target;
    if (target.parentElement) {
      if (target.parentElement.className == "target") {
        target.parentElement.style.height = "50px"
      }
    }
    e.dataTransfer.setData("card_id",target.id);
    setTimeout(()=>{
      target.style.display = "none";
    })
  }

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  let i = 0
  return(
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <ul>
        { props.text.map((def,i) => {
          if (i < 3) {
            return(<li>{def.definition}</li>)
          }
        })}
      </ul>
    </div>
  )
}


export default DefCard;
