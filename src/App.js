//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import BottomRow from "./BottomRow";
import ValueChanger from "./AdditionalButtons";
import "./App.css";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [down, setDown] = useState(1);
  const [toGo, setToGo] = useState(25);
  const [ballOn, setBallOn] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(60);
  const [isActive, setIsActive] = useState(false);

  const downPlusOne = () => {
    setDown(down + 1);
    if(down===4){
      setDown(1);
    }
  }
  const toGoMinusOne = () => {
    setToGo(toGo - 1);
    if(toGo<=0){
      setToGo(25)
    }
  }
  const toGoMinusFive = () => {
    setToGo(toGo - 5);
    if(toGo<=0){
      setToGo(25)
    }
  }
  const toGoMinusTen = () => {
    setToGo(toGo - 10);
    if(toGo<=0){
      setToGo(25);
    }
  }
  const ballOnPlusOne = () => {
    setBallOn(ballOn + 1);
    if(ballOn>=25){
      setBallOn(0);
    }
  }
  const ballOnPlusFive = () => {
    setBallOn(ballOn + 5);
    if(ballOn>=25){
      setBallOn(0);
    }
  }
  const ballOnPlusTen = () => {
    setBallOn(ballOn + 10);
    if(ballOn>=25){
      setBallOn(0);
    }
  }
  const quarterPlusOne = () => {
    setQuarter(quarter + 1);
    if(quarter===4){
      setQuarter(1);
    }
  }

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setMinutes(60);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    const timerbtn = document.querySelectorAll('.timer button.btns');
    if (isActive) {
      console.log(timerbtn[0]);
      timerbtn[0].textContent = 'Stop';
      interval = setInterval(() => {
        if(seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else if (minutes === 0 && seconds === 0){
          clearInterval(interval);
        } else{
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      timerbtn[0].textContent = 'Start';
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}
            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{minutes}:{seconds}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow down={down} toGo={toGo} ballOn={ballOn} quarter={quarter} />
      </section>
      <section className="buttons">
        <div className="homeButtons">

          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => setHomeScore(homeScore + 7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={() => setHomeScore(homeScore + 3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={() => setAwayScore(awayScore + 7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={() => setAwayScore(awayScore + 3)}>Away Field Goal</button>
        </div>
      </section>
      <section className='additionalButtons'>
        <div className='down'>
          <h3>DOWN</h3>
          <div className='btns'>
            <ValueChanger onValueChange={downPlusOne} label='+1' />
          </div>
        </div>
        <div className='toGo'>
          <h3>TO GO</h3>
          <div className='btns'>
            <ValueChanger onValueChange={toGoMinusOne} label='-1' />
            <ValueChanger onValueChange={toGoMinusFive} label='-5' />
            <ValueChanger onValueChange={toGoMinusTen} label='-10' />
          </div>
        </div>
        <div className='timer'>
          <h3>TIMER</h3>
          <div className='btns'>
            <ValueChanger onValueChange={toggle} label='Start' />
            <ValueChanger onValueChange={reset} label='Reset' />
          </div>
        </div>
        <div className='ballOn'>
          <h3>BALL ON</h3>
          <div className='btns'>
            <ValueChanger onValueChange={ballOnPlusOne} label='+1' />
            <ValueChanger onValueChange={ballOnPlusFive} label='+5' />
            <ValueChanger onValueChange={ballOnPlusTen} label='+10' />
          </div>
        </div>
        <div className='quarter'>
          <h3>QUARTER</h3>
          <div className='btns'>
            <ValueChanger onValueChange={quarterPlusOne} label='+1' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
