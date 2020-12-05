import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0)
  const [errorDisplay, setErrorDisplay] = useState(false)

  const handleIncrementClick = () => {
    if(errorDisplay) {
      setErrorDisplay(!errorDisplay)
    }
    setCounter(counter + 1)
  }
  const handleDecrementClick = () => {
    if(counter === 0) {
      setErrorDisplay(true)
      return
    }
    setCounter(counter - 1)
  }

  return (
    <div className="App" data-test='component-app'>
      <h1 data-test='counter-message'> Current counter is set to <span data-test='counter'>{counter}</span></h1>
      <button onClick={handleIncrementClick} data-test='button-increment'> Increment here!! </button>
      <button onClick={handleDecrementClick} data-test='button-decrement'> Decrement here!! </button>
      {errorDisplay &&
        <h2 style={{color: 'red'}} data-test='error-message'> Counter cannot go below zero!! </h2>
      }
    </div>
  );
}

export default App;
