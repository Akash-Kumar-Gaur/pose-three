import React, { useEffect, useState } from "react";
import { PoseEngine } from "@geenee/bodyprocessors";
// import { Recorder } from "@geenee/armature";
// import { OutfitParams } from "@geenee/bodyrenderers-common";
import { AvatarRenderer } from "./avatarrenderer";
import Webcam from "react-webcam";
import yts from "../../assests/ytshopping.png";
import styles from "../../index.module.scss";
import { pixelsToVH, pixelsToVW } from "../../App";
import bagRight from "../../assests/bagRight.png";

function ARView({ wMargin = 0, hMargin = 0 }) {
  const [gender, setGender] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Engine
    const engine = new PoseEngine();
    const token =
      location.hostname === "localhost"
        ? "AVSE9trnGfvPowd3z2f5cQW-FW87bF5t"
        : "HiCltgzsHoEwIl02FxcrdhLy6wdabBmY";

    // Parameters
    const urlParams = new URLSearchParams(window.location.search);
    let rear = urlParams.has("rear");
    // Model map
    const modelMap = {
      onesie: {
        file: "onesie.glb",
        avatar: false,
        outfit: {
          occluders: [/Head$/, /Body/],
          hidden: [/Eye/, /Teeth/, /Footwear/],
        },
      },
      jacket: {
        file: "jacket.glb",
        avatar: false,
        outfit: {
          occluders: [/Head$/, /Body/],
          hidden: [/Eye/, /Teeth/, /Bottom/, /Footwear/, /Glasses/],
        },
      },
    };
    let model = "onesie";
    let avatar = modelMap["onesie"].avatar;

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
      const container = document.getElementById("arview");
      if (!container) return;
      const renderer = new AvatarRenderer(
        container,
        "crop",
        !rear,
        modelMap[model].file,
        avatar ? undefined : modelMap[model].outfit
      );
      // Camera switch
      const cameraSwitch = document.getElementById("camera-switch");
      if (cameraSwitch) {
        cameraSwitch.onclick = async () => {
          cameraSwitch.disabled = true;
          rear = !rear;
          await engine.setup({
            size: {
              width: window.innerWidth - wMargin,
              height: window.innerHeight - hMargin,
            },
            rear,
          });
          await engine.start();
          renderer.setMirror(!rear);
          cameraSwitch.disabled = false;
        };
      }
      // Outfit switch
      const outfitSwitch = document.getElementById("outfit-switch");
      outfitSwitch.checked = avatar;
      outfitSwitch.onchange = async () => {
        modelBtns.forEach((btn) => {
          btn.disabled = true;
        });
        // outfitSwitch.disabled = true;
        // const spinner = createSpinner();
        // document.body.appendChild(spinner);
        avatar = outfitSwitch.checked;
        await renderer.setOutfit(
          modelMap[model].file,
          avatar ? undefined : modelMap[model].outfit
        );
        // document.body.removeChild(spinner);
        modelBtns.forEach((btn) => {
          btn.disabled = false;
        });
        // outfitSwitch.disabled = false;
      };
      // Model carousel
      const modelBtns = document.getElementsByName("model");
      modelBtns.forEach((btn) => {
        btn.onchange = async () => {
          if (btn.checked && modelMap[btn.value]) {
            modelBtns.forEach((btn) => {
              btn.disabled = true;
            });
            // outfitSwitch.disabled = true;
            // const spinner = createSpinner();
            // document.body.appendChild(spinner);
            model = btn.value;
            avatar = modelMap[model].avatar;
            await renderer.setOutfit(
              modelMap[model].file,
              avatar ? undefined : modelMap[model].outfit
            );
            // outfitSwitch.checked = avatar;
            // document.body.removeChild(spinner);
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
      await engine.setup({
        size: {
          width: window.innerWidth - wMargin,
          height: window.innerHeight - hMargin,
        },
        rear,
      });
      await engine.start();
      // document.getElementById("loadui")?.remove();
    }
    // main();
    // <OutfitSelector onOutfitChange={handleOutfitChange} />
  }, []);

  const videoConstraints = {
    width: window.innerWidth - wMargin,
    height: window.innerHeight - hMargin,
    facingMode: "user",
  };
  return (
    <div
      className={styles.camBox}
      style={{
        width: window.innerWidth - wMargin,
        height: window.innerHeight - hMargin,
      }}
    >
      <div
        className={styles.topLeft}
        style={{
          width: pixelsToVW(290),
        }}
      >
        <img src={yts} alt="ytShopping" />
      </div>
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
        <div
          style={{
            fontSize: pixelsToVH(42),
            fontWeight: "bold",
            textTransform: "uppercase",
            margin: pixelsToVH(20),
          }}
        >
          You’re On Screen!
        </div>
        <div
          style={{
            fontSize: pixelsToVH(27),
          }}
        >
          Use the panel below to select your look.
        </div>
      </div>
      <Webcam videoConstraints={videoConstraints} />
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
              setLensID(MALE[0].lensId);
              localStorage.setItem("genderSelect", "male");
              setTimeout(() => {
                document.getElementById("genselect")?.remove();
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
              setLensID(FEMALE[0].lensId);
              localStorage.setItem("genderSelect", "female");
              setTimeout(() => {
                document.getElementById("genselect")?.remove();
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
      {/* ) : null} */}
      {/* {countdown > 0 ? (
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
      ) : null} */}
    </div>
  );

  // <Webcam videoConstraints={videoConstraints} />;
}

export default ARView;
