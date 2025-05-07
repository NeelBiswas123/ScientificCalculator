// ScientificCalculator.jsx
import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import bgImage from "./assets/blue-office-stationery-with-copy-space.jpg";

// button layout 
const buttons = [
  ["7", "8", "9", "/", "sin"],
  ["4", "5", "6", "*", "cos"],
  ["1", "2", "3", "-", "tan"],
  [".", "0", "=", "+", "√"],
  ["C", "^", "log", "ln", "π"],
  ["←", "%", "deg", "(", ")"],
];

export default function ScientificCalculator() {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);



  // to handle clicks 
  const handleClick = (value, currentInput = input) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        const expr = currentInput
          .replace(/π/g, "pi")
          .replace(/√(\d+(\.\d+)?)/g, "sqrt($1)")
          .replace(/sin/g, "sin")
          .replace(/cos/g, "cos")
          .replace(/tan/g, "tan")
          .replace(/log/g, "log10")
          .replace(/ln/g, "log")
          .replace(/\^/g, "^");

        const result = evaluate(expr);
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "←") {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };




// use to handle keyboard inputs
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode); //handling dark and white mode

    const handleKeyDown = (event) => {
      const key = event.key;
      if ((key >= "0" && key <= "9") || "+-*/.^%()".includes(key)) {
        event.preventDefault();
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        event.preventDefault();
        handleClick("=", input);
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        setInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [darkMode, input]);





  return (
    <>

      {/* Header with Toggle Button */}
      <div className="flex justify-between items-center bg-teal-700 text-white text-2xl p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
        <h1>Welcome to Scientific Calculator</h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-sm px-4 py-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black shadow-md"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>



      {/* Calculator Background in dark mode */}
      <div
        className={`flex justify-center items-center w-[100vw] h-[90vh] bg-cover bg-center p-4 transition-all duration-500 ${darkMode ? "bg-gray-900" : ""}`}
        style={!darkMode ? { backgroundImage: `url(${bgImage})` } : {}}
      >



        {/* Calculator properties in light mode  */}
        <div className="w-full max-w-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl p-6">

          {/* Display of input */}
          <div className="bg-stone-50 dark:bg-gray-700 dark:text-white text-black text-right p-4 rounded-md mb-4 h-20 text-2xl overflow-x-auto">
            {input || "0"}
          </div>

          {/* Button area */}
          <div className="grid grid-cols-5 gap-3">
            {buttons.flat().map((btn, index) => (
              <button
                key={index}
                className="bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 hover:text-white text-xl p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>




      {/* Footer */}
      <footer className="bg-blue-400 dark:bg-gray-900 dark:text-white text-center p-2">
        @2025 - Basic Calculator
      </footer>
    </>
  );
}
