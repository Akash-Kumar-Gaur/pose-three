import React, { useState } from "react";
import styles from "../../index.module.scss";
import yts from "../../assests/ytshopping.png";
import happy from "../../assests/happy.png";
import bagRight from "../../assests/bagRight.png";
import confirm from "../../assests/confirm.png";
import home from "../../assests/home.png";
import scanme from "../../assests/scanme.png";
import play from "../../assests/play.json";
import Lottie from "lottie-react";
import { pixelsToVH, pixelsToVW } from "../../App";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import QRCode from "react-qr-code";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLaCvTi5mlL0dEnVzOqylm9nK8e5HrmiM",
  authDomain: "outfit-ar-3d0a3.firebaseapp.com",
  projectId: "outfit-ar-3d0a3",
  storageBucket: "outfit-ar-3d0a3.firebasestorage.app",
  messagingSenderId: "849201286252",
  appId: "1:849201286252:web:0643b4005bd1cfc982dc49",
};

function ResultPreview({ camImg, setCamImg, setRetake, setCurrentState }) {
  const [uploading, setUploading] = useState(false);
  const [qrLink, setQrLink] = useState(null);

  const generateQr = async () => {
    setUploading(true);
    // const app = initializeApp(firebaseConfig);
    // const storage = getStorage(app);
    // console.warn("storage", storage);
    // const storageRef = ref(storage, `images/${Date.now()}.png`);
    // try {
    //   await uploadString(storageRef, camImg, "data_url");
    //   const url = await getDownloadURL(storageRef);
    //   console.log("Uploaded image URL:", url);
    //   setQrLink(url);
    //   setUploading(false);
    // } catch (error) {
    //   console.error("Upload failed:", error);
    // }
    setTimeout(() => {
      setQrLink(
        "https://firebasestorage.googleapis.com/v0/b/outfit-ar-3d0a3.firebasestorage.app/o/images%2F1747860468685.png?alt=media&token=2395a389-bdb9-4ba7-bd80-39a7bce81903"
      );
      setUploading(false);
    }, 1000);
  };

  return (
    <div
      className={styles.resultWrapper}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <div
        className={styles.topLeft}
        style={{
          width: pixelsToVW(290),
        }}
      >
        <img
          src={yts}
          alt="ytShopping"
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </div>
      {/* {!uploading ? ( */}
      <div
        className={styles.prevText}
        style={{
          fontSize: pixelsToVH(65),
          color: "#FD0100",
          fontWeight: "bold",
          margin: pixelsToVH(50),
          marginBottom: pixelsToVH(100),
        }}
      >
        {uploading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              Your photo is being
              <br />
              processed..
            </div>
            <div
              className={styles.gif}
              style={{
                width: pixelsToVW(238),
              }}
              onClick={() => generateQr()}
            >
              <Lottie animationData={play} loop={true} />
            </div>
          </div>
        ) : qrLink ? (
          <span>
            Slaying it!
            <br />
            This look was made for you.
          </span>
        ) : (
          <span>Here’s a glimpse of your new vibe!</span>
        )}
      </div>
      {/* ) : null} */}
      {!uploading ? (
        <div className={styles.resultImg}>
          <img
            src={camImg}
            id="photo-preview"
            alt="camImg"
            style={{
              visibility: camImg ? "visible" : "hidden",
              width: camImg ? "auto" : 0,
              //   height: camImg ? "100%" : 0,
              objectFit: "cover",
              border: `${pixelsToVW(8)} solid #FD0100`,
              borderRadius: 20,
              maxHeight: pixelsToVH(1080),
              height: pixelsToVH(825),
              aspectRatio: 1080 / 1920,
            }}
          />
          <div
            className={styles.leftAbs}
            style={{
              width: pixelsToVW(136),
              height: "auto",
              bottom: pixelsToVH(-40),
              left: pixelsToVW(-60),
            }}
          >
            <img
              src={happy}
              alt="happy"
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            className={styles.rightAbs}
            style={{
              width: pixelsToVW(134),
              height: "auto",
              top: pixelsToVH(-70),
              right: pixelsToVW(-60),
            }}
          >
            <img
              src={bagRight}
              alt="bag"
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
            />
          </div>
          <div className={styles.retake}>
            <button
              style={{
                fontSize: pixelsToVH(24),
                width: pixelsToVW(212),
                minHeight: pixelsToVH(62),
                borderRadius: pixelsToVH(30),
                fontWeight: "bold",
                position: "relative",
                zIndex: 50,
              }}
              onClick={() => {
                setRetake(true);
                setCamImg("");
                //   localStorage.removeItem("gender");
                //   initialized.current = null;
                setCurrentState(1);
                //   document.getElementById("outfitSlider").style.display = "block";
              }}
            >
              Retake
              <img
                src="https://img.icons8.com/ios/50/camera--v4.png"
                alt="cam"
                style={{
                  width: pixelsToVW(29),
                  marginLeft: pixelsToVW(10),
                  filter: "invert(1)",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </button>
          </div>
        </div>
      ) : null}
      {!uploading ? (
        <div
          className={styles.actions}
          style={{
            gap: pixelsToVH(50),
            marginTop: pixelsToVH(20),
          }}
        >
          {qrLink ? (
            <div className={styles.qrBox} style={{ marginTop: pixelsToVH(40) }}>
              <QRCode
                value={qrLink}
                size={pixelsToVH(178)}
                viewBox="transparent"
              />
              <img
                src={scanme}
                alt="scan me"
                style={{
                  width: pixelsToVW(354),
                  height: "auto",
                  objectFit: "contain",
                  marginLeft: pixelsToVW(10),
                }}
              />
            </div>
          ) : null}
          <div
            className={styles.confirm}
            style={{
              width: pixelsToVW(331),
              height: "auto",
              margin: "0 auto",
              position: "relative",
              zIndex: 50,
            }}
          >
            <img
              src={qrLink ? home : confirm}
              alt="confirm"
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              onClick={() => {
                if (qrLink) {
                  localStorage.removeItem("genderSelect");
                  setCurrentState(0);
                } else {
                  generateQr();
                }
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ResultPreview;
