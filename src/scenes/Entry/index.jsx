import React from "react";
import styles from "./index.module.scss";
import ytLogo from "../../assests/ytLogo.png";
import start from "../../assests/start.png";
import membership from "../../assests/membership.png";
import bag from "../../assests/bag.png";
import { pixelsToVH, pixelsToVW } from "../../App";

function Entry({ setCurrentState }) {
  return (
    <div className={styles.entryPage}>
      <div
        className={styles.content}
        style={{
          maxWidth: pixelsToVW(803),
        }}
      >
        <div
          className={styles.mainLogo}
          style={{
            width: pixelsToVW(803),
          }}
        >
          <img src={ytLogo} alt="atsa" />
        </div>
        <div className={styles.text}>
          <div
            className={styles.headline}
            style={{
              fontSize: pixelsToVH(70),
            }}
          >
            {/* <span style={{ fontSize: pixelsToVH(50) }}>
              LIKE IT. STYLE IT. OWN IT.
            </span>
            <br /> */}
            LIKE IT. STYLE IT. OWN IT.
            <div
              className={styles.leftAbs}
              style={{
                width: pixelsToVW(88.5),
                height: "auto",
                top: pixelsToVH(-130),
                left: pixelsToVW(-60),
              }}
            >
              <img src={membership} alt="membership" />
            </div>
            <div
              className={styles.rightAbs}
              style={{
                width: pixelsToVW(161.3),
                height: "auto",
                top: pixelsToVH(-160),
                right: pixelsToVW(-60),
              }}
            >
              <img src={bag} alt="bag" />
            </div>
          </div>
          <div
            className={styles.tagline}
            style={{ fontSize: pixelsToVH(47), marginTop: pixelsToVH(50) }}
          >
            Level up your look with YouTube AR Try-On!
          </div>
        </div>
        <div
          className={styles.action}
          style={{
            width: pixelsToVW(590),
            height: "auto",
            fontSize: pixelsToVH(31),
            position: "relative",
            zIndex: 50,
          }}
        >
          Click here to start the experience.
          <img src={start} alt="start" onClick={() => setCurrentState(1)} />
        </div>
      </div>
    </div>
  );
}

export default Entry;
