
import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import bg from "./bg1.gif";

function App() {
  const [appLaunched, setAppLaunched] = useState(false);

  const launchApp = () => {
    setAppLaunched(true);
  };

  return (
    <div className={`App ${appLaunched ? "active" : ""}`}>
      {!appLaunched && (
        <div
          className="background"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
      )}

      <button
        className={`launch-button ${appLaunched ? "active" : ""}`}
        onClick={launchApp}
      >
        Launch App
      </button>
      {appLaunched && <Home />}
    </div>
  );
}

export default App;
