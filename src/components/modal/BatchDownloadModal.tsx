import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";

import { HumanOption, LittleHumanRef } from "../../types";
import { name as appName } from "../../../package.json";

import LittleHuman from "../LittleHuman";
import "./BatchDownloadModal.scss";

const BatchDownloadModal: FC<{
  visible: boolean;
  humanList: HumanOption[];
  close: () => void;
  regenerate: () => void;
}> = ({ visible, humanList, close, regenerate }) => {
  const littleHumansRef = useRef<(LittleHumanRef | null)[]>([]);
  const [making, setMaking] = useState(false);
  const [madeCount, setMadeCount] = useState(0);
  const [downloadIndex, setDownloadIndex] = useState(-1);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    littleHumansRef.current = littleHumansRef.current.slice(
      0,
      humanList.length
    );
  }, [humanList]);

  async function handleDownload(index: number) {
    setDownloadIndex(index);

    const dataURL = await littleHumansRef.current[index]!.getDataURL();

    setDownloadIndex(-1);

    const trigger = document.createElement("a");
    trigger.href = dataURL;
    trigger.download = `${appName}.png`;
    trigger.click();
  }

  async function makeZip() {
    if (making) return;

    setMaking(true);

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (let i = 0; i < humanList.length; i++) {
      const dataURL = await littleHumansRef.current[i]!.getDataURL();
      zip.file(`${appName}-${i + 1}.png`, dataURL.split(",")[1], {
        base64: true,
      });
      setMadeCount((count) => count + 1);
    }

    const content = await zip.generateAsync({ type: "base64" });

    setMaking(false);
    setMadeCount(0);

    const trigger = document.createElement("a");
    trigger.href = "data:application/zip;base64," + content;
    trigger.download = `${appName}.zip`;
    trigger.click();
  }

  if (!visible) return null;
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className="batch-download-modal">
        <div className="top-bar">
          <div>{t("text.generatedTip")}</div>
          <div className="right">
            <button
              className="regenerate-button"
              type="button"
              onClick={regenerate}
              disabled={making || downloadIndex >= 0}
            >
              {t("text.regenerate")}
            </button>
            <button
              className="download-button"
              type="button"
              onClick={makeZip}
              disabled={making || downloadIndex >= 0}
            >
              {making && madeCount > 0
                ? `${t("text.downloading")}(${madeCount}/${humanList.length})`
                : t("text.batchDownload")}
            </button>
          </div>
        </div>

        <div className="content">
          <div className="human-grid">
            {humanList.map((opt, index) => {
              const downloading =
                downloadIndex === index || (making && index + 1 > madeCount);

              return (
                <div
                  className={cn([
                    "human-box",
                    {
                      downloading: downloading,
                    },
                  ])}
                  key={index}
                >
                  <LittleHuman
                    humanOption={opt}
                    flipped={false}
                    ref={(r) => (littleHumansRef.current[index] = r)}
                  />
                  <button
                    className="single-download-button"
                    type="button"
                    onClick={() => handleDownload(index)}
                    disabled={downloading}
                  >
                    {downloading ? t("text.waiting") : t("text.singleDownload")}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDownloadModal;
