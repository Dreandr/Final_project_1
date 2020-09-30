import React from "react";
import Card from './Card';

const Board = (props) => {
  const dropOff = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
  }

  const dragOver = (e) => {
    e.preventDefault();
  }
  return(
    <div
      id="board_1"
      className="board"
    >
      {
        props.words.length == 6 ? props.words.map((word,i) => {return(<Card id={i} className="card" draggable="false" text={word}/>)}) : [0,1,2,3,4,5].map((word,i) => {return(<Card id={i} className="card" draggable="false" text="Loading..."/>)}) 
      }
    </div>
  )
}

// class Board extends React.Component{
//   constructor(){
//     super();
//     this.state={words:[],definitions:[]}
//   }
//   UNSAFE_componentWillMount(){
//   setInterval(() => {
//            this.setState(() => {
//                return { unseen: "does not display" }
//            });
//        }, 1000);
//   let words = [];
//   let definitions = [];
//   for (let i = 0; i < 6;i++ ){
//     fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=6&hasDetails=definitions&letterpattern=/^\S+$",
//     {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//         "x-rapidapi-key": "4ca040923dmshca781b0df1ed411p18c182jsn7d523d812233"
//       }
//     })
//     .then(result => result.json())
//     .then(data => {
//               words.push(data.word);
//               console.log(words);
//               definitions.push(data.results);
//     })
//     .catch(err => console.log(err))
//     }
//   this.setState({words:words,definitions:definitions})
//   }
//
//   render(){
//     console.log(this.state)
//     const dropOff = (e) => {
//       e.preventDefault();
//       const card_id = e.dataTransfer.getData('card_id');
//       const card = document.getElementById(card_id);
//       card.style.display = "block";
//       e.target.appendChild(card);
//     }
//
//     const dragOver = (e) => {
//       e.preventDefault();
//     }
//     return(
//       <div
//         id="board_1"
//         onDrop={dropOff}
//         onDragOver={dragOver}
//         className="board"
//       >
//         {
//           this.state.words.map((word,i) => {return(<Card id={i} className="card" draggable="false" text={word}/>)})
//         }
//       </div>
//     )
//   }
//
// }
export default Board;
