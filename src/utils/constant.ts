import { WidgetType } from './enums';

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

const DOWNLOAD_DELAY = 400;

const SETTINGS = {
  skinColors: ['#FFFFFF', '#F8D9CE', '#F9C9B6', '#DEB3A3', '#C89583', '#9C6458'],
  commonColors: [
    '#000000',
    '#6BD9E9',
    '#FC909F',
    '#F4D150',
    '#E0DDFF',
    '#D2EFF3',
    '#FFEDEF',
    '#FFEBA4',
    '#506AF4',
    '#F48150',
    '#48A99A',
    '#C09FFF',
    '#FD6F5D',
  ],

  specialColor: '#CF2323',
  specialItemShapeIndex: 1,
};

const TRIGGER_PROBABILITY = 0.05;

export {
  WIDGET_POSITION,
  WIDGET_LAYER,
  WIDGET_SIZE,
  DOWNLOAD_DELAY,
  SETTINGS,
  TRIGGER_PROBABILITY,
};
