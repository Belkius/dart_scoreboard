import React, {useState, Component} from 'react';
import axios from 'axios';
import  { NewGameWindow, WinGameWindow } from './DartComponents';




function Dart() {

  const [showNewGame, setShowNewGame] = useState(false)
  const [showWonGame, setShowWonGame] = useState(false)
  const [player1Score, setPlayer1Score] = useState(301)
  const [player2Score, setPlayer2Score] = useState(301)
  const [player1Points, setPlayer1Points] = useState([])
  const [player2Points, setPlayer2Points] = useState([])
  const [player1Throws, setPlayer1Throws] = useState(3)
  const [player2Throws, setPlayer2Throws] = useState(3)
  const [multiplier, setMultiplier] = useState(1)
  const [playerTurn, setPlayerTurn] = useState(1)
  const [player1Name, setPlayer1Name] = useState("Player 1")
  const [player2Name, setPlayer2Name] = useState("Player 2")
  const [winner, setWinner] = useState("")

  const points = [
    { label: '20', value: 20, color: "bg-[#C4344F]" },
    { label: '19', value: 19, color: "bg-[#09a9c9]" },
    { label: '18', value: 18, color: "bg-[#C4344F]" },
    { label: '17', value: 17, color: "bg-[#09a9c9]" },
    { label: '16', value: 16, color: "bg-[#C4344F]" },
    { label: '15', value: 15, color: "bg-[#09a9c9]" },
    { label: '14', value: 14, color: "bg-[#C4344F]" },
    { label: '13', value: 13, color: "bg-[#09a9c9]" },
    { label: '12', value: 12, color: "bg-[#C4344F]" },
    { label: '11', value: 11, color: "bg-[#09a9c9]" },
    { label: '10', value: 10, color: "bg-[#C4344F]" },
    { label: '9', value: 9, color: "bg-[#09a9c9]" },
    { label: '8', value: 8, color: "bg-[#C4344F]" },
    { label: '7', value: 7, color: "bg-[#09a9c9]" },
    { label: '6', value: 6, color: "bg-[#C4344F]" },
    { label: '5', value: 5, color: "bg-[#09a9c9]" },
    { label: '4', value: 4, color: "bg-[#C4344F]" },
    { label: '3', value: 3, color: "bg-[#09a9c9]" },
    { label: '2', value: 2, color: "bg-[#C4344F]" },
    { label: '1', value: 1, color: "bg-[#09a9c9]" },
    { label: 'Miss', value: 0, color: "bg-[#C4344F]" },
  ]

  function handleThrow(value) {
    let currentPlayer, setScore, throws, setThrows, setOponnentThrows, newScore, setPoints

    if (playerTurn === 1) {
      currentPlayer = player1Score
      setScore = setPlayer1Score
      throws = player1Throws
      setThrows = setPlayer1Throws
      setOponnentThrows = setPlayer2Throws
      setPoints = setPlayer1Points
    } 
    else {
      currentPlayer = player2Score
      setScore = setPlayer2Score
      throws = player2Throws
      setThrows = setPlayer2Throws
      setOponnentThrows = setPlayer1Throws
      setPoints = setPlayer2Points
    }
    
    if (value === 25 || value === 50) {
      newScore = currentPlayer - value
    } 
    else {
      newScore = currentPlayer - value * multiplier
    }

    if (value === 25 || value === 50) {
      setPoints(playerPoints => [...playerPoints, value])
    } 
    else {
      setPoints(playerPoints => [...playerPoints, value * multiplier])
    }

    if (newScore > 1){
      setScore(newScore)
    } 
    else if( newScore === 0 && multiplier === 2){
      setScore(newScore)
      if (playerTurn === 1) setWinner(player1Name)
      if (playerTurn === 2) setWinner(player2Name)
      setShowWonGame(true)
    }
    else{
      setThrows(0)
      setOponnentThrows(3)
      setPlayerTurn(playerTurn === 1 ? 2 : 1)
      return
    }
    
    setThrows(throws - 1)
    if (throws === 1) {
      setOponnentThrows(3)
      setPlayerTurn(playerTurn === 1 ? 2 : 1)
    }
  }

  function undo(){
    let updatedPlayerTurn = playerTurn
    if (player1Points.length ===0 && player2Points.length === 0) return
    if (playerTurn === 1 && player1Throws === 3){
      updatedPlayerTurn = 2
      setPlayerTurn(2)
      setPlayer2Throws(1)
    }
    else if(playerTurn === 2 && player2Throws === 3){
      updatedPlayerTurn = 1
      setPlayerTurn(1)
      setPlayer1Throws(1)
    }
    if (updatedPlayerTurn === 1){
      if (player1Throws < 3) setPlayer1Throws(player1Throws + 1)
      setPlayer1Score(player1Score + player1Points[player1Points.length - 1])
      setPlayer1Points(player1Points.slice(0, player1Points.length - 1))
    } 
    else if (updatedPlayerTurn === 2) {
      if (player2Throws < 3) setPlayer2Throws(player2Throws + 1)
      setPlayer2Score(player2Score + player2Points[player2Points.length - 1])
      setPlayer2Points(player2Points.slice(0, player2Points.length - 1))
    }
  }

  const handleStart = () => {
    const selectElement = document.getElementById('selectGamePoints')
    const input1Element = document.getElementById('inputPlayer1Name')
    const input2Element = document.getElementById('inputPlayer2Name')
    if (input1Element.value) {
      setPlayer1Name(input1Element.value)
    }if (input1Element.value) {
      setPlayer2Name(input2Element.value)
    }
    setPlayer1Score(Number(selectElement.value))
    setPlayer2Score(Number(selectElement.value))
    setPlayer1Points([])
    setPlayer2Points([])
    setPlayer1Throws(3)
    setPlayer2Throws(3)
    setShowNewGame(false)
  }

  const handleCancel = () => {
    console.log('Cancelled')
    setShowNewGame(false)
    setShowWonGame(false)
  }

  return (
    <>
      <div>
        <h1 className="font-primary font-semibold text-2xl lg:text-5xl text-center text-white mb-2 md:py-6">Dart Scoreboard</h1>
      </div>
{/* FUTURE IDEAS TO EXPLORE
      <div>
        <h2 className="text-center font-semibold text-xl text-white mb-6 ">Play | Leaderboard</h2>
      </div>

      <div>
        <h2 className="text-center font-semibold text-xl text-white mb-6 ">{player1Points}</h2>
        <h2 className="text-center font-semibold text-xl text-white mb-6 ">{player2Points}</h2>
      </div>
*/}
      <div className="grid grid-cols-5 place-items-center justify-between gap-4 mx-10 my-4">
        <button className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 rounded-md text-white font-medium bg-[#C4344F]"
        onClick={() => setShowNewGame(true)}>New game</button>
        <button className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 rounded-md text-white font-medium bg-[#C4344F]"
        onClick={() => undo()}>Undo</button>
        <button className={`h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 border-4 rounded-md text-white font-medium bg-[#1A1A1A] ${multiplier === 1 ? 'border-[#C4344F]' : 'border-transparent'}`}
        onClick={() => setMultiplier(1)}>x1</button>
        <button className={`h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 border-4 rounded-md text-white font-medium bg-[#1A1A1A] ${multiplier === 2 ? 'border-[#C4344F]' : 'border-transparent'}`}
        onClick={() => setMultiplier(2)}>x2</button>
        <button className={`h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 border-4 rounded-md text-white font-medium bg-[#1A1A1A] ${multiplier === 3 ? 'border-[#C4344F]' : 'border-transparent'}`}
        onClick={() => setMultiplier(3)}>x3</button>
      </div>
      <div className="border-2 border-[#1f1f1f] rounded-xl mx-5 lg:mx-16"></div>

      <div className="grid grid-cols-5 place-items-center justify-evenly md:grid-cols-6 lg:grid-cols-9 gap-4 mx-10 my-4">
        {points.map((button) => (
          <button
            key={button.label}
            className={`h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 rounded-md text-white font-medium ${button.color}`}
            onClick={() => handleThrow(button.value)}
          >
            {button.label}
            
          </button>
        ))}
        <div></div><div className="block md:hidden lg:block"></div>
        <div className="hidden lg:block"></div><div className="hidden lg:block"></div>
        <button className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 rounded-md text-white font-medium bg-[#09a9c9]"
        onClick={() => handleThrow(25)}>25</button>
        <button className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 py-2 px-2 rounded-md text-white font-medium bg-[#C4344F]"
        onClick={() => handleThrow(50)}>50</button>
      </div>


      <div className="py-12 grid grid-cols-2 place-items-center justify-between lg:grid-cols-4 gap-x-2 gap-y-4">
          <div className={`h-24 w-48 relative border-4 bg-[#1A1A1A] ${playerTurn === 1 ? 'border-[#C4344F]' : 'border-transparent'}`}>
            <div className="font-primary text-white group-hover:text-[#C4344F] text-2xl pt-2 px-4 font-semibold">
              {player1Name}<br/>
              Score: {player1Score}
            </div>
          </div>
          <div className="h-24 w-48 relative bg-[#1A1A1A]">
            <div className="font-primary text-white group-hover:text-[#C4344F] text-2xl pt-2 px-4 font-semibold">
              Throws
            </div>
            <div className="flex justify-between">
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player1Throws > 0 ? 'bg-[#ffffff]' : ''}`}></div>
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player1Throws > 1 ? 'bg-[#ffffff]' : ''}`}></div>
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player1Throws > 2 ? 'bg-[#ffffff]' : ''}`}></div>
            </div>
          </div> 
          <div className={`h-24 w-48 relative border-4 bg-[#1A1A1A] ${playerTurn === 2 ? 'border-[#C4344F]' : 'border-transparent'}`}>
            <div className="font-primary text-white group-hover:text-[#C4344F] text-2xl pt-2 px-4 font-semibold">
              {player2Name}<br/>
              Score: {player2Score}
            </div>
          </div>
          <div className="h-24 w-48 relative bg-[#1A1A1A]">
            <div className="font-primary text-white group-hover:text-[#C4344F] text-2xl pt-2 px-4 font-semibold">
              Throws
            </div>
            <div className="flex justify-between">
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player2Throws > 0 ? 'bg-[#ffffff]' : ''}`}></div>
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player2Throws > 1 ? 'bg-[#ffffff]' : ''}`}></div>
              <div className={`h-4 w-4 mx-4 mt-3 border-2 border-white ${player2Throws > 2 ? 'bg-[#ffffff]' : ''}`}></div>
            </div>
          </div>
      </div>

      {/* new game popup */}
      <div className="flex justify-center items-center ">
       <NewGameWindow
          show={showNewGame}
          title="New Game"
          onStart={handleStart}
          onCancel={handleCancel}
        />
      </div>
      
      {/* winning game popup */}
      <div className="flex justify-center items-center ">
       <WinGameWindow
          show={showWonGame}
          winner={winner}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}
export default Dart;
