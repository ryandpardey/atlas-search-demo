// Dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

// Styles
import "./tailwind.output.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
