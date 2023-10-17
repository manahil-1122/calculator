import React,{useState} from "react";



let Calculator:React.FC=()=>{
   
        const [input, setInput] = useState('');
        const [output, setOutput] = useState('');
      
        const handleButtonClick = (value: string) => {
          if (value === '=') {
            try {
              setOutput(eval(input));
            } catch (error) {
              setOutput('Error');
            }
          } else if (value === 'C') {
            setInput('');
            setOutput('');
          } else {
            setInput(input + value);
          }
        };
    return(
        <>
        <center><h1>Calculator</h1></center>
        <div className="App">
      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="output">{output}</div>
        </div>
        <div className="buttons">
          {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', 'C', '0', '=', '/'].map((btn) => (
            <button key={btn} onClick={() =>handleButtonClick (btn)}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
        </>
    )
}
export default Calculator