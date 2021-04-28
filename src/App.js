import { useState } from "react";
import { Observable, fromEvent } from "rxjs";
import { map, buffer, filter, debounceTime } from "rxjs/operators";
import Time from "./time";
import "./App.css";

function App() {
  let [count, setCount] = useState(0);
  let [timerObs, setTimerObs] = useState();
  let [flagObs, setFlagObs] = useState(true);

  const click$ = fromEvent(document.getElementById("wait"), "click");
  const doubleClick$ = click$.pipe(
    buffer(click$.pipe(debounceTime(250))),
    map((clicks) => clicks.length),
    filter((clicksLength) => clicksLength >= 2)
  );

  const timer = new Observable((observer) => {
    let counter = 0;
    if (!flagObs) counter = count;
    const intervalId = setInterval(() => {
      observer.next(++counter);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="App">
      <p> {Time(count)} </p>
      <button onClick={() => {
          if (!timerObs) {
            setTimerObs(timer.subscribe(setCount));
            setFlagObs(true);
          } else {
            timerObs.unsubscribe();
            setTimerObs(0);
            setCount(0);
          }}}>Start/Stop</button>
      <button id="wait" onMouseOver={() => {
          doubleClick$.subscribe((e) => {
            if (timerObs) {
              timerObs.unsubscribe();
              setTimerObs(0);
              setFlagObs(false);
            }});}}>Wait</button>
      <button onClick={() => {
          if (timerObs) {
            timerObs.unsubscribe();
            setTimerObs(timer.subscribe(setCount));
          }}}>Reset</button>
    </div>
  );
}


export default App;
