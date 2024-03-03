import type { FC } from "react";
import { useEffect, useState } from "react";

import "./ColorSelector.scss";

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorSelector: FC<ColorSelectorProps> = (props) => {
  const [hexText, setHexText] = useState("");

  function handleInputChange(value: string) {
    if (/^[0-9a-f]{0,6}$/i.test(value)) {
      setHexText(value);
    }
  }

  function handleInputConfrim() {
    if (hexText.length === 6) {
      props.onChange(`#${hexText}`);
    } else {
      setHexText(props.color.replace("#", ""));
    }
  }

  function handlePickerChange(value: string) {
    props.onChange(value);
  }

  useEffect(() => {
    setHexText(props.color.replace("#", ""));
  }, [props.color]);

  return (
    <div className="color-selector">
      <div className="preview" style={{ backgroundColor: props.color }}></div>
      <input
        className="picker"
        type="color"
        value={props.color}
        onChange={(e) => {
          handlePickerChange(e.target.value);
        }}
      />
      <input
        className="input"
        type="text"
        value={hexText}
        maxLength={6}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleInputConfrim();
        }}
        onBlur={() => {
          handleInputConfrim();
        }}
        onFocus={(e) => {
          e.currentTarget.select();
        }}
      />
      <div className="border"></div>
    </div>
  );
};

export default ColorSelector;
