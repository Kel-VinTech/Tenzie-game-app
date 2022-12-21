import { useEffect, useState } from 'react'
import Die from './components/Die'
import {nanoid} from "nanoid"


function App() {

  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() *6),
      isHeld:false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }


  const rollDice = () => {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld?
              die:
              generateNewDice()
      }))
    }else {
      setTenzies(false)
      setDice(allNewDice())
    }
    
  }

  const holdDice=(id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id?
      {...die, isHeld: !die.isHeld}:
      die
    }))
  }

const [dice, setDice] = useState(allNewDice())

const [tenzies, setTenzies] = useState(false)

useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if(allHeld && allSameValue) {
    setTenzies(true)
  }

},[dice])


const diceElements = dice.map(die => <Die value={die.value} 
  isHeld={die.isHeld} 
  holdDice={() => holdDice(die.id)}
  />)

  return (
    <div className="container">
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>
          {tenzies? 
          `Congratulations you have won!!. Click the New Game button to restart the game.`:
          `Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.`}
        </p>
        <div className="dice_container">
          {diceElements}
        </div>
        <button className='roll_dice'
         onClick={rollDice}>
          {tenzies? "New Game" : "Roll"}
          </button>
      </main>
    </div>
  )
}

export default App
