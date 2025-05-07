// ScientificCalculator.jsx
import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
// import bgImage from "./assets/calculator1.png";
import bgImage from "./assets/blue-office-stationery-with-copy-space.jpg";



// button layout 
  const buttons = [
    ["7", "8", "9", "/", "sin"],
    ["4", "5", "6", "*", "cos"],
    ["1", "2", "3", "-", "tan"],
    [".", "0", "=", "+", "√"],
    ["C", "^", "log", "ln", "π"],
  ];

  export default function ScientificCalculator() {
// taking input 
    const [input, setInput] = useState("");

    const handleClick = (value) => {
        if (value === "C") {
          setInput("");
        } else if (value === "=") {
          try {
        // change this values as math func values 
        const expr = input
        .replace(/π/g, "pi")
        .replace(/√(\d+(\.\d+)?)/g, "sqrt($1)")
        .replace(/sin/g, "sin")
        .replace(/cos/g, "cos")
        .replace(/tan/g, "tan")
        .replace(/log/g, "log10")
        .replace(/ln/g, "log")
        .replace(/\^/g, "^");


   
// meaning ?? 
            const result = evaluate(expr);
            setInput(result.toString());
          } catch {

        // if result is error 
            setInput("Error");
          }
        } else {
          setInput((prev) => prev + value);
        }
    };










    useEffect(() => {
      const handleKeyDown = (event) => {
        const key = event.key;
    
        if ((key >= "0" && key <= "9") || "+-*/.^".includes(key)) {
          setInput((prev) => prev + key);
        } else if (key === "Enter") {
          handleClick("=");
        } else if (key === "Backspace") {
          setInput((prev) => prev.slice(0, -1));
        } else if (key === "Escape") {
          setInput("");
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);









    return (
      <>
      <h1 className="flex justify-center items-center bg-teal-700 text-white text-2xl p-6 rounded-md shadow-md">
        Welcome to Scientific Calculator
    </h1>



{/* background  */}
<div className="flex justify-center items-center w-[100vw] h-[90vh] bg-cover bg-center p-4" style={{ backgroundImage: `url(${bgImage})` }}>



  <div className="w-full max-w-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl p-6">
    {/* Display */}
    <div className="bg-stone-50 text-black text-right p-4 rounded-md mb-4 h-20 text-2xl overflow-x-auto">
      {input || "0"}
    </div>

    {/* Button Grid */}
    <div className="grid grid-cols-5 gap-3">
      {buttons.flat().map((btn, index) => (
        <button
          key={index}
          className="bg-gray-300 hover:bg-blue-500 hover:text-white text-xl p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          onClick={() => handleClick(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  </div>
</div>
{/* footer  */}

<footer className="bg-blue-400">@2025- Basic Calculator</footer>
      </>
    );
  }
