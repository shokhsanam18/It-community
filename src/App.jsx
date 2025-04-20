import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Rules from "./screens/Rules";
import Game from "./screens/Game";
import Final from "./screens/Final";
import { Questions } from "./screens/Questions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/game" element={<Game />} />
      <Route path="/final" element={<Final />} />
      <Route path="/Questions" element={<Questions />} />
    </Routes>
  );
}

export default App;
