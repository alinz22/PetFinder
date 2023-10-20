import React from "react";
import "./App.css";
import PetList from "./components/PetList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Petfinder App</h1>
      </header>
      <PetList />
    </div>
  );
}

export default App;
