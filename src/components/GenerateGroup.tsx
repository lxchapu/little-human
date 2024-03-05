import type { FC } from "react";
import { useTranslation } from "react-i18next";

import "./GenerateGroup.scss";
import iconRandom from "../assets/icons/random.svg";
import iconMagic from "../assets/icons/magic.svg";

const GenerateGroup: FC<{
  clickRandom: () => void;
  clickMultiple: () => void;
}> = ({ clickRandom, clickMultiple }) => {
  const { t } = useTranslation();

  return (
    <div className="generate-group">
      <button
        className="generate-button generate-randomly"
        type="button"
        onClick={clickRandom}
      >
        <img className="icon" src={iconRandom} alt={t("generate.random")} />
        <span className="text">{t("generate.random")}</span>
      </button>
      <button
        className="generate-button generate-multiple"
        type="button"
        onClick={clickMultiple}
      >
        <img className="icon" src={iconMagic} alt={t("generate.multiple")} />
        <span className="text">{t("generate.multiple")}</span>
      </button>
    </div>
  );
};

export default GenerateGroup;
