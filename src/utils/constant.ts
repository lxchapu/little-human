import { WidgetType } from "./enums";

const WIDGET_POSITION: Readonly<{
  [key in WidgetType]: {
    x: number;
    y: number;
  };
}> = {
  [WidgetType.Head]: {
    x: 0,
    y: 0,
  },
  [WidgetType.Body]: {
    x: 0,
    y: 51,
  },
  [WidgetType.Bottom]: {
    x: 0,
    y: 85,
  },
  [WidgetType.Item]: {
    x: 0,
    y: 0,
  },
};

const WIDGET_LAYER: Readonly<{
  [key in WidgetType]: number;
}> = {
  [WidgetType.Head]: 3,
  [WidgetType.Body]: 2,
  [WidgetType.Bottom]: 1,
  [WidgetType.Item]: 4,
};

const WIDGET_SIZE: Readonly<{
  [key in WidgetType]: {
    width: number;
    height: number;
  };
}> = {
  [WidgetType.Head]: {
    width: 80,
    height: 80,
  },
  [WidgetType.Body]: {
    width: 80,
    height: 80,
  },
  [WidgetType.Bottom]: {
    width: 80,
    height: 107,
  },
  [WidgetType.Item]: {
    width: 80,
    height: 80,
  },
};

export { WIDGET_POSITION, WIDGET_LAYER, WIDGET_SIZE };
