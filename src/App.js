import './App.css';
import {useState, useEffect, useCallback} from 'react';
import produce from 'immer';
import PauseButton from './assets/pause-button.png'
import PlayButton from './assets/play-button.png'

function App() {
const [startingMinutes, setStartingMinutes] = useState('');
const [pauseTimer, setPasueTimer] = useState(true);
const [counterState, setCounterState] = useState({
  minutes: 0,
  seconds: 0,
  time: null 
});
const [speed, setSpeed] = useState(1000);
const [countdown, setCountdown] = useState('');
const countdownMethod = () => {

setCounterState({
  ...counterState, 
  time: counterState.time - 1,
   minutes:Math.floor((counterState.time - 1) / 60),
   seconds:(counterState.time - 1 ) % 60,
 })

}

useEffect(() => {    
if(counterState.time > 0) {
  const timer = setTimeout(() => {
      countdownMethod();
    }, speed);

  if (pauseTimer) {
    clearTimeout(timer);
  }
  return () => clearTimeout(timer);
  }     
  },[counterState.time]);



// Start the timer
 const startTimer = () => {
      setPasueTimer(false);
      countdownMethod();
}


  // pause the timer
const pauseTimerMethod = () => {
 setPasueTimer(true);
}



const startTimerMethod = () => {
 let startingMinutesState = countdown;
  setCounterState({
    ...counterState,
    time: (startingMinutesState * 60),
    minutes: Math.floor((startingMinutesState * 60) / 60),
    seconds: (startingMinutesState * 60) % 60,
  })


  setStartingMinutes(startingMinutesState);
  setPasueTimer(false);
}


const countdownInputMethod = (e) => {
e.preventDefault();
  const regex = /^[0-9\b]+$/;
  const value = e.target.value;
  if (value === '' || regex.test(value)) {
    setCountdown(value);
  }
}


  return (
    <div className="App">
    <div className="input-layer">
        <h4 className='countdown-title'>Countdown: </h4>
        <input pattern="[0-9]*" placeholder='min' type={'text'} 
        className="input-style" value={countdown} 
        onChange={e => countdownInputMethod(e)} 
        />
        <button className='add-btn-style' onClick={() => startTimerMethod()}>Start</button>
    </div>
    <div className='info-div'>
        {counterState.time > 0 && counterState.time < ((startingMinutes * 60) / 2) && <h3>More than halfway there!”</h3>   }    </div>
    <div className='clock-time-wrapper'>
        <h1 className={`clock-style   ${counterState.time > 0 && counterState.time <= 20 ? 'color-red' : ''} ${counterState.time > 0 && counterState.time <= 10 ? 'blink_me' : ''}`}>{`${counterState.minutes < 10 ? "0" + counterState.minutes : counterState.minutes}`} :
          {`${counterState.seconds < 10 ? " 0" + counterState.seconds : counterState.seconds}`}</h1>
        {!(counterState.minutes ==  0 && counterState.seconds == 0) && <img src={pauseTimer ? PlayButton : PauseButton} onClick={() => {
          pauseTimer ? startTimer() : pauseTimerMethod()
        }} className="play-pause-btn" />}

    </div>
<div className='speed-up-btn-container'>
    <button onClick={() => setSpeed(1000)} className={`speed-btn-style ${speed == 1000 ? 'selected' : ''}`}>1.0X</button>
    <button onClick={() => setSpeed(750)} className={`speed-btn-style ${speed == 750 ? 'selected' : ''}`}>1.5X</button>
    <button onClick={() => setSpeed(500)} className={`speed-btn-style ${speed == 500 ? 'selected' : ''}`}>2X</button>
</div>

    </div>
  );
}

export default App;
