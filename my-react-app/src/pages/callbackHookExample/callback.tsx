import { useCallback, useState, memo, useContext } from "react";
import { UserContext } from "../contextHookExample/userContext";
// Child component that receives the callback
const ToggleButton = memo(({ onClick, label }: { onClick: () => void; label: string }) => {
  console.log(`${label} button rendered`);
  return <button onClick={onClick}>{label}</button>;
});

const Room = () => {
  const [light, setLight] = useState(false);
  const [counter, setCounter] = useState(0); // Added to force re-renders


  const user = useContext(UserContext);

  // Without useCallback - recreates on every render
  const toggleLight = () => {
    setLight(!light);
  };

  // With useCallback - stays the same
  const toggleLightCallback = useCallback(() => {
    setLight(light => !light);
  }, []);


  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>The light is {light ? "ON" : "OFF"}</p>
      <p>Counter: {counter}</p>
      <p>Context Hook: {user} </p>
      
      <div style={{ display: "flex", gap: "20px", justifyContent: 'center', marginTop: '20px' }}>
        {/* These will show the difference */}
        <ToggleButton onClick={toggleLight} label="Normal Toggle" />
        <ToggleButton onClick={toggleLightCallback} label="Callback Toggle" />
        
        {/* Button to force re-renders */}
        <button onClick={() => setCounter(c => c + 1)}>
          Force Re-render ({counter})
        </button>
      </div>
    </div>
  );
};

export default Room;