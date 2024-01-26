import React from "react"
import Die from "./die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App(){
  
  const [diceElement, setDiceElement] = React.useState(allNewDice())
  const diceArray = diceElement.map(die =>
    <Die value={die.value} key={die.id} isHeld={die.isHeld}
    holdDie={() => holdDie(die.id)}/>
  )
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = diceElement.every(die => die.isHeld)
    const firstValue = diceElement[0].value
    const allSame = diceElement.every(die => die.value === firstValue)
    if(allHeld && allSame){
      setTenzies(true)
    }
  },[diceElement])

  function holdDie(id){
      setDiceElement(prev => prev.map((die) =>{
        if(die.id === id){
          return {...die, isHeld : !die.isHeld}
        }else{
          return die
        }
      }
      ))
  }

  function roll(){
    if(tenzies === false){
      setDiceElement(prev => prev.map(die => {
        if(die.isHeld === true){
          return die
        }else {
          return {...die, value : Math.floor(Math.random()*6 + 1)}
        }
      }))
    }else{
      setDiceElement(allNewDice())
      setTenzies(false)
    }  
  }

  function allNewDice(){
    const arr = []
    for(let i = 0; i<10; i++){
      arr[i] = {value : Math.floor(Math.random()*6 + 1), 
                isHeld : false,
                id : nanoid() ,
              }
    }
    return arr
  }
  
  
  return(
    <main>
      <div>
        {tenzies && <Confetti width={1500}/>}
        <h1 className="title">Tenzies</h1>
        <p className="desc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dice-container">
        {diceArray }
      </div>
      <button className="roll-btn" onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}