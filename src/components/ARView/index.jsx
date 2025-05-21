import React, { useState, useRef } from "react";
// import { PoseEngine } from "@geenee/bodyprocessors";
// import { AvatarRenderer } from "./avatarrenderer";
// import { Snapshoter } from "@geenee/armature";
import Webcam from "react-webcam";
import yts from "../../assests/ytshopping.png";
import capture from "../../assests/clickBtn.png";
import back from "../../assests/backBtn.png";
import styles from "../../index.module.scss";
import { pixelsToVH, pixelsToVW } from "../../App";
import bagRight from "../../assests/bagRight.png";
// import OutfitSelector from "../OutfitSelector";

function ARView({ etCurrentState }) {
  const [gender, setGender] = useState("");
  const [loaded, setLoaded] = useState(false);
  const snapShorterRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user",
  };

  return (
    <div className={styles.camBox}>
      <div
        className={styles.topLeft}
        style={{
          width: pixelsToVW(290),
        }}
      >
        <img src={yts} alt="ytShopping" />
      </div>
      {!loaded ? (
        <div
          className={styles.center}
          id="infoBox"
          style={{
            width: pixelsToVW(566),
            zIndex: 2,
            padding: `${pixelsToVH(30)} ${pixelsToVW(30)}`,
          }}
        >
          <img
            src={bagRight}
            alt="bag"
            style={{
              width: pixelsToVW(100),
              aspectRatio: 1,
              top: pixelsToVH(-8),
            }}
          />
          {!gender ? (
            <div
              style={{
                fontSize: pixelsToVH(42),
                fontWeight: "bold",
                textTransform: "uppercase",
                margin: `${pixelsToVH(20)} 0px`,
              }}
            >
              You’re On Screen!
            </div>
          ) : null}
          <div
            style={{
              fontSize: pixelsToVH(27),
              margin: pixelsToVH(gender ? 20 : 0),
            }}
          >
            {!gender
              ? "Use the panel below to select your look."
              : "Stand straight and align yourself within the foot marker for best fit."}
          </div>
        </div>
      ) : null}
      <>
        {countdown > 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: pixelsToVH(200),
              color: "#fff",
            }}
          >
            {countdown}
          </div>
        ) : null}
        {loaded ? (
          <>
            <div
              className={styles.backBtn}
              onClick={() => {
                setGender("");
                setTimeout(() => {
                  let elem = document.getElementById("genselect");
                  if (elem) {
                    elem.style.display = "flex";
                  }
                }, 10);
              }}
              style={{
                position: "absolute",
                left: "15%",
                transform: "translate(-50%, 0)",
                width: pixelsToVW(170),
                bottom: pixelsToVH(220),
              }}
            >
              <img src={back} alt="back" />
            </div>
            <div
              className={styles.captureBtn}
              onClick={() => {
                // document.getElementById("outfitSlider").style.display = "none";
                setCountdown(3);
                const countdownInterval = setInterval(() => {
                  setCountdown((prev) => {
                    if (prev === 1) {
                      clearInterval(countdownInterval);
                      // const canvas = document.getElementById("canvas"); // your live render target
                      // const imageDataUrl = canvas?.toDataURL("image/png");
                      // preview.src = imageDataUrl; // Show captured image
                      // console.warn("imageDataUrl", imageDataUrl);
                      // setCamImg(imageDataUrl);
                      // setCurrentState(2);
                      captureImage();
                      return null;
                    }
                    return prev - 1;
                  });
                }, 1000);
              }}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0)",
                width: pixelsToVW(254),
                bottom: pixelsToVH(200),
              }}
            >
              <img src={capture} alt="capture" />
            </div>
          </>
        ) : null}
      </>
      {/* <div
          className={styles.dummyWebcam}
          style={{
            position: "absolute",
            zIndex: -1,
            height: "100%",
            width: "100%",
            display: loaded ? "none" : "flex",
          }}
        >
        </div> */}
      <Webcam mirrored />
      {!loaded ? (
        <div
          id="genselect"
          className={styles.bottom}
          style={{
            height: pixelsToVH(244.9638671875),
            width: pixelsToVW(608.64453125),
            borderRadius: pixelsToVH(20),
            fontSize: pixelsToVH(42),
          }}
        >
          Select a gender
          <div className={styles.genSelect}>
            <button
              onClick={() => {
                setGender("male");
                // setLensID(MALE[0].lensId);
                localStorage.setItem("genderSelect", "male");
                setTimeout(() => {
                  let elem = document.getElementById("genselect");
                  if (elem) {
                    elem.style.display = "none";
                  }
                }, 0);
              }}
              style={{
                borderRadius: pixelsToVH(51),
                width: pixelsToVW(245),
                height: pixelsToVH(76),
                fontSize: pixelsToVH(31.4),
                background: gender === "male" ? "#FD0100" : "#fff",
                color: gender !== "male" ? "#FD0100" : "#fff",
              }}
            >
              Male
            </button>
            <button
              onClick={() => {
                setGender("female");
                // setLensID(FEMALE[0].lensId);
                localStorage.setItem("genderSelect", "female");
                setTimeout(() => {
                  var elem = document.getElementById("genselect");
                  if (elem) {
                    elem.style.display = "none";
                  }
                }, 0);
              }}
              style={{
                borderRadius: pixelsToVH(51),
                width: pixelsToVW(245),
                height: pixelsToVH(76),
                fontSize: pixelsToVH(31.4),
                background: gender === "female" ? "#FD0100" : "#fff",
                color: gender !== "female" ? "#FD0100" : "#fff",
              }}
            >
              Female
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ARView;
