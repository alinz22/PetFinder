// App.js
import React from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Detail from "./components/Detail"; // Ensure to create this component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/animal/:animalId" element={<Detail />} />{" "}
          {/* Route for Detail component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
