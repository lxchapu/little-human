import type { FC } from "react";

import "./ActionGroup.scss";
import iconBack from "../assets/icons/back.svg";
import iconDownload from "../assets/icons/download.svg";
import iconFlip from "../assets/icons/flip.svg";
import iconForward from "../assets/icons/forward.svg";
import { ActionType } from "../utils/enums";

const ActionGroup: FC<{
  action: (actionType: ActionType) => void;
  downloading: boolean;
  canUndo: boolean;
  canRedo: boolean;
}> = ({ action, downloading, canRedo, canUndo }) => {
  return (
    <div className="action-group">
      <button
        className="action-button"
        type="button"
        disabled={!canUndo}
        onClick={() => action(ActionType.Undo)}
      >
        <img className="icon" src={iconBack} alt="撤销" />
        <span className="text">撤销</span>
      </button>
      <button
        className="action-button"
        type="button"
        disabled={!canRedo}
        onClick={() => action(ActionType.Redo)}
      >
        <img className="icon" src={iconForward} alt="还原" />
        <span className="text">还原</span>
      </button>
      <button
        className="action-button"
        type="button"
        onClick={() => action(ActionType.Flip)}
      >
        <img className="icon" src={iconFlip} alt="水平翻转" />
        <span className="text">水平翻转</span>
      </button>
      <button
        className="action-button"
        type="button"
        disabled={downloading}
        onClick={() => action(ActionType.Download)}
      >
        <img className="icon" src={iconDownload} alt="下载" />
        <span className="text">{downloading ? "请等待" : "下载"}</span>
      </button>
    </div>
  );
};

export default ActionGroup;
