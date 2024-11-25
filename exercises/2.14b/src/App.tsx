import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RandomDog from "./components/RandomDog";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    // Change state to force components to refresh their images
    setRefresh((prev) => prev + 1);
  };

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
      <div className="card">
        <button onClick={handleRefresh}>Get new dog images</button>
      </div>
    </>
  );
}

export default App;
