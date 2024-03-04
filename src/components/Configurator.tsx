import type { FC } from "react";
import { useEffect, useState } from "react";
import cn from "classnames";
import type { Updater } from "use-immer";

import "./Configurator.scss";
import ColorSelector from "./ColorSelector";
import SvgPreviewButton from "./SvgPreviewButton";
import { widgetData } from "../utils/dynamic-data";
import { WidgetType, TabName } from "../utils/enums";
import type { History, HumanOption } from "../types";

async function getWidgets(widgetType: WidgetType) {
  const promises = widgetData[widgetType].map((data) => data());
  const list = (await Promise.all(promises)).map((res) => res.default);
  return list;
}

interface Section {
  tabName: WidgetType | TabName;
  tabLabel: string;
  widgetList?: string[];
}

const Configurator: FC<{
  humanOption: HumanOption;
  onChange: Updater<History>;
}> = ({ humanOption, onChange }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentTab, setCurrentTab] = useState<WidgetType | TabName>(
    WidgetType.Head
  );

  const widgetList = sections.find(
    (section) => section.tabName === currentTab
  )?.widgetList;

  function switchWidget(newShapeIndex: number) {
    if (
      newShapeIndex === humanOption.widgets[currentTab as WidgetType].shapeIndex
    )
      return;

    onChange((draft) => {
      draft.past.push(humanOption);
      draft.future = [];
      draft.present.widgets[currentTab as WidgetType].shapeIndex =
        newShapeIndex;
    });
  }

  function handleStrokeColorChange(newColor: string) {
    if (newColor === humanOption.strokeColor) return;

    onChange((draft) => {
      draft.past.push(humanOption);
      draft.future = [];
      draft.present.strokeColor = newColor;
    });
  }

  function handleSkinColorChange(newColor: string) {
    if (newColor === humanOption.skinColor) return;

    onChange((draft) => {
      draft.past.push(humanOption);
      draft.future = [];
      draft.present.skinColor = newColor;
    });
  }

  function handleWidgetColorChange(newColor: string) {
    if (newColor === humanOption.widgets[currentTab as WidgetType].color)
      return;

    onChange((draft) => {
      draft.past.push(humanOption);
      draft.future = [];
      draft.present.widgets[currentTab as WidgetType].color = newColor;
    });
  }

  useEffect(() => {
    async function updateSections() {
      const s: Section[] = [
        {
          tabName: WidgetType.Head,
          tabLabel: "头发",
          widgetList: await getWidgets(WidgetType.Head),
        },
        {
          tabName: WidgetType.Body,
          tabLabel: "上身",
          widgetList: await getWidgets(WidgetType.Body),
        },
        {
          tabName: WidgetType.Bottom,
          tabLabel: "下身",
          widgetList: await getWidgets(WidgetType.Bottom),
        },
        {
          tabName: WidgetType.Item,
          tabLabel: "头饰",
          widgetList: await getWidgets(WidgetType.Item),
        },
        {
          tabName: TabName.Other,
          tabLabel: "其他",
        },
      ];
      setSections(s);
    }
    updateSections();
  }, []);

  function getColorSelector() {
    if (currentTab === WidgetType.Item) return null;

    if (currentTab === TabName.Other) {
      return (
        <div className="input-group">
          <div className="input-item">
            <div className="input-item-label">描边</div>
            <ColorSelector
              color={humanOption.strokeColor}
              onChange={handleStrokeColorChange}
            />
          </div>
          <div className="input-item">
            <div className="input-item-label">肤色</div>
            <ColorSelector
              color={humanOption.skinColor}
              onChange={handleSkinColorChange}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="input-item">
        <div className="input-item-label">颜色</div>
        <ColorSelector
          color={humanOption.widgets[currentTab].color!}
          onChange={handleWidgetColorChange}
        />
      </div>
    );
  }

  function getWidgetGrid() {
    if (!widgetList || currentTab === TabName.Other) return null;
    return (
      <div className="widget-grid">
        {widgetList.map((widget, index) => {
          return (
            <SvgPreviewButton
              key={index}
              svgRaw={widget}
              skinColor={humanOption.skinColor}
              strokeColor={humanOption.strokeColor}
              type={currentTab}
              color={humanOption.widgets[currentTab].color}
              isSelected={humanOption.widgets[currentTab].shapeIndex === index}
              onClick={() => switchWidget(index)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="configurator">
      <div className="tab-list">
        {sections.map((section) => {
          return (
            <div
              key={section.tabName}
              className={cn([
                "label",
                { checked: section.tabName === currentTab },
              ])}
              onClick={() => setCurrentTab(section.tabName)}
            >
              {section.tabLabel}
            </div>
          );
        })}
      </div>
      <div className="tab-panel">
        {getColorSelector()}
        {getWidgetGrid()}
      </div>
    </div>
  );
};

export default Configurator;
