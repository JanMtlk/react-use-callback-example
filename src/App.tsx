import { useState, useEffect, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [num1] = useState(1);
  const [num2] = useState(2);
  //! this type of functions in useEffect could lead to an infinite loop,
  //! because the function is recreated on every render so its reference changes
  // const addNumbers = () => {
  //   return num1 + num2;
  // }

  //! this on the other hand will NOT lead to an infinite loop,
  //! because the function is created once and then when dependencies change
  const addNumbers = useCallback(() => {
    return num1 + num2;
  }
    , [num1, num2]);

  //! vscode will warn you about this so listen to it


  // results logged to console for simplicity
  useEffect(() => {
    //! this will log 3
    //! in the case of not using useCallback, this will log 3 on every render

    //? when developing in react dev mode it always tries to unmount
    //? and mount the component so it would point out any errors, 
    //? that is the reason why sometimes we can see the initial log twice but that is the correct behaviour
    console.log(addNumbers());
  }, [addNumbers]);

  return (
    <div>
      <h1>addNumbers(): {addNumbers()}</h1>
      refresh count: {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default App;
