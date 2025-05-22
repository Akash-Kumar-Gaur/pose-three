import React, { useEffect, useState, useRef } from "react";

import { PoseEngine } from "@geenee/bodyprocessors";
import { Snapshoter } from "@geenee/armature";
import capture from "../../assests/clickBtn.png";
import back from "../../assests/backBtn.png";
import yts from "../../assests/ytshopping.png";
import bagRight from "../../assests/bagRight.png";
import { AvatarRenderer } from "./avatarrenderer";
import "./index.css";
import { pixelsToVH, pixelsToVW } from "../../App";
import styles from "./index.module.scss";

// Icons
// Male
import male1 from "../../assests/outfits/male/male1.png";
import male2 from "../../assests/outfits/male/male2.png";
import male3 from "../../assests/outfits/male/male3.png";
import male4 from "../../assests/outfits/male/male4.png";
import male5 from "../../assests/outfits/male/male5.png";
//Female
import female1 from "../../assests/outfits/female/female1.png";
import female2 from "../../assests/outfits/female/female2.png";
import female3 from "../../assests/outfits/female/female3.png";
import female4 from "../../assests/outfits/female/female4.png";
import female5 from "../../assests/outfits/female/female5.png";
// Acc
import glasses from "../../assests/glasses.png";
import cap from "../../assests/cap.png";

function ARViewDebug({ setCamImg, setCurrentState, retake = false }) {
  const [gender, setGender] = useState(localStorage.getItem("genderSelect"));
  const [ready, setReady] = useState(retake);
  const snapShorterRef = useRef(null);
  const rendererRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [accry, setAccry] = useState(false);
  const [variant, setVariant] = useState({
    top: "",
    bottom: "",
  });

  useEffect(() => {
    // Engine
    const engine = new PoseEngine();
    const token =
      location.hostname === "localhost"
        ? "AVSE9trnGfvPowd3z2f5cQW-FW87bF5t"
        : "HiCltgzsHoEwIl02FxcrdhLy6wdabBmY";

    // Parameters
    let rear = false;
    // Model map
    const modelMap = {
      onesie: {
        file: "onesie.glb",
        avatar: false,
        outfit: {
          occluders: [/Head$/, /Body/],
          //   hidden: [/Eye/, /Teeth/, /Footwear/],
        },
      },
    };
    let model = "onesie";
    let avatar = false;

    // Create spinner element
    function createSpinner() {
      const spinner = document.createElement("div");
      spinner.className = "boxes";
      spinner.id = "spinner";
      for (let i = 0; i < 4; i++) {
        const box = document.createElement("div");
        box.className = "box";
        for (let j = 0; j < 4; j++)
          box.appendChild(document.createElement("div"));
        spinner.appendChild(box);
      }
      return spinner;
    }

    async function main() {
      // Renderer
      const container = document.getElementById("webar");
      if (!container) return;
      const renderer = new AvatarRenderer(
        container,
        "crop",
        !rear,
        modelMap[model].file,
        avatar ? undefined : modelMap[model].outfit
      );
      rendererRef.current = renderer;
      // Model carousel
      const modelBtns = document.getElementsByName("model");
      modelBtns.forEach((btn) => {
        btn.onchange = async () => {
          if (btn.checked && modelMap[btn.value]) {
            modelBtns.forEach((btn) => {
              btn.disabled = true;
            });
            // outfitSwitch.disabled = true;
            const spinner = createSpinner();
            document.body.appendChild(spinner);
            model = btn.value;
            avatar = modelMap[model].avatar;
            await renderer.setOutfit(
              modelMap[model].file,
              avatar ? undefined : modelMap[model].outfit
            );
            // outfitSwitch.checked = avatar;
            document.body.removeChild(spinner);
            modelBtns.forEach((btn) => {
              btn.disabled = false;
            });
            // outfitSwitch.disabled = false;
          }
        };
      });
      // Initialization
      await Promise.all([
        engine.addRenderer(renderer),
        engine.init({ token: token }),
      ]);
      await engine.setup({ size: { width: 1920, height: 1080 }, rear });
      await engine.start();
      snapShorterRef.current = new Snapshoter(renderer);
      const loadUi = document.getElementById("loadui");
      if (loadUi) {
        loadUi.remove();
      }
    }
    main();
    return () => {
      const ele = document.getElementById("engeenee.canvas.layer0");
      if (ele) {
        document
          .querySelectorAll('[id="engeenee.canvas.layer1"]')
          .forEach((el) => el.remove());
        // document
        //   .querySelectorAll('[id="engeenee.canvas.layer0"]')
        //   .forEach((el) => el.remove());
      }
    };
  }, []);

  const captureImage = async () => {
    const imageData = await snapShorterRef.current.snapshot();
    if (imageData) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = imageData.width;
      tempCanvas.height = imageData.height;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(imageData, 0, 0);
      const canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(tempCanvas, 0, 0);
      const base64Image = canvas.toDataURL("image/png");
      setCamImg(base64Image);
      setCurrentState(2);
    }
  };

  useEffect(() => {
    if (gender !== null) {
      const ele = document.getElementById("engeenee.canvas.layer1");
      if (ele) {
        ele.style.visibility = "hidden";
      }
    }
  }, []);

  const loadStart = (value = true, timeout = 5000, changeReady = true) => {
    setTimeout(() => {
      const ele = document.getElementById("engeenee.canvas.layer1");
      if (ele) {
        ele.style.visibility = value === true ? "visible" : "hidden";
      }
      changeReady && setReady(value);
    }, timeout);
  };

  //   useEffect(() => {
  //     const closet = document.getElementById("courosel");
  //     if (ready) {
  //       if (closet) {
  //         closet.style.visibility = "visible";
  //       }
  //     } else {
  //       if (closet) {
  //         closet.style.visibility = "hidden";
  //       }
  //     }
  //   }, [ready]);

  const getModel = () => {
    const { top, bottom } = variant;
    if (!top.length && !bottom.length) return "";
    if (!top) return `${bottom}.glb`;
    if (!bottom) return `${top}.glb`;
    if (top.length && bottom.length) {
      const modelMatch = `${top} ${bottom}`;
      switch (modelMatch) {
        case "Jacket Jeans":
          return "JacketJeans.glb";
        case "Jacket Trouser":
          return "JacketTrouser.glb";
        case "BlueTshirt Jeans":
          return "BlueTshirtJeans.glb";
        case "BlueTshirt Trouser":
          return "BlueTshirtTrouser.glb";
        case "RedTshirt Jeans":
          return "RedTshirtJeans.glb";
        case "RedTshirt Trouser":
          return "RedTshirtTrouser.glb";
        case "waistcoat BlueJeans":
          return "waistcoatBlueJeans.glb";
        case "waistcoat GreyPant":
          return "waistcoatGreyPant.glb";
        case "coat BlueJeans":
          return "coatBlueJeans.glb";
        case "coat GreyPant":
          return "coatGreyPant.glb";
        case "Blazer BlueJeans":
          return "BlazerBlueJeans.glb";
        case "Blazer GreyPant":
          return "BlazerGreyPant.glb";
        default:
          return "onesie.glb";
      }
    }
  };

  useEffect(() => {
    if (variant.top.length || variant.bottom.length) {
      const applyModel = async () => {
        const model = getModel(variant);
        if (model) {
          loadStart(true);
          await rendererRef.current.setOutfit(model, {
            occluders: [/Head$/, /Body/],
          });
        }
      };
      applyModel();
    } else {
      const ele = document.getElementById("engeenee.canvas.layer1");
      if (ele) {
        document
          .querySelectorAll('[id="engeenee.canvas.layer1"]')
          .forEach((el) => (el.style.visibility = "hidden"));
      }
    }
  }, [variant.top, variant.bottom]);

  const MALE_OUTFIT = [
    {
      icon: male1,
      file: "onesie.glb",
      name: "Jacket",
      modelName: "Jacket",
      type: "top",
    },
    {
      icon: male3,
      file: "onesie.glb",
      name: "Tee",
      modelName: "BlueTshirt",
      type: "top",
    },
    {
      icon: male4,
      file: "onesie.glb",
      name: "Tee",
      modelName: "RedTshirt",
      type: "top",
    },
    {
      icon: male2,
      file: "jacket.glb",
      name: "Jeans",
      modelName: "Jeans",
      type: "bottom",
    },
    {
      icon: male5,
      file: "onesie.glb",
      name: "Trouser",
      modelName: "Trouser",
      type: "bottom",
    },
  ];
  const FEMALE_OUTFIT = [
    {
      icon: female1,
      file: "onesie.glb",
      name: "Waistcoat",
      modelName: "waistcoat",
      type: "top",
    },
    {
      icon: female2,
      file: "jacket.glb",
      name: "Blazer",
      modelName: "coat",
      type: "top",
    },
    {
      icon: female5,
      file: "onesie.glb",
      name: "Coat",
      modelName: "Blazer",
      type: "top",
    },
    {
      icon: female3,
      file: "onesie.glb",
      name: "Jeans",
      modelName: "BlueJeans",
      type: "bottom",
    },
    {
      icon: female4,
      file: "onesie.glb",
      name: "Trouser",
      modelName: "GreyPant",
      type: "bottom",
    },
  ];

  const SLIDES = gender === "male" ? MALE_OUTFIT : FEMALE_OUTFIT;

  const handleVariantSelect = (type, modelName) => {
    setAccry("");
    const isSelected = variant[type] === modelName;
    if (isSelected) {
      setVariant({
        ...variant,
        [type]: "",
      });
    } else {
      setVariant({
        ...variant,
        [type]: modelName,
      });
    }
  };

  return (
    <>
      {/* <div id="loadui" className="full-screen loadui">
        <div style={{ flexGrow: 0.4, alignContent: "center" }}>
          <div className="cube-container">
            <div className="cube">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p>Virtual try-on is loading</p>
          <p>This may take a moment</p>
        </div>
      </div> */}
      {/* <button
        id="camera-switch"
        className="button"
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          zIndex: 1,
        }}
      >
        <div
          className="icon"
          style={{ WebkitMask: "url(./switch.svg)", mask: "url(./switch.svg)" }}
        ></div>
      </button> */}

      {/* <button
        id="record"
        className="button"
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "0.5rem",
          zIndex: 1,
        }}
      >
        <div
          className="icon"
          style={{ WebkitMask: "url(./shot.svg)", mask: "url(./shot.svg)" }}
        ></div>
      </button> */}

      {/* <input
        type="checkbox"
        id="outfit-switch"
        className="button checkbox"
        style={{
          position: "absolute",
          top: "3.5rem",
          right: "0.5rem",
          zIndex: 1,
        }}
      /> */}
      <div
        className={styles.overlays}
        style={{
          padding: pixelsToVH(40),
        }}
      >
        {/* Countdown */}
        {countdown > 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: pixelsToVH(200),
              color: "#fff",
              filter: `drop-shadow(2px 4px 6px black)`,
              //   fontStyle: "italic",
            }}
          >
            {countdown}
          </div>
        ) : null}
        {/* Top */}
        <div
          className={styles.topLeft}
          style={{
            width: pixelsToVW(290),
            right: pixelsToVH(40),
          }}
        >
          <img src={yts} alt="ytShopping" />
        </div>
        {/* Center */}
        {!ready ? (
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
                  margin: `${pixelsToVH(20)} 0`,
                }}
              >
                You’re On Screen!
              </div>
            ) : null}
            <div
              style={{
                fontSize: pixelsToVH(27),
                margin: pixelsToVH(gender ? 20 : 0),
                textAlign: "center",
              }}
            >
              {!gender
                ? "Use the panel below to select your look."
                : "Stand straight and align yourself within the foot marker for best fit."}
            </div>
          </div>
        ) : null}
        {/* Bottom */}
        {ready ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              width: `calc(100% - ${pixelsToVH(80)})`,
              justifyContent: "space-between",
              bottom: pixelsToVH(150),
            }}
          >
            <div
              className={styles.backBtn}
              onClick={() => {
                // loadStart(false, 0);
                setTimeout(() => {
                  let elem = document.getElementById("genselect");
                  if (elem) {
                    elem.style.display = "flex";
                  }
                  const ele = document.getElementById("engeenee.canvas.layer1");
                  if (ele) {
                    document
                      .querySelectorAll('[id="engeenee.canvas.layer1"]')
                      .forEach((el) => (el.style.visibility = "hidden"));
                  }
                  setGender("");
                  setVariant({ top: "", bottom: "" });
                  setReady(false);
                }, 0);
              }}
              style={{
                width: pixelsToVW(170),
              }}
            >
              <img
                src={back}
                alt="back"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              className={styles.captureBtn}
              onClick={() => {
                setCountdown(3);
                const countdownInterval = setInterval(() => {
                  setCountdown((prev) => {
                    if (prev === 1) {
                      clearInterval(countdownInterval);
                      captureImage();
                      return null;
                    }
                    return prev - 1;
                  });
                }, 1000);
              }}
              style={{
                width: pixelsToVW(254),
              }}
            >
              <img
                src={capture}
                alt="capture"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                width: pixelsToVW(170),
                visibility: "hidden",
              }}
            ></div>
          </div>
        ) : (
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
                    setTimeout(() => {
                      setReady(true);
                    }, 5000);
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
                    setTimeout(() => {
                      setReady(true);
                    }, 5000);
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
        )}
        <div
          className="carousel"
          style={{
            visibility: ready ? "visible" : "hidden",
            left: pixelsToVW(40),
          }}
          id="courosel"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              left: 0,
              flexDirection: "column",
              gap: 20,
            }}
          >
            {SLIDES.map((entry, key) => {
              const { icon, name, type, modelName } = entry;
              const isSelected = modelName === variant[type];
              return (
                <div
                  key={`${modelName}-${key}`}
                  className={`${styles.item} carousel-item`}
                  style={{
                    height: pixelsToVH(185),
                    width: pixelsToVW(151),
                    padding: `${pixelsToVH(10)} ${pixelsToVW(10)}`,
                    borderRadius: pixelsToVH(10),
                    outlineWidth: isSelected ? pixelsToVH(8) : 0,
                  }}
                  onClick={() => handleVariantSelect(type, modelName)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{
                      height: "auto",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      fontSize: pixelsToVH(14),
                    }}
                  >
                    {name}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: pixelsToVW(9) }}>
            <div
              className={`${styles.item} carousel-item`}
              style={{
                // height: pixelsToVH(78),
                width: pixelsToVW(71),
                padding: `${pixelsToVH(5)} ${pixelsToVW(5)}`,
                borderRadius: pixelsToVH(10),
                flex: 1,
                outlineWidth: accry === "glasses" ? pixelsToVH(6) : 0,
              }}
              onClick={async () => {
                if (accry !== "glasses") {
                  setVariant({ top: "", bottom: "" });
                  loadStart(true);
                  setAccry("glasses");
                  const model = "onesie.glb";
                  await rendererRef.current.setOutfit(model, {
                    occluders: [/Head$/, /Body/],
                  });
                } else {
                  setAccry("");
                }
              }}
            >
              <img
                src={glasses}
                alt="glasses"
                style={{
                  height: pixelsToVH(64),
                  width: "100%",
                  objectFit: "contain",
                  aspectRatio: 1,
                }}
              />
              <div
                style={{
                  fontSize: pixelsToVH(14),
                }}
              >
                Glasses
              </div>
            </div>
            <div
              className={`${styles.item} carousel-item`}
              style={{
                // height: pixelsToVH(78),
                width: pixelsToVW(71),
                padding: `${pixelsToVH(5)} ${pixelsToVW(5)}`,
                borderRadius: pixelsToVH(10),
                flex: 1,
                outlineWidth: accry === "cap" ? pixelsToVH(6) : 0,
              }}
              onClick={async () => {
                if (accry !== "cap") {
                  setVariant({ top: "", bottom: "" });
                  loadStart(true);
                  setAccry("cap");
                  const model = "Jeans.glb";
                  await rendererRef.current.setOutfit(model, {
                    occluders: [/Head$/, /Body/],
                  });
                } else {
                  setAccry("");
                }
              }}
            >
              <img
                src={cap}
                alt="cap"
                style={{
                  height: pixelsToVH(64),
                  width: "100%",
                  objectFit: "contain",
                  aspectRatio: 1,
                }}
              />
              <div
                style={{
                  fontSize: pixelsToVH(14),
                }}
              >
                Cap
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ARViewDebug;
