import { WidgetType } from "../utils/enums";

interface Widget {
  shapeIndex: number;
  color?: string;
}

export interface HumanOption {
  widgets: {
    [WidgetType.Head]: Widget;
    [WidgetType.Body]: Widget;
    [WidgetType.Bottom]: Widget;
    [WidgetType.Item]: Widget;
  };
  skinColor: string;
  strokeColor: string;
}
