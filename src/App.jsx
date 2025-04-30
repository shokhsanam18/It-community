import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";
import Rules from "./screens/Rules";
import Final from "./screens/Final";
import AudioPlayer from "./components/AudioPlayer";
import EnableMusicToast from "./components/EnableMusicToast";
import TryAgain from "./screens/TryAgain";
import { Questions } from "./screens/Questions";
import { useAudioStore } from "./store/useAudioStore";

function App() {
  const { audioStarted, setShowEnableToast } = useAudioStore();

  useEffect(() => {
    if (!audioStarted) {
      setShowEnableToast(true); // 👈 show toast manually
    }
  }, [audioStarted, setShowEnableToast]);

  return (
    <>
      <AudioPlayer />
      <EnableMusicToast />
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