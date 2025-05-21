import React, { useCallback, useEffect, useRef, useState } from "react";
import OutfitSelector from "./components/OutfitSelector";
import ARView from "./components/ARView";
import Entry from "./scenes/Entry/index";
import styles from "./index.module.scss";

export function pixelsToVW(pixels, designWidth = 1080) {
  return (pixels / designWidth) * 100 + "vw";
}

export function pixelsToVH(pixels, designWidth = 1920) {
  return (pixels / designWidth) * 100 + "vh";
}

export function convertToPixels(value, unit) {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  if (unit === "vh") {
    return (value / 100) * viewportHeight;
  } else if (unit === "vw") {
    return (value / 100) * viewportWidth;
  } else {
    console.warn("Invalid unit. Use 'vh' or 'vw'.");
  }
}

const App = () => {
  const handleOutfitChange = (outfit) => {
    console.log("Selected outfit:", outfit);
  };

  const [currentState, setCurrentState] = useState(1);
  const canvasRef = useRef(null);
  const camKitRef = useRef(null);
  const sessionRef = useRef(null);
  const initialized = useRef(false);
  const wMargin = convertToPixels(10, "vw");
  const hMargin = convertToPixels(5, "vh");
  const [gender, setGender] = useState("");
  const [selectedType, setSelectedType] = useState("top");
  const [camImg, setCamImg] = useState(null);
  const [lensId, setLensID] = useState("7b5be302-d60c-4381-9328-b3d0c317f278");
  const [applying, setApplying] = useState(false);
  const [autoApplied, setAutoApplied] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [retake, setRetake] = useState(false);

  useEffect(() => {
    localStorage.removeItem("genderSelect");
  }, []);

  return (
    <div
      className={styles.appWrapper}
      style={{
        textAlign: "center",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {currentState === 0 ? <Entry setCurrentState={setCurrentState} /> : null}
      {currentState === 1 ? (
        <ARView wMargin={wMargin} hMargin={hMargin} />
      ) : null}
    </div>
  );
};

export default App;
