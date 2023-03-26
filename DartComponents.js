import React from 'react';

function NewGameWindow(props) {
  return (
    <div className={`${props.show ? 'fixed' : 'hidden'} inset-0 w-full h-full flex justify-center items-center`}>
      <div className="fixed inset-0 blur-3xl opacity-60 bg-[#1f1f1f]"></div>
      <div className="bg-black rounded-lg p-8 max-w-md w-full mx-4 z-50">
        <div className="text-white text-2xl font-bold mb-4">{props.title}</div>
        <div className="text-white mb-4">
          <label className="block font-bold mb-2">
            Select starting points:
          </label>
          <select
            className="block appearance-none w-full bg-[#1f1f1f]   py-2 px-4 pr-8 rounded  focus:outline-none"
            id="selectGamePoints"
            value={props.player1Score}  
          >
            <option value = '301'>301</option>
            <option value = '501'>501</option>
            <option value = '701'>701</option>
            <option value = '1001'>1001</option>
          </select>
        </div>
        <div className="text-white mb-4">
          <label className="block font-bold mb-2">
            Player 1 name:
          </label>
          <input
            className="appearance-none bg-[#1f1f1f] rounded w-full py-2 px-4 leading-tight focus:outline-none"
            id="inputPlayer1Name"
            type="text"
            value={props.player1Name}
            maxLength="10"
          />
        </div>
        <div className="text-white mb-4">
          <label className="block font-bold mb-2">
            Player 2 name:
          </label>
          <input
            className="appearance-none bg-[#1f1f1f] rounded w-full py-2 px-4 leading-tight focus:outline-none"
            id="inputPlayer2Name"
            type="text"
            value={props.player2Name}
            maxLength="10"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-white text-black font-bold py-2 px-4 rounded mr-4" onClick={props.onCancel}>Cancel</button>
          <button className="bg-[#C4344F] text-white font-bold py-2 px-4 rounded" onClick={props.onStart}>Start</button>
        </div>
      </div>
    </div>
  );
}

function WinGameWindow(props) {
  return (
    <div className={`${props.show ? 'fixed' : 'hidden'} inset-0 w-full h-full flex justify-center items-center`}>
      <div className="fixed inset-0 blur-3xl opacity-60 bg-[#1f1f1f]"></div>
      <div className="bg-black rounded-lg p-8 max-w-md w-full mx-4 z-50 ">
        <div className="text-white text-2xl font-bold mb-4 ">Congratulations! {props.winner} won!</div>
        <div className="mt-8 flex justify-end">
          <button className="bg-[#C4344F] text-white font-bold py-2 px-4 rounded" onClick={props.onCancel}>Tanks!</button>
        </div>
      </div>
    </div>
  );
}

export { NewGameWindow, WinGameWindow }
