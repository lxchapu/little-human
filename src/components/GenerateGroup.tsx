import type { FC } from "react";

import "./GenerateGroup.scss";
import iconRandom from "../assets/icons/random.svg";
import iconMagic from "../assets/icons/magic.svg";

const GenerateGroup: FC<{
  clickRandom: () => void;
  clickMultiple: () => void;
}> = ({ clickRandom, clickMultiple }) => {
  return (
    <div className="generate-group">
      <button
        className="generate-button generate-randomly"
        type="button"
        onClick={clickRandom}
      >
        <img className="icon" src={iconRandom} alt="随机生成" />
        <span className="text">随机生成</span>
      </button>
      <button
        className="generate-button generate-multiple"
        type="button"
        onClick={clickMultiple}
      >
        <img className="icon" src={iconMagic} alt="批量生成" />
        <span className="text">批量生成</span>
      </button>
    </div>
  );
};

export default GenerateGroup;
