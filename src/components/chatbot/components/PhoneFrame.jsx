import { useEffect, useState } from "react";

function useClock() {
  const read = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function WifiIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="18" height="13" viewBox="0 0 26 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="2" width="20" height="10" rx="2.5" />
      <rect x="3" y="4" width="14" height="6" rx="1" fill="currentColor" stroke="none" />
      <rect x="23" y="5" width="2" height="4" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Realistic phone device frame for the desktop dock.
 * Decorative chrome (speaker, camera, status bar) is aria-hidden; the home
 * button is the labelled exit affordance. `children` is the chat screen.
 */
export default function PhoneFrame({ onExit, children }) {
  const time = useClock();

  return (
    <div className="assistant-phone">
      <div className="pa-phone-top" aria-hidden="true">
        <span className="pa-speaker" />
        <span className="pa-camera" />
      </div>

      <div className="pa-screen">
        <div className="pa-statusbar" aria-hidden="true">
          <span>{time}</span>
          <span className="pa-status-right">
            5G <WifiIcon /> <BatteryIcon />
          </span>
        </div>
        {children}
      </div>

      <div className="pa-bezel-bottom">
        <button type="button" className="pa-home" onClick={onExit} aria-label="Home — exit assistant">
          <span className="pa-home-glyph" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
