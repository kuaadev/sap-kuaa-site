import { useEffect, useState } from "react";

export default function AudioPlayer() {
    const [track, setTrack] = useState(null);       // Holds current track info
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio());          // Single Audio instance

    useEffect(() => {
        // Function to fetch track data from Netlify function
        const fetchTrack = async () => {
            try {
                const response = await fetch("/.netlify/functions/spinitron");
                const currentTrack = await response.json();

                if (currentTrack.title) {
                    setTrack(currentTrack);         // Update track state
                    audio.src = currentTrack.stream; // Set audio source
                    audio.load();                    // Load new track
                }
            } catch (error) {
                console.error("Error fetching track data:", error);
            }
        };

        fetchTrack();                          // Fetch once on mount
        const intervalId = setInterval(fetchTrack, 30000); // Refresh every 30s

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [audio]);

    // Play/pause toggle
    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!track) return null;  // Don't render player if no track info yet

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
            {/* Track Cover */}
            <img src={track.cover || "https://via.placeholder.com/50"}
                alt={track.title}
                style={{ width: "50px", height: "50px", borderRadius: "4px" }} />
            {/* Track Info */}
            <div>
                <div style={{ fontWeight: "bold" }}>{track.title}</div>
                <div style={{ fontSize: "0.85rem" }}>{track.artist}</div>
            </div>
            {/* Play/Pause Button */}
            <button onClick={togglePlay} style={{ marginLeft: "auto" }}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
}
