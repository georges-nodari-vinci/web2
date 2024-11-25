import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RandomDog from "./components/RandomDog";

function App() {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prev) => prev + 1); // Change state to force remount of children
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* Pass `refresh` as a key to force remounting */}
      <RandomDog key={`dog-1-${refresh}`} />
      <RandomDog key={`dog-2-${refresh}`} />
      <RandomDog key={`dog-3-${refresh}`} />
    </>
  );
}

export default App;
