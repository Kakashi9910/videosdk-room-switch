// src/App.jsx
import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import MeetingView from "./MeetingView";
import { TOKEN } from "./config";
import { createRoom } from "./helper";

function App() {
  const [meetingId, setMeetingId] = useState(null);

  const prepareRoom=()=> {
    createRoom(TOKEN).then((roomId) => {
      console.log("Created room with id: ", roomId);
      setMeetingId(roomId);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>VideoSDK Room Switch Demo</h2>

      {!meetingId ? (
        <>
          <button onClick={() => prepareRoom()}>
            Join Room A
          </button>
        </>
      ) : (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "Palash",
          }}
          token={TOKEN}
        >
          <MeetingView
            meetingId={meetingId}
            switchRoom={setMeetingId}
          />
        </MeetingProvider>
      )}
    </div>
  );
}

export default App;
