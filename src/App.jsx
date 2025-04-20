import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Rules from "./screens/Rules";
import Game from "./screens/Game";
import Final from "./screens/Final";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <Router>
      {/* AudioPlayer is mounted ONCE, above all routes */}
      <AudioPlayer />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </Router>
  );
}

export default App;