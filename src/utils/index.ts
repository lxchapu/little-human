import type { HumanOption } from "../types";
import { SETTINGS } from "./constant";
import { widgetData } from "./dynamic-data";
import { WidgetType } from "./enums";

export function updateSvgFillColor(
  container: HTMLElement,
  colorList: { selector: string; color: string }[]
) {
  colorList.forEach((item) => {
    const elements = container.querySelectorAll(item.selector);
    elements.forEach((element) => {
      element.setAttribute("fill", item.color);
    });
  });
}

function getRandomValue<Item = unknown>(arr: Item[]): Item {
  return arr[getRandomIndex(arr)];
}

function getRandomIndex(arr: unknown[]): number {
  return Math.floor(Math.random() * arr.length);
}

export function getRandomHumanOption(): HumanOption {
  return {
    widgets: {
      [WidgetType.Head]: {
        shapeIndex: getRandomIndex(widgetData[WidgetType.Head]),
        color: getRandomValue(SETTINGS.commonColors),
      },
      [WidgetType.Body]: {
        shapeIndex: getRandomIndex(widgetData[WidgetType.Body]),
        color: getRandomValue(SETTINGS.commonColors),
      },
      [WidgetType.Bottom]: {
        shapeIndex: getRandomIndex(widgetData[WidgetType.Bottom]),
        color: getRandomValue(SETTINGS.commonColors),
      },
      [WidgetType.Item]: {
        shapeIndex: getRandomIndex(widgetData[WidgetType.Item]),
      },
    },
    skinColor: getRandomValue(SETTINGS.skinColors),
    strokeColor: "#000000",
  };
}

export async function showConfetti() {
  import("canvas-confetti").then((confetti) => {
    const canvasEle: HTMLCanvasElement | null =
      document.querySelector("#confetti");

    if (!canvasEle) {
      return;
    }

    const myConfetti = confetti.create(canvasEle, {
      resize: true,
      useWorker: true,
      disableForReducedMotion: true,
    });

    const duration = performance.now() + 1 * 1000;

    const confettiColors = ["#6967fe", "#85e9f4", "#e16984"];

    void (function frame() {
      myConfetti({
        particleCount: confettiColors.length,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: confettiColors,
      });
      myConfetti({
        particleCount: confettiColors.length,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: confettiColors,
      });

      if (performance.now() < duration) {
        requestAnimationFrame(frame);
      }
    })();
  });
}
