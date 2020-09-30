import React, { Component } from "react";
import "./App.css";
import Register from "./Components/Register/Register";
import Signin from "./Components/Signin/Signin";
import Navigation from "./Components/Navigation/Navigation";
import Board from './Components/Board';
import Board2 from './Components/Board2';
import Card from './Components/Card';



class App extends Component {
  _isMounted = false;
  constructor() {
    super();

    this.state = {


      //To Route the between signin forms and dashboard
      route: 'signin',
      isSignedIn: false,

      user: {

        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        words:[],
        definitions:[],
      },

      score_params: {
        score:0,
        checked: false
      }

    }
  }
  componentDidMount(){
  this._isMounted = true;
  setInterval(() => {
           this.setState(() => {
               return { unseen: "does not display" }
           });
       }, 3000);
  }
  //Function to load the user when register form is inputed(pass function to Register Component)
  loadUser = (data) => {
    console.log(data.score)
    this.setState({user: {

      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    },
    score_params: {
      score:data.score,
      user_id: data.id,
      checked: false
    }
  })
  }




  //Function to Change Routes from Signin and Home Dashboard
  onRouteChange = (route) => {

    if (route === 'signout') {

      this.setState({isSignedIn: false});

    } else if (route === 'home') {
      this.setState({isSignedIn: true});
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
        .catch(err => console.log(err))
        }
      this.setState({user:{words:words,definitions:definitions}})

  }
    this.setState({route: route});
  }

  componentWillUnmount() {
   this._isMounted = false;
 }

  render() {
    //Destructuring our states instead of using this.state
    const { isSignedIn, route} = this.state;

    const clickHandler = () => {
      console.log("click!");
      const id = this.state.score_params.user_id;
      console.log(id);
      let counter = 0;
      for (let i = 0; i<6; i++){
        let elem = document.getElementById(i);
        if (elem.children[1].children.length === 1) {
          counter++
        }
      }
      if (counter < 5){
        alert("Please drag all definitions to the right words!")
      } else {
        let counter2 = 0;
        for (let i = 0; i<6; i++){
          let elem = document.getElementById(i);
          if (parseInt(elem.children[1].children[0].id[3], 10) === i) {
            counter2++
          }
        }
        if (counter2 == 6) {
          alert("Well done!")
          if(!this._isMounted ) {this.setState({user:{words:[],definitions:[]}})}
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
             .then(data => {
                      if (this.state.user.words.length === 6){
                        let board = document.getElementsByClassName("board")[1]
                        for (let x = 0;x<6;x++){
                          let elem = document.getElementById(`def${x}`)
                          elem.parentElement.style.height = "50px"
                          board.appendChild(elem)
                          console.log(`elem ${x} done!`)
                        }
                        words.push(data.word);
                        if (this.state.score_params.checked) {
                        this.setState({user:{id: this.state.user.id,
                        words:[data.word],
                        definitions:[[ind_col.splice(Math.floor(Math.random()*ind_col.length), 1), data.results]]},
                        score_params:{
                        checked: false,
                        score:this.state.score_params.score}});
                      } else {
                        this.setState({user:{id: this.state.user.id,
                        words:[data.word],
                        definitions:[[ind_col.splice(Math.floor(Math.random()*ind_col.length), 1), data.results]]},
                        score_params:{
                        checked: false,
                        score:this.state.score_params.score+6}});
                      }
                        fetch('http://localhost:3001/users', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                id: id,
                                score: this.state.score_params.score
                            })
                        })
                        .then(response => response.json())
                      } else {
                      this.setState({user:{words:[...this.state.user.words, data.word],
                        definitions: [...this.state.user.definitions,[ind_col.splice(Math.floor(Math.random()*ind_col.length), 1), data.results]]}})
                        console.log(this.state.user.definitions)
                      }
             })
             .catch(err => console.log(err))
             }
        } else {
          if (!this.state.score_params.checked){
            this.setState({score_params:{checked:true, score:this.state.score_params.score + counter2}})
          }
          alert(`You got ${counter2} words correctly. Try again!`)
        }
      }
    }

    return (
      <div className="App">

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} score={this.state.score_params.score}/>


        { /* Jsx Javascript expression to know when to change the route */

         route === 'home' ? //if this is true then route to home dashboard

             <div className="flexbox">

               <Board words={this.state.user.words}/>
               <Board2 definitions={this.state.user.definitions}/>
               <button onClick={clickHandler} id="doneButton"><p id="buttonText">Done!</p></button>
             </div>

           : (   //else if route is Signin go to Signin

             route === 'signin' ?

             <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

           :

             //else return the route to Register

             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
           )


        }

      </div>
    );
  }

}

export default App;
