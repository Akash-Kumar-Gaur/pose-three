import React, { useCallback, useEffect, useRef, useState } from "react";
import OutfitSelector from "./components/OutfitSelector";
import ARView from "./components/ARView";
import Entry from "./scenes/Entry/index";
import ResultPreview from "./scenes/Result";
import styles from "./index.module.scss";
import ARViewDebug from "./components/ARView/ARViewDebug";

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
  const [currentState, setCurrentState] = useState(0);
  // const wMargin = convertToPixels(10, "vw");
  // const hMargin = convertToPixels(5, "vh");
  // const [selectedType, setSelectedType] = useState("top");
  const [camImg, setCamImg] = useState(null);
  const [retake, setRetake] = useState(false);

  useEffect(() => {
    !retake && localStorage.removeItem("genderSelect");
  }, [retake]);

  return (
    <>
      {currentState !== 1 ? (
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
          {currentState === 0 ? (
            <Entry setCurrentState={setCurrentState} />
          ) : null}
          {currentState === 2 ? (
            <ResultPreview
              camImg={camImg}
              setCamImg={setCamImg}
              setRetake={setRetake}
              setCurrentState={setCurrentState}
            />
          ) : null}
        </div>
      ) : null}
      {currentState === 1 ? (
        <ARViewDebug
          setCamImg={setCamImg}
          setCurrentState={setCurrentState}
          retake={retake}
        />
      ) : null}
    </>
  );
};

export default App;
