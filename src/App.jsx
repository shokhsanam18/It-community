import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Rules from "./screens/Rules";
import Final from "./screens/Final";
import AudioPlayer from "./components/AudioPlayer";
import { Questions } from "./screens/Questions";
import EnableMusicToast from "./components/EnableMusicToast";
import { useAudioStore } from "./store/useAudioStore";
import TryAgain from "./screens/TryAgain";

function App() {

  const { showEnableToast } = useAudioStore();
  return (
    <>
      {/* AudioPlayer is mounted ONCE, above all routes */}
      <AudioPlayer />

      {showEnableToast && <EnableMusicToast />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/final" element={<Final />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/tryagain" element={<TryAgain />} />
      </Routes>
    </>

  );
}

export default App;
