import type { FC } from "react";
import { useEffect, useRef } from "react";

import "./LittleHuman.scss";
import { widgetData } from "../utils/dynamic-data";
import { WIDGET_POSITION, WIDGET_LAYER } from "../utils/constant";
import type { HumanOption } from "../types";
import { WidgetType } from "../utils/enums";
import { updateSvgFillColor } from "../utils";

const humanOption: HumanOption = {
  widgets: {
    head: {
      shapeIndex: 0,
      color: "#000",
    },
    body: {
      shapeIndex: 0,
      color: "#fff",
    },
    bottom: {
      shapeIndex: 0,
      color: "#000",
    },
    item: {
      shapeIndex: 1,
    },
  },
  skinColor: "pink",
  strokeColor: "#000",
};

const LittleHuman: FC = () => {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sortList = Object.entries(WIDGET_LAYER).sort(
      (a, b) => a[1] - b[1]
    ) as [WidgetType, number][];

    const list = sortList.map(([type, layer]) => {
      const shapeIndex = humanOption.widgets[type].shapeIndex;

      return {
        ...WIDGET_POSITION[type],
        zIndex: layer,
        promise: widgetData[type][shapeIndex](),
      };
    });

    const promises = list.map((item) => item.promise);

    async function updateHumanSvg() {
      const svgRawList = await Promise.all(promises).then((raw) => {
        return raw.map((svgRaw, index) => {
          let content = svgRaw.default;

          content = content
            .slice(content.indexOf(">", content.indexOf("<svg")) + 1)
            .replace("</svg>", "");

          return `
          <g transform="translate(${list[index].x}, ${list[index].y})">
            ${content}
          </g>
          `;
        });
      });

      myRef.current!.innerHTML = `
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 192"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${svgRawList.join("")}
      </svg>
      `;

      const colorList = [
        {
          selector: ".skin",
          color: humanOption.skinColor,
        },
        {
          selector: ".stroke",
          color: humanOption.strokeColor,
        },
        {
          selector: ".head",
          color: humanOption.widgets.head.color!,
        },
        {
          selector: ".bottom",
          color: humanOption.widgets.bottom.color!,
        },
        {
          selector: ".body",
          color: humanOption.widgets.body.color!,
        },
      ];
      updateSvgFillColor(myRef.current!, colorList);
    }
    updateHumanSvg();
  }, []);

  return (
    <div className="little-human">
      <div className="human-preload" ref={myRef}></div>
    </div>
  );
};

export default LittleHuman;
