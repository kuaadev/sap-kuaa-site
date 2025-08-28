import { useEffect, useState } from "react";

export default function AudioPlayer() {
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio());

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const response = await fetch("/.netlify/functions/spinitron");
                const currentTrack = await response.json();

                if (currentTrack.title) {
                    setTrack(currentTrack);
                    audio.src = currentTrack.stream;
                    audio.load();
                }
            } catch (error) {
                console.error("Error fetching track data:", error);
            }
        };

        fetchTrack();
        const intervalId = setInterval(fetchTrack, 30000); // refresh every 30s

        return () => clearInterval(intervalId);
    }, [audio]);

    const togglePlay = () => {
        if (isPlaying) audio.pause();
        else audio.play();
        setIsPlaying(!isPlaying);
    };

    if (!track) return null;

    return (
        <div style={{
            position: "fixed",
            bottom: "1rem",
            left: "1rem",
            background: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
        }}>
            <img src={track.cover || "https://via.placeholder.com/50"}
                alt={track.title}
                style={{ width: "50px", height: "50px", borderRadius: "4px" }} />
            <div>
                <div style={{ fontWeight: "bold" }}>{track.title}</div>
                <div style={{ fontSize: "0.85rem" }}>{track.artist}</div>
            </div>
            <button onClick={togglePlay} style={{ marginLeft: "auto" }}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
}
