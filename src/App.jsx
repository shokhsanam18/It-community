import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Rules from "./screens/Rules";
import Game from "./screens/Game";
import Final from "./screens/Final";
import AudioPlayer from "./components/AudioPlayer";
import { Questions } from "./screens/Questions";

function App() {
  return (
    <>
      {/* AudioPlayer is mounted ONCE, above all routes */}
      <AudioPlayer />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
        <Route path="/Questions" element={<Questions />} />
      </Routes>
    </>

  );
}

export default App;
