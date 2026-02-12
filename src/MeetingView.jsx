// src/MeetingView.jsx
import {
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { ROOM_B, TOKEN } from "./config";

function ParticipantView({ participantId }) {
  const { webcamStream, micStream, webcamOn, micOn } =
    useParticipant(participantId);

  return (
    <div>
      {webcamOn && (
        <video
          autoPlay
          playsInline
          ref={(ref) => {
            if (ref && webcamStream) {
              ref.srcObject = new MediaStream([webcamStream.track]);
            }
          }}
        />
      )}
      <p>Mic: {micOn ? "On" : "Off"}</p>
    </div>
  );
}

export default function MeetingView({ meetingId, switchRoom }) {
const {
  join,
  leave,
  participants,
  startMediaRelay,
  stopMediaRelay,
  enableMic,
  enableWebcam
  } = useMeeting({
  onMeetingJoined: () => {
    console.log("Joined");
    enableMic(); // mic is safe to auto-start
  },
  onMeetingLeft: () => console.log("Left"),
});


  return (
    <div>
      <h3>Current Room: {meetingId}</h3>

      <button onClick={join}>Join</button>

      <button
        onClick={async () => {
          console.log("Starting camera");

          // Warm up camera
          await navigator.mediaDevices.getUserMedia({ video: true });

          // Avoid WebRTC race condition
          setTimeout(() => {
            enableWebcam();
          }, 700);
        }}
      >
        Start Camera
      </button>

      {/* NORMAL SWITCH */}
      <button
        onClick={() => {
          leave();
          setTimeout(() => {
            switchRoom(ROOM_B);
          }, 500);
        }}
      >
        Switch to Room B (Normal)
      </button>

      {/* MEDIA RELAY */}
      <button
        onClick={() =>
          startMediaRelay({
            meetingId: ROOM_B,
            token: TOKEN,
            relayTracks: { audio: true, video: true },
          })
        }
      >
        Start Media Relay to Room B
      </button>

      <button onClick={() => stopMediaRelay(ROOM_B)}>
        Stop Media Relay
      </button>

      <div>
        {[...participants.keys()].map((id) => (
          <ParticipantView key={id} participantId={id} />
        ))}
      </div>
    </div>
  );
}
