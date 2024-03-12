import type { FC } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className="action-group">
      <button
        className="action-button"
        type="button"
        data-umami-event="Undo Button"
        disabled={!canUndo}
        onClick={() => action(ActionType.Undo)}
      >
        <img className="icon" src={iconBack} alt={t("action.undo")} />
        <span className="text">{t("action.undo")}</span>
      </button>
      <button
        className="action-button"
        type="button"
        data-umami-event="Redo Button"
        disabled={!canRedo}
        onClick={() => action(ActionType.Redo)}
      >
        <img className="icon" src={iconForward} alt={t("action.redo")} />
        <span className="text">{t("action.redo")}</span>
      </button>
      <button
        className="action-button"
        type="button"
        data-umami-event="Flip Button"
        onClick={() => action(ActionType.Flip)}
      >
        <img className="icon" src={iconFlip} alt={t("action.flip")} />
        <span className="text">{t("action.flip")}</span>
      </button>
      <button
        className="action-button"
        type="button"
        data-umami-event="Download Button"
        data-umami-event-type="Single"
        disabled={downloading}
        onClick={() => action(ActionType.Download)}
      >
        <img className="icon" src={iconDownload} alt={t("action.download")} />
        <span className="text">
          {downloading ? t("text.waiting") : t("action.download")}
        </span>
      </button>
    </div>
  );
};

export default ActionGroup;
