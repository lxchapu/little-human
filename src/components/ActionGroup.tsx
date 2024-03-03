import type { FC } from "react";

import "./ActionGroup.scss";
import iconBack from "../assets/icons/back.svg";
import iconDownload from "../assets/icons/download.svg";
import iconFlip from "../assets/icons/flip.svg";
import iconForward from "../assets/icons/forward.svg";

const ActionGroup: FC = () => {
  return (
    <div className="action-group">
      <button className="action-button" type="button">
        <img className="icon" src={iconBack} alt="撤销" />
        <span className="text">撤销</span>
      </button>
      <button className="action-button" type="button">
        <img className="icon" src={iconForward} alt="还原" />
        <span className="text">还原</span>
      </button>
      <button className="action-button" type="button">
        <img className="icon" src={iconFlip} alt="水平翻转" />
        <span className="text">水平翻转</span>
      </button>
      <button className="action-button" type="button">
        <img className="icon" src={iconDownload} alt="下载" />
        <span className="text">下载</span>
      </button>
    </div>
  );
};

export default ActionGroup;
