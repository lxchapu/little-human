import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import cn from 'classnames';

import './SvgPreviewButton.scss';
import { updateSvgFillColor } from '../utils';
import { WidgetType } from '../utils/enums';
import { WIDGET_SIZE } from '../utils/constant';

interface SvgPreviewButtonProps {
  svgRaw: string;
  skinColor: string;
  strokeColor: string;
  type: WidgetType;
  color?: string;
  isSelected: boolean;
  onClick: () => void;
}

const SvgPreviewButton: FC<SvgPreviewButtonProps> = (props) => {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    myRef.current!.innerHTML = props.svgRaw;

    const colorList = [
      {
        selector: '.skin',
        color: props.skinColor,
      },
      {
        selector: '.stroke',
        color: props.strokeColor,
      },
    ];
    if (props.color) {
      colorList.push({
        selector: '.' + props.type,
        color: props.color,
      });
    }

    updateSvgFillColor(myRef.current!, colorList);
  }, [props.svgRaw, props.skinColor, props.strokeColor, props.type, props.color]);

  return (
    <div
      className={cn(['svg-preview-button', { selected: props.isSelected }])}
      onClick={props.onClick}
    >
      <div
        ref={myRef}
        style={{
          width: WIDGET_SIZE[props.type].width,
          height: WIDGET_SIZE[props.type].height,
        }}
      ></div>
      <div className="border"></div>
    </div>
  );
};

export default SvgPreviewButton;
