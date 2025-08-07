import { useReducer, useState } from "react";
import { moodColors } from "../data/MoodColors";

const initialMood = {
  mood: "Select mood:",
  colors: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "Set_Mood":
      return {
        mood: action.payload,
        colors: moodColors[action.payload],
      };
    default:
      return state;
  }
}

function MoodPalette() {
  const [state, dispatch] = useReducer(reducer, initialMood);

  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="container">
      <p className="mood-question">How do you feel today:</p>
      <select
        className="mood-dropdown"
        placeHolder="Select your mood"
        value={state.mood}
        onChange={(e) =>
          dispatch({ type: "Set_Mood", payload: e.target.value })
        }
      >
        <option value="">Select a mood</option>
        {Object.keys(moodColors).map((mood) => (
          <option key={mood} value={mood}>
            {mood}
          </option>
        ))}
      </select>
      <div className="palette">
        {state.colors &&
          state.colors.map((color, index) => (
            <div
              key={index}
              className="color-box"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor === color && (
                <span className="hex-text">{color}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MoodPalette;
