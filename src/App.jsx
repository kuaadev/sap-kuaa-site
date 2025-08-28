import { Routes, Route, Link } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";  // 👈 import the player

function Home() {
  return <h1>Welcome to KUAA 🎶</h1>;
}

function About() {
  return <h1>About KUAA</h1>;
}

export default function App() {
  return (
    <div>
      {/* Navigation bar */}
      <nav style={{ padding: "1rem", background: "#222", color: "white" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Home</Link>
        <Link to="/about" style={{ color: "white" }}>About</Link>
      </nav>

      {/* Page content */}
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* 👇 Player stays always mounted */}
      <AudioPlayer />
    </div>
  );
}
