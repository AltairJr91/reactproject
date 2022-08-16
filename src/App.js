//css
import './App.css';
//react
import{useCallback, useEffect, useState } from "react";
//data
import {wordsList} from './data/words';
//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages= [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
];

function App() {
  const[gameStage , setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

const [pickedWord,setPickedWord] = useState("");
const [pickedCategory, setPickedCategory] = useState("");
const [letters, setLetters ] = useState([]);

const [guessedLetters, setGuessedLetters] = useState([]);
const [wrongLetters,setWrongLetters]= useState([]);
const [guesses, setGuesses] = useState(3);
const [score,setScore]=useState(50);

const pickWordAndCategory = ()=>{
  const categories = Object.keys(words)
  const category = categories[Math.floor(Math.random()* Object.keys(categories).length)]

const word = words[category][Math.floor(Math.random()* words[category].length)]

return {word,category};
}

  //start of the game
  const startGame = ()=>{
//pick word and pick category
   const {word, category}= pickWordAndCategory();

   //create array of letter
   let wordLetters=word.split("");
   wordLetters = wordLetters.map((i)=>i.toLowerCase())
   //fill states
   setPickedWord(word);
   setPickedCategory(category);
   setLetters(wordLetters);
    setGameStage(stages[1].name);

  }
  //letter input
  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter)|| wrongLetters.includes(normalizedLetter)){
      return;
    }

    //push guessed letter or lose a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter
    ]);
    setGuesses((actualGuesses)=>actualGuesses-1)
  }
  };

  const clearLetterStates = ()=>{
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  useEffect(()=>{
    if(guesses <=0){
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  },[guesses]);
  //game restart
  const retry=()=>{
    setScore(0)
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage ==='start' &&  <StartScreen startGame={startGame}/>}
      {gameStage ==='game' &&  <Game verifyLetter={verifyLetter}
       pickedWord={pickedWord}
        pickedCategory={pickedCategory}
         letters={letters}
         guessedLetters={guessedLetters}
         wrongLetters={wrongLetters}
         guesses={guesses}
         score={score}/>}
      {gameStage ==='end' &&  <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
