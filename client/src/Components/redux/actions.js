export const GETROBOTSSUCCESS = "GET_WORDS_SUCCESS";

async function getWord() {
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=6&hasDetails=definitions&letterpattern=/^\S+$",
  {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "4ca040923dmshca781b0df1ed411p18c182jsn7d523d812233"
    }
  })
  .then(result => result.json())
  .then(data1 => {
            return([data1.word, data1.results])
  })
}

const getWord = () => {
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=6&hasDetails=definitions&letterpattern=/^\S+$",
  {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "4ca040923dmshca781b0df1ed411p18c182jsn7d523d812233"
    }
  })
  .then(result => result.json())
  .then(data1 => {
            return([data1.word, data1.results])
  })
}

const forLoop = async _ => {
  console.log('Start')

  for (let index = 0; index < 3; index++) {
    const word = await getWord().resolve()
    console.log(word)
  }

  console.log('End')
}


export const getWords = async _ => {

  for (let index = 0; index < 6; index++) {
    let words = [];
    let definitions = [];
    let ind_col = [0,1,2,3,4,5]
    for (let i = 0; i < 6;i++ ){
      fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=6&hasDetails=definitions&letterpattern=/^\S+$",
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": "4ca040923dmshca781b0df1ed411p18c182jsn7d523d812233"
        }
      })
      .then(result => result.json())
      .then(data1 => {
                words.push(data1.word);
                definitions.push([ind_col.splice(Math.floor(Math.random()*ind_col.length), 1), data1.results])
      })
    }
    let payload = [words, definitions]
    dispatch({ type: "GET_ROBOTS_SUCCESS", payload: payload})
  }

}

export const getrobots = () => {
  return (dispatch) => {
  const forLoop = async _ => {
  console.log('Start')

  for (let index = 0; index < fruitsToGet.length; index++) {
    const fruit = fruitsToGet[index]
    const numFruit = await getNumFruit(fruit)
    console.log(numFruit)
  }

  console.log('End')
}
     dispatch({ type: "GET_ROBOTS_SUCCESS", payload: users})
   });
  }
}
